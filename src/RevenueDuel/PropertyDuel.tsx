import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { PropertyCard } from "./PropertyCard";
import {
  CARD_A_LABEL,
  CARD_A_NIGHTS_FILLED,
  CARD_A_RATE,
  CARD_B_LABEL,
  CARD_B_NIGHTS_FILLED,
  CARD_B_RATE,
  T,
  VS_LABEL,
} from "./timeline";

/**
 * The two properties, side by side, dimming once the question lands so the
 * overlay reads as the point of the frame rather than a caption over it.
 */
export const PropertyDuel: React.FC = () => {
  const frame = useCurrentFrame();
  const vsReveal = fadeSlide(frame, T.vsIn, T.cardDur, 12);
  const dim = clampedInterp(
    frame,
    [T.duelDimStart, T.duelDimStart + T.duelDimDur],
    [1, 0.32],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 120px",
        opacity: dim,
      }}
    >
      <PropertyCard
        label={CARD_A_LABEL}
        labelIn={T.cardALabelIn}
        rate={CARD_A_RATE}
        rateIn={T.cardARateIn}
        nightsFilled={CARD_A_NIGHTS_FILLED}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          padding: "0 30px",
          opacity: vsReveal.opacity,
        }}
      >
        <div
          style={{ width: 2, height: 90, background: palette.hairline }}
        />
        <span
          style={{
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2,
            color: palette.mutedGray,
          }}
        >
          {VS_LABEL}
        </span>
        <div
          style={{ width: 2, height: 90, background: palette.hairline }}
        />
      </div>

      <PropertyCard
        label={CARD_B_LABEL}
        labelIn={T.cardBLabelIn}
        rate={CARD_B_RATE}
        rateIn={T.cardBRateIn}
        nightsFilled={CARD_B_NIGHTS_FILLED}
      />
    </div>
  );
};
