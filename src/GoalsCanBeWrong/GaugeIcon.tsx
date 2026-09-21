import React from "react";
import { palette } from "./theme";

/**
 * An occupancy gauge: a half-circle dial with a marked target zone at its
 * top and a needle resting off to one side of it. Reads as "the dial has a
 * right answer, the needle is not on it" — the same missed-mark idea as
 * TargetIcon, in a metered rather than aimed shape, since occupancy is
 * read off a percentage rather than hit like a target.
 */
export const GaugeIcon: React.FC<{ size?: number }> = ({ size = 132 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 14 84 A 46 46 0 0 1 106 84"
      stroke={palette.warmGold}
      strokeOpacity={0.4}
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* tick marks around the dial */}
    {[
      [20, 78, 27, 82],
      [34, 46, 40, 52],
      [86, 46, 80, 52],
      [100, 78, 93, 82],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={palette.warmGold}
        strokeOpacity={0.4}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    ))}
    {/* the target zone, marked at the top of the dial */}
    <line
      x1="60"
      y1="16"
      x2="60"
      y2="26"
      stroke={palette.softWhite}
      strokeOpacity={0.85}
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* needle, resting off to one side of the target zone */}
    <line
      x1="60"
      y1="90"
      x2="33"
      y2="44"
      stroke={palette.warmGold}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="60" cy="90" r="5" fill={palette.warmGold} />
  </svg>
);
