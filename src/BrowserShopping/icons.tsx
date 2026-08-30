import React from "react";

type IconProps = { color: string; size?: number };

export const StarIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.5l2.9 6.06 6.6.85-4.86 4.58 1.28 6.6L12 17.6l-5.92 3-1.28-6.6-4.86-4.58 6.6-.85z" />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-6.1 7-11.6A7 7 0 0 0 5 9.4C5 14.9 12 21 12 21z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <circle cx={12} cy={9.4} r={2.4} stroke={color} strokeWidth={1.5} />
  </svg>
);

export const WifiIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 9.5a12 12 0 0 1 16 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    <path d="M7.3 13a7.6 7.6 0 0 1 9.4 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    <path d="M10.4 16.4a3.2 3.2 0 0 1 3.2 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    <circle cx={12} cy={19} r={1.1} fill={color} />
  </svg>
);

export const PoolIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 15c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    <path d="M3 19.5c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    <path d="M7 10.5V6a2 2 0 1 1 4 0v4.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const HotTubIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={11} r={7} stroke={color} strokeWidth={1.6} />
    <path d="M9 11c.6.8 1.4.8 2 0s1.4-.8 2 0 1.4.8 2 0" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <path d="M5 19h14" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

export const KitchenIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 3v8a3 3 0 0 0 6 0V3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M8 11v10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M16 3v7a2 2 0 0 1-2 2v0" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <path d="M16 3v18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const ParkingIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x={4} y={4} width={16} height={16} rx={3} stroke={color} strokeWidth={1.5} />
    <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ color, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 20s-7.5-4.7-9.8-9.4C.7 7 2.5 3.6 6 3c2.3-.4 4.4.8 6 3 1.6-2.2 3.7-3.4 6-3 3.5.6 5.3 4 4 7.6C19.5 15.3 12 20 12 20z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ color, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12.5l5 5.5L20 6" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AMENITY_ICON: Record<string, React.FC<IconProps>> = {
  wifi: WifiIcon,
  pool: PoolIcon,
  hottub: HotTubIcon,
  kitchen: KitchenIcon,
  parking: ParkingIcon,
};
