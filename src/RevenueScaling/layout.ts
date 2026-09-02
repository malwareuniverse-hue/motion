import { useVideoConfig } from "remotion";

/**
 * The scene renders at 16:9 and 9:16 from one set of components. Anything that
 * differs between the two formats — safe margins, the type scale, and the two
 * grids that have to re-flow — is resolved here, so components never branch on
 * raw pixel dimensions themselves.
 */
export type Layout = {
  width: number;
  height: number;
  portrait: boolean;
  /** Broadcast-safe side margin. */
  margin: number;
  type: {
    hero: number;
    h1: number;
    h2: number;
    number: number;
    numberSmall: number;
    kicker: number;
    body: number;
    card: number;
    lockup: number;
  };
  /** The six "more" cards. */
  card: {
    w: number;
    h: number;
    gap: number;
    cols: number;
    top: number;
    kickerTop: number;
    heroTop: number;
  };
  /** The property nodes that converge into the enterprise grid. */
  shift: {
    node: number;
    gap: number;
    cols: number;
    centerY: number;
    pad: number;
    scatter: { x0: number; x1: number; y0: number; y1: number };
  };
};

const LANDSCAPE: Omit<Layout, "width" | "height" | "portrait"> = {
  margin: 200,
  type: {
    hero: 62,
    h1: 78,
    h2: 62,
    number: 188,
    numberSmall: 132,
    kicker: 19,
    body: 30,
    card: 29,
    lockup: 82,
  },
  card: {
    w: 484,
    h: 96,
    gap: 34,
    cols: 3,
    top: 352,
    kickerTop: 262,
    heroTop: 716,
  },
  shift: {
    node: 150,
    gap: 44,
    cols: 4,
    centerY: 442,
    pad: 56,
    scatter: { x0: 0.11, x1: 0.85, y0: 0.2, y1: 0.7 },
  },
};

const PORTRAIT: Omit<Layout, "width" | "height" | "portrait"> = {
  margin: 80,
  type: {
    hero: 54,
    h1: 54,
    h2: 52,
    number: 150,
    numberSmall: 96,
    kicker: 18,
    body: 28,
    card: 30,
    lockup: 62,
  },
  card: {
    w: 920,
    h: 92,
    gap: 18,
    cols: 1,
    top: 580,
    kickerTop: 490,
    heroTop: 1300,
  },
  shift: {
    node: 150,
    gap: 44,
    cols: 3,
    centerY: 780,
    pad: 56,
    scatter: { x0: 0.06, x1: 0.72, y0: 0.14, y1: 0.52 },
  },
};

export const useLayout = (): Layout => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return { width, height, portrait, ...(portrait ? PORTRAIT : LANDSCAPE) };
};

/** Grid geometry for the "more" cards, derived from the active layout. */
export const cardGrid = (l: Layout) => {
  const rows = Math.ceil(6 / l.card.cols);
  const gridW = l.card.cols * l.card.w + (l.card.cols - 1) * l.card.gap;
  const left = (l.width - gridW) / 2;
  return {
    rows,
    left,
    x: (i: number) => left + (i % l.card.cols) * (l.card.w + l.card.gap),
    y: (i: number) =>
      l.card.top + Math.floor(i / l.card.cols) * (l.card.h + l.card.gap),
  };
};

/** Grid + frame geometry for the enterprise shift, derived from the active layout. */
export const shiftGrid = (l: Layout, count: number) => {
  const rows = Math.ceil(count / l.shift.cols);
  const gridW = l.shift.cols * l.shift.node + (l.shift.cols - 1) * l.shift.gap;
  const gridH = rows * l.shift.node + (rows - 1) * l.shift.gap;
  const gridLeft = (l.width - gridW) / 2;
  const gridTop = l.shift.centerY - gridH / 2;
  return {
    rows,
    gridLeft,
    gridTop,
    frameLeft: gridLeft - l.shift.pad,
    frameTop: gridTop - l.shift.pad,
    frameW: gridW + l.shift.pad * 2,
    frameH: gridH + l.shift.pad * 2,
    x: (i: number) =>
      gridLeft + (i % l.shift.cols) * (l.shift.node + l.shift.gap),
    y: (i: number) =>
      gridTop + Math.floor(i / l.shift.cols) * (l.shift.node + l.shift.gap),
  };
};
