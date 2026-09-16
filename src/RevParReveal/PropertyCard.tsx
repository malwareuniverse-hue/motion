import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { HouseIcon, NightsStrip, PriceTagIcon } from "./icons";
import { NIGHTS_TOTAL, T } from "./timeline";

type PropertyCardProps = {
  nightsFilled: number;
  rate: string;
  revenue: string;
  buildIn: number;
  revenueIn: number;
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  nightsFilled,
  rate,
  revenue,
  buildIn,
  revenueIn,
}) => {
  const frame = useCurrentFrame();
  const build = fadeSlide(frame, buildIn, T.cardDur, 18);
  const revenueReveal = fadeSlide(frame, revenueIn, T.cardDur, 18);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "0 50px",
      }}
    >
      <div style={{ opacity: build.opacity }}>
        <HouseIcon size={62} color={palette.softWhite} />
      </div>

      <div
        style={{
          opacity: build.opacity,
          transform: `translateY(${build.translateY}px)`,
        }}
      >
        <NightsStrip
          filled={nightsFilled}
          total={NIGHTS_TOTAL}
          fillColor={palette.warmGold}
          color={palette.mutedGraySoft}
        />
      </div>

      <span
        style={{
          opacity: build.opacity,
          transform: `translateY(${build.translateY}px)`,
          fontFamily: poppins,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 0.8,
          color: palette.mutedGraySoft,
        }}
      >
        {nightsFilled}/{NIGHTS_TOTAL} NIGHTS SOLD
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: build.opacity,
          transform: `translateY(${build.translateY}px)`,
        }}
      >
        <PriceTagIcon size={26} color={palette.warmGold} />
        <span
          style={{
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 600,
            color: palette.softWhite,
          }}
        >
          {rate}
        </span>
      </div>

      <div
        style={{
          height: 2,
          width: 60,
          background: palette.hairline,
          margin: "6px 0",
        }}
      />

      <span
        style={{
          opacity: revenueReveal.opacity,
          transform: `translateY(${revenueReveal.translateY}px)`,
          fontFamily: poppins,
          fontSize: 44,
          fontWeight: 700,
          color: palette.warmGold,
        }}
      >
        {revenue}
      </span>
    </div>
  );
};
