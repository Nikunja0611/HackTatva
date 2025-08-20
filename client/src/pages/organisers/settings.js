import React, { useState, useEffect } from 'react';
import { User, Shield, Bell, Palette, Globe, Key, UserPlus, Award, Mail, Phone, Building, Camera, Eye, EyeOff, Save, RefreshCw, Trash2, Plus, X, Check, Settings, Lock, Unlock, Smartphone, QrCode, Download, Upload, Star, Zap, Crown, Users, ChevronRight, Sparkles, Activity, TrendingUp } from 'lucide-react';
import './settings.css';

const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    tabs: false,
    content: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    // Sequential animation triggers
    setTimeout(() => setVisibleSections(prev => ({ ...prev, header: true })), 200);
    setTimeout(() => setVisibleSections(prev => ({ ...prev, tabs: true })), 400);
    setTimeout(() => setVisibleSections(prev => ({ ...prev, content: true })), 600);
  }, [activeTab]);

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Success toast
      const toast = document.createElement('div');
      toast.className = 'set-toast';
      toast.innerHTML = '<div class="set-toast-content"><svg class="set-toast-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg><span>Settings saved successfully!</span></div>';
      document.body.appendChild(toast);
      
      setTimeout(() => toast.classList.add('set-toast-visible'), 100);
      setTimeout(() => {
        toast.classList.remove('set-toast-visible');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 3000);
    }, 2000);
  };

  const AnimatedSection = ({ children, visible, delay = 0, className = "" }) => (
    <div 
      className={`set-animated-section ${visible ? 'set-section-visible' : 'set-section-hidden'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  const FormField = ({ icon: Icon, label, children, required = false }) => (
    <div className="set-form-field">
      <label className="set-form-label">
        <Icon className="set-form-label-icon" />
        <span>{label}</span>
        {required && <span className="set-required">*</span>}
      </label>
      <div className="set-form-field-content">
        {children}
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, color: 'set-tab-blue' },
    { id: 'security', label: 'Security', icon: Shield, color: 'set-tab-green' },
    { id: 'permissions', label: 'Team & Permissions', icon: Users, color: 'set-tab-purple' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'set-tab-orange' },
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Co-Organizer', email: 'sarah@company.com', avatar: '👩‍💼', status: 'active', permissions: ['all'], activity: '2 hours ago' },
    { id: 2, name: 'Mike Chen', role: 'Judge', email: 'mike@company.com', avatar: '👨‍💻', status: 'active', permissions: ['review', 'score'], activity: '1 day ago' },
    { id: 3, name: 'Emily Davis', role: 'Moderator', email: 'emily@company.com', avatar: '👩‍🎓', status: 'pending', permissions: ['moderate'], activity: 'Never' }
  ];

  return (
    <div className="set-container">
      {/* Enhanced animated background */}
      <div className="set-background">
        <div className="set-bg-blob set-bg-blob-1"></div>
        <div className="set-bg-blob set-bg-blob-2"></div>
        <div className="set-bg-blob set-bg-blob-3"></div>
        <div className="set-grid-overlay"></div>
      </div>

      <div className="set-main-content">
        {/* Enhanced Header */}
        <AnimatedSection visible={visibleSections.header} className="set-header-section">
          <div className="set-header">
            <div className="set-header-left">
              <div className="set-header-icon">
                <Settings className="set-header-icon-inner" />
              </div>
              <div>
                <h1 className="set-title">
                  Settings & Configuration
                </h1>
                <p className="set-subtitle">Manage your account, security, and platform preferences</p>
              </div>
            </div>
            
            <div className="set-status-badges">
              <div className="set-status-badge set-status-operational">
                <div className="set-status-dot"></div>
                <span>All systems operational</span>
              </div>
              <div className="set-status-badge set-status-premium">
                <Sparkles className="set-status-icon" />
                <span>Premium features active</span>
              </div>
            </div>
            
            <div className="set-header-actions">
              <button className="set-btn set-btn-secondary">
                <RefreshCw className="set-btn-icon set-refresh-icon" />
                <span>Reset to Default</span>
              </button>
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className="set-btn set-btn-primary"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="set-btn-icon set-loading-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="set-btn-icon set-save-icon" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Enhanced Tab Navigation */}
        <AnimatedSection visible={visibleSections.tabs} delay={200}>
          <div className="set-tabs-container">
            <div className="set-tabs">
              {tabs.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`set-tab ${activeTab === id ? `set-tab-active ${color}` : 'set-tab-inactive'}`}
                >
                  {activeTab === id && (
                    <>
                      <div className={`set-tab-pulse ${color}`}></div>
                      <div className="set-tab-ping"></div>
                    </>
                  )}
                  <Icon className={`set-tab-icon ${activeTab === id ? 'set-tab-icon-active' : 'set-tab-icon-inactive'}`} />
                  <span className="set-tab-label">{label}</span>
                  {activeTab === id && (
                    <ChevronRight className="set-tab-chevron" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Enhanced Content */}
        <AnimatedSection visible={visibleSections.content} delay={400}>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="set-profile-grid">
              {/* Enhanced Profile Picture */}
              <div className="set-profile-picture-section">
                <div className="set-card">
                  <h3 className="set-card-title">
                    <Camera className="set-card-title-icon" />
                    <span>Profile Picture</span>
                  </h3>
                  
                  <div className="set-profile-picture-content">
                    <div className="set-avatar-wrapper">
                      <div className="set-avatar">
                        JD
                        <div className="set-avatar-overlay"></div>
                      </div>
                      <div className="set-avatar-glow"></div>
                      <button className="set-avatar-edit-btn">
                        <Camera className="set-avatar-edit-icon" />
                      </button>
                      <div className="set-avatar-verified">
                        <Check className="set-avatar-verified-icon" />
                      </div>
                    </div>
                    
                    <div className="set-avatar-actions">
                      <button className="set-btn set-btn-primary set-btn-full">
                        <Upload className="set-btn-icon set-upload-icon" />
                        <span>Upload New</span>
                      </button>
                      <button className="set-btn set-btn-danger set-btn-full">
                        <Trash2 className="set-btn-icon set-delete-icon" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Profile Form */}
              <div className="set-profile-form-section">
                <div className="set-card">
                  <div className="set-card-header">
                    <h3 className="set-card-title">
                      <User className="set-card-title-icon set-icon-blue" />
                      <span>Personal Information</span>
                    </h3>
                    <div className="set-verified-badge">
                      <div className="set-verified-dot"></div>
                      <span>Verified</span>
                    </div>
                  </div>
                  
                  <div className="set-form-grid">
                    <FormField icon={User} label="First Name" required>
                      <input
                        type="text"
                        defaultValue="John"
                        className="set-input"
                      />
                    </FormField>
                    
                    <FormField icon={User} label="Last Name" required>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="set-input"
                      />
                    </FormField>
                    
                    <FormField icon={Mail} label="Email Address" required>
                      <input
                        type="email"
                        defaultValue="john.doe@company.com"
                        className="set-input"
                      />
                    </FormField>
                    
                    <FormField icon={Phone} label="Phone Number">
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="set-input"
                      />
                    </FormField>
                    
                    <FormField icon={Building} label="Organization" required>
                      <input
                        type="text"
                        defaultValue="Tech Innovations Inc."
                        className="set-input"
                      />
                    </FormField>
                    
                    <FormField icon={Crown} label="Role">
                      <select className="set-select">
                        <option>Primary Organizer</option>
                        <option>Co-Organizer</option>
                        <option>Event Manager</option>
                      </select>
                    </FormField>
                  </div>
                  
                  <div className="set-form-full">
                    <FormField icon={Globe} label="Bio">
                      <textarea
                        rows="4"
                        defaultValue="Passionate event organizer with 5+ years of experience in managing tech hackathons and innovation challenges."
                        className="set-textarea"
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="set-security-grid">
              {/* Enhanced Change Password */}
              <div className="set-card">
                <div className="set-card-header">
                  <div className="set-card-icon-wrapper set-icon-green">
                    <Lock className="set-card-icon" />
                  </div>
                  <div>
                    <h3 className="set-card-title">Change Password</h3>
                    <p className="set-card-subtitle">Update your account security</p>
                  </div>
                </div>
                
                <div className="set-form-stack">
                  <FormField icon={Key} label="Current Password" required>
                    <div className="set-password-field">
                      <input
                        type={showPassword.current ? "text" : "password"}
                        className="set-input"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                        className="set-password-toggle"
                      >
                        {showPassword.current ? <EyeOff className="set-password-icon" /> : <Eye className="set-password-icon" />}
                      </button>
                    </div>
                  </FormField>
                  
                  <FormField icon={Key} label="New Password" required>
                    <div className="set-password-field">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        className="set-input"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                        className="set-password-toggle"
                      >
                        {showPassword.new ? <EyeOff className="set-password-icon" /> : <Eye className="set-password-icon" />}
                      </button>
                    </div>
                  </FormField>
                  
                  <FormField icon={Key} label="Confirm New Password" required>
                    <div className="set-password-field">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        className="set-input"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="set-password-toggle"
                      >
                        {showPassword.confirm ? <EyeOff className="set-password-icon" /> : <Eye className="set-password-icon" />}
                      </button>
                    </div>
                  </FormField>
                  
                  <button className="set-btn set-btn-success set-btn-full">
                    <Lock className="set-btn-icon set-lock-icon" />
                    <span>Update Password</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Two-Factor Authentication */}
              <div className="set-card">
                <div className="set-card-header">
                  <div className="set-card-header-left">
                    <div className="set-card-icon-wrapper set-icon-blue">
                      <Smartphone className="set-card-icon" />
                    </div>
                    <div>
                      <h3 className="set-card-title">Two-Factor Authentication</h3>
                      <p className="set-card-subtitle">Enhanced account protection</p>
                    </div>
                  </div>
                  <div className={`set-status-pill ${twoFactorEnabled ? 'set-status-enabled' : 'set-status-disabled'}`}>
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
                
                <p className="set-card-description">
                  Add an extra layer of security to your account by requiring a verification code from your mobile device.
                </p>
                
                {!twoFactorEnabled ? (
                  <div className="set-form-stack">
                    <div className="set-info-box set-info-blue">
                      <div className="set-info-icon-wrapper set-icon-blue">
                        <Shield className="set-info-icon" />
                      </div>
                      <div>
                        <h4 className="set-info-title">Enhanced Security Benefits</h4>
                        <ul className="set-info-list">
                          <li className="set-info-item">
                            <div className="set-info-bullet set-bullet-blue"></div>
                            <span>Protect against unauthorized access</span>
                          </li>
                          <li className="set-info-item">
                            <div className="set-info-bullet set-bullet-purple"></div>
                            <span>SMS or app-based verification</span>
                          </li>
                          <li className="set-info-item">
                            <div className="set-info-bullet set-bullet-pink"></div>
                            <span>Industry-standard protection</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setTwoFactorEnabled(true)}
                      className="set-btn set-btn-primary set-btn-full"
                    >
                      <Smartphone className="set-btn-icon set-smartphone-icon" />
                      <span>Enable 2FA</span>
                    </button>
                  </div>
                ) : (
                  <div className="set-form-stack">
                    <div className="set-info-box set-info-green">
                      <div className="set-2fa-active">
                        <div className="set-2fa-icon-wrapper">
                          <QrCode className="set-2fa-icon" />
                        </div>
                        <div className="set-2fa-status">
                          <div className="set-2fa-dot"></div>
                          <p className="set-2fa-title">2FA is Active</p>
                        </div>
                        <p className="set-2fa-description">Your account is protected with two-factor authentication</p>
                      </div>
                    </div>
                    
                    <div className="set-button-grid">
                      <button className="set-btn set-btn-outline">
                        <QrCode className="set-btn-icon set-qr-icon" />
                        <span>Show QR</span>
                      </button>
                      <button 
                        onClick={() => setTwoFactorEnabled(false)}
                        className="set-btn set-btn-danger"
                      >
                        <X className="set-btn-icon set-x-icon" />
                        <span>Disable</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Team & Permissions Tab */}
          {activeTab === 'permissions' && (
            <div className="set-permissions-content">
              {/* Enhanced Add New Member */}
              <div className="set-card">
                <div className="set-card-header">
                  <div className="set-card-header-left">
                    <div className="set-card-icon-wrapper set-icon-purple">
                      <UserPlus className="set-card-icon" />
                    </div>
                    <div>
                      <h3 className="set-card-title">Invite Team Member</h3>
                      <p className="set-card-subtitle">Add collaborators to your hackathon</p>
                    </div>
                  </div>
                  <button className="set-btn set-btn-purple">
                    <Plus className="set-btn-icon set-plus-icon" />
                    <span>Send Invite</span>
                  </button>
                </div>
                
                <div className="set-form-grid">
                  <FormField icon={Mail} label="Email Address">
                    <input
                      type="email"
                      placeholder="colleague@company.com"
                      className="set-input set-input-purple"
                    />
                  </FormField>
                  
                  <FormField icon={Crown} label="Role">
                    <select className="set-select set-select-purple">
                      <option>Co-Organizer</option>
                      <option>Judge</option>
                      <option>Moderator</option>
                      <option>Viewer</option>
                    </select>
                  </FormField>
                  
                  <FormField icon={Shield} label="Permissions">
                    <select className="set-select set-select-purple">
                      <option>Full Access</option>
                      <option>Limited Access</option>
                      <option>Review Only</option>
                    </select>
                  </FormField>
                </div>
              </div>

              {/* Enhanced Team Members List */}
              <div className="set-card">
                <div className="set-card-header">
                  <div className="set-card-header-left">
                    <div className="set-card-icon-wrapper set-icon-blue">
                      <Users className="set-card-icon" />
                    </div>
                    <div>
                      <h3 className="set-card-title">Team Members</h3>
                      <p className="set-card-subtitle">{teamMembers.length} active members</p>
                    </div>
                  </div>
                  <div className="set-status-badge set-status-all-active">
                    <Activity className="set-status-icon" />
                    <span>All active</span>
                  </div>
                </div>
                
                <div className="set-team-members">
                  {teamMembers.map((member, index) => (
                    <div 
                      key={member.id}
                      className="set-team-member"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="set-member-info">
                        <div className="set-member-avatar-wrapper">
                          <div className="set-member-avatar">
                            {member.avatar}
                          </div>
                          <div className={`set-member-status ${member.status === 'active' ? 'set-status-active' : 'set-status-pending'}`}></div>
                        </div>
                        <div className="set-member-details">
                          <h4 className="set-member-name">
                            <span>{member.name}</span>
                            {member.status === 'active' && <Check className="set-member-check" />}
                          </h4>
                          <p className="set-member-email">{member.email}</p>
                          <div className="set-member-activity">
                            <Activity className="set-activity-icon" />
                            <span>Last active: {member.activity}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="set-member-badges">
                        <div className="set-member-status-badges">
                          <span className={`set-member-status-badge ${member.status === 'active' ? 'set-badge-active' : 'set-badge-pending'}`}>
                            {member.status}
                          </span>
                          <span className="set-member-role-badge">
                            {member.role}
                          </span>
                        </div>
                        
                        <div className="set-member-actions">
                          <button className="set-member-action-btn set-action-settings">
                            <Settings className="set-member-action-icon set-settings-icon" />
                          </button>
                          <button className="set-member-action-btn set-action-delete">
                            <Trash2 className="set-member-action-icon set-trash-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="set-notifications-grid">
              {/* Enhanced Email Notifications */}
              <div className="set-card">
                <div className="set-card-header">
                  <div className="set-card-icon-wrapper set-icon-orange">
                    <Mail className="set-card-icon" />
                  </div>
                  <div>
                    <h3 className="set-card-title">Email Notifications</h3>
                    <p className="set-card-subtitle">Manage your email preferences</p>
                  </div>
                </div>
                
                <div className="set-notification-list">
                  {[
                    { id: 'new_registration', label: 'New participant registrations', description: 'Get notified when someone joins', defaultChecked: true, icon: UserPlus },
                    { id: 'submissions', label: 'New project submissions', description: 'Updates on project submissions', defaultChecked: true, icon: Upload },
                    { id: 'deadlines', label: 'Event deadline reminders', description: 'Important deadline alerts', defaultChecked: true, icon: Activity },
                    { id: 'team_updates', label: 'Team member activities', description: 'Team collaboration updates', defaultChecked: false, icon: Users },
                    { id: 'system_updates', label: 'System updates & maintenance', description: 'Platform maintenance notices', defaultChecked: true, icon: Settings }
                  ].map((item, index) => (
                    <label 
                      key={item.id}
                      className="set-notification-item set-notification-orange"
                    >
                      <div className="set-notification-content">
                        <div className={`set-notification-icon ${item.defaultChecked ? 'set-notification-icon-active set-icon-orange' : 'set-notification-icon-inactive'}`}>
                          <item.icon className="set-notification-icon-inner" />
                        </div>
                        <div>
                          <span className="set-notification-label">
                            {item.label}
                          </span>
                          <p className="set-notification-description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="set-toggle-wrapper">
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          className="set-toggle-input"
                        />
                        <div className={`set-toggle ${item.defaultChecked ? 'set-toggle-active set-toggle-orange' : 'set-toggle-inactive'}`}>
                          <div className={`set-toggle-thumb ${item.defaultChecked ? 'set-toggle-thumb-active' : 'set-toggle-thumb-inactive'}`}></div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Enhanced Push Notifications */}
              <div className="set-card">
                <div className="set-card-header">
                  <div className="set-card-icon-wrapper set-icon-cyan">
                    <Bell className="set-card-icon" />
                  </div>
                  <div>
                    <h3 className="set-card-title">Push Notifications</h3>
                    <p className="set-card-subtitle">Real-time browser notifications</p>
                  </div>
                </div>
                
                <div className="set-notification-list">
                  {[
                    { id: 'urgent_alerts', label: 'Urgent alerts & announcements', description: 'Critical updates and alerts', defaultChecked: true, icon: Zap },
                    { id: 'judge_activities', label: 'Judge scoring activities', description: 'Scoring and evaluation updates', defaultChecked: true, icon: Award },
                    { id: 'event_start', label: 'Event start/end notifications', description: 'Event milestone notifications', defaultChecked: true, icon: Activity },
                    { id: 'leaderboard', label: 'Leaderboard changes', description: 'Ranking and position updates', defaultChecked: false, icon: TrendingUp },
                    { id: 'chat_mentions', label: 'Team chat mentions', description: 'When you are mentioned', defaultChecked: true, icon: Bell }
                  ].map((item, index) => (
                    <label 
                      key={item.id}
                      className="set-notification-item set-notification-cyan"
                    >
                      <div className="set-notification-content">
                        <div className={`set-notification-icon ${item.defaultChecked ? 'set-notification-icon-active set-icon-cyan' : 'set-notification-icon-inactive'}`}>
                          <item.icon className="set-notification-icon-inner" />
                        </div>
                        <div>
                          <span className="set-notification-label">
                            {item.label}
                          </span>
                          <p className="set-notification-description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="set-toggle-wrapper">
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          className="set-toggle-input"
                        />
                        <div className={`set-toggle ${item.defaultChecked ? 'set-toggle-active set-toggle-cyan' : 'set-toggle-inactive'}`}>
                          <div className={`set-toggle-thumb ${item.defaultChecked ? 'set-toggle-thumb-active' : 'set-toggle-thumb-inactive'}`}></div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Advanced Tab */}
          {activeTab === 'advanced' && (
            <div className="set-advanced-content">
              {/* Enhanced Data & Privacy */}
              <div className="set-card">
                <div className="set-card-header">
                  <div className="set-card-icon-wrapper set-icon-red">
                    <Shield className="set-card-icon" />
                  </div>
                  <div>
                    <h3 className="set-card-title">Data & Privacy</h3>
                    <p className="set-card-subtitle">Manage your data and privacy settings</p>
                  </div>
                </div>
                
                <div className="set-data-actions">
                  <div className="set-data-actions-left">
                    <button className="set-btn set-btn-primary set-btn-full">
                      <Download className="set-btn-icon set-download-icon" />
                      <span>Download My Data</span>
                    </button>
                    
                    <button className="set-btn set-btn-outline set-btn-full">
                      <RefreshCw className="set-btn-icon set-export-icon" />
                      <span>Export Settings</span>
                    </button>
                  </div>
                  
                  <div className="set-data-actions-right">
                    <button className="set-btn set-btn-warning set-btn-full">
                      <Trash2 className="set-btn-icon set-clear-icon" />
                      <span>Clear All Data</span>
                    </button>
                    
                    <button className="set-btn set-btn-danger set-btn-full">
                      <X className="set-btn-icon set-delete-account-icon" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
                
                <div className="set-warning-box">
                  <div className="set-warning-content">
                    <div className="set-warning-icon-wrapper">
                      <Shield className="set-warning-icon" />
                    </div>
                    <div>
                      <h4 className="set-warning-title">
                        <span>Important Notice</span>
                        <Zap className="set-warning-zap" />
                      </h4>
                      <p className="set-warning-text">
                        These actions are irreversible. Please ensure you have backed up any important data before proceeding.
                        Your account deletion will be processed within 30 days according to our data retention policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SettingsDashboard;