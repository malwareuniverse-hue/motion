import React from "react";

type IconProps = { color: string; size?: number };

export const MapPinIcon: React.FC<IconProps> = ({ color, size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-6.1 7-11.6A7 7 0 0 0 5 9.4C5 14.9 12 21 12 21z"
      fill={color}
      stroke={color}
      strokeWidth={1}
      strokeLinejoin="round"
    />
    <circle cx={12} cy={9.4} r={2.6} fill="#0B0D11" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ color, size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.5l2.9 6.06 6.6.85-4.86 4.58 1.28 6.6L12 17.6l-5.92 3-1.28-6.6-4.86-4.58 6.6-.85z" />
  </svg>
);

export const PoolIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 15c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M7 10.5V6a2 2 0 1 1 4 0v4.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const HotTubIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={11} r={7} stroke={color} strokeWidth={1.5} />
    <path d="M9 11c.6.8 1.4.8 2 0s1.4-.8 2 0 1.4.8 2 0" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    <path d="M5 19h14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ color, size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12.5l5 5.5L20 6" stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ color, size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.1} strokeLinecap="round" />
  </svg>
);
