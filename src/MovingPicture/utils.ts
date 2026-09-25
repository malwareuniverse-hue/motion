import { Easing, interpolate } from "remotion";

export const clamp = (frame: number, inputRange: [number, number], outputRange: [number, number], easing?: (t: number) => number) =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const fadeUp = (frame: number, start: number, dur: number, distance = 14) => {
  const t = clamp(frame, [start, start + dur], [0, 1], Easing.out(Easing.cubic));
  return { opacity: t, translateY: (1 - t) * distance };
};

export const fadeDown = (frame: number, start: number, dur: number, distance = 14) => {
  const t = clamp(frame, [start, start + dur], [0, 1], Easing.out(Easing.cubic));
  return { opacity: t, translateY: -(1 - t) * distance };
};

export const slideIn = (frame: number, start: number, dur: number, fromX: number) => {
  const t = clamp(frame, [start, start + dur], [0, 1], Easing.out(Easing.exp));
  return { opacity: clamp(frame, [start, start + Math.min(dur * 0.5, 20)], [0, 1]), translateX: (1 - t) * fromX };
};

export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInOutCubic = Easing.inOut(Easing.cubic);
export const easeOutExp = Easing.out(Easing.exp);

// Pulse a value between 0–1 with given period in frames
export const pulse = (frame: number, periodFrames: number, offset = 0) =>
  Math.sin(((frame + offset) / periodFrames) * Math.PI) * 0.5 + 0.5;
