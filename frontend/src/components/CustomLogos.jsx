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

// Python - Two-tone snake (Blue and Yellow)
export const PythonLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {isHovered ? (
      <>
        {/* Blue snake top */}
        <path d="M32 8C24 8 18 14 18 22V32H32V34H18C14 34 10 38 10 42C10 48 14 52 18 52H24V44C24 38 28 34 32 34H42C46 34 50 30 50 26V16C50 12 46 8 42 8H32Z" fill="#3776AB" />
        <circle cx="26" cy="16" r="2.5" fill="#FFFFFF" />
        {/* Yellow snake bottom */}
        <path d="M32 56C40 56 46 50 46 42V32H32V30H46C50 30 54 26 54 22C54 16 50 12 46 12H40V20C40 26 36 30 32 30H22C18 30 14 34 14 38V48C14 52 18 56 22 56H32Z" fill="#FFD43B" />
        <circle cx="38" cy="48" r="2.5" fill="#3776AB" />
      </>
    ) : (
      <>
        <path d="M32 8C24 8 18 14 18 22V32H32V34H18C14 34 10 38 10 42C10 48 14 52 18 52H24V44C24 38 28 34 32 34H42C46 34 50 30 50 26V16C50 12 46 8 42 8H32Z" fill="#FFFFFF" opacity="0.7" />
        <circle cx="26" cy="16" r="2.5" fill="#0A0A0A" />
        <path d="M32 56C40 56 46 50 46 42V32H32V30H46C50 30 54 26 54 22C54 16 50 12 46 12H40V20C40 26 36 30 32 30H22C18 30 14 34 14 38V48C14 52 18 56 22 56H32Z" fill="#FFFFFF" opacity="0.7" />
        <circle cx="38" cy="48" r="2.5" fill="#0A0A0A" />
      </>
    )}
  </svg>
);

// Blender - Orange and Blue
export const BlenderLogo = ({ size = 56, isHovered }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {isHovered ? (
      <>
        {/* Orange outer circle */}
        <circle cx="32" cy="32" r="26" fill="#E87D0D" />
        {/* Blue inner circle */}
        <circle cx="32" cy="32" r="16" fill="#265787" />
        {/* White center dot */}
        <circle cx="32" cy="32" r="6" fill="#FFFFFF" />
      </>
    ) : (
      <>
        <circle cx="32" cy="32" r="26" fill="#FFFFFF" opacity="0.7" />
        <circle cx="32" cy="32" r="16" fill="#FFFFFF" opacity="0.5" />
        <circle cx="32" cy="32" r="6" fill="#0A0A0A" opacity="0.3" />
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
