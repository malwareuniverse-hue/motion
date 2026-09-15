import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import {
  BENEFIT_1,
  BENEFIT_2,
  BENEFIT_3,
  HEADLINE_ACCENT,
  HEADLINE_LEAD,
  T,
} from "./timeline";

type BenefitLineProps = { text: string; start: number };

const BenefitLine: React.FC<BenefitLineProps> = ({ text, start }) => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, start, T.benefitDur, 18);

  return (
    <span
      style={{
        maxWidth: "88%",
        opacity: reveal.opacity,
        transform: `translateY(${reveal.translateY}px)`,
        fontFamily: poppins,
        fontSize: 32,
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: 0.4,
        color: palette.mutedGraySoft,
        textAlign: "center",
      }}
    >
      {text}
    </span>
  );
};

/**
 * The framework claim and its payoff share one stage: "FIVE" lands as the
 * headline, then the three-clause payoff sentence stacks in underneath it
 * one clause at a time, each staying on screen as the next arrives.
 */
export const BenefitStack: React.FC = () => {
  const frame = useCurrentFrame();
  const headline = fadeSlide(frame, T.headlineIn, T.headlineDur, 22);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 46,
        padding: "0 76px",
      }}
    >
      <span
        style={{
          maxWidth: "92%",
          opacity: headline.opacity,
          transform: `translateY(${headline.translateY}px)`,
          fontFamily: poppins,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: 0.6,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {HEADLINE_LEAD}
        <span style={{ color: palette.warmGold }}>{HEADLINE_ACCENT}</span>
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        <BenefitLine text={BENEFIT_1} start={T.benefit1In} />
        <BenefitLine text={BENEFIT_2} start={T.benefit2In} />
        <BenefitLine text={BENEFIT_3} start={T.benefit3In} />
      </div>
    </div>
  );
};
