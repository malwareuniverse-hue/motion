import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeRise } from "./utils";
import {
  BETTER_1,
  BETTER_1_Y,
  BETTER_2,
  BETTER_2_Y,
  BETTER_LABEL,
  BETTER_LABEL_Y,
  CENTER_X,
  T,
  WRONG_TEXT,
  WRONG_Y,
} from "./timeline";

/** Act 4b: the question owners ask, replaced by the two that work. */
export const BetterQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  const wrong = fadeRise(frame, T.wrongIn, T.wrongDur, 10);
  const wrongOut = clampedInterp(
    frame,
    [T.wrongOut, T.wrongOut + T.wrongOutDur],
    [1, 0],
  );
  const label = fadeRise(frame, T.betterLabelIn, T.betterLabelDur, 8);
  const first = fadeRise(frame, T.better1In, T.better1Dur, 12);
  const second = fadeRise(frame, T.better2In, T.better2Dur, 12);
  const out = clampedInterp(frame, [T.a4bOut, T.a4bOut + T.a4bOutDur], [1, 0]);

  if (wrong.opacity <= 0 || out <= 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: WRONG_Y,
          transform: `translate(-50%, -50%) translateY(${wrong.translateY}px)`,
          opacity: wrong.opacity * wrongOut,
          fontFamily: poppins,
          fontSize: 46,
          fontWeight: 500,
          letterSpacing: 1.5,
          color: palette.mutedGray,
          whiteSpace: "nowrap",
        }}
      >
        {WRONG_TEXT}
      </span>

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: BETTER_LABEL_Y,
          transform: `translate(-50%, -50%) translateY(${label.translateY}px)`,
          opacity: label.opacity,
          fontFamily: poppins,
          fontSize: 19,
          fontWeight: 500,
          letterSpacing: 7,
          color: palette.gold,
          whiteSpace: "nowrap",
        }}
      >
        {BETTER_LABEL}
      </span>

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: BETTER_1_Y,
          transform: `translate(-50%, -50%) translateY(${first.translateY}px)`,
          opacity: first.opacity,
          fontFamily: poppins,
          fontSize: 50,
          fontWeight: 600,
          letterSpacing: 1.5,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {BETTER_1}
      </span>

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: BETTER_2_Y,
          transform: `translate(-50%, -50%) translateY(${second.translateY}px)`,
          opacity: second.opacity,
          fontFamily: poppins,
          fontSize: 50,
          fontWeight: 600,
          letterSpacing: 1.5,
          color: palette.gold,
          whiteSpace: "nowrap",
        }}
      >
        {BETTER_2}
      </span>
    </div>
  );
};
