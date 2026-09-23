import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { QUESTION_LEAD, QUESTION_SUB, T } from "./timeline";

export const QuestionOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, T.questionIn, T.questionDur, 20);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        opacity: reveal.opacity,
        transform: `translateY(${reveal.translateY}px)`,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 58,
          fontWeight: 700,
          letterSpacing: 0.4,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {QUESTION_LEAD}
      </span>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 32,
          fontWeight: 500,
          letterSpacing: 1,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {QUESTION_SUB}
      </span>
    </div>
  );
};
