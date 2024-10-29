import React from 'react';

interface AppIconProps {
  size?: number;
  maskable?: boolean;
}

export default function AppIcon({ size = 512, maskable = false }: AppIconProps) {
  const padding = maskable ? size * 0.1 : 0;
  const innerSize = size - (padding * 2);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {maskable && (
        <rect width={size} height={size} fill="#ffffff" />
      )}
      <rect
        x={padding}
        y={padding}
        width={innerSize}
        height={innerSize}
        rx={innerSize / 2}
        fill="url(#gradient)"
      />
      <path
        d={`M${size/2} ${size/3} 
           C${size/3} ${size/3} ${size/3} ${2*size/3} ${size/2} ${2*size/3}
           C${2*size/3} ${2*size/3} ${2*size/3} ${size/3} ${size/2} ${size/3}Z`}
        fill="white"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2={size}
          y2={size}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}