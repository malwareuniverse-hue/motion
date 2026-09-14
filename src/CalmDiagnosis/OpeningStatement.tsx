import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { OPENING_TEXT, T } from "./timeline";

export const OpeningStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = fadeSlide(frame, T.openingIn, T.openingInDur, 20);
  const recede = clampedInterp(
    frame,
    [T.openingRecedeStart, T.openingRecedeStart + T.openingRecedeDur],
    [0, 1],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 220px",
        opacity: enter.opacity * (1 - recede),
        transform: `translateY(${enter.translateY - recede * 30}px) scale(${1 - recede * 0.03})`,
        filter: `blur(${recede * 3}px)`,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 58,
          fontWeight: 700,
          letterSpacing: 1,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {OPENING_TEXT}
      </span>
    </div>
  );
};
