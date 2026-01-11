import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/mockData';

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Intersection Observer for scroll-spy
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = document.querySelectorAll('.hero-section, .services-section, .tech-stack-section, .testimonials-section, .partnership-section');
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionClass = entry.target.className.split(' ')[0];
          const sectionName = sectionClass.replace('-section', '');
          setActiveSection(sectionName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  // Smooth scroll to section
  const handleNavClick = (e, path, linkName) => {
    e.preventDefault();
    
    if (path === '/' || location.pathname === '/') {
      // Handle homepage sections
      let sectionClass = '';
      switch(linkName) {
        case 'Home':
          sectionClass = '.hero-section';
          break;
        case 'Services':
          sectionClass = '.services-section';
          break;
        case 'Tech Stack':
          sectionClass = '.tech-stack-section';
          break;
        case 'Testimonials':
          sectionClass = '.testimonials-section';
          break;
        case 'Partnership':
          sectionClass = '.partnership-section';
          break;
        default:
          navigate(path);
          setMobileMenuOpen(false);
          return;
      }

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const section = document.querySelector(sectionClass);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const section = document.querySelector(sectionClass);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setMobileMenuOpen(false);
    } else {
      navigate(path);
      setMobileMenuOpen(false);
    }
  };

  const getActiveClass = (linkName) => {
    if (location.pathname !== '/') {
      // For other pages, check exact path match
      const link = navLinks.find(l => l.name === linkName);
      return location.pathname === link.path ? 'active' : '';
    }
    
    // For homepage sections
    const sectionMap = {
      'Home': 'hero',
      'Services': 'services',
      'Tech Stack': 'tech-stack',
      'Testimonials': 'testimonials',
      'Partnership': 'partnership'
    };
    
    return activeSection === sectionMap[linkName] ? 'active' : '';
  };

  return (
    <header className="dark-header">
      <div className="header-content">
        <Link 
          to="/" 
          className="logo-container"
          onClick={(e) => handleNavClick(e, '/', 'Home')}
        >
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
            <a
              key={link.path}
              href={link.path}
              className={`dark-nav-link ${getActiveClass(link.name)}`}
              onClick={(e) => handleNavClick(e, link.path, link.name)}
            >
              {link.name}
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
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`mobile-nav-link ${getActiveClass(link.name)}`}
              onClick={(e) => handleNavClick(e, link.path, link.name)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};