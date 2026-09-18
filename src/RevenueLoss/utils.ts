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
export const easeInCubic = Easing.in(Easing.cubic);

/**
 * The decline's shape: near-flat at first, then falling away faster — a slow
 * bleed that accelerates, rather than a straight or sudden drop. t and the
 * return value are both 0-1 fractions; callers map onto real pixel ranges.
 */
export const declineCurve = (t: number) =>
  easeInCubic(Math.min(Math.max(t, 0), 1));

/**
 * The declining line's y position at a given x fraction (0-1 across its
 * content width) and frame — shared by the line/fill itself and by the leak
 * particles, so a particle always spawns exactly on the line it left.
 * `wobble` is a slow, small sine drift so the fully-drawn line still reads as
 * alive rather than a static chart.
 */
export const trendYAt = (
  xFrac: number,
  frame: number,
  baselineY: number,
  endY: number,
) => {
  const base = baselineY + declineCurve(xFrac) * (endY - baselineY);
  const wobble = Math.sin(frame * 0.04 + xFrac * 6) * 3;
  return base + wobble;
};

/**
 * Builds a smoothed SVG path through sampled points using quadratic
 * mid-point smoothing — enough to read as a soft analytical curve without a
 * full curve-fitting library.
 */
export const smoothPath = (points: Array<[number, number]>) => {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += ` Q ${x0} ${y0} ${mx} ${my}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
};
