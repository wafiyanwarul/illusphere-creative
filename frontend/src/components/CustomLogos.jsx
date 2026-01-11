import React from 'react';

// DaVinci Resolve - 3 colored circles
export const DaVinciResolveLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top circle - Cyan/Blue */}
    <circle cx="32" cy="18" r="10" fill={isHovered ? "#00AEEF" : "#FFFFFF"} opacity={isHovered ? 1 : 0.7} />
    {/* Bottom-left circle - Yellow/Lime */}
    <circle cx="20" cy="40" r="10" fill={isHovered ? "#B4D136" : "#FFFFFF"} opacity={isHovered ? 1 : 0.7} />
    {/* Bottom-right circle - Red/Pink */}
    <circle cx="44" cy="40" r="10" fill={isHovered ? "#E94B3C" : "#FFFFFF"} opacity={isHovered ? 1 : 0.7} />
  </svg>
);

// Figma - 5 colored circles in specific pattern
export const FigmaLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {isHovered ? (
      <>
        {/* Left column - Red, Orange, Green */}
        <circle cx="22" cy="16" r="8" fill="#F24E1E" />
        <circle cx="22" cy="32" r="8" fill="#FF7262" />
        <circle cx="22" cy="48" r="8" fill="#0ACF83" />
        {/* Right column - Purple, Blue */}
        <circle cx="42" cy="16" r="8" fill="#A259FF" />
        <circle cx="42" cy="32" r="8" fill="#1ABCFE" />
      </>
    ) : (
      <>
        <circle cx="22" cy="16" r="8" fill="#FFFFFF" opacity="0.7" />
        <circle cx="22" cy="32" r="8" fill="#FFFFFF" opacity="0.7" />
        <circle cx="22" cy="48" r="8" fill="#FFFFFF" opacity="0.7" />
        <circle cx="42" cy="16" r="8" fill="#FFFFFF" opacity="0.7" />
        <circle cx="42" cy="32" r="8" fill="#FFFFFF" opacity="0.7" />
      </>
    )}
  </svg>
);

// Python - Clean two-tone intertwined snakes
export const PythonLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {isHovered ? (
      <>
        {/* Blue snake - top left */}
        <path 
          d="M32 10C25 10 19 14 19 20V32H32V34H16C12 34 10 38 10 42C10 48 14 52 18 52H24V44C24 38 28 34 32 34H44C48 34 52 30 52 26V16C52 12 48 10 44 10H32ZM28 15C29.66 15 31 16.34 31 18C31 19.66 29.66 21 28 21C26.34 21 25 19.66 25 18C25 16.34 26.34 15 28 15Z" 
          fill="#3776AB"
        />
        {/* Yellow snake - bottom right */}
        <path 
          d="M32 54C39 54 45 50 45 44V32H32V30H48C52 30 54 26 54 22C54 16 50 12 46 12H40V20C40 26 36 30 32 30H20C16 30 12 34 12 38V48C12 52 16 54 20 54H32ZM36 49C34.34 49 33 47.66 33 46C33 44.34 34.34 43 36 43C37.66 43 39 44.34 39 46C39 47.66 37.66 49 36 49Z" 
          fill="#FFD43B"
        />
      </>
    ) : (
      <>
        <path 
          d="M32 10C25 10 19 14 19 20V32H32V34H16C12 34 10 38 10 42C10 48 14 52 18 52H24V44C24 38 28 34 32 34H44C48 34 52 30 52 26V16C52 12 48 10 44 10H32ZM28 15C29.66 15 31 16.34 31 18C31 19.66 29.66 21 28 21C26.34 21 25 19.66 25 18C25 16.34 26.34 15 28 15Z" 
          fill="#FFFFFF" 
          opacity="0.7"
        />
        <path 
          d="M32 54C39 54 45 50 45 44V32H32V30H48C52 30 54 26 54 22C54 16 50 12 46 12H40V20C40 26 36 30 32 30H20C16 30 12 34 12 38V48C12 52 16 54 20 54H32ZM36 49C34.34 49 33 47.66 33 46C33 44.34 34.34 43 36 43C37.66 43 39 44.34 39 46C39 47.66 37.66 49 36 49Z" 
          fill="#FFFFFF" 
          opacity="0.7"
        />
      </>
    )}
  </svg>
);

// Blender - Star/arrow in circle
export const BlenderLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {isHovered ? (
      <>
        {/* Orange circle background */}
        <circle cx="32" cy="32" r="28" fill="#E87D0D" />
        {/* Blue inner star/arrow shape */}
        <path 
          d="M32 12L38 24L50 26L41 35L43 48L32 42L21 48L23 35L14 26L26 24L32 12Z" 
          fill="#265787"
        />
        {/* White center highlight */}
        <circle cx="32" cy="32" r="8" fill="#FFFFFF" opacity="0.9" />
      </>
    ) : (
      <>
        <circle cx="32" cy="32" r="28" fill="#FFFFFF" opacity="0.7" />
        <path 
          d="M32 12L38 24L50 26L41 35L43 48L32 42L21 48L23 35L14 26L26 24L32 12Z" 
          fill="#FFFFFF" 
          opacity="0.5"
        />
        <circle cx="32" cy="32" r="8" fill="#0A0A0A" opacity="0.3" />
      </>
    )}
  </svg>
);

// Premiere Pro - Purple gradient
export const PremiereLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="prGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9999FF" />
        <stop offset="100%" stopColor="#EA77FF" />
      </linearGradient>
    </defs>
    <rect 
      x="8" 
      y="8" 
      width="48" 
      height="48" 
      rx="6" 
      fill={isHovered ? "url(#prGradient)" : "#FFFFFF"} 
      opacity={isHovered ? 1 : 0.7}
    />
    <text 
      x="32" 
      y="42" 
      fontSize="28" 
      fontWeight="bold" 
      textAnchor="middle" 
      fill={isHovered ? "#FFFFFF" : "#0A0A0A"}
      fontFamily="Arial, sans-serif"
    >
      Pr
    </text>
  </svg>
);

// After Effects - Purple
export const AfterEffectsLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect 
      x="8" 
      y="8" 
      width="48" 
      height="48" 
      rx="6" 
      fill={isHovered ? "#9999FF" : "#FFFFFF"} 
      opacity={isHovered ? 1 : 0.7}
    />
    <text 
      x="32" 
      y="42" 
      fontSize="28" 
      fontWeight="bold" 
      textAnchor="middle" 
      fill={isHovered ? "#FFFFFF" : "#0A0A0A"}
      fontFamily="Arial, sans-serif"
    >
      Ae
    </text>
  </svg>
);
