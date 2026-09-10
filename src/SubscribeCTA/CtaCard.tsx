import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic, fadeSlide } from "./utils";
import { PlayMark } from "./icons";
import { HeadlineSwap } from "./HeadlineSwap";
import { BenefitRow } from "./BenefitRow";
import {
  BENEFITS,
  CARD_LEFT,
  CARD_TOP,
  CARD_W,
  DIVIDER_Y,
  GROW_FRAMES,
  GROW_HEIGHTS,
  LABEL_TEXT,
  LABEL_Y,
  PAD_LEFT,
  T,
} from "./timeline";

const MARK_SLOT_W = 46;

export const CtaCard: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = clampedInterp(
    frame,
    [T.cardStart, T.cardStart + T.cardDur],
    [0, 1],
    easeOutCubic,
  );
  const exit = clampedInterp(
    frame,
    [T.outStart, T.outStart + T.outDur],
    [0, 1],
    easeInCubic,
  );

  // the card holds only what has been said so far, then grows for each benefit
  const cardHeight = interpolate(frame, GROW_FRAMES, GROW_HEIGHTS, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // the warm-gold rule draws on first, text follows — never the other way round
  const ruleDraw = clampedInterp(
    frame,
    [T.ruleDrawStart, T.ruleDrawStart + T.ruleDrawDur],
    [0, 1],
    easeOutCubic,
  );
  const rule = ruleDraw * (cardHeight - 96);
  const label = fadeSlide(frame, T.labelStart, T.labelDur, 10);
  const mark = clampedInterp(
    frame,
    [T.markStart, T.markStart + T.markDur],
    [0, 1],
    easeOutCubic,
  );
  const divider = clampedInterp(
    frame,
    [T.dividerStart, T.dividerStart + T.dividerDur],
    [0, CARD_W - PAD_LEFT - 96],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: CARD_LEFT,
        top: CARD_TOP,
        width: CARD_W,
        height: cardHeight,
        opacity: enter * (1 - exit),
        transform: `translateY(${(1 - enter) * 20 + exit * 18}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: palette.panel,
          border: `1px solid ${palette.panelBorder}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 48,
          width: 4,
          height: rule,
          background: palette.amber,
          borderRadius: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: LABEL_Y,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: label.opacity,
          transform: `translateY(${label.translateY}px)`,
        }}
      >
        <div
          style={{
            width: MARK_SLOT_W,
            display: "flex",
            alignItems: "center",
            opacity: mark,
            transform: `scale(${0.98 + mark * 0.02})`,
          }}
        >
          <PlayMark color={palette.amber} size={44} />
        </div>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: 4.6,
            color: palette.amber,
          }}
        >
          {LABEL_TEXT}
        </span>
      </div>

      <HeadlineSwap />

      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: DIVIDER_Y,
          width: divider,
          height: 1,
          background: palette.rule,
        }}
      />

      {BENEFITS.map((spec) => (
        <BenefitRow key={spec.slot} spec={spec} />
      ))}
    </div>
  );
};
