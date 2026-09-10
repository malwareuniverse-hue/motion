import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeSlide } from "./utils";
import {
  CLOSING_LINE_1,
  CLOSING_LINE_2_ACCENT,
  CLOSING_LINE_2_LEAD,
  T,
} from "./timeline";

export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.toFinalStart, T.toFinalStart + T.toFinalDur],
    [0, 1],
  );
  const line1 = fadeSlide(frame, T.line1Start, T.line1Dur, 22);
  const line2 = fadeSlide(frame, T.line2Start, T.line2Dur, 22);
  const ruleWidth = clampedInterp(
    frame,
    [T.line1Start - 8, T.line1Start + 24],
    [0, 112],
  );

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
          gap: 26,
          padding: "0 200px",
        }}
      >
        <div
          style={{
            width: ruleWidth,
            height: 2,
            background: palette.warmGold,
            opacity: 0.9,
            marginBottom: 14,
          }}
        />
        <span
          style={{
            opacity: line1.opacity,
            transform: `translateY(${line1.translateY}px)`,
            fontFamily: poppins,
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: 1.4,
            color: palette.mutedGray,
            textAlign: "center",
          }}
        >
          {CLOSING_LINE_1}
        </span>
        <span
          style={{
            opacity: line2.opacity,
            transform: `translateY(${line2.translateY}px)`,
            fontFamily: poppins,
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {CLOSING_LINE_2_LEAD}
          <span style={{ color: palette.warmGold }}>
            {CLOSING_LINE_2_ACCENT}
          </span>
        </span>
      </div>
    </div>
  );
};
