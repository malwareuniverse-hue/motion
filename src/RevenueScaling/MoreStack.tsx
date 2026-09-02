import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { Kicker } from "./Primitives";
import { cardGrid, useLayout, type Layout } from "./layout";
import { CARD_IN_DUR, MORE_CARDS, T, type MoreCard } from "./timeline";

const MoreCardTile: React.FC<{ spec: MoreCard; index: number; l: Layout }> = ({
  spec,
  index,
  l,
}) => {
  const frame = useCurrentFrame();
  const grid = cardGrid(l);
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
        left: grid.x(index),
        top: grid.y(index),
        width: l.card.w,
        height: l.card.h,
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
          fontSize: l.type.card,
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
 * decisions compound while everything else merely adds. Three columns in 16:9,
 * a single column in 9:16.
 */
export const MoreStack: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();

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
          top: l.card.kickerTop,
          opacity: kicker.opacity,
          transform: `translateY(${kicker.translateY}px)`,
        }}
      >
        <Kicker>IT MEANS</Kicker>
      </div>

      <div style={{ position: "absolute", inset: 0, opacity: cardDim }}>
        {MORE_CARDS.map((spec, i) => (
          <MoreCardTile key={spec.text} spec={spec} index={i} l={l} />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: l.card.heroTop,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            width: l.portrait ? 180 : 240,
            height: 2,
            background: palette.gold,
            transform: `scaleX(${rule})`,
            transformOrigin: "center",
          }}
        />
        <div
          style={{
            fontFamily: poppins,
            fontSize: l.type.hero,
            fontWeight: 700,
            letterSpacing: 0.4,
            lineHeight: 1.18,
            textAlign: "center",
            color: palette.white,
            opacity: hero.opacity,
            transform: `translateY(${hero.translateY}px)`,
          }}
        >
          <span style={{ color: palette.gold }}>EXPONENTIALLY</span>
          {l.portrait ? <br /> : " "}
          MORE DECISIONS
        </div>
      </div>
    </div>
  );
};
