import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { OpeningHook } from "./OpeningHook";
import { OutcomesStage } from "./OutcomesStage";
import { AssessmentCard } from "./AssessmentCard";
import { HandoffCard } from "./HandoffCard";
import { T } from "./timeline";

export const RevenueAssessmentCTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  const hookOpacity = clampedInterp(
    frame,
    [T.hookRecedeStart, T.hookRecedeStart + T.hookRecedeDur],
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
        <AbsoluteFill style={{ opacity: hookOpacity }}>
          <OpeningHook />
        </AbsoluteFill>

        <OutcomesStage />
        <AssessmentCard />
        <HandoffCard />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
