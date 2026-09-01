import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { LoopNode } from "./LoopNode";
import { LoopArc } from "./LoopArc";
import { LoopRing } from "./LoopRing";
import { ClosingStatement } from "./ClosingStatement";
import { ARCS, NODES, T } from "./timeline";

export const DecisionLoopScene: React.FC = () => {
  const frame = useCurrentFrame();

  const wallOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 12%, ${palette.bgLift} 0%, ${palette.bg} 60%)`,
      }}
    >
      <AbsoluteFill style={{ opacity: wallOpacity }}>
        <LoopRing />
        {ARCS.map((spec, i) => (
          <LoopArc key={`arc-${i}`} spec={spec} />
        ))}
        {NODES.map((spec) => (
          <LoopNode key={`node-${spec.index}`} spec={spec} />
        ))}
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
