import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { OpeningStatement } from "./OpeningStatement";
import { PropertyDuel } from "./PropertyDuel";
import { ResolutionCard } from "./ResolutionCard";
import { T } from "./timeline";

export const RevParRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  // opening recedes into the worked example, which then crossfades into the
  // resolution card once the pause before the thesis line opens
  const openingStageOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [1, 0],
    easeOutCubic,
  );
  const duelStageOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  const duelFadeOut = clampedInterp(
    frame,
    [T.stage3BgStart, T.stage3BgStart + T.stage3BgDur],
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
        <AbsoluteFill style={{ opacity: openingStageOpacity }}>
          <OpeningStatement />
        </AbsoluteFill>

        <AbsoluteFill
          style={{ opacity: duelStageOpacity * duelFadeOut }}
        >
          <PropertyDuel />
        </AbsoluteFill>

        <ResolutionCard />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
