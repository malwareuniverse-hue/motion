import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { PropertyCard } from "./PropertyCard";
import {
  CALLOUT_A,
  CALLOUT_B,
  CARD_A_NIGHTS_FILLED,
  CARD_A_RATE,
  CARD_A_REVENUE,
  CARD_B_NIGHTS_FILLED,
  CARD_B_RATE,
  CARD_B_REVENUE,
  SETUP_LINE,
  T,
} from "./timeline";

export const PropertyDuel: React.FC = () => {
  const frame = useCurrentFrame();
  const setup = fadeSlide(frame, T.setupIn, T.setupDur, 16);
  const calloutB = fadeSlide(frame, T.calloutBIn, T.calloutDur, 14);
  const calloutA = fadeSlide(frame, T.calloutAIn, T.calloutDur, 14);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 34,
        padding: "0 100px",
      }}
    >
      <span
        style={{
          opacity: setup.opacity,
          transform: `translateY(${setup.translateY}px)`,
          fontFamily: poppins,
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: 1.5,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {SETUP_LINE}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 1300,
        }}
      >
        <PropertyCard
          nightsFilled={CARD_A_NIGHTS_FILLED}
          rate={CARD_A_RATE}
          revenue={CARD_A_REVENUE}
          buildIn={T.cardABuildIn}
          revenueIn={T.cardARevenueIn}
        />
        <div
          style={{ width: 2, height: 260, background: palette.hairline }}
        />
        <PropertyCard
          nightsFilled={CARD_B_NIGHTS_FILLED}
          rate={CARD_B_RATE}
          revenue={CARD_B_REVENUE}
          buildIn={T.cardBBuildIn}
          revenueIn={T.cardBRevenueIn}
        />
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1300,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            padding: "0 50px",
          }}
        >
          <span
            style={{
              opacity: calloutA.opacity,
              transform: `translateY(${calloutA.translateY}px)`,
              fontFamily: poppins,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 0.6,
              color: palette.warmGold,
              textAlign: "center",
            }}
          >
            {CALLOUT_A}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            padding: "0 50px",
          }}
        >
          <span
            style={{
              opacity: calloutB.opacity,
              transform: `translateY(${calloutB.translateY}px)`,
              fontFamily: poppins,
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 0.6,
              color: palette.mutedGraySoft,
              textAlign: "center",
            }}
          >
            {CALLOUT_B}
          </span>
        </div>
      </div>
    </div>
  );
};
