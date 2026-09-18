import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic, fadeSlide } from "./utils";
import {
  CARD_LEFT,
  CARD_TOP,
  CARD_W,
  GROW_FRAMES,
  GROW_HEIGHTS,
  LINE_1,
  LINE_2,
  LINE_3,
  LINE_4,
  PAD_LEFT,
  PAD_TOP,
  T,
} from "./timeline";

const buildLineStyle: React.CSSProperties = {
  fontFamily: poppins,
  fontSize: 28,
  fontWeight: 600,
  lineHeight: 1.35,
  letterSpacing: 0.3,
  color: palette.softWhite,
};

/**
 * Height, never opacity, for both the entrance and the per-beat growth — the
 * card is fully opaque on every frame, since it renders transparent for
 * compositing over Emile's footage.
 */
export const CtaCard: React.FC = () => {
  const frame = useCurrentFrame();

  const height = interpolate(frame, GROW_FRAMES, GROW_HEIGHTS, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const exit = clampedInterp(
    frame,
    [T.outStart, T.outStart + T.outDur],
    [0, 1],
    easeInCubic,
  );

  const line1 = fadeSlide(frame, T.line1Start, T.buildDur, 16);
  const line2 = fadeSlide(frame, T.line2Start, T.buildDur, 16);
  const line3 = fadeSlide(frame, T.line3Start, T.buildDur, 16);
  const line4 = fadeSlide(frame, T.line4Start, T.line4Dur, 18);

  const rule = clampedInterp(
    frame,
    [T.ruleStart, T.ruleStart + T.ruleDur],
    [0, CARD_W - PAD_LEFT * 2],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: CARD_LEFT,
        top: CARD_TOP,
        width: CARD_W,
        height,
        borderRadius: 18,
        background: palette.panelOverlay,
        overflow: "hidden",
        transform: `translateX(${exit * (CARD_W + CARD_LEFT + 40)}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 40,
          bottom: 40,
          width: 4,
          background: palette.warmGold,
          borderRadius: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: PAD_TOP,
          right: PAD_LEFT,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            ...buildLineStyle,
            opacity: line1.opacity,
            transform: `translateY(${line1.translateY}px)`,
          }}
        >
          {LINE_1}
        </span>
        <span
          style={{
            ...buildLineStyle,
            opacity: line2.opacity,
            transform: `translateY(${line2.translateY}px)`,
          }}
        >
          {LINE_2}
        </span>
        <span
          style={{
            ...buildLineStyle,
            opacity: line3.opacity,
            transform: `translateY(${line3.translateY}px)`,
          }}
        >
          {LINE_3}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: 206,
          width: rule,
          height: 1,
          background: palette.hairlineLift,
        }}
      />

      <span
        style={{
          position: "absolute",
          left: PAD_LEFT,
          right: PAD_LEFT,
          top: 236,
          opacity: line4.opacity,
          transform: `translateY(${line4.translateY}px)`,
          fontFamily: poppins,
          fontSize: 40,
          fontWeight: 800,
          lineHeight: 1.28,
          letterSpacing: 0.4,
          color: palette.warmGold,
        }}
      >
        {LINE_4}
      </span>
    </div>
  );
};
