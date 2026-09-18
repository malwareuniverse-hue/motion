import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CONTRAST_LINE_1,
  CONTRAST_LINE_2_ACCENT,
  CONTRAST_LINE_2_LEAD,
  T,
} from "./timeline";

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
        padding: "0 76px",
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
          maxWidth: "90%",
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          fontFamily: poppins,
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: 0.5,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {CONTRAST_LINE_1}
      </span>
      <span
        style={{
          maxWidth: "92%",
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 500,
          fontStyle: "italic",
          lineHeight: 1.4,
          letterSpacing: 0.3,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {CONTRAST_LINE_2_LEAD}
        {CONTRAST_LINE_2_ACCENT}
      </span>
    </div>
  );
};
