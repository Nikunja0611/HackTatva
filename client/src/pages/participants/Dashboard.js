import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalHackathons: 12,
    activeHackathons: 3,
    completedProjects: 9,
    totalWins: 2,
    currentRank: 156,
    totalPoints: 2840
  });
  const [isOpen, setIsOpen] = useState(false);
  const [currentHackathons] = useState([
    {
      id: 1,
      title: 'Global Innovation Hackathon 2025',
      status: 'Active',
      timeRemaining: '2d 5h 49m',
      progress: 75,
      team: ['Alex Johnson', 'Sarah Chen', 'Mike Rodriguez'],
      projectTitle: 'EcoTrack AI',
      submissionStatus: 'Draft Saved',
      prize: '$50,000',
      participants: 1247,
      category: 'AI & ML'
    },
    {
      id: 2,
      title: 'Blockchain for Good Competition',
      status: 'Submitted',
      timeRemaining: 'Judging Phase',
      progress: 100,
      team: ['Alex Johnson', 'Emma Wilson'],
      projectTitle: 'CharityChain',
      submissionStatus: 'Submitted',
      prize: '$25,000',
      participants: 892,
      category: 'Blockchain'
    },
    {
      id: 3,
      title: 'Mobile App Development Bootcamp',
      status: 'Registration Open',
      timeRemaining: '10 days to start',
      progress: 20,
      team: ['Alex Johnson'],
      projectTitle: 'Not Started',
      submissionStatus: 'Planning',
      prize: '$15,000',
      participants: 456,
      category: 'Mobile'
    }
  ]);

  const [completedProjects] = useState([
    {
      id: 1,
      title: 'SmartCity Dashboard',
      hackathon: 'Urban Tech Challenge 2024',
      result: '🥇 1st Place',
      prize: '$10,000',
      date: 'Dec 2024',
      tech: ['React', 'Node.js', 'MongoDB'],
      description: 'A comprehensive dashboard for city administrators to monitor and manage urban resources.',
      image: '/images/Smartcity.webp',
      githubUrl: 'https://github.com/alexj/smartcity-dashboard',
      liveUrl: 'https://smartcity-demo.com'
    },
    {
      id: 2,
      title: 'HealthSync',
      hackathon: 'Healthcare Innovation Summit',
      result: '🥈 2nd Place',
      prize: '$5,000',
      date: 'Oct 2024',
      tech: ['Flutter', 'Firebase', 'Python'],
      description: 'Mobile app connecting patients with healthcare providers for seamless appointment management.',
      image: '/images/HealthSync.webp',
      githubUrl: 'https://github.com/alexj/healthsync',
      liveUrl: 'https://healthsync-app.com'
    },
    {
      id: 3,
      title: 'EcoPredict',
      hackathon: 'Climate Tech Hackathon',
      result: '🥉 3rd Place',
      prize: '$2,500',
      date: 'Aug 2024',
      tech: ['Python', 'TensorFlow', 'React'],
      description: 'AI-powered environmental impact prediction tool for businesses.',
      image: '/images/ecopredict.webp',
      githubUrl: 'https://github.com/alexj/ecopredict',
      liveUrl: 'https://ecopredict.io'
    }
  ]);

  const [upcomingHackathons] = useState([
    {
      id: 1,
      title: 'FinTech Innovation Summit',
      date: 'Sep 15-17, 2025',
      location: 'London & Online',
      registrationDeadline: 'Sep 10, 2025',
      prize: '$75,000',
      difficulty: 'Advanced',
      tags: ['FinTech', 'Blockchain', 'AI']
    },
    {
      id: 2,
      title: 'Sustainability Tech Challenge',
      date: 'Sep 20-22, 2025',
      location: 'Berlin',
      registrationDeadline: 'Sep 15, 2025',
      prize: '$30,000',
      difficulty: 'Intermediate',
      tags: ['Sustainability', 'Green Energy', 'IoT']
    },
    {
      id: 3,
      title: 'Healthcare Innovation Bootcamp',
      date: 'Oct 1-3, 2025',
      location: 'Boston & Online',
      registrationDeadline: 'Sep 25, 2025',
      prize: '$40,000',
      difficulty: 'Beginner Friendly',
      tags: ['Healthcare', 'Medical Devices', 'AI']
    }
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'submission',
      message: 'You submitted your project "CharityChain" to Blockchain for Good Competition',
      time: '2 hours ago',
      icon: ''
    },
    {
      id: 2,
      type: 'team',
      message: 'Sarah Chen joined your team for Global Innovation Hackathon 2025',
      time: '5 hours ago',
      icon: ''
    },
    {
      id: 3,
      type: 'achievement',
      message: 'You earned the "Team Player" badge',
      time: '1 day ago',
      icon: ''
    },
    {
      id: 4,
      type: 'registration',
      message: 'You registered for Mobile App Development Bootcamp',
      time: '2 days ago',
      icon: ''
    },
    {
      id: 5,
      type: 'result',
      message: 'Your project "EcoPredict" won 3rd place in Climate Tech Hackathon!',
      time: '1 week ago',
      icon: ''
    }
  ]);

  useEffect(() => {
    // Simulate loading notifications
    setNotifications([
      { id: 1, message: 'Submission deadline in 2 days for Global Innovation Hackathon!', type: 'warning' },
      { id: 2, message: 'New hackathon: FinTech Innovation Summit is now open for registration', type: 'info' },
      { id: 3, message: 'Your teammate Sarah Chen uploaded new code to EcoTrack AI', type: 'info' }
    ]);
  }, []);

  const handleRegister = (hackathonId) => {
    alert(`Registering for hackathon ${hackathonId}`);
  };

  const handleViewProject = (projectId) => {
    alert(`Viewing project ${projectId}`);
  };

  const handleEditProject = (hackathonId) => {
    alert(`Editing project for hackathon ${hackathonId}`);
  };

  const handleJoinTeam = (hackathonId) => {
    alert(`Managing team for hackathon ${hackathonId}`);
  };

  const renderOverview = () => (
    <div className="overview-content">
      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalWins}</div>
            <div className="stat-label">Total Wins</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedProjects}</div>
            <div className="stat-label">Projects Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">#{stats.currentRank}</div>
            <div className="stat-label">Current Rank</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"></div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalPoints.toLocaleString()}</div>
            <div className="stat-label">Total Points</div>
          </div>
        </div>
      </div>

      {/* Active Hackathons */}
      <div className="section">
        <h2> Active Hackathons</h2>
        <div className="active-hackathons">
          {currentHackathons.filter(h => h.status === 'Active').map(hackathon => (
            <div key={hackathon.id} className="active-hackathon-card">
              <div className="hackathon-header">
                <h3>{hackathon.title}</h3>
                <div className="time-remaining urgent">{hackathon.timeRemaining}</div>
              </div>
              <div className="hackathon-details">
                <div className="detail-row">
                  <span>Project: <strong>{hackathon.projectTitle}</strong></span>
                  <span className={`status ${hackathon.submissionStatus.toLowerCase().replace(' ', '-')}`}>
                    {hackathon.submissionStatus}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Team: {hackathon.team.join(', ')}</span>
                </div>
                <div className="progress-section">
                  <div className="progress-label">Project Progress</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${hackathon.progress}%`}}
                    ></div>
                  </div>
                  <span className="progress-text">{hackathon.progress}%</span>
                </div>
              </div>
              <div className="hackathon-actions">
                <button onClick={() => handleEditProject(hackathon.id)} className="btn btn-primary">
                   Continue Project
                </button>
                <button onClick={() => handleJoinTeam(hackathon.id)} className="btn btn-outline">
                  👥 Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section">
        <h2> Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.slice(0, 5).map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <p>{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2> Quick Actions</h2>
        <div className="quick-actions">
          <button className="quick-action-btn"  onClick={() => navigate("/events")}>
            <span className="action-icon"></span>
            <span>Find Hackathons</span>
          </button>
          <button className="quick-action-btn" onClick={() => navigate("/team-management")}>
            <span className="action-icon"></span>
            <span>Find Teammates</span>
          </button>
      
          <button className="quick-action-btn" onClick={() => navigate("/leaderboard")}>
            <span className="action-icon"></span>
            <span>View Achievements</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentHackathons = () => (
    <div className="hackathons-content">
      <div className="hackathons-grid">
        {currentHackathons.map(hackathon => (
          <div key={hackathon.id} className="hackathon-card">
            <div className="card-header">
              <div className={`status-badge ${hackathon.status.toLowerCase().replace(' ', '-')}`}>
                {hackathon.status}
              </div>
              <div className="hackathon-category">{hackathon.category}</div>
            </div>
            
            <h3 className="hackathon-title">{hackathon.title}</h3>
            
            <div className="hackathon-meta">
              <div className="meta-item">
                <span className="meta-icon"></span>
                <span>{hackathon.timeRemaining}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon"></span>
                <span>{hackathon.participants} participants</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon"></span>
                <span>{hackathon.prize}</span>
              </div>
            </div>

            <div className="project-info">
              <div className="project-title">
                Project: <strong>{hackathon.projectTitle}</strong>
              </div>
              <div className="team-info">
                Team: {hackathon.team.join(', ')}
              </div>
              <div className={`submission-status ${hackathon.submissionStatus.toLowerCase().replace(' ', '-')}`}>
                {hackathon.submissionStatus}
              </div>
            </div>

            <div className="card-actions">
              {hackathon.status === 'Active' && (
                <>
                  <button onClick={() => handleEditProject(hackathon.id)} className="btn btn-primary">
                     Edit Project
                  </button>
                  <button onClick={() => handleJoinTeam(hackathon.id)} className="btn btn-outline">
                    👥 Team
                  </button>
                </>
              )}
              {hackathon.status === 'Registration Open' && (
                <button onClick={() => handleRegister(hackathon.id)} className="btn btn-success">
                   Complete Registration
                </button>
              )}
              {hackathon.status === 'Submitted' && (
                <button onClick={() => handleViewProject(hackathon.id)} className="btn btn-outline">
                   View Submission
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompletedProjects = () => (
    <div className="projects-content">
      <div className="projects-grid">
        {completedProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="result-badge">{project.result}</div>
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-hackathon">{project.hackathon}</p>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-meta">
                <span className="project-date">{project.date}</span>
                <span className="project-prize">{project.prize}</span>
              </div>
              
              <div className="project-actions">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <span></span> GitHub
                </a>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <span></span> Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpcoming = () => (
    <div className="upcoming-content">
      <div className="upcoming-grid">
        {upcomingHackathons.map(hackathon => (
          <div key={hackathon.id} className="upcoming-card">
            <div className="card-header">
              <div className={`difficulty-badge ${hackathon.difficulty.toLowerCase().replace(' ', '-')}`}>
                {hackathon.difficulty}
              </div>
              <div className="prize-amount">{hackathon.prize}</div>
            </div>
            
            <h3 className="hackathon-title">{hackathon.title}</h3>
            
            <div className="hackathon-details">
              <div className="detail-item">
                <span className="detail-icon"></span>
                <span>{hackathon.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon"></span>
                <span>{hackathon.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon"></span>
                <span>Register by {hackathon.registrationDeadline}</span>
              </div>
            </div>
            
            <div className="hackathon-tags">
              {hackathon.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <button onClick={() => handleRegister(hackathon.id)} className="btn btn-primary full-width">
               Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">HackTatva</span>
          </div>
          <div className="user-welcome">
            <h1>Welcome back, Alex! </h1>
            <p>Ready to build something amazing today?</p>
          </div>
        </div>
        <div className="header-right">
          <div className="notifications-dropdown">
            <button className="notifications-btn">
               <span className="badge">{notifications.length}</span>
            </button>
          </div>
          <div className="user-profile">
            <div className="avatar">A</div>
            <div className="user-info">
              <span className="user-name">Alex Johnson</span>
              <span className="user-level">Level 8 Hacker</span>
            </div>
          </div>
          
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon"></span>
            Overview
          </button>
          <button 
            className={`nav-tab ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            <span className="tab-icon"></span>
            Current Hackathons
            <span className="tab-count">{stats.activeHackathons}</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <span className="tab-icon"></span>
            Completed Projects
            <span className="tab-count">{stats.completedProjects}</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <span className="tab-icon"></span>
            Upcoming Events
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Notifications Bar */}
        {notifications.length > 0 && (
          <div className="notifications-bar">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification ${notification.type}`}>
                <span className="notification-icon">
                  {notification.type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
                <span className="notification-message">{notification.message}</span>
                <button 
                  className="notification-close"
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'current' && renderCurrentHackathons()}
          {activeTab === 'completed' && renderCompletedProjects()}
          {activeTab === 'upcoming' && renderUpcoming()}
        </div>
      </main>
      

       {/* Floating button */}
      <div className="chatbot-launcher" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {/* Chatbot container */}
      {isOpen && (
        <div className="chatbot-iframe-container">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/uX2R6_ncAoxxJag62rRFd"
            width="100%"
            style={{ height: "100%", minHeight: "500px", border: "none" }}
            frameBorder="0"
            title="HackTatva Chatbot"
          ></iframe>
        </div>
      )}
    </div>
    
  );
};

export default Dashboard;