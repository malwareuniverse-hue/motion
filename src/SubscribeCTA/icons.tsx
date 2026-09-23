import React from "react";

type IconProps = { color: string; size?: number };

export const PlayMark: React.FC<IconProps> = ({ color, size = 40 }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 40 29" fill="none">
    <rect
      x={1}
      y={1}
      width={38}
      height={27}
      rx={8}
      stroke={color}
      strokeWidth={1.6}
    />
    <path d="M16.5 9.6l8.4 4.9-8.4 4.9V9.6z" fill={color} />
  </svg>
);
