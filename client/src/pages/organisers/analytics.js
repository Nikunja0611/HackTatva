import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Trophy, FileText, Download, Upload, Eye, Award, Calendar, Filter, RefreshCw, Share2, Settings, Star, ArrowUp, ArrowDown, Sparkles, Zap } from 'lucide-react';
import './analytics.css';

const AnalyticsCertificates = () => {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [dateRange, setDateRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('analytics');
  const [animateCharts, setAnimateCharts] = useState(false);
  const [selectedCertTemplate, setSelectedCertTemplate] = useState(null);
  const [isGeneratingCerts, setIsGeneratingCerts] = useState(false);
  const [visibleElements, setVisibleElements] = useState({
    stats: false,
    charts: false,
    certificates: false
  });

  useEffect(() => {
    // Trigger animations sequentially
    setTimeout(() => setVisibleElements(prev => ({ ...prev, stats: true })), 200);
    setTimeout(() => setVisibleElements(prev => ({ ...prev, charts: true })), 400);
    setTimeout(() => setVisibleElements(prev => ({ ...prev, certificates: true })), 600);
    setTimeout(() => setAnimateCharts(true), 800);
  }, [activeTab]);

  // Sample data
  const participantData = [
    { month: 'Jan', participants: 120, submissions: 89, completions: 78 },
    { month: 'Feb', participants: 180, submissions: 142, completions: 125 },
    { month: 'Mar', participants: 240, submissions: 198, completions: 167 },
    { month: 'Apr', participants: 320, submissions: 276, completions: 234 },
    { month: 'May', participants: 450, submissions: 389, completions: 334 },
    { month: 'Jun', participants: 380, submissions: 325, completions: 298 }
  ];

  const eventData = [
    { name: 'Web Dev', participants: 234, submissions: 189, winners: 12 },
    { name: 'AI/ML', participants: 156, submissions: 134, winners: 8 },
    { name: 'Blockchain', participants: 89, submissions: 76, winners: 6 },
    { name: 'Mobile App', participants: 201, submissions: 167, winners: 10 },
    { name: 'IoT Innovation', participants: 123, submissions: 98, winners: 5 }
  ];

  const skillsData = [
    { skill: 'JavaScript', value: 45, color: '#3b82f6' },
    { skill: 'Python', value: 38, color: '#10b981' },
    { skill: 'React', value: 32, color: '#8b5cf6' },
    { skill: 'Node.js', value: 28, color: '#f59e0b' },
    { skill: 'ML/AI', value: 24, color: '#ef4444' },
    { skill: 'Other', value: 33, color: '#6b7280' }
  ];

  const engagementData = [
    { time: '00:00', active: 45 },
    { time: '04:00', active: 23 },
    { time: '08:00', active: 89 },
    { time: '12:00', active: 156 },
    { time: '16:00', active: 234 },
    { time: '20:00', active: 189 },
    { time: '24:00', active: 98 }
  ];

  const certificates = [
    {
      id: 1,
      name: 'Winner Certificate',
      template: 'Gold Premium',
      issued: 45,
      pending: 12,
      preview: '🥇',
      status: 'active',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      name: 'Participation Certificate',
      template: 'Standard Blue',
      issued: 234,
      pending: 0,
      preview: '🏆',
      status: 'active',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Innovation Award',
      template: 'Premium Gradient',
      issued: 8,
      pending: 3,
      preview: '🌟',
      status: 'draft',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleGenerateCertificates = async () => {
    setIsGeneratingCerts(true);
    setTimeout(() => {
      setIsGeneratingCerts(false);
      // Show success animation
      const successToast = document.createElement('div');
      successToast.className = 'ac-toast ac-toast-success';
      successToast.textContent = 'Certificates generated successfully! 🎉';
      document.body.appendChild(successToast);
      
      setTimeout(() => successToast.classList.add('ac-toast-visible'), 100);
      setTimeout(() => {
        successToast.classList.remove('ac-toast-visible');
        setTimeout(() => document.body.removeChild(successToast), 300);
      }, 3000);
    }, 3000);
  };

  const StatCard = ({ icon: Icon, title, value, change, changeType, gradient, animate = false, delay = 0 }) => (
    <div 
      className={`ac-stat-card ${visibleElements.stats ? 'ac-visible' : 'ac-hidden'}`}
      style={{ 
        transitionDelay: `${delay}ms`
      }}
    >
      <div className={`ac-stat-gradient ac-gradient-${gradient}`}></div>
      
      <div className="ac-stat-particles">
        <div className="ac-particle ac-particle-1"></div>
        <div className="ac-particle ac-particle-2"></div>
        <div className="ac-particle ac-particle-3"></div>
      </div>
      
      <div className="ac-stat-content">
        <div className="ac-stat-info">
          <div className={`ac-stat-icon-container ac-icon-${gradient}`}>
            <Icon className="ac-stat-icon" />
            <div className={`ac-icon-glow ac-glow-${gradient}`}></div>
          </div>
          <div>
            <p className="ac-stat-title">{title}</p>
            <p className={`ac-stat-value ${animate ? 'ac-stat-animated' : ''}`}>
              {value}
            </p>
          </div>
        </div>
        {change && (
          <div className={`ac-stat-change ac-change-${changeType}`}>
            {changeType === 'positive' ? 
              <ArrowUp className="ac-change-icon" /> : 
              <ArrowDown className="ac-change-icon" />
            }
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );

  const ChartCard = ({ title, children, fullWidth = false, delay = 0 }) => (
    <div 
      className={`ac-chart-card ${fullWidth ? 'ac-chart-full-width' : ''} ${
        visibleElements.charts ? 'ac-visible' : 'ac-hidden'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="ac-chart-gradient"></div>
      
      <div className="ac-chart-content">
        <div className="ac-chart-header">
          <h3 className="ac-chart-title">{title}</h3>
          <div className="ac-chart-actions">
            <button className="ac-chart-action-btn">
              <RefreshCw className="ac-action-icon" />
            </button>
            <button className="ac-chart-action-btn">
              <Share2 className="ac-action-icon" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );

  const CertificateCard = ({ cert, onSelect, selected, delay = 0 }) => (
    <div 
      className={`ac-cert-card ${selected ? 'ac-cert-selected' : ''} ${
        visibleElements.certificates ? 'ac-visible' : 'ac-hidden'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`
      }}
      onClick={() => onSelect(cert)}
    >
      <div className={`ac-cert-glow ac-cert-glow-${cert.color.replace('from-', '').replace(' to-', '-')}`}></div>
      
      <div className={`ac-cert-content ${selected ? 'ac-cert-content-selected' : ''}`}>
        <div className="ac-cert-pattern"></div>
        
        <div className="ac-cert-inner">
          <div className="ac-cert-header">
            <div className="ac-cert-preview-container">
              <div className="ac-cert-preview">
                {cert.preview}
              </div>
              <div className="ac-cert-sparkle">
                <Sparkles className="ac-sparkle-icon" />
              </div>
            </div>
            <div>
              <h3 className="ac-cert-name">{cert.name}</h3>
              <p className="ac-cert-template">{cert.template}</p>
            </div>
          </div>
          <div className={`ac-cert-status ac-status-${cert.status}`}>
            {cert.status}
          </div>
        </div>
        
        <div className="ac-cert-stats">
          <div className="ac-cert-stat ac-stat-issued">
            <p className="ac-cert-stat-label">Issued</p>
            <p className="ac-cert-stat-value">{cert.issued}</p>
          </div>
          <div className="ac-cert-stat ac-stat-pending">
            <p className="ac-cert-stat-label">Pending</p>
            <p className="ac-cert-stat-value">{cert.pending}</p>
          </div>
        </div>
        
        <div className="ac-cert-actions">
          <button className="ac-cert-btn ac-cert-btn-primary">
            <Eye className="ac-cert-btn-icon" />
            Preview
          </button>
          <button className="ac-cert-btn ac-cert-btn-secondary">
            <Download className="ac-cert-btn-icon" />
            Download
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ac-container">
      <div className="ac-background">
        <div className="ac-blob ac-blob-1"></div>
        <div className="ac-blob ac-blob-2"></div>
        <div className="ac-blob ac-blob-3"></div>
      </div>

      <div className="ac-content">
        {/* Header */}
        <div className="ac-header">
          <div>
            <h1 className="ac-main-title">
              Analytics & Certificates
            </h1>
            <p className="ac-main-subtitle">Comprehensive insights and intelligent certificate management</p>
            <div className="ac-main-badge">
              <Zap className="ac-badge-icon" />
              <span className="ac-badge-text">Powered by AI insights</span>
            </div>
          </div>
          
          <div className="ac-header-controls">
            <select 
              className="ac-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="web-dev">Web Dev Hackathon</option>
              <option value="ai-ml">AI/ML Challenge</option>
              <option value="blockchain">Blockchain Summit</option>
            </select>
            
            <select 
              className="ac-select"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="ac-export-btn">
              <Filter className="ac-btn-icon" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="ac-tabs">
          {[
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'certificates', label: 'Certificates', icon: Award }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`ac-tab ${activeTab === id ? 'ac-tab-active' : ''}`}
            >
              {activeTab === id && (
                <div className="ac-tab-bg"></div>
              )}
              <Icon className={`ac-tab-icon ${activeTab === id ? 'ac-tab-icon-active' : ''}`} />
              <span className="ac-tab-label">{label}</span>
              {activeTab === id && (
                <div className="ac-tab-indicator"></div>
              )}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="ac-analytics">
            {/* Stats Grid */}
            <div className="ac-stats-grid">
              <StatCard
                icon={Users}
                title="Total Participants"
                value="1,247"
                change="+23%"
                changeType="positive"
                gradient="blue"
                animate={animateCharts}
                delay={0}
              />
              <StatCard
                icon={FileText}
                title="Submissions"
                value="934"
                change="+18%"
                changeType="positive"
                gradient="green"
                animate={animateCharts}
                delay={100}
              />
              <StatCard
                icon={Trophy}
                title="Events Completed"
                value="24"
                change="+12%"
                changeType="positive"
                gradient="purple"
                animate={animateCharts}
                delay={200}
              />
              <StatCard
                icon={Star}
                title="Average Rating"
                value="4.8"
                change="+0.3"
                changeType="positive"
                gradient="orange"
                animate={animateCharts}
                delay={300}
              />
            </div>

            {/* Charts Grid */}
            <div className="ac-charts-grid">
              {/* Participants Growth */}
              <ChartCard title="Participant Growth Trends" delay={0}>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={participantData}>
                    <defs>
                      <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '16px', 
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="participants" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorParticipants)"
                      name="Participants"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="submissions" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorSubmissions)"
                      name="Submissions"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Skills Distribution */}
              <ChartCard title="Popular Skills & Technologies" delay={200}>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ skill, percent }) => `${skill} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '16px', 
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* Event Performance */}
              <ChartCard title="Event Performance Comparison" delay={400}>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={eventData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '16px', 
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="participants" fill="#3b82f6" name="Participants" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="submissions" fill="#10b981" name="Submissions" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="winners" fill="#f59e0b" name="Winners" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* User Engagement */}
              <ChartCard title="Daily User Engagement" delay={600}>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '16px', 
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#8b5cf6" 
                      strokeWidth={4}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
                      name="Active Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="ac-certificates">
            {/* Certificate Management Header */}
            <div className="ac-cert-header">
              <div>
                <h2 className="ac-cert-main-title">
                  Certificate Management
                </h2>
                <p className="ac-cert-main-subtitle">Design, generate, and distribute certificates with blockchain verification</p>
                <div className="ac-cert-badge">
                  <Award className="ac-badge-icon" />
                  <span className="ac-badge-text">AI-powered template generation</span>
                </div>
              </div>
              
              <div className="ac-cert-header-actions">
                <button className="ac-cert-upload-btn">
                  <Upload className="ac-btn-icon" />
                  <span>Upload Template</span>
                </button>
                <button 
                  onClick={handleGenerateCertificates}
                  disabled={isGeneratingCerts}
                  className={`ac-cert-generate-btn ${isGeneratingCerts ? 'ac-generating' : ''}`}
                >
                  {isGeneratingCerts ? (
                    <>
                      <RefreshCw className="ac-btn-icon ac-spinning" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Award className="ac-btn-icon" />
                      <span>Generate Certificates</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Certificate Templates Grid */}
            <div className="ac-cert-grid">
              {certificates.map((cert, index) => (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  onSelect={setSelectedCertTemplate}
                  selected={selectedCertTemplate?.id === cert.id}
                  delay={index * 200}
                />
              ))}
            </div>

            {/* Certificate Preview & Actions */}
            {selectedCertTemplate && (
              <div className={`ac-cert-preview ${selectedCertTemplate ? 'ac-cert-preview-visible' : ''}`}>
                <div className="ac-cert-preview-grid">
                  {/* Preview */}
                  <div className="ac-cert-preview-section">
                    <div className="ac-cert-preview-header">
                      <Sparkles className="ac-preview-icon" />
                      <h3 className="ac-preview-title">
                        Certificate Preview
                      </h3>
                    </div>
                    
                    <div className="ac-cert-preview-container">
                      <div className={`ac-cert-preview-glow ac-preview-glow-${selectedCertTemplate.color.replace('from-', '').replace(' to-', '-')}`}></div>
                      <div className="ac-cert-preview-content">
                        <div className="ac-cert-preview-particles">
                          <div className="ac-preview-particle ac-preview-particle-1"></div>
                          <div className="ac-preview-particle ac-preview-particle-2"></div>
                          <div className="ac-preview-particle ac-preview-particle-3"></div>
                        </div>
                        
                        <div className="ac-cert-preview-emoji">
                          {selectedCertTemplate.preview}
                        </div>
                        <h4 className="ac-cert-preview-name">
                          {selectedCertTemplate.name}
                        </h4>
                        <p className="ac-cert-preview-template">Template: {selectedCertTemplate.template}</p>
                        <div className="ac-cert-preview-info">
                          <p className="ac-preview-info-label">Live Preview</p>
                          <p className="ac-preview-info-text">This certificate will include blockchain verification, QR codes, and personalized details</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Stats */}
                  <div className="ac-cert-details">
                    <div className="ac-cert-details-header">
                      <Settings className="ac-details-icon" />
                      <h3 className="ac-details-title">Certificate Details</h3>
                    </div>
                    
                    <div className="ac-cert-details-content">
                      {/* Enhanced Stats */}
                      <div className="ac-cert-detail-stats">
                        <div className="ac-cert-detail-stat ac-detail-stat-issued">
                          <div className="ac-detail-stat-bg"></div>
                          <div className="ac-detail-stat-content">
                            <div className="ac-detail-stat-header">
                              <Award className="ac-detail-stat-icon" />
                              <p className="ac-detail-stat-label">Certificates Issued</p>
                            </div>
                            <p className="ac-detail-stat-value">{selectedCertTemplate.issued}</p>
                            <div className="ac-detail-stat-change">
                              <ArrowUp className="ac-detail-change-icon" />
                              <span className="ac-detail-change-text">+12% this week</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ac-cert-detail-stat ac-detail-stat-pending">
                          <div className="ac-detail-stat-bg"></div>
                          <div className="ac-detail-stat-content">
                            <div className="ac-detail-stat-header">
                              <Calendar className="ac-detail-stat-icon" />
                              <p className="ac-detail-stat-label">Pending</p>
                            </div>
                            <p className="ac-detail-stat-value">{selectedCertTemplate.pending}</p>
                            <div className="ac-detail-stat-change">
                              <RefreshCw className="ac-detail-change-icon" />
                              <span className="ac-detail-change-text">Processing...</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Actions */}
                      <div className="ac-cert-detail-actions">
                        <button className="ac-detail-action ac-detail-action-primary">
                          <Eye className="ac-detail-action-icon" />
                          <span>Full Preview with Animation</span>
                        </button>
                        
                        <button className="ac-detail-action ac-detail-action-success">
                          <Download className="ac-detail-action-icon" />
                          <span>Bulk Download (ZIP)</span>
                        </button>
                        
                        <button className="ac-detail-action ac-detail-action-secondary">
                          <Settings className="ac-detail-action-icon" />
                          <span>Customize Template</span>
                        </button>
                      </div>

                      {/* Enhanced Generation Options */}
                      <div className="ac-cert-options">
                        <h4 className="ac-cert-options-title">
                          <Zap className="ac-options-icon" />
                          <span>Smart Generation Options</span>
                        </h4>
                        <div className="ac-cert-options-list">
                          <label className="ac-cert-option">
                            <input type="checkbox" className="ac-option-checkbox" defaultChecked />
                            <div className="ac-option-content">
                              <div className="ac-option-indicator ac-option-blue"></div>
                              <span className="ac-option-text">Include blockchain verification QR code</span>
                            </div>
                          </label>
                          
                          <label className="ac-cert-option">
                            <input type="checkbox" className="ac-option-checkbox" defaultChecked />
                            <div className="ac-option-content">
                              <div className="ac-option-indicator ac-option-green"></div>
                              <span className="ac-option-text">Auto-send via email with tracking</span>
                            </div>
                          </label>
                          
                          <label className="ac-cert-option">
                            <input type="checkbox" className="ac-option-checkbox" />
                            <div className="ac-option-content">
                              <div className="ac-option-indicator ac-option-purple"></div>
                              <span className="ac-option-text">Add to immutable blockchain registry</span>
                            </div>
                          </label>
                          
                          <label className="ac-cert-option">
                            <input type="checkbox" className="ac-option-checkbox" />
                            <div className="ac-option-content">
                              <div className="ac-option-indicator ac-option-orange"></div>
                              <span className="ac-option-text">Generate LinkedIn shareable format</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCertificates;