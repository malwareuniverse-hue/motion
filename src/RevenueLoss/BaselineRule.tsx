import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic } from "./utils";
import { BASELINE_Y, CONTENT_LEFT, CONTENT_W, T } from "./timeline";

/**
 * The one warm-gold element in the frame: a steady line at the height revenue
 * held before it started slipping. Everything else in the scene is measured
 * against this — the PBM rule that gold marks the reference point, not the
 * loss itself.
 */
export const BaselineRule: React.FC = () => {
  const frame = useCurrentFrame();

  const width = clampedInterp(
    frame,
    [T.baselineIn, T.baselineIn + T.baselineInDur],
    [0, CONTENT_W],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: CONTENT_LEFT,
        top: BASELINE_Y,
        width,
        height: 2,
        background: palette.warmGold,
        opacity: 0.85,
      }}
    />
  );
};
