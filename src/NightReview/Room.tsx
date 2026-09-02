import React from "react";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { T } from "./timeline";

const SHELVES = [360, 470, 580, 690];
const SHELF_ITEMS = [
  { x: 40, w: 26, h: 46 },
  { x: 90, w: 18, h: 30 },
  { x: 150, w: 34, h: 38 },
  { x: 210, w: 20, h: 50 },
  { x: 260, w: 30, h: 34 },
];

const SKYLINE = [
  { x: 800, w: 60, h: 210 },
  { x: 862, w: 90, h: 320 },
  { x: 954, w: 70, h: 250 },
];

export const Room: React.FC<{ frame: number }> = ({ frame }) => {
  const roomT = clampedInterp(frame, [T.roomInStart, T.roomInStart + T.roomInDur], [0, 1]);
  const windowT = clampedInterp(frame, [T.windowInStart, T.windowInStart + T.windowInDur], [0, 1]);
  const lampT = clampedInterp(frame, [T.lampInStart, T.lampInStart + T.lampInDur], [0, 1]);
  const lampPulse = 0.75 + 0.25 * Math.sin((frame - T.lampInStart) / 18);

  return (
    <svg viewBox="0 0 1080 1350" width="100%" height="100%" style={{ position: "absolute", inset: 0, display: "block" }}>
      <defs>
        <linearGradient id="nr-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.wallLift} />
          <stop offset="100%" stopColor={palette.wallDark} />
        </linearGradient>
        <linearGradient id="nr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyTop} />
          <stop offset="100%" stopColor={palette.skyLow} />
        </linearGradient>
        <radialGradient id="nr-lamp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2C77E" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#F2C77E" stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={1080} height={1350} fill="url(#nr-wall)" opacity={roomT} />

      {/* bookshelf zone */}
      <g opacity={roomT}>
        <rect x={0} y={0} width={340} height={760} fill={palette.ink} opacity={0.35} />
        {SHELVES.map((y, i) => {
          const glowStart = T.shelfGlowStart + i * T.shelfGlowStagger;
          const glow = clampedInterp(frame, [glowStart, glowStart + T.shelfGlowDur], [0, 1]);
          return (
            <g key={y}>
              <rect x={16} y={y} width={300} height={6} fill={palette.gold} opacity={0.28 * glow} />
              <rect x={16} y={y + 6} width={300} height={14} fill="url(#nr-lamp-glow)" opacity={0.5 * glow} />
              {SHELF_ITEMS.slice(0, 3 + (i % 3)).map((it, j) => (
                <rect
                  key={j}
                  x={it.x}
                  y={y - it.h}
                  width={it.w}
                  height={it.h}
                  rx={3}
                  fill={palette.ink}
                  opacity={0.6 + 0.3 * glow}
                />
              ))}
            </g>
          );
        })}
      </g>

      {/* framed art */}
      <g opacity={roomT * 0.95}>
        <rect x={110} y={790} width={200} height={260} rx={4} fill="none" stroke={palette.gold} strokeWidth={4} opacity={0.6} />
        <rect x={124} y={804} width={172} height={232} fill={palette.wallDark} />
        <rect x={124} y={804} width={172} height={232} fill={palette.gold} opacity={0.08} />
        <path d="M124 960 L200 890 L250 940 L296 900 L296 1036 L124 1036 Z" fill={palette.gold} opacity={0.14} />
      </g>

      {/* window */}
      <g opacity={windowT}>
        <rect x={780} y={0} width={300} height={900} fill="url(#nr-sky)" />
        {SKYLINE.map((b, i) => (
          <rect key={i} x={b.x} y={900 - b.h} width={b.w} height={b.h} fill={palette.skyline} opacity={0.9} />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={790 + i * 100} y={0} width={4} height={900} fill={palette.wallDark} opacity={0.8} />
        ))}
        <rect x={780} y={0} width={300} height={900} fill="none" stroke={palette.wallDark} strokeWidth={10} />
      </g>

      {/* desk lamp */}
      <g opacity={lampT}>
        <circle cx={935} cy={790} r={70 * lampPulse} fill="url(#nr-lamp-glow)" />
        <path d="M905 760 q30 -46 66 -18" stroke={palette.gold} strokeWidth={5} strokeLinecap="round" fill="none" />
        <ellipse cx={975} cy={748} rx={30} ry={14} fill={palette.wallDark} stroke={palette.gold} strokeWidth={3} />
        <circle cx={975} cy={750} r={9} fill="#F2C77E" opacity={0.7 + 0.3 * lampPulse} />
      </g>

      {/* soft vignette */}
      <rect x={0} y={0} width={1080} height={1350} fill="black" opacity={0.18 * roomT} style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
};
