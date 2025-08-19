import React, { useState } from 'react';
import { Trophy, Medal, Award, Users, Calendar, Star, Code, Target } from 'lucide-react';

const Leaderboard = () => {
  const [sortBy, setSortBy] = useState('participation');
  const [currentUserId] = useState(2); // This would come from your auth context/props
  
  // Sample participants data - replace with your actual data
  const participants = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      hackathonsParticipated: 12,
      totalScore: 1140,
      averageScore: 95.0,
      wins: 3,
      topThreeFinishes: 7,
      specializations: ["AI/ML", "Web Dev", "Mobile"],
      recentHackathons: [
        { name: "AI Innovation 2024", rank: 1, score: 98 },
        { name: "Web3 Summit", rank: 2, score: 94 },
        { name: "Health Tech Challenge", rank: 1, score: 96 }
      ],
      joinDate: "2022-01-15",
      level: "Expert"
    },
    {
      id: 2,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      hackathonsParticipated: 10,
      totalScore: 920,
      averageScore: 92.0,
      wins: 2,
      topThreeFinishes: 6,
      specializations: ["Blockchain", "IoT", "Cybersecurity"],
      recentHackathons: [
        { name: "Crypto Innovation", rank: 1, score: 95 },
        { name: "Smart City Challenge", rank: 3, score: 89 },
        { name: "Security Hackathon", rank: 2, score: 93 }
      ],
      joinDate: "2022-03-22",
      level: "Expert"
    },
    {
      id: 3,
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      hackathonsParticipated: 8,
      totalScore: 720,
      averageScore: 90.0,
      wins: 1,
      topThreeFinishes: 4,
      specializations: ["Data Science", "UI/UX", "Backend"],
      recentHackathons: [
        { name: "Data Viz Challenge", rank: 1, score: 97 },
        { name: "Design Sprint", rank: 4, score: 87 },
        { name: "API Challenge", rank: 2, score: 91 }
      ],
      joinDate: "2022-08-10",
      level: "Advanced"
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      hackathonsParticipated: 6,
      totalScore: 510,
      averageScore: 85.0,
      wins: 1,
      topThreeFinishes: 2,
      specializations: ["Full Stack", "DevOps", "Cloud"],
      recentHackathons: [
        { name: "Cloud Computing Hack", rank: 3, score: 88 },
        { name: "Startup Weekend", rank: 1, score: 92 },
        { name: "Open Source Contrib", rank: 5, score: 82 }
      ],
      joinDate: "2023-01-20",
      level: "Intermediate"
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150",
      hackathonsParticipated: 4,
      totalScore: 340,
      averageScore: 85.0,
      wins: 0,
      topThreeFinishes: 1,
      specializations: ["Frontend", "Mobile", "Game Dev"],
      recentHackathons: [
        { name: "Game Jam 2024", rank: 3, score: 86 },
        { name: "Mobile App Challenge", rank: 6, score: 84 },
        { name: "React Competition", rank: 4, score: 85 }
      ],
      joinDate: "2023-06-12",
      level: "Beginner"
    }
  ];

  const sortOptions = [
    { id: 'participation', name: 'Most Hackathons', icon: Calendar },
    { id: 'average', name: 'Highest Average', icon: Target },
    { id: 'total', name: 'Total Score', icon: Star },
    { id: 'wins', name: 'Most Wins', icon: Trophy }
  ];

  const getSortedParticipants = () => {
    const sorted = [...participants].sort((a, b) => {
      switch(sortBy) {
        case 'participation':
          return b.hackathonsParticipated - a.hackathonsParticipated;
        case 'average':
          return b.averageScore - a.averageScore;
        case 'total':
          return b.totalScore - a.totalScore;
        case 'wins':
          return b.wins - a.wins;
        default:
          return b.hackathonsParticipated - a.hackathonsParticipated;
      }
    });
    
    return sorted.map((participant, index) => ({
      ...participant,
      rank: index + 1
    }));
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="rank-icon gold" />;
      case 2: return <Medal className="rank-icon silver" />;
      case 3: return <Award className="rank-icon bronze" />;
      default: return <span className="rank-number">#{rank}</span>;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return '#FF6B6B';
      case 'Advanced': return '#4ECDC4';
      case 'Intermediate': return '#45B7D1';
      case 'Beginner': return '#96CEB4';
      default: return '#95A5A6';
    }
  };

  const getRankClass = (rank) => {
    switch(rank) {
      case 1: return 'participant-card first-place';
      case 2: return 'participant-card second-place';
      case 3: return 'participant-card third-place';
      default: return 'participant-card';
    }
  };

  const sortedParticipants = getSortedParticipants();
  const currentUser = sortedParticipants.find(p => p.id === currentUserId);

  return (
    <div className="leaderboard-container">
      <style jsx>{`
        .leaderboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          background: linear-gradient(135deg, #190f4bff 0%, #190f4bff 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
          color: white;
        }

        .header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
          text-shadow: 0 2px 2px rgba(0,0,0,0.3);
        }

        .header p {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
        }

        .controls-section {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          background: rgba(252, 250, 250, 0.1);
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .sort-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .sort-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: none;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .sort-tab:hover {
          background: rgba(255, 253, 253, 0.1);
        }

        .sort-tab.active {
          background: rgba(237, 237, 237, 0.2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .my-rank-section {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .my-rank-header {
          text-align: center;
          color: white;
          margin-bottom: 1.5rem;
        }

        .my-rank-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .my-rank-subtitle {
          opacity: 0.9;
          font-size: 1rem;
        }

        .my-rank-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 3px solid #4ECDC4;
          position: relative;
          overflow: hidden;
        }

        .my-rank-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4ECDC4, #44A08D);
        }

        .current-user-badge {
          position: absolute;
          top: -10px;
          right: 15px;
          background: #4ECDC4;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0 0 12px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .my-rank-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .my-rank-stat {
          text-align: center;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .my-rank-value {
          font-size: 2rem;
          font-weight: bold;
          color: #4ECDC4;
          margin-bottom: 0.5rem;
        }

        .my-rank-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        .rank-improvement {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.75rem;
          background: #e8f5e8;
          border-radius: 8px;
          color: #2e7d32;
          font-weight: 500;
        }

        .participant-card.current-user {
          border: 3px solid #4ECDC4;
          background: linear-gradient(135deg, #f0fdfc 0%, #ffffff 100%);
          position: relative;
        }

        .participant-card.current-user::before {
          content: 'You';
          position: absolute;
          top: -10px;
          right: 15px;
          background: #4ECDC4;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0 0 12px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          color: white;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #ffffffff;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.9;
          color: #ffffff;
        }

        .leaderboard-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }

        .participant-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .participant-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
        }

        .first-place {
          border: 3px solid #FFD700;
          background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
        }

        .second-place {
          border: 3px solid #C0C0C0;
          background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%);
        }

        .third-place {
          border: 3px solid #CD7F32;
          background: linear-gradient(135deg, #fdf6f0 0%, #ffffff 100%);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #f0f0f0;
        }

        .participant-info {
          flex: 1;
        }

        .participant-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .level-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          display: inline-block;
        }

        .rank-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rank-icon {
          width: 2rem;
          height: 2rem;
        }

        .rank-icon.gold {
          color: #FFD700;
        }

        .rank-icon.silver {
          color: #C0C0C0;
        }

        .rank-icon.bronze {
          color: #CD7F32;
        }

        .rank-number {
          font-size: 1.2rem;
          font-weight: bold;
          color: #666;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .stat-box {
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.2rem;
        }

        .stat-name {
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .specializations {
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .spec-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .spec-tag {
          background: #e3f2fd;
          color: #1565c0;
          padding: 0.3rem 0.8rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .recent-hackathons {
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }

        .hackathon-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .hackathon-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .hackathon-name {
          font-weight: 500;
          color: #333;
        }

        .hackathon-result {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rank-badge {
          background: #4caf50;
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .rank-badge.first {
          background: #ffd700;
          color: #333;
        }

        .rank-badge.second {
          background: #c0c0c0;
          color: #333;
        }

        .rank-badge.third {
          background: #cd7f32;
          color: white;
        }

        .score-badge {
          background: #2196f3;
          color: white;
          padding: 0.2rem 0.5rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .leaderboard-container {
            padding: 1rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .leaderboard-grid {
            grid-template-columns: 1fr;
          }

          .sort-tabs {
            justify-content: center;
          }

          .sort-tab {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="header">
        <h1> Participant Leaderboard</h1>
        <p>Rankings based on hackathon participation and performance</p>
      </div>

      {currentUser && (
        <div className="my-rank-section">
          <div className="my-rank-header">
            <div className="my-rank-title">Your Performance</div>
            <div className="my-rank-subtitle">Here's how you're doing on the leaderboard</div>
          </div>
          
          <div className="my-rank-card">
            <div className="current-user-badge">Your Rank</div>
            <div className="card-header">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="avatar"
              />
              <div className="participant-info">
                <div className="participant-name">{currentUser.name}</div>
                <div 
                  className="level-badge"
                  style={{ backgroundColor: getLevelColor(currentUser.level) }}
                >
                  {currentUser.level}
                </div>
              </div>
              <div className="rank-container">
                {getRankIcon(currentUser.rank)}
              </div>
            </div>

            <div className="my-rank-grid">
              <div className="my-rank-stat">
                <div className="my-rank-value">#{currentUser.rank}</div>
                <div className="my-rank-label">Current Rank</div>
              </div>
              <div className="my-rank-stat">
                <div className="my-rank-value">{currentUser.hackathonsParticipated}</div>
                <div className="my-rank-label">Hackathons</div>
              </div>
              <div className="my-rank-stat">
                <div className="my-rank-value">{currentUser.averageScore.toFixed(1)}</div>
                <div className="my-rank-label">Avg Score</div>
              </div>
              <div className="my-rank-stat">
                <div className="my-rank-value">{currentUser.wins}</div>
                <div className="my-rank-label">Wins</div>
              </div>
              <div className="my-rank-stat">
                <div className="my-rank-value">{currentUser.topThreeFinishes}</div>
                <div className="my-rank-label">Top 3</div>
              </div>
            </div>

            {currentUser.rank > 1 && (
              <div className="rank-improvement">
                <Target size={16} />
                {currentUser.rank <= 3 ? 
                  `You're in the top 3! Keep it up!` : 
                  `${sortedParticipants[currentUser.rank - 2].hackathonsParticipated - currentUser.hackathonsParticipated + 1} more hackathon${sortedParticipants[currentUser.rank - 2].hackathonsParticipated - currentUser.hackathonsParticipated + 1 === 1 ? '' : 's'} to move up to rank #${currentUser.rank - 1}`
                }
              </div>
            )}
            {currentUser.rank === 1 && (
              <div className="rank-improvement">
                <Trophy size={16} />
                Congratulations! You're currently #1 on the leaderboard!
              </div>
            )}
          </div>
        </div>
      )}

      <div className="stats-overview">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{participants.length}</div>
            <div className="stat-label">Active Participants</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{participants.reduce((sum, p) => sum + p.hackathonsParticipated, 0)}</div>
            <div className="stat-label">Total Participations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{Math.round(participants.reduce((sum, p) => sum + p.averageScore, 0) / participants.length)}</div>
            <div className="stat-label">Platform Average</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{participants.reduce((sum, p) => sum + p.wins, 0)}</div>
            <div className="stat-label">Total Wins</div>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="sort-tabs">
          {sortOptions.map(option => (
            <button
              key={option.id}
              className={`sort-tab ${sortBy === option.id ? 'active' : ''}`}
              onClick={() => setSortBy(option.id)}
            >
              <option.icon size={18} />
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div className="leaderboard-grid">
        {sortedParticipants.map((participant) => (
          <div 
            key={participant.id} 
            className={`${getRankClass(participant.rank)} ${participant.id === currentUserId ? 'current-user' : ''}`}
          >
            <div className="card-header">
              <img 
                src={participant.avatar} 
                alt={participant.name}
                className="avatar"
              />
              <div className="participant-info">
                <div className="participant-name">{participant.name}</div>
                <div 
                  className="level-badge"
                  style={{ backgroundColor: getLevelColor(participant.level) }}
                >
                  {participant.level}
                </div>
              </div>
              <div className="rank-container">
                {getRankIcon(participant.rank)}
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-value">{participant.hackathonsParticipated}</div>
                <div className="stat-name">Hackathons</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{participant.averageScore.toFixed(1)}</div>
                <div className="stat-name">Avg Score</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{participant.wins}</div>
                <div className="stat-name">Wins</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{participant.topThreeFinishes}</div>
                <div className="stat-name">Top 3</div>
              </div>
            </div>

            <div className="specializations">
              <div className="section-title">Specializations</div>
              <div className="spec-tags">
                {participant.specializations.map((spec, index) => (
                  <span key={index} className="spec-tag">{spec}</span>
                ))}
              </div>
            </div>

            <div className="recent-hackathons">
              <div className="section-title">Recent Hackathons</div>
              <div className="hackathon-list">
                {participant.recentHackathons.map((hackathon, index) => (
                  <div key={index} className="hackathon-item">
                    <span className="hackathon-name">{hackathon.name}</span>
                    <div className="hackathon-result">
                      <span 
                        className={`rank-badge ${
                          hackathon.rank === 1 ? 'first' : 
                          hackathon.rank === 2 ? 'second' : 
                          hackathon.rank === 3 ? 'third' : ''
                        }`}
                      >
                        #{hackathon.rank}
                      </span>
                      <span className="score-badge">{hackathon.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;