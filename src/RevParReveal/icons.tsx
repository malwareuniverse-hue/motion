import React from "react";
import { palette } from "./theme";

type HouseIconProps = { size?: number; color?: string };

export const HouseIcon: React.FC<HouseIconProps> = ({
  size = 64,
  color = palette.softWhite,
}) => (
  <svg width={size} height={size * 0.88} viewBox="0 0 64 56" fill="none">
    <path
      d="M4 28 L32 6 L60 28"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 24 V50 H52 V24"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="27"
      y="33"
      width="10"
      height="17"
      stroke={color}
      strokeWidth={2.5}
    />
  </svg>
);

type NightsStripProps = {
  filled: number;
  total: number;
  color?: string;
  fillColor?: string;
  cell?: number;
};

export const NightsStrip: React.FC<NightsStripProps> = ({
  filled,
  total,
  color = palette.mutedGraySoft,
  fillColor = palette.warmGold,
  cell = 16,
}) => (
  <svg width={total * cell} height={cell * 0.75}>
    {Array.from({ length: total }).map((_, i) => (
      <rect
        key={i}
        x={i * cell}
        y={0}
        width={cell * 0.72}
        height={cell * 0.72}
        rx={3}
        fill={i < filled ? fillColor : "none"}
        stroke={i < filled ? fillColor : color}
        strokeWidth={1.5}
      />
    ))}
  </svg>
);

type PriceTagIconProps = { size?: number; color?: string };

export const PriceTagIcon: React.FC<PriceTagIconProps> = ({
  size = 40,
  color = palette.warmGold,
}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      d="M5 19 L19 5 H34 V20 L20 34 Z"
      stroke={color}
      strokeWidth={2.5}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx="26" cy="13" r="3" stroke={color} strokeWidth={2} />
  </svg>
);
