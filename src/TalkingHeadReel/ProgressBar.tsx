import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { PROGRESS_BAR_IN } from "./timeline";

// Thin reel-progress bar along the very top edge. Reads as a subtle "how far
// through the clip you are" indicator — a familiar short-form cue.
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = clampedInterp(frame, [PROGRESS_BAR_IN, PROGRESS_BAR_IN + 14], [0, 1]);
  const progress = clampedInterp(frame, [0, durationInFrames], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        opacity,
        background: palette.rule,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${palette.goldDeep}, ${palette.gold})`,
        }}
      />
    </div>
  );
};
