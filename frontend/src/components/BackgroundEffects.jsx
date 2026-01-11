import React, { useEffect, useRef, useState, useCallback } from 'react';
import './BackgroundEffects.css';

// Generate random particles with varied properties - defined outside component
function generateParticles(count) {
  const shapes = ['square', 'triangle', 'circle', 'diamond'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: shapes[i % shapes.length],
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 10 + 10, // 10-20px
    animationDelay: Math.random() * -40,
    animationDuration: Math.random() * 20 + 20, // 20-40s
    rotationDuration: Math.random() * 30 + 20, // 20-50s
    opacityBase: Math.random() * 0.05 + 0.05, // 0.05-0.1
  }));
}

export const BackgroundEffects = () => {
  const cursorGlowRef = useRef(null);
  const cursorRippleRef = useRef(null);
  const trailParticlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const lastTrailTimeRef = useRef(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [particles] = useState(() => generateParticles(18));

  // Create trail particle with throttling
  const createTrailParticle = useCallback((x, y) => {
    const now = Date.now();
    if (now - lastTrailTimeRef.current < 50) return; // Throttle to ~20fps
    lastTrailTimeRef.current = now;

    // Limit max particles
    if (trailParticlesRef.current.length >= 10) {
      const oldParticle = trailParticlesRef.current.shift();
      oldParticle?.remove();
    }

    const particle = document.createElement('div');
    particle.className = 'cursor-trail-particle';
    
    // Random offset for organic feel
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    const size = Math.random() * 3 + 5; // 5-8px

    particle.style.cssText = `
      left: ${x + offsetX}px;
      top: ${y + offsetY}px;
      width: ${size}px;
      height: ${size}px;
    `;

    document.body.appendChild(particle);
    trailParticlesRef.current.push(particle);

    // Remove after animation
    setTimeout(() => {
      particle.remove();
      trailParticlesRef.current = trailParticlesRef.current.filter(p => p !== particle);
    }, 600);
  }, []);

  // Create ripple effect on hover
  const createRipple = useCallback((x, y) => {
    if (!cursorRippleRef.current) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.cssText = `
      left: ${x}px;
      top: ${y}px;
    `;
    
    cursorRippleRef.current.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }, []);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouchDevice();

    if (isTouchDevice) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Smooth cursor following with requestAnimationFrame
    const updateCursorPosition = () => {
      if (!cursorGlowRef.current) return;

      const { x: targetX, y: targetY } = mousePositionRef.current;
      const { x: currentX, y: currentY } = currentPositionRef.current;

      // Smooth interpolation (easing)
      const ease = 0.15;
      const newX = currentX + (targetX - currentX) * ease;
      const newY = currentY + (targetY - currentY) * ease;

      currentPositionRef.current = { x: newX, y: newY };

      cursorGlowRef.current.style.transform = `translate(${newX - 10}px, ${newY - 10}px)`;

      animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      // Create trail particles on movement
      if (Math.random() > 0.6) {
        createTrailParticle(e.clientX, e.clientY);
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.closest('button, a, .portfolio-card, .service-card, .benefit-card, .testimonial-card, [data-hover], input, textarea, select')) {
        cursorGlowRef.current?.classList.add('cursor-hover');
        createRipple(e.clientX, e.clientY);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target.closest('button, a, .portfolio-card, .service-card, .benefit-card, .testimonial-card, [data-hover], input, textarea, select')) {
        cursorGlowRef.current?.classList.remove('cursor-hover');
      }
    };

    const handleMouseDown = () => {
      cursorGlowRef.current?.classList.add('cursor-click');
    };

    const handleMouseUp = () => {
      cursorGlowRef.current?.classList.remove('cursor-click');
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Cleanup trail particles
      trailParticlesRef.current.forEach(p => p.remove());
    };
  }, [isTouchDevice, createTrailParticle, createRipple]);

  // Don't render cursor effects on touch devices
  const renderCursorEffects = !isTouchDevice;

  return (
    <>
      {/* Animated Gradient Mesh Background */}
      <div className="gradient-mesh-bg" aria-hidden="true">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
        <div className="gradient-blob gradient-blob-3"></div>
        <div className="gradient-blob gradient-blob-4"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="grid-pattern-overlay" aria-hidden="true"></div>

      {/* Floating Geometric Particles */}
      <div className="floating-particles" aria-hidden="true">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`geometric-particle particle-${particle.shape}`}
            style={{
              '--particle-left': `${particle.left}%`,
              '--particle-top': `${particle.top}%`,
              '--particle-size': `${particle.size}px`,
              '--float-delay': `${particle.animationDelay}s`,
              '--float-duration': `${particle.animationDuration}s`,
              '--rotate-duration': `${particle.rotationDuration}s`,
              '--opacity-base': particle.opacityBase,
            }}
          />
        ))}
      </div>

      {/* Custom Cursor Effects - Only on non-touch devices */}
      {renderCursorEffects && (
        <>
          <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true">
            <div className="cursor-glow-inner"></div>
            <div className="cursor-glow-outer"></div>
          </div>
          <div ref={cursorRippleRef} className="cursor-ripple-container" aria-hidden="true"></div>
        </>
      )}
    </>
  );
};
