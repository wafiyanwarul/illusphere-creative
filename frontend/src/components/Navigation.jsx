import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/mockData';

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Scroll spy functionality
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['hero', 'services', 'why-choose', 'tech-stack', 'testimonials'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(`.${sections[i]}-section`);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Smooth scroll to section
  const scrollToSection = (e, path) => {
    if (location.pathname === '/' && path === '/') {
      e.preventDefault();
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection('hero');
      setMobileMenuOpen(false);
    }
  };

  const isHomePage = location.pathname === '/';
  const getActiveClass = (path) => {
    if (isHomePage && path === '/') {
      return activeSection === 'hero' ? 'active' : '';
    }
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="dark-header">
      <div className="header-content">
        <Link to="/" className="logo-container" onClick={(e) => scrollToSection(e, '/')}>
          <img 
            src="https://customer-assets.emergentagent.com/job_e216c6e6-05e3-4bc4-8ced-3f4e36ac0340/artifacts/nshly17c_Gemini_Generated_Image_iaz3k5iaz3k5iaz3.png" 
            alt="Illusphere Creative" 
            className="dark-logo"
          />
          <span className="logo-text">Illusphere Creative</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="dark-nav desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`dark-nav-link ${getActiveClass(link.path)}`}
              onClick={(e) => scrollToSection(e, link.path)}
            >
              {link.name}
            </Link>
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
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${getActiveClass(link.path)}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};