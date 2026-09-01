import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { ChainNode } from "./ChainNode";
import { ChainArrow } from "./ChainArrow";
import { ClosingStatement } from "./ClosingStatement";
import { ARROWS, NODES, T } from "./timeline";

export const RevenueChainScene: React.FC = () => {
  const frame = useCurrentFrame();

  const wallOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 12%, ${palette.bgLift} 0%, ${palette.bg} 60%)`,
      }}
    >
      <AbsoluteFill style={{ opacity: wallOpacity }}>
        {ARROWS.map((spec, i) => (
          <ChainArrow key={`a-${i}`} spec={spec} />
        ))}
        {NODES.map((spec) => (
          <ChainNode key={`n-${spec.slot}`} spec={spec} />
        ))}
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
