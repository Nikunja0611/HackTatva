import React, { useState, useEffect } from 'react';
import './Landing.css';

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [featuresInView, setFeaturesInView] = useState(false);
  const [rolesInView, setRolesInView] = useState(false);
  const [workflowInView, setWorkflowInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const createObserver = (setter) => new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setter(true);
        }
      });
    }, observerOptions);

    const featuresObserver = createObserver(setFeaturesInView);
    const rolesObserver = createObserver(setRolesInView);
    const workflowObserver = createObserver(setWorkflowInView);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const featuresSection = document.getElementById('features');
    const rolesSection = document.getElementById('platform');
    const workflowSection = document.getElementById('workflow');

    if (featuresSection) featuresObserver.observe(featuresSection);
    if (rolesSection) rolesObserver.observe(rolesSection);
    if (workflowSection) workflowObserver.observe(workflowSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      featuresObserver.disconnect();
      rolesObserver.disconnect();
      workflowObserver.disconnect();
    };
  }, []);

  const features = [
    {
      title: "AI Team Matching",
      description: "Smart algorithms match participants based on skills, experience levels, and project preferences for optimal team formation.",
      icon: "",
      color: "blue-cyan"
    },
    {
      title: "Live Judging System",
      description: "Real-time evaluation with transparent scoring, automated feedback, and instant leaderboard updates.",
      icon: "",
      color: "purple-pink"
    },
    {
      title: "Project Analytics",
      description: "Comprehensive insights into submission patterns, code quality metrics, and participant engagement levels.",
      icon: "",
      color: "green-emerald"
    },
    {
      title: "Blockchain Certificates",
      description: "Immutable, verifiable digital certificates with QR codes for instant validation of achievements.",
      icon: "",
      color: "orange-red"
    },
    {
      title: "Collaboration Hub",
      description: "Integrated workspace with version control, real-time chat, file sharing, and progress tracking tools.",
      icon: "",
      color: "indigo-blue"
    },
    {
      title: "Mentorship Network",
      description: "Connect with industry experts, get guidance, and receive feedback throughout the hackathon journey.",
      icon: "",
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
      icon: "",
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
      icon: "",
      color: "green-teal"
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
      icon: "",
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

  const FloatingParticles = () => {
    return (
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  };

  const MouseFollower = () => {
    return (
      <div
        className="mouse-follower"
        style={{
          transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12}px)`,
        }}
      />
    );
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <div className="logo">
              <div className="logo-icon">
                <span>H</span>
              </div>
              <span className="logo-text">HackTatva</span>
            </div>

            {/* Navigation Links */}
            <nav className="nav-links">
              <a href="/">Home</a>
              <a href="/events">Events</a>
              <a href="#features">Features</a>
              <a href="#platform">Platform</a>
              <a href="#workflow">How it Works</a>
            </nav>

            {/* CTA Button */}
            <button 
              onClick={() => window.location.href = '/login'}
              className="cta-button"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
      
      <FloatingParticles />
      <MouseFollower />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="hero-bg"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        <div className="hero-container">
          <div
            className="hero-content"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 800)
            }}
          >
            {/* Animated Badge */}
            <div className="hero-badge">
              <div className="badge-dot" />
              <span>Next-Generation Hackathon Platform</span>
            </div>
            
            {/* Main Title */}
            <div className="hero-title">
              <h1>
                <span className="gradient-text">Build Amazing</span>
              </h1>
              <h1>Products Together</h1>
            </div>
            
            <p className="hero-description">
              The most comprehensive hackathon management platform. From AI-powered team matching 
              to blockchain certificates, we're revolutionizing how innovation happens.
            </p>
            
            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button className="primary-button"  onClick={() => window.location.href = '/login'}>
                <span>Launch Your Hackathon</span>
              </button>
              
              <button className="secondary-button" onClick={() => window.location.href = '/login'}>
                <span className="button-content">
                  <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                  </svg>
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Animated Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number blue-purple">500+</div>
                <div className="stat-label">Events Hosted</div>
              </div>
              <div className="stat-item">
                <div className="stat-number green-emerald">50K+</div>
                <div className="stat-label">Developers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number purple-pink">99.8%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Powerful <span className="gradient-text-blue">Features</span></h2>
            <p>Every tool you need to create engaging, fair, and successful hackathons</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${featuresInView ? 'in-view' : ''}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className={`feature-bg ${feature.color}`} />
                
                <div className={`feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>
                
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="platform-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Built for <span className="gradient-text-green">Everyone</span></h2>
            <p>Tailored experiences for organizers, participants, and judges with role-specific dashboards</p>
          </div>

          <div className="roles-container">
            {roles.map((role, index) => (
              <div
                key={index}
                className={`role-item ${index % 2 === 1 ? 'reverse' : ''} ${
                  rolesInView ? 'in-view' : ''
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                {/* Content */}
                <div className="role-content">
                  <div className={`role-icon ${role.color}`}>
                    {role.icon}
                  </div>
                  
                  <div className="role-text">
                    <h3>{role.title}</h3>
                    <p className="role-subtitle">{role.subtitle}</p>
                    <p className="role-description">{role.description}</p>
                  </div>

                  <ul className="role-features">
                    {role.features.map((feature, i) => (
                      <li key={i}>
                        <div className="check-icon">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preview Card */}
                <div className="role-preview">
                  <div className={`preview-card ${role.color}`}>
                    <div className="preview-overlay" />
                    <div className="preview-content">
                      <div className="preview-icon">{role.icon}</div>
                      <h4>“Empowering Innovation</h4>
                      <p>Join us! Explore opportunities, and resources designed to help you grow.</p>
                      <button onClick={() => window.location.href = '/login'}>Explore Features</button>
                    </div>
                    
                    <div className="preview-bg-1" />
                    <div className="preview-bg-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="workflow-section">
        <div className="workflow-bg">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="workflow-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="section-container">
          <div className="section-header white">
            <h2>Simple <span className="gradient-text-cyan">Workflow</span></h2>
            <p>From concept to celebration - streamlined for maximum efficiency and impact</p>
          </div>
          
          <div className="workflow-grid">
            {workflowSteps.map((step, index) => (
              <div
                key={index}
                className={`workflow-step ${workflowInView ? 'in-view' : ''}`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="step-number">
                  <div className="step-circle">
                    {step.step}
                  </div>
                  
                  {index < workflowSteps.length - 1 && (
                    <div className="step-line" />
                  )}
                </div>
                
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="workflow-cta">
            <button className="workflow-button" onClick={() => window.location.href = '/login'}>
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg" />
        
        <div className="section-container">
          <h2>Ready to Transform Your Next Hackathon?</h2>
          <p>
            Join thousands of organizers who trust HackSphere to deliver exceptional hackathon experiences. 
            Get started today and see the difference.
          </p>
          
          <div className="cta-buttons">
            <button className="cta-primary">
              <span>Start Free Trial</span>
            </button>
            <button className="cta-secondary">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">H</div>
                <h3>HackTatva</h3>
              </div>
              <p>
                Empowering innovation through cutting-edge hackathon technology. 
                Built by developers, for developers.
              </p>
            </div>
            
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">Integrations</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 HackTatva. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;