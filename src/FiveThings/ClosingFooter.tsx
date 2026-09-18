import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CLOSING1_Y,
  CLOSING2_Y,
  CLOSING_1,
  CLOSING_2,
  CONTENT_W,
  FOOT_RULE_Y,
  PAD_LEFT,
  T,
} from "./timeline";

const lineStyle: React.CSSProperties = {
  position: "absolute",
  left: PAD_LEFT,
  whiteSpace: "nowrap",
  fontFamily: poppins,
  fontSize: 30,
  fontWeight: 700,
  letterSpacing: 1.2,
};

export const ClosingFooter: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.footRuleStart, T.footRuleStart + T.footRuleDur],
    [0, CONTENT_W],
    easeOutCubic,
  );
  const line1 = fadeSlide(frame, T.closing1Start, T.closing1Dur, 14);
  const line2 = fadeSlide(frame, T.closing2Start, T.closing2Dur, 14);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: FOOT_RULE_Y,
          width: rule,
          height: 1,
          background: palette.hairline,
        }}
      />
      <span
        style={{
          ...lineStyle,
          top: CLOSING1_Y,
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
          color: palette.softWhite,
        }}
      >
        {CLOSING_1}
      </span>
      <span
        style={{
          ...lineStyle,
          top: CLOSING2_Y,
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
          color: palette.warmGold,
        }}
      >
        {CLOSING_2}
      </span>
    </>
  );
};
