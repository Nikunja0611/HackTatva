import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users, Trophy, Edit3, Eye, MoreVertical, Search, Filter, ArrowLeft, Save, Send } from 'lucide-react';
import './eventmanagement.css';

const EventManagement = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create' or 'edit'
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "AI Innovation Challenge 2025",
      status: "ongoing",
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      participants: 250,
      teams: 63,
      submissions: 45,
      description: "Build innovative AI solutions for real-world problems",
      maxTeamSize: 4,
      prizes: ["$5000", "$3000", "$2000"],
      category: "AI/ML"
    },
    {
      id: 2,
      name: "Web3 Developer Summit",
      status: "upcoming",
      startDate: "2025-02-10",
      endDate: "2025-02-12",
      participants: 180,
      teams: 0,
      submissions: 0,
      description: "Decentralized applications and blockchain innovation",
      maxTeamSize: 3,
      prizes: ["$4000", "$2500", "$1500"],
      category: "Blockchain"
    },
    {
      id: 3,
      name: "Mobile App Hackathon",
      status: "completed",
      startDate: "2024-12-01",
      endDate: "2024-12-03",
      participants: 320,
      teams: 80,
      submissions: 72,
      description: "Create mobile applications that solve everyday problems",
      maxTeamSize: 4,
      prizes: ["$6000", "$4000", "$2000"],
      category: "Mobile"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    maxTeamSize: 4,
    prizes: ['', '', ''],
    rules: ''
  });

  const [cardsVisible, setCardsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [formAnimated, setFormAnimated] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [pulsingStats, setPulsingStats] = useState({});

  useEffect(() => {
    // Stagger animations for different views
    if (currentView === 'list') {
      const headerTimer = setTimeout(() => setHeaderVisible(true), 100);
      const searchTimer = setTimeout(() => setSearchVisible(true), 200);
      const cardsTimer = setTimeout(() => setCardsVisible(true), 300);
      
      return () => {
        clearTimeout(headerTimer);
        clearTimeout(searchTimer);
        clearTimeout(cardsTimer);
      };
    } else {
      const formTimer = setTimeout(() => setFormAnimated(true), 200);
      return () => clearTimeout(formTimer);
    }
  }, [currentView]);

  // Animate stats counters
  useEffect(() => {
    const interval = setInterval(() => {
      const eventIds = events.map(e => e.id);
      const randomId = eventIds[Math.floor(Math.random() * eventIds.length)];
      setPulsingStats(prev => ({ ...prev, [randomId]: Date.now() }));
      
      setTimeout(() => {
        setPulsingStats(prev => {
          const { [randomId]: removed, ...rest } = prev;
          return rest;
        });
      }, 1000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [events]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'em-status-ongoing';
      case 'upcoming': return 'em-status-upcoming';
      case 'completed': return 'em-status-completed';
      default: return 'em-status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ongoing': return '🔴';
      case 'upcoming': return '⏰';
      case 'completed': return '✅';
      default: return '📅';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateEvent = () => {
    setCurrentView('create');
    setEditingEvent(null);
    setCardsVisible(false);
    setHeaderVisible(false);
    setSearchVisible(false);
    setFormAnimated(false);
    setFormData({
      name: '',
      description: '',
      category: '',
      startDate: '',
      endDate: '',
      maxTeamSize: 4,
      prizes: ['', '', ''],
      rules: ''
    });
  };

  const handleEditEvent = (event) => {
    setCurrentView('edit');
    setEditingEvent(event);
    setCardsVisible(false);
    setHeaderVisible(false);
    setSearchVisible(false);
    setFormAnimated(false);
    setFormData({
      name: event.name,
      description: event.description,
      category: event.category,
      startDate: event.startDate,
      endDate: event.endDate,
      maxTeamSize: event.maxTeamSize,
      prizes: event.prizes,
      rules: event.rules || ''
    });
  };

  const handleSaveEvent = (isDraft = true) => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData, status: isDraft ? event.status : 'upcoming' }
          : event
      ));
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData,
        status: isDraft ? 'upcoming' : 'upcoming',
        participants: 0,
        teams: 0,
        submissions: 0
      };
      setEvents([...events, newEvent]);
    }
    
    setCurrentView('list');
    setCardsVisible(false);
    setHeaderVisible(false);
    setSearchVisible(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('prizes')) {
      const index = parseInt(field.split('[')[1].split(']')[0]);
      const newPrizes = [...formData.prizes];
      newPrizes[index] = value;
      setFormData({ ...formData, prizes: newPrizes });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleCardHover = (eventId) => {
    setActiveCard(eventId);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <div className="em-container">
        {/* Animated Header */}
        <div className={`em-form-header ${formAnimated ? 'em-visible' : ''}`}>
          <div className="em-header-content">
            <div className="em-header-left">
              <button
                onClick={() => setCurrentView('list')}
                className="em-back-button"
              >
                <ArrowLeft className="em-back-icon" />
                <span className="em-back-text">
                  Back to Events
                  <span className="em-back-underline"></span>
                </span>
              </button>
            </div>
            <h1 className="em-form-title">
              {currentView === 'create' ? 'Create New Event' : 'Edit Event'}
            </h1>
            <div className="em-header-actions">
              <button
                onClick={() => handleSaveEvent(true)}
                className="em-save-draft-btn"
              >
                <Save className="em-save-icon" />
                Save Draft
              </button>
              <button
                onClick={() => handleSaveEvent(false)}
                className="em-publish-btn"
              >
                <div className="em-publish-bg"></div>
                <Send className="em-publish-icon" />
                <span className="em-publish-text">Publish</span>
              </button>
            </div>
          </div>
        </div>

        {/* Animated Form */}
        <div className="em-form-wrapper">
          <div className={`em-form-card ${formAnimated ? 'em-visible' : ''}`}>
            <div className="em-form-content">
              {/* Basic Information */}
              <div className={`em-form-section em-basic-info ${formAnimated ? 'em-visible' : ''}`}>
                <h2 className="em-section-title">
                  Basic Information
                </h2>
                
                <div className="em-form-grid">
                  <div className="em-form-group em-full-width">
                    <label className="em-form-label">
                      Event Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="em-form-input"
                      placeholder="Enter event name"
                    />
                  </div>
                  
                  <div className="em-form-group">
                    <label className="em-form-label">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="em-form-select"
                    >
                      <option value="">Select category</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Blockchain">Blockchain</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Web">Web Development</option>
                      <option value="IoT">IoT</option>
                      <option value="Gaming">Gaming</option>
                    </select>
                  </div>
                  
                  <div className="em-form-group">
                    <label className="em-form-label">
                      Max Team Size
                    </label>
                    <input
                      type="number"
                      value={formData.maxTeamSize}
                      onChange={(e) => handleInputChange('maxTeamSize', parseInt(e.target.value))}
                      className="em-form-input"
                      min="1"
                      max="10"
                    />
                  </div>
                  
                  <div className="em-form-group">
                    <label className="em-form-label">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="em-form-input"
                    />
                  </div>
                  
                  <div className="em-form-group">
                    <label className="em-form-label">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="em-form-input"
                    />
                  </div>
                </div>
                
                <div className="em-form-group">
                  <label className="em-form-label">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="em-form-textarea"
                    placeholder="Describe your hackathon event..."
                  />
                </div>
              </div>

              {/* Prizes */}
              <div className={`em-form-section em-prizes ${formAnimated ? 'em-visible' : ''}`}>
                <h2 className="em-section-title">
                  Prizes
                </h2>
                
                <div className="em-prizes-grid">
                  {['1st Prize', '2nd Prize', '3rd Prize'].map((label, index) => (
                    <div key={index} className="em-form-group">
                      <label className="em-form-label">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={formData.prizes[index]}
                        onChange={(e) => handleInputChange(`prizes[${index}]`, e.target.value)}
                        className="em-form-input"
                        placeholder={`$${5000 - (index * 1000)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className={`em-form-section em-rules ${formAnimated ? 'em-visible' : ''}`}>
                <h2 className="em-section-title">
                  Rules & Guidelines
                </h2>
                
                <div className="em-form-group">
                  <textarea
                    value={formData.rules}
                    onChange={(e) => handleInputChange('rules', e.target.value)}
                    rows={6}
                    className="em-form-textarea"
                    placeholder="Enter event rules and guidelines..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="em-container">
      {/* Animated Header */}
      <div className={`em-main-header ${headerVisible ? 'em-visible' : ''}`}>
        <div className="em-header-content">
          <div className="em-header-left">
            <h1 className="em-main-title">
              Event Management
            </h1>
            <div className="em-pulse-dot"></div>
          </div>
          <button
            onClick={handleCreateEvent}
            className="em-create-button"
          >
            <div className="em-create-bg"></div>
            <Plus className="em-create-icon" />
            <span className="em-create-text">Create Event</span>
            <div className="em-shine-effect"></div>
          </button>
        </div>
      </div>

      {/* Animated Search and Filters */}
      <div className="em-search-container">
        <div className={`em-search-filters ${searchVisible ? 'em-visible' : ''}`}>
          <div className="em-search-wrapper">
            <Search className="em-search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="em-search-input"
            />
            <div className="em-search-glow"></div>
          </div>
          <div className="em-filter-wrapper">
            <Filter className="em-filter-icon" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="em-filter-select"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Animated Events Grid */}
        <div className="em-events-grid">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`em-event-card ${cardsVisible ? 'em-visible' : ''} ${activeCard === event.id ? 'em-active' : ''}`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
              onMouseEnter={() => handleCardHover(event.id)}
              onMouseLeave={handleCardLeave}
            >
              {/* Card Header with gradient overlay */}
              <div className="em-card-header">
                <div className="em-header-bg"></div>
                <div className="em-header-content-card">
                  <div className="em-card-info">
                    <h3 className="em-card-title">
                      {event.name}
                    </h3>
                    <p className="em-card-description">
                      {event.description}
                    </p>
                  </div>
                  <div className="em-card-menu">
                    <button className="em-menu-button">
                      <MoreVertical className="em-menu-icon" />
                    </button>
                  </div>
                </div>
                
                <div className="em-card-badges">
                  <div className={`em-status-badge ${getStatusColor(event.status)}`}>
                    <span className="em-status-icon">{getStatusIcon(event.status)}</span>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </div>
                  <span className="em-category-badge">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Animated Stats */}
              <div className="em-card-stats">
                <div className="em-stats-bg"></div>
                <div className="em-stats-content">
                  <div className="em-stats-grid">
                    {[
                      { icon: Users, value: event.participants, label: 'Participants', color: 'blue' },
                      { icon: Users, value: event.teams, label: 'Teams', color: 'green' },
                      { icon: Trophy, value: event.submissions, label: 'Submissions', color: 'purple' }
                    ].map((stat, statIndex) => (
                      <div key={statIndex} className="em-stat-item">
                        <div className={`em-stat-icon em-stat-${stat.color} ${
                          pulsingStats[event.id] && statIndex === 0 ? 'em-bouncing' : ''
                        }`}>
                          <stat.icon className="em-stat-icon-svg" />
                        </div>
                        <div className={`em-stat-value ${
                          pulsingStats[event.id] && statIndex === 0 ? 'em-pulsing' : ''
                        }`}>
                          {stat.value}
                        </div>
                        <div className="em-stat-label">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dates with calendar animation */}
                  <div className="em-card-dates">
                    <Calendar className="em-calendar-icon" />
                    {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                  </div>

                  {/* Animated Action Buttons */}
                  <div className="em-card-actions">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="em-action-button em-edit-button"
                    >
                      <Edit3 className="em-action-icon" />
                      <span className="em-action-text">
                        Edit
                        <span className="em-action-underline"></span>
                      </span>
                    </button>
                    <button className="em-action-button em-view-button">
                      <Eye className="em-action-icon" />
                      <span className="em-action-text">
                        View
                        <span className="em-action-underline"></span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="em-particle em-particle-1"></div>
                <div className="em-particle em-particle-2"></div>
                <div className="em-particle em-particle-3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Empty State */}
        {filteredEvents.length === 0 && (
          <div className={`em-empty-state ${cardsVisible ? 'em-visible' : ''}`}>
            <div className="em-empty-icon-wrapper">
              <div className="em-empty-icon">
                <Calendar className="em-empty-calendar" />
              </div>
              {/* Floating rings around empty state */}
              <div className="em-empty-ring em-ring-1"></div>
              <div className="em-empty-ring em-ring-2"></div>
            </div>
            
            <h3 className="em-empty-title">No events found</h3>
            <p className="em-empty-description">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first hackathon event'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={handleCreateEvent}
                className="em-empty-create-button"
              >
                <div className="em-empty-create-bg"></div>
                <Plus className="em-empty-create-icon" />
                <span className="em-empty-create-text">Create Your First Event</span>
                <div className="em-empty-create-shine"></div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;