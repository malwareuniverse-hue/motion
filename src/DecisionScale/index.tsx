import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { ScaleRig } from "./ScaleRig";
import { Tiles } from "./Tiles";
import { Gauge } from "./Gauge";
import { Labels } from "./Labels";
import { ClosingStatement } from "./ClosingStatement";
import { T } from "./timeline";

export const DecisionScaleScene: React.FC = () => {
  const frame = useCurrentFrame();

  const wallOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 12%, ${palette.bgLift} 0%, ${palette.bg} 60%)`,
      }}
    >
      <AbsoluteFill style={{ opacity: wallOpacity }}>
        <ScaleRig />
        <Gauge />
        <Tiles />
        <Labels />
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
