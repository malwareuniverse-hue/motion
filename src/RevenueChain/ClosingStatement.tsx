import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeSlide } from "./utils";
import { T } from "./timeline";

export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [0, 1]);
  const text = fadeSlide(frame, T.statementStart, T.statementDur, 24);
  const ruleWidth = clampedInterp(frame, [T.statementStart - 10, T.statementStart + 20], [0, 120]);

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
        <div style={{ width: ruleWidth, height: 2, background: palette.amber, opacity: 0.9 }} />
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
          INFORMATION BECOMES <span style={{ color: palette.amberSoft }}>REVENUE.</span>
        </span>
        <div style={{ width: ruleWidth, height: 2, background: palette.amber, opacity: 0.9 }} />
      </div>
    </div>
  );
};
