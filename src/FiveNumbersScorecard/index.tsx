import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { OpeningThesis } from "./OpeningThesis";
import { ScorecardStage } from "./ScorecardStage";
import { T } from "./timeline";

export const FiveNumbersScorecardScene: React.FC = () => {
  const frame = useCurrentFrame();

  const openingOpacity = clampedInterp(
    frame,
    [T.stageBRecedeStart, T.stageBRecedeStart + T.stageBRecedeDur],
    [1, 0],
    easeOutCubic,
  );
  const exit = clampedInterp(
    frame,
    [T.outStart, T.outStart + T.outDur],
    [1, 0],
    easeInCubic,
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 14%, ${palette.groundLift} 0%, transparent 62%), ${palette.nearBlack}`,
      }}
    >
      <AbsoluteFill style={{ opacity: exit }}>
        <AbsoluteFill style={{ opacity: openingOpacity }}>
          <OpeningThesis />
        </AbsoluteFill>

        <ScorecardStage />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
