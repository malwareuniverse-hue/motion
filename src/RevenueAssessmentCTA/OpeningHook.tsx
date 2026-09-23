import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { HOOK_LINE_1, HOOK_LINE_2, T } from "./timeline";

export const OpeningHook: React.FC = () => {
  const frame = useCurrentFrame();

  const recede = clampedInterp(
    frame,
    [T.hookRecedeStart, T.hookRecedeStart + T.hookRecedeDur],
    [0, 1],
    easeOutCubic,
  );

  const line1 = fadeSlide(frame, T.hookLine1In, T.hookDur, 20);
  const line2 = fadeSlide(frame, T.hookLine2In, T.hookDur, 22);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        padding: "0 90px",
        opacity: 1 - recede,
        transform: `translateY(${-recede * 30}px) scale(${1 - recede * 0.03})`,
        filter: `blur(${recede * 3}px)`,
      }}
    >
      <span
        style={{
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          fontFamily: poppins,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: 1.4,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {HOOK_LINE_1}
      </span>
      <span
        style={{
          maxWidth: "84%",
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          fontFamily: poppins,
          fontSize: 52,
          fontWeight: 800,
          lineHeight: 1.3,
          letterSpacing: 0.4,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {HOOK_LINE_2}
      </span>
    </div>
  );
};
