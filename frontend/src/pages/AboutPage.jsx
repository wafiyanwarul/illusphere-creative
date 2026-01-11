import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Compass, Zap, Award, Heart, Users as UsersIcon, Linkedin, Github, Mail } from 'lucide-react';

export const AboutPage = () => {
  const navigate = useNavigate();

  const coreValues = [
    {
      id: 1,
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge solutions'
    },
    {
      id: 2,
      icon: Award,
      title: 'Excellence',
      description: 'Delivering quality that exceeds expectations'
    },
    {
      id: 3,
      icon: Heart,
      title: 'Integrity',
      description: 'Transparent, honest, and ethical in everything we do'
    },
    {
      id: 4,
      icon: UsersIcon,
      title: 'Collaboration',
      description: 'Building strong partnerships for mutual success'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="section-container">
          <h1 className="about-hero-title">About Illusphere Creative</h1>
          <p className="about-hero-subtitle">
            Where technology meets creativity, crafting digital excellence since 2020
          </p>
        </div>
        <div className="about-hero-pattern"></div>
      </section>

      {/* Founder Section */}
      <section className="founder-section">
        <div className="section-container">
          <h2 className="section-title">Meet the Founder</h2>
          
          <div className="founder-card">
            <div className="founder-left">
              <div className="founder-photo-container">
                <img 
                  src="https://customer-assets.emergentagent.com/job_modern-illusphere/artifacts/4jbgbytg_BACKGROUND-PUTIH-3X4.jpg"
                  alt="Wafiy Anwarul Hikam"
                  className="founder-photo"
                />
              </div>
            </div>

            <div className="founder-right">
              <h3 className="founder-name">Wafiy Anwarul Hikam, S.Kom</h3>
              <p className="founder-title">Founder & Lead Engineer</p>
              <p className="founder-bio">
                A passionate technologist and creative problem-solver with expertise in full-stack development and digital innovation. Wafiy founded Illusphere Creative to bridge the gap between cutting-edge technology and creative excellence, delivering solutions that transform businesses and captivate audiences.
              </p>
              
              <div className="founder-social">
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="social-icon" aria-label="GitHub">
                  <Github size={24} />
                </a>
                <a href="mailto:wafiy@illusphere.com" className="social-icon" aria-label="Email">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="story-section">
        <div className="section-container">
          <h2 className="section-title">Our Story</h2>
          <div className="story-content">
            <p className="story-text">
              Illusphere Creative was born from a vision to create a tech agency that doesn't just build products, but crafts experiences. Starting as a solo venture in 2020, we've grown by consistently delivering exceptional results and building lasting relationships with our clients. Today, we combine technical prowess with creative innovation to help businesses thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="section-container">
          <div className="vision-mission-grid">
            <div className="vm-card">
              <div className="vm-icon">
                <Target size={40} />
              </div>
              <h3 className="vm-title">Our Vision</h3>
              <p className="vm-description">
                To be the leading tech and creative agency recognized for transforming ideas into impactful digital solutions that drive business growth and innovation.
              </p>
            </div>

            <div className="vm-card">
              <div className="vm-icon">
                <Compass size={40} />
              </div>
              <h3 className="vm-title">Our Mission</h3>
              <p className="vm-description">
                To deliver premium technology solutions and creative services that exceed expectations, empower businesses, and create lasting value through innovation, expertise, and unwavering commitment to quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.id} className="value-card">
                  <div className="value-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="section-container">
          <div className="about-cta-content">
            <h2 className="about-cta-title">Ready to Work Together?</h2>
            <p className="about-cta-description">
              Let's discuss how we can help transform your digital presence
            </p>
            <button 
              className="btn-primary btn-large"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};