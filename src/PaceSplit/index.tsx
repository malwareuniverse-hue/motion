import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { PropertyPanel } from "./PropertyPanel";
import { clampedInterp, easeOutCubic } from "./utils";
import { PANEL_H, PANEL_Y, PANELS, T, WIDTH } from "./timeline";

export const PaceSplitScene: React.FC = () => {
  const frame = useCurrentFrame();

  const dividerT = clampedInterp(frame, [T.dividerStart, T.dividerStart + T.dividerDur], [0, 1], easeOutCubic);
  const pulse = interpolate(frame, [200, 220, 240], [0.4, 0.85, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 40%, ${palette.bgLift} 0%, ${palette.bg} 65%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: WIDTH / 2 - 1,
          top: PANEL_Y,
          width: 2,
          height: PANEL_H * dividerT,
          background: `linear-gradient(180deg, transparent 0%, ${palette.gold} 12%, ${palette.gold} 88%, transparent 100%)`,
          opacity: 0.4 + pulse * 0.4,
          boxShadow: `0 0 24px 2px rgba(201,169,97,${0.25 + pulse * 0.2})`,
        }}
      />

      {PANELS.map((data) => (
        <PropertyPanel key={data.side} frame={frame} data={data} />
      ))}
    </AbsoluteFill>
  );
};
