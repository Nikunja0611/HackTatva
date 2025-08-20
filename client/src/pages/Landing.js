import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [featuresInView, setFeaturesInView] = useState(false);
  const [rolesInView, setRolesInView] = useState(false);
  const [workflowInView, setWorkflowInView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 100);
    };

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const featuresObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setFeaturesInView(true);
        }
      });
    }, observerOptions);

    const rolesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setRolesInView(true);
        }
      });
    }, observerOptions);

    const workflowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setWorkflowInView(true);
        }
      });
    }, observerOptions);

    window.addEventListener('scroll', handleScroll);

    const featuresSection = document.getElementById('features');
    const rolesSection = document.getElementById('platform');
    const workflowSection = document.getElementById('workflow');

    if (featuresSection) featuresObserver.observe(featuresSection);
    if (rolesSection) rolesObserver.observe(rolesSection);
    if (workflowSection) workflowObserver.observe(workflowSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      featuresObserver.disconnect();
      rolesObserver.disconnect();
      workflowObserver.disconnect();
    };
  }, []);

  const features = [
    {
      title: "AI Team Matching",
      description: "Smart algorithms match participants based on skills, experience levels, and project preferences for optimal team formation.",
      icon: "🤖",
      color: "blue-cyan"
    },
    {
      title: "Live Judging System",
      description: "Real-time evaluation with transparent scoring, automated feedback, and instant leaderboard updates.",
      icon: "⚖️",
      color: "purple-pink"
    },
    {
      title: "Project Analytics",
      description: "Comprehensive insights into submission patterns, code quality metrics, and participant engagement levels.",
      icon: "📊",
      color: "green-emerald"
    },
    {
      title: "Blockchain Certificates",
      description: "Immutable, verifiable digital certificates with QR codes for instant validation of achievements.",
      icon: "🏆",
      color: "orange-red"
    },
    {
      title: "Collaboration Hub",
      description: "Integrated workspace with version control, real-time chat, file sharing, and progress tracking tools.",
      icon: "🔗",
      color: "indigo-blue"
    },
    {
      title: "Mentorship Network",
      description: "Connect with industry experts, get guidance, and receive feedback throughout the hackathon journey.",
      icon: "👥",
      color: "pink-rose"
    }
  ];

  const roles = [
    {
      title: "For Organizers",
      subtitle: "Complete Event Management",
      description: "Everything you need to host world-class hackathons",
      features: [
        "One-click event setup with customizable templates",
        "Automated participant registration and team formation",
        "Real-time analytics dashboard with engagement metrics",
        "Sponsor management with branding integration",
        "Automated certificate generation and distribution"
      ],
      icon: "🎯",
      color: "blue-purple"
    },
    {
      title: "For Participants",
      subtitle: "Enhanced Hacking Experience", 
      description: "Tools designed to maximize your creative potential",
      features: [
        "Smart team matching based on complementary skills",
        "Integrated development environment and tools",
        "Real-time mentorship and support system",
        "Progress tracking with milestone celebrations",
        "Portfolio integration for showcase opportunities"
      ],
      icon: "💻",
      color: "green-cyan"
    },
    {
      title: "For Judges",
      subtitle: "Streamlined Evaluation",
      description: "Fair, transparent, and efficient judging process",
      features: [
        "AI-assisted project analysis and scoring",
        "Standardized evaluation criteria and rubrics",
        "Real-time collaboration with fellow judges",
        "Automated plagiarism and originality checks",
        "Instant result compilation and publishing"
      ],
      icon: "⚡",
      color: "purple-pink"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Create & Configure",
      description: "Set up your hackathon with our intuitive builder, customize themes, and define evaluation criteria in minutes."
    },
    {
      step: "02", 
      title: "Recruit & Match",
      description: "Participants join, get matched into balanced teams, and access their personalized collaboration workspace."
    },
    {
      step: "03",
      title: "Build & Monitor",
      description: "Teams develop their projects while you track progress, engagement, and provide real-time support."
    },
    {
      step: "04",
      title: "Judge & Celebrate",
      description: "Streamlined judging process with AI assistance, instant results, and automated certificate distribution."
    }
  ];

  const getFeatureTransform = (index, isVisible) => {
    if (!isVisible) {
      return {
        transform: 'translateY(60px) scale(0.95)',
        opacity: 0,
        transition: `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.2}s`
      };
    }
    
    return {
      transform: 'translateY(0px) scale(1)',
      opacity: 1,
      transition: `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.2}s`
    };
  };

  const getRoleTransform = (index, isVisible) => {
    if (!isVisible) {
      return {
        transform: `translateX(${index % 2 === 0 ? '-' : ''}60px) scale(0.9)`,
        opacity: 0,
        transition: `all 1s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.3}s`
      };
    }
    
    return {
      transform: 'translateX(0px) scale(1)',
      opacity: 1,
      transition: `all 1s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.3}s`
    };
  };

  const getWorkflowTransform = (index, isVisible) => {
    if (!isVisible) {
      return {
        transform: 'translateY(50px) scale(0.8)',
        opacity: 0,
        transition: `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.2}s`
      };
    }
    
    return {
      transform: 'translateY(0px) scale(1)',
      opacity: 1,
      transition: `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.2}s`
    };
  };

  const handleRoleButtonClick = (roleTitle) => {
    if (roleTitle === "For Organizers") {
      navigate('./organisers/login');
    }
    // Add other navigation logic for other roles if needed
  };

  return (
    <div className="landing-container">
      
      {/* Navbar */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <div className="logo-icon">
            <span>H</span>
          </div>
          <h1 className="logo-text">
            HackSphere
          </h1>
        </div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#platform">Platform</a>
          <a href="#workflow">How it Works</a>
          <a href="#about">About</a>
          <button className="btn-primary">
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div 
            className="hero-content"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: 1 - scrollY / 1000
            }}
          >
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              Next-Generation Hackathon Platform
            </div>
            
            <h1 className="hero-title">
              <span className="gradient-text-blue-purple">
                Build Amazing
              </span>
              <br />
              <span>Products Together</span>
            </h1>
            
            <p className="hero-subtitle">
              The most comprehensive hackathon management platform. From AI-powered team matching 
              to blockchain certificates, we're revolutionizing how innovation happens.
            </p>
            
            <div className="hero-buttons">
              <button className="btn-hero-primary">
                Launch Your Hackathon
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number gradient-text-blue-purple">500+</div>
                <div className="stat-label">Events Hosted</div>
              </div>
              <div className="stat-item">
                <div className="stat-number gradient-text-green-cyan">50K+</div>
                <div className="stat-label">Developers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number gradient-text-purple-pink">99.8%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Powerful <span className="gradient-text-blue-purple">Features</span>
            </h2>
            <p className="section-subtitle">
              Every tool you need to create engaging, fair, and successful hackathons
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const style = getFeatureTransform(index, featuresInView);
              
              return (
                <div key={index} className="feature-card-wrapper" style={style}>
                  <div className={`feature-card hover-effect-${index % 6}`}>
                    <div 
                      className="feature-bg" 
                      style={{ background: `linear-gradient(to right, ${feature.color === 'blue-cyan' ? '#3b82f6, #06b6d4' : feature.color === 'purple-pink' ? '#8b5cf6, #ec4899' : feature.color === 'green-emerald' ? '#10b981, #059669' : feature.color === 'orange-red' ? '#f97316, #dc2626' : feature.color === 'indigo-blue' ? '#6366f1, #3b82f6' : '#ec4899, #f43f5e'})` }}
                    ></div>
                    
                    <div 
                      className="feature-icon" 
                      style={{ background: `linear-gradient(to right, ${feature.color === 'blue-cyan' ? '#3b82f6, #06b6d4' : feature.color === 'purple-pink' ? '#8b5cf6, #ec4899' : feature.color === 'green-emerald' ? '#10b981, #059669' : feature.color === 'orange-red' ? '#f97316, #dc2626' : feature.color === 'indigo-blue' ? '#6366f1, #3b82f6' : '#ec4899, #f43f5e'})` }}
                    >
                      {feature.icon}
                      <div 
                        className="feature-icon-pulse" 
                        style={{ background: `linear-gradient(to right, ${feature.color === 'blue-cyan' ? '#3b82f6, #06b6d4' : feature.color === 'purple-pink' ? '#8b5cf6, #ec4899' : feature.color === 'green-emerald' ? '#10b981, #059669' : feature.color === 'orange-red' ? '#f97316, #dc2626' : feature.color === 'indigo-blue' ? '#6366f1, #3b82f6' : '#ec4899, #f43f5e'})` }}
                      ></div>
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    
                    <div className="feature-border"></div>
                    
                    <div className="floating-particles">
                      <div className="particle particle-1"></div>
                      <div className="particle particle-2"></div>
                      <div className="particle particle-3"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="platform">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Built for <span className="gradient-text-green-cyan">Everyone</span>
            </h2>
            <p className="section-subtitle">
              Tailored experiences for organizers, participants, and judges with role-specific dashboards
            </p>
          </div>

          <div className="roles-container">
            {roles.map((role, index) => {
              const style = getRoleTransform(index, rolesInView);
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`role-item ${isEven ? 'role-left' : 'role-right'}`}
                  style={style}
                >
                  <div className="role-content">
                    <div 
                      className="role-icon" 
                      style={{ background: `linear-gradient(135deg, ${role.color === 'blue-purple' ? '#2563eb, #9333ea' : role.color === 'green-cyan' ? '#059669, #0891b2' : '#9333ea, #ec4899'})` }}
                    >
                      {role.icon}
                    </div>
                    <h3 className="role-title">
                      {role.title}
                    </h3>
                    <p className="role-subtitle">
                      {role.subtitle}
                    </p>
                    <p className="role-description">
                      {role.description}
                    </p>
                    <ul className="role-features">
                      {role.features.map((feature, i) => (
                        <li key={i}>
                          <div className="feature-check">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="role-preview">
                    <div 
                      className="role-preview-card" 
                      style={{ background: `linear-gradient(135deg, ${role.color === 'blue-purple' ? '#2563eb, #9333ea' : role.color === 'green-cyan' ? '#059669, #0891b2' : '#9333ea, #ec4899'})` }}
                    >
                      <div className="role-preview-overlay"></div>
                      <div className="role-preview-content">
                        <div className="role-preview-icon">{role.icon}</div>
                        <h4 className="role-preview-title">Dashboard Preview</h4>
                        <p className="role-preview-text">Experience intuitive design and powerful functionality</p>
                        <button 
                          className="role-preview-button"
                          onClick={() => handleRoleButtonClick(role.title)}
                        >
                          {role.title === "For Organizers" ? "Start Organising" : "Explore Features"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="workflow">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Simple <span className="gradient-text-cyan-green">Workflow</span>
            </h2>
            <p className="section-subtitle">
              From concept to celebration - streamlined for maximum efficiency and impact
            </p>
          </div>
          
          <div className="workflow-grid">
            {workflowSteps.map((step, index) => {
              const style = getWorkflowTransform(index, workflowInView);
              
              return (
                <div
                  key={index}
                  className="workflow-step"
                  style={style}
                >
                  <div className="workflow-step-number">
                    <div className="workflow-number">{step.step}</div>
                    {index < workflowSteps.length - 1 && (
                      <div className="workflow-line"></div>
                    )}
                  </div>
                  <h4 className="workflow-title">{step.title}</h4>
                  <p className="workflow-description">{step.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="workflow-cta">
            <button className="btn-workflow">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Transform Your Next Hackathon?
          </h2>
          <p className="cta-subtitle">
            Join thousands of organizers who trust HackSphere to deliver exceptional hackathon experiences. 
            Get started today and see the difference.
          </p>
          <div className="cta-buttons">
            <button className="btn-cta-primary">
              Start Free Trial
            </button>
            <button className="btn-cta-secondary">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <div className="logo-icon">
                  <span>H</span>
                </div>
                <h3 className="footer-brand-text">HackSphere</h3>
              </div>
              <p className="footer-description">
                Empowering innovation through cutting-edge hackathon technology. 
                Built by developers, for developers.
              </p>
            </div>
            
            <div>
              <h4 className="footer-title">Product</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#docs">API Documentation</a></li>
                <li><a href="#integrations">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#status">Status</a></li>
                <li><a href="#security">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 HackSphere. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;