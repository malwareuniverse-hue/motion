import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { PunchTitle } from "./PunchTitle";
import { SupportText } from "./SupportText";
import { TestList } from "./TestList";
import { T } from "./timeline";

export const MarketAnalysisScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Stage A (10 QUESTIONS) exits over the pause window
  const stageAOpacity = clampedInterp(
    frame,
    [T.fadeStart, T.fadeStart + T.fadeDur],
    [1, 0],
    easeInCubic,
  );

  // Stage B (5 TESTS + support text) enters over same pause window …
  const stageBIn = clampedInterp(
    frame,
    [T.fadeStart, T.fadeStart + T.fadeDur],
    [0, 1],
    easeOutCubic,
  );
  // … then exits when the list transition begins
  const stageBOut = clampedInterp(
    frame,
    [T.listTransStart, T.listTransStart + T.listTransDur],
    [1, 0],
    easeInCubic,
  );

  // Stage C (test list) enters as Stage B exits
  const stageCOpacity = clampedInterp(
    frame,
    [T.listTransStart, T.listTransStart + T.listTransDur],
    [0, 1],
    easeOutCubic,
  );

  // Global exit
  const exit = clampedInterp(
    frame,
    [T.outStart, T.outStart + T.outDur],
    [1, 0],
    easeInCubic,
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(130% 80% at 50% 45%, ${palette.goldGlow} 0%, transparent 58%), ${palette.nearBlack}`,
      }}
    >
      <AbsoluteFill style={{ opacity: exit }}>
        {/* Stage A — "10 QUESTIONS" */}
        <AbsoluteFill style={{ opacity: stageAOpacity }}>
          <PunchTitle
            number="10"
            label="QUESTIONS"
            startFrame={T.aIn}
            durationFrames={T.aInDur}
          />
        </AbsoluteFill>

        {/* Stage B — "5 TESTS" + supporting copy */}
        <AbsoluteFill
          style={{ opacity: Math.min(stageBIn, stageBOut) }}
        >
          <PunchTitle
            number="5"
            label="TESTS"
            startFrame={T.bIn}
            durationFrames={T.bInDur}
          />
          <SupportText />
        </AbsoluteFill>

        {/* Stage C — test list with glass pills */}
        <AbsoluteFill style={{ opacity: stageCOpacity }}>
          <TestList />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
