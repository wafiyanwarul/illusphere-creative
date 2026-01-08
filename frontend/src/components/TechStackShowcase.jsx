import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiMongodb, 
  SiAmazonwebservices, 
  SiDocker, 
  SiTensorflow,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiFigma,
  SiBlender,
  SiAdobeaftereffects,
  SiAdobepremierepro
} from 'react-icons/si';

const techStack = [
  { name: 'React', category: 'tech', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', category: 'tech', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Node.js', category: 'tech', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', category: 'tech', icon: SiPython, color: '#3776AB' },
  { name: 'PostgreSQL', category: 'tech', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', category: 'tech', icon: SiMongodb, color: '#47A248' },
  { name: 'AWS', category: 'tech', icon: SiAmazonwebservices, color: '#FF9900' },
  { name: 'Docker', category: 'tech', icon: SiDocker, color: '#2496ED' },
  { name: 'TensorFlow', category: 'tech', icon: SiTensorflow, color: '#FF6F00' }
];

const creativeTools = [
  { name: 'Adobe Photoshop', category: 'creative', icon: SiAdobephotoshop, color: '#31A8FF' },
  { name: 'Adobe Illustrator', category: 'creative', icon: SiAdobeillustrator, color: '#FF9A00' },
  { name: 'Figma', category: 'creative', icon: SiFigma, color: '#F24E1E' },
  { name: 'Blender', category: 'creative', icon: SiBlender, color: '#F5792A' },
  { name: 'After Effects', category: 'creative', icon: SiAdobeaftereffects, color: '#9999FF' },
  { name: 'Premiere Pro', category: 'creative', icon: SiAdobepremierepro, color: '#9999FF' },
  { name: 'DaVinci Resolve', category: 'creative', icon: null, color: '#FFFFFF' }
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
            {techStackExtended.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={`tech-${index}`} className="tech-card">
                  <div className="tech-icon-wrapper">
                    {Icon && <Icon className="tech-icon" />}
                  </div>
                  <span className="tech-name">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Creative Tools Marquee - Scroll Right to Left */}
        <div className="marquee-container">
          <div className="marquee-track marquee-right-to-left">
            {creativeToolsExtended.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div key={`creative-${index}`} className="tech-card">
                  <div className="tech-icon-wrapper">
                    {Icon ? (
                      <Icon className="tech-icon" />
                    ) : (
                      <div className="tech-icon-placeholder-text">DR</div>
                    )}
                  </div>
                  <span className="tech-name">{tool.name}</span>
                </div>
              );
            })}
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