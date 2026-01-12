import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-column">
            <div className="footer-brand">
              <img 
                src="https://customer-assets.emergentagent.com/job_e216c6e6-05e3-4bc4-8ced-3f4e36ac0340/artifacts/nshly17c_Gemini_Generated_Image_iaz3k5iaz3k5iaz3.png"
                alt="Illusphere Creative"
                className="footer-logo"
              />
              <span className="footer-brand-name">Illusphere Creative</span>
            </div>
            <p className="footer-tagline">
              Where technology meets creativity. Building digital excellence since 2020.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Web Development</Link></li>
              <li><Link to="/services">Mobile Apps</Link></li>
              <li><Link to="/services">AI Solutions</Link></li>
              <li><Link to="/services">UI/UX Design</Link></li>
              <li><Link to="/services">Graphic Design</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/partnership">Partnerships</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/tech-stack">Tech Stack</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Get in Touch</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={18} />
                <a href="mailto:illusphereccstudios@gmail.com">illusphereccstudios@gmail.com</a>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+6285142505525">+6285142505525</a>
              </li>
              <li>
                <MapPin size={18} />
                <span>Malang, East Java</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Illusphere Creative. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-separator">•</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Tech-inspired grid pattern */}
      <div className="footer-pattern"></div>
    </footer>
  );
};