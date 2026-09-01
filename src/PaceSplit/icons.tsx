import React from "react";

type IconProps = { color: string; size?: number };

export const CheckIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12.5l5 5.5L20 6" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ color, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M15 5l-7 7 7 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ color, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 5l7 7-7 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrendUpIcon: React.FC<IconProps> = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 16l6-6 4 4 8-9" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 5h7v7" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TrendDownIcon: React.FC<IconProps> = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 8l6 6 4-4 8 9" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 19h7v-7" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} />
    <circle cx={12} cy={12} r={5} stroke={color} strokeWidth={1.6} />
    <circle cx={12} cy={12} r={1.4} fill={color} />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

export const BarsIcon: React.FC<IconProps> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 20V13M11 20V8M18 20V4" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

export const LineChartIcon: React.FC<IconProps> = ({ color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 17l5-5 4 3 9-10" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 5h5v5" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
