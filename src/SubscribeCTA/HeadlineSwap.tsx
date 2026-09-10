import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import {
  HEADLINE_A,
  HEADLINE_B,
  HEADLINE_H,
  HEADLINE_Y,
  PAD_LEFT,
  T,
} from "./timeline";

const HEADLINE_W = 700;

const headlineStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: HEADLINE_W,
  fontFamily: poppins,
  fontSize: 46,
  fontWeight: 700,
  lineHeight: 1.16,
  letterSpacing: 0.8,
  color: palette.cream,
};

export const HeadlineSwap: React.FC = () => {
  const frame = useCurrentFrame();

  const enterA = clampedInterp(
    frame,
    [T.headlineAStart, T.headlineAStart + T.headlineADur],
    [0, 1],
    easeOutCubic,
  );
  const swap = clampedInterp(
    frame,
    [T.swapStart, T.swapStart + T.swapDur],
    [0, 1],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: PAD_LEFT,
        top: HEADLINE_Y,
        width: HEADLINE_W,
        height: HEADLINE_H,
      }}
    >
      <span
        style={{
          ...headlineStyle,
          opacity: enterA * (1 - swap),
          transform: `translateY(${(1 - enterA) * 14 - swap * 12}px)`,
        }}
      >
        {HEADLINE_A}
      </span>
      <span
        style={{
          ...headlineStyle,
          opacity: swap,
          transform: `translateY(${(1 - swap) * 14}px)`,
        }}
      >
        {HEADLINE_B}
      </span>
    </div>
  );
};
