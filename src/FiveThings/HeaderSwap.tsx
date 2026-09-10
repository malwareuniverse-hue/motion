import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import {
  CONTENT_W,
  HEADER_A,
  HEADER_B,
  HEADER_Y,
  PAD_LEFT,
  T,
} from "./timeline";

const labelStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: CONTENT_W,
  whiteSpace: "nowrap",
  fontFamily: poppins,
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: 4.5,
  color: palette.warmGold,
};

export const HeaderSwap: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = clampedInterp(
    frame,
    [T.headerStart, T.headerStart + T.headerDur],
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
        top: HEADER_Y,
        width: CONTENT_W,
      }}
    >
      <span
        style={{
          ...labelStyle,
          opacity: enter * (1 - swap),
          transform: `translateY(${(1 - enter) * 10 - swap * 8}px)`,
        }}
      >
        {HEADER_A}
      </span>
      <span
        style={{
          ...labelStyle,
          opacity: swap,
          transform: `translateY(${(1 - swap) * 10}px)`,
        }}
      >
        {HEADER_B}
      </span>
    </div>
  );
};
