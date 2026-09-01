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

export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInCubic = Easing.in(Easing.cubic);

// Builds a step-hold ramp: value stays flat, then eases to the next
// milestone over `dur` frames starting at each time in `times`.
export const buildStepRamp = (times: number[], dur: number, startVal: number, values: number[]) => {
  const inputs: number[] = [];
  const outputs: number[] = [];
  let prev = startVal;
  times.forEach((t, i) => {
    inputs.push(t, t + dur);
    outputs.push(prev, values[i]);
    prev = values[i];
  });
  return { inputs, outputs };
};
