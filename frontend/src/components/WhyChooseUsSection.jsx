import React from 'react';
import { Zap, Brain, DollarSign, Headphones } from 'lucide-react';

const valueProps = [
  {
    id: 1,
    icon: Zap,
    title: 'Tech & Creative Fusion',
    description: 'We combine technical excellence with creative innovation, delivering solutions that are both powerful and beautiful.'
  },
  {
    id: 2,
    icon: Brain,
    title: 'AI-Driven Solutions',
    description: 'Leveraging cutting-edge AI technology to create intelligent, adaptive systems that evolve with your needs.'
  },
  {
    id: 3,
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'Clear, standardized pricing structure with no hidden fees. You know exactly what you\'re paying for.'
  },
  {
    id: 4,
    icon: Headphones,
    title: 'End-to-End Support',
    description: 'From initial concept to deployment and beyond, our team provides comprehensive support at every stage.'
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="why-choose-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Illusphere Creative</h2>
          <p className="section-subtitle">
            We deliver exceptional results through our unique approach and unwavering commitment to quality
          </p>
        </div>

        <div className="value-props-grid">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return (
              <div key={prop.id} className="value-prop-card">
                <div className="value-prop-icon">
                  <Icon size={32} />
                </div>
                <h3 className="value-prop-title">{prop.title}</h3>
                <p className="value-prop-description">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};