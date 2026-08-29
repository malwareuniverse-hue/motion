import { Easing, interpolate, spring } from "remotion";

export const fadeSlide = (
  frame: number,
  start: number,
  dur: number,
  distance = 18,
) => {
  const t = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity: t, translateY: (1 - t) * distance };
};

export const springIn = (frame: number, start: number, fps: number) =>
  spring({
    frame: frame - start,
    fps,
    config: { damping: 200, stiffness: 130, mass: 0.7 },
  });

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
