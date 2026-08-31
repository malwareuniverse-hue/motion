import React from "react";
import { palette } from "./theme";
import { MAP_H, MAP_W } from "./timeline";

const BLOCKS = [
  { x: 60, y: 60, w: 180, h: 120 },
  { x: 280, y: 40, w: 140, h: 90 },
  { x: 470, y: 70, w: 160, h: 130 },
  { x: 90, y: 240, w: 150, h: 110 },
  { x: 980, y: 60, w: 170, h: 100 },
  { x: 1200, y: 200, w: 200, h: 140 },
  { x: 1000, y: 380, w: 160, h: 120 },
  { x: 1180, y: 540, w: 190, h: 150 },
  { x: 80, y: 470, w: 160, h: 130 },
  { x: 260, y: 620, w: 200, h: 100 },
  { x: 900, y: 620, w: 150, h: 100 },
];

const ROADS = [
  "M0 200 H1500",
  "M0 460 H1500",
  "M0 630 H1500",
  "M320 0 V760",
  "M760 0 V760",
  "M1160 0 V760",
  "M0 40 L560 640",
  "M1500 60 L900 760",
];

export const MapBackground: React.FC = () => (
  <svg
    viewBox={`0 0 ${MAP_W} ${MAP_H}`}
    width={MAP_W}
    height={MAP_H}
    style={{ position: "absolute", inset: 0, display: "block" }}
  >
    <defs>
      <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={palette.mapBaseLift} />
        <stop offset="100%" stopColor={palette.mapBase} />
      </linearGradient>
      <radialGradient id="mapVignette" cx="50%" cy="45%" r="70%">
        <stop offset="55%" stopColor="#000000" stopOpacity={0} />
        <stop offset="100%" stopColor="#000000" stopOpacity={0.5} />
      </radialGradient>
    </defs>

    <rect width={MAP_W} height={MAP_H} rx={28} fill="url(#mapBg)" />

    <path
      d="M-40 700 C 280 560, 420 780, 700 660 S 1180 520, 1560 640"
      stroke={palette.mapPark}
      strokeWidth={90}
      strokeLinecap="round"
      fill="none"
      opacity={0.6}
    />

    {BLOCKS.map((b, i) => (
      <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={10} fill={palette.mapBlock} />
    ))}

    <g stroke={palette.mapRoad} strokeWidth={2}>
      {ROADS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>

    <rect width={MAP_W} height={MAP_H} rx={28} fill="url(#mapVignette)" />
    <rect
      x={0.5}
      y={0.5}
      width={MAP_W - 1}
      height={MAP_H - 1}
      rx={28}
      fill="none"
      stroke="rgba(246,244,238,0.08)"
      strokeWidth={1}
    />
  </svg>
);
