import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Users, Lightbulb } from 'lucide-react';

export const PartnershipSection = () => {
  const navigate = useNavigate();

  const collaborationAreas = [
    'AI & Machine Learning',
    'Data Analytics',
    'IT Consulting'
  ];

  const benefits = [
    {
      id: 1,
      icon: Zap,
      title: 'Complementary Expertise',
      description: 'Combining creative excellence with technical prowess to deliver comprehensive solutions that exceed expectations.'
    },
    {
      id: 2,
      icon: TrendingUp,
      title: 'Enhanced Solutions',
      description: 'Leveraging combined resources and knowledge to create innovative, cutting-edge products and services.'
    },
    {
      id: 3,
      icon: Users,
      title: 'Broader Reach',
      description: 'Expanding our market presence and capabilities through strategic collaboration and shared networks.'
    },
    {
      id: 4,
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'Driving continuous innovation by merging diverse perspectives and technological advancements.'
    }
  ];

  return (
    <section className="partnership-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Strategic Partners</h2>
          <p className="section-subtitle">
            Building the future together through collaboration and innovation
          </p>
        </div>

        {/* Featured Partner - AIkara AI */}
        <div className="featured-partner-card">
          <div className="partner-left">
            <div className="partner-logo-container">
              <img 
                src="https://customer-assets.emergentagent.com/job_modern-illusphere/artifacts/hb78kp26_Aikara500Black.png"
                alt="AIkara AI"
                className="partner-logo-image"
              />
            </div>
            <h3 className="partner-company-name">AIkara AI</h3>
            <p className="partner-tagline">IT Consultant & AI Data-Driven Solutions</p>
            <div className="partnership-badge">
              <span className="badge-text">Partners since 2024</span>
            </div>
          </div>

          <div className="partner-right">
            <p className="partner-description">
              AIkara AI is our strategic technology partner specializing in artificial intelligence and data-driven solutions. Together, we deliver cutting-edge IT consulting services that combine creative innovation with advanced AI capabilities.
            </p>

            <div className="collaboration-areas">
              <h4 className="collaboration-title">Key Collaboration Areas</h4>
              <div className="collaboration-tags">
                {collaborationAreas.map((area, index) => (
                  <span key={index} className="collaboration-tag">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <button 
              className="btn-primary"
              onClick={() => window.open('https://aikara.ai', '_blank')}
            >
              Visit AIkara AI
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="partnership-benefits-content">
          <h3 className="benefits-section-title">Why We Partner</h3>
          <div className="benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.id} className="benefit-card">
                  <div className="benefit-icon">
                    <Icon size={32} />
                  </div>
                  <h4 className="benefit-title">{benefit.title}</h4>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};