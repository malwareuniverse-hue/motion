import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { BookingTimeline } from "./BookingTimeline";
import {
  DIFFERENT_PROBLEM,
  FLIP_LABEL,
  MARKET_DAYS,
  SCENARIO_B_OUTCOME,
  SCENARIO_B_YOUR_DAYS,
  T,
} from "./timeline";

export const SceneB: React.FC = () => {
  const frame = useCurrentFrame();
  const flip = fadeSlide(frame, T.flipIn, T.flipDur, 16);
  const outcome = fadeSlide(frame, T.scenarioBMarketIn, T.scenarioBDur, 16);
  const problem = fadeSlide(
    frame,
    T.differentProblemIn,
    T.differentProblemDur,
    16,
  );

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
          opacity: flip.opacity,
          transform: `translateY(${flip.translateY}px)`,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 2,
          color: palette.mutedGray,
          textAlign: "center",
        }}
      >
        {FLIP_LABEL}
      </span>

      <BookingTimeline
        marketDays={MARKET_DAYS}
        yourDays={SCENARIO_B_YOUR_DAYS}
        marketIn={T.scenarioBMarketIn}
        yourIn={T.scenarioBYoursIn}
        dur={T.scenarioBDur}
      />

      <span
        style={{
          maxWidth: "84%",
          opacity: outcome.opacity,
          transform: `translateY(${outcome.translateY}px)`,
          fontFamily: poppins,
          fontSize: 34,
          fontWeight: 700,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {SCENARIO_B_OUTCOME}
      </span>

      <span
        style={{
          opacity: problem.opacity,
          transform: `translateY(${problem.translateY}px)`,
          fontFamily: poppins,
          fontSize: 28,
          fontWeight: 600,
          color: palette.warmGold,
          textAlign: "center",
          marginTop: 6,
        }}
      >
        {DIFFERENT_PROBLEM}
      </span>
    </div>
  );
};
