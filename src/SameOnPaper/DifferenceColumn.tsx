import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import {
  CHIP_H,
  CHIP_W,
  CHIP_X,
  CHIP_FIRST_Y,
  DIFFERENCE_CHIPS,
  SPINE_W,
  T,
  chipY,
  type DifferenceChip,
} from "./timeline";

/** The spine starts just under House B's card, so the list reads as its own. */
const SPINE_TOP = CHIP_FIRST_Y - CHIP_H / 2 - 12;
const spineReach = (index: number) => chipY(index) + CHIP_H / 2 - SPINE_TOP;

/**
 * A single warm-gold edge shared by every chip. It grows only as far as the
 * chips revealed so far, so the column reads as value being added.
 */
const Spine: React.FC = () => {
  const frame = useCurrentFrame();

  const input: number[] = [];
  const output: number[] = [];
  DIFFERENCE_CHIPS.forEach((chip, i) => {
    const start = chip.inStart - 8;
    input.push(start, start + T.spineDur);
    output.push(i === 0 ? 0 : spineReach(i - 1), spineReach(i));
  });

  const height = interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutCubic,
  });

  if (height <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: CHIP_X,
        top: SPINE_TOP,
        width: SPINE_W,
        height,
        background: palette.gold,
      }}
    />
  );
};

const Chip: React.FC<{ chip: DifferenceChip; index: number }> = ({
  chip,
  index,
}) => {
  const frame = useCurrentFrame();

  const enter = fadeRise(frame, chip.inStart, T.chipDur, 10);
  // Controlled scale change, 98% -> 100%. No bounce.
  const scale = clampedInterp(
    frame,
    [chip.inStart, chip.inStart + T.chipDur],
    [0.98, 1],
    easeOutCubic,
  );

  if (enter.opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: CHIP_X + SPINE_W,
        top: chipY(index),
        width: CHIP_W - SPINE_W,
        height: CHIP_H,
        transform: `translateY(-50%) translateY(${enter.translateY}px) scale(${scale})`,
        transformOrigin: "left center",
        opacity: enter.opacity,
        background: palette.charcoal,
        borderRadius: "0 8px 8px 0",
        display: "flex",
        alignItems: "center",
        paddingLeft: 26,
        boxShadow: "0 18px 36px -30px rgba(0, 0, 0, 0.9)",
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 21,
          fontWeight: 500,
          letterSpacing: 2.2,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {chip.label}
      </span>
    </div>
  );
};

export const DifferenceColumn: React.FC = () => (
  <>
    <Spine />
    {DIFFERENCE_CHIPS.map((chip, i) => (
      <Chip key={chip.label} chip={chip} index={i} />
    ))}
  </>
);
