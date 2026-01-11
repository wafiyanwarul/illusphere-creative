import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    category: 'tech',
    title: 'E-Commerce Platform',
    categoryBadge: 'Web Development',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    brief: 'Full-stack e-commerce solution with advanced inventory management'
  },
  {
    id: 2,
    category: 'creative',
    title: 'Brand Identity Design',
    categoryBadge: 'Graphic Design',
    tags: ['Branding', 'Logo', 'Style Guide'],
    brief: 'Complete brand identity for tech startup'
  },
  {
    id: 3,
    category: 'tech',
    title: 'AI Chatbot Integration',
    categoryBadge: 'AI Solutions',
    tags: ['NLP', 'Machine Learning', 'API'],
    brief: 'Intelligent customer support chatbot with 90% accuracy'
  },
  {
    id: 4,
    category: 'creative',
    title: 'Social Media Campaign',
    categoryBadge: 'Social Media',
    tags: ['Content', 'Strategy', 'Analytics'],
    brief: 'Viral campaign generating 2M+ impressions'
  },
  {
    id: 5,
    category: 'tech',
    title: 'Mobile Banking App',
    categoryBadge: 'Mobile Development',
    tags: ['React Native', 'iOS', 'Android'],
    brief: 'Secure mobile banking with biometric authentication'
  },
  {
    id: 6,
    category: 'creative',
    title: 'Product Launch Video',
    categoryBadge: 'Videography',
    tags: ['Motion Graphics', 'Editing'],
    brief: 'Dynamic product showcase with 3D animations'
  }
];

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">
            Showcasing our best projects in tech and creative excellence
          </p>
        </div>

        <div className="portfolio-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveFilter('tech')}
          >
            Tech
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'creative' ? 'active' : ''}`}
            onClick={() => setActiveFilter('creative')}
          >
            Creative
          </button>
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image">
                <div className="portfolio-overlay">
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category-badge">{project.categoryBadge}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-brief">{project.brief}</p>
                <div className="portfolio-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="portfolio-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};