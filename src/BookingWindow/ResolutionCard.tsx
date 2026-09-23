import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  BOOKING_WINDOW_ACCENT,
  BOOKING_WINDOW_LEAD,
  LATER_LABEL,
  LATER_OUTCOME,
  T,
  THESIS,
  TODAY_LABEL,
  TODAY_OUTCOME,
  TODAY_REASON,
  WHEN_TO_MOVE,
} from "./timeline";

/**
 * The named metric and its thesis (phase 2) recede exactly as the closing
 * today-vs-three-weeks-later comparison (phase 3) takes over the same card
 * — the same nested recede pattern RevenueDuel and RevParReveal use.
 */
export const ResolutionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.phase1RecedeStart, T.phase1RecedeStart + T.phase1RecedeDur],
    [0, 1],
    easeOutCubic,
  );
  const phase2Recede = clampedInterp(
    frame,
    [T.phase2RecedeStart, T.phase2RecedeStart + T.phase2RecedeDur],
    [0, 1],
    easeOutCubic,
  );

  const bookingWindow = fadeSlide(
    frame,
    T.bookingWindowIn,
    T.bookingWindowDur,
    20,
  );
  const whenToMove = fadeSlide(frame, T.whenToMoveIn, T.whenToMoveDur, 14);
  const thesis = fadeSlide(frame, T.thesisIn, T.thesisDur, 18);

  const todayLabel = fadeSlide(frame, T.todayLabelIn, T.todayLabelDur, 18);
  const todayTime = fadeSlide(frame, T.todayTimeIn, T.todayTimeDur, 14);
  const laterLabel = fadeSlide(frame, T.laterLabelIn, T.laterLabelDur, 18);

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
          gap: 34,
          padding: "0 120px",
          opacity: 1 - phase2Recede,
          transform: `translateY(${-phase2Recede * 30}px) scale(${1 - phase2Recede * 0.03})`,
          filter: `blur(${phase2Recede * 3}px)`,
        }}
      >
        <span
          style={{
            maxWidth: "86%",
            opacity: bookingWindow.opacity,
            transform: `translateY(${bookingWindow.translateY}px)`,
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.3,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          <span style={{ color: palette.warmGold }}>
            {BOOKING_WINDOW_ACCENT}
          </span>
          {BOOKING_WINDOW_LEAD}
        </span>

        <span
          style={{
            opacity: whenToMove.opacity,
            transform: `translateY(${whenToMove.translateY}px)`,
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 600,
            color: palette.mutedGraySoft,
            textAlign: "center",
            marginTop: -20,
          }}
        >
          {WHEN_TO_MOVE}
        </span>

        <span
          style={{
            maxWidth: "80%",
            opacity: thesis.opacity,
            transform: `translateY(${thesis.translateY}px)`,
            fontFamily: poppins,
            fontSize: 32,
            fontWeight: 600,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {THESIS}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase2Recede,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            padding: "0 60px",
          }}
        >
          <span
            style={{
              opacity: todayLabel.opacity,
              transform: `translateY(${todayLabel.translateY}px)`,
              fontFamily: poppins,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 1.5,
              color: palette.mutedGraySoft,
            }}
          >
            {TODAY_LABEL}
          </span>
          <span
            style={{
              maxWidth: "92%",
              opacity: todayLabel.opacity,
              transform: `translateY(${todayLabel.translateY}px)`,
              fontFamily: poppins,
              fontSize: 32,
              fontWeight: 700,
              color: palette.softWhite,
              textAlign: "center",
            }}
          >
            {TODAY_OUTCOME}
          </span>
          <span
            style={{
              opacity: todayTime.opacity,
              transform: `translateY(${todayTime.translateY}px)`,
              fontFamily: poppins,
              fontSize: 22,
              fontWeight: 500,
              color: palette.warmGold,
            }}
          >
            {TODAY_REASON}
          </span>
        </div>

        <div style={{ width: 2, height: 200, background: palette.hairline }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            padding: "0 60px",
          }}
        >
          <span
            style={{
              opacity: laterLabel.opacity,
              transform: `translateY(${laterLabel.translateY}px)`,
              fontFamily: poppins,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 1.5,
              color: palette.mutedGraySoft,
            }}
          >
            {LATER_LABEL}
          </span>
          <span
            style={{
              maxWidth: "92%",
              opacity: laterLabel.opacity,
              transform: `translateY(${laterLabel.translateY}px)`,
              fontFamily: poppins,
              fontSize: 32,
              fontWeight: 700,
              color: palette.warmGold,
              textAlign: "center",
            }}
          >
            {LATER_OUTCOME}
          </span>
        </div>
      </div>
    </div>
  );
};
