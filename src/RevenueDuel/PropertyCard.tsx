import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { HouseIcon, NightsStrip } from "./icons";
import { NIGHTS_STRIP_TOTAL, T } from "./timeline";

type PropertyCardProps = {
  label: string;
  labelIn: number;
  rate: string;
  rateIn: number;
  nightsFilled: number;
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  label,
  labelIn,
  rate,
  rateIn,
  nightsFilled,
}) => {
  const frame = useCurrentFrame();
  const houseReveal = fadeSlide(frame, labelIn, T.cardDur, 16);
  const labelReveal = fadeSlide(frame, labelIn, T.cardDur, 18);
  const rateReveal = fadeSlide(frame, rateIn, T.cardDur, 18);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        padding: "0 50px",
      }}
    >
      <div style={{ opacity: houseReveal.opacity }}>
        <HouseIcon size={70} color={palette.softWhite} />
      </div>

      <div
        style={{
          opacity: labelReveal.opacity,
          transform: `translateY(${labelReveal.translateY}px)`,
        }}
      >
        <NightsStrip
          filled={nightsFilled}
          total={NIGHTS_STRIP_TOTAL}
          fillColor={palette.warmGold}
          color={palette.mutedGraySoft}
        />
      </div>

      <span
        style={{
          opacity: labelReveal.opacity,
          transform: `translateY(${labelReveal.translateY}px)`,
          fontFamily: poppins,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 1,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {label}
      </span>

      <span
        style={{
          opacity: rateReveal.opacity,
          transform: `translateY(${rateReveal.translateY}px)`,
          fontFamily: poppins,
          fontSize: 46,
          fontWeight: 700,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {rate}
      </span>
    </div>
  );
};
