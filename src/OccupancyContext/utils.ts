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

export const fadeSlide = (
  frame: number,
  start: number,
  dur: number,
  distance = 18,
) => {
  const t = clampedInterp(frame, [start, start + dur], [0, 1], Easing.out(Easing.cubic));
  return { opacity: t, translateY: (1 - t) * distance };
};

export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInCubic  = Easing.in(Easing.cubic);
