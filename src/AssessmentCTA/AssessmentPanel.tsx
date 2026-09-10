import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic, fadeSlide } from "./utils";
import { OutcomeRow } from "./OutcomeRow";
import { CtaBlock } from "./CtaBlock";
import { ContrastBlock } from "./ContrastBlock";
import {
  CONTENT_W,
  GROW_FRAMES,
  GROW_HEIGHTS,
  HEADER_TEXT,
  HEADER_Y,
  HEAD_RULE_Y,
  OUTCOMES,
  PAD_LEFT,
  PANEL_LEFT,
  PANEL_TOP,
  PANEL_W,
  T,
} from "./timeline";

export const AssessmentPanel: React.FC = () => {
  const frame = useCurrentFrame();

  // One curve for both the entrance wipe and the per-beat growth. It moves
  // height, never opacity, so the panel is fully opaque on every frame — a
  // half-faded surface over chroma green is what makes a key go grey.
  const height = interpolate(frame, GROW_FRAMES, GROW_HEIGHTS, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Exit slides the panel out of frame rather than fading it, for the same reason.
  const exit = clampedInterp(
    frame,
    [T.outStart, T.outStart + T.outDur],
    [0, 1],
    easeInCubic,
  );

  const header = fadeSlide(frame, T.headerStart, T.headerDur, 10);
  const headRule = clampedInterp(
    frame,
    [T.headRuleStart, T.headRuleStart + T.headRuleDur],
    [0, CONTENT_W],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: PANEL_LEFT,
        top: PANEL_TOP,
        width: PANEL_W,
        height,
        borderRadius: 18,
        background: palette.charcoal,
        overflow: "hidden",
        transform: `translateX(${exit * -(PANEL_LEFT + PANEL_W + 40)}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 44,
          bottom: 44,
          width: 4,
          background: palette.warmGold,
          borderRadius: 2,
        }}
      />

      <span
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: HEADER_Y,
          whiteSpace: "nowrap",
          opacity: header.opacity,
          transform: `translateY(${header.translateY}px)`,
          fontFamily: poppins,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: 4.5,
          color: palette.warmGold,
        }}
      >
        {HEADER_TEXT}
      </span>

      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: HEAD_RULE_Y,
          width: headRule,
          height: 1,
          background: palette.hairline,
        }}
      />

      {OUTCOMES.map((spec) => (
        <OutcomeRow key={spec.slot} spec={spec} />
      ))}

      <CtaBlock />
      <ContrastBlock />
    </div>
  );
};
