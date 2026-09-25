import React from "react";

type P = { color: string; size?: number; strokeWidth?: number };

// Film strip / moving picture icon
export const FilmIcon: React.FC<P & { scrollOffset?: number }> = ({
  color, size = 36, strokeWidth = 1.4, scrollOffset = 0,
}) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={{ overflow: "visible" }}>
    {/* Main strip body */}
    <rect x={5} y={9} width={26} height={18} rx={2} stroke={color} strokeWidth={strokeWidth} />
    {/* Sprocket holes left column */}
    {[13, 18, 23].map((y) => (
      <rect key={y} x={7} y={y - 1.5} width={3} height={3} rx={0.7} fill={color} opacity={0.5} />
    ))}
    {/* Sprocket holes right column */}
    {[13, 18, 23].map((y) => (
      <rect key={y} x={26} y={y - 1.5} width={3} height={3} rx={0.7} fill={color} opacity={0.5} />
    ))}
    {/* Film frames (2 frames visible, scrolled) */}
    {[0, 1].map((i) => {
      const x = 12 + i * 11 + (scrollOffset % 11);
      return <rect key={i} x={x} y={12} width={8} height={12} rx={1} stroke={color} strokeWidth={strokeWidth * 0.8} opacity={0.7} />;
    })}
    {/* Play triangle */}
    <path d="M16 16.5 L20.5 18 L16 19.5 Z" fill={color} opacity={0.9} />
  </svg>
);

// Camera aperture / snapshot icon
export const CameraIcon: React.FC<P & { apertureAngle?: number }> = ({
  color, size = 36, strokeWidth = 1.4, apertureAngle = 0,
}) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    {/* Camera body */}
    <rect x={4} y={10} width={28} height={20} rx={3} stroke={color} strokeWidth={strokeWidth} />
    {/* Lens circle */}
    <circle cx={18} cy={20} r={7} stroke={color} strokeWidth={strokeWidth} />
    <circle cx={18} cy={20} r={4} stroke={color} strokeWidth={strokeWidth * 0.7} opacity={0.6} />
    {/* Shutter button bump */}
    <rect x={14} y={7} width={5} height={4} rx={1.5} stroke={color} strokeWidth={strokeWidth} />
    {/* Aperture blades (3 lines through center, rotated) */}
    {[0, 60, 120].map((deg) => {
      const angle = (deg + apertureAngle) * (Math.PI / 180);
      const dx = Math.cos(angle) * 5.5;
      const dy = Math.sin(angle) * 5.5;
      return (
        <line
          key={deg}
          x1={18 - dx} y1={20 - dy}
          x2={18 + dx} y2={20 + dy}
          stroke={color}
          strokeWidth={strokeWidth * 0.6}
          opacity={0.45}
        />
      );
    })}
  </svg>
);

// Timeline / horizontal track with dots
export const TimelineIcon: React.FC<P & { progress?: number }> = ({
  color, size = 36, strokeWidth = 1.4, progress = 1,
}) => {
  const trackWidth = size * 0.75;
  const dotCount = 5;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Track line */}
      <line
        x1={(size - trackWidth) / 2} y1={size / 2}
        x2={(size - trackWidth) / 2 + trackWidth * progress} y2={size / 2}
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
      />
      {/* Ghost track */}
      <line
        x1={(size - trackWidth) / 2} y1={size / 2}
        x2={(size - trackWidth) / 2 + trackWidth} y2={size / 2}
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.18}
      />
      {/* Dots */}
      {Array.from({ length: dotCount }, (_, i) => {
        const x = (size - trackWidth) / 2 + (trackWidth / (dotCount - 1)) * i;
        const show = (i / (dotCount - 1)) <= progress;
        return (
          <circle key={i} cx={x} cy={size / 2} r={size * 0.065}
            fill={show ? color : "transparent"}
            stroke={color} strokeWidth={strokeWidth * 0.7}
            opacity={show ? 1 : 0.25}
          />
        );
      })}
    </svg>
  );
};

// Diverging paths / fork icon
export const ForkIcon: React.FC<P> = ({ color, size = 28, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M14 6 L14 13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M14 13 L7 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M14 13 L21 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <circle cx={14} cy={6} r={2} fill={color} />
    <circle cx={7} cy={22} r={2} fill={color} opacity={0.75} />
    <circle cx={21} cy={22} r={2} fill={color} opacity={0.75} />
  </svg>
);

// Occupancy ring
export const OccupancyRing: React.FC<P & { pct: number; radius?: number }> = ({
  color, size = 80, pct, radius = 30, strokeWidth = 3,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={cx} cy={cy} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
      <circle
        cx={cx} cy={cy} r={radius}
        stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
      />
    </svg>
  );
};
