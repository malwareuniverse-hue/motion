import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";

type SquareRowProps = {
  filled: number;
  total: number;
  color: string;
  fillColor: string;
  cell?: number;
};

const SquareRow: React.FC<SquareRowProps> = ({
  filled,
  total,
  color,
  fillColor,
  cell = 34,
}) => (
  <svg width={total * cell} height={cell * 0.78}>
    {Array.from({ length: total }).map((_, i) => (
      <rect
        key={i}
        x={i * cell}
        y={0}
        width={cell * 0.78}
        height={cell * 0.78}
        rx={5}
        fill={i < filled ? fillColor : "none"}
        stroke={i < filled ? fillColor : color}
        strokeWidth={2}
      />
    ))}
  </svg>
);

type RowProps = {
  label: string;
  filled: number;
  total: number;
  revealIn: number;
  dur: number;
  fillColor: string;
};

const Row: React.FC<RowProps> = ({
  label,
  filled,
  total,
  revealIn,
  dur,
  fillColor,
}) => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, revealIn, dur, 16);

  return (
    <div
      style={{
        opacity: reveal.opacity,
        transform: `translateY(${reveal.translateY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: 1.5,
          color: palette.mutedGraySoft,
        }}
      >
        {label}
      </span>
      <SquareRow
        filled={filled}
        total={total}
        color={palette.mutedGraySoft}
        fillColor={fillColor}
      />
    </div>
  );
};

type WeekendStripProps = {
  otherLabel: string;
  otherFilled: number;
  otherTotal: number;
  youIn: number;
  otherIn: number;
  dur: number;
};

export const WeekendStrip: React.FC<WeekendStripProps> = ({
  otherLabel,
  otherFilled,
  otherTotal,
  youIn,
  otherIn,
  dur,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <Row
        label="YOU"
        filled={0}
        total={4}
        revealIn={youIn}
        dur={dur}
        fillColor={palette.warmGold}
      />
      <Row
        label={otherLabel}
        filled={otherFilled}
        total={otherTotal}
        revealIn={otherIn}
        dur={dur}
        fillColor={palette.warmGold}
      />
    </div>
  );
};
