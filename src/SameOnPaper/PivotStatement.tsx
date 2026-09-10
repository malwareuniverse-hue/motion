import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import { ANSWER_TEXT, CENTER_X, PIVOT_Y, QUESTION_TEXT, T } from "./timeline";

/** The turn in the argument: the shared spec sheet is not the whole answer. */
export const PivotStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = clampedInterp(
    frame,
    [T.questionIn, T.questionIn + T.questionDur],
    [0, 1],
    easeOutCubic,
  );
  const swap = clampedInterp(
    frame,
    [T.answerStart, T.answerStart + T.answerDur],
    [0, 1],
    easeOutCubic,
  );
  const out = clampedInterp(
    frame,
    [T.pivotOut, T.pivotOut + T.pivotOutDur],
    [1, 0],
  );

  if (enter <= 0 || out <= 0) return null;

  const base: React.CSSProperties = {
    position: "absolute",
    left: CENTER_X,
    top: PIVOT_Y,
    fontFamily: poppins,
    fontSize: 46,
    fontWeight: 600,
    letterSpacing: 3,
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <span
        style={{
          ...base,
          transform: `translate(-50%, -50%) translateY(${(1 - enter) * 10 - swap * 14}px)`,
          opacity: enter * (1 - swap),
          color: palette.softWhite,
        }}
      >
        {QUESTION_TEXT}
      </span>
      <span
        style={{
          ...base,
          transform: `translate(-50%, -50%) translateY(${(1 - swap) * 14}px)`,
          opacity: swap,
          color: palette.gold,
        }}
      >
        {ANSWER_TEXT}
      </span>
    </div>
  );
};
