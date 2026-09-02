import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { BAR_BASE_Y, BAR_HEIGHTS, BAR_W, HEIGHT, T, WIDTH, barX } from "./timeline";

const POINTS = BAR_HEIGHTS.map((h, i) => ({
  x: barX(i) + BAR_W / 2,
  y: BAR_BASE_Y - h - 30,
}));

const MIN_X = POINTS[0].x - 30;
const MAX_X = POINTS[POINTS.length - 1].x + 30;

export const TrendLine: React.FC = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [T.trendStart, T.trendStart + T.trendDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  const d = `M ${POINTS[0].x} ${POINTS[0].y} ${POINTS.slice(1)
    .map((p) => `L ${p.x} ${p.y}`)
    .join(" ")}`;

  const revealWidth = (MAX_X - MIN_X) * progress;

  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <clipPath id="trendReveal">
        <rect x={MIN_X} y={0} width={revealWidth} height={HEIGHT} />
      </clipPath>
      <path
        d={d}
        fill="none"
        stroke={palette.amber}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeDasharray="1 14"
        opacity={0.85}
        clipPath="url(#trendReveal)"
      />
    </svg>
  );
};
