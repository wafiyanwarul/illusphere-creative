import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const techStack = [
  { name: 'React', category: 'tech' },
  { name: 'Next.js', category: 'tech' },
  { name: 'Node.js', category: 'tech' },
  { name: 'Python', category: 'tech' },
  { name: 'PostgreSQL', category: 'tech' },
  { name: 'MongoDB', category: 'tech' },
  { name: 'AWS', category: 'tech' },
  { name: 'Docker', category: 'tech' },
  { name: 'TensorFlow', category: 'tech' }
];

const creativeTools = [
  { name: 'Adobe Photoshop', category: 'creative' },
  { name: 'Adobe Illustrator', category: 'creative' },
  { name: 'Figma', category: 'creative' },
  { name: 'Blender', category: 'creative' },
  { name: 'After Effects', category: 'creative' },
  { name: 'Premiere Pro', category: 'creative' },
  { name: 'DaVinci Resolve', category: 'creative' }
];

export const TechStackShowcase = () => {
  const navigate = useNavigate();

  // Duplicate items for seamless infinite scroll
  const techStackExtended = [...techStack, ...techStack, ...techStack];
  const creativeToolsExtended = [...creativeTools, ...creativeTools, ...creativeTools];

  return (
    <section className="tech-stack-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Technology & Tools</h2>
          <p className="section-subtitle">
            Powered by industry-leading technologies and creative tools
          </p>
        </div>

        {/* Tech Stack Marquee - Scroll Left to Right */}
        <div className="marquee-container">
          <div className="marquee-track marquee-left-to-right">
            {techStackExtended.map((tech, index) => (
              <div key={`tech-${index}`} className="tech-card">
                <div className="tech-logo-placeholder">
                  <span className="tech-name">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Tools Marquee - Scroll Right to Left */}
        <div className="marquee-container">
          <div className="marquee-track marquee-right-to-left">
            {creativeToolsExtended.map((tool, index) => (
              <div key={`creative-${index}`} className="tech-card">
                <div className="tech-logo-placeholder">
                  <span className="tech-name">{tool.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tech-stack-cta">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/tech-stack')}
          >
            View Full Tech Stack
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};