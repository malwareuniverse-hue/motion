import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CONTRAST_LINE_1_ACCENT,
  CONTRAST_LINE_1_LEAD,
  CONTRAST_LINE_2,
  T,
} from "./timeline";

/**
 * The number that sounds like success, undercut by the question that
 * actually decides it. Same rule as FullCalendarTrap's contrast — the hook
 * takes the gold, the comedown does not.
 */
export const ContrastStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.contrastLine1In - 8, T.contrastLine1In + 18],
    [0, 110],
    easeOutCubic,
  );
  const line1 = fadeSlide(frame, T.contrastLine1In, T.contrastLineDur, 20);
  const line2 = fadeSlide(frame, T.contrastLine2In, T.contrastLineDur, 16);

  return (
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
      }}
    >
      <div
        style={{
          width: rule,
          height: 2,
          background: palette.warmGold,
          opacity: 0.9,
        }}
      />
      <span
        style={{
          maxWidth: "80%",
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          fontFamily: poppins,
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: 0.4,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {CONTRAST_LINE_1_LEAD}
        <span style={{ color: palette.warmGold }}>
          {CONTRAST_LINE_1_ACCENT}
        </span>
      </span>
      <span
        style={{
          maxWidth: "78%",
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          fontFamily: poppins,
          fontSize: 34,
          fontWeight: 500,
          lineHeight: 1.3,
          letterSpacing: 1,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {CONTRAST_LINE_2}
      </span>
    </div>
  );
};
