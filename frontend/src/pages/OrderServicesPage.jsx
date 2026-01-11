import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Upload, X, Code, Smartphone, Bot, Cloud, Palette, PenTool, Share2, Video, FileText, Search, Globe, Headphones, BookOpen, Phone } from 'lucide-react';
import './OrderServicesPage.css';

// Service definitions with pricing
const SERVICES = {
  tech: [
    {
      id: 'web-dev',
      name: 'Web Development',
      icon: Code,
      options: [
        { id: 'landing', label: 'Landing Page (3-5 pages)', min: 3000000, max: 7000000 },
        { id: 'business', label: 'Business Website (8-12 pages)', min: 8000000, max: 15000000 },
        { id: 'ecommerce', label: 'E-Commerce Platform', min: 15000000, max: 35000000 },
        { id: 'webapp', label: 'Custom Web Application', min: 25000000, max: 75000000 },
        { id: 'enterprise', label: 'Enterprise Solution', min: 75000000, max: 150000000 },
      ]
    },
    {
      id: 'mobile-dev',
      name: 'Mobile App Development',
      icon: Smartphone,
      options: [
        { id: 'simple', label: 'Simple App (5-7 screens)', min: 12000000, max: 25000000 },
        { id: 'standard', label: 'Standard App (10-15 screens)', min: 25000000, max: 50000000 },
        { id: 'complex', label: 'Complex App (20+ screens)', min: 50000000, max: 100000000 },
        { id: 'enterprise', label: 'Enterprise App', min: 100000000, max: 200000000 },
      ]
    },
    {
      id: 'ai-solutions',
      name: 'AI Solutions & Chatbot',
      icon: Bot,
      options: [
        { id: 'basic-chatbot', label: 'Basic Chatbot (FAQ)', min: 7000000, max: 12000000 },
        { id: 'ai-chatbot', label: 'AI Chatbot (NLP)', min: 15000000, max: 30000000 },
        { id: 'custom-ml', label: 'Custom ML Model', min: 30000000, max: 60000000 },
        { id: 'ai-suite', label: 'AI Integration Suite', min: 60000000, max: 120000000 },
      ]
    },
    {
      id: 'cloud-devops',
      name: 'Cloud Infrastructure & DevOps',
      icon: Cloud,
      options: [
        { id: 'migration', label: 'Cloud Migration (Basic)', min: 5000000, max: 10000000 },
        { id: 'cicd', label: 'CI/CD Pipeline Setup', min: 8000000, max: 15000000 },
        { id: 'full-infra', label: 'Full Infrastructure', min: 20000000, max: 40000000 },
        { id: 'enterprise-arch', label: 'Enterprise Architecture', min: 40000000, max: 80000000 },
      ]
    },
  ],
  creative: [
    {
      id: 'ui-ux',
      name: 'UI/UX Design',
      icon: Palette,
      options: [
        { id: 'website-design', label: 'Website Design (5-8 pages)', min: 4000000, max: 8000000 },
        { id: 'app-design', label: 'App Design (10-15 screens)', min: 6000000, max: 12000000 },
        { id: 'design-system', label: 'Design System + Prototype', min: 12000000, max: 25000000 },
        { id: 'brand-experience', label: 'Complete Brand Experience', min: 25000000, max: 50000000 },
      ]
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      icon: PenTool,
      options: [
        { id: 'logo', label: 'Logo Design Only', min: 1500000, max: 4000000 },
        { id: 'brand-identity', label: 'Brand Identity Package', min: 5000000, max: 12000000 },
        { id: 'marketing-kit', label: 'Marketing Materials Kit', min: 3000000, max: 8000000 },
        { id: 'visual-system', label: 'Complete Visual System', min: 15000000, max: 30000000 },
      ]
    },
    {
      id: 'social-media',
      name: 'Social Media Management',
      icon: Share2,
      options: [
        { id: '1-month', label: '1 Month (15 posts)', min: 2500000, max: 2500000 },
        { id: '3-months', label: '3 Months (45 posts) - Save Rp 500.000', min: 7000000, max: 7000000 },
        { id: '6-months', label: '6 Months (90 posts) - Save Rp 2.000.000', min: 13000000, max: 13000000 },
        { id: '12-months', label: '12 Months (180 posts) - Save Rp 5.000.000', min: 25000000, max: 25000000 },
      ]
    },
    {
      id: 'videography',
      name: 'Videography & Motion Graphics',
      icon: Video,
      options: [
        { id: 'product-video', label: 'Product Video (30-60s)', min: 5000000, max: 10000000 },
        { id: 'brand-video', label: 'Brand Video (2-3 min)', min: 10000000, max: 20000000 },
        { id: 'campaign', label: 'Full Campaign (multiple videos)', min: 20000000, max: 50000000 },
        { id: 'documentary', label: 'Documentary/Long-form', min: 50000000, max: 100000000 },
      ]
    },
  ]
};

const ADDITIONAL_SERVICES = [
  { id: 'content', label: 'Content Writing & Copywriting', icon: FileText, min: 1500000, max: 5000000 },
  { id: 'seo', label: 'SEO Optimization Setup', icon: Search, min: 2000000, max: 8000000 },
  { id: 'multilingual', label: 'Multilingual Support (per language)', icon: Globe, min: 3000000, max: 3000000 },
  { id: 'maintenance', label: 'Ongoing Maintenance (per month)', icon: Headphones, min: 1200000, max: 1200000 },
  { id: 'training', label: 'Training & Documentation', icon: BookOpen, min: 2500000, max: 5000000 },
  { id: 'priority-support', label: 'Priority Support (per month)', icon: Phone, min: 800000, max: 800000 },
];

const TIMELINE_OPTIONS = [
  { id: 'rush', label: 'Rush (1-2 weeks)', modifier: 0.30, description: '+30% expedite fee' },
  { id: 'standard', label: 'Standard (4-8 weeks)', modifier: 0, description: 'Recommended' },
  { id: 'flexible', label: 'Flexible (8-12 weeks)', modifier: -0.10, description: '10% discount' },
  { id: 'no-deadline', label: 'No Deadline', modifier: -0.15, description: '15% discount' },
];

const PROJECT_STATUS_OPTIONS = [
  { id: 'new', label: 'New project from scratch' },
  { id: 'redesign', label: 'Redesign/upgrade existing' },
  { id: 'integration', label: 'Integration with existing systems' },
  { id: 'maintenance', label: 'Maintenance/support only' },
];

const CONTACT_TIME_OPTIONS = [
  { id: 'morning', label: 'Morning (9AM - 12PM)' },
  { id: 'afternoon', label: 'Afternoon (12PM - 3PM)' },
  { id: 'evening', label: 'Evening (3PM - 6PM)' },
  { id: 'flexible', label: 'Flexible' },
];

const REFERRAL_OPTIONS = [
  { id: 'google', label: 'Google Search' },
  { id: 'social', label: 'Social Media (Instagram/LinkedIn)' },
  { id: 'referral', label: 'Referral from friend/colleague' },
  { id: 'previous-client', label: 'Previous client' },
  { id: 'aikara', label: 'AIkara AI Partnership' },
  { id: 'other', label: 'Other' },
];

// Format number to IDR
const formatIDR = (num) => {
  return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Generate project ID
const generateProjectId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ILS-${year}-${random}`;
};

// Initial form state
const initialFormState = {
  // Step 1
  selectedServices: {},
  // Step 2
  projectName: '',
  projectDescription: '',
  timeline: 'standard',
  projectStatus: 'new',
  additionalServices: [],
  files: [],
  budgetRange: [10000000, 50000000],
  // Step 3
  fullName: '',
  email: '',
  countryCode: '+62',
  phone: '',
  companyName: '',
  companyWebsite: '',
  contactMethod: 'email',
  contactTime: 'flexible',
  referralSource: '',
  additionalNotes: '',
  // Step 4
  agreeEstimate: false,
  agreeTerms: false,
};

export const OrderServicesPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem('orderFormData');
    return saved ? JSON.parse(saved) : initialFormState;
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Save to sessionStorage on form change
  useEffect(() => {
    sessionStorage.setItem('orderFormData', JSON.stringify(formData));
  }, [formData]);

  // Calculate pricing
  const calculatePricing = useCallback(() => {
    let minTotal = 0;
    let maxTotal = 0;
    const selectedCount = Object.keys(formData.selectedServices).length;

    // Calculate service costs
    Object.entries(formData.selectedServices).forEach(([serviceId, optionId]) => {
      const allServices = [...SERVICES.tech, ...SERVICES.creative];
      const service = allServices.find(s => s.id === serviceId);
      if (service) {
        const option = service.options.find(o => o.id === optionId);
        if (option) {
          minTotal += option.min;
          maxTotal += option.max;
        }
      }
    });

    // Bundle discount (10% for 2+ services)
    const bundleDiscount = selectedCount >= 2 ? 0.10 : 0;
    const bundleDiscountMin = minTotal * bundleDiscount;
    const bundleDiscountMax = maxTotal * bundleDiscount;

    // Apply bundle discount
    let adjustedMin = minTotal - bundleDiscountMin;
    let adjustedMax = maxTotal - bundleDiscountMax;

    // Timeline modifier
    const timelineOption = TIMELINE_OPTIONS.find(t => t.id === formData.timeline);
    const timelineModifier = timelineOption ? timelineOption.modifier : 0;
    const timelineAdjustmentMin = adjustedMin * Math.abs(timelineModifier);
    const timelineAdjustmentMax = adjustedMax * Math.abs(timelineModifier);

    if (timelineModifier > 0) {
      adjustedMin += timelineAdjustmentMin;
      adjustedMax += timelineAdjustmentMax;
    } else if (timelineModifier < 0) {
      adjustedMin -= timelineAdjustmentMin;
      adjustedMax -= timelineAdjustmentMax;
    }

    // Additional services
    let additionalMin = 0;
    let additionalMax = 0;
    formData.additionalServices.forEach(serviceId => {
      const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId);
      if (service) {
        additionalMin += service.min;
        additionalMax += service.max;
      }
    });

    const finalMin = adjustedMin + additionalMin;
    const finalMax = adjustedMax + additionalMax;

    return {
      servicesMin: minTotal,
      servicesMax: maxTotal,
      bundleDiscountMin,
      bundleDiscountMax,
      bundleDiscount,
      timelineModifier,
      timelineAdjustmentMin,
      timelineAdjustmentMax,
      additionalMin,
      additionalMax,
      finalMin,
      finalMax,
      selectedCount,
    };
  }, [formData.selectedServices, formData.timeline, formData.additionalServices]);

  const pricing = calculatePricing();

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    if (Object.keys(formData.selectedServices).length === 0) {
      newErrors.services = 'Please select at least one service';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    } else if (formData.projectDescription.length < 50) {
      newErrors.projectDescription = 'Please provide more details (at least 50 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.agreeEstimate) {
      newErrors.agreeEstimate = 'Please acknowledge the estimate disclaimer';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please agree to the Terms of Service';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    let isValid = false;
    switch (currentStep) {
      case 1: isValid = validateStep1(); break;
      case 2: isValid = validateStep2(); break;
      case 3: isValid = validateStep3(); break;
      default: isValid = true;
    }
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form handlers
  const handleServiceToggle = (serviceId) => {
    setFormData(prev => {
      const newServices = { ...prev.selectedServices };
      if (newServices[serviceId]) {
        delete newServices[serviceId];
      } else {
        // Set default option
        const allServices = [...SERVICES.tech, ...SERVICES.creative];
        const service = allServices.find(s => s.id === serviceId);
        if (service && service.options.length > 0) {
          newServices[serviceId] = service.options[0].id;
        }
      }
      return { ...prev, selectedServices: newServices };
    });
    setErrors(prev => ({ ...prev, services: undefined }));
  };

  const handleServiceOptionChange = (serviceId, optionId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: { ...prev.selectedServices, [serviceId]: optionId }
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleAdditionalServiceToggle = (serviceId) => {
    setFormData(prev => {
      const newServices = prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId];
      return { ...prev, additionalServices: newServices };
    });
  };

  // File handling
  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const maxFiles = 5;

    const validFiles = newFiles.filter(file => {
      if (!validTypes.includes(file.type)) {
        alert(`${file.name}: Invalid file type`);
        return false;
      }
      if (file.size > maxSize) {
        alert(`${file.name}: File too large (max 10MB)`);
        return false;
      }
      return true;
    });

    setFormData(prev => {
      const existingFiles = prev.files || [];
      const combined = [...existingFiles, ...validFiles].slice(0, maxFiles);
      return { ...prev, files: combined };
    });
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validateStep4()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newProjectId = generateProjectId();
    setProjectId(newProjectId);
    
    // Log form data for debugging
    console.log('Order Submitted:', {
      projectId: newProjectId,
      formData,
      pricing,
      timestamp: new Date().toISOString(),
    });
    
    // Clear sessionStorage
    sessionStorage.removeItem('orderFormData');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Get service details for review
  const getSelectedServiceDetails = () => {
    const details = [];
    Object.entries(formData.selectedServices).forEach(([serviceId, optionId]) => {
      const allServices = [...SERVICES.tech, ...SERVICES.creative];
      const service = allServices.find(s => s.id === serviceId);
      if (service) {
        const option = service.options.find(o => o.id === optionId);
        if (option) {
          details.push({
            serviceName: service.name,
            optionLabel: option.label,
            min: option.min,
            max: option.max,
          });
        }
      }
    });
    return details;
  };

  // Render service card
  const renderServiceCard = (service, category) => {
    const isSelected = formData.selectedServices[service.id] !== undefined;
    const Icon = service.icon;

    return (
      <div
        key={service.id}
        className={`service-card ${isSelected ? 'selected' : ''}`}
        data-testid={`service-card-${service.id}`}
      >
        <div className="service-card-header" onClick={() => handleServiceToggle(service.id)}>
          <div className="service-checkbox">
            {isSelected && <Check size={14} />}
          </div>
          <div className="service-icon">
            <Icon size={24} />
          </div>
          <div className="service-info">
            <h4>{service.name}</h4>
            <p className="service-price-hint">
              From {formatIDR(service.options[0].min)}
            </p>
          </div>
        </div>
        
        {isSelected && (
          <div className="service-options">
            <label>Select complexity:</label>
            <select
              value={formData.selectedServices[service.id]}
              onChange={(e) => handleServiceOptionChange(service.id, e.target.value)}
              data-testid={`service-select-${service.id}`}
            >
              {service.options.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label} ({formatIDR(option.min)} - {formatIDR(option.max)})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  // Success screen
  if (isSubmitted) {
    return (
      <div className="order-services-page">
        <div className="success-screen" data-testid="success-screen">
          <div className="success-content">
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h1>Project Request Submitted Successfully!</h1>
            <p className="success-subtitle">Thank you for choosing Illusphere Creative</p>
            
            <div className="project-id-card">
              <span className="label">Project Reference ID</span>
              <span className="value">{projectId}</span>
            </div>

            <div className="success-info">
              <p>We&apos;ve received your project request</p>
              <p className="highlight">Our team will review your request within 24 hours</p>
            </div>

            <div className="next-steps">
              <h3>What Happens Next</h3>
              <ol>
                <li><Check size={16} className="step-check" /> Request received and logged in our system</li>
                <li><span className="step-arrow">→</span> Team reviews your requirements (within 24 hours)</li>
                <li><span className="step-arrow">→</span> We&apos;ll contact you to schedule initial consultation</li>
                <li><span className="step-arrow">→</span> Detailed proposal and final pricing sent</li>
                <li><span className="step-arrow">→</span> Project kickoff upon agreement</li>
              </ol>
            </div>

            <div className="email-notice">
              <p>A confirmation email has been sent to</p>
              <p className="email">{formData.email || 'your email'}</p>
            </div>

            <div className="success-actions">
              <button className="btn-primary" onClick={() => navigate('/')} data-testid="back-home-btn">
                Back to Home
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData(initialFormState);
                }}
                data-testid="submit-another-btn"
              >
                Submit Another Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-services-page" data-testid="order-services-page">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
              data-testid={`progress-step-${step}`}
            >
              <div className="step-circle">
                {currentStep > step ? <Check size={16} /> : step}
              </div>
              <span className="step-label">
                {step === 1 && 'Services'}
                {step === 2 && 'Details'}
                {step === 3 && 'Contact'}
                {step === 4 && 'Review'}
              </span>
            </div>
          ))}
          <div className="progress-line">
            <div className="progress-fill" style={{ width: `${((currentStep - 1) / 3) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="order-content">
        {/* Main Form Area */}
        <div className="form-section">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div className="step-content" data-testid="step-1">
              <div className="step-header">
                <h1>What services do you need?</h1>
                <p>Select one or multiple services (bundle discount: 10% off for 2+ services)</p>
              </div>

              {errors.services && (
                <div className="error-message global-error">{errors.services}</div>
              )}

              <div className="services-section">
                <h3 className="section-title">Tech Services</h3>
                <div className="services-grid">
                  {SERVICES.tech.map(service => renderServiceCard(service, 'tech'))}
                </div>
              </div>

              <div className="services-section">
                <h3 className="section-title">Creative Services</h3>
                <div className="services-grid">
                  {SERVICES.creative.map(service => renderServiceCard(service, 'creative'))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <div className="step-content" data-testid="step-2">
              <div className="step-header">
                <h1>Tell us about your project</h1>
              </div>

              <div className="form-group">
                <label htmlFor="projectName">Project Name *</label>
                <input
                  type="text"
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="e.g., Company Website Redesign"
                  className={errors.projectName ? 'error' : ''}
                  data-testid="project-name-input"
                />
                {errors.projectName && <span className="error-message">{errors.projectName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="projectDescription">Project Description *</label>
                <textarea
                  id="projectDescription"
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value.slice(0, 2000))}
                  placeholder="Describe your project vision, goals, target audience, key features..."
                  rows={5}
                  className={errors.projectDescription ? 'error' : ''}
                  data-testid="project-description-input"
                />
                <div className="char-counter">{formData.projectDescription.length}/2000</div>
                {errors.projectDescription && <span className="error-message">{errors.projectDescription}</span>}
              </div>

              <div className="form-group">
                <label>Timeline Requirements *</label>
                <div className="radio-group">
                  {TIMELINE_OPTIONS.map(option => (
                    <label key={option.id} className={`radio-option ${formData.timeline === option.id ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="timeline"
                        value={option.id}
                        checked={formData.timeline === option.id}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                      />
                      <span className="radio-label">{option.label}</span>
                      <span className={`radio-desc ${option.modifier > 0 ? 'fee' : option.modifier < 0 ? 'discount' : ''}`}>
                        {option.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Project Status</label>
                <div className="radio-group">
                  {PROJECT_STATUS_OPTIONS.map(option => (
                    <label key={option.id} className={`radio-option ${formData.projectStatus === option.id ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="projectStatus"
                        value={option.id}
                        checked={formData.projectStatus === option.id}
                        onChange={(e) => handleInputChange('projectStatus', e.target.value)}
                      />
                      <span className="radio-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Additional Services</label>
                <div className="checkbox-grid">
                  {ADDITIONAL_SERVICES.map(service => {
                    const Icon = service.icon;
                    const isChecked = formData.additionalServices.includes(service.id);
                    return (
                      <label key={service.id} className={`checkbox-option ${isChecked ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleAdditionalServiceToggle(service.id)}
                        />
                        <div className="checkbox-icon"><Icon size={18} /></div>
                        <div className="checkbox-content">
                          <span className="checkbox-label">{service.label}</span>
                          <span className="checkbox-price">
                            +{formatIDR(service.min)}{service.max !== service.min && ` - ${formatIDR(service.max)}`}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label>Reference Materials (Optional)</label>
                <p className="field-hint">Upload any briefs, mockups, or reference files (PDF, PNG, JPG, ZIP, DOC - Max 10MB each, up to 5 files)</p>
                <div
                  className={`file-dropzone ${dragActive ? 'active' : ''}`}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  data-testid="file-dropzone"
                >
                  <Upload size={32} />
                  <p>Drag & drop files here or</p>
                  <label className="file-browse">
                    Browse Files
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg,.zip,.doc,.docx"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                {formData.files && formData.files.length > 0 && (
                  <div className="file-list">
                    {formData.files.map((file, index) => (
                      <div key={index} className="file-item">
                        <FileText size={16} />
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button className="file-remove" onClick={() => removeFile(index)} aria-label="Remove file">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Budget Range (Optional)</label>
                <div className="budget-slider">
                  <input
                    type="range"
                    min={1000000}
                    max={100000000}
                    step={1000000}
                    value={formData.budgetRange[1]}
                    onChange={(e) => handleInputChange('budgetRange', [formData.budgetRange[0], parseInt(e.target.value)])}
                  />
                  <div className="budget-labels">
                    <span>{formatIDR(1000000)}</span>
                    <span className="budget-value">{formatIDR(formData.budgetRange[1])}+</span>
                    <span>{formatIDR(100000000)}+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="step-content" data-testid="step-3">
              <div className="step-header">
                <h1>How can we reach you?</h1>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Your full name"
                    className={errors.fullName ? 'error' : ''}
                    data-testid="full-name-input"
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={errors.email ? 'error' : ''}
                    data-testid="email-input"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <div className="phone-input-group">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="country-code-select"
                  >
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/[^0-9\s]/g, ''))}
                    placeholder="812 3456 7890"
                    className={errors.phone ? 'error' : ''}
                    data-testid="phone-input"
                  />
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name (Optional)</label>
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your company name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="companyWebsite">Company Website (Optional)</label>
                  <input
                    type="url"
                    id="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Contact Method *</label>
                <div className="radio-group horizontal">
                  {['email', 'whatsapp', 'phone', 'video'].map(method => (
                    <label key={method} className={`radio-option ${formData.contactMethod === method ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={formData.contactMethod === method}
                        onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                      />
                      <span className="radio-label">
                        {method === 'email' && 'Email'}
                        {method === 'whatsapp' && 'WhatsApp'}
                        {method === 'phone' && 'Phone Call'}
                        {method === 'video' && 'Video Meeting'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactTime">Best Time to Contact</label>
                  <select
                    id="contactTime"
                    value={formData.contactTime}
                    onChange={(e) => handleInputChange('contactTime', e.target.value)}
                  >
                    {CONTACT_TIME_OPTIONS.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="referralSource">How did you hear about us?</label>
                  <select
                    id="referralSource"
                    value={formData.referralSource}
                    onChange={(e) => handleInputChange('referralSource', e.target.value)}
                  >
                    <option value="">Select an option</option>
                    {REFERRAL_OPTIONS.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalNotes">Additional Notes (Optional)</label>
                <textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  placeholder="Any questions or special requirements?"
                  rows={3}
                />
              </div>

              <div className="privacy-notice">
                By submitting this form, you agree to our <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="step-content" data-testid="step-4">
              <div className="step-header">
                <h1>Review Your Project Request</h1>
              </div>

              <div className="review-section">
                <h3>Selected Services</h3>
                <div className="review-services">
                  {getSelectedServiceDetails().map((service, index) => (
                    <div key={index} className="review-service-item">
                      <Check size={16} className="check-icon" />
                      <div>
                        <span className="service-name">{service.serviceName}</span>
                        <span className="service-option">{service.optionLabel}</span>
                        <span className="service-price">{formatIDR(service.min)} - {formatIDR(service.max)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="review-section">
                <h3>Project Details</h3>
                <div className="review-details">
                  <div className="detail-row">
                    <span className="label">Project Name:</span>
                    <span className="value">{formData.projectName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Timeline:</span>
                    <span className="value">
                      {TIMELINE_OPTIONS.find(t => t.id === formData.timeline)?.label}
                      <span className={`timeline-tag ${pricing.timelineModifier > 0 ? 'fee' : pricing.timelineModifier < 0 ? 'discount' : ''}`}>
                        {pricing.timelineModifier > 0 && `+${Math.abs(pricing.timelineModifier * 100)}%`}
                        {pricing.timelineModifier < 0 && `-${Math.abs(pricing.timelineModifier * 100)}%`}
                      </span>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Project Status:</span>
                    <span className="value">{PROJECT_STATUS_OPTIONS.find(s => s.id === formData.projectStatus)?.label}</span>
                  </div>
                  {formData.additionalServices.length > 0 && (
                    <div className="detail-row">
                      <span className="label">Additional Services:</span>
                      <span className="value">
                        {formData.additionalServices.map(id => 
                          ADDITIONAL_SERVICES.find(s => s.id === id)?.label
                        ).join(', ')}
                      </span>
                    </div>
                  )}
                  {formData.files && formData.files.length > 0 && (
                    <div className="detail-row">
                      <span className="label">Files Uploaded:</span>
                      <span className="value">{formData.files.length} file(s)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="review-section">
                <h3>Contact Information</h3>
                <div className="review-details">
                  <div className="detail-row">
                    <span className="label">Name:</span>
                    <span className="value">{formData.fullName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Email:</span>
                    <span className="value">{formData.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Phone:</span>
                    <span className="value">{formData.countryCode} {formData.phone}</span>
                  </div>
                  {formData.companyName && (
                    <div className="detail-row">
                      <span className="label">Company:</span>
                      <span className="value">{formData.companyName}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="label">Preferred Contact:</span>
                    <span className="value" style={{ textTransform: 'capitalize' }}>{formData.contactMethod}</span>
                  </div>
                </div>
              </div>

              <div className="review-section deliverables">
                <h3>Project Deliverables</h3>
                <ul>
                  <li>Source files & all assets</li>
                  <li>Complete documentation</li>
                  <li>3 rounds of revisions included</li>
                  <li>30-day post-launch support</li>
                </ul>
              </div>

              <div className="review-section payment-terms">
                <h3>Payment Terms</h3>
                <div className="payment-breakdown">
                  <div className="payment-item">
                    <span className="percentage">50%</span>
                    <span className="description">Deposit (DP) required to begin project</span>
                  </div>
                  <div className="payment-item">
                    <span className="percentage">30%</span>
                    <span className="description">Upon milestone completion</span>
                  </div>
                  <div className="payment-item">
                    <span className="percentage">20%</span>
                    <span className="description">Upon final delivery & approval</span>
                  </div>
                </div>
              </div>

              <div className="agreement-section">
                <label className={`checkbox-agreement ${errors.agreeEstimate ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.agreeEstimate}
                    onChange={(e) => handleInputChange('agreeEstimate', e.target.checked)}
                  />
                  <span>I understand this is an estimate and final pricing will be confirmed after consultation</span>
                </label>
                {errors.agreeEstimate && <span className="error-message">{errors.agreeEstimate}</span>}

                <label className={`checkbox-agreement ${errors.agreeTerms ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                  />
                  <span>I agree to Illusphere Creative&apos;s <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></span>
                </label>
                {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button className="btn-secondary" onClick={handleBack} data-testid="back-btn">
                <ArrowLeft size={18} />
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={currentStep === 1 && Object.keys(formData.selectedServices).length === 0}
                data-testid="next-btn"
              >
                Next Step
                <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                className="btn-submit" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                data-testid="submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Project Request
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Price Sidebar */}
        <div className="price-sidebar" data-testid="price-sidebar">
          <div className="price-card">
            <h3>Price Estimate</h3>
            
            {pricing.selectedCount === 0 ? (
              <p className="no-services">Select services to see pricing</p>
            ) : (
              <>
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Services Subtotal</span>
                    <span>{formatIDR(pricing.servicesMin)} - {formatIDR(pricing.servicesMax)}</span>
                  </div>
                  
                  {pricing.bundleDiscount > 0 && (
                    <div className="price-row discount">
                      <span>Bundle Discount (10%)</span>
                      <span>-{formatIDR(pricing.bundleDiscountMin)} - {formatIDR(pricing.bundleDiscountMax)}</span>
                    </div>
                  )}
                  
                  {pricing.timelineModifier !== 0 && (
                    <div className={`price-row ${pricing.timelineModifier > 0 ? 'fee' : 'discount'}`}>
                      <span>Timeline {pricing.timelineModifier > 0 ? 'Fee' : 'Discount'}</span>
                      <span>
                        {pricing.timelineModifier > 0 ? '+' : '-'}
                        {formatIDR(pricing.timelineAdjustmentMin)} - {formatIDR(pricing.timelineAdjustmentMax)}
                      </span>
                    </div>
                  )}
                  
                  {pricing.additionalMin > 0 && (
                    <div className="price-row">
                      <span>Additional Services</span>
                      <span>+{formatIDR(pricing.additionalMin)}{pricing.additionalMax !== pricing.additionalMin && ` - ${formatIDR(pricing.additionalMax)}`}</span>
                    </div>
                  )}
                </div>
                
                <div className="price-total">
                  <span>Estimated Total</span>
                  <span className="total-value">
                    {formatIDR(pricing.finalMin)} - {formatIDR(pricing.finalMax)}
                  </span>
                </div>
                
                <p className="price-disclaimer">
                  *This is a preliminary estimate. Final pricing will be determined after detailed consultation.
                </p>

                {pricing.selectedCount >= 2 && (
                  <div className="bundle-badge">
                    Bundle discount applied!
                  </div>
                )}
              </>
            )}
          </div>

          {currentStep === 4 && pricing.selectedCount > 0 && (
            <div className="timeline-card">
              <h4>Estimated Timeline</h4>
              <p className="timeline-value">
                {formData.timeline === 'rush' && '1-2 weeks'}
                {formData.timeline === 'standard' && '4-8 weeks'}
                {formData.timeline === 'flexible' && '8-12 weeks'}
                {formData.timeline === 'no-deadline' && 'To be discussed'}
              </p>
              <p className="timeline-note">from project start</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderServicesPage;
