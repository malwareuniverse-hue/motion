import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { PinIcon } from "./icons";

const AXIS_W = 820;
const MAX_DAYS = 130;

const xForDays = (days: number) => AXIS_W * (1 - days / MAX_DAYS);

type MarkerProps = {
  days: number;
  label: string;
  revealIn: number;
  dur: number;
  color: string;
};

const Marker: React.FC<MarkerProps> = ({ days, label, revealIn, dur, color }) => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, revealIn, dur, -22);
  const x = xForDays(days);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 46,
        transform: `translateX(-50%) translateY(${reveal.translateY}px)`,
        opacity: reveal.opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 0.6,
          color: palette.mutedGraySoft,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 26,
          fontWeight: 700,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {days}
      </span>
      <PinIcon size={22} color={color} />
    </div>
  );
};

type BookingTimelineProps = {
  marketDays: number;
  yourDays: number;
  marketIn: number;
  yourIn: number;
  dur: number;
};

export const BookingTimeline: React.FC<BookingTimelineProps> = ({
  marketDays,
  yourDays,
  marketIn,
  yourIn,
  dur,
}) => {
  const frame = useCurrentFrame();
  const axisReveal = clampedInterp(
    frame,
    [marketIn - 10, marketIn + 12],
    [0, 1],
    easeOutCubic,
  );
  const gapReveal = clampedInterp(
    frame,
    [yourIn, yourIn + dur],
    [0, 1],
    easeOutCubic,
  );

  const gapLeft = Math.min(xForDays(marketDays), xForDays(yourDays));
  const gapWidth = Math.abs(xForDays(marketDays) - xForDays(yourDays));

  return (
    <div
      style={{
        position: "relative",
        width: AXIS_W,
        height: 128,
        opacity: axisReveal,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: gapLeft,
          bottom: 46,
          width: gapWidth * gapReveal,
          height: 4,
          background: palette.warmGold,
          opacity: 0.5,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 46,
          height: 2,
          background: palette.hairline,
        }}
      />
      <Marker
        days={marketDays}
        label="MARKET"
        revealIn={marketIn}
        dur={dur}
        color={palette.mutedGray}
      />
      <Marker
        days={yourDays}
        label="YOU"
        revealIn={yourIn}
        dur={dur}
        color={palette.warmGold}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          fontFamily: poppins,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 2,
          color: palette.mutedGraySoft,
          whiteSpace: "nowrap",
        }}
      >
        DAYS OUT
      </span>
    </div>
  );
};
