import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'Services', id: 'services' },
  { name: 'Portfolio', id: 'portfolio' },
  { name: 'About', id: 'about' },
  { name: 'Partnership', id: 'partnership' },
  { name: 'Testimonials', id: 'testimonials' },
  { name: 'Tech Stack', id: 'tech-stack' },
  { name: 'Contact', id: 'contact' }
];

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Intersection Observer for scroll-spy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          setActiveSection(sectionId);
          // Update URL hash without scrolling
          window.history.replaceState(null, '', `/#${sectionId}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Handle navigation clicks
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Ensure we're on the homepage
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  };

  return (
    <header className="dark-header">
      <div className="header-content">
        <a 
          href="#home" 
          className="logo-container"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <img 
            src="https://customer-assets.emergentagent.com/job_e216c6e6-05e3-4bc4-8ced-3f4e36ac0340/artifacts/nshly17c_Gemini_Generated_Image_iaz3k5iaz3k5iaz3.png" 
            alt="Illusphere Creative" 
            className="dark-logo"
          />
          <span className="logo-text">Illusphere Creative</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="dark-nav desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`dark-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};