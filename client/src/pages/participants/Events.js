import React, { useState, useEffect } from 'react';
import './Events.css';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(true);

  // Mock data for events
  const [events] = useState([
    {
      id: 1,
      title: 'Global AI Innovation Challenge 2025',
      description: 'Join the world\'s largest AI innovation challenge',
      date: 'Aug 30, 2025 - Aug 31, 2025',
      location: 'San Francisco & Online',
      participants: '1,247 participants',
      prizePool: '$50,000 prize pool',
      tags: ['AI & Machine Learning', 'Online', 'This Week', 'High Prize Pool', 'Beginner Friendly'],
      status: 'Open',
      image: '/images/Global_AI.webp',
      daysLeft: '5 days left',
      registrationEnd: 'Advanced'
    },
    {
      id: 2,
      title: 'Blockchain for Good Competition',
      description: 'Build blockchain solutions for social impact',
      date: 'Sep 5, 2025 - Sep 7, 2025',
      location: 'Virtual',
      participants: '892 participants',
      prizePool: '$25,000 prize pool',
      tags: ['Blockchain', 'Online', 'Free Entry', 'Beginner Friendly'],
      status: 'Open',
      image: '/images/blockchain.jpg',
      daysLeft: '10 days left',
      registrationEnd: 'Advanced'
    },
    {
      id: 3,
      title: 'Mobile App Development Bootcamp',
      description: 'Create the next big mobile application',
      date: 'Aug 28, 2025 - Sep 1, 2025',
      location: 'New York & Online',
      participants: '456 participants',
      prizePool: '$15,000 prize pool',
      tags: ['AI & ML', 'Online', 'Beginner Friendly'],
      status: 'Closing Soon',
      image: '/images/mobile_app.webp',
      daysLeft: '2 days left',
      registrationEnd: 'Advanced'
    },
    {
      id: 4,
      title: 'FinTech Innovation Summit',
      description: 'Revolutionize financial technology',
      date: 'Sep 15, 2025 - Sep 17, 2025',
      location: 'London & Online',
      participants: '1,156 participants',
      prizePool: '$75,000 prize pool',
      tags: ['FinTech', 'High Prize Pool', 'Online'],
      status: 'Open',
      image: '/images/fintech.jpg',
      daysLeft: '20 days left',
      registrationEnd: 'Advanced'
    },
    {
      id: 5,
      title: 'Sustainability Tech Challenge',
      description: 'Build technology for a sustainable future',
      date: 'Sep 20, 2025 - Sep 22, 2025',
      location: 'Berlin',
      participants: '734 participants',
      prizePool: '$30,000 prize pool',
      tags: ['Sustainability', 'Green Energy', 'Free Entry'],
      status: 'Open',
      image: '/images/sustainability.webp',
      daysLeft: '25 days left',
      registrationEnd: 'Advanced'
    },
    {
      id: 6,
      title: 'Healthcare Innovation Bootcamp',
      description: 'Transform healthcare with technology',
      date: 'Oct 1, 2025 - Oct 3, 2025',
      location: 'Boston & Online',
      participants: '612 participants',
      prizePool: '$40,000 prize pool',
      tags: ['Healthcare', 'Medical Devices', 'Online'],
      status: 'Open',
      image: '/images/healthcare.webp',
      daysLeft: '35 days left',
      registrationEnd: 'Advanced'
    }
  ]);

  const filterOptions = {
    'Online': 67,
    'This Week': 12,
    'Free Entry': 45,
    'AI & ML': 28,
    'Blockchain': 19,
    'Beginner Friendly': 34,
    'High Prize Pool': 15,
    'Closing Soon': 8
  };

  const popularCombinations = [
    'Online + AI & ML + This Week',
    'Beginner Friendly + Free Entry',
    'High Prize Pool + Blockchain'
  ];

  const handleFilterToggle = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleQuickFilterClick = (filter) => {
    handleFilterToggle(filter);
  };

  const filteredEvents = events.filter(event => {
    // Search filter
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Tag filters
    if (selectedFilters.length > 0) {
      return selectedFilters.every(filter => event.tags.includes(filter));
    }
    
    return true;
  });

  const handleSubmitProject = () => {
    alert('Submit Project clicked!');
  };

  const handleViewTeam = () => {
    alert('View Team clicked!');
  };

  const handleRegister = (eventId) => {
    alert(`Registering for event ${eventId}`);
  };

  const handleViewDetails = (eventId) => {
    alert(`Viewing details for event ${eventId}`);
  };

  return (
    <div className="event-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">HackTatva</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link">Discover Events</a>
            <a href="/dashboard" className="nav-link">My Dashboard</a>
            <a href="/submit-project" className="nav-link">Submit Project</a>
            <a href="leaderboard" className="nav-link">Live Leaderboard</a>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="Search events..." />
          </div>
          <div className="user-menu">
            <div className="notifications">🔔 <span className="badge">3</span></div>
            <div className="user-info">
            
             
              <div className="avatar">A</div>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Event Header */}
        <div className="event-header">
          <div className="event-info">
            <div className="status-badge active">Active</div>
            <h1>Global Innovation Hackathon 2025</h1>
            <div className="countdown">⏰ 2d 5h 49m</div>
            <div className="event-details">
              <span> Aug 17-20, 2025</span>
              <span> Virtual & San Francisco</span>
              <span> 1,247 participants</span>
            </div>
            <div className="deadline-bar">
              <div className="deadline-label">Submission Deadline</div>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <div className="time-remaining">2d 5h 49m</div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleSubmitProject}>
               Submit Project
            </button>
            <button className="btn btn-secondary" onClick={handleViewTeam}>
               View Team
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search hackathons, themes, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="main-search"
            />
            <button className="search-btn"> Search</button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="quick-filters">
          <h3> Quick Filters</h3>
          <div className="filter-tags">
            {Object.entries(filterOptions).map(([filter, count]) => (
              <button
                key={filter}
                className={`filter-tag ${selectedFilters.includes(filter) ? 'active' : ''}`}
                onClick={() => handleQuickFilterClick(filter)}
              >
                {filter === 'Online' && '🌐'} {filter} {count}
              </button>
            ))}
          </div>
          
          <div className="popular-combinations">
            <h4>Popular Combinations</h4>
            <div className="combination-tags">
              {popularCombinations.map((combo, index) => (
                <span key={index} className="combination-tag">{combo}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3> Filters</h3>
            </div>
            
            <div className="filter-section">
              <h4>Date Range</h4>
              <div className="date-inputs">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </div>

            <div className="filter-section">
              <h4>Event Type</h4>
              <div className="checkbox-group">
                {['Hackathon', 'Competition', 'Bootcamp', 'Conference', 'Workshop'].map(type => (
                  <label key={type} className="checkbox-label">
                    <input type="checkbox" />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Location</h4>
              <div className="checkbox-group">
                {['Virtual', 'Hybrid', 'Boston', 'London', 'Tokyo'].map(location => (
                  <label key={location} className="checkbox-label">
                    <input type="checkbox" />
                    <span>{location}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Skill Level</h4>
              <div className="checkbox-group">
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                  <label key={level} className="checkbox-label">
                    <input type="checkbox" />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Events Grid */}
          <div className="events-section">
            <div className="events-header">
              <div className="results-info">
                <span>🔍 {filteredEvents.length} events found</span>
              </div>
              <div className="view-controls">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option>Most Relevant</option>
                  <option>Newest</option>
                  <option>Deadline</option>
                  <option>Prize Pool</option>
                </select>
                <div className="view-toggle">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    ⊞ Grid
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    ☰ List
                  </button>
                </div>
                <button className="refresh-btn">🔄 Refresh</button>
              </div>
            </div>

            <div className={`events-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="card-header">
                    <div className={`status-badge ${event.status.toLowerCase().replace(' ', '-')}`}>
                      {event.status}
                    </div>
                    <button className="bookmark-btn">🔖</button>
                  </div>
                  <div className="card-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{event.title}</h3>
                    <p className="card-description">{event.description}</p>
                    <div className="card-details">
                      <div className="detail-item">📅 {event.date}</div>
                      <div className="detail-item">📍 {event.location}</div>
                      <div className="detail-item">👥 {event.participants}</div>
                      <div className="detail-item">💰 {event.prizePool}</div>
                    </div>
                    <div className="card-tags">
                      {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <div className="time-info">
                        <span className="days-left">{event.daysLeft}</span>
                        <span className="registration-end">{event.registrationEnd}</span>
                      </div>
                      <div className="card-actions">
                        <button 
                          className="btn btn-outline"
                          onClick={() => handleViewDetails(event.id)}
                        >
                          View Details
                        </button>
                        <button 
                          className="btn btn-primary"
                          onClick={() => handleRegister(event.id)}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;