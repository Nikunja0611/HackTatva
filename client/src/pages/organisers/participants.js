import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Users, Trophy, Calendar, Github, ExternalLink, Mail, MapPin, Star, Sparkles, Zap, Award, TrendingUp, ChevronDown, ChevronRight, Globe, Target, Clock, BarChart3 } from 'lucide-react';
import './participants.css';

const ParticipantsTeamsPage = () => {
  const [activeTab, setActiveTab] = useState('teams');
  const [viewMode, setViewMode] = useState('all'); // 'all', 'hackathon'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedHackathon, setSelectedHackathon] = useState('all');
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [expandedHackathon, setExpandedHackathon] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({});
  const [floatingParticles, setFloatingParticles] = useState([]);

  // Enhanced mock data with hackathon information
  const [hackathons] = useState([
    {
      id: 'green-tech-2024',
      name: 'Green Tech Hackathon 2024',
      theme: 'Sustainability & Environment',
      startDate: '2024-08-10',
      endDate: '2024-08-12',
      status: 'completed',
      participants: 16,
      teams: 4,
      prizes: '$50,000',
      location: 'San Francisco, CA',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'ai-innovation-2024',
      name: 'AI Innovation Challenge',
      theme: 'Artificial Intelligence',
      startDate: '2024-08-15',
      endDate: '2024-08-17',
      status: 'ongoing',
      participants: 12,
      teams: 4,
      prizes: '$75,000',
      location: 'Boston, MA',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'healthtech-2024',
      name: 'HealthTech Summit Hack',
      theme: 'Healthcare Innovation',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      status: 'upcoming',
      participants: 8,
      teams: 2,
      prizes: '$60,000',
      location: 'Austin, TX',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'web3-2024',
      name: 'Web3 Revolution Hackathon',
      theme: 'Blockchain & Crypto',
      startDate: '2024-08-25',
      endDate: '2024-08-27',
      status: 'upcoming',
      participants: 6,
      teams: 2,
      prizes: '$80,000',
      location: 'Miami, FL',
      color: 'from-orange-500 to-yellow-600'
    },
    {
      id: 'edtech-2024',
      name: 'EdTech Innovation Hack',
      theme: 'Education Technology',
      startDate: '2024-09-01',
      endDate: '2024-09-03',
      status: 'upcoming',
      participants: 12,
      teams: 3,
      prizes: '$45,000',
      location: 'Seattle, WA',
      color: 'from-indigo-500 to-blue-600'
    }
  ]);

  const [teams] = useState([
    {
      id: 1,
      name: "Code Wizards",
      hackathonId: 'green-tech-2024',
      members: [
        { name: "Alex Chen", role: "Frontend Dev", email: "alex@email.com", location: "San Francisco", avatar: "AC", skills: ["React", "TypeScript"], experience: "5+ years" },
        { name: "Sarah Kim", role: "Backend Dev", email: "sarah@email.com", location: "New York", avatar: "SK", skills: ["Node.js", "PostgreSQL"], experience: "4+ years" },
        { name: "Mike Johnson", role: "UI/UX Designer", email: "mike@email.com", location: "Austin", avatar: "MJ", skills: ["Figma", "Design Systems"], experience: "3+ years" },
        { name: "Emma Davis", role: "Product Manager", email: "emma@email.com", location: "Seattle", avatar: "ED", skills: ["Strategy", "Analytics"], experience: "6+ years" }
      ],
      project: {
        name: "EcoTracker",
        description: "A sustainability tracking app that helps users monitor their carbon footprint and suggests eco-friendly alternatives.",
        repo: "https://github.com/codewizards/ecotracker",
        demo: "https://ecotracker-demo.vercel.app",
        status: "submitted",
        submittedAt: "2024-08-15T10:30:00Z",
        techStack: ["React", "Node.js", "MongoDB", "AWS"]
      },
      status: "active",
      score: 85,
      trending: true,
      achievements: ["Best UI/UX", "Most Innovative"]
    },
    {
      id: 2,
      name: "Pixel Perfect",
      hackathonId: 'ai-innovation-2024',
      members: [
        { name: "Ryan Park", role: "Full Stack Dev", email: "ryan@email.com", location: "Los Angeles", avatar: "RP", skills: ["Vue.js", "Python"], experience: "4+ years" },
        { name: "Jessica Wong", role: "Data Scientist", email: "jessica@email.com", location: "Boston", avatar: "JW", skills: ["ML", "TensorFlow"], experience: "5+ years" },
        { name: "David Lee", role: "DevOps", email: "david@email.com", location: "Chicago", avatar: "DL", skills: ["Docker", "Kubernetes"], experience: "3+ years" }
      ],
      project: {
        name: "AI Recipe Generator",
        description: "Smart recipe recommendations based on available ingredients using computer vision and machine learning.",
        repo: "https://github.com/pixelperfect/ai-recipes",
        demo: "https://ai-recipes.netlify.app",
        status: "in-progress",
        submittedAt: null,
        techStack: ["Python", "TensorFlow", "React", "FastAPI"]
      },
      status: "active",
      score: 78,
      trending: false,
      achievements: ["Best AI Implementation"]
    },
    {
      id: 3,
      name: "Data Dynamos",
      hackathonId: 'healthtech-2024',
      members: [
        { name: "Lisa Rodriguez", role: "ML Engineer", email: "lisa@email.com", location: "Miami", avatar: "LR", skills: ["PyTorch", "Scikit-learn"], experience: "6+ years" },
        { name: "Tom Wilson", role: "Backend Dev", email: "tom@email.com", location: "Denver", avatar: "TW", skills: ["Django", "PostgreSQL"], experience: "4+ years" },
        { name: "Amy Zhang", role: "Frontend Dev", email: "amy@email.com", location: "Portland", avatar: "AZ", skills: ["Angular", "D3.js"], experience: "3+ years" },
        { name: "Chris Brown", role: "Data Analyst", email: "chris@email.com", location: "Phoenix", avatar: "CB", skills: ["R", "Tableau"], experience: "5+ years" }
      ],
      project: {
        name: "HealthPredict",
        description: "Predictive healthcare analytics platform for early disease detection using wearable device data.",
        repo: "https://github.com/datadynamos/healthpredict",
        demo: "https://healthpredict.io",
        status: "submitted",
        submittedAt: "2024-08-14T16:45:00Z",
        techStack: ["Python", "React", "PostgreSQL", "Docker"]
      },
      status: "active",
      score: 92,
      trending: true,
      achievements: ["Best Healthcare Solution", "People's Choice"]
    },
    {
      id: 4,
      name: "Blockchain Builders",
      hackathonId: 'web3-2024',
      members: [
        { name: "Mark Thompson", role: "Blockchain Dev", email: "mark@email.com", location: "San Diego", avatar: "MT", skills: ["Solidity", "Web3.js"], experience: "4+ years" },
        { name: "Sofia Martinez", role: "Smart Contract Dev", email: "sofia@email.com", location: "Nashville", avatar: "SM", skills: ["Ethereum", "IPFS"], experience: "3+ years" }
      ],
      project: {
        name: "DeCert",
        description: "Decentralized certificate verification system using blockchain technology for educational credentials.",
        repo: "https://github.com/blockchainbuilders/decert",
        demo: null,
        status: "not-submitted",
        submittedAt: null,
        techStack: ["Solidity", "React", "IPFS", "MetaMask"]
      },
      status: "inactive",
      score: 0,
      trending: false,
      achievements: []
    },
    {
      id: 5,
      name: "Mobile Masters",
      hackathonId: 'edtech-2024',
      members: [
        { name: "Kevin Chang", role: "iOS Dev", email: "kevin@email.com", location: "Dallas", avatar: "KC", skills: ["Swift", "SwiftUI"], experience: "5+ years" },
        { name: "Rachel Green", role: "Android Dev", email: "rachel@email.com", location: "Atlanta", avatar: "RG", skills: ["Kotlin", "Jetpack"], experience: "4+ years" },
        { name: "Jason Kim", role: "UI/UX Designer", email: "jason@email.com", location: "Orlando", avatar: "JK", skills: ["Sketch", "Prototyping"], experience: "3+ years" }
      ],
      project: {
        name: "StudyBuddy",
        description: "Cross-platform mobile app for collaborative studying with real-time video chat and shared whiteboards.",
        repo: "https://github.com/mobilemasters/studybuddy",
        demo: "https://studybuddy-app.com",
        status: "submitted",
        submittedAt: "2024-08-16T09:15:00Z",
        techStack: ["React Native", "Socket.io", "Firebase", "WebRTC"]
      },
      status: "active",
      score: 88,
      trending: true,
      achievements: ["Best Mobile App"]
    }
  ]);

// 2. In useEffect, remove setIsLoading and timer:
useEffect(() => {
  // Simulate loading with staggered animation
  // const timer = setTimeout(() => {
  //   setIsLoading(false);
  //   animateStats();
  //   generateFloatingParticles();
  // }, 1200);
  // return () => clearTimeout(timer);
  animateStats();
  generateFloatingParticles();
}, []);


  const generateFloatingParticles = () => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2
    }));
    setFloatingParticles(particles);
  };

  const animateStats = () => {
    const stats = {
      totalTeams: teams.length,
      activeTeams: teams.filter(t => t.status === 'active').length,
      submissions: teams.filter(t => t.project.status === 'submitted').length,
      totalParticipants: teams.reduce((acc, team) => acc + team.members.length, 0),
      totalHackathons: hackathons.length,
      ongoingHackathons: hackathons.filter(h => h.status === 'ongoing').length
    };

    Object.entries(stats).forEach(([key, value]) => {
      let current = 0;
      const increment = value / 25;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 40);
    });
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || team.status === filterStatus;
    const matchesHackathon = selectedHackathon === 'all' || team.hackathonId === selectedHackathon;
    return matchesSearch && matchesFilter && matchesHackathon;
  });

  const getTeamsByHackathon = () => {
    const grouped = {};
    hackathons.forEach(hackathon => {
      grouped[hackathon.id] = {
        hackathon,
        teams: teams.filter(team => team.hackathonId === hackathon.id && 
          (filterStatus === 'all' || team.status === filterStatus) &&
          (team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()))))
      };
    });
    return grouped;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'pt-status-submitted';
      case 'in-progress': return 'pt-status-progress';
      case 'not-submitted': return 'pt-status-not-submitted';
      default: return 'pt-status-default';
    }
  };

  const getHackathonStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'pt-hackathon-completed';
      case 'ongoing': return 'pt-hackathon-ongoing';
      case 'upcoming': return 'pt-hackathon-upcoming';
      default: return 'pt-hackathon-default';
    }
  };

  const getTeamStatusColor = (status) => {
    return status === 'active' 
      ? 'pt-team-active' 
      : 'pt-team-inactive';
  };

  const handleTeamClick = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const handleHackathonClick = (hackathonId) => {
    setExpandedHackathon(expandedHackathon === hackathonId ? null : hackathonId);
  };

  const exportData = () => {
    const button = document.querySelector('.pt-export-btn');
    button.classList.add('animate-bounce');
    setTimeout(() => {
      button.classList.remove('animate-bounce');
      alert('CSV export would start here');
    }, 500);
  };

  return (
    <div className="pt-main-container">
      {/* Enhanced Floating Background Particles */}
      <div className="pt-floating-particles">
        {floatingParticles.map(particle => (
          <div
            key={particle.id}
            className="pt-floating-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Header */}
      <div className="pt-header">
        <div className="pt-header-gradient"></div>
        <div className="pt-header-content">
          <div className="pt-header-inner">
            <div className="pt-header-top">
              <div className="pt-header-left">
                <div className="pt-header-title-section">
                  <div className="pt-header-icon">
                    <Users className="pt-header-icon-users" size={28} />
                  </div>
                  <h1 className="pt-title">
                    Participants <span className="pt-title-gradient">Dashboard</span>
                  </h1>
                </div>
                <p className="pt-subtitle">Manage hackathons, participants, teams, and their amazing project submissions ✨</p>
              </div>
              <button
                onClick={exportData}
                className="pt-export-btn"
              >
                <div className="pt-export-btn-overlay"></div>
                <div className="pt-export-btn-content">
                  <Download className="pt-export-btn-icon" size={20} />
                  Export Data
                </div>
                <div className="pt-export-btn-glow"></div>
              </button>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="pt-stats-grid">
              {[
                { 
                  key: 'totalHackathons', 
                  label: 'Hackathons', 
                  value: hackathons.length, 
                  icon: Trophy, 
                  gradient: 'pt-stat-purple',
                  delay: '0s'
                },
                { 
                  key: 'ongoingHackathons', 
                  label: 'Ongoing', 
                  value: hackathons.filter(h => h.status === 'ongoing').length, 
                  icon: Zap, 
                  gradient: 'pt-stat-green',
                  delay: '0.1s'
                },
                { 
                  key: 'totalTeams', 
                  label: 'Teams', 
                  value: teams.length, 
                  icon: Users, 
                  gradient: 'pt-stat-blue',
                  delay: '0.2s'
                },
                { 
                  key: 'activeTeams', 
                  label: 'Active', 
                  value: teams.filter(t => t.status === 'active').length, 
                  icon: TrendingUp, 
                  gradient: 'pt-stat-orange',
                  delay: '0.3s'
                },
                { 
                  key: 'submissions', 
                  label: 'Submissions', 
                  value: teams.filter(t => t.project.status === 'submitted').length, 
                  icon: Calendar, 
                  gradient: 'pt-stat-cyan',
                  delay: '0.4s'
                },
                { 
                  key: 'totalParticipants', 
                  label: 'Participants', 
                  value: teams.reduce((acc, team) => acc + team.members.length, 0), 
                  icon: Award, 
                  gradient: 'pt-stat-pink',
                  delay: '0.5s'
                }
              ].map(({ key, label, value, icon: Icon, gradient, delay }) => (
                <div
                  key={key}
                  className={`pt-stat-card ${gradient}`}
                  style={{ animationDelay: delay }}
                >
                  <div className="pt-stat-card-glow"></div>
                  <div className="pt-stat-card-content">
                    <div className="pt-stat-card-header">
                      <div className="pt-stat-card-icon">
                        <Icon size={20} />
                      </div>
                      <div className="pt-stat-card-value">
                        <p className="pt-stat-number">
                          {animatedStats[key] || 0}
                        </p>
                      </div>
                    </div>
                    <p className="pt-stat-label">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-content-wrapper">
        {/* Enhanced Search and Filters */}
        <div className="pt-search-filters">
          <div className="pt-search-row">
            <div className="pt-search-input-wrapper">
              <Search className="pt-search-icon" size={20} />
              <input
                type="text"
                placeholder="Search teams, participants, or projects... ✨"
                className="pt-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="pt-filters-wrapper">
              <div className="pt-filter-select-wrapper">
                <Filter className="pt-filter-icon" size={20} />
                <select
                  className="pt-filter-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Teams ⚡</option>
                  <option value="active">Active 🚀</option>
                  <option value="inactive">Inactive 😴</option>
                </select>
              </div>

              <div className="pt-hackathon-select-wrapper">
                <Trophy className="pt-hackathon-select-icon" size={20} />
                <select
                  className="pt-hackathon-select"
                  value={selectedHackathon}
                  onChange={(e) => setSelectedHackathon(e.target.value)}
                >
                  <option value="all">All Hackathons 🏆</option>
                  {hackathons.map(hackathon => (
                    <option key={hackathon.id} value={hackathon.id}>
                      {hackathon.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="pt-view-toggle">
            <button
              onClick={() => setViewMode('all')}
              className={`pt-view-toggle-btn ${viewMode === 'all' ? 'pt-view-toggle-active' : 'pt-view-toggle-inactive'}`}
            >
              <Users size={18} />
              All Teams
            </button>
            <button
              onClick={() => setViewMode('hackathon')}
              className={`pt-view-toggle-btn ${viewMode === 'hackathon' ? 'pt-view-toggle-active-alt' : 'pt-view-toggle-inactive'}`}
            >
              <Trophy size={18} />
              By Hackathon
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'all' ? (
          // All Teams View
          <div className="pt-teams-list">
            {filteredTeams.map((team, index) => (
              <div
                key={team.id}
                className={`pt-team-card ${hoveredCard === team.id ? 'pt-team-card-hovered' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredCard(team.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated gradient border */}
                <div className="pt-team-card-border"></div>
                

                {/* Team Header */}
                <div
                  className="pt-team-header"
                  onClick={() => handleTeamClick(team.id)}
                >
                  <div className="pt-team-header-content">
                    <div className="pt-team-header-left">
                      <div className="pt-team-avatar-wrapper">
                        <div className="pt-team-avatar">
                          {team.name.split(' ').map(word => word[0]).join('')}
                        </div>
                        <div className="pt-team-avatar-glow"></div>
                      </div>
                      <div>
                        <h3 className="pt-team-name">
                          {team.name}
                          {team.score > 85 && (
                            <div className="pt-star-icon">
                              <Star className="text-yellow-500" size={20} />
                            </div>
                          )}
                        </h3>
                        <p className="pt-team-info">
                          <Users size={16} />
                          {team.members.length} members • {hackathons.find(h => h.id === team.hackathonId)?.name || 'Unknown Event'}
                        </p>
                        <div className="pt-tech-stack">
                          {team.project.techStack.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="pt-tech-tag">
                              {tech}
                            </span>
                          ))}
                          {team.project.techStack.length > 3 && (
                            <span className="pt-tech-tag-more">
                              +{team.project.techStack.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-team-header-right">
                      <span className={`pt-status-badge ${getStatusColor(team.project.status)}`}>
                        {team.project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className={`pt-team-status-badge ${getTeamStatusColor(team.status)}`}>
                        {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                      </span>
                      {team.score > 0 && (
                        <div className="pt-score-card">
                          <div className="pt-score-value">
                            {team.score}
                          </div>
                          <div className="pt-score-label">Score ⭐</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Enhanced Expanded Team Details */}
                {expandedTeam === team.id && (
                  <div className="pt-expanded-content">
                    <div className="pt-expanded-inner">
                      <div className="pt-expanded-grid">
                        {/* Enhanced Team Members */}
                        <div>
                          <h4 className="pt-section-title">
                            <div className="pt-section-icon">
                              <Users size={20} />
                            </div>
                            Team Members
                            <div className="pt-section-sparkle">✨</div>
                          </h4>
                          <div className="pt-members-list">
                            {team.members.map((member, idx) => (
                              <div 
                                key={idx} 
                                className="pt-member-card"
                                style={{
                                  animationDelay: `${idx * 0.1}s`
                                }}
                              >
                                <div className="pt-member-avatar-wrapper">
                                  <div className="pt-member-avatar">
                                    {member.avatar}
                                  </div>
                                  <div className="pt-member-avatar-glow"></div>
                                </div>
                                <div className="pt-member-info">
                                  <div className="pt-member-name">{member.name}</div>
                                  <div className="pt-member-role">
                                    {member.role} • {member.experience}
                                    <span className="pt-member-separator">•</span>
                                    <MapPin size={12} />
                                    {member.location}
                                  </div>
                                  <div className="pt-member-skills">
                                    {member.skills.map((skill, skillIdx) => (
                                      <span key={skillIdx} className="pt-skill-tag">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <a
                                  href={`mailto:${member.email}`}
                                  className="pt-member-email"
                                >
                                  <Mail size={16} />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Project Details */}
                        <div>
                          <h4 className="pt-section-title">
                            <div className="pt-section-icon-alt">
                              <Trophy size={20} />
                            </div>
                            Project Details
                            <div className="pt-section-rocket">🚀</div>
                          </h4>
                          <div className="pt-project-details">
                            <div className="pt-project-header">
                              <h5 className="pt-project-name">
                                {team.project.name}
                              </h5>
                              {team.project.status === 'submitted' && (
                                <div className="pt-project-award">
                                  <Award className="text-green-500" size={20} />
                                </div>
                              )}
                            </div>
                            <p className="pt-project-description">{team.project.description}</p>
                            
                            {/* Achievements */}
                            {team.achievements && team.achievements.length > 0 && (
                              <div className="pt-achievements-section">
                                <h6 className="pt-achievements-title">
                                  <Award size={16} />
                                  Achievements
                                </h6>
                                <div className="pt-achievements-list">
                                  {team.achievements.map((achievement, achIdx) => (
                                    <span 
                                      key={achIdx} 
                                      className="pt-achievement-badge"
                                    >
                                      🏆 {achievement}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="pt-project-links">
                              {team.project.repo && (
                                <a
                                  href={team.project.repo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="pt-repo-link"
                                >
                                  <Github className="pt-repo-icon" size={18} />
                                  View Repository
                                  <ExternalLink size={14} className="pt-external-icon" />
                                </a>
                              )}
                              {team.project.demo && (
                                <a
                                  href={team.project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="pt-demo-link"
                                >
                                  <div className="pt-demo-star">🌟</div>
                                  Live Demo
                                  <ExternalLink size={14} className="pt-external-icon" />
                                </a>
                              )}
                            </div>

                            <div className="pt-tech-stack-section">
                              <h6 className="pt-tech-stack-title">
                                <Zap size={16} />
                                Tech Stack
                              </h6>
                              <div className="pt-tech-stack-list">
                                {team.project.techStack.map((tech, techIdx) => (
                                  <span 
                                    key={techIdx} 
                                    className="pt-tech-stack-tag"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {team.project.submittedAt && (
                              <p className="pt-submission-date">
                                <Calendar size={14} />
                                Submitted on {new Date(team.project.submittedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            )}
                          </div>

                          {/* Enhanced Action Buttons */}
                          {team.project.status === 'submitted' && (
                            <div className="pt-action-buttons">
                              <button 
                                className="pt-action-btn pt-approve-btn"
                                style={{
                                  animationDelay: '0.1s'
                                }}
                              >
                                <div className="pt-action-btn-overlay"></div>
                                <span className="pt-action-btn-content">
                                  <span className="pt-action-btn-emoji">✅</span>
                                  Approve
                                </span>
                              </button>
                              <button 
                                className="pt-action-btn pt-reject-btn"
                                style={{
                                  animationDelay: '0.2s'
                                }}
                              >
                                <div className="pt-action-btn-overlay"></div>
                                <span className="pt-action-btn-content">
                                  <span className="pt-action-btn-emoji">❌</span>
                                  Reject
                                </span>
                              </button>
                              <button 
                                className="pt-action-btn pt-shortlist-btn"
                                style={{
                                  animationDelay: '0.3s'
                                }}
                              >
                                <div className="pt-action-btn-overlay"></div>
                                <span className="pt-action-btn-content">
                                  <Star className="pt-shortlist-icon" size={16} />
                                  Shortlist
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Hackathon-wise View
          <div className="pt-hackathon-list">
            {Object.entries(getTeamsByHackathon()).map(([hackathonId, { hackathon, teams: hackathonTeams }], index) => (
              <div
                key={hackathonId}
                className="pt-hackathon-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Hackathon Header */}
                <div
                  className="pt-hackathon-header"
                  onClick={() => handleHackathonClick(hackathonId)}
                >
                  <div className="pt-hackathon-header-content">
                    <div className="pt-hackathon-header-left">
                      <div className={`pt-hackathon-icon ${hackathon.color}`}>
                        🏆
                      </div>
                      <div>
                        <h3 className="pt-hackathon-name">
                          {hackathon.name}
                          {hackathon.status === 'ongoing' && <Zap className="pt-hackathon-ongoing-icon" size={24} />}
                          {hackathon.status === 'upcoming' && <Clock className="pt-hackathon-upcoming-icon" size={24} />}
                        </h3>
                        <p className="pt-hackathon-theme">
                          <Target size={18} />
                          {hackathon.theme}
                          <span className="pt-hackathon-separator">•</span>
                          <MapPin size={16} />
                          {hackathon.location}
                        </p>
                        <div className="pt-hackathon-meta">
                          <span className={`pt-hackathon-status ${getHackathonStatusColor(hackathon.status)}`}>
                            {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                          </span>
                          <span className="pt-hackathon-dates">
                            <Calendar size={14} />
                            {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-hackathon-stats">
                      <div className="pt-hackathon-stat pt-stat-teams">
                        <div className="pt-hackathon-stat-value">
                          {hackathonTeams.length}
                        </div>
                        <div className="pt-hackathon-stat-label">Teams</div>
                      </div>
                      <div className="pt-hackathon-stat pt-stat-participants">
                        <div className="pt-hackathon-stat-value">
                          {hackathonTeams.reduce((acc, team) => acc + team.members.length, 0)}
                        </div>
                        <div className="pt-hackathon-stat-label">Participants</div>
                      </div>
                      <div className="pt-hackathon-stat pt-stat-prizes">
                        <div className="pt-hackathon-stat-value">
                          {hackathon.prizes}
                        </div>
                        <div className="pt-hackathon-stat-label">Prize Pool</div>
                      </div>
                      <div className="pt-hackathon-chevron">
                        {expandedHackathon === hackathonId ? (
                          <ChevronDown className="text-gray-400" size={24} />
                        ) : (
                          <ChevronRight className="text-gray-400" size={24} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Hackathon Teams */}
                {expandedHackathon === hackathonId && (
                  <div className="pt-hackathon-expanded">
                    <div className="pt-hackathon-expanded-inner">
                      {hackathonTeams.length > 0 ? (
                        <div className="pt-hackathon-teams">
                          <h4 className="pt-hackathon-teams-title">
                            <Users size={24} />
                            Teams in {hackathon.name}
                            <div className="pt-hackathon-teams-bolt">⚡</div>
                          </h4>
                          {hackathonTeams.map((team, teamIndex) => (
                            <div
                              key={team.id}
                              className="pt-hackathon-team-card"
                              style={{
                                animationDelay: `${teamIndex * 0.1}s`
                              }}
                            >
                              <div className="pt-hackathon-team-header">
                                <div className="pt-hackathon-team-left">
                                  <div className="pt-hackathon-team-avatar">
                                    {team.name.split(' ').map(word => word[0]).join('')}
                                  </div>
                                  <div>
                                    <h5 className="pt-hackathon-team-name">
                                      {team.name}
                                      {team.trending && <TrendingUp className="pt-hackathon-team-trending" size={16} />}
                                      {team.score > 85 && <Star className="pt-hackathon-team-star" size={16} />}
                                    </h5>
                                    <p className="pt-hackathon-team-info">
                                      <Users size={14} />
                                      {team.members.length} members • {team.project.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="pt-hackathon-team-right">
                                  <span className={`pt-hackathon-team-status ${getStatusColor(team.project.status)}`}>
                                    {team.project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </span>
                                  {team.score > 0 && (
                                    <div className="pt-hackathon-team-score">
                                      <span className="pt-hackathon-team-score-value">
                                        {team.score}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="pt-hackathon-team-tech">
                                {team.project.techStack.slice(0, 4).map((tech, idx) => (
                                  <span key={idx} className="pt-hackathon-tech-tag">
                                    {tech}
                                  </span>
                                ))}
                                {team.project.techStack.length > 4 && (
                                  <span className="pt-hackathon-tech-more">
                                    +{team.project.techStack.length - 4} more
                                  </span>
                                )}
                              </div>

                              <p className="pt-hackathon-team-description">{team.project.description}</p>
                              
                              {team.achievements && team.achievements.length > 0 && (
                                <div className="pt-hackathon-achievements">
                                  {team.achievements.map((achievement, achIdx) => (
                                    <span key={achIdx} className="pt-hackathon-achievement">
                                      🏆 {achievement}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="pt-hackathon-team-footer">
                                <div className="pt-hackathon-team-links">
                                  {team.project.repo && (
                                    <a href={team.project.repo} target="_blank" rel="noopener noreferrer" className="pt-hackathon-repo-link">
                                      <Github size={14} />
                                      Repository
                                    </a>
                                  )}
                                  {team.project.demo && (
                                    <a href={team.project.demo} target="_blank" rel="noopener noreferrer" className="pt-hackathon-demo-link">
                                      <Globe size={14} />
                                      Live Demo
                                    </a>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleTeamClick(team.id)}
                                  className="pt-view-details-btn"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="pt-no-teams">
                          <div className="pt-no-teams-icon">
                            <Users className="text-gray-400" size={32} />
                          </div>
                          <h5 className="pt-no-teams-title">No teams found</h5>
                          <p className="pt-no-teams-subtitle">No teams match the current filters for this hackathon</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Empty State for All Views */}
        {((viewMode === 'all' && filteredTeams.length === 0) || 
          (viewMode === 'hackathon' && Object.values(getTeamsByHackathon()).every(({ teams }) => teams.length === 0))) && (
          <div className="pt-empty-state">
            <div className="pt-empty-state-icon">
              <div className="pt-empty-state-circle">
                <Users className="pt-empty-state-users" size={48} />
              </div>
            </div>
            <h3 className="pt-empty-state-title">No teams found 🔍</h3>
            <p className="pt-empty-state-subtitle">
              {viewMode === 'all' 
                ? 'Try adjusting your search or filter criteria to discover amazing teams!' 
                : 'No teams match your current filters in any hackathon. Try adjusting your criteria!'
              }
            </p>
            <div className="pt-empty-state-actions">
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setSelectedHackathon('all');
                }}
                className="pt-clear-filters-btn"
              >
                <div className="pt-clear-filters-content">
                  <Sparkles className="pt-clear-filters-icon" size={20} />
                  Clear All Filters
                </div>
              </button>
              <button 
                onClick={() => setViewMode(viewMode === 'all' ? 'hackathon' : 'all')}
                className="pt-switch-view-btn"
              >
                <div className="pt-switch-view-content">
                  {viewMode === 'all' ? <Trophy size={20} /> : <Users size={20} />}
                  Switch to {viewMode === 'all' ? 'Hackathon' : 'All Teams'} View
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats for Hackathon View */}
        {viewMode === 'hackathon' && Object.values(getTeamsByHackathon()).some(({ teams }) => teams.length > 0) && (
          <div className="pt-overview-section">
            <h3 className="pt-overview-title">
              <BarChart3 size={24} />
              Hackathon Overview
              <div className="pt-overview-chart">📊</div>
            </h3>
            <div className="pt-overview-grid">
              {hackathons.map((hackathon, index) => {
                const hackathonTeams = teams.filter(team => team.hackathonId === hackathon.id);
                const submissions = hackathonTeams.filter(team => team.project.status === 'submitted').length;
                const participants = hackathonTeams.reduce((acc, team) => acc + team.members.length, 0);
                
                return (
                  <div
                    key={hackathon.id}
                    className="pt-overview-card"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className={`pt-overview-card-icon ${hackathon.color}`}>
                      {hackathon.name.split(' ')[0][0]}
                    </div>
                    <h4 className="pt-overview-card-title">
                      {hackathon.name.split(' ').slice(0, 2).join(' ')}
                    </h4>
                    <div className="pt-overview-card-stats">
                      <div className="pt-overview-stat">
                        <span className="pt-overview-stat-label">Teams:</span>
                        <span className="pt-overview-stat-value pt-stat-blue">{hackathonTeams.length}</span>
                      </div>
                      <div className="pt-overview-stat">
                        <span className="pt-overview-stat-label">Participants:</span>
                        <span className="pt-overview-stat-value pt-stat-green">{participants}</span>
                      </div>
                      <div className="pt-overview-stat">
                        <span className="pt-overview-stat-label">Submissions:</span>
                        <span className="pt-overview-stat-value pt-stat-purple">{submissions}</span>
                      </div>
                      <div className="pt-overview-card-status">
                        <div className={`pt-overview-status-badge ${getHackathonStatusColor(hackathon.status)}`}>
                          {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsTeamsPage;