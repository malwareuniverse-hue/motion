import React from "react";
import { palette } from "./theme";
import {
  BASELINE_Y,
  CONTENT_LEFT,
  CONTENT_RIGHT,
  HEIGHT,
  WIDTH,
} from "./timeline";

/**
 * A handful of faint horizontal reference lines — the quiet chart grid this
 * scene's decline reads against. Thin, precise, near-invisible; the sort of
 * structure that gives the frame depth without ever competing for attention.
 */
const GRID_ROWS = 5;

export const BackgroundField: React.FC = () => {
  const rows = Array.from({ length: GRID_ROWS }, (_, i) => {
    const t = i / (GRID_ROWS - 1);
    return BASELINE_Y - 140 + t * (HEIGHT - (BASELINE_Y - 140) - 120);
  });

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{ position: "absolute", inset: 0 }}
    >
      {rows.map((y, i) => (
        <line
          key={i}
          x1={CONTENT_LEFT}
          x2={CONTENT_RIGHT}
          y1={y}
          y2={y}
          stroke={palette.hairline}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
};
