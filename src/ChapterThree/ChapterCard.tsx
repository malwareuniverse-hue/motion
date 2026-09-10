import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CONTENT_LEFT,
  HEADLINE_LINE_1_ACCENT,
  HEADLINE_LINE_1_LEAD,
  HEADLINE_LINE_2,
  HEADLINE_LINE_H,
  HEADLINE_Y,
  LABEL_TEXT,
  LABEL_Y,
  RULE_Y,
  T,
} from "./timeline";

const headlineStyle: React.CSSProperties = {
  position: "absolute",
  left: CONTENT_LEFT,
  fontFamily: poppins,
  fontSize: 82,
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: 1,
  color: palette.softWhite,
  whiteSpace: "nowrap",
};

export const ChapterCard: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.ruleStart, T.ruleStart + T.ruleDur],
    [0, T.ruleWidth],
    easeOutCubic,
  );
  const label = fadeSlide(frame, T.labelStart, T.labelDur, 10);
  const line1 = fadeSlide(frame, T.line1Start, T.lineDur, 16);
  const line2 = fadeSlide(frame, T.line2Start, T.lineDur, 16);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: CONTENT_LEFT,
          top: RULE_Y,
          width: rule,
          height: 3,
          background: palette.warmGold,
          borderRadius: 2,
        }}
      />

      <span
        style={{
          position: "absolute",
          left: CONTENT_LEFT,
          top: LABEL_Y,
          opacity: label.opacity,
          transform: `translateY(${label.translateY}px)`,
          fontFamily: poppins,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 7,
          color: palette.warmGold,
        }}
      >
        {LABEL_TEXT}
      </span>

      <span
        style={{
          ...headlineStyle,
          top: HEADLINE_Y,
          opacity: line1.opacity,
          transform: `translateY(${line1.translateY}px)`,
        }}
      >
        {HEADLINE_LINE_1_LEAD}
        <span style={{ color: palette.warmGold }}>
          {HEADLINE_LINE_1_ACCENT}
        </span>
      </span>

      <span
        style={{
          ...headlineStyle,
          top: HEADLINE_Y + HEADLINE_LINE_H,
          opacity: line2.opacity,
          transform: `translateY(${line2.translateY}px)`,
        }}
      >
        {HEADLINE_LINE_2}
      </span>
    </>
  );
};
