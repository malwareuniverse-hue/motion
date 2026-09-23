import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CMP_A_TEXT,
  CMP_A_Y,
  CMP_B_TEXT,
  CMP_B_Y,
  CMP_RULE_Y,
  CONTENT_W,
  PAD_LEFT,
  T,
} from "./timeline";

const lineStyle: React.CSSProperties = {
  position: "absolute",
  left: PAD_LEFT,
  whiteSpace: "nowrap",
  fontFamily: poppins,
  fontSize: 28,
  fontWeight: 700,
  letterSpacing: 1.2,
};

/**
 * The closing contrast. Nothing separates the two lines but the colour — muted
 * gray for the habit, gold for the answer — which is the whole comparison.
 */
export const ContrastBlock: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.cmpRuleStart, T.cmpRuleStart + T.cmpRuleDur],
    [0, CONTENT_W],
    easeOutCubic,
  );
  const lineA = fadeSlide(frame, T.cmpAStart, T.cmpADur, 14);
  const lineB = fadeSlide(frame, T.cmpBStart, T.cmpBDur, 14);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: CMP_RULE_Y,
          width: rule,
          height: 1,
          background: palette.hairline,
        }}
      />
      <span
        style={{
          ...lineStyle,
          top: CMP_A_Y,
          opacity: lineA.opacity,
          transform: `translateY(${lineA.translateY}px)`,
          color: palette.mutedGray,
        }}
      >
        {CMP_A_TEXT}
      </span>
      <span
        style={{
          ...lineStyle,
          top: CMP_B_Y,
          opacity: lineB.opacity,
          transform: `translateY(${lineB.translateY}px)`,
          color: palette.warmGold,
        }}
      >
        {CMP_B_TEXT}
      </span>
    </>
  );
};
