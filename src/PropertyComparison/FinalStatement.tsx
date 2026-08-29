import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { serif } from "./fonts";
import { T } from "./timeline";
import { fadeSlide } from "./utils";

export const FinalStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const wrapOpacity = interpolate(
    frame,
    [T.fadeToFinalStart, T.fadeToFinalStart + T.fadeToFinalDur],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const line1 = fadeSlide(frame, T.finalLine1Start, T.finalLine1Dur, 22);
  const line2 = fadeSlide(frame, T.finalLine2Start, T.finalLine2Dur, 22);

  const ruleWidth = interpolate(
    frame,
    [T.finalLine1Start - 14, T.finalLine1Start + 20],
    [0, 120],
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
        gap: 34,
      }}
    >
      <div style={{ width: ruleWidth, height: 1, background: palette.gold, opacity: 0.75 }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          textAlign: "center",
        }}
      >
        <span
          style={{
            opacity: line1.opacity,
            transform: `translateY(${line1.translateY}px)`,
            fontFamily: serif,
            fontSize: 46,
            fontWeight: 600,
            letterSpacing: 2,
            color: palette.cream,
          }}
        >
          BEDROOM COUNT TELLS YOU SIZE.
        </span>
        <span
          style={{
            opacity: line2.opacity,
            transform: `translateY(${line2.translateY}px)`,
            fontFamily: serif,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: 2,
            color: palette.goldBright,
          }}
        >
          IT DOESN&rsquo;T TELL YOU VALUE.
        </span>
      </div>

      <div style={{ width: ruleWidth, height: 1, background: palette.gold, opacity: 0.75 }} />
    </div>
  );
};
