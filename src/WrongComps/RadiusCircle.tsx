import React from "react";
import { palette } from "./theme";
import { MAP_H, MAP_W, RADIUS_CENTER, RADIUS_R } from "./timeline";

export const RadiusCircle: React.FC<{ progress: number; opacity: number }> = ({ progress, opacity }) => {
  const circumference = 2 * Math.PI * RADIUS_R;
  const dashoffset = circumference * (1 - progress);
  const fillOpacity = progress * 0.08;
  const drawOpacity = progress >= 1 ? Math.max(0, 1 - (progress - 1) * 20) : 1;
  const dashedOpacity = Math.max(0, Math.min(1, (progress - 0.92) / 0.08));

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      width={MAP_W}
      height={MAP_H}
      style={{ position: "absolute", inset: 0, opacity }}
    >
      <circle cx={RADIUS_CENTER.x} cy={RADIUS_CENTER.y} r={RADIUS_R} fill={palette.teal} fillOpacity={fillOpacity} />
      {drawOpacity > 0 && (
        <circle
          cx={RADIUS_CENTER.x}
          cy={RADIUS_CENTER.y}
          r={RADIUS_R}
          fill="none"
          stroke={palette.tealSoft}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          opacity={drawOpacity}
          transform={`rotate(-90 ${RADIUS_CENTER.x} ${RADIUS_CENTER.y})`}
        />
      )}
      {dashedOpacity > 0 && (
        <circle
          cx={RADIUS_CENTER.x}
          cy={RADIUS_CENTER.y}
          r={RADIUS_R}
          fill="none"
          stroke={palette.tealSoft}
          strokeWidth={2.5}
          strokeDasharray="10 8"
          opacity={dashedOpacity}
        />
      )}
    </svg>
  );
};
