import React, { useState, useEffect } from 'react';
import { Plus, Send, Edit3, Trash2, Users, Clock, Bell, Search, Filter, MoreVertical, Eye, Calendar, MessageCircle, X, Check, AlertCircle } from 'lucide-react';
import './announcements.css';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome to HackSphere 2024!",
      content: "Get ready for an amazing 48-hour hackathon experience. Check your team assignments and project guidelines.",
      timestamp: "2 hours ago",
      views: 234,
      replies: 12,
      priority: "high",
      status: "published",
      attachments: ["guidelines.pdf"],
      notificationSent: true
    },
    {
      id: 2,
      title: "Submission Deadline Extended",
      content: "Due to popular request, we're extending the submission deadline by 2 hours. New deadline: March 15th, 11:59 PM.",
      timestamp: "5 hours ago",
      views: 189,
      replies: 8,
      priority: "urgent",
      status: "published",
      attachments: [],
      notificationSent: true
    },
    {
      id: 3,
      title: "Workshop: AI/ML Track",
      content: "Join us for an exclusive workshop on implementing AI/ML solutions. Limited seats available!",
      timestamp: "1 day ago",
      views: 156,
      replies: 23,
      priority: "medium",
      status: "published",
      attachments: ["workshop-details.pdf", "requirements.txt"],
      notificationSent: false
    },
    {
      id: 4,
      title: "Mentorship Sessions Available",
      content: "Book one-on-one sessions with industry experts. Sessions are filling up fast!",
      timestamp: "2 days ago",
      views: 98,
      replies: 5,
      priority: "low",
      status: "draft",
      attachments: [],
      notificationSent: false
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [animateItems, setAnimateItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [pulsingStats, setPulsingStats] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium',
    notificationSent: false
  });

  useEffect(() => {
    const timer = setTimeout(() => setAnimateItems(true), 100);
    const pulseTimer = setInterval(() => {
      setPulsingStats(true);
      setTimeout(() => setPulsingStats(false), 1000);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateAnnouncement = async () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const announcement = {
        id: announcements.length + 1,
        ...newAnnouncement,
        timestamp: "Just now",
        views: 0,
        replies: 0,
        status: "published",
        attachments: []
      };
      
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', priority: 'medium', notificationSent: false });
      setIsLoading(false);
      
      // Close modal with animation
      setModalClosing(true);
      setTimeout(() => {
        setShowCreateModal(false);
        setModalClosing(false);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      }, 300);
    }
  };

  const closeModal = () => {
    setModalClosing(true);
    setTimeout(() => {
      setShowCreateModal(false);
      setModalClosing(false);
    }, 300);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'an-priority-urgent';
      case 'high': return 'an-priority-high';
      case 'medium': return 'an-priority-medium';
      case 'low': return 'an-priority-low';
      default: return 'an-priority-default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'published' ? 'an-status-published' : 'an-status-draft';
  };

  return (
    <div className="an-container">
      {/* Animated Background Elements */}
      <div className="an-background">
        <div className="an-bg-element an-bg-element-1"></div>
        <div className="an-bg-element an-bg-element-2"></div>
        <div className="an-bg-element an-bg-element-3"></div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="an-toast">
          <div className="an-toast-content">
            <div className="an-toast-icon">
              <Check className="an-toast-check" />
            </div>
            <div>
              <p className="an-toast-title">Announcement Created!</p>
              <p className="an-toast-message">Your announcement has been published successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="an-header">
        <div className="an-header-content">
          <div className="an-header-left">
            <div className={`an-header-text ${animateItems ? 'an-animate-in' : 'an-animate-out'}`}>
              <h1 className="an-title">Announcements</h1>
              <p className="an-subtitle">Manage event communications and updates</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className={`an-create-btn ${animateItems ? 'an-animate-in an-delay-200' : 'an-animate-out'}`}
          >
            <div className="an-create-btn-overlay"></div>
            <Plus className="an-create-btn-icon" />
            <span className="an-create-btn-text">Create Announcement</span>
          </button>
        </div>
      </div>

      <div className="an-main-content">
        {/* Stats Cards */}
        <div className="an-stats-grid">
          {[
            { label: 'Total Announcements', value: announcements.length, icon: Bell, className: 'an-stat-blue' },
            { label: 'Published', value: announcements.filter(a => a.status === 'published').length, icon: Eye, className: 'an-stat-green' },
            { label: 'Total Views', value: announcements.reduce((sum, a) => sum + a.views, 0), icon: Users, className: 'an-stat-purple' },
            { label: 'Total Replies', value: announcements.reduce((sum, a) => sum + a.replies, 0), icon: MessageCircle, className: 'an-stat-orange' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`an-stat-card ${stat.className} ${
                animateItems ? 'an-animate-in' : 'an-animate-out'
              } ${pulsingStats ? 'an-stat-pulse' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="an-stat-header">
                <div className="an-stat-icon-wrapper">
                  <stat.icon className="an-stat-icon" />
                </div>
                <div className="an-stat-value">{stat.value}</div>
              </div>
              <p className="an-stat-label">{stat.label}</p>
              <div className="an-stat-progress"></div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className={`an-search-section ${animateItems ? 'an-animate-in an-delay-400' : 'an-animate-out'}`}>
          <div className="an-search-content">
            <div className="an-search-input-wrapper">
              <Search className="an-search-icon" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="an-search-input"
              />
              <div className="an-search-overlay"></div>
            </div>
            <div className="an-filter-section">
              <div className="an-filter-wrapper">
                <Filter className="an-filter-icon" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="an-filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="an-announcements-list">
          {filteredAnnouncements.map((announcement, index) => (
            <div
              key={announcement.id}
              onMouseEnter={() => setHoveredCard(announcement.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`an-announcement-card ${
                animateItems ? 'an-animate-in' : 'an-animate-out'
              } ${hoveredCard === announcement.id ? 'an-card-hovered' : ''}`}
              style={{ animationDelay: `${(index + 5) * 100}ms` }}
            >
              {/* Hover Gradient Overlay */}
              <div className="an-card-overlay"></div>
              
              <div className="an-card-header">
                <div className="an-card-info">
                  <div className={`an-priority-indicator ${getPriorityColor(announcement.priority)} ${
                    announcement.priority === 'urgent' ? 'an-priority-urgent-pulse' : ''
                  }`}></div>
                  <div>
                    <h3 className="an-card-title">{announcement.title}</h3>
                    <div className="an-card-meta">
                      <div className="an-timestamp">
                        <Clock className="an-timestamp-icon" />
                        {announcement.timestamp}
                      </div>
                      <div className={`an-status-badge ${getStatusColor(announcement.status)}`}>
                        {announcement.status}
                      </div>
                      <div className="an-priority-badge">
                        <span className={`an-priority-text ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="an-card-actions">
                  <button className="an-action-btn an-edit-btn">
                    <Edit3 className="an-action-icon" />
                  </button>
                  <button className="an-action-btn an-delete-btn">
                    <Trash2 className="an-action-icon" />
                  </button>
                  <button className="an-action-btn an-more-btn">
                    <MoreVertical className="an-action-icon" />
                  </button>
                </div>
              </div>

              <p className="an-card-content">{announcement.content}</p>

              {announcement.attachments.length > 0 && (
                <div className="an-attachments">
                  <div className="an-attachments-list">
                    {announcement.attachments.map((attachment, i) => (
                      <div key={i} className="an-attachment">
                        📎 {attachment}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="an-card-footer">
                <div className="an-stats">
                  <div className="an-stat-item an-views">
                    <Eye className="an-stat-item-icon" />
                    {announcement.views} views
                  </div>
                  <div className="an-stat-item an-replies">
                    <MessageCircle className="an-stat-item-icon" />
                    {announcement.replies} replies
                  </div>
                </div>
                <div className="an-notification-status">
                  {announcement.notificationSent && (
                    <div className="an-notification-sent">
                      <Bell className="an-notification-icon" />
                      Notification sent
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar animation on hover */}
              <div className={`an-progress-bar ${hoveredCard === announcement.id ? 'an-progress-active' : ''}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="an-modal-backdrop">
          <div className={`an-modal ${modalClosing ? 'an-modal-closing' : ''}`}>
            <div className="an-modal-content">
              <div className="an-modal-header">
                <h2 className="an-modal-title">Create New Announcement</h2>
                <button onClick={closeModal} className="an-modal-close">
                  <X className="an-modal-close-icon" />
                </button>
              </div>

              <div className="an-form">
                <div className="an-form-group">
                  <label className="an-form-label">Title</label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    className="an-form-input"
                    placeholder="Enter announcement title..."
                  />
                </div>

                <div className="an-form-group">
                  <label className="an-form-label">Content</label>
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    rows="6"
                    className="an-form-textarea"
                    placeholder="Write your announcement content..."
                  ></textarea>
                </div>

                <div className="an-form-group">
                  <label className="an-form-label">Priority</label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                    className="an-form-select"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="an-checkbox-group">
                  <input
                    type="checkbox"
                    id="notification"
                    checked={newAnnouncement.notificationSent}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, notificationSent: e.target.checked})}
                    className="an-checkbox"
                  />
                  <label htmlFor="notification" className="an-checkbox-label">
                    Send push notification to all participants
                  </label>
                </div>
              </div>

              <div className="an-modal-actions">
                <button
                  onClick={closeModal}
                  disabled={isLoading}
                  className="an-cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAnnouncement}
                  disabled={isLoading || !newAnnouncement.title || !newAnnouncement.content}
                  className="an-submit-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="an-loading-spinner"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Send className="an-submit-icon" />
                      Publish Announcement
                    </>
                  )}
                  <div className="an-submit-overlay"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;