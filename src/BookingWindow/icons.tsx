import React from "react";
import { palette } from "./theme";

type PinIconProps = { size?: number; color?: string };

export const PinIcon: React.FC<PinIconProps> = ({
  size = 22,
  color = palette.warmGold,
}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 22 28" fill="none">
    <path
      d="M11 27C11 27 20 17.6 20 10.5C20 5.25 15.9706 1 11 1C6.02944 1 2 5.25 2 10.5C2 17.6 11 27 11 27Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <circle cx="11" cy="10.5" r="3.5" fill={color} />
  </svg>
);
