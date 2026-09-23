import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import type { CheckSpec } from "./timeline";
import {
  PAD_LEFT,
  ROW0_Y,
  ROW_INDEX_W,
  ROW_PITCH,
  ROW_QUESTION_DY,
  T,
} from "./timeline";

type Props = { spec: CheckSpec };

export const CheckRow: React.FC<Props> = ({ spec }) => {
  const frame = useCurrentFrame();

  const label = fadeSlide(frame, spec.labelIn, T.rowDur, 12);
  const question = fadeSlide(frame, spec.questionIn, T.rowDur, 10);

  return (
    <div
      style={{
        position: "absolute",
        left: PAD_LEFT,
        top: ROW0_Y + spec.slot * ROW_PITCH,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 4,
          opacity: label.opacity,
          transform: `translateY(${label.translateY}px)`,
          fontFamily: poppins,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: palette.warmGold,
        }}
      >
        {spec.index}
      </span>

      <span
        style={{
          position: "absolute",
          left: ROW_INDEX_W,
          top: 0,
          whiteSpace: "nowrap",
          opacity: label.opacity,
          transform: `translateY(${label.translateY}px)`,
          fontFamily: poppins,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 1.6,
          color: spec.emphasis ? palette.warmGold : palette.softWhite,
        }}
      >
        {spec.label}
      </span>

      <span
        style={{
          position: "absolute",
          left: ROW_INDEX_W,
          top: ROW_QUESTION_DY,
          whiteSpace: "nowrap",
          opacity: question.opacity,
          transform: `translateY(${question.translateY}px)`,
          fontFamily: poppins,
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: 0.4,
          color: palette.mutedGray,
        }}
      >
        {spec.question}
      </span>
    </div>
  );
};
