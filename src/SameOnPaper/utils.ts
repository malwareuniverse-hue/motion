import { Easing, interpolate } from "remotion";

export const clampedInterp = (
  frame: number,
  range: [number, number],
  output: [number, number],
  easing?: (t: number) => number,
) =>
  interpolate(frame, range, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInOutCubic = Easing.inOut(Easing.cubic);

/**
 * PBM-approved entrance: soft opacity fade with an 8-12 frame upward move.
 * No bounce, no elastic, no overshoot.
 */
export const fadeRise = (
  frame: number,
  start: number,
  dur: number,
  distance = 10,
) => {
  const t = clampedInterp(frame, [start, start + dur], [0, 1], easeOutCubic);
  return { opacity: t, translateY: (1 - t) * distance };
};

/** Fade in, hold, fade out. Returns opacity only. */
export const fadeInOut = (
  frame: number,
  inStart: number,
  inDur: number,
  outStart: number,
  outDur: number,
) =>
  interpolate(
    frame,
    [inStart, inStart + inDur, outStart, outStart + outDur],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOutCubic,
    },
  );
