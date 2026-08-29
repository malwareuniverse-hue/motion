import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { LOWER_THIRD_OUT_DUR, LOWER_THIRD_OUT_START, LOWER_THIRD_START } from "./timeline";

export const LowerThird: React.FC = () => {
  const frame = useCurrentFrame();

  const inT = clampedInterp(frame, [LOWER_THIRD_START, LOWER_THIRD_START + 18], [0, 1]);
  const outT = clampedInterp(
    frame,
    [LOWER_THIRD_OUT_START, LOWER_THIRD_OUT_START + LOWER_THIRD_OUT_DUR],
    [1, 0],
  );
  const progress = Math.min(inT, outT);
  const barWidth = clampedInterp(frame, [LOWER_THIRD_START, LOWER_THIRD_START + 14], [0, 1]) * outT;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        bottom: 90,
        opacity: progress,
        transform: `translateX(${(1 - progress) * -30}px)`,
        display: "flex",
        alignItems: "stretch",
        gap: 14,
      }}
    >
      <div style={{ width: 4, borderRadius: 2, background: `linear-gradient(180deg, ${palette.teal}, ${palette.amber})`, transform: `scaleY(${barWidth})`, transformOrigin: "bottom" }} />
      <div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 0.6,
            color: palette.cream,
          }}
        >
          EMILE SAKHEL
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: 1.6,
            color: palette.tealSoft,
            marginTop: 2,
          }}
        >
          FOUNDER · PRICING BY MIRA
        </div>
      </div>
    </div>
  );
};
