import React, { useState } from 'react';

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState('join');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Mock data for available teams
  const availableTeams = [
    {
      id: 1,
      name: 'AI Innovators',
      hackathon: 'Global Innovation Hackathon 2025',
      leader: 'Sarah Chen',
      members: 2,
      maxMembers: 4,
      skills: ['React', 'Python', 'Machine Learning', 'UI/UX'],
      experience: 'Intermediate',
      timezone: 'PST',
      description: 'Looking for passionate developers to build an AI-powered solution for environmental monitoring.',
      avatar: 'SC',
      rating: 4.8,
      completedProjects: 5,
      lookingFor: ['Backend Developer', 'Data Scientist'],
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Blockchain Builders',
      hackathon: 'Blockchain for Good Competition',
      leader: 'Mike Rodriguez',
      members: 1,
      maxMembers: 3,
      skills: ['Solidity', 'Web3', 'React', 'Node.js'],
      experience: 'Advanced',
      timezone: 'EST',
      description: 'Experienced team working on decentralized solutions for charity transparency.',
      avatar: 'MR',
      rating: 4.9,
      completedProjects: 8,
      lookingFor: ['Frontend Developer'],
      lastActive: '30 minutes ago'
    },
    {
      id: 3,
      name: 'Mobile Mavericks',
      hackathon: 'Mobile App Development Bootcamp',
      leader: 'Emma Wilson',
      members: 3,
      maxMembers: 4,
      skills: ['Flutter', 'React Native', 'Firebase', 'Design'],
      experience: 'Beginner Friendly',
      timezone: 'GMT',
      description: 'Creating inclusive mobile apps that make a difference. Perfect for newcomers!',
      avatar: 'EW',
      rating: 4.6,
      completedProjects: 3,
      lookingFor: ['Backend Developer'],
      lastActive: '1 hour ago'
    },
    {
      id: 4,
      name: 'Data Wizards',
      hackathon: 'Global Innovation Hackathon 2025',
      leader: 'David Kim',
      members: 2,
      maxMembers: 5,
      skills: ['Python', 'TensorFlow', 'SQL', 'Tableau'],
      experience: 'Intermediate',
      timezone: 'JST',
      description: 'Data-driven team focused on creating analytics solutions for smart cities.',
      avatar: 'DK',
      rating: 4.7,
      completedProjects: 6,
      lookingFor: ['Full Stack Developer', 'UI/UX Designer'],
      lastActive: '45 minutes ago'
    }
  ];

  // Mock data for individual members
  const availableMembers = [
    {
      id: 1,
      name: 'Alex Thompson',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      experience: 'Intermediate',
      timezone: 'EST',
      avatar: 'AT',
      rating: 4.5,
      completedProjects: 4,
      bio: 'Full-stack developer passionate about creating scalable web applications.',
      lookingFor: 'Any hackathon team',
      lastActive: '1 hour ago'
    },
    {
      id: 2,
      name: 'Lisa Zhang',
      skills: ['UI/UX', 'Figma', 'React', 'CSS'],
      experience: 'Advanced',
      timezone: 'PST',
      avatar: 'LZ',
      rating: 4.9,
      completedProjects: 7,
      bio: 'Designer and front-end developer with experience in user-centered design.',
      lookingFor: 'Design-focused teams',
      lastActive: '20 minutes ago'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      skills: ['Python', 'Django', 'AWS', 'Docker'],
      experience: 'Advanced',
      timezone: 'GMT',
      avatar: 'RJ',
      rating: 4.8,
      completedProjects: 9,
      bio: 'Backend specialist with DevOps experience. Love working on challenging problems.',
      lookingFor: 'Backend/Infrastructure teams',
      lastActive: '3 hours ago'
    }
  ];

  const [newTeam, setNewTeam] = useState({
    name: '',
    hackathon: 'Global Innovation Hackathon 2025',
    description: '',
    maxMembers: 4,
    experience: 'Beginner Friendly',
    skills: '',
    lookingFor: ''
  });

  const hackathonOptions = [
    'Global Innovation Hackathon 2025',
    'Blockchain for Good Competition',
    'Mobile App Development Bootcamp',
    'FinTech Innovation Summit'
  ];

  const handleCreateTeam = (e) => {
    e.preventDefault();
    alert(`Team "${newTeam.name}" created successfully!`);
    setShowCreateTeamModal(false);
    setNewTeam({
      name: '',
      hackathon: 'Global Innovation Hackathon 2025',
      description: '',
      maxMembers: 4,
      experience: 'Beginner Friendly',
      skills: '',
      lookingFor: ''
    });
  };

  const handleJoinTeam = (teamId) => {
    alert(`Request sent to join team ${teamId}!`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        message: chatMessage,
        sender: 'You',
        time: new Date().toLocaleTimeString()
      }]);
      setChatMessage('');
    }
  };

  const openChat = (team) => {
    setSelectedTeam(team);
    setChatMessages([
      {
        id: 1,
        message: `Hi! I'm interested in joining ${team.name}. Could you tell me more about the project?`,
        sender: 'You',
        time: '2:30 PM'
      },
      {
        id: 2,
        message: `Hello! Great to hear from you. We're building an AI solution for environmental monitoring. What's your experience with machine learning?`,
        sender: team.leader,
        time: '2:32 PM'
      }
    ]);
    setShowChatModal(true);
  };

  const filteredTeams = availableTeams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    team.hackathon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = availableMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <style>{`
        .teammanage-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .teammanage-header {
          background: linear-gradient(135deg, #667eea 0%, #667eea 100%);
          color: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }

        .teammanage-header h1 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .teammanage-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .teammanage-tab-navigation {
          display: flex;
          background: white;
          border-radius: 15px;
          padding: 8px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .teammanage-tab-btn {
          flex: 1;
          padding: 15px 25px;
          border: none;
          border-radius: 10px;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          color: #666;
        }

        .teammanage-tab-btn.teammanage-active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .teammanage-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
        }

        .teammanage-search-bar {
          flex: 1;
          position: relative;
        }

        .teammanage-search-input {
          width: 100%;
          padding: 15px 20px 15px 50px;
          border: 2px solid #e1e5e9;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .teammanage-search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .teammanage-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .teammanage-create-team-btn {
          padding: 15px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .teammanage-create-team-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .teammanage-teams-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .teammanage-team-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }

        .teammanage-team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .teammanage-team-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .teammanage-team-avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 15px;
        }

        .teammanage-team-info h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 5px;
        }

        .teammanage-team-leader {
          color: #666;
          font-size: 0.9rem;
        }

        .teammanage-team-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
        }

        .teammanage-stat {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #1c1a1aff;
          font-size: 0.9rem;
        }

        .teammanage-members-count {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
          padding: 8px 12px;
          background: #f8f9ff;
          border-radius: 10px;
          color: #667eea;
          font-weight: 600;
        }

        .teammanage-experience-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .teammanage-experience-badge.teammanage-beginner-friendly {
          background: #e8f5e8;
          color: #2d7d2d;
        }

        .teammanage-experience-badge.teammanage-intermediate {
          background: #fff3cd;
          color: #856404;
        }

        .teammanage-experience-badge.teammanage-advanced {
          background: #f8d7da;
          color: #721c24;
        }

        .teammanage-team-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .teammanage-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .teammanage-skill-tag {
          background: #f0f0f0;
          color: #666;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .teammanage-looking-for {
          background: #e8f5e8;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .teammanage-looking-for-title {
          font-weight: 600;
          color: #2d7d2d;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .teammanage-looking-for-roles {
          color: #666;
          font-size: 0.9rem;
        }

        .teammanage-team-actions {
          display: flex;
          gap: 10px;
        }

        .teammanage-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .teammanage-btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .teammanage-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .teammanage-btn-outline {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .teammanage-btn-outline:hover {
          background: #667eea;
          color: white;
        }

        .teammanage-members-section {
          margin-top: 40px;
        }

        .teammanage-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #d7d7d8ff;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .teammanage-member-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }

        .teammanage-member-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
        }

        .teammanage-member-header {
          display: flex;
          align-items: center;
          color: #070606ff;
          margin-bottom: 15px;
        }

        .teammanage-member-avatar {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 15px;
        }

        .teammanage-member-bio {
          color: #0c0a0aff;
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .teammanage-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .teammanage-modal {
          background: white;
          border-radius: 20px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
        }

        .teammanage-modal-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 25px;
        }

        .teammanage-modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
        }

        .teammanage-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #999;
        }

        .teammanage-form-group {
          margin-bottom: 20px;
        }

        .teammanage-form-label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .teammanage-form-input, .teammanage-form-textarea, .teammanage-form-select {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e1e5e9;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .teammanage-form-input:focus, .teammanage-form-textarea:focus, .teammanage-form-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .teammanage-form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .teammanage-chat-modal {
          max-width: 600px;
          height: 70vh;
          display: flex;
          flex-direction: column;
        }

        .teammanage-chat-header {
          padding-bottom: 20px;
          border-bottom: 1px solid #e1e5e9;
          margin-bottom: 20px;
        }

        .teammanage-chat-messages {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
        }

        .teammanage-chat-message {
          margin-bottom: 15px;
          padding: 12px 15px;
          border-radius: 15px;
          max-width: 80%;
        }

        .teammanage-chat-message.teammanage-own {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 5px;
        }

        .teammanage-chat-message.teammanage-other {
          background: #f8f9ff;
          color: #333;
          margin-right: auto;
          border-bottom-left-radius: 5px;
        }

        .teammanage-message-info {
          font-size: 0.8rem;
          opacity: 0.7;
          margin-bottom: 5px;
        }

        .teammanage-chat-input-form {
          display: flex;
          gap: 10px;
        }

        .teammanage-chat-input {
          flex: 1;
          padding: 12px 15px;
          border: 2px solid #e1e5e9;
          border-radius: 25px;
        }

        .teammanage-send-btn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
        }

        .teammanage-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #ffa500;
        }

        .teammanage-last-active {
          font-size: 0.8rem;
          color: #999;
        }

        .teammanage-hackathon-badge {
          background: #e8f4ff;
          color: #0066cc;
          padding: 4px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 10px;
          display: inline-block;
        }

        .teammanage-empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .teammanage-empty-state h3 {
          margin-bottom: 10px;
        }

        .teammanage-empty-state p {
          margin-bottom: 20px;
        }
      `}</style>

      <div className="teammanage-container">
        {/* Header */}
        <div className="teammanage-header">
          <h1>Find Your Dream Team</h1>
          <p>Connect with talented individuals and create amazing projects together</p>
        </div>

        {/* Tab Navigation */}
        <div className="teammanage-tab-navigation">
          <button 
            className={`teammanage-tab-btn ${activeTab === 'join' ? 'teammanage-active' : ''}`}
            onClick={() => setActiveTab('join')}
          >
             Join Teams
          </button>
          <button 
            className={`teammanage-tab-btn ${activeTab === 'members' ? 'teammanage-active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
             Find Members
          </button>
          <button 
            className={`teammanage-tab-btn ${activeTab === 'myteams' ? 'teammanage-active' : ''}`}
            onClick={() => setActiveTab('myteams')}
          >
             My Teams
          </button>
        </div>

        {/* Controls */}
        <div className="teammanage-controls">
          <div className="teammanage-search-bar">
            <span className="teammanage-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search teams, skills, hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="teammanage-search-input"
            />
          </div>
          <button 
            className="teammanage-create-team-btn"
            onClick={() => setShowCreateTeamModal(true)}
          >
             Create Team
          </button>
        </div>

        {/* Teams Grid */}
        {activeTab === 'join' && (
          <div className="teammanage-teams-grid">
            {filteredTeams.map(team => (
              <div key={team.id} className="teammanage-team-card">
                <div className="teammanage-hackathon-badge">{team.hackathon}</div>
                
                <div className="teammanage-team-header">
                  <div className="teammanage-team-avatar">{team.avatar}</div>
                  <div className="teammanage-team-info">
                    <h3>{team.name}</h3>
                    <div className="teammanage-team-leader">Led by {team.leader}</div>
                  </div>
                </div>

                <div className="teammanage-team-stats">
                  <div className="teammanage-stat">
                    <span></span>
                    <span>{team.rating}</span>
                  </div>
                  <div className="teammanage-stat">
                    <span></span>
                    <span>{team.completedProjects} projects</span>
                  </div>
                  <div className="teammanage-stat">
                    <span></span>
                    <span>{team.timezone}</span>
                  </div>
                </div>

                <div className="teammanage-members-count">
                  <span></span>
                  <span>{team.members}/{team.maxMembers} members</span>
                </div>

                <div className={`teammanage-experience-badge teammanage-${team.experience.toLowerCase().replace(' ', '-')}`}>
                  {team.experience}
                </div>

                <p className="teammanage-team-description">{team.description}</p>

                <div className="teammanage-skills-list">
                  {team.skills.map(skill => (
                    <span key={skill} className="teammanage-skill-tag">{skill}</span>
                  ))}
                </div>

                <div className="teammanage-looking-for">
                  <div className="teammanage-looking-for-title">Looking for:</div>
                  <div className="teammanage-looking-for-roles">{team.lookingFor.join(', ')}</div>
                </div>

                <div className="teammanage-last-active">Last active: {team.lastActive}</div>

                <div className="teammanage-team-actions">
                  <button 
                    className="teammanage-btn teammanage-btn-primary"
                    onClick={() => handleJoinTeam(team.id)}
                  >
                     Request to Join
                  </button>
                  <button 
                    className="teammanage-btn teammanage-btn-outline"
                    onClick={() => openChat(team)}
                  >
                     Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Individual Members */}
        {activeTab === 'members' && (
          <div className="teammanage-members-section">
            <h2 className="teammanage-section-title">
              <span></span>
              Available Team Members
            </h2>
            <div className="teammanage-teams-grid">
              {filteredMembers.map(member => (
                <div key={member.id} className="teammanage-member-card">
                  <div className="teammanage-member-header">
                    <div className="teammanage-member-avatar">{member.avatar}</div>
                    <div className="teammanage-team-info">
                      <h3>{member.name}</h3>
                      <div className="teammanage-team-leader">{member.experience}</div>
                    </div>
                  </div>

                  <div className="teammanage-team-stats">
                    <div className="teammanage-stat">
                      <span></span>
                      <span>{member.rating}</span>
                    </div>
                    <div className="teammanage-stat">
                      <span></span>
                      <span>{member.completedProjects} projects</span>
                    </div>
                    <div className="teammanage-stat">
                      <span></span>
                      <span>{member.timezone}</span>
                    </div>
                  </div>

                  <p className="teammanage-member-bio">{member.bio}</p>

                  <div className="teammanage-skills-list">
                    {member.skills.map(skill => (
                      <span key={skill} className="teammanage-skill-tag">{skill}</span>
                    ))}
                  </div>

                  <div className="teammanage-looking-for">
                    <div className="teammanage-looking-for-title">Looking for:</div>
                    <div className="teammanage-looking-for-roles">{member.lookingFor}</div>
                  </div>

                  <div className="teammanage-last-active">Last active: {member.lastActive}</div>

                  <div className="teammanage-team-actions">
                    <button 
                      className="teammanage-btn teammanage-btn-primary"
                      onClick={() => alert(`Invitation sent to ${member.name}!`)}
                    >
                       Invite to Team
                    </button>
                    <button 
                      className="teammanage-btn teammanage-btn-outline"
                      onClick={() => openChat({...member, leader: member.name})}
                    >
                       Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Teams */}
        {activeTab === 'myteams' && (
          <div className="teammanage-members-section">
            <h2 className="teammanage-section-title">
              <span></span>
              My Teams
            </h2>
            <div className="teammanage-empty-state">
              <h3>No teams yet</h3>
              <p>Create your first team or join an existing one to get started!</p>
              <button 
                className="teammanage-btn teammanage-btn-primary" 
                style={{marginTop: '20px'}}
                onClick={() => setShowCreateTeamModal(true)}
              >
                 Create Your First Team
              </button>
            </div>
          </div>
        )}

        {/* Create Team Modal */}
        {showCreateTeamModal && (
          <div className="teammanage-modal-overlay">
            <div className="teammanage-modal">
              <button className="teammanage-close-btn" onClick={() => setShowCreateTeamModal(false)}>×</button>
              <div className="teammanage-modal-header">
                <h2 className="teammanage-modal-title">Create New Team</h2>
              </div>
              
              <form onSubmit={handleCreateTeam}>
                <div className="teammanage-form-group">
                  <label className="teammanage-form-label">Team Name</label>
                  <input
                    type="text"
                    className="teammanage-form-input"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                    placeholder="Enter team name"
                    required
                  />
                </div>

                <div className="teammanage-form-group">
                  <label className="teammanage-form-label">Hackathon</label>
                  <select
                    className="teammanage-form-select"
                    value={newTeam.hackathon}
                    onChange={(e) => setNewTeam({...newTeam, hackathon: e.target.value})}
                  >
                    {hackathonOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="teammanage-form-group">
                  <label className="teammanage-form-label">Team Description</label>
                  <textarea
                    className="teammanage-form-textarea"
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                    placeholder="Describe your team and project goals..."
                    required
                  />
                </div>

                <div className="teammanage-form-group">
                  <label className="teammanage-form-label">Maximum Team Members</label>
                  <select
                    className="teammanage-form-select"
                    value={newTeam.maxMembers}
                    onChange={(e) => setNewTeam({...newTeam, maxMembers: parseInt(e.target.value)})}
                  >
                    <option value={2}>2 members</option>
                    <option value={3}>3 members</option>
                    <option value={4}>4 members</option>
                    <option value={5}>5 members</option>
                  </select>
                </div>

                <div className="teammanage-form-group">
                  <label className="teammanage-form-label">Experience Level</label>
                  <select
                    className="teammanage-form-select"
                    value={newTeam.experience}
                    onChange={(e) => setNewTeam({...newTeam, experience: e.target.value})}
                  >
                    <option value="Beginner Friendly">Beginner Friendly</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="teammanage-form-group">
                  <label className="teammanage-form-label">Required Skills (comma separated)</label>
                  <input
                    type="text"
                    className="teammanage-form-input"
                    value={newTeam.skills}
                    onChange={(e) => setNewTeam({...newTeam, skills: e.target.value})}
                    placeholder="e.g., React, Python, UI/UX, Machine Learning"
                  />
                </div>

                <div className="teammanage-form-group">
                  <label className="teammanage-form-label">Looking For (comma separated)</label>
                  <input
                    type="text"
                    className="teammanage-form-input"
                    value={newTeam.lookingFor}
                    onChange={(e) => setNewTeam({...newTeam, lookingFor: e.target.value})}
                    placeholder="e.g., Frontend Developer, Data Scientist"
                  />
                </div>

                <div className="teammanage-team-actions">
                  <button 
                    type="button" 
                    className="teammanage-btn teammanage-btn-outline"
                    onClick={() => setShowCreateTeamModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="teammanage-btn teammanage-btn-primary">
                     Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {showChatModal && selectedTeam && (
          <div className="teammanage-modal-overlay">
            <div className="teammanage-modal teammanage-chat-modal">
              <button className="teammanage-close-btn" onClick={() => setShowChatModal(false)}>×</button>
              <div className="teammanage-chat-header">
                <h2 className="teammanage-modal-title">Chat with {selectedTeam.name}</h2>
                <p style={{color: '#666', marginTop: '5px'}}>Team Leader: {selectedTeam.leader}</p>
              </div>
              
              <div className="teammanage-chat-messages">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`teammanage-chat-message ${msg.sender === 'You' ? 'teammanage-own' : 'teammanage-other'}`}
                  >
                    <div className="teammanage-message-info">
                      <strong>{msg.sender}</strong> • {msg.time}
                    </div>
                    <div>{msg.message}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="teammanage-chat-input-form">
                <input
                  type="text"
                  className="teammanage-chat-input"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit" className="teammanage-send-btn">
                  
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamManagement;