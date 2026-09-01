import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import type { LoopArcSpec } from "./timeline";
import { CX, CY, HEIGHT, MARGIN_DEG, R, WIDTH, angleDeg } from "./timeline";

const toXY = (deg: number) => ({
  x: CX + R * Math.cos((deg * Math.PI) / 180),
  y: CY + R * Math.sin((deg * Math.PI) / 180),
});

export const LoopArc: React.FC<{ spec: LoopArcSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [spec.drawStart, spec.drawStart + spec.drawDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  const startDeg = angleDeg(spec.fromIndex) + MARGIN_DEG;
  const endDeg = angleDeg(spec.fromIndex + 1) - MARGIN_DEG;
  const p0 = toXY(startDeg);
  const p1 = toXY(endDeg);
  const tangentDeg = endDeg + 90;

  const headOpacity = interpolate(progress, [0.85, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <path
        d={`M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y}`}
        fill="none"
        stroke={palette.amber}
        strokeWidth={2.4}
        strokeLinecap="round"
        opacity={0.85}
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100 * (1 - progress)}
      />
      <g transform={`translate(${p1.x}, ${p1.y}) rotate(${tangentDeg})`} opacity={headOpacity}>
        <path d="M -9 -6 L 8 0 L -9 6 Z" fill={palette.amber} />
      </g>
    </svg>
  );
};
