import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Calendar,
  Trophy,
  BarChart3,
  MessageSquare,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Rocket,
  Shield,
  Bell,
  User,
  Settings,
  FileText,
  Megaphone,
  Award,
  Menu,
  X,
  LogOut,
  Eye,
  ChevronDown,
  Home
} from 'lucide-react';
import './dashboardorg.css';

const OrganizerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [animateStats, setAnimateStats] = useState(false);

  // Dashboard data
  const dashboardStats = [
    {
      title: "Ongoing Events",
      value: "4",
      change: "+2",
      icon: <Calendar className="org-icon" />,
      color: "org-stat-blue",
      action: "View All"
    },
    {
      title: "Pending Submissions",
      value: "23",
      change: "+8",
      icon: <FileText className="org-icon" />,
      color: "org-stat-orange",
      action: "Review Now"
    },
    {
      title: "Participants Registered",
      value: "1,247",
      change: "+156",
      icon: <Users className="org-icon" />,
      color: "org-stat-green",
      action: "View"
    },
    {
      title: "Top Teams",
      value: "12",
      change: "+3",
      icon: <Trophy className="org-icon" />,
      color: "org-stat-purple",
      action: "View Leaderboard"
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="org-nav-icon" />, active: true },
    { id: 'events', label: 'Events', icon: <Calendar className="org-nav-icon" />, route: '/organiser/event-management' },
    { id: 'participants', label: 'Participants', icon: <Users className="org-nav-icon" />, route: '/organiser/participantteams' },
    { id: 'submissions', label: 'Submissions', icon: <FileText className="org-nav-icon" />, route: '/organiser/submissions' },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="org-nav-icon" /> , route: '/organiser/announcements'},
    { id: 'leaderboard', label: 'Leaderboard', icon: <Award className="org-nav-icon" /> , route: '/organiser/leaderboard'},
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="org-nav-icon" />, route: '/organiser/analytics-certificates' },
    { id: 'settings', label: 'Settings', icon: <Settings className="org-nav-icon" />, route: '/organiser/settings'  }
  ];

  const quickActions = [
    {
      title: "Create Event",
      icon: <Plus className="org-quick-action-icon" />,
      gradient: "org-quick-action-blue",
      description: "Start a new hackathon",
      onClick: () => handleNavigation('events')
    },
    {
      title: "New Announcement",
      icon: <Megaphone className="org-quick-action-icon" />,
      gradient: "org-quick-action-green",
      description: "Notify participants"
    },
    {
      title: "View Analytics",
      icon: <BarChart3 className="org-quick-action-icon" />,
      gradient: "org-quick-action-orange",
      description: "Check performance"
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Final Submission Deadline Extended",
      content: "Due to popular request, we've extended the final submission deadline by 24 hours.",
      time: "2 hours ago",
      type: "important",
      icon: <AlertCircle className="org-announcement-icon" />
    },
    {
      id: 2,
      title: "Mentor Office Hours Available",
      content: "Industry mentors will be available for consultation during the next 3 hours.",
      time: "5 hours ago",
      type: "info",
      icon: <Users className="org-announcement-icon" />
    },
    {
      id: 3,
      title: "AWS Credits Distribution Complete",
      content: "All registered teams have received their AWS credits via email.",
      time: "1 day ago",
      type: "success",
      icon: <CheckCircle className="org-announcement-icon" />
    }
  ];

  const recentSubmissions = [
    {
      id: 1,
      teamName: "Team Alpha",
      projectName: "AI-Powered Healthcare Assistant",
      submittedAt: "2 min ago",
      status: "pending",
      members: 4
    },
    {
      id: 2,
      teamName: "Code Warriors",
      projectName: "Sustainable Energy Dashboard",
      submittedAt: "15 min ago",
      status: "under-review",
      members: 3
    },
    {
      id: 3,
      teamName: "Tech Innovators",
      projectName: "Smart City Traffic Management",
      submittedAt: "1 hour ago",
      status: "approved",
      members: 5
    }
  ];

  const profileMenuItems = [
    { label: 'View Profile', icon: <User className="org-profile-icon" /> },
    { label: 'Settings', icon: <Settings className="org-profile-icon" /> },
    { label: 'Logout', icon: <LogOut className="org-profile-icon" /> }
  ];

  // Counter animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Animated counter component
  const AnimatedCounter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!animateStats) return;
      const numValue = parseInt(value.replace(/,/g, ''));
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(numValue * progress);
        if (current >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 16);
      return () => clearInterval(timer);
    }, [value, duration, animateStats]);

    return count.toLocaleString();
  };

  const handleNavigation = (pageId) => {
    const navItem = navigationItems.find(item => item.id === pageId);
    
    // If the navigation item has a route, navigate to that route
    if (navItem && navItem.route) {
      window.location.href = navItem.route;
      return;
    }
    
    // For other pages, just update the current page state
    setCurrentPage(pageId);
  };

  const handleProfileToggle = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="org-container">
      {/* Sidebar */}
      <aside className={`org-sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        {/* Sidebar Header */}
        <div className="org-sidebar-header">
          <div className="org-sidebar-header-content">
            {!sidebarCollapsed && (
              <div className="org-brand">
                <div className="org-brand-logo">
                  H
                </div>
                <div className="org-brand-content">
                  <h1 className="org-brand-title">HackTatva</h1>
                  <p className="org-brand-subtitle">Organizer Panel</p>
                </div>
              </div>
            )}
            <button
              onClick={handleSidebarToggle}
              className="org-sidebar-toggle"
            >
              {sidebarCollapsed ? <Menu className="org-toggle-icon" /> : <X className="org-toggle-icon" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="org-nav">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`org-nav-item ${currentPage === item.id ? 'active' : ''}`}
                >
                  {item.icon}
                  {!sidebarCollapsed && (
                    <span className="org-nav-label">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="org-sidebar-footer">
            <div className="org-help-card">
              <div className="org-help-header">
                <Rocket className="org-help-icon" />
                <span className="org-help-title">Need Help?</span>
              </div>
              <p className="org-help-text">Check our documentation for guides and tutorials.</p>
              <button className="org-help-button">
                View Docs
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={`org-main ${sidebarCollapsed ? 'with-collapsed-sidebar' : 'with-sidebar'}`}>
        {/* Top Header */}
        <header className="org-header">
          <div className="org-header-content">
            <div className="org-header-left">
              <div className="org-page-info">
                <h2 className="org-page-title">Dashboard</h2>
                <p className="org-page-subtitle">Welcome back, Admin!</p>
              </div>
            </div>

            <div className="org-header-right">
              {/* Notifications */}
              <button className="org-notification-btn">
                <Bell className="org-notification-icon" />
                <span className="org-notification-badge">3</span>
              </button>

              {/* Profile Dropdown */}
              <div className="org-profile-container">
                <button
                  onClick={handleProfileToggle}
                  className="org-profile-btn"
                >
                  <div className="org-profile-avatar">
                    A
                  </div>
                  <div className="org-profile-info">
                    <p className="org-profile-name">Admin User</p>
                    <p className="org-profile-email">admin@hacktatva.com</p>
                  </div>
                  <ChevronDown className="org-profile-chevron" />
                </button>

                {profileDropdownOpen && (
                  <div className="org-profile-dropdown">
                    {profileMenuItems.map((item, index) => (
                      <button
                        key={index}
                        className="org-profile-dropdown-item"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="org-content">
          {/* Welcome Section & Quick Actions */}
          <div className="org-content-grid org-two-column">
            {/* Welcome Card */}
            <div className="org-welcome-card">
              <div className="org-welcome-content">
                <h3 className="org-welcome-title">Welcome back, Admin! 👋</h3>
                <p className="org-welcome-text">Here's today's overview of your hackathon events</p>
                <div className="org-welcome-actions">
                  <button className="org-btn org-btn-secondary">
                    View Reports
                  </button>
                  <button className="org-btn org-btn-primary">
                    Quick Tour
                  </button>
                </div>
              </div>
              <div className="org-welcome-decoration org-welcome-decoration-1"></div>
              <div className="org-welcome-decoration org-welcome-decoration-2"></div>
            </div>

            {/* Quick Actions */}
            <div className="org-card">
              <div className="org-card-header">
                <h4 className="org-card-title">
                  <Zap className="org-card-icon" />
                  Quick Actions
                </h4>
              </div>
              <div className="org-quick-actions">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`org-quick-action ${action.gradient}`}
                    onClick={action.onClick}
                  >
                    <div className="org-quick-action-content">
                      {action.icon}
                      <div className="org-quick-action-text">
                        <div className="org-quick-action-title">{action.title}</div>
                        <div className="org-quick-action-description">{action.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="org-stats-grid">
            {dashboardStats.map((stat, index) => (
              <div key={index} className={`org-stat-card ${stat.color}`}>
                <div className="org-stat-header">
                  <div className="org-stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  <span className="org-stat-change">
                    {stat.change}
                  </span>
                </div>
                <div className="org-stat-content">
                  <h3 className="org-stat-value">
                    <AnimatedCounter value={stat.value} />
                  </h3>
                  <p className="org-stat-title">{stat.title}</p>
                </div>
                <button className="org-stat-action">
                  {stat.action}
                </button>
              </div>
            ))}
          </div>

          {/* Recent Updates */}
          <div className="org-content-grid org-two-column">
            {/* Announcements Feed */}
            <div className="org-card">
              <div className="org-card-header">
                <h3 className="org-card-title">
                  <Megaphone className="org-card-icon" />
                  Recent Announcements
                </h3>
                <button className="org-btn org-btn-secondary">
                  View All
                </button>
              </div>
              <div className="org-announcements">
                {recentAnnouncements.map((announcement, index) => (
                  <div
                    key={announcement.id}
                    className={`org-announcement org-announcement-${announcement.type}`}
                  >
                    <div className="org-announcement-content">
                      <div className="org-announcement-icon-wrapper">
                        {announcement.icon}
                      </div>
                      <div className="org-announcement-text">
                        <h4 className="org-announcement-title">{announcement.title}</h4>
                        <p className="org-announcement-description">{announcement.content}</p>
                        <span className="org-announcement-time">{announcement.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submissions Preview */}
            <div className="org-card">
              <div className="org-card-header">
                <h3 className="org-card-title">
                  <FileText className="org-card-icon" />
                  Recent Submissions
                </h3>
                <button className="org-btn org-btn-secondary">
                  Review All
                </button>
              </div>
              <div className="org-submissions">
                {recentSubmissions.map((submission, index) => (
                  <div
                    key={submission.id}
                    className="org-submission"
                  >
                    <div className="org-submission-header">
                      <div className="org-submission-info">
                        <h4 className="org-submission-team">{submission.teamName}</h4>
                        <p className="org-submission-project">{submission.projectName}</p>
                      </div>
                      <span className={`org-status-badge org-status-${submission.status}`}>
                        {submission.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="org-submission-footer">
                      <div className="org-submission-meta">
                        <div className="org-submission-members">
                          <Users className="org-submission-icon" />
                          <span>{submission.members} members</span>
                        </div>
                        <span className="org-submission-time">{submission.submittedAt}</span>
                      </div>
                      <button className="org-btn org-btn-primary">
                        <Eye className="org-btn-icon" />
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="org-footer">
          <div className="org-footer-content">
            Organizer Panel © 2025 HackTatva - Empowering Innovation Through Technology
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrganizerDashboard;