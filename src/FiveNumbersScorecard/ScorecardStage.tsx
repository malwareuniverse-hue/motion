import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { ScorecardRow } from "./ScorecardRow";
import {
  HEADER_TEXT,
  REMEMBER_QUESTIONS,
  REMEMBER_VIDEO,
  ROWS,
  SCORECARD_IS_ACCENT,
  SCORECARD_IS_LEAD,
  SCORECARD_IS_TAIL,
  T,
} from "./timeline";

/**
 * Everything from the card cross-fade to the end lives here: naming the
 * scorecard, then the same "remember these five questions" line recedes into
 * a small pinned header as the five rows list in below it, each staying on
 * screen once shown so the finished frame reads as the whole scorecard.
 */
export const ScorecardStage: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  const act2Recede = clampedInterp(
    frame,
    [T.act2RecedeStart, T.act2RecedeStart + T.act2RecedeDur],
    [0, 1],
    easeOutCubic,
  );
  const headerReveal = fadeSlide(frame, T.headerIn, T.headerDur, 14);

  const scorecardIs = fadeSlide(frame, T.scorecardIsIn, T.act2Dur, 20);
  const rememberVideo = fadeSlide(frame, T.rememberVideoIn, T.act2Dur, 18);
  const rememberQuestions = fadeSlide(
    frame,
    T.rememberQuestionsIn,
    T.act2Dur,
    22,
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity: bgOpacity }}>
      <div
        style={{ position: "absolute", inset: 0, background: palette.nearBlack }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "0 90px",
          opacity: 1 - act2Recede,
          transform: `translateY(${-act2Recede * 30}px) scale(${1 - act2Recede * 0.03})`,
          filter: `blur(${act2Recede * 3}px)`,
        }}
      >
        <span
          style={{
            maxWidth: "88%",
            opacity: scorecardIs.opacity,
            transform: `translateY(${scorecardIs.translateY}px)`,
            fontFamily: poppins,
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.35,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {SCORECARD_IS_LEAD}
          <span style={{ color: palette.warmGold }}>{SCORECARD_IS_ACCENT}</span>
          {SCORECARD_IS_TAIL}
        </span>
        <span
          style={{
            maxWidth: "82%",
            opacity: rememberVideo.opacity,
            transform: `translateY(${rememberVideo.translateY}px)`,
            fontFamily: poppins,
            fontSize: 28,
            fontWeight: 500,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {REMEMBER_VIDEO}
        </span>
        <span
          style={{
            opacity: rememberQuestions.opacity,
            transform: `translateY(${rememberQuestions.translateY}px)`,
            fontFamily: poppins,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: 0.5,
            color: palette.warmGold,
            textAlign: "center",
          }}
        >
          {REMEMBER_QUESTIONS}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <span
          style={{
            opacity: headerReveal.opacity,
            transform: `translateY(${headerReveal.translateY}px)`,
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {HEADER_TEXT}
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          {ROWS.map((spec) => (
            <ScorecardRow key={spec.slot} spec={spec} />
          ))}
        </div>
      </div>
    </div>
  );
};
