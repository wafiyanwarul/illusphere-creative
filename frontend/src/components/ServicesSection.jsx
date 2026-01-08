import React from 'react';
import { Code, Smartphone, Brain, Cloud, Settings, Pen, Palette, Layout, Video, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { services } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Code, Smartphone, Brain, Cloud, Settings, Pen, Palette, Layout, Video, Share2, Sparkles
};

export const ServicesSection = () => {
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon size={32} /> : <Code size={32} />;
  };

  const techServices = services.filter(s => s.category === 'tech');
  const creativeServices = services.filter(s => s.category === 'creative');

  return (
    <section className="services-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            From cutting-edge technology to stunning creative work—we deliver excellence across all domains
          </p>
        </div>

        {/* Tech Services */}
        <div className="services-category">
          <h3 className="category-title">
            <span className="category-icon">⚡</span>
            Technology Solutions
          </h3>
          <div className="services-grid">
            {techServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon gold-icon">
                  {getIcon(service.icon)}
                </div>
                <h4 className="service-title">{service.title}</h4>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Services */}
        <div className="services-category">
          <h3 className="category-title">
            <span className="category-icon">✨</span>
            Creative Excellence
          </h3>
          <div className="services-grid">
            {creativeServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon gold-icon">
                  {getIcon(service.icon)}
                </div>
                <h4 className="service-title">{service.title}</h4>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="services-cta">
          <button 
            className="btn-primary"
            onClick={() => navigate('/services')}
          >
            Explore All Services
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};