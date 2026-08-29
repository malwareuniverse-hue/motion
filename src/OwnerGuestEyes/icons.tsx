import React from "react";

type IconProps = { color: string; size?: number };

export const EyeIcon: React.FC<IconProps> = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M2 12C4 7.5 7.6 5 12 5s8 2.5 10 7c-2 4.5-5.6 7-10 7s-8-2.5-10-7z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <circle cx={12} cy={12} r={3.1} stroke={color} strokeWidth={1.5} />
    <circle cx={12} cy={12} r={0.9} fill={color} />
  </svg>
);

export const StarIcon: React.FC<{ color: string; size?: number; filled?: boolean }> = ({
  color,
  size = 12,
  filled = true,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}>
    <path
      d="M12 2.5l2.9 6.06 6.6.85-4.86 4.58 1.28 6.6L12 17.6l-5.92 3-1.28-6.6-4.86-4.58 6.6-.85z"
      stroke={filled ? "none" : color}
      strokeWidth={filled ? 0 : 1.4}
    />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} />
    <circle cx={12} cy={12} r={2.6} fill={color} />
  </svg>
);

export const CursorRing: React.FC<{ color: string; size?: number }> = ({ color, size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 46 46" fill="none">
    <circle cx={23} cy={23} r={20} stroke={color} strokeWidth={2} strokeDasharray="4 5" />
  </svg>
);
