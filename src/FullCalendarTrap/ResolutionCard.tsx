import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  DANGER_ACCENT,
  DANGER_LEAD,
  FINAL_ACCENT,
  FINAL_LEAD,
  LEAD_IN,
  T,
} from "./timeline";

/**
 * The resolution: names the danger, then a short "but sometimes" turn, then
 * the punchline that recontextualizes "full calendar" from the opener as a
 * warning sign rather than a win.
 */
export const ResolutionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  const danger = fadeSlide(frame, T.dangerIn, T.dangerDur, 20);
  const leadIn = fadeSlide(frame, T.leadInIn, T.leadInDur, 16);
  const final = fadeSlide(frame, T.finalIn, T.finalDur, 22);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: bgOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.nearBlack,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          padding: "0 130px",
        }}
      >
        <span
          style={{
            maxWidth: "82%",
            opacity: danger.opacity,
            transform: `translateY(${danger.translateY}px)`,
            fontFamily: poppins,
            fontSize: 44,
            fontWeight: 600,
            lineHeight: 1.32,
            letterSpacing: 0.4,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {DANGER_LEAD}
          <span style={{ color: palette.warmGold }}>{DANGER_ACCENT}</span>
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          <span
            style={{
              opacity: leadIn.opacity,
              transform: `translateY(${leadIn.translateY}px)`,
              fontFamily: poppins,
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: 2,
              color: palette.mutedGray,
              textAlign: "center",
            }}
          >
            {LEAD_IN}
          </span>
          <span
            style={{
              maxWidth: "84%",
              opacity: final.opacity,
              transform: `translateY(${final.translateY}px)`,
              fontFamily: poppins,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.28,
              letterSpacing: 0.4,
              color: palette.softWhite,
              textAlign: "center",
            }}
          >
            {FINAL_LEAD}
            <span style={{ color: palette.warmGold }}>{FINAL_ACCENT}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
