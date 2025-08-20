import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    college: "",
    role: "participant",
    skills: [],
    experience: "",
    github: "",
    linkedin: "",
    portfolio: ""
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [msg, setMsg] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { register, uploadResume, loginWithGoogle } = useAuth();

  // Handle form input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Add skill to the skills array
  function addSkill() {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  }

  // Remove skill from array
  function removeSkill(skillToRemove) {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  }

  // Handle resume file upload with backend integration
  async function handleResumeUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setIsParsingResume(true);
    setMsg("🔄 Uploading and parsing resume...");
    
    try {
      // Upload to backend for parsing
      const result = await uploadResume(file);
      
      if (result.success) {
        const { parsedData: backendParsedData, fileUrl, fileName } = result.data;
        
        setParsedData(backendParsedData);
        setResumeText("Resume uploaded and parsed by backend");
        setMsg("✅ Resume uploaded and parsed successfully!");
        
        // Auto-fill form with parsed data from backend
        setFormData(prev => ({
          ...prev,
          fullName: backendParsedData.name || prev.fullName,
          email: backendParsedData.email || prev.email,
          phone: backendParsedData.phone || prev.phone,
          college: backendParsedData.college || prev.college,
          skills: backendParsedData.skills.length > 0 ? [...new Set([...prev.skills, ...backendParsedData.skills])] : prev.skills,
          experience: backendParsedData.experience || prev.experience,
          github: backendParsedData.github || prev.github,
          linkedin: backendParsedData.linkedin || prev.linkedin,
          portfolio: backendParsedData.portfolio || prev.portfolio
        }));
        
        // Store resume URL for registration
        setFormData(prev => ({
          ...prev,
          resumeUrl: fileUrl,
          resumeFileName: fileName
        }));
        
      } else {
        setMsg(`❌ ${result.error}`);
      }
      
    } catch (error) {
      console.error("Resume upload error:", error);
      setMsg("❌ Error uploading resume. Please try again.");
    }
    
    setIsParsingResume(false);
  }

  // Simple resume parsing function (fallback for frontend parsing)
  function parseResumeText(text) {
    const lowerText = text.toLowerCase();
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    let parsed = {
      name: "",
      email: "",
      phone: "",
      skills: [],
      github: "",
      linkedin: ""
    };

    // Extract email
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) parsed.email = emailMatch[0];

    // Extract phone
    const phoneRegex = /(?:\+91|91)?[-.\s]?[6-9]\d{9}/;
    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) parsed.phone = phoneMatch[0];

    // Extract name (usually first line or after "name:")
    for (let line of lines.slice(0, 5)) {
      if (line.length > 3 && line.length < 50 && !line.includes('@') && !line.match(/\d{10}/)) {
        if (!parsed.name && (line.split(' ').length >= 2 || line.toLowerCase().includes('name'))) {
          parsed.name = line.replace(/name:?\s*/i, '').trim();
          break;
        }
      }
    }

    // Extract GitHub
    const githubRegex = /github\.com\/([a-zA-Z0-9-_]+)/i;
    const githubMatch = text.match(githubRegex);
    if (githubMatch) parsed.github = `https://github.com/${githubMatch[1]}`;

    // Extract LinkedIn
    const linkedinRegex = /linkedin\.com\/in\/([a-zA-Z0-9-_]+)/i;
    const linkedinMatch = text.match(linkedinRegex);
    if (linkedinMatch) parsed.linkedin = `https://linkedin.com/in/${linkedinMatch[1]}`;

    // Extract skills
    const skillKeywords = [
      'javascript', 'python', 'java', 'react', 'node', 'angular', 'vue', 'html', 'css',
      'mongodb', 'mysql', 'postgresql', 'git', 'docker', 'kubernetes', 'aws', 'azure',
      'machine learning', 'artificial intelligence', 'data science', 'blockchain',
      'flutter', 'react native', 'swift', 'kotlin', 'c++', 'c#', 'php', 'ruby',
      'tensorflow', 'pytorch', 'pandas', 'numpy', 'django', 'flask', 'express'
    ];

    skillKeywords.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        if (!parsed.skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
          parsed.skills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
        }
      }
    });

    return parsed;
  }

  // Handle form submission with backend integration
  async function onSubmit(e) {
    if (e) e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setMsg("❌ Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMsg("❌ Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setMsg("❌ Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMsg("❌ Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setMsg("🔄 Creating your account...");

    try {
      // Prepare user data for registration
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        college: formData.college,
        skills: formData.skills,
        experience: formData.experience,
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        resumeUrl: formData.resumeUrl,
        resumeFileName: formData.resumeFileName,
        role: formData.role
      };

      // Register user with backend
      const result = await register(userData);

      if (result.success) {
        if (result.requiresVerification) {
          setMsg("✅ Registration successful! Please verify your email.");
          setTimeout(() => {
            navigate("/verify-email", { 
              state: { email: formData.email } 
            });
          }, 1500);
        } else {
          setMsg("✅ Registration successful! Redirecting...");
          setTimeout(() => {
            if (formData.role === "participant") {
              navigate("/events");
            } else {
              navigate("/create-event");
            }
          }, 1500);
        }
      } else {
        setMsg(`❌ ${result.error}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMsg("❌ Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Header */}
        <div className="signup-header">
          <h1>Join <span className="brand">HackTatva</span></h1>
          <p>Create your account and start your innovation journey</p>
        </div>

        {/* Main Form */}
        <div className="signup-content">
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label>College/University</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="Your institution name"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 6 characters"
                  className="form-input"
                  required
                />
              </div>

              <div className="input-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="form-section">
            <h2>I am a</h2>
            <div className="role-options">
              <label className={`role-option ${formData.role === "participant" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="participant"
                  checked={formData.role === "participant"}
                  onChange={handleInputChange}
                />
                <div className="role-content">
                  <span className="role-icon"></span>
                  <span className="role-text">Participant</span>
                  <span className="role-desc">Join hackathons and compete</span>
                </div>
              </label>
              
              <label className={`role-option ${formData.role === "organiser" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="organiser"
                  checked={formData.role === "organiser"}
                  onChange={handleInputChange}
                />
                <div className="role-content">
                  <span className="role-icon"></span>
                  <span className="role-text">Organiser</span>
                  <span className="role-desc">Host and manage events</span>
                </div>
              </label>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="form-section">
            <h2>Resume Upload & Auto-Fill</h2>
            <div className="resume-upload">
              <div className="upload-area">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleResumeUpload}
                  className="file-input"
                />
                <label htmlFor="resume" className="upload-label">
                  <div className="upload-content">
                    <span className="upload-icon"></span>
                    <span className="upload-text">
                      {resumeFile ? resumeFile.name : "Click to upload your resume"}
                    </span>
                    <span className="upload-subtext">
                      Supports PDF, DOCX, TXT files
                    </span>
                  </div>
                </label>
              </div>
              
              {isParsingResume && (
                <div className="parsing-status">
                  <div className="loading-spinner"></div>
                  <span>Parsing resume...</span>
                </div>
              )}

              {parsedData && (
                <div className="parsed-preview">
                  <h3>Extracted Information</h3>
                  <div className="parsed-grid">
                    {parsedData.name && <div><strong>Name:</strong> {parsedData.name}</div>}
                    {parsedData.email && <div><strong>Email:</strong> {parsedData.email}</div>}
                    {parsedData.phone && <div><strong>Phone:</strong> {parsedData.phone}</div>}
                    {parsedData.skills.length > 0 && (
                      <div><strong>Skills Found:</strong> {parsedData.skills.join(", ")}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="form-section">
            <h2>Technical Skills</h2>
            <div className="skills-input">
              <div className="skill-add">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill (e.g., JavaScript, Python, React)"
                  className="form-input"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button type="button" onClick={addSkill} className="add-skill-btn">
                  Add
                </button>
              </div>
              
              <div className="skills-list">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="remove-skill"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="form-section">
            <h2>Professional Links</h2>
            <div className="form-grid">
              <div className="input-group">
                <label>GitHub Profile</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label>LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label>Portfolio Website</label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label>Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3-5 years)</option>
                  <option value="expert">Expert (5+ years)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" onClick={onSubmit} className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '20px 0',
            color: '#666'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
            <span style={{ margin: '0 15px', fontSize: '14px' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
          </div>

          {/* Google OAuth Button */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button 
              type="button" 
              onClick={loginWithGoogle}
              style={{
                width: '100%',
                maxWidth: '300px',
                padding: '12px',
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '16px',
                margin: '0 auto'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {msg && <div className="message">{msg}</div>}

          <div className="login-link">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>

      <style>{`
        .signup-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1c2341ff 0%, #1c2341ff 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
        }

        .signup-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .signup-header {
          background: linear-gradient(135deg, #1a2868ff, #1a2868ff);
          color: white;
          padding: 40px;
          text-align: center;
        }

        .signup-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 0 10px 0;
        }

        .brand {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .signup-header p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }

        .signup-content {
          padding: 40px;
        }

        .form-section {
          margin-bottom: 40px;
        }

        .form-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .form-input, select {
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .form-input:focus, select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .role-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .role-option {
          padding: 20px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .role-option:hover {
          border-color: #cbd5e0;
          transform: translateY(-2px);
        }

        .role-option.selected {
          border-color: #667eea;
          background: #eef2ff;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .role-option input {
          display: none;
        }

        .role-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .role-icon {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .role-text {
          font-weight: 700;
          color: #2d3748;
          font-size: 1.1rem;
        }

        .role-desc {
          font-size: 0.9rem;
          color: #718096;
          text-align: center;
        }

        .resume-upload {
          margin-bottom: 20px;
        }

        .upload-area {
          position: relative;
          margin-bottom: 20px;
        }

        .file-input {
          display: none;
        }

        .upload-label {
          display: block;
          padding: 30px;
          border: 2px dashed #cbd5e0;
          border-radius: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .upload-label:hover {
          border-color: #667eea;
          background: #eef2ff;
        }

        .upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .upload-icon {
          font-size: 2rem;
        }

        .upload-text {
          font-weight: 600;
          color: #4a5568;
        }

        .upload-subtext {
          font-size: 0.85rem;
          color: #718096;
        }

        .parsing-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background: #eef2ff;
          border-radius: 10px;
          color: #667eea;
          font-weight: 500;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #e2e8f0;
          border-top: 2px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .parsed-preview {
          padding: 20px;
          background: #f0fff4;
          border: 1px solid #9ae6b4;
          border-radius: 10px;
          margin-top: 15px;
        }

        .parsed-preview h3 {
          margin: 0 0 15px 0;
          color: #2f855a;
          font-size: 1.1rem;
        }

        .parsed-grid {
          display: grid;
          gap: 8px;
          font-size: 0.9rem;
          color: #2d3748;
        }

        .skills-input {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .skill-add {
          display: flex;
          gap: 10px;
        }

        .skill-add .form-input {
          flex: 1;
        }

        .add-skill-btn {
          padding: 12px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-skill-btn:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #eef2ff;
          color: #667eea;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .remove-skill {
          background: none;
          border: none;
          color: #667eea;
          cursor: pointer;
          font-weight: bold;
          padding: 0;
          margin-left: 4px;
        }

        .remove-skill:hover {
          color: #e53e3e;
        }

        .form-actions {
          text-align: center;
          margin-top: 40px;
        }

        .submit-btn {
          padding: 15px 40px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .message {
          margin-top: 20px;
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          font-weight: 500;
          background: #f0fff4;
          color: #2f855a;
          border: 1px solid #9ae6b4;
        }

        .login-link {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #718096;
        }

        .login-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .signup-container {
            padding: 10px;
          }
          
          .signup-content {
            padding: 30px 20px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .role-options {
            grid-template-columns: 1fr;
          }
          
          .skill-add {
            flex-direction: column;
          }
          
          .signup-header {
            padding: 30px 20px;
          }
          
          .signup-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}