import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic } from "./utils";
import { GhostNumeral } from "./GhostNumeral";
import { ChapterCard } from "./ChapterCard";
import { T } from "./timeline";

export const ChapterThreeScene: React.FC = () => {
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
        background: `radial-gradient(110% 80% at 22% 46%, ${palette.groundLift} 0%, transparent 64%), ${palette.nearBlack}`,
      }}
    >
      <AbsoluteFill style={{ opacity: exit }}>
        <GhostNumeral />
        <ChapterCard />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
