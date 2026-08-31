import React from "react";

type IconProps = { color: string; size?: number };

export const StarIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.5l2.9 6.06 6.6.85-4.86 4.58 1.28 6.6L12 17.6l-5.92 3-1.28-6.6-4.86-4.58 6.6-.85z" />
  </svg>
);

export const BedIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 17V7.5a1.5 1.5 0 0 1 1.5-1.5H9a1.5 1.5 0 0 1 1.5 1.5V11" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M13.5 11V7.5A1.5 1.5 0 0 1 15 6h4.5A1.5 1.5 0 0 1 21 7.5V17" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M2 19.5V14a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M2 19.5V17h20v2.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const PoolIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 15c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M3 19.5c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M7 10.5V6a2 2 0 1 1 4 0v4.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const FlagIcon: React.FC<IconProps> = ({ color, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 3v18" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    <path d="M5 4h12l-3 4 3 4H5" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
  </svg>
);

export const ArrowDownIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 4v16M12 20l-6-6M12 20l6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
