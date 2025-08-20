const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Use Gmail SMTP or other email service
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use app password for Gmail
      }
    });
  }

  async sendVerificationEmail(email, verificationCode, name) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - HackTatva',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to HackTatva, ${name}!</h2>
          <p>Thank you for registering. Please verify your email address to complete your registration.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #007bff;">
              <h3 style="color: #007bff; margin: 0 0 10px 0;">Your Verification Code</h3>
              <div style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; margin: 20px 0;">
                ${verificationCode}
              </div>
              <p style="color: #666; margin: 0;">Enter this code on the verification screen</p>
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This code will expire in 10 minutes. If you didn't create an account, please ignore this email.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Need help? Contact us at support@hacktatva.com
          </p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Verification email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      return false;
    }
  }

  async sendPasswordResetEmail(email, resetCode, name) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password - HackTatva',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${name},</p>
          <p>We received a request to reset your password. Use the code below to create a new password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #dc3545;">
              <h3 style="color: #dc3545; margin: 0 0 10px 0;">Your Reset Code</h3>
              <div style="font-size: 32px; font-weight: bold; color: #dc3545; letter-spacing: 5px; margin: 20px 0;">
                ${resetCode}
              </div>
              <p style="color: #666; margin: 0;">Enter this code on the password reset screen</p>
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            This code will expire in 10 minutes. If you didn't request a password reset, please ignore this email.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            For security reasons, this code will expire in 10 minutes.
          </p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Password reset email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      return false;
    }
  }

  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to HackTatva!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to HackTatva, ${name}! 🎉</h2>
          <p>Your account has been successfully created and verified!</p>
          <p>You can now:</p>
          <ul>
            <li>Browse and register for events</li>
            <li>Create and manage teams</li>
            <li>Submit your projects</li>
            <li>Track your progress on the leaderboard</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/events" 
               style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Explore Events
            </a>
          </div>
          <p>Happy hacking! 🚀</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      return false;
    }
  }
}

module.exports = new EmailService();
