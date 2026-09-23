import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { NUMBER_ACCENT, NUMBER_LEAD, START_WITH, T } from "./timeline";

/**
 * The handoff beat: this clip never names the number, it only earns the
 * anticipation for it. Held on screen through the cut into whatever reveals
 * the first number next.
 */
export const AnticipationCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  const step1 = fadeSlide(frame, T.startWithIn, T.cardLineDur, 18);
  const step2 = fadeSlide(frame, T.numberIn, T.cardLineDur, 22);

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
          padding: "0 70px",
        }}
      >
        <span
          style={{
            opacity: step1.opacity,
            transform: `translateY(${step1.translateY}px)`,
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: 2,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {START_WITH}
        </span>
        <span
          style={{
            maxWidth: "90%",
            opacity: step2.opacity,
            transform: `translateY(${step2.translateY}px)`,
            fontFamily: poppins,
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: 0.4,
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
