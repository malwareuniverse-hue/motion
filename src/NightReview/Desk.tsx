import React from "react";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { T } from "./timeline";

export const Desk: React.FC<{ frame: number }> = ({ frame }) => {
  const t = clampedInterp(frame, [T.deskStart, T.deskStart + T.deskDur], [0, 1]);
  if (t <= 0) return null;

  const steamPhase = (frame - T.deskStart) / 30;
  const steam1 = Math.sin(steamPhase) * 6;
  const steam2 = Math.sin(steamPhase + 1.4) * 5;

  return (
    <svg
      viewBox="0 0 1080 1350"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, display: "block", opacity: t }}
    >
      <defs>
        <linearGradient id="nr-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B1D22" />
          <stop offset="100%" stopColor="#0B0C0F" />
        </linearGradient>
      </defs>

      <rect x={0} y={1030} width={1080} height={320} fill="url(#nr-desk)" />
      <rect x={0} y={1030} width={1080} height={5} fill={palette.gold} opacity={0.35} />

      {/* coffee cup */}
      <g transform="translate(860 1000)">
        <path
          d={`M4 ${16 + steam1} Q10 ${-4 + steam1} 4 ${-16 + steam1}`}
          stroke={palette.creamFaint}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
        />
        <path
          d={`M22 ${16 + steam2} Q28 ${-4 + steam2} 22 ${-16 + steam2}`}
          stroke={palette.creamFaint}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          opacity={0.4}
        />
        <path d="M-6 20 h42 l-6 46 a20 20 0 0 1 -30 0 z" fill={palette.ink} stroke={palette.gold} strokeWidth={2} opacity={0.9} />
        <path d="M36 34 q18 0 18 16 q0 16 -18 16" stroke={palette.gold} strokeWidth={3} fill="none" opacity={0.7} />
      </g>
    </svg>
  );
};
