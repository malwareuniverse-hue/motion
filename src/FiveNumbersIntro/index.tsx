import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { OpeningStatement } from "./OpeningStatement";
import { BenefitStack } from "./BenefitStack";
import { AnticipationCard } from "./AnticipationCard";
import { T } from "./timeline";

export const FiveNumbersIntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // the warning + the framework payoff share one stage, which cross-dissolves
  // to the handoff card once the pre-handoff pause opens
  const stageOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
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
          <BenefitStack />
        </AbsoluteFill>

        <AnticipationCard />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
