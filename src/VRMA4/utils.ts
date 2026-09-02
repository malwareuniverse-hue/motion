import { Easing, interpolate } from "remotion";

export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInOutCubic = Easing.inOut(Easing.cubic);

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

/** Approved PBM entrance: soft opacity fade + 8-12 frame upward movement. */
export const fadeRise = (
  frame: number,
  start: number,
  dur = 14,
  distance = 12,
) => {
  const t = clampedInterp(frame, [start, start + dur], [0, 1], easeOutCubic);
  return { opacity: t, translateY: (1 - t) * distance };
};

/** Clean fade only - used for exits so nothing slides off screen. */
export const fadeOut = (frame: number, start: number, dur = 16) =>
  clampedInterp(frame, [start, start + dur], [1, 0]);

/** Restrained 100% -> 98.5% analytical push. Never a zoom. */
export const slowPush = (
  frame: number,
  duration: number,
  from = 1.0,
  to = 0.985,
) => clampedInterp(frame, [0, duration], [from, to], easeInOutCubic);

/** Deterministic pseudo-random so dashboards look organic but never flicker. */
export const seeded = (i: number, salt = 1) => {
  const x = Math.sin((i + 1) * 12.9898 * salt) * 43758.5453;
  return x - Math.floor(x);
};
