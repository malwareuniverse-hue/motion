import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { NotThinkingBlock } from "./NotThinkingBlock";
import { GuestQuestion } from "./GuestQuestion";
import { ClosingStatement } from "./ClosingStatement";
import { T } from "./timeline";

export const GuestMindsetScene: React.FC = () => {
  const frame = useCurrentFrame();

  const stageOpacity = clampedInterp(
    frame,
    [T.toFinalStart, T.toFinalStart + T.toFinalDur],
    [1, 0],
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 12%, ${palette.groundLift} 0%, transparent 62%), ${palette.nearBlack}`,
      }}
    >
      <AbsoluteFill style={{ opacity: stageOpacity }}>
        <NotThinkingBlock />
        <GuestQuestion />
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
