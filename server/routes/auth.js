const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const crypto = require("crypto");
const { User } = require("../models/sql");
const ResumeParser = require("../services/resumeParser");
const { getContainer, isBlobStorageAvailable } = require("../config/blob");
const emailService = require("../services/emailService");

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, DOC, and TXT files are allowed.'), false);
    }
  }
});

// Generate 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Simple GET endpoint for testing
router.get("/", (req, res) => {
  res.json({ 
    message: "Auth API is working!",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      uploadResume: "POST /api/auth/upload-resume",
      verifyEmail: "POST /api/auth/verify-email",
      forgotPassword: "POST /api/auth/forgot-password",
      resetPassword: "POST /api/auth/reset-password",
      resendVerification: "POST /api/auth/resend-verification"
    }
  });
});

// Resume upload endpoint
router.post("/upload-resume", upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { file } = req;
    
    // Parse resume content
    console.log("🔄 Parsing resume...");
    const parsedData = await ResumeParser.parseResume(file.buffer, file.mimetype);
    console.log("✅ Resume parsed successfully");
    
    let fileUrl = null;
    let fileName = null;
    
    // Try to upload to Azure Blob Storage if available
    if (isBlobStorageAvailable()) {
      try {
        console.log("🔄 Uploading to Azure Blob Storage...");
        const container = await getContainer();
        fileName = `resumes/${Date.now()}-${file.originalname}`;
        const blockBlobClient = container.getBlockBlobClient(fileName);
        
        await blockBlobClient.upload(file.buffer, file.size, {
          blobHTTPHeaders: {
            blobContentType: file.mimetype
          }
        });
        
        fileUrl = blockBlobClient.url;
        console.log("✅ File uploaded to Azure Blob Storage");
      } catch (blobError) {
        console.error("❌ Azure Blob upload failed:", blobError.message);
        // Continue without file storage - we still have the parsed data
        fileUrl = null;
        fileName = null;
      }
    } else {
      console.log("⚠️ Azure Blob Storage not available - skipping file upload");
    }
    
    res.json({
      success: true,
      message: "Resume uploaded and parsed successfully",
      parsedData,
      fileUrl,
      fileName: fileName || file.originalname,
      storageAvailable: isBlobStorageAvailable()
    });
    
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ 
      error: "Failed to upload and parse resume",
      details: error.message 
    });
  }
});

// Enhanced register endpoint with email verification code
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      college,
      skills,
      experience,
      github,
      linkedin,
      portfolio,
      resumeUrl,
      resumeFileName,
      role = "participant"
    } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();
    const emailVerificationToken = verificationCode; // Store code as token for now

    // Prepare user data
    const userData = {
      name: fullName,
      email,
      passwordHash,
      role,
      phone: phone || null,
      college: college || null,
      skills: skills ? JSON.stringify(skills) : null,
      experience: experience || null,
      github: github || null,
      linkedin: linkedin || null,
      portfolio: portfolio || null,
      resumeUrl: resumeUrl || null,
      resumeFileName: resumeFileName || null,
      emailVerificationToken,
      isEmailVerified: false
    };

    // Create user
    const user = await User.create(userData);

    // Send verification email with code
    const emailSent = await emailService.sendVerificationEmail(email, verificationCode, fullName);

    // Generate JWT token (temporary, until email is verified)
    const token = jwt.sign(
      { id: user.id, role: user.role, emailVerified: false }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.passwordHash;
    delete userResponse.emailVerificationToken;

    res.status(201).json({
      success: true,
      message: emailSent ? 
        "User registered successfully. Please check your email for the verification code." :
        "User registered successfully. Please verify your email to complete registration.",
      token,
      user: userResponse,
      emailSent,
      requiresVerification: true,
      verificationCode: emailSent ? verificationCode : null // Send code in response for testing
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      error: "Registration failed",
      details: error.message 
    });
  }
});

// Email verification endpoint with code
router.post("/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email and verification code are required" });
    }

    // Find user with this email and code
    const user = await User.findOne({ 
      where: { 
        email,
        emailVerificationToken: code
      }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or verification code" });
    }

    // Update user as verified
    await user.update({
      isEmailVerified: true,
      emailVerificationToken: null
    });

    // Send welcome email
    await emailService.sendWelcomeEmail(user.email, user.name);

    // Generate new JWT token with verified status
    const newToken = jwt.sign(
      { id: user.id, role: user.role, emailVerified: true },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: "Email verified successfully! Welcome to HackTatva!",
      token: newToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: true
      }
    });

  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ 
      error: "Email verification failed",
      details: error.message 
    });
  }
});

// Resend verification email
router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ error: "Email is already verified" });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    await user.update({ emailVerificationToken: verificationCode });

    // Send verification email
    const emailSent = await emailService.sendVerificationEmail(email, verificationCode, user.name);

    res.json({
      success: true,
      message: emailSent ? 
        "Verification code sent successfully" :
        "Failed to send verification code. Please try again.",
      emailSent,
      verificationCode: emailSent ? verificationCode : null // Send code in response for testing
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ 
      error: "Failed to resend verification code",
      details: error.message 
    });
  }
});

// Forgot password endpoint
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if user exists or not
      return res.json({
        success: true,
        message: "If an account with this email exists, a password reset code has been sent."
      });
    }

    // Generate reset code
    const resetCode = generateVerificationCode();
    const resetPasswordToken = resetCode;
    const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.update({
      resetPasswordToken,
      resetPasswordExpires
    });

    // Send reset email
    const emailSent = await emailService.sendPasswordResetEmail(email, resetCode, user.name);

    res.json({
      success: true,
      message: emailSent ? 
        "Password reset code sent successfully" :
        "Failed to send password reset code. Please try again.",
      emailSent,
      resetCode: emailSent ? resetCode : null // Send code in response for testing
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ 
      error: "Failed to process password reset request",
      details: error.message 
    });
  }
});

// Reset password endpoint
router.post("/reset-password", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: "Email, code, and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Find user with valid reset code
    const user = await User.findOne({
      where: {
        email,
        resetPasswordToken: code,
        resetPasswordExpires: { [require('sequelize').Op.gt]: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or reset code" });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update user
    await user.update({
      passwordHash,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    res.json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ 
      error: "Failed to reset password",
      details: error.message 
    });
  }
});

// Enhanced login endpoint with email verification check
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if email is verified (for non-OAuth users)
    if (!user.isEmailVerified && !user.googleId && !user.githubId) {
      return res.status(400).json({ 
        error: "Please verify your email before logging in",
        requiresVerification: true,
        email: user.email
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role, emailVerified: user.isEmailVerified }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.passwordHash;
    delete userResponse.emailVerificationToken;
    delete userResponse.resetPasswordToken;
    delete userResponse.resetPasswordExpires;

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      error: "Login failed",
      details: error.message 
    });
  }
});

module.exports = router;
