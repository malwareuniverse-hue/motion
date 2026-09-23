import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { WeekendStrip } from "./WeekendStrip";
import {
  COMPETITORS_FILLED,
  COMPETITORS_LABEL,
  COMPETITORS_TOTAL,
  DIFFERENT_PROBLEM,
  FILLING_UP,
  FLIP_LEAD,
  T,
} from "./timeline";

export const SceneB: React.FC = () => {
  const frame = useCurrentFrame();
  const flip = fadeSlide(frame, T.flipIn, T.flipDur, 16);
  const fillingUp = fadeSlide(frame, T.fillingUpIn, T.fillingUpDur, 16);
  const problem = fadeSlide(frame, T.problemIn, T.problemDur, 16);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "0 100px",
      }}
    >
      <span
        style={{
          maxWidth: "80%",
          opacity: flip.opacity,
          transform: `translateY(${flip.translateY}px)`,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 600,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {FLIP_LEAD}
      </span>

      <WeekendStrip
        otherLabel={COMPETITORS_LABEL}
        otherFilled={COMPETITORS_FILLED}
        otherTotal={COMPETITORS_TOTAL}
        youIn={T.flipIn}
        otherIn={T.fillingUpIn}
        dur={T.fillingUpDur}
      />

      <span
        style={{
          maxWidth: "80%",
          opacity: fillingUp.opacity,
          transform: `translateY(${fillingUp.translateY}px)`,
          fontFamily: poppins,
          fontSize: 26,
          fontWeight: 600,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {FILLING_UP}
      </span>

      <span
        style={{
          opacity: problem.opacity,
          transform: `translateY(${problem.translateY}px)`,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 700,
          color: palette.softWhite,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        {DIFFERENT_PROBLEM}
      </span>
    </div>
  );
};
