import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Filter, Download, Eye, Users, Calendar, Award, Sparkles, Zap, TrendingUp } from 'lucide-react';
import './leaderboardorg.css';

const OrganizerLeaderboard = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [animateRows, setAnimateRows] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const [tableInView, setTableInView] = useState(false);

  // Mock data for teams
  const teams = [
    {
      id: 1,
      name: "Code Crusaders",
      members: ["Alex Chen", "Sarah Kim", "Mike Rodriguez", "Emma Thompson"],
      score: 485,
      project: "AI-Powered Healthcare Assistant",
      status: "Submitted",
      round: "Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T14:30:00Z",
      technologies: ["React", "Python", "TensorFlow", "Firebase"],
      category: "Healthcare"
    },
    {
      id: 2,
      name: "Quantum Builders",
      members: ["David Park", "Lisa Wang", "James Miller"],
      score: 472,
      project: "Blockchain Supply Chain Tracker",
      status: "Submitted",
      round: "Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T15:45:00Z",
      technologies: ["Vue.js", "Node.js", "Solidity", "MongoDB"],
      category: "Blockchain"
    },
    {
      id: 3,
      name: "Neural Networks",
      members: ["Anna Garcia", "Tom Wilson", "Kate Brown", "Chris Lee"],
      score: 459,
      project: "Smart City Traffic Optimization",
      status: "Submitted",
      round: "Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T16:20:00Z",
      technologies: ["Angular", "Django", "PostgreSQL", "Docker"],
      category: "Smart Cities"
    },
    {
      id: 4,
      name: "Data Dynamos",
      members: ["Ryan Taylor", "Sophie Anderson"],
      score: 445,
      project: "Green Energy Analytics Platform",
      status: "Submitted",
      round: "Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T13:10:00Z",
      technologies: ["React", "Express", "MySQL", "Chart.js"],
      category: "Environment"
    },
    {
      id: 5,
      name: "Binary Blazers",
      members: ["Jake Martinez", "Olivia Davis", "Noah Johnson"],
      score: 432,
      project: "EdTech Learning Companion",
      status: "Submitted",
      round: "Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T17:00:00Z",
      technologies: ["Next.js", "FastAPI", "Redis", "Stripe"],
      category: "Education"
    },
    {
      id: 6,
      name: "Pixel Pioneers",
      members: ["Mia Thompson", "Lucas White"],
      score: 418,
      project: "AR Shopping Experience",
      status: "In Progress",
      round: "Semi-Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T12:30:00Z",
      technologies: ["Unity", "C#", "ARCore", "Firebase"],
      category: "AR/VR"
    },
    {
      id: 7,
      name: "Cyber Spartans",
      members: ["Ethan Clark", "Zoe Adams", "Liam Brown", "Ava Wilson"],
      score: 405,
      project: "Cybersecurity Training Simulator",
      status: "In Progress",
      round: "Semi-Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T18:15:00Z",
      technologies: ["React", "Python", "Docker", "AWS"],
      category: "Security"
    },
    {
      id: 8,
      name: "Algorithm Architects",
      members: ["Mason Garcia", "Aria Martinez"],
      score: 392,
      project: "Personal Finance AI Advisor",
      status: "In Progress",
      round: "Semi-Final",
      event: "HealthTech Hack 2024",
      submissionTime: "2024-08-19T11:45:00Z",
      technologies: ["Svelte", "Go", "PostgreSQL", "Plaid"],
      category: "FinTech"
    }
  ];

  const events = ["All Events", "HealthTech Hack 2024", "AI Innovation Summit", "Green Tech Challenge"];
  const rounds = ["All Rounds", "Final", "Semi-Final", "Quarter-Final"];
  const categories = ["All Categories", "Healthcare", "Blockchain", "Smart Cities", "Environment", "Education", "AR/VR", "Security", "FinTech"];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      });
    }, observerOptions);

    const tableObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTableInView(true);
          setAnimateRows(true);
        }
      });
    }, observerOptions);

    window.addEventListener('scroll', handleScroll);

    const statsSection = document.getElementById('stats');
    const tableSection = document.getElementById('leaderboard-table');

    if (statsSection) statsObserver.observe(statsSection);
    if (tableSection) tableObserver.observe(tableSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      statsObserver.disconnect();
      tableObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setAnimateRows(true);
    const timer = setTimeout(() => setAnimateRows(false), 2000);
    return () => clearTimeout(timer);
  }, [filter, sortBy]);

  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">{position}</div>;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300";
    if (status === "Submitted") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-yellow-100 text-yellow-800`;
  };

  const getRankGradient = (position) => {
    switch (position) {
      case 1:
        return "linear-gradient(135deg, #fbbf24, #f59e0b)";
      case 2:
        return "linear-gradient(135deg, #9ca3af, #6b7280)";
      case 3:
        return "linear-gradient(135deg, #d97706, #92400e)";
      default:
        return "linear-gradient(135deg, #3b82f6, #9333ea)";
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredTeams = teams.filter(team => {
    if (filter === 'all') return true;
    if (filter === 'submitted') return team.status === 'Submitted';
    if (filter === 'in-progress') return team.status === 'In Progress';
    return true;
  });

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'submission') return new Date(b.submissionTime) - new Date(a.submissionTime);
    return 0;
  });

  const getStatTransform = (index, isVisible) => {
    if (!isVisible) {
      return {
        transform: 'translateY(60px) scale(0.95)',
        opacity: 0,
        transition: `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`
      };
    }
    
    return {
      transform: 'translateY(0px) scale(1)',
      opacity: 1,
      transition: `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`
    };
  };

  const getRowTransform = (index, isVisible) => {
    if (!isVisible) {
      return {
        transform: 'translateX(50px) rotateY(20deg)',
        opacity: 0,
        transition: `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`
      };
    }
    
    return {
      transform: 'translateX(0px) rotateY(0deg)',
      opacity: 1,
      transition: `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`
    };
  };

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div 
        className="leaderboard-header"
        style={{
          background: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          borderBottom: scrollY > 50 ? '1px solid #e5e7eb' : 'none'
        }}
      >
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="header-text">
              <h1 className="header-title">
                Leaderboard
              </h1>
              <p className="header-subtitle">Real-time rankings and performance</p>
            </div>
          </div>
          
          <div className="header-actions">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="filter-btn"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <button className="export-btn">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <div 
        className="filters-panel"
        style={{
          maxHeight: showFilters ? '120px' : '0px',
          opacity: showFilters ? 1 : 0,
          overflow: 'hidden'
        }}
      >
        <div className="filters-content">
          <select className="filter-select">
            {events.map(event => (
              <option key={event} value={event}>{event}</option>
            ))}
          </select>
          
          <select className="filter-select">
            {rounds.map(round => (
              <option key={round} value={round}>{round}</option>
            ))}
          </select>
          
          <select className="filter-select">
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select 
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
            <option value="submission">Sort by Submission Time</option>
          </select>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="live-indicator">
              <span className="pulse-dot"></span>
              Live Competition Results
            </div>
            
            <h2 className="hero-title">
              <span className="gradient-text">Competition</span>
              <br />
              Leaderboard
            </h2>
            
            <p className="hero-description">
              Track real-time standings, celebrate achievements, and witness innovation unfold
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section id="stats" className="stats-section">
        <div className="stats-content">
          {[
            { label: "Total Teams", value: "24", icon: Users, color: "from-blue-500 to-blue-600" },
            { label: "Submitted Projects", value: "18", icon: Award, color: "from-green-500 to-green-600" },
            { label: "In Progress", value: "6", icon: Calendar, color: "from-yellow-500 to-yellow-600" },
            { label: "Average Score", value: "428", icon: TrendingUp, color: "from-purple-500 to-purple-600" }
          ].map((stat, index) => {
            const style = getStatTransform(index, statsInView);
            
            return (
              <div 
                key={stat.label} 
                className="stat-card group"
                style={style}
              >
                <div className="stat-content">
                  <div className="stat-text">
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                  <div className={`stat-icon bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="stat-progress">
                  <div 
                    className={`stat-progress-bar bg-gradient-to-r ${stat.color}`}
                    style={{ 
                      width: `${Math.min((parseInt(stat.value) / 30) * 100, 100)}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Filters */}
      <section className="quick-filters">
        <div className="quick-filters-content">
          {[
            { key: 'all', label: 'All Teams', icon: Users },
            { key: 'submitted', label: 'Submitted', icon: Award },
            { key: 'in-progress', label: 'In Progress', icon: Zap }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`quick-filter-btn ${filter === filterOption.key ? 'active' : ''}`}
            >
              <filterOption.icon className="w-4 h-4" />
              {filterOption.label}
            </button>
          ))}
        </div>
      </section>

      {/* Leaderboard Table */}
      <section id="leaderboard-table" className="table-section">
        <div className="table-container">
          <div className="table-wrapper">
            <table className="leaderboard-table">
              <thead className="table-header">
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Project</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {sortedTeams.map((team, index) => {
                  const position = index + 1;
                  const style = getRowTransform(index, tableInView);
                  
                  return (
                    <tr 
                      key={team.id}
                      className="team-row"
                      style={style}
                    >
                      <td className="rank-cell">
                        <div 
                          className="rank-badge"
                          style={{
                            background: getRankGradient(position),
                            boxShadow: position <= 3 ? '0 4px 15px rgba(0,0,0,0.1)' : 'none'
                          }}
                        >
                          {position <= 3 ? getRankIcon(position) : position}
                        </div>
                      </td>
                      
                      <td className="team-cell">
                        <div className="team-info">
                          <h3 className="team-name">
                            {team.name}
                          </h3>
                          <div className="member-count">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span>{team.members.length} members</span>
                          </div>
                          <div className="member-list">
                            {team.members.slice(0, 2).map((member, i) => (
                              <span key={i} className="member-tag">
                                {member.split(' ')[0]}
                              </span>
                            ))}
                            {team.members.length > 2 && (
                              <span className="member-more">
                                +{team.members.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="project-cell">
                        <div className="project-info">
                          <h4 className="project-name">{team.project}</h4>
                          <div className="project-tags">
                            <span className="category-tag">
                              {team.category}
                            </span>
                            <span className="round-tag">
                              {team.round}
                            </span>
                          </div>
                          <div className="tech-tags">
                            {team.technologies.slice(0, 2).map((tech, i) => (
                              <span key={i} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                            {team.technologies.length > 2 && (
                              <span className="tech-more">
                                +{team.technologies.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="score-cell">
                        <div className="score-info">
                          <div className="score-value">
                            {team.score}
                          </div>
                          <div className="star-rating">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`star ${i < Math.floor(team.score / 100) ? 'filled' : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="submission-time">
                          {formatTime(team.submissionTime)}
                        </div>
                      </td>
                      
                      <td className="status-cell">
                        <span className={getStatusBadge(team.status)}>
                          {team.status}
                        </span>
                      </td>
                      
                      <td className="actions-cell">
                        <button 
                          onClick={() => setSelectedTeam(team)}
                          className="view-btn"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-logo">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="modal-header-text">
                  <h2 className="modal-title">{selectedTeam.name}</h2>
                  <p className="modal-subtitle">Team Performance Details</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeam(null)}
                className="modal-close"
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              {/* Project Info */}
              <div className="modal-section">
                <h3 className="section-title">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  Project Details
                </h3>
                <div className="project-details">
                  <h4 className="project-title">{selectedTeam.project}</h4>
                  <div className="project-meta">
                    <span className="project-category">
                      {selectedTeam.category}
                    </span>
                    <span className="project-round">{selectedTeam.round}</span>
                    <span className={getStatusBadge(selectedTeam.status)}>
                      {selectedTeam.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="modal-section">
                <h3 className="section-title">
                  <Users className="w-5 h-5 text-green-500" />
                  Team Members
                </h3>
                <div className="members-grid">
                  {selectedTeam.members.map((member, index) => (
                    <div key={index} className="member-card">
                      <div className="member-avatar">
                        {member.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="member-name">{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="modal-section">
                <h3 className="section-title">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Technologies Used
                </h3>
                <div className="tech-list">
                  {selectedTeam.technologies.map((tech, index) => (
                    <span key={index} className="tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="modal-section">
                <h3 className="section-title">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Score Breakdown
                </h3>
                <div className="score-breakdown">
                  {[
                    { category: 'Innovation', score: 92, max: 100 },
                    { category: 'Technical Implementation', score: 88, max: 100 },
                    { category: 'Design & UX', score: 85, max: 100 },
                    { category: 'Presentation', score: 90, max: 100 },
                    { category: 'Market Potential', score: 87, max: 100 }
                  ].map((item, index) => (
                    <div key={index} className="score-item">
                      <div className="score-header">
                        <span className="score-category">{item.category}</span>
                        <span className="score-fraction">{item.score}/{item.max}</span>
                      </div>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${(item.score / item.max) * 100}%`,
                            animationDelay: `${index * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="total-score">
                    <div className="total-score-content">
                      <span>Total Score</span>
                      <span className="total-score-value">
                        {selectedTeam.score}/500
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <div className="info-card submission">
                  <div className="info-header">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Submission</span>
                  </div>
                  <p>{formatTime(selectedTeam.submissionTime)}</p>
                </div>
                
                <div className="info-card event">
                  <div className="info-header">
                    <Award className="w-4 h-4 text-green-500" />
                    <span>Event</span>
                  </div>
                  <p>{selectedTeam.event}</p>
                </div>
                
                <div className="info-card performance">
                  <div className="info-header">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span>Performance</span>
                  </div>
                  <p>
                    {selectedTeam.score >= 450 ? 'Excellent' : selectedTeam.score >= 400 ? 'Great' : 'Good'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerLeaderboard;