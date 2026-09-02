import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { Kicker } from "./Primitives";
import {
  CARD_H,
  CARD_IN_DUR,
  CARD_W,
  MORE_CARDS,
  T,
  cardX,
  cardY,
  type MoreCard,
} from "./timeline";

const MoreCardTile: React.FC<{ spec: MoreCard }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { opacity, translateY } = fadeUp(frame, spec.in, CARD_IN_DUR, 14);
  const tick = clampedInterp(
    frame,
    [spec.in + 4, spec.in + 24],
    [0, 1],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: cardX(spec.col),
        top: cardY(spec.row),
        width: CARD_W,
        height: CARD_H,
        background: palette.panel,
        border: `1px solid ${palette.panelBorder}`,
        display: "flex",
        alignItems: "center",
        gap: 22,
        paddingLeft: 28,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 3,
          height: 40,
          background: palette.gold,
          transform: `scaleY(${tick})`,
          transformOrigin: "center",
        }}
      />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 29,
          fontWeight: 600,
          letterSpacing: 1.4,
          color: palette.white,
        }}
      >
        {spec.text}
      </span>
    </div>
  );
};

/**
 * THE "MORE" STACK (0:32–0:46). Six equal-weight cards reveal one per beat, then
 * the frame resolves into the one line that isn't equal to the others — the
 * decisions compound while everything else merely adds.
 */
export const MoreStack: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = beatOpacity(
    frame,
    T.stackLabelIn,
    1,
    T.stackOut,
    T.stackOutDur,
  );
  if (opacity <= 0) return null;

  const kicker = fadeUp(frame, T.stackLabelIn, 24, 12);
  const rule = clampedInterp(
    frame,
    [T.stackRuleIn, T.stackRuleIn + 26],
    [0, 1],
    easeOutCubic,
  );
  const hero = fadeUp(frame, T.stackHeroIn, T.stackHeroDur, 16);
  // the cards recede once the conclusion arrives, so there is one focal point
  const cardDim = clampedInterp(
    frame,
    [T.stackHeroIn, T.stackHeroIn + T.stackHeroDur],
    [1, 0.42],
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 262,
          opacity: kicker.opacity,
          transform: `translateY(${kicker.translateY}px)`,
        }}
      >
        <Kicker>IT MEANS</Kicker>
      </div>

      <div style={{ position: "absolute", inset: 0, opacity: cardDim }}>
        {MORE_CARDS.map((spec) => (
          <MoreCardTile key={spec.text} spec={spec} />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 716,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            width: 240,
            height: 2,
            background: palette.gold,
            transform: `scaleX(${rule})`,
            transformOrigin: "center",
          }}
        />
        <div
          style={{
            fontFamily: poppins,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: 0.4,
            color: palette.white,
            opacity: hero.opacity,
            transform: `translateY(${hero.translateY}px)`,
          }}
        >
          <span style={{ color: palette.gold }}>EXPONENTIALLY</span> MORE
          DECISIONS
        </div>
      </div>
    </div>
  );
};
