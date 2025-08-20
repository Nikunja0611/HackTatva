import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft, Sparkles, Users, BarChart3 } from 'lucide-react';
import './login.css';

const OrganiserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.organizationName) {
        newErrors.organizationName = 'Organization name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard
      window.location.href = '/organisers/dashboard';
    }, 2000);
  };

  const handleBackToLanding = () => {
    window.location.href = '/';
  };

  const features = [
    {
      icon: <Users className="feature-icon" />,
      title: "Team Management",
      description: "Effortlessly manage participants and teams"
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      title: "Real-time Analytics",
      description: "Track engagement and performance metrics"
    },
    {
      icon: <Sparkles className="feature-icon" />,
      title: "AI-powered Tools",
      description: "Smart matching and automated processes"
    }
  ];

  return (
    <div className="login-container">
      {/* Left Panel - Features */}
      <div className="left-panel">
        {/* Background decoration */}
        <div className="bg-overlay"></div>
        <div className="bg-decoration bg-decoration-1"></div>
        <div className="bg-decoration bg-decoration-2"></div>
        
        <div className="left-content">
          <button 
            onClick={handleBackToLanding}
            className="back-button desktop-back"
          >
            <ArrowLeft className="back-icon" />
            Back to Home
          </button>
          
          <div className="hero-section">
            <h1 className="hero-title">Welcome to HackSphere</h1>
            <p className="hero-subtitle">
              Join thousands of organizers who trust our platform to create exceptional hackathon experiences.
            </p>
          </div>
        </div>

        <div className="features-section">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-item ${mounted ? 'feature-visible' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Events Hosted</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.8%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="right-panel">
        <div className="form-container">
          {/* Mobile back button */}
          <button 
            onClick={handleBackToLanding}
            className="back-button mobile-back"
          >
            <ArrowLeft className="back-icon" />
            Back to Home
          </button>

          <div className="form-card">
            {/* Toggle between Login/Signup */}
            <div className="form-toggle">
              <button
                onClick={() => setIsLogin(true)}
                className={`toggle-btn ${isLogin ? 'active' : ''}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              >
                Sign Up
              </button>
            </div>

            <div className="form-header">
              <h2 className="form-title">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="form-subtitle">
                {isLogin 
                  ? 'Sign in to access your organizer dashboard' 
                  : 'Join thousands of successful hackathon organizers'
                }
              </p>
            </div>

            <div className="form-fields">
              {!isLogin && (
                <div className={`field-group ${mounted ? 'field-visible' : ''}`}>
                  <label className="field-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="error-message">{errors.fullName}</p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div 
                  className={`field-group ${mounted ? 'field-visible' : ''}`}
                  style={{ transitionDelay: '100ms' }}
                >
                  <label className="field-label">Organization Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.organizationName ? 'error' : ''}`}
                    placeholder="Enter organization name"
                  />
                  {errors.organizationName && (
                    <p className="error-message">{errors.organizationName}</p>
                  )}
                </div>
              )}

              <div 
                className={`field-group ${mounted ? 'field-visible' : ''}`}
                style={{ transitionDelay: isLogin ? '0ms' : '200ms' }}
              >
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div 
                className={`field-group ${mounted ? 'field-visible' : ''}`}
                style={{ transitionDelay: isLogin ? '100ms' : '300ms' }}
              >
                <label className="field-label">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input password-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff className="eye-icon" /> : <Eye className="eye-icon" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div 
                  className={`field-group ${mounted ? 'field-visible' : ''}`}
                  style={{ transitionDelay: '400ms' }}
                >
                  <label className="field-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="login-options">
                  <label className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox" />
                    <span className="checkbox-label">Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <div className="loading-content">
                    <div className="spinner"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  <span className="submit-content">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <span className="submit-arrow">→</span>
                  </span>
                )}
              </button>
            </div>

            <div className="form-footer">
              <p className="switch-text">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="switch-btn"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Mobile features */}
          <div className="mobile-features">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`mobile-feature-item ${mounted ? 'feature-visible' : ''}`}
                style={{ transitionDelay: `${index * 200 + 500}ms` }}
              >
                <div className="mobile-feature-icon">
                  {feature.icon}
                </div>
                <div className="mobile-feature-content">
                  <h3 className="mobile-feature-title">{feature.title}</h3>
                  <p className="mobile-feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganiserLogin;