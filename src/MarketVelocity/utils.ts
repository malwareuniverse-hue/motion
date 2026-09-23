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
export const easeInCubic  = Easing.in(Easing.cubic);
export const easeOutQuart = Easing.out(Easing.quad);
