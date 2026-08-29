import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { T } from "./timeline";
import { fadeSlide } from "./utils";

export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const wrapOpacity = interpolate(
    frame,
    [T.toFinalStart, T.toFinalStart + T.toFinalDur],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const line1 = fadeSlide(frame, T.finalLine1Start, T.finalLine1Dur, 20);
  const line2 = fadeSlide(frame, T.finalLine2Start, T.finalLine2Dur, 20);

  const ruleWidth = interpolate(
    frame,
    [T.finalLine1Start - 12, T.finalLine1Start + 18],
    [0, 90],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
        gap: 30,
      }}
    >
      <div style={{ width: ruleWidth, height: 2, background: palette.teal, opacity: 0.9 }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", padding: "0 120px" }}>
        <span
          style={{
            opacity: line1.opacity,
            transform: `translateY(${line1.translateY}px)`,
            fontFamily: poppins,
            fontSize: 38,
            fontWeight: 600,
            letterSpacing: 1,
            color: palette.cream,
          }}
        >
          THE GUEST DOESN&rsquo;T BUY YOUR RENOVATION COST.
        </span>
        <span
          style={{
            opacity: line2.opacity,
            transform: `translateY(${line2.translateY}px)`,
            fontFamily: poppins,
            fontSize: 50,
            fontWeight: 800,
            letterSpacing: 1,
            color: palette.tealSoft,
          }}
        >
          THEY BUY THE EXPERIENCE.
        </span>
      </div>

      <div style={{ width: ruleWidth, height: 2, background: palette.teal, opacity: 0.9 }} />
    </div>
  );
};
