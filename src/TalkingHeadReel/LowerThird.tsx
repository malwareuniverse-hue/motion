import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import {
  LOWER_THIRD_HOLD,
  LOWER_THIRD_OUT_DUR,
  LOWER_THIRD_START,
} from "./timeline";

const IN_DUR = 18;

// Name / title card. Shows early to identify the speaker, then clears out so
// the captions own the lower portion of the frame.
export const LowerThird: React.FC = () => {
  const frame = useCurrentFrame();

  const outStart = LOWER_THIRD_START + IN_DUR + LOWER_THIRD_HOLD;
  const inT = clampedInterp(frame, [LOWER_THIRD_START, LOWER_THIRD_START + IN_DUR], [0, 1]);
  const outT = clampedInterp(frame, [outStart, outStart + LOWER_THIRD_OUT_DUR], [1, 0]);
  const progress = Math.min(inT, outT);
  const barScale =
    clampedInterp(frame, [LOWER_THIRD_START, LOWER_THIRD_START + 14], [0, 1]) * outT;

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        bottom: 300,
        opacity: progress,
        transform: `translateX(${(1 - progress) * -34}px)`,
        display: "flex",
        alignItems: "stretch",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 6,
          borderRadius: 3,
          background: `linear-gradient(180deg, ${palette.gold}, ${palette.goldDeep})`,
          transform: `scaleY(${barScale})`,
          transformOrigin: "bottom",
        }}
      />
      <div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: 0.6,
            color: palette.softWhite,
          }}
        >
          EMILE SAKHEL
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 2,
            color: palette.mutedGray,
            marginTop: 4,
          }}
        >
          FOUNDER · PRICING BY MIRA
        </div>
      </div>
    </div>
  );
};
