import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-badge">
            <Zap size={20} />
            <span>Ready to Start?</span>
          </div>
          
          <h2 className="cta-title">
            Let's Build Something
            <span className="cta-title-accent"> Extraordinary Together</span>
          </h2>
          
          <p className="cta-description">
            Whether you need cutting-edge technology or stunning creative work, 
            our team is ready to bring your vision to life.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="btn-primary btn-large"
              onClick={() => navigate('/order-services')}
            >
              Order Services Now
              <ArrowRight size={22} />
            </button>
            <button 
              className="btn-secondary btn-large"
              onClick={() => navigate('/contact')}
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
        
        <div className="cta-decoration">
          <div className="cta-geometric-shape shape-1"></div>
          <div className="cta-geometric-shape shape-2"></div>
          <div className="cta-geometric-shape shape-3"></div>
        </div>
      </div>
    </section>
  );
};