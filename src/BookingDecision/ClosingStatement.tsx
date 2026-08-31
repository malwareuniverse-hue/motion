import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeSlide } from "./utils";
import { T } from "./timeline";

export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [0, 1]);
  const line1 = fadeSlide(frame, T.line1Start, T.line1Dur, 24);
  const line2 = fadeSlide(frame, T.line2Start, T.line2Dur, 24);
  const ruleWidth = clampedInterp(frame, [T.line1Start - 10, T.line1Start + 20], [0, 110]);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: bgOpacity }}>
      <div style={{ position: "absolute", inset: 0, background: palette.bg }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "0 140px",
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
            THIS IS YOUR REAL COMPETITION.
          </span>
          <span
            style={{
              opacity: line2.opacity,
              transform: `translateY(${line2.translateY}px)`,
              fontFamily: poppins,
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: 0.6,
              color: palette.amberSoft,
            }}
          >
            NOT NECESSARILY THE HOUSE NEXT DOOR.
          </span>
        </div>
        <div style={{ width: ruleWidth, height: 2, background: palette.teal, opacity: 0.9 }} />
      </div>
    </div>
  );
};
