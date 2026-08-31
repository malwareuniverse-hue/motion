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

export const fadeSlide = (frame: number, start: number, dur: number, distance = 18) => {
  const t = clampedInterp(frame, [start, start + dur], [0, 1], Easing.out(Easing.cubic));
  return { opacity: t, translateY: (1 - t) * distance };
};

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

export const easeInOutCubic = Easing.inOut(Easing.cubic);
