import React from "react";

type IconProps = { color: string; size?: number };

export const BedIcon: React.FC<IconProps> = ({ color, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 17V7.5C3 6.67157 3.67157 6 4.5 6H9.5C10.3284 6 11 6.67157 11 7.5V11"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <path
      d="M13 11V7.5C13 6.67157 13.6716 6 14.5 6H19.5C20.3284 6 21 6.67157 21 7.5V17"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <path d="M2 20V13.5C2 12.6716 2.67157 12 3.5 12H20.5C21.3284 12 22 12.6716 22 13.5V20" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <path d="M2 20V17H22V20" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const SleepsIcon: React.FC<IconProps> = ({ color, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={8.5} cy={7.5} r={2.5} stroke={color} strokeWidth={1.4} />
    <circle cx={16} cy={9} r={2} stroke={color} strokeWidth={1.4} />
    <path d="M3 19c0-3.038 2.462-5.5 5.5-5.5S14 15.962 14 19" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <path d="M14.5 19c0-2.2 1.79-4 4-4s4 1.8 4 4" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const PoolIcon: React.FC<IconProps> = ({ color, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2 8h20" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <rect x={4} y={4} width={16} height={4} rx={2} stroke={color} strokeWidth={1.3} />
    <path d="M2 14c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <path d="M2 19c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const BeachIcon: React.FC<IconProps> = ({ color, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7 3 3 8 3 13h18c0-5-4-10-9-10z" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
    <path d="M12 3v3" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <path d="M12 13v8" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <path d="M12 21l-4-3" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ color, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12.5l5 5.5L20 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DotIcon: React.FC<IconProps> = ({ color, size = 8 }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" fill="none">
    <circle cx={4} cy={4} r={3} stroke={color} strokeWidth={1.3} />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ color, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.5l2.9 6.06 6.6.85-4.86 4.58 1.28 6.6L12 17.6l-5.92 3-1.28-6.6-4.86-4.58 6.6-.85z" />
  </svg>
);
