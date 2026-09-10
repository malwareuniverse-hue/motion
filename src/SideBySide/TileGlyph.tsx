import React from "react";

/** Compact thin-line listing mark — one per tile in the wall of ten. */
export const TileGlyph: React.FC<{ stroke: string }> = ({ stroke }) => (
  <svg width={104} height={64} viewBox="0 0 130 80" aria-hidden>
    <g fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={66} y={12} width={38} height={18} />
      <line x1={60} y1={12} x2={110} y2={12} />
      <rect x={26} y={30} width={78} height={30} />
      <line x1={20} y1={30} x2={110} y2={30} />
      <line x1={52} y1={30} x2={52} y2={60} opacity={0.6} />
      <line x1={78} y1={30} x2={78} y2={60} opacity={0.6} />
      <line x1={10} y1={60} x2={120} y2={60} opacity={0.7} />
      <rect x={22} y={68} width={46} height={10} rx={3} opacity={0.85} />
    </g>
  </svg>
);
