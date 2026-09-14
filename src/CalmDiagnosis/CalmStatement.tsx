import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CALM_LINE_1_ACCENT,
  CALM_LINE_1_LEAD,
  CALM_LINE_2,
  T,
} from "./timeline";

export const CalmStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.calmLine1In - 8, T.calmLine1In + 18],
    [0, 110],
    easeOutCubic,
  );
  const line1 = fadeSlide(frame, T.calmLine1In, T.calmLineDur, 20);
  const line2 = fadeSlide(frame, T.calmLine2In, T.calmLineDur, 16);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: "0 190px",
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
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          fontFamily: poppins,
          fontSize: 50,
          fontWeight: 700,
          letterSpacing: 0.8,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {CALM_LINE_1_LEAD}
        <span style={{ color: palette.warmGold }}>{CALM_LINE_1_ACCENT}</span>
      </span>
      <span
        style={{
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          fontFamily: poppins,
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: 1.4,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {CALM_LINE_2}
      </span>
    </div>
  );
};
