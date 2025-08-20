import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Users, Code, ExternalLink, Download, Star, Check, X, Eye, GitBranch, Clock, Award, FileText, Zap, TrendingUp, Target } from 'lucide-react';
import './submissions.css';

const SubmissionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock data for submissions
  const mockSubmissions = [
    {
      id: 1,
      teamName: "Code Crusaders",
      projectTitle: "EcoTrack - Sustainable Living App",
      members: ["Alex Chen", "Sarah Johnson", "Michael Rodriguez"],
      submittedAt: "2024-08-19T14:30:00Z",
      status: "pending",
      event: "Green Tech Hackathon 2024",
      description: "A comprehensive app that helps users track their carbon footprint, suggests eco-friendly alternatives, and connects them with local sustainable businesses.",
      techStack: ["React Native", "Node.js", "MongoDB", "AI/ML"],
      repositoryUrl: "https://github.com/codecrusaders/ecotrack",
      liveDemo: "https://ecotrack-demo.netlify.app",
      attachments: ["presentation.pdf", "demo-video.mp4"],
      score: null,
      category: "Environmental",
      highlights: ["AI-powered recommendations", "Real-time carbon tracking", "Community features"],
      priority: "high"
    },
    {
      id: 2,
      teamName: "ByteBusters",
      projectTitle: "HealthConnect - Telemedicine Platform",
      members: ["Emma Wilson", "David Park"],
      submittedAt: "2024-08-19T12:15:00Z",
      status: "approved",
      event: "HealthTech Innovation 2024",
      description: "A secure telemedicine platform connecting patients with healthcare providers, featuring AI-powered symptom checking and appointment scheduling.",
      techStack: ["React", "Python", "PostgreSQL", "WebRTC"],
      repositoryUrl: "https://github.com/bytebusters/healthconnect",
      liveDemo: "https://healthconnect-demo.herokuapp.com",
      attachments: ["pitch-deck.pdf"],
      score: 87,
      category: "Healthcare",
      highlights: ["HIPAA compliant", "AI symptom checker", "Multi-language support"],
      priority: "medium"
    },
    {
      id: 3,
      teamName: "Neural Networks",
      projectTitle: "SmartLearn - Adaptive Learning System",
      members: ["Jordan Smith", "Priya Patel", "Lucas Brown", "Zoe Martinez"],
      submittedAt: "2024-08-19T10:45:00Z",
      status: "shortlisted",
      event: "EdTech Revolution 2024",
      description: "An AI-powered personalized learning platform that adapts to individual learning styles and provides real-time feedback to students and educators.",
      techStack: ["Vue.js", "Django", "TensorFlow", "Redis"],
      repositoryUrl: "https://github.com/neuralnetworks/smartlearn",
      liveDemo: "https://smartlearn-ai.vercel.app",
      attachments: ["research-paper.pdf", "user-testing-results.xlsx"],
      score: 92,
      category: "Education",
      highlights: ["Adaptive AI algorithms", "Real-time analytics", "Gamification features"],
      priority: "high"
    },
    {
      id: 4,
      teamName: "Quantum Coders",
      projectTitle: "CryptoWallet - Secure Digital Payments",
      members: ["Ryan Zhang", "Lisa Thompson"],
      submittedAt: "2024-08-19T09:20:00Z",
      status: "rejected",
      event: "FinTech Future 2024",
      description: "A next-generation cryptocurrency wallet with enhanced security features and seamless integration with traditional banking systems.",
      techStack: ["Flutter", "Blockchain", "Node.js", "MySQL"],
      repositoryUrl: "https://github.com/quantumcoders/cryptowallet",
      liveDemo: null,
      attachments: ["security-audit.pdf"],
      score: 65,
      category: "Finance",
      highlights: ["Multi-signature security", "Cross-platform", "Bank integration"],
      priority: "low"
    }
  ];

  const events = [
    "Green Tech Hackathon 2024",
    "HealthTech Innovation 2024", 
    "EdTech Revolution 2024",
    "FinTech Future 2024"
  ];

  const fetchSubmissions = () => {
  // For now, using mock data
  setSubmissions(mockSubmissions);
};

  const initializeAnimations = () => {
  setAnimateStats(true);
  };
  const handleStatusChange = (submissionId, newStatus) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? { ...sub, status: newStatus } : sub
    ));
    
    // Trigger celebration animation for approvals
    if (newStatus === 'approved' || newStatus === 'shortlisted') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || submission.status === selectedFilter;
    const matchesEvent = selectedEvent === 'all' || submission.event === selectedEvent;
    
    return matchesSearch && matchesFilter && matchesEvent;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Stats calculation
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    shortlisted: submissions.filter(s => s.status === 'shortlisted').length
  };

  useEffect(() => {
  fetchSubmissions();
  initializeAnimations();
  }, []);



  return (
    <div className="sub-container">
      {/* Animated Background Elements */}
      <div className="sub-background">
        <div className="sub-bg-element sub-bg-element-1"></div>
        <div className="sub-bg-element sub-bg-element-2"></div>
        <div className="sub-bg-element sub-bg-element-3"></div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="sub-confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="sub-confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="sub-header">
        <div className="sub-header-content">
          <div className="sub-header-left">
            <div className="sub-header-text">
              <h1 className="sub-title">Submissions Dashboard</h1>
              <p className="sub-subtitle">Review and manage project submissions with style</p>
            </div>
          </div>
          <div className="sub-header-right">
            <div className="sub-stats-inline">
              {/* Animated Stats */}
              <div className="sub-stats-row">
                <div className="sub-stat-inline">
                  <div className={`sub-stat-value sub-stat-value-blue ${animateStats ? 'sub-animate-in' : ''}`}>
                    {stats.total}
                  </div>
                  <div className="sub-stat-label-inline">Total</div>
                </div>
                <div className="sub-stats-divider"></div>
                <div className="sub-stat-inline">
                  <div className={`sub-stat-value sub-stat-value-yellow ${animateStats ? 'sub-animate-in sub-delay-100' : ''}`}>
                    {stats.pending}
                  </div>
                  <div className="sub-stat-label-inline">Pending</div>
                </div>
                <div className="sub-stat-inline">
                  <div className={`sub-stat-value sub-stat-value-green ${animateStats ? 'sub-animate-in sub-delay-200' : ''}`}>
                    {stats.approved}
                  </div>
                  <div className="sub-stat-label-inline">Approved</div>
                </div>
                <div className="sub-stat-inline">
                  <div className={`sub-stat-value sub-stat-value-purple ${animateStats ? 'sub-animate-in sub-delay-300' : ''}`}>
                    {stats.shortlisted}
                  </div>
                  <div className="sub-stat-label-inline">Shortlisted</div>
                </div>
              </div>
            </div>
            <div className="sub-stats-divider"></div>
            <button className="sub-export-btn">
              <Download className="sub-export-icon" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sub-main-content">
        <div className="sub-filters-section">
          <div className="sub-filters-content">
            {/* Search */}
            <div className="sub-search-wrapper">
              <Search className="sub-search-icon" />
              <input
                type="text"
                placeholder="Search by team or project name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sub-search-input"
              />
              <div className="sub-search-overlay"></div>
            </div>

            {/* Status Filter */}
            <div className="sub-filter-wrapper">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="sub-filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="sub-filter-icon" />
            </div>

            {/* Event Filter */}
            <div className="sub-filter-wrapper">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="sub-filter-select"
              >
                <option value="all">All Events</option>
                {events.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
              <Calendar className="sub-filter-icon" />
            </div>
          </div>
        </div>

        {/* Submissions Grid */}
        <div className="sub-submissions-list">
          {filteredSubmissions.map((submission, index) => (
            <div
              key={submission.id}
              className={`sub-submission-card ${
                expandedCard === submission.id ? 'sub-card-expanded' : ''
              } ${hoveredCard === submission.id ? 'sub-card-hovered' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(submission.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Priority Indicator */}
              <div className={`sub-priority-bar sub-priority-${submission.priority}`}>
                <div className="sub-priority-shine"></div>
              </div>

              {/* Main Card Content */}
              <div className="sub-card-content">
                <div className="sub-card-layout">
                  {/* Left Column - Main Info */}
                  <div className="sub-card-main">
                    <div className="sub-card-header">
                      <div className="sub-card-info">
                        <div className="sub-project-header">
                          <h3 className="sub-project-title">
                            {submission.projectTitle}
                          </h3>
                          {submission.priority === 'high' && (
                            <Zap className="sub-priority-icon" />
                          )}
                        </div>
                        <div className="sub-team-info">
                          <Users className="sub-team-icon" />
                          <span className="sub-team-name">{submission.teamName}</span>
                          <span className="sub-team-separator">•</span>
                          <span className="sub-member-count">{submission.members.length} members</span>
                          <TrendingUp className="sub-trending-icon" />
                        </div>
                        <div className="sub-submission-date">
                          <Calendar className="sub-date-icon" />
                          Submitted {formatDate(submission.submittedAt)}
                        </div>
                      </div>
                      <div className={`sub-status-badge sub-status-${submission.status}`}>
                        {submission.status === 'pending' && <Clock className="sub-status-icon sub-status-icon-pending" />}
                        {submission.status === 'approved' && <Check className="sub-status-icon sub-status-icon-approved" />}
                        {submission.status === 'shortlisted' && <Star className="sub-status-icon sub-status-icon-shortlisted" />}
                        {submission.status === 'rejected' && <X className="sub-status-icon" />}
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        {hoveredCard === submission.id && (
                          <div className="sub-status-pulse"></div>
                        )}
                      </div>
                    </div>

                    <p className="sub-project-description">{submission.description}</p>

                    {/* Tech Stack */}
                    <div className="sub-tech-stack">
                      {submission.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="sub-tech-tag"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="sub-quick-actions">
                      {submission.repositoryUrl && (
                        <a
                          href={submission.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sub-action-link sub-repo-link"
                        >
                          <GitBranch className="sub-action-icon" />
                          <span className="sub-action-text">Repository</span>
                        </a>
                      )}
                      {submission.liveDemo && (
                        <a
                          href={submission.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sub-action-link sub-demo-link"
                        >
                          <ExternalLink className="sub-action-icon" />
                          <span className="sub-action-text">Live Demo</span>
                        </a>
                      )}
                      <button
                        onClick={() => setExpandedCard(expandedCard === submission.id ? null : submission.id)}
                        className="sub-action-link sub-details-link"
                      >
                        <Eye className={`sub-action-icon ${expandedCard === submission.id ? 'sub-details-expanded' : ''}`} />
                        <span className="sub-action-text">
                          {expandedCard === submission.id ? 'Hide Details' : 'View Details'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Actions & Score */}
                  <div className="sub-card-sidebar">
                    <div className="sub-sidebar-content">
                      {/* Score */}
                      {submission.score && (
                        <div className="sub-score-card">
                          <div className="sub-score-value">
                            {submission.score}
                          </div>
                          <div className="sub-score-label">Score</div>
                          <Target className="sub-score-icon" />
                        </div>
                      )}

                      {/* Status Actions */}
                      <div className="sub-action-buttons">
                        <button
                          onClick={() => handleStatusChange(submission.id, 'approved')}
                          className={`sub-action-btn sub-approve-btn ${
                            submission.status === 'approved' ? 'sub-btn-active' : ''
                          }`}
                        >
                          <Check className="sub-btn-icon" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(submission.id, 'rejected')}
                          className={`sub-action-btn sub-reject-btn ${
                            submission.status === 'rejected' ? 'sub-btn-active' : ''
                          }`}
                        >
                          <X className="sub-btn-icon" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleStatusChange(submission.id, 'shortlisted')}
                          className={`sub-action-btn sub-shortlist-btn ${
                            submission.status === 'shortlisted' ? 'sub-btn-active' : ''
                          }`}
                        >
                          <Star className={`sub-btn-icon ${submission.status === 'shortlisted' ? 'sub-star-pulse' : ''}`} />
                          Shortlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedCard === submission.id && (
                <div className="sub-expanded-section">
                  <div className="sub-expanded-content">
                    <div className="sub-expanded-grid">
                      {/* Team Members */}
                      <div className="sub-team-section">
                        <h4 className="sub-section-title">
                          <Users className="sub-section-icon" />
                          Team Members
                        </h4>
                        <div className="sub-members-list">
                          {submission.members.map((member, index) => (
                            <div 
                              key={index} 
                              className="sub-member-card"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <div className="sub-member-avatar-wrapper">
                                <div className="sub-member-avatar">
                                  {member.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="sub-member-avatar-ring"></div>
                              </div>
                              <span className="sub-member-name">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Project Highlights */}
                      <div className="sub-highlights-section">
                        <h4 className="sub-section-title">
                          <Award className="sub-section-icon sub-award-pulse" />
                          Key Highlights
                        </h4>
                        <ul className="sub-highlights-list">
                          {submission.highlights.map((highlight, index) => (
                            <li 
                              key={index} 
                              className="sub-highlight-item"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <div className="sub-highlight-icon-wrapper">
                                <Award className="sub-highlight-icon" />
                                <div className="sub-highlight-icon-ring"></div>
                              </div>
                              <span className="sub-highlight-text">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Attachments */}
                      {submission.attachments && submission.attachments.length > 0 && (
                        <div className="sub-attachments-section">
                          <h4 className="sub-section-title">
                            <FileText className="sub-section-icon" />
                            Attachments
                          </h4>
                          <div className="sub-attachments-grid">
                            {submission.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="sub-attachment-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                              >
                                <div className="sub-attachment-content">
                                  <div className="sub-attachment-icon-wrapper">
                                    <FileText className="sub-attachment-icon" />
                                  </div>
                                  <span className="sub-attachment-name">{attachment}</span>
                                </div>
                                <Download className="sub-attachment-download" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSubmissions.length === 0 && (
          <div className="sub-empty-state">
            <div className="sub-empty-icon-wrapper">
              <div className="sub-empty-icon-container">
                <Search className="sub-empty-icon" />
              </div>
              <div className="sub-empty-icon-ring"></div>
            </div>
            <h3 className="sub-empty-title">No submissions found</h3>
            <p className="sub-empty-message">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setSelectedEvent('all');
              }}
              className="sub-clear-filters-btn"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="sub-floating-actions">
          <button className="sub-float-btn sub-float-btn-primary">
            <TrendingUp className="sub-float-icon" />
          </button>
          <button className="sub-float-btn sub-float-btn-secondary">
            <Star className="sub-float-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsPage;