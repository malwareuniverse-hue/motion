import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeSlide } from "./utils";
import { T } from "./timeline";

export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [0, 1]);
  const text = fadeSlide(frame, T.finalStart, T.finalDur, 24);
  const ruleWidth = clampedInterp(frame, [T.finalStart - 10, T.finalStart + 20], [0, 110]);

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
          padding: "0 160px",
        }}
      >
        <div style={{ width: ruleWidth, height: 2, background: palette.teal, opacity: 0.9 }} />
        <span
          style={{
            opacity: text.opacity,
            transform: `translateY(${text.translateY}px)`,
            fontFamily: poppins,
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: 1,
            color: palette.cream,
            textAlign: "center",
          }}
        >
          YOUR GUEST DECIDES WHO <span style={{ color: palette.amberSoft }}>YOUR COMPETITION IS.</span>
        </span>
        <div style={{ width: ruleWidth, height: 2, background: palette.teal, opacity: 0.9 }} />
      </div>
    </div>
  );
};
