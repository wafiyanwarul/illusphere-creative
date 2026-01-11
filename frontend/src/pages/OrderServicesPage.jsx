import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Upload } from 'lucide-react';
import './OrderServicesPage.css';

const services = {
  tech: [
    {
      id: 'web-dev',
      name: 'Web Development',
      basePrice: 3000,
      options: [
        { label: 'Landing Page', min: 3000, max: 5000 },
        { label: 'Business Website', min: 5000, max: 10000 },
        { label: 'E-Commerce Platform', min: 10000, max: 25000 },
        { label: 'Custom Web Application', min: 15000, max: 50000 }
      ]
    },
    {
      id: 'mobile-dev',
      name: 'Mobile App Development',
      basePrice: 8000,
      options: [
        { label: 'Simple App (5-7 screens)', min: 8000, max: 15000 },
        { label: 'Medium App (10-15 screens)', min: 15000, max: 30000 },
        { label: 'Complex App (20+ screens)', min: 30000, max: 80000 }
      ]
    },
    {
      id: 'ai-solutions',
      name: 'AI Solutions & Chatbot',
      basePrice: 5000,
      options: [
        { label: 'Basic Chatbot', min: 5000, max: 10000 },
        { label: 'AI Integration', min: 10000, max: 20000 },
        { label: 'Custom ML Model', min: 20000, max: 50000 }
      ]
    },
    {
      id: 'cloud-devops',
      name: 'Cloud Infrastructure & DevOps',
      basePrice: 2000,
      options: [
        { label: 'Cloud Migration', min: 2000, max: 8000 },
        { label: 'CI/CD Setup', min: 3000, max: 10000 },
        { label: 'Full Infrastructure', min: 10000, max: 30000 }
      ]
    }
  ],
  creative: [
    {
      id: 'uiux-design',
      name: 'UI/UX Design',
      basePrice: 2000,
      options: [
        { label: 'Website Design (5 pages)', min: 2000, max: 5000 },
        { label: 'App Design (10 screens)', min: 3000, max: 8000 },
        { label: 'Complete Design System', min: 8000, max: 20000 }
      ]
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      basePrice: 500,
      options: [
        { label: 'Logo Design', min: 500, max: 2000 },
        { label: 'Brand Identity Package', min: 2000, max: 8000 },
        { label: 'Marketing Materials', min: 1000, max: 5000 }
      ]
    },
    {
      id: 'social-media',
      name: 'Social Media Campaign',
      basePrice: 1500,
      options: [
        { label: 'Content Creation (10 posts)', min: 1500, max: 1500, recurring: true },
        { label: 'Full Campaign Management', min: 3000, max: 3000, recurring: true },
        { label: 'Comprehensive Strategy', min: 5000, max: 5000, recurring: true }
      ]
    },
    {
      id: 'videography',
      name: 'Videography & Motion Graphics',
      basePrice: 2000,
      options: [
        { label: 'Product Video (30-60s)', min: 2000, max: 5000 },
        { label: 'Promotional Video (2-3 min)', min: 5000, max: 15000 },
        { label: 'Full Campaign Video', min: 15000, max: 40000 }
      ]
    }
  ]
};

const additionalServices = [
  { id: 'content-writing', label: 'Content Writing', min: 500, max: 3000 },
  { id: 'seo', label: 'SEO Optimization', min: 1000, max: 5000 },
  { id: 'maintenance', label: 'Ongoing Maintenance', min: 500, max: 2000, recurring: true },
  { id: 'training', label: 'Training & Documentation', min: 1000, max: 3000 },
  { id: 'multilang', label: 'Multiple Language Support', min: 2000, max: 8000 }
];

export const OrderServicesPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedServices: {},
    projectName: '',
    projectDescription: '',
    timeline: 'standard',
    projectStatus: 'new',
    additionalServices: {},
    fullName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    contactMethod: 'email',
    referralSource: '',
    agreedToTerms: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [projectId, setProjectId] = useState('');

  const calculatePrice = () => {
    let subtotal = 0;
    let minTotal = 0;
    let maxTotal = 0;

    // Calculate selected services
    Object.keys(formData.selectedServices).forEach(serviceId => {
      const option = formData.selectedServices[serviceId];
      if (option) {
        minTotal += option.min;
        maxTotal += option.max;
      }
    });

    subtotal = minTotal;

    // Multi-service discount
    const serviceCount = Object.keys(formData.selectedServices).length;
    const multiServiceDiscount = serviceCount > 1 ? 0.1 : 0;

    // Timeline adjustment
    const timelineFee = formData.timeline === 'urgent' ? 0.3 : formData.timeline === 'flexible' ? -0.1 : 0;

    // Additional services
    let additionalMin = 0;
    let additionalMax = 0;
    Object.keys(formData.additionalServices).forEach(addId => {
      if (formData.additionalServices[addId]) {
        const service = additionalServices.find(s => s.id === addId);
        if (service) {
          additionalMin += service.min;
          additionalMax += service.max;
        }
      }
    });

    const finalMin = Math.round((minTotal * (1 - multiServiceDiscount) * (1 + timelineFee)) + additionalMin);
    const finalMax = Math.round((maxTotal * (1 - multiServiceDiscount) * (1 + timelineFee)) + additionalMax);

    return {
      subtotal: minTotal,
      multiServiceDiscount,
      timelineFee,
      additionalMin,
      additionalMax,
      finalMin,
      finalMax
    };
  };

  const handleServiceSelect = (serviceId, option) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: {
        ...prev.selectedServices,
        [serviceId]: option
      }
    }));
  };

  const handleServiceDeselect = (serviceId) => {
    const newServices = { ...formData.selectedServices };
    delete newServices[serviceId];
    setFormData(prev => ({
      ...prev,
      selectedServices: newServices
    }));
  };

  const handleAdditionalService = (serviceId, checked) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: {
        ...prev.additionalServices,
        [serviceId]: checked
      }
    }));
  };

  const handleSubmit = () => {
    const id = `ILS-2025-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setProjectId(id);
    setShowSuccess(true);
    // In real implementation, send to backend here
    console.log('Form submitted:', formData);
  };

  const pricing = calculatePrice();

  return (
    <div className="order-services-page">
      {!showSuccess ? (
        <>
          {/* Hero Section */}
          <section className="order-hero">
            <div className="section-container">
              <h1 className="order-hero-title">Start Your Project</h1>
              <p className="order-hero-subtitle">
                Tell us about your project and get an instant estimate
              </p>
            </div>
          </section>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step} 
                  className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                >
                  {currentStep > step ? <Check size={16} /> : step}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="order-content">
            <div className="order-form-container">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <Step1ServiceSelection
                  services={services}
                  selectedServices={formData.selectedServices}
                  onServiceSelect={handleServiceSelect}
                  onServiceDeselect={handleServiceDeselect}
                />
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <Step2ProjectDetails
                  formData={formData}
                  setFormData={setFormData}
                  additionalServices={additionalServices}
                  onAdditionalService={handleAdditionalService}
                />
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <Step3ContactInfo
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {/* Step 4: Review & Estimate */}
              {currentStep === 4 && (
                <Step4Review
                  formData={formData}
                  services={services}
                  additionalServices={additionalServices}
                  pricing={pricing}
                  setFormData={setFormData}
                />
              )}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button 
                    className="btn-secondary"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    <ArrowLeft size={20} />
                    Back
                  </button>
                )}
                {currentStep < 4 ? (
                  <button 
                    className="btn-primary"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    disabled={currentStep === 1 && Object.keys(formData.selectedServices).length === 0}
                  >
                    Next
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button 
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={!formData.agreedToTerms}
                  >
                    Submit Project Request
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Price Summary Sidebar */}
            <div className="price-summary-sidebar">
              <h3 className="price-summary-title">Estimated Price</h3>
              <div className="price-amount">
                ${pricing.finalMin.toLocaleString()} - ${pricing.finalMax.toLocaleString()}
              </div>
              <div className="price-breakdown">
                <div className="price-item">
                  <span>Services Selected:</span>
                  <span>{Object.keys(formData.selectedServices).length}</span>
                </div>
                {pricing.multiServiceDiscount > 0 && (
                  <div className="price-item discount">
                    <span>Multi-service Discount:</span>
                    <span>-{(pricing.multiServiceDiscount * 100).toFixed(0)}%</span>
                  </div>
                )}
                {pricing.timelineFee !== 0 && (
                  <div className={`price-item ${pricing.timelineFee > 0 ? 'fee' : 'discount'}`}>
                    <span>Timeline Adjustment:</span>
                    <span>{pricing.timelineFee > 0 ? '+' : ''}{(pricing.timelineFee * 100).toFixed(0)}%</span>
                  </div>
                )}
              </div>
              <p className="price-note">
                *This is a preliminary estimate. Final pricing will be confirmed after consultation.
              </p>
            </div>
          </div>
        </>
      ) : (
        <SuccessModal projectId={projectId} formData={formData} />
      )}
    </div>
  );
};

// Step 1 Component
const Step1ServiceSelection = ({ services, selectedServices, onServiceSelect, onServiceDeselect }) => {
  return (
    <div className="form-step">
      <h2 className="step-title">What services do you need?</h2>
      <p className="step-description">
        Select one or multiple services (combined services get 10% discount)
      </p>

      <div className="services-section-order">
        <h3 className="service-category-title">Tech Services</h3>
        {services.tech.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            selectedOption={selectedServices[service.id]}
            onSelect={onServiceSelect}
            onDeselect={onServiceDeselect}
          />
        ))}
      </div>

      <div className="services-section-order">
        <h3 className="service-category-title">Creative Services</h3>
        {services.creative.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            selectedOption={selectedServices[service.id]}
            onSelect={onServiceSelect}
            onDeselect={onDeselect}
          />
        ))}
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, selectedOption, onSelect, onDeselect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleCheckboxChange = (checked) => {
    if (checked) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
      setSelectedOptionIndex(null);
      onDeselect(service.id);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOptionIndex(index);
    onSelect(service.id, service.options[index]);
  };

  return (
    <div className={`service-order-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="service-order-header">
        <input
          type="checkbox"
          checked={!!selectedOption}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
          className="service-checkbox"
        />
        <div>
          <h4 className="service-order-name">{service.name}</h4>
          <p className="service-base-price">Starting from ${service.basePrice.toLocaleString()}</p>
        </div>
      </div>

      {isExpanded && (
        <div className="service-options">
          {service.options.map((option, index) => (
            <label key={index} className="service-option-label">
              <input
                type="radio"
                name={`service-${service.id}`}
                checked={selectedOptionIndex === index}
                onChange={() => handleOptionSelect(index)}
              />
              <span>{option.label}</span>
              <span className="option-price">
                ${option.min.toLocaleString()} - ${option.max.toLocaleString()}
                {option.recurring && '/month'}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Step 2 Component
const Step2ProjectDetails = ({ formData, setFormData, additionalServices, onAdditionalService }) => {
  return (
    <div className="form-step">
      <h2 className="step-title">Project Details</h2>
      
      <div className="form-group">
        <label>Project Name *</label>
        <input
          type="text"
          value={formData.projectName}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          placeholder="Enter your project name"
          required
        />
      </div>

      <div className="form-group">
        <label>Detailed Description *</label>
        <textarea
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
          placeholder="Describe your project vision, target audience, key features, and any specific requirements..."
          rows={6}
          required
        />
      </div>

      <div className="form-group">
        <label>Timeline Requirements</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="urgent"
              checked={formData.timeline === 'urgent'}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            />
            <span>Urgent (1-2 weeks) - +30% rush fee</span>
          </label>
          <label>
            <input
              type="radio"
              value="standard"
              checked={formData.timeline === 'standard'}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            />
            <span>Standard (1-2 months)</span>
          </label>
          <label>
            <input
              type="radio"
              value="flexible"
              checked={formData.timeline === 'flexible'}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            />
            <span>Flexible (2-3 months) - 10% discount</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Current Status</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="new"
              checked={formData.projectStatus === 'new'}
              onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
            />
            <span>New project from scratch</span>
          </label>
          <label>
            <input
              type="radio"
              value="redesign"
              checked={formData.projectStatus === 'redesign'}
              onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
            />
            <span>Redesign/improvement of existing</span>
          </label>
          <label>
            <input
              type="radio"
              value="integration"
              checked={formData.projectStatus === 'integration'}
              onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
            />
            <span>Integration with existing systems</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Additional Requirements</label>
        <div className="checkbox-group">
          {additionalServices.map(service => (
            <label key={service.id}>
              <input
                type="checkbox"
                checked={!!formData.additionalServices[service.id]}
                onChange={(e) => onAdditionalService(service.id, e.target.checked)}
              />
              <span>
                {service.label} (+${service.min.toLocaleString()} - ${service.max.toLocaleString()}
                {service.recurring && '/month'})
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>File Upload</label>
        <div className="file-upload-area">
          <Upload size={32} />
          <p>Upload any references, briefs, or design materials</p>
          <p className="file-upload-note">PDF, images, documents (max 10MB per file)</p>
          <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        </div>
      </div>
    </div>
  );
};

// Step 3 Component
const Step3ContactInfo = ({ formData, setFormData }) => {
  return (
    <div className="form-step">
      <h2 className="step-title">Contact Information</h2>
      
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Company Website</label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="https://"
        />
      </div>

      <div className="form-group">
        <label>Preferred Contact Method</label>
        <div className="radio-group">
          {['email', 'whatsapp', 'phone', 'video'].map(method => (
            <label key={method}>
              <input
                type="radio"
                value={method}
                checked={formData.contactMethod === method}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
              />
              <span style={{ textTransform: 'capitalize' }}>
                {method === 'video' ? 'Video Meeting' : method}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>How did you hear about us?</label>
        <select
          value={formData.referralSource}
          onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="google">Google Search</option>
          <option value="social">Social Media</option>
          <option value="referral">Referral</option>
          <option value="previous">Previous Client</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};

// Step 4 Component
const Step4Review = ({ formData, services, additionalServices, pricing, setFormData }) => {
  const allServices = [...services.tech, ...services.creative];
  const selectedServicesList = Object.keys(formData.selectedServices).map(serviceId => {
    const service = allServices.find(s => s.id === serviceId);
    const option = formData.selectedServices[serviceId];
    return { service, option };
  });

  const estimatedWeeks = Math.ceil((pricing.finalMin + pricing.finalMax) / 2 / 10000) * 4;

  return (
    <div className="form-step">
      <h2 className="step-title">Review & Estimate</h2>
      
      <div className="review-section">
        <h3>Selected Services</h3>
        {selectedServicesList.map(({ service, option }) => (
          <div key={service.id} className="review-item">
            <strong>{service.name}</strong>
            <p>{option.label}</p>
            <span>${option.min.toLocaleString()} - ${option.max.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="review-section">
        <h3>Project Details</h3>
        <div className="review-item">
          <strong>Project Name:</strong>
          <p>{formData.projectName}</p>
        </div>
        <div className="review-item">
          <strong>Timeline:</strong>
          <p style={{ textTransform: 'capitalize' }}>{formData.timeline}</p>
        </div>
        {Object.keys(formData.additionalServices).some(key => formData.additionalServices[key]) && (
          <div className="review-item">
            <strong>Additional Services:</strong>
            <ul>
              {Object.keys(formData.additionalServices).map(key => {
                if (formData.additionalServices[key]) {
                  const service = additionalServices.find(s => s.id === key);
                  return <li key={key}>{service.label}</li>;
                }
                return null;
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="price-breakdown-final">
        <h3>Price Breakdown</h3>
        <div className="price-line">
          <span>Subtotal:</span>
          <span>${pricing.subtotal.toLocaleString()}</span>
        </div>
        {pricing.multiServiceDiscount > 0 && (
          <div className="price-line discount">
            <span>Multi-service discount:</span>
            <span>-{(pricing.multiServiceDiscount * 100).toFixed(0)}%</span>
          </div>
        )}
        {pricing.timelineFee !== 0 && (
          <div className={`price-line ${pricing.timelineFee > 0 ? 'fee' : 'discount'}`}>
            <span>{pricing.timelineFee > 0 ? 'Rush fee' : 'Flexible discount'}:</span>
            <span>{pricing.timelineFee > 0 ? '+' : ''}{(pricing.timelineFee * 100).toFixed(0)}%</span>
          </div>
        )}
        {(pricing.additionalMin > 0 || pricing.additionalMax > 0) && (
          <div className="price-line">
            <span>Additional services:</span>
            <span>+${pricing.additionalMin.toLocaleString()} - ${pricing.additionalMax.toLocaleString()}</span>
          </div>
        )}
        <div className="price-line total">
          <span>Estimated Total:</span>
          <span>${pricing.finalMin.toLocaleString()} - ${pricing.finalMax.toLocaleString()}</span>
        </div>
      </div>

      <div className="payment-terms">
        <h4>Payment Terms:</h4>
        <ul>
          <li>50% deposit required to start</li>
          <li>30% upon milestone completion</li>
          <li>20% upon final delivery</li>
        </ul>
      </div>

      <div className="timeline-estimate">
        <h4>Timeline:</h4>
        <p>Expected {estimatedWeeks} weeks from project start</p>
      </div>

      <div className="terms-agreement">
        <label>
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
            required
          />
          <span>
            I agree to Illusphere Creative's Terms of Service and understand that the final price may vary after detailed consultation
          </span>
        </label>
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ projectId, formData }) => {
  return (
    <div className="success-modal">
      <div className="success-content">
        <div className="success-icon">
          <Check size={64} />
        </div>
        <h1>Project Request Submitted!</h1>
        <p className="success-subtitle">Thank you for choosing Illusphere Creative!</p>
        
        <p className="success-message">
          We've received your project request and will review it within 24 hours.
        </p>

        <div className="project-id-box">
          <strong>Project Reference ID:</strong>
          <span className="project-id">{projectId}</span>
        </div>

        <div className="next-steps">
          <h3>Next Steps:</h3>
          <ol>
            <li>Our team will review your requirements</li>
            <li>We'll contact you within 24 hours via {formData.contactMethod}</li>
            <li>Schedule consultation meeting</li>
            <li>Finalize scope and pricing</li>
            <li>Sign agreement and start project</li>
          </ol>
        </div>

        <div className="success-actions">
          <button className="btn-primary" onClick={() => window.location.href = '/'}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};