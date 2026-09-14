import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { OpeningStatement } from "./OpeningStatement";
import { CalmStatement } from "./CalmStatement";
import { ProcessCard } from "./ProcessCard";
import { T } from "./timeline";

export const CalmDiagnosisScene: React.FC = () => {
  const frame = useCurrentFrame();

  // the warning + the calm claim share one stage, which cross-dissolves to
  // the resolution card once the second pause marker's transition window opens
  const stageOpacity = clampedInterp(
    frame,
    [T.processBgStart, T.processBgStart + T.processBgDur],
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
        <AbsoluteFill style={{ opacity: stageOpacity }}>
          <OpeningStatement />
          <CalmStatement />
        </AbsoluteFill>

        <ProcessCard />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
