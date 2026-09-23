import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  REBUTTAL_LINE_1,
  REBUTTAL_LINE_2_ACCENT,
  REBUTTAL_LINE_2_LEAD,
  T,
} from "./timeline";

/**
 * The rebuttal: revealed during the transcript's own 0.83s pause, so the
 * motion and the on-set silence land on the same beat. The final line is a
 * handoff, not a resolution — it stays on the cliffhanger.
 */
export const ResolutionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  const line1 = fadeSlide(frame, T.rebuttalLine1In, T.rebuttalLine1Dur, 20);
  const line2 = fadeSlide(frame, T.rebuttalLine2In, T.rebuttalLine2Dur, 22);

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
          padding: "0 70px",
        }}
      >
        <span
          style={{
            maxWidth: "88%",
            opacity: line1.opacity,
            transform: `translateY(${line1.translateY}px)`,
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.32,
            letterSpacing: 0.4,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {REBUTTAL_LINE_1}
        </span>
        <span
          style={{
            maxWidth: "88%",
            opacity: line2.opacity,
            transform: `translateY(${line2.translateY}px)`,
            fontFamily: poppins,
            fontSize: 54,
            fontWeight: 800,
            letterSpacing: 0.4,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {REBUTTAL_LINE_2_LEAD}
          <span style={{ color: palette.warmGold }}>
            {REBUTTAL_LINE_2_ACCENT}
          </span>
        </span>
      </div>
    </div>
  );
};
