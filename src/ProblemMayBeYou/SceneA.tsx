import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { WeekendStrip } from "./WeekendStrip";
import {
  DECISION,
  MARKET_CONTEXT,
  MARKET_FILLED_A,
  MARKET_LABEL_A,
  MARKET_TOTAL_A,
  T,
} from "./timeline";

export const SceneA: React.FC = () => {
  const frame = useCurrentFrame();
  const context = fadeSlide(frame, T.marketContextIn, T.marketContextDur, 16);
  const decision = fadeSlide(frame, T.decisionIn, T.decisionDur, 16);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: "0 100px",
      }}
    >
      <span
        style={{
          maxWidth: "80%",
          opacity: context.opacity,
          transform: `translateY(${context.translateY}px)`,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 600,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {MARKET_CONTEXT}
      </span>

      <WeekendStrip
        otherLabel={MARKET_LABEL_A}
        otherFilled={MARKET_FILLED_A}
        otherTotal={MARKET_TOTAL_A}
        youIn={T.marketContextIn}
        otherIn={T.marketContextIn}
        dur={T.marketContextDur}
      />

      <span
        style={{
          opacity: decision.opacity,
          transform: `translateY(${decision.translateY}px)`,
          fontFamily: poppins,
          fontSize: 34,
          fontWeight: 700,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {DECISION}
      </span>
    </div>
  );
};
