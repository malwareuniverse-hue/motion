import React from "react";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { T } from "./timeline";

const WINDOWS = [
  { x: 236, y: 92, w: 26, h: 30 },
  { x: 270, y: 92, w: 26, h: 30 },
  { x: 236, y: 132, w: 26, h: 22 },
  { x: 270, y: 132, w: 26, h: 22 },
  { x: 306, y: 132, w: 40, h: 22 },
  { x: 352, y: 132, w: 30, h: 22 },
];

export const VillaArt: React.FC<{ frame: number; entryDelay: number }> = ({ frame, entryDelay }) => {
  const start = T.heroStart + entryDelay;
  const reveal = clampedInterp(frame, [start, start + T.heroDur], [0, 1]);
  const shimmerX = clampedInterp(frame, [start, start + 160], [-30, 130]);

  if (reveal <= 0) return null;

  return (
    <svg
      viewBox="0 0 400 220"
      width="100%"
      height="100%"
      style={{ display: "block", opacity: reveal }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="pace-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyTop} />
          <stop offset="55%" stopColor={palette.skyMid} />
          <stop offset="100%" stopColor={palette.skyLow} />
        </linearGradient>
        <linearGradient id="pace-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.seaLight} />
          <stop offset="100%" stopColor={palette.sea} />
        </linearGradient>
        <linearGradient id="pace-shimmer" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>

      <rect x={0} y={0} width={400} height={150} fill="url(#pace-sky)" />
      <rect x={0} y={150} width={400} height={70} fill="url(#pace-sea)" />

      {/* horizon glow */}
      <rect x={0} y={140} width={400} height={20} fill={palette.skyLow} opacity={0.35} />

      {/* palms */}
      <g opacity={0.85} stroke={palette.bg} strokeWidth={2.4} strokeLinecap="round" fill="none">
        <path d="M28 160V116" />
        <path d="M28 118c-10-8-16-6-20-14M28 118c8-10 14-9 22-15M28 122c-9-4-16 0-22-6M28 122c9-3 15 1 21-5" />
        <path d="M372 158V122" />
        <path d="M372 124c-8-7-13-5-17-12M372 124c7-8 12-7 18-13" />
      </g>

      {/* villa body */}
      <g>
        <rect x={220} y={120} width={172} height={44} fill={palette.bg} opacity={0.94} />
        <rect x={228} y={80} width={100} height={44} fill={palette.bg} opacity={0.94} />
        <rect x={220} y={160} width={172} height={6} fill={palette.gold} opacity={0.5} />
      </g>

      {/* windows */}
      {WINDOWS.map((w, i) => {
        const wStart = start + 4 + i * T.windowStagger;
        const glow = clampedInterp(frame, [wStart, wStart + T.windowDur], [0, 1]);
        return (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width={w.w}
            height={w.h}
            rx={1.5}
            fill={palette.skyLow}
            opacity={0.25 + glow * 0.65}
          />
        );
      })}

      {/* pool */}
      <rect x={30} y={168} width={340} height={30} rx={4} fill={palette.seaLight} opacity={0.9} />
      <rect x={30} y={168} width={340} height={30} rx={4} fill="url(#pace-shimmer)" transform={`translate(${shimmerX * 3.4} 0)`} />
      <rect x={30} y={168} width={340} height={4} fill={palette.goldSoft} opacity={0.4} />

      {/* deck line */}
      <rect x={0} y={198} width={400} height={22} fill={palette.bg} opacity={0.9} />
    </svg>
  );
};
