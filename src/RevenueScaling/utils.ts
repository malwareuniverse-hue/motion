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

/** Approved entrance: soft opacity fade + 8-12 frame upward movement. */
export const fadeUp = (
  frame: number,
  start: number,
  dur: number,
  distance = 20,
) => {
  const t = clampedInterp(
    frame,
    [start, start + dur],
    [0, 1],
    Easing.out(Easing.cubic),
  );
  return { opacity: t, translateY: (1 - t) * distance };
};

/** Fade in, hold, fade out — the standard life cycle of a full-screen card. */
export const beatOpacity = (
  frame: number,
  inStart: number,
  inDur: number,
  outStart: number,
  outDur: number,
) =>
  Math.min(
    clampedInterp(
      frame,
      [inStart, inStart + inDur],
      [0, 1],
      Easing.out(Easing.cubic),
    ),
    clampedInterp(
      frame,
      [outStart, outStart + outDur],
      [1, 0],
      Easing.in(Easing.cubic),
    ),
  );

export const springIn = (
  frame: number,
  start: number,
  fps: number,
  config?: Partial<{ damping: number; stiffness: number; mass: number }>,
) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 200, stiffness: 150, mass: 0.7, ...config },
  });

/** Deterministic pseudo-random in [0, 1) so layouts never flicker between renders. */
export const seeded = (i: number, salt = 1) => {
  const x = Math.sin((i + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInOutCubic = Easing.inOut(Easing.cubic);
