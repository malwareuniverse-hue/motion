import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { LINE_1, LINE_2_ACCENT, LINE_2_LEAD, LINE_2_TAIL, T } from "./timeline";

export const StatementBlock: React.FC = () => {
  const frame = useCurrentFrame();

  const line1 = fadeSlide(frame, T.line1In, T.line1Dur, 16);
  const rule = clampedInterp(
    frame,
    [T.ruleStart, T.ruleStart + T.ruleDur],
    [0, 110],
    easeOutCubic,
  );
  const line2 = fadeSlide(frame, T.line2In, T.line2Dur, 20);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 26,
      }}
    >
      <span
        style={{
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          fontFamily: poppins,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: 5,
          color: palette.mutedGraySoft,
        }}
      >
        {LINE_1}
      </span>

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
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          fontFamily: poppins,
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: 0.6,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {LINE_2_LEAD}
        <span style={{ color: palette.warmGold }}>{LINE_2_ACCENT}</span>
        {LINE_2_TAIL}
      </span>
    </div>
  );
};
