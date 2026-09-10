import React from "react";

/**
 * Thin-line mark for a coastal rental: two offset volumes, deep roof slabs,
 * a terrace and a pool. Deliberately generic — both houses carry the same
 * mark, so nothing in it can hint at which one is worth more.
 */
export const HouseGlyph: React.FC<{ stroke: string; opacity: number }> = ({
  stroke,
  opacity,
}) => (
  <svg
    width={210}
    height={143}
    viewBox="0 0 220 150"
    style={{ opacity }}
    aria-hidden
  >
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* upper volume, set back to the right */}
      <rect x={112} y={24} width={62} height={28} />
      <line x1={104} y1={24} x2={182} y2={24} />

      {/* main volume */}
      <rect x={46} y={52} width={128} height={48} />
      <line x1={38} y1={52} x2={182} y2={52} />

      {/* glazing */}
      <line x1={46} y1={74} x2={174} y2={74} opacity={0.5} />
      <line x1={88} y1={52} x2={88} y2={100} opacity={0.6} />
      <line x1={132} y1={52} x2={132} y2={100} opacity={0.6} />

      {/* terrace */}
      <line x1={20} y1={100} x2={200} y2={100} opacity={0.7} />

      {/* pool */}
      <rect x={34} y={112} width={92} height={22} rx={4} />
      <line x1={48} y1={123} x2={68} y2={123} opacity={0.55} />
      <line x1={80} y1={123} x2={112} y2={123} opacity={0.55} />
    </g>
  </svg>
);
