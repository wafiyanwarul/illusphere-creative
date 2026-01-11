import React from 'react';
import { Code, Smartphone, Brain, Layout, Palette, Share2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const featuredServices = [
  {
    id: 1,
    category: 'tech',
    title: 'Web Development',
    description: 'Full-stack web applications, e-commerce platforms, and custom CMS solutions built with cutting-edge technologies.',
    icon: Code
  },
  {
    id: 2,
    category: 'tech',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
    icon: Smartphone
  },
  {
    id: 3,
    category: 'tech',
    title: 'AI Solutions',
    description: 'Intelligent chatbots, machine learning models, and AI-powered features that transform your business.',
    icon: Brain
  },
  {
    id: 4,
    category: 'creative',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces backed by research-driven user experience design and interactive prototypes.',
    icon: Layout
  },
  {
    id: 5,
    category: 'creative',
    title: 'Graphic Design',
    description: 'Eye-catching visuals for social media, marketing materials, and brand assets that captivate your audience.',
    icon: Palette
  },
  {
    id: 6,
    category: 'creative',
    title: 'Social Media Campaign',
    description: 'Strategic campaigns with engaging content creation and management to grow your online presence.',
    icon: Share2
  }
];

export const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="services-section" id="services">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            Premium technology solutions and creative services tailored to your business needs
          </p>
        </div>

        <div className="services-grid-featured">
          {featuredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="service-card-glass">
                <div className="service-icon-container">
                  <Icon size={36} className="service-icon-svg" />
                </div>
                <h4 className="service-title-glass">{service.title}</h4>
                <p className="service-description-glass">{service.description}</p>
                <button 
                  className="service-learn-more"
                  onClick={() => navigate('/services')}
                >
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="services-cta">
          <button 
            className="btn-primary"
            onClick={() => navigate('/services')}
          >
            View All Services
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};