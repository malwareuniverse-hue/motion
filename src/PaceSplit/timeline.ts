export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 240; // 8s

export const PANEL_W = 900;
export const PANEL_H = 980;
export const PANEL_Y = (HEIGHT - PANEL_H) / 2;
export const GAP = 40;
export const LEFT_X = (WIDTH - (PANEL_W * 2 + GAP)) / 2;
export const RIGHT_X = LEFT_X + PANEL_W + GAP;

export const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type DayCell = { n: number; faded?: boolean };

export const GRID_ROWS: DayCell[][] = [
  [{ n: 28, faded: true }, { n: 29, faded: true }, { n: 30, faded: true }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }],
  [{ n: 5 }, { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 }],
  [{ n: 12 }, { n: 13 }, { n: 14 }, { n: 15 }, { n: 16 }, { n: 17 }, { n: 18 }],
  [{ n: 19 }, { n: 20 }, { n: 21 }, { n: 22 }, { n: 23 }, { n: 24 }, { n: 25 }],
  [{ n: 26 }, { n: 27 }, { n: 28 }, { n: 29 }, { n: 30 }, { n: 31 }, { n: 1, faded: true }],
];

// row/col of the three focus cells (FRI, SAT of week 1; SUN of week 2)
export const HIGHLIGHT_CELLS = [
  { row: 0, col: 5, label: "FRI" },
  { row: 0, col: 6, label: "SAT" },
  { row: 1, col: 0, label: "SUN" },
];

export type Verdict = "ahead" | "behind";

export type StatSpec = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: string;
};

export type PanelData = {
  side: "left" | "right";
  verdict: Verdict;
  title: string;
  subtitle: string;
  stats: StatSpec[];
  entryDelay: number;
};

export const PANELS: PanelData[] = [
  {
    side: "left",
    verdict: "ahead",
    title: "AHEAD OF GOAL",
    subtitle: "This property is performing above target.",
    stats: [
      { label: "OCCUPANCY", value: 78, suffix: "%", delta: "+12% vs goal" },
      { label: "ADR", value: 412, prefix: "$", delta: "+8% vs goal" },
      { label: "REVENUE", value: 3296, prefix: "$", delta: "+18% vs goal" },
    ],
    entryDelay: 0,
  },
  {
    side: "right",
    verdict: "behind",
    title: "BEHIND PACE",
    subtitle: "This property is performing below target.",
    stats: [
      { label: "OCCUPANCY", value: 42, suffix: "%", delta: "-18% vs goal" },
      { label: "ADR", value: 268, prefix: "$", delta: "-14% vs goal" },
      { label: "REVENUE", value: 1289, prefix: "$", delta: "-26% vs goal" },
    ],
    entryDelay: 6,
  },
];

export const T = {
  dividerStart: 0,
  dividerDur: 18,

  panelInStart: 6,
  panelInDur: 28,

  headerStart: 28,
  headerDur: 16,

  badgeStart: 32,
  badgeDur: 22,

  heroStart: 42,
  heroDur: 24,
  windowStagger: 5,
  windowDur: 14,

  calHeaderStart: 66,
  calHeaderDur: 14,

  gridRowStart: 76,
  gridRowStagger: 6,
  gridRowDur: 12,

  highlightStart: 108,
  highlightStagger: 10,
  highlightDur: 16,

  statsStart: 144,
  statStagger: 12,
  statDur: 16,
  countDur: 26,
  deltaOffset: 16,
  deltaDur: 14,

  end: DURATION_IN_FRAMES,
} as const;
