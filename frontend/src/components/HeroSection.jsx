import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    setIsLogoVisible(true);
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-grid">
        {/* Left Content */}
        <div className="hero-content">
          <div className={`hero-logo-container ${isLogoVisible ? 'visible' : ''}`}>
            <img 
              src="https://customer-assets.emergentagent.com/job_e216c6e6-05e3-4bc4-8ced-3f4e36ac0340/artifacts/nshly17c_Gemini_Generated_Image_iaz3k5iaz3k5iaz3.png"
              alt="Illusphere IC Logo"
              className="hero-logo-image"
            />
          </div>
          
          <h1 className="hero-title">
            Where Technology
            <span className="hero-title-accent"> Meets Creativity</span>
          </h1>
          
          <p className="hero-description">
            Premium tech solutions and creative excellence. We craft digital experiences 
            that transform businesses and captivate audiences.
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate('/order-services')}
            >
              Order Services
              <ArrowRight size={20} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/portfolio')}
            >
              View Our Work
              <Sparkles size={20} />
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>

        {/* Right 3D Element */}
        <div className="hero-3d-container">
          <div className="spline-wrapper">
            <Spline 
              scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
            />
          </div>
        </div>
      </div>

      {/* Geometric Background Pattern */}
      <div className="hero-background-pattern"></div>
    </section>
  );
};