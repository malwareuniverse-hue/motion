import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { BookingTimeline } from "./BookingTimeline";
import {
  AMBIGUITY_CHEAP,
  AMBIGUITY_LEAD,
  AMBIGUITY_WINNING,
  MARKET_DAYS,
  SCENARIO_A_OUTCOME,
  SCENARIO_A_SETUP,
  SCENARIO_A_YOUR_DAYS,
  T,
} from "./timeline";

export const SceneA: React.FC = () => {
  const frame = useCurrentFrame();
  const setup = fadeSlide(frame, T.scenarioASetupIn, T.scenarioASetupDur, 16);
  const outcome = fadeSlide(frame, T.scenarioAMarketIn, T.scenarioADur, 16);
  const ambiguityLead = fadeSlide(
    frame,
    T.ambiguityLeadIn,
    T.ambiguityLeadDur,
    14,
  );
  const winning = fadeSlide(frame, T.ambiguityWinningIn, T.ambiguityDur, 14);
  const cheap = fadeSlide(frame, T.ambiguityCheapIn, T.ambiguityDur, 14);

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
          opacity: setup.opacity,
          transform: `translateY(${setup.translateY}px)`,
          fontFamily: poppins,
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: 0.6,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {SCENARIO_A_SETUP}
      </span>

      <span
        style={{
          opacity: outcome.opacity,
          transform: `translateY(${outcome.translateY}px)`,
          fontFamily: poppins,
          fontSize: 34,
          fontWeight: 700,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {SCENARIO_A_OUTCOME}
      </span>

      <BookingTimeline
        marketDays={MARKET_DAYS}
        yourDays={SCENARIO_A_YOUR_DAYS}
        marketIn={T.scenarioAMarketIn}
        yourIn={T.scenarioAYoursIn}
        dur={T.scenarioADur}
      />

      <span
        style={{
          opacity: ambiguityLead.opacity,
          transform: `translateY(${ambiguityLead.translateY}px)`,
          fontFamily: poppins,
          fontSize: 24,
          fontWeight: 500,
          color: palette.mutedGraySoft,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {AMBIGUITY_LEAD}
      </span>

      <div style={{ display: "flex", gap: 60 }}>
        <span
          style={{
            opacity: winning.opacity,
            transform: `translateY(${winning.translateY}px)`,
            fontFamily: poppins,
            fontSize: 32,
            fontWeight: 700,
            color: palette.warmGold,
          }}
        >
          {AMBIGUITY_WINNING}
        </span>
        <span
          style={{
            opacity: cheap.opacity,
            transform: `translateY(${cheap.translateY}px)`,
            fontFamily: poppins,
            fontSize: 32,
            fontWeight: 700,
            color: palette.mutedGraySoft,
          }}
        >
          {AMBIGUITY_CHEAP}
        </span>
      </div>
    </div>
  );
};
