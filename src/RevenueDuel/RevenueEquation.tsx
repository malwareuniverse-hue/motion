import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { NightsStrip, PriceTagIcon, RevenueBarIcon } from "./icons";
import {
  EQ_NIGHTS_LABEL,
  EQ_RATE_LABEL,
  EQ_REVENUE_LABEL,
  NIGHTS_STRIP_TOTAL,
  T,
} from "./timeline";

const Operator: React.FC<{ symbol: string; revealIn: number }> = ({
  symbol,
  revealIn,
}) => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, revealIn, T.eqDur, 10);
  return (
    <span
      style={{
        opacity: reveal.opacity,
        fontFamily: poppins,
        fontSize: 36,
        fontWeight: 600,
        color: palette.mutedGray,
      }}
    >
      {symbol}
    </span>
  );
};

const EqUnit: React.FC<{
  revealIn: number;
  label: string;
  children: React.ReactNode;
}> = ({ revealIn, label, children }) => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, revealIn, T.eqDur, 14);
  return (
    <div
      style={{
        opacity: reveal.opacity,
        transform: `translateY(${reveal.translateY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ height: 38, display: "flex", alignItems: "center" }}>
        {children}
      </div>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 1.5,
          color: palette.mutedGraySoft,
        }}
      >
        {label}
      </span>
    </div>
  );
};

/**
 * Revenue as an equation built from the same shape language as the property
 * cards: the nights strip, a price tag, and a solid bar for the result —
 * a shape rather than a dollar sign, same rule RevenueLoss set.
 */
export const RevenueEquation: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <EqUnit revealIn={T.eqNightsIn} label={EQ_NIGHTS_LABEL}>
        <NightsStrip
          filled={5}
          total={NIGHTS_STRIP_TOTAL}
          fillColor={palette.warmGold}
          color={palette.mutedGraySoft}
          cell={14}
        />
      </EqUnit>

      <Operator symbol="×" revealIn={T.eqMultiplyIn} />

      <EqUnit revealIn={T.eqRateIn} label={EQ_RATE_LABEL}>
        <PriceTagIcon size={34} color={palette.warmGold} />
      </EqUnit>

      <Operator symbol="=" revealIn={T.eqEqualsIn} />

      <EqUnit revealIn={T.eqRevenueIn} label={EQ_REVENUE_LABEL}>
        <RevenueBarIcon width={26} height={34} />
      </EqUnit>
    </div>
  );
};
