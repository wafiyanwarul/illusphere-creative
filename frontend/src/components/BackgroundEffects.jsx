import React, { useEffect, useRef } from 'react';
import './BackgroundEffects.css';

export const BackgroundEffects = () => {
  const cursorGlowRef = useRef(null);
  const cursorTrailRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }

      // Create trail particle
      if (cursorTrailRef.current && Math.random() > 0.7) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail-particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = particle.style.width;
        cursorTrailRef.current.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 500);
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .portfolio-card, .service-card, .benefit-card')) {
        if (cursorGlowRef.current) {
          cursorGlowRef.current.classList.add('cursor-hover');
        }
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, .portfolio-card, .service-card, .benefit-card')) {
        if (cursorGlowRef.current) {
          cursorGlowRef.current.classList.remove('cursor-hover');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Animated Gradient Mesh Background */}
      <div className="gradient-mesh-bg">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
        <div className="gradient-blob gradient-blob-3"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="grid-pattern-overlay"></div>

      {/* Floating Geometric Particles */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="geometric-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 30}s`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              opacity: Math.random() * 0.2 + 0.1
            }}
          />
        ))}
      </div>

      {/* Custom Cursor Glow */}
      <div ref={cursorGlowRef} className="cursor-glow"></div>
      
      {/* Cursor Trail Container */}
      <div ref={cursorTrailRef} className="cursor-trail-container"></div>
    </>
  );
};