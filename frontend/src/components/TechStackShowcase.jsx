import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiPostgresql, 
  SiMongodb, 
  SiAmazonwebservices, 
  SiDocker, 
  SiTensorflow,
  SiAdobephotoshop,
  SiAdobeillustrator
} from 'react-icons/si';
import { 
  DaVinciResolveLogo, 
  FigmaLogo, 
  PythonLogo, 
  BlenderLogo, 
  PremiereLogo,
  AfterEffectsLogo 
} from './CustomLogos';

const techStack = [
  { name: 'React', category: 'tech', icon: SiReact, color: '#61DAFB', type: 'simple' },
  { name: 'Next.js', category: 'tech', icon: SiNextdotjs, color: '#FFFFFF', type: 'simple' },
  { name: 'Node.js', category: 'tech', icon: SiNodedotjs, color: '#339933', type: 'simple' },
  { name: 'Python', category: 'tech', icon: PythonLogo, color: null, type: 'custom' },
  { name: 'PostgreSQL', category: 'tech', icon: SiPostgresql, color: '#4169E1', type: 'simple' },
  { name: 'MongoDB', category: 'tech', icon: SiMongodb, color: '#47A248', type: 'simple' },
  { name: 'AWS', category: 'tech', icon: SiAmazonwebservices, color: '#FF9900', type: 'simple' },
  { name: 'Docker', category: 'tech', icon: SiDocker, color: '#2496ED', type: 'simple' },
  { name: 'TensorFlow', category: 'tech', icon: SiTensorflow, color: '#FF6F00', type: 'simple' }
];

const creativeTools = [
  { name: 'Adobe Photoshop', category: 'creative', icon: SiAdobephotoshop, color: '#31A8FF', type: 'simple' },
  { name: 'Adobe Illustrator', category: 'creative', icon: SiAdobeillustrator, color: '#FF9A00', type: 'simple' },
  { name: 'Figma', category: 'creative', icon: FigmaLogo, color: null, type: 'custom' },
  { name: 'Blender', category: 'creative', icon: BlenderLogo, color: null, type: 'custom' },
  { name: 'After Effects', category: 'creative', icon: AfterEffectsLogo, color: null, type: 'custom' },
  { name: 'Premiere Pro', category: 'creative', icon: PremiereLogo, color: null, type: 'custom' },
  { name: 'DaVinci Resolve', category: 'creative', icon: DaVinciResolveLogo, color: null, type: 'custom' }
];

const TechCard = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <div 
      key={`tech-${index}`} 
      className="tech-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tech-icon-wrapper">
        {tech.type === 'custom' ? (
          <Icon size={56} isHovered={isHovered} />
        ) : (
          <Icon 
            className="tech-icon" 
            style={{ 
              color: isHovered ? tech.color : '#FFFFFF',
              filter: isHovered ? 'none' : 'grayscale(0.5) brightness(0.9)'
            }}
          />
        )}
      </div>
      <span className="tech-name">{tech.name}</span>
    </div>
  );
};

export const TechStackShowcase = () => {
  const navigate = useNavigate();

  // Duplicate items for seamless infinite scroll
  const techStackExtended = [...techStack, ...techStack, ...techStack];
  const creativeToolsExtended = [...creativeTools, ...creativeTools, ...creativeTools];

  return (
    <section className="tech-stack-section" id="tech-stack">
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
              <TechCard key={`tech-${index}`} tech={tech} index={index} />
            ))}
          </div>
        </div>

        {/* Creative Tools Marquee - Scroll Right to Left */}
        <div className="marquee-container">
          <div className="marquee-track marquee-right-to-left">
            {creativeToolsExtended.map((tool, index) => (
              <TechCard key={`creative-${index}`} tech={tool} index={index} />
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