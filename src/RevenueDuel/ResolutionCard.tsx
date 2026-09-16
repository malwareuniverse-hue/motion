import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { RevenueEquation } from "./RevenueEquation";
import {
  LEADS_TO,
  NEED_TO_KNOW,
  NUMBER_ACCENT,
  NUMBER_LEAD,
  REVENUE_STATEMENT_ACCENT,
  REVENUE_STATEMENT_LEAD,
  T,
} from "./timeline";

/**
 * Phase 1 (the revenue question + illustrated equation) recedes exactly as
 * phase 2 (the anticipation line) takes over the same card — the nested
 * version of the opening-recede pattern used at the top level elsewhere.
 * This clip never names the number; it hands off to whatever reveals it.
 */
export const ResolutionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  const phase1Recede = clampedInterp(
    frame,
    [T.phase1RecedeStart, T.phase1RecedeStart + T.phase1RecedeDur],
    [0, 1],
    easeOutCubic,
  );

  const needToKnow = fadeSlide(frame, T.needToKnowIn, T.needToKnowDur, 16);
  const revenueStatement = fadeSlide(
    frame,
    T.revenueStatementIn,
    T.revenueStatementDur,
    20,
  );
  const leadsTo = fadeSlide(frame, T.leadsToIn, T.leadsToDur, 16);
  const number = fadeSlide(frame, T.numberIn, T.numberDur, 22);

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
          gap: 40,
          padding: "0 110px",
          opacity: 1 - phase1Recede,
          transform: `translateY(${-phase1Recede * 30}px) scale(${1 - phase1Recede * 0.03})`,
          filter: `blur(${phase1Recede * 3}px)`,
        }}
      >
        <span
          style={{
            opacity: needToKnow.opacity,
            transform: `translateY(${needToKnow.translateY}px)`,
            fontFamily: poppins,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 2,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {NEED_TO_KNOW}
        </span>

        <span
          style={{
            maxWidth: "82%",
            opacity: revenueStatement.opacity,
            transform: `translateY(${revenueStatement.translateY}px)`,
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.3,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {REVENUE_STATEMENT_LEAD}
          <span style={{ color: palette.warmGold }}>
            {REVENUE_STATEMENT_ACCENT}
          </span>
        </span>

        <RevenueEquation />
      </div>

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
        }}
      >
        <span
          style={{
            opacity: leadsTo.opacity,
            transform: `translateY(${leadsTo.translateY}px)`,
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: 2,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {LEADS_TO}
        </span>
        <span
          style={{
            maxWidth: "88%",
            opacity: number.opacity,
            transform: `translateY(${number.translateY}px)`,
            fontFamily: poppins,
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.28,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {NUMBER_LEAD}
          <span style={{ color: palette.warmGold }}>{NUMBER_ACCENT}</span>
        </span>
      </div>
    </div>
  );
};
