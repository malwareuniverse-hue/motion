import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic } from "./utils";
import { StatementBlock } from "./StatementBlock";
import { OccupancyBar } from "./OccupancyBar";
import { T } from "./timeline";

export const OccupancyMeterScene: React.FC = () => {
  const frame = useCurrentFrame();

  const exit = clampedInterp(
    frame,
    [T.outStart, T.outStart + T.outDur],
    [1, 0],
    easeInCubic,
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 22%, ${palette.groundLift} 0%, transparent 62%), ${palette.nearBlack}`,
      }}
    >
      <AbsoluteFill
        style={{
          opacity: exit,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
        }}
      >
        <StatementBlock />
        <OccupancyBar />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
