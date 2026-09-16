import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { BECAUSE, LINE_120, T, TICKER, WHY_MATTER } from "./timeline";

export const OpeningCountdown: React.FC = () => {
  const frame = useCurrentFrame();

  const line120 = fadeSlide(frame, T.line120In, T.line120Dur, 20);
  const ticker = fadeSlide(frame, T.tickerIn, T.tickerDur, 14);
  const whyMatter = fadeSlide(frame, T.whyMatterIn, T.whyMatterDur, 18);
  const because = fadeSlide(frame, T.becauseIn, T.becauseDur, 18);

  const recede = clampedInterp(
    frame,
    [T.scenarioASetupIn - 24, T.scenarioASetupIn],
    [0, 1],
    easeOutCubic,
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
        gap: 26,
        opacity: 1 - recede,
        transform: `translateY(${-recede * 26}px)`,
      }}
    >
      <span
        style={{
          opacity: line120.opacity,
          transform: `translateY(${line120.translateY}px)`,
          fontFamily: poppins,
          fontSize: 54,
          fontWeight: 700,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {LINE_120}
      </span>
      <span
        style={{
          opacity: ticker.opacity,
          transform: `translateY(${ticker.translateY}px)`,
          fontFamily: poppins,
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: 1,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {TICKER}
      </span>
      <span
        style={{
          opacity: whyMatter.opacity,
          transform: `translateY(${whyMatter.translateY}px)`,
          fontFamily: poppins,
          fontSize: 38,
          fontWeight: 700,
          color: palette.softWhite,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {WHY_MATTER}
      </span>
      <span
        style={{
          opacity: because.opacity,
          transform: `translateY(${because.translateY}px)`,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 600,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {BECAUSE}
      </span>
    </div>
  );
};
