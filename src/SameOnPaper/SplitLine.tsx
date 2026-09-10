import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInOutCubic } from "./utils";
import { CENTER_X, SPLIT_BOTTOM, SPLIT_TOP, T } from "./timeline";

/** A hairline that separates the two houses once they stop being equivalent. */
export const SplitLine: React.FC = () => {
  const frame = useCurrentFrame();

  const draw = clampedInterp(
    frame,
    [T.splitDraw, T.splitDraw + T.splitDrawDur],
    [0, 1],
    easeInOutCubic,
  );

  if (draw <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: CENTER_X,
        top: SPLIT_TOP,
        width: 1,
        height: SPLIT_BOTTOM - SPLIT_TOP,
        background: `linear-gradient(180deg, transparent 0%, ${palette.goldLine} 18%, ${palette.goldLine} 82%, transparent 100%)`,
        transform: `translateX(-50%) scaleY(${draw})`,
        transformOrigin: "top",
        opacity: 0.75,
      }}
    />
  );
};
