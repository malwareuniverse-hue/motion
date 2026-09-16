import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { OpeningCountdown } from "./OpeningCountdown";
import { SceneA } from "./SceneA";
import { SceneB } from "./SceneB";
import { ResolutionCard } from "./ResolutionCard";
import { T } from "./timeline";

export const BookingWindowScene: React.FC = () => {
  const frame = useCurrentFrame();

  // act 1 -> act 2 crossfade, keyed on the transcript's own second pause
  const actOneOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [1, 0],
    easeOutCubic,
  );
  const actTwoOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  // within act 2, the flipped scenario fades as the resolution card takes over
  const sceneBFadeOut = clampedInterp(
    frame,
    [T.phase1RecedeStart, T.phase1RecedeStart + T.phase1RecedeDur],
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
        <AbsoluteFill style={{ opacity: actOneOpacity }}>
          <OpeningCountdown />
          <SceneA />
        </AbsoluteFill>

        <AbsoluteFill style={{ opacity: actTwoOpacity * sceneBFadeOut }}>
          <SceneB />
        </AbsoluteFill>

        <ResolutionCard />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
