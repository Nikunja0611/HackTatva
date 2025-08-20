import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("participant");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || "/events";

  async function onSubmit(e) {
    if (e) e.preventDefault();

    // Validation
    if (!email || !password) {
      setMsg("❌ Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg("❌ Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setMsg("🔄 Logging in...");

    try {
      // Login with backend
      const result = await login(email, password);

      if (result.success) {
        setMsg("✅ Login successful! Redirecting...");
        
        setTimeout(() => {
          // Redirect to the page they were trying to access, or based on role
          if (role === "participant") {
            navigate(from);
          } else {
            navigate("/create-event");
          }
        }, 1500);
      } else {
        setMsg(`❌ ${result.error}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("❌ Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-container">
      {/* Left Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome to <span className="brand">HackTatva</span>
          </h1>
          <div className="welcome-description">
            <p>India's Premier Hackathon Platform</p>
            <p>Join thousands of innovators, developers, and creators in building the future. Whether you're here to participate in exciting challenges or organize your own hackathon, HackTatva provides the perfect ecosystem for innovation.</p>
            
            <div className="features">
              <div className="feature">
                <span className="feature-icon"></span>
                <span>Innovative Challenges</span>
              </div>
              <div className="feature">
                <span className="feature-icon"></span>
                <span>Collaborative Teams</span>
              </div>
              <div className="feature">
                <span className="feature-icon"></span>
                <span>Amazing Prizes</span>
              </div>
              <div className="feature">
                <span className="feature-icon"></span>
                <span>Industry Recognition</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Auth Section */}
      <div className="auth-section">
        <div className="auth-card">
          <h2 className="auth-title">Login to Your Account</h2>
          
          <div className="auth-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="form-input"
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="form-input"
              />
            </div>

            <div className="role-section">
              <p className="role-label">I am a:</p>
              <div className="role-options">
                <label className={`role-option ${role === "participant" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    value="participant"
                    checked={role === "participant"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <div className="role-content">
                    <span className="role-icon"></span>
                    <span className="role-text">Participant</span>
                    <span className="role-desc">Join hackathons & compete</span>
                  </div>
                </label>
                
                <label className={`role-option ${role === "organiser" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    value="organiser"
                    checked={role === "organiser"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <div className="role-content">
                    <span className="role-icon"></span>
                    <span className="role-text">Organiser</span>
                    <span className="role-desc">Host & manage events</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="button" onClick={onSubmit} className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Logging In..." : "Login"}
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
          <button 
            type="button" 
            onClick={loginWithGoogle}
            style={{
              width: '100%',
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
              marginBottom: '20px'
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

          {msg && <p className="message">{msg}</p>}

          <div className="forgot-password">
            <a href="/forgot-password" className="forgot-link">
              Forgot your password?
            </a>
          </div>

          <div className="signup-section">
            <p>
              Don't have an account?{" "}
              <button 
                type="button" 
                onClick={() => navigate("/signup")} // This will now actually navigate
                className="signup-btn"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .auth-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .welcome-section {
          flex: 1;
          background: linear-gradient(135deg, #0d1743ff 0%, #0d1743ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .welcome-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
          opacity: 0.3;
        }

        .welcome-content {
          position: relative;
          z-index: 1;
          max-width: 500px;
          animation: fadeInUp 0.8s ease-out;
        }

        .welcome-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 30px;
          line-height: 1.1;
        }

        .brand {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .welcome-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .welcome-description > p:first-child {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #fff3cd;
        }

        .features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 30px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .feature-icon {
          font-size: 1.5rem;
        }

        .auth-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: #f8fafc;
        }

        .auth-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
          position: relative;
          animation: fadeInUp 0.6s ease-out;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 20px 20px 0 0;
        }

        .auth-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: #2d3748;
          text-align: center;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #f8fafc;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .role-section {
          margin: 10px 0;
        }

        .role-label {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 15px;
          text-align: left;
        }

        .role-options {
          display: flex;
          gap: 15px;
        }

        .role-option {
          flex: 1;
          padding: 15px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
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
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }

        .role-option input {
          display: none;
        }

        .role-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .role-icon {
          font-size: 1.8rem;
          margin-bottom: 5px;
        }

        .role-text {
          font-weight: 600;
          color: #2d3748;
        }

        .role-desc {
          font-size: 0.85rem;
          color: #718096;
          text-align: center;
        }

        .submit-btn {
          padding: 15px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:active {
          transform: translateY(0);
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

        .forgot-password {
          text-align: center;
          margin-top: 20px;
        }

        .forgot-link {
          color: #667eea;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .signup-section {
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          color: #718096;
        }

        .signup-btn {
          background: none;
          border: none;
          color: #667eea;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          font-size: inherit;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .signup-btn:hover {
          background: #eef2ff;
          color: #5a67d8;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .auth-container {
            flex-direction: column;
          }
          
          .welcome-section {
            min-height: 40vh;
            padding: 30px 20px;
          }
          
          .welcome-title {
            font-size: 2.5rem;
          }
          
          .features {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .auth-section {
            padding: 20px;
          }
          
          .auth-card {
            padding: 30px 25px;
          }
          
          .role-options {
            flex-direction: column;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-card {
          animation: fadeInUp 0.6s ease-out;
        }

        .welcome-content {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}