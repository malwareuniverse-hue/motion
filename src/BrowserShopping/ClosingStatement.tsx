import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide, clampedInterp } from "./utils";
import { useCurrentFrame } from "remotion";
import { T } from "./timeline";

export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const wrapOpacity = clampedInterp(frame, [T.statementInStart, T.statementInStart + T.statementInDur], [0, 1]);
  const line1 = fadeSlide(frame, T.line1Start, T.line1Dur, 20);
  const line2 = fadeSlide(frame, T.line2Start, T.line2Dur, 20);
  const ruleWidth = clampedInterp(frame, [T.line1Start - 12, T.line1Start + 18], [0, 100]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: wrapOpacity,
        gap: 28,
      }}
    >
      <div style={{ width: ruleWidth, height: 2, background: palette.teal, opacity: 0.9 }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
        <span
          style={{
            opacity: line1.opacity,
            transform: `translateY(${line1.translateY}px)`,
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 700,
            letterSpacing: 1,
            color: palette.cream,
          }}
        >
          SHOP LIKE THE GUEST.
        </span>
        <span
          style={{
            opacity: line2.opacity,
            transform: `translateY(${line2.translateY}px)`,
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: 0.6,
            color: palette.tealSoft,
          }}
        >
          WHICH ONE WOULD YOU BOOK?
        </span>
      </div>

      <div style={{ width: ruleWidth, height: 2, background: palette.teal, opacity: 0.9 }} />
    </div>
  );
};
