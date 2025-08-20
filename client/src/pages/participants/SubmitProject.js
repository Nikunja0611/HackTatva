import React, { useState, useRef } from 'react';
import './SubmitProject.css';

const SubmitProject = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    tagline: '',
    description: '',
    category: '',
    tags: [],
    teamMembers: [{ name: 'Alex Johnson', email: 'alex@email.com', role: 'Team Lead' }],
    githubRepo: '',
    liveDemo: '',
    videoDemo: '',
    projectImages: [],
    techStack: [],
    challenges: '',
    accomplishments: '',
    whatILearned: '',
    whatsNext: '',
    additionalInfo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    'AI & Machine Learning',
    'Web Development',
    'Mobile Apps',
    'Blockchain',
    'IoT & Hardware',
    'Data Science',
    'Cybersecurity',
    'FinTech',
    'HealthTech',
    'EdTech',
    'Gaming',
    'AR/VR',
    'Social Impact',
    'Sustainability',
    'Other'
  ];

  const techStackOptions = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'Kubernetes',
    'TensorFlow', 'PyTorch', 'Flutter', 'React Native', 'Vue.js', 'Angular',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagAdd = (field, tag) => {
    if (!formData[field].includes(tag)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], tag]
      }));
    }
  };

  const handleTagRemove = (field, tag) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(t => t !== tag)
    }));
  };

  const handleTeamMemberAdd = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', email: '', role: '' }]
    }));
  };

  const handleTeamMemberUpdate = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const handleTeamMemberRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFormData(prev => ({
            ...prev,
            projectImages: [...prev.projectImages, ...imageFiles.map(file => ({
              name: file.name,
              url: URL.createObjectURL(file),
              file: file
            }))]
          }));
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Project submitted successfully!');
    setIsSubmitting(false);
  };

  const handleSaveDraft = () => {
    alert('Draft saved! ');
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3, 4].map(step => (
        <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
          <div className="step-number">{step}</div>
          <div className="step-title">
            {step === 1 && 'Basic Info'}
            {step === 2 && 'Team & Links'}
            {step === 3 && 'Project Details'}
            {step === 4 && 'Review & Submit'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="form-step">
      <h2> Project Information</h2>
      <p className="step-description">Tell us about your amazing project!</p>
      
      <div className="form-group">
        <label className="required">Project Title</label>
        <input
          type="text"
          placeholder="Give your project an awesome name..."
          value={formData.projectTitle}
          onChange={(e) => handleInputChange('projectTitle', e.target.value)}
          className="form-input"
        />
        <small>Keep it concise and memorable!</small>
      </div>

      <div className="form-group">
        <label className="required">Tagline</label>
        <input
          type="text"
          placeholder="One line that describes your project's impact"
          value={formData.tagline}
          onChange={(e) => handleInputChange('tagline', e.target.value)}
          className="form-input"
        />
        <small>What makes your project special in one sentence?</small>
      </div>

      <div className="form-group">
        <label className="required">Category</label>
        <select
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="form-select"
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="required">Project Description</label>
        <textarea
          placeholder="Describe your project in detail. What problem does it solve? How does it work? What makes it innovative?"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="form-textarea"
          rows={6}
        />
        <div className="char-count">{formData.description.length}/2000</div>
      </div>

      <div className="form-group">
        <label>Tags</label>
        <div className="tag-input-container">
          <input
            type="text"
            placeholder="Add tags (press Enter)"
            className="tag-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                handleTagAdd('tags', e.target.value.trim());
                e.target.value = '';
              }
            }}
          />
        </div>
        <div className="tags-container">
          {formData.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
              <button 
                onClick={() => handleTagRemove('tags', tag)}
                className="tag-remove"
              >×</button>
            </span>
          ))}
        </div>
        <small>Add relevant tags to help others discover your project</small>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h2> Team & Links</h2>
      <p className="step-description">Tell us about your team and share your project links</p>

      <div className="form-group">
        <label>Team Members</label>
        {formData.teamMembers.map((member, index) => (
          <div key={index} className="team-member-row">
            <input
              type="text"
              placeholder="Full Name"
              value={member.name}
              onChange={(e) => handleTeamMemberUpdate(index, 'name', e.target.value)}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={member.email}
              onChange={(e) => handleTeamMemberUpdate(index, 'email', e.target.value)}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Role"
              value={member.role}
              onChange={(e) => handleTeamMemberUpdate(index, 'role', e.target.value)}
              className="form-input"
            />
            {formData.teamMembers.length > 1 && (
              <button
                onClick={() => handleTeamMemberRemove(index)}
                className="remove-btn"
              ></button>
            )}
          </div>
        ))}
        <button onClick={handleTeamMemberAdd} className="add-btn">
           Add Team Member
        </button>
      </div>

      <div className="form-group">
        <label className="required">GitHub Repository</label>
        <input
          type="url"
          placeholder="https://github.com/username/project-name"
          value={formData.githubRepo}
          onChange={(e) => handleInputChange('githubRepo', e.target.value)}
          className="form-input"
        />
        <small>Make sure your repo is public and includes a good README!</small>
      </div>

      <div className="form-group">
        <label>Live Demo URL</label>
        <input
          type="url"
          placeholder="https://your-awesome-project.com"
          value={formData.liveDemo}
          onChange={(e) => handleInputChange('liveDemo', e.target.value)}
          className="form-input"
        />
        <small>If you have a working demo, share it here!</small>
      </div>

      <div className="form-group">
        <label>Video Demo</label>
        <input
          type="url"
          placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
          value={formData.videoDemo}
          onChange={(e) => handleInputChange('videoDemo', e.target.value)}
          className="form-input"
        />
        <small>A 2-3 minute video showcasing your project (highly recommended!)</small>
      </div>

      <div className="form-group">
        <label>Tech Stack</label>
        <div className="tech-stack-container">
          <div className="tech-options">
            {techStackOptions.map(tech => (
              <button
                key={tech}
                onClick={() => handleTagAdd('techStack', tech)}
                className={`tech-option ${formData.techStack.includes(tech) ? 'selected' : ''}`}
              >
                {tech}
              </button>
            ))}
          </div>
          <div className="selected-tech">
            {formData.techStack.map(tech => (
              <span key={tech} className="tech-tag">
                {tech}
                <button 
                  onClick={() => handleTagRemove('techStack', tech)}
                  className="tag-remove"
                >×</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h2> Project Details</h2>
      <p className="step-description">Share your journey and showcase your project</p>

      <div className="form-group">
        <label>Project Images</label>
        <div 
          className={`file-drop-zone ${dragActive ? 'active' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="drop-zone-content">
            <div className="upload-icon">📸</div>
            <h3>Drop images here or click to upload</h3>
            <p>PNG, JPG, GIF up to 10MB each</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(Array.from(e.target.files))}
            className="hidden-input"
          />
        </div>
        
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${uploadProgress}%`}}
              ></div>
            </div>
            <span>{uploadProgress}%</span>
          </div>
        )}

        <div className="uploaded-images">
          {formData.projectImages.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image.url} alt={image.name} />
              <button
                onClick={() => handleImageRemove(index)}
                className="image-remove"
              >×</button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Challenges We Faced</label>
        <textarea
          placeholder="What obstacles did you overcome? How did you solve technical problems?"
          value={formData.challenges}
          onChange={(e) => handleInputChange('challenges', e.target.value)}
          className="form-textarea"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>What We're Proud Of</label>
        <textarea
          placeholder="What accomplishments are you most proud of? What worked really well?"
          value={formData.accomplishments}
          onChange={(e) => handleInputChange('accomplishments', e.target.value)}
          className="form-textarea"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>What We Learned</label>
        <textarea
          placeholder="What did you learn during this hackathon? New technologies, skills, or insights?"
          value={formData.whatILearned}
          onChange={(e) => handleInputChange('whatILearned', e.target.value)}
          className="form-textarea"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>What's Next</label>
        <textarea
          placeholder="What are your plans for this project? How will you continue developing it?"
          value={formData.whatsNext}
          onChange={(e) => handleInputChange('whatsNext', e.target.value)}
          className="form-textarea"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>Additional Information</label>
        <textarea
          placeholder="Anything else you'd like to share about your project?"
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          className="form-textarea"
          rows={3}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-step">
      <h2>✅ Review & Submit</h2>
      <p className="step-description">Almost there! Review your submission before finalizing</p>

      <div className="review-section">
        <div className="review-card">
          <h3> Project Overview</h3>
          <div className="review-item">
            <strong>Title:</strong> {formData.projectTitle || 'Not provided'}
          </div>
          <div className="review-item">
            <strong>Tagline:</strong> {formData.tagline || 'Not provided'}
          </div>
          <div className="review-item">
            <strong>Category:</strong> {formData.category || 'Not selected'}
          </div>
          <div className="review-item">
            <strong>Description:</strong> 
            <p>{formData.description || 'Not provided'}</p>
          </div>
        </div>

        <div className="review-card">
          <h3> Team Information</h3>
          {formData.teamMembers.map((member, index) => (
            <div key={index} className="team-member-review">
              {member.name} - {member.role} ({member.email})
            </div>
          ))}
        </div>

        <div className="review-card">
          <h3>🔗 Links & Resources</h3>
          <div className="review-item">
            <strong>GitHub:</strong> {formData.githubRepo || 'Not provided'}
          </div>
          <div className="review-item">
            <strong>Live Demo:</strong> {formData.liveDemo || 'Not provided'}
          </div>
          <div className="review-item">
            <strong>Video Demo:</strong> {formData.videoDemo || 'Not provided'}
          </div>
        </div>

        <div className="review-card">
          <h3> Technical Details</h3>
          <div className="review-item">
            <strong>Tech Stack:</strong>
            <div className="tech-tags-review">
              {formData.techStack.map(tech => (
                <span key={tech} className="tech-tag-small">{tech}</span>
              ))}
            </div>
          </div>
          <div className="review-item">
            <strong>Project Images:</strong> {formData.projectImages.length} uploaded
          </div>
        </div>
      </div>

      <div className="submission-checklist">
        <h3> Submission Checklist</h3>
        <div className="checklist-item">
          <input type="checkbox" id="check1" />
          <label htmlFor="check1">My project follows the hackathon rules and guidelines</label>
        </div>
        <div className="checklist-item">
          <input type="checkbox" id="check2" />
          <label htmlFor="check2">All team members have agreed to this submission</label>
        </div>
        <div className="checklist-item">
          <input type="checkbox" id="check3" />
          <label htmlFor="check3">The GitHub repository is public and includes a README</label>
        </div>
        <div className="checklist-item">
          <input type="checkbox" id="check4" />
          <label htmlFor="check4">I understand this submission is final</label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="submit-project-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"></span>
          </div>
          <h1>Submit Your Project</h1>
        </div>
        <div className="header-actions">
          <button onClick={handleSaveDraft} className="btn btn-outline">
             Save Draft
          </button>
          <div className="deadline-info">
            <span className="deadline-text">Deadline: 2d 5h 49m</span>
          </div>
        </div>
      </header>

      <div className="submit-content">
        {renderStepIndicator()}

        <div className="form-container">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="form-navigation">
            <div className="nav-left">
              {currentStep > 1 && (
                <button onClick={prevStep} className="btn btn-outline">
                  ← Previous
                </button>
              )}
            </div>
            <div className="nav-right">
              {currentStep < 4 ? (
                <button onClick={nextStep} className="btn btn-primary">
                  Next →
                </button>
              ) : (
                <button 
                  onClick={handleSubmit} 
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading"></div>
                      Submitting...
                    </>
                  ) : (
                    <> Submit Project</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitProject;