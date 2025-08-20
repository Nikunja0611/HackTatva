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
import './dashboard.css';

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
      icon: <Calendar className="dashboard-icon" />,
      color: "dashboard-stat-blue",
      action: "View All"
    },
    {
      title: "Pending Submissions",
      value: "23",
      change: "+8",
      icon: <FileText className="dashboard-icon" />,
      color: "dashboard-stat-orange",
      action: "Review Now"
    },
    {
      title: "Participants Registered",
      value: "1,247",
      change: "+156",
      icon: <Users className="dashboard-icon" />,
      color: "dashboard-stat-green",
      action: "View"
    },
    {
      title: "Top Teams",
      value: "12",
      change: "+3",
      icon: <Trophy className="dashboard-icon" />,
      color: "dashboard-stat-purple",
      action: "View Leaderboard"
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="dashboard-nav-icon" />, active: true },
    { id: 'events', label: 'Events', icon: <Calendar className="dashboard-nav-icon" />, route: '/organisers/eventmanagement' },
    { id: 'participants', label: 'Participants', icon: <Users className="dashboard-nav-icon" />, route: '/organisers/participants' },
    { id: 'submissions', label: 'Submissions', icon: <FileText className="dashboard-nav-icon" />, route: '/organisers/submissions' },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="dashboard-nav-icon" /> , route: '/organisers/announcements'},
    { id: 'leaderboard', label: 'Leaderboard', icon: <Award className="dashboard-nav-icon" /> , route: '/organisers/leaderboard'},
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="dashboard-nav-icon" />, route: '/organisers/analytics' },
    { id: 'settings', label: 'Settings', icon: <Settings className="dashboard-nav-icon" />, route: '/organisers/settings'  }
  ];

  const quickActions = [
    {
      title: "Create Event",
      icon: <Plus className="dashboard-quick-action-icon" />,
      gradient: "dashboard-quick-action-blue",
      description: "Start a new hackathon",
      onClick: () => handleNavigation('events')
    },
    {
      title: "New Announcement",
      icon: <Megaphone className="dashboard-quick-action-icon" />,
      gradient: "dashboard-quick-action-green",
      description: "Notify participants"
    },
    {
      title: "View Analytics",
      icon: <BarChart3 className="dashboard-quick-action-icon" />,
      gradient: "dashboard-quick-action-orange",
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
      icon: <AlertCircle className="dashboard-announcement-icon" />
    },
    {
      id: 2,
      title: "Mentor Office Hours Available",
      content: "Industry mentors will be available for consultation during the next 3 hours.",
      time: "5 hours ago",
      type: "info",
      icon: <Users className="dashboard-announcement-icon" />
    },
    {
      id: 3,
      title: "AWS Credits Distribution Complete",
      content: "All registered teams have received their AWS credits via email.",
      time: "1 day ago",
      type: "success",
      icon: <CheckCircle className="dashboard-announcement-icon" />
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
    { label: 'View Profile', icon: <User className="dashboard-profile-icon" /> },
    { label: 'Settings', icon: <Settings className="dashboard-profile-icon" /> },
    { label: 'Logout', icon: <LogOut className="dashboard-profile-icon" /> }
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
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        {/* Sidebar Header */}
        <div className="dashboard-sidebar-header">
          <div className="dashboard-sidebar-header-content">
            {!sidebarCollapsed && (
              <div className="dashboard-brand">
                <div className="dashboard-brand-logo">
                  H
                </div>
                <div className="dashboard-brand-content">
                  <h1 className="dashboard-brand-title">HackTatva</h1>
                  <p className="dashboard-brand-subtitle">Organizer Panel</p>
                </div>
              </div>
            )}
            <button
              onClick={handleSidebarToggle}
              className="dashboard-sidebar-toggle"
            >
              {sidebarCollapsed ? <Menu className="dashboard-toggle-icon" /> : <X className="dashboard-toggle-icon" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="dashboard-nav">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`dashboard-nav-item ${currentPage === item.id ? 'active' : ''}`}
                >
                  {item.icon}
                  {!sidebarCollapsed && (
                    <span className="dashboard-nav-label">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="dashboard-sidebar-footer">
            <div className="dashboard-help-card">
              <div className="dashboard-help-header">
                <Rocket className="dashboard-help-icon" />
                <span className="dashboard-help-title">Need Help?</span>
              </div>
              <p className="dashboard-help-text">Check our documentation for guides and tutorials.</p>
              <button className="dashboard-help-button">
                View Docs
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={`dashboard-main ${sidebarCollapsed ? 'with-collapsed-sidebar' : 'with-sidebar'}`}>
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="dashboard-header-left">
              <div className="dashboard-page-info">
                <h2 className="dashboard-page-title">Dashboard</h2>
                <p className="dashboard-page-subtitle">Welcome back, Admin!</p>
              </div>
            </div>

            <div className="dashboard-header-right">
              {/* Notifications */}
              <button className="dashboard-notification-btn">
                <Bell className="dashboard-notification-icon" />
                <span className="dashboard-notification-badge">3</span>
              </button>

              {/* Profile Dropdown */}
              <div className="dashboard-profile-container">
                <button
                  onClick={handleProfileToggle}
                  className="dashboard-profile-btn"
                >
                  <div className="dashboard-profile-avatar">
                    A
                  </div>
                  <div className="dashboard-profile-info">
                    <p className="dashboard-profile-name">Admin User</p>
                    <p className="dashboard-profile-email">admin@hacktatva.com</p>
                  </div>
                  <ChevronDown className="dashboard-profile-chevron" />
                </button>

                {profileDropdownOpen && (
                  <div className="dashboard-profile-dropdown">
                    {profileMenuItems.map((item, index) => (
                      <button
                        key={index}
                        className="dashboard-profile-dropdown-item"
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
        <main className="dashboard-content">
          {/* Welcome Section & Quick Actions */}
          <div className="dashboard-content-grid dashboard-two-column">
            {/* Welcome Card */}
            <div className="dashboard-welcome-card">
              <div className="dashboard-welcome-content">
                <h3 className="dashboard-welcome-title">Welcome back, Admin! 👋</h3>
                <p className="dashboard-welcome-text">Here's today's overview of your hackathon events</p>
                <div className="dashboard-welcome-actions">
                  <button className="dashboard-btn dashboard-btn-secondary">
                    View Reports
                  </button>
                  <button className="dashboard-btn dashboard-btn-primary">
                    Quick Tour
                  </button>
                </div>
              </div>
              <div className="dashboard-welcome-decoration dashboard-welcome-decoration-1"></div>
              <div className="dashboard-welcome-decoration dashboard-welcome-decoration-2"></div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h4 className="dashboard-card-title">
                  <Zap className="dashboard-card-icon" />
                  Quick Actions
                </h4>
              </div>
              <div className="dashboard-quick-actions">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`dashboard-quick-action ${action.gradient}`}
                    onClick={action.onClick}
                  >
                    <div className="dashboard-quick-action-content">
                      {action.icon}
                      <div className="dashboard-quick-action-text">
                        <div className="dashboard-quick-action-title">{action.title}</div>
                        <div className="dashboard-quick-action-description">{action.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="dashboard-stats-grid">
            {dashboardStats.map((stat, index) => (
              <div key={index} className={`dashboard-stat-card ${stat.color}`}>
                <div className="dashboard-stat-header">
                  <div className="dashboard-stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  <span className="dashboard-stat-change">
                    {stat.change}
                  </span>
                </div>
                <div className="dashboard-stat-content">
                  <h3 className="dashboard-stat-value">
                    <AnimatedCounter value={stat.value} />
                  </h3>
                  <p className="dashboard-stat-title">{stat.title}</p>
                </div>
                <button className="dashboard-stat-action">
                  {stat.action}
                </button>
              </div>
            ))}
          </div>

          {/* Recent Updates */}
          <div className="dashboard-content-grid dashboard-two-column">
            {/* Announcements Feed */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3 className="dashboard-card-title">
                  <Megaphone className="dashboard-card-icon" />
                  Recent Announcements
                </h3>
                <button className="dashboard-btn dashboard-btn-secondary">
                  View All
                </button>
              </div>
              <div className="dashboard-announcements">
                {recentAnnouncements.map((announcement, index) => (
                  <div
                    key={announcement.id}
                    className={`dashboard-announcement dashboard-announcement-${announcement.type}`}
                  >
                    <div className="dashboard-announcement-content">
                      <div className="dashboard-announcement-icon-wrapper">
                        {announcement.icon}
                      </div>
                      <div className="dashboard-announcement-text">
                        <h4 className="dashboard-announcement-title">{announcement.title}</h4>
                        <p className="dashboard-announcement-description">{announcement.content}</p>
                        <span className="dashboard-announcement-time">{announcement.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submissions Preview */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3 className="dashboard-card-title">
                  <FileText className="dashboard-card-icon" />
                  Recent Submissions
                </h3>
                <button className="dashboard-btn dashboard-btn-secondary">
                  Review All
                </button>
              </div>
              <div className="dashboard-submissions">
                {recentSubmissions.map((submission, index) => (
                  <div
                    key={submission.id}
                    className="dashboard-submission"
                  >
                    <div className="dashboard-submission-header">
                      <div className="dashboard-submission-info">
                        <h4 className="dashboard-submission-team">{submission.teamName}</h4>
                        <p className="dashboard-submission-project">{submission.projectName}</p>
                      </div>
                      <span className={`dashboard-status-badge dashboard-status-${submission.status}`}>
                        {submission.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="dashboard-submission-footer">
                      <div className="dashboard-submission-meta">
                        <div className="dashboard-submission-members">
                          <Users className="dashboard-submission-icon" />
                          <span>{submission.members} members</span>
                        </div>
                        <span className="dashboard-submission-time">{submission.submittedAt}</span>
                      </div>
                      <button className="dashboard-btn dashboard-btn-primary">
                        <Eye className="dashboard-btn-icon" />
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
        <footer className="dashboard-footer">
          <div className="dashboard-footer-content">
            Organizer Panel © 2025 HackTatva - Empowering Innovation Through Technology
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrganizerDashboard;