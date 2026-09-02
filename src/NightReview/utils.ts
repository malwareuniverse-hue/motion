import { Easing, interpolate, spring } from "remotion";

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

export const springIn = (
  frame: number,
  start: number,
  fps: number,
  config?: Partial<{ damping: number; stiffness: number; mass: number }>,
) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 200, stiffness: 160, mass: 0.7, ...config },
  });

export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInOutCubic = Easing.inOut(Easing.cubic);
