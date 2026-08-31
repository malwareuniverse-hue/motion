import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { PivotNode } from "./PivotNode";
import { ChainNode } from "./ChainNode";
import { ChainArrow } from "./ChainArrow";
import { ClosingStatement } from "./ClosingStatement";
import { RIGHT_ARROWS, RIGHT_NODES, T, WRONG_ARROWS, WRONG_NODES } from "./timeline";

export const CompsChainScene: React.FC = () => {
  const frame = useCurrentFrame();

  const wallOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 12%, ${palette.bgLift} 0%, ${palette.bg} 60%)`,
      }}
    >
      <AbsoluteFill style={{ opacity: wallOpacity }}>
        {WRONG_ARROWS.map((spec, i) => (
          <ChainArrow key={`wa-${i}`} spec={spec} />
        ))}
        {RIGHT_ARROWS.map((spec, i) => (
          <ChainArrow key={`ra-${i}`} spec={spec} />
        ))}

        <PivotNode />

        {WRONG_NODES.map((spec) => (
          <ChainNode key={`w-${spec.slot}`} spec={spec} />
        ))}
        {RIGHT_NODES.map((spec) => (
          <ChainNode key={`r-${spec.slot}`} spec={spec} />
        ))}
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
