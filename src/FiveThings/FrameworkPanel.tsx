import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { HeaderSwap } from "./HeaderSwap";
import { CheckRow } from "./CheckRow";
import { ClosingFooter } from "./ClosingFooter";
import {
  CHECKS,
  CONTENT_W,
  GROW_FRAMES,
  GROW_HEIGHTS,
  HEAD_RULE_Y,
  PAD_LEFT,
  PANEL_LEFT,
  PANEL_TOP,
  PANEL_W,
  T,
} from "./timeline";

export const FrameworkPanel: React.FC = () => {
  const frame = useCurrentFrame();

  // One curve for both the entrance wipe and the per-check growth. It moves
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

      <HeaderSwap />

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

      {CHECKS.map((spec) => (
        <CheckRow key={spec.slot} spec={spec} />
      ))}

      <ClosingFooter />
    </div>
  );
};
