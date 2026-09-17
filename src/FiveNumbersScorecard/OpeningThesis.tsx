import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  STAGE_A_ACCENT,
  STAGE_A_LEAD,
  STAGE_B_DIFFERENCE,
  STAGE_B_MEANING,
  STAGE_B_SMARTER,
  T,
} from "./timeline";

/**
 * Stage A (the thesis's first clause) recedes directly into Stage B (why the
 * number matters) on the same full-bleed stage — the transcript's own two
 * beats are less than two seconds apart, so this mirrors FiveNumbersIntro's
 * tight opening-recede-into-headline rhythm rather than a slower crossfade.
 */
export const OpeningThesis: React.FC = () => {
  const frame = useCurrentFrame();

  const stageARecede = clampedInterp(
    frame,
    [T.stageARecedeStart, T.stageARecedeStart + T.stageARecedeDur],
    [0, 1],
    easeOutCubic,
  );
  const stageBRecede = clampedInterp(
    frame,
    [T.stageBRecedeStart, T.stageBRecedeStart + T.stageBRecedeDur],
    [0, 1],
    easeOutCubic,
  );

  const leadReveal = fadeSlide(frame, T.stageAIn, T.stageADur, 20);
  const accentReveal = fadeSlide(frame, T.stageBetterIn, T.stageBetterDur, 22);

  const smarter = fadeSlide(frame, T.stageBSmarterIn, T.stageBDur, 18);
  const meaning = fadeSlide(frame, T.stageBMeaningIn, T.stageBDur, 18);
  const difference = fadeSlide(frame, T.stageBDifferenceIn, T.stageBDur, 18);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          padding: "0 80px",
          opacity: 1 - stageARecede,
          transform: `translateY(${-stageARecede * 30}px) scale(${1 - stageARecede * 0.03})`,
          filter: `blur(${stageARecede * 3}px)`,
        }}
      >
        <span
          style={{
            maxWidth: "90%",
            opacity: leadReveal.opacity,
            transform: `translateY(${leadReveal.translateY}px)`,
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: 0.4,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {STAGE_A_LEAD}
        </span>
        <span
          style={{
            opacity: accentReveal.opacity,
            transform: `translateY(${accentReveal.translateY}px)`,
            fontFamily: poppins,
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: palette.warmGold,
            textAlign: "center",
          }}
        >
          {STAGE_A_ACCENT}
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
          gap: 28,
          padding: "0 80px",
          opacity: (1 - stageBRecede) * stageARecede,
          transform: `translateY(${-stageBRecede * 30}px) scale(${1 - stageBRecede * 0.03})`,
          filter: `blur(${stageBRecede * 3}px)`,
        }}
      >
        <span
          style={{
            maxWidth: "88%",
            opacity: smarter.opacity,
            transform: `translateY(${smarter.translateY}px)`,
            fontFamily: poppins,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: 0.4,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {STAGE_B_SMARTER}
        </span>
        <span
          style={{
            maxWidth: "88%",
            opacity: meaning.opacity,
            transform: `translateY(${meaning.translateY}px)`,
            fontFamily: poppins,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: 0.4,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {STAGE_B_MEANING}
        </span>
        <span
          style={{
            opacity: difference.opacity,
            transform: `translateY(${difference.translateY}px)`,
            fontFamily: poppins,
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: 0.5,
            color: palette.warmGold,
            textAlign: "center",
          }}
        >
          {STAGE_B_DIFFERENCE}
        </span>
      </div>
    </>
  );
};
