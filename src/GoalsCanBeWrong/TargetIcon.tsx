import React from "react";
import { palette } from "./theme";

/**
 * A missed target: three bullseye rings around a true centre, with an arrow
 * landed just outside the outer ring. Reads as "aimed at a number, landed
 * somewhere else" — the abstract shape for a goal that can be wrong, with
 * no literal dollar sign or price tag per the PBM system.
 */
export const TargetIcon: React.FC<{ size?: number }> = ({ size = 132 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="58"
      cy="60"
      r="46"
      stroke={palette.warmGold}
      strokeOpacity={0.35}
      strokeWidth="2.5"
    />
    <circle
      cx="58"
      cy="60"
      r="31"
      stroke={palette.warmGold}
      strokeOpacity={0.6}
      strokeWidth="2.5"
    />
    <circle
      cx="58"
      cy="60"
      r="16"
      stroke={palette.warmGold}
      strokeWidth="2.5"
    />
    <circle cx="58" cy="60" r="3.5" fill={palette.warmGold} />

    {/* arrow shaft, tail to landed tip outside the outer ring */}
    <line
      x1="18"
      y1="104"
      x2="97"
      y2="26"
      stroke={palette.warmGold}
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* fletching at the tail */}
    <line
      x1="18"
      y1="104"
      x2="29"
      y2="98"
      stroke={palette.warmGold}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="18"
      y1="104"
      x2="24"
      y2="113"
      stroke={palette.warmGold}
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* arrowhead at the landed tip */}
    <line
      x1="97"
      y1="26"
      x2="85"
      y2="30"
      stroke={palette.warmGold}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="97"
      y1="26"
      x2="92"
      y2="38"
      stroke={palette.warmGold}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
