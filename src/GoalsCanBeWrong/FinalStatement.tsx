import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { LINE_3, T } from "./timeline";

/**
 * The closing line: the widest of the three claims, so it drops the icon
 * and lands as a plain typographic escalation — gold, larger than either
 * goal headline, introduced by a rule drawing open rather than an icon.
 */
export const FinalStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const rule = clampedInterp(
    frame,
    [T.beat3In - 6, T.beat3In + 16],
    [0, 130],
    easeOutCubic,
  );
  const text = fadeSlide(frame, T.beat3In + 6, 24, 20);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: "0 64px",
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
          opacity: text.opacity,
          transform: `translateY(${text.translateY}px) scale(${0.96 + text.opacity * 0.04})`,
          fontFamily: poppins,
          fontSize: 66,
          fontWeight: 800,
          lineHeight: 1.24,
          letterSpacing: 0.5,
          color: palette.warmGold,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {LINE_3}
      </span>
    </div>
  );
};
