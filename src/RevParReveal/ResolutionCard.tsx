import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  REVPAR_ACCENT,
  REVPAR_LEAD,
  REVPAR_LINE2,
  T,
  THESIS_ACCENT,
  THESIS_LEAD,
  THESIS_LEAD_SMALL,
} from "./timeline";

/**
 * The full resolution: no anticipation left dangling this time. The thesis
 * (full does not always mean better) and the name of the metric that
 * resolves it land on the same card and both stay on screen.
 */
export const ResolutionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.stage3BgStart, T.stage3BgStart + T.stage3BgDur],
    [0, 1],
    easeOutCubic,
  );
  const thesisLeadSmall = fadeSlide(frame, T.thesisLeadIn, T.thesisLeadDur, 14);
  const thesisAccent = fadeSlide(
    frame,
    T.thesisAccentIn,
    T.thesisAccentDur,
    20,
  );
  const revparLine1 = fadeSlide(frame, T.revparLine1In, T.revparLine1Dur, 20);
  const revparLine2 = fadeSlide(frame, T.revparLine2In, T.revparLine2Dur, 16);

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
          gap: 30,
          padding: "0 130px",
        }}
      >
        <span
          style={{
            opacity: thesisLeadSmall.opacity,
            transform: `translateY(${thesisLeadSmall.translateY}px)`,
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: 1.5,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {THESIS_LEAD_SMALL}
        </span>

        <span
          style={{
            maxWidth: "82%",
            opacity: thesisAccent.opacity,
            transform: `translateY(${thesisAccent.translateY}px)`,
            fontFamily: poppins,
            fontSize: 50,
            fontWeight: 700,
            lineHeight: 1.3,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {THESIS_LEAD}
          <span style={{ color: palette.warmGold }}>{THESIS_ACCENT}</span>
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
          }}
        >
          <span
            style={{
              maxWidth: "88%",
              opacity: revparLine1.opacity,
              transform: `translateY(${revparLine1.translateY}px)`,
              fontFamily: poppins,
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.3,
              color: palette.softWhite,
              textAlign: "center",
            }}
          >
            <span style={{ color: palette.warmGold }}>{REVPAR_ACCENT}</span>
            {REVPAR_LEAD}
          </span>
          <span
            style={{
              opacity: revparLine2.opacity,
              transform: `translateY(${revparLine2.translateY}px)`,
              fontFamily: poppins,
              fontSize: 40,
              fontWeight: 700,
              color: palette.warmGold,
              textAlign: "center",
            }}
          >
            {REVPAR_LINE2}
          </span>
        </div>
      </div>
    </div>
  );
};
