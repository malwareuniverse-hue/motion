export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 570; // 19s

export const T = {
  line1In: 26,
  line2In: 60,
  line3In: 94,
  dividerIn: 128,
  line4In: 156,
  neverIn: 190,
  problemIn: 228,
  lineDur: 26,

  bar1In: 40,
  bar2In: 72,
  bar3In: 104,
  bar4In: 136,
  barInDur: 30,

  trendStart: 200,
  trendDur: 44,

  tagStart: 236,
  tagDur: 42,

  holdEnd: DURATION_IN_FRAMES - 40,
  end: DURATION_IN_FRAMES,
} as const;

export type QuoteColor = "cream" | "amber" | "amberSoft" | "slate";

export type QuoteRow =
  | { type: "line"; key: string; text: string; size: number; weight: number; spacing: number; color: QuoteColor; start: number }
  | { type: "divider"; key: string; text: string; start: number };

export const TEXT_LEFT = 140;
export const TEXT_TOP = 190;
export const TEXT_WIDTH = 940;

export const QUOTE_ROWS: QuoteRow[] = [
  { type: "line", key: "l1", text: "BECAUSE THAT'S WHERE", size: 22, weight: 700, spacing: 3, color: "amber", start: T.line1In },
  { type: "line", key: "l2", text: "I SEE OPERATORS", size: 54, weight: 800, spacing: 0.5, color: "cream", start: T.line2In },
  { type: "line", key: "l3", text: "CHANGING THE PRICE", size: 54, weight: 800, spacing: 0.5, color: "amberSoft", start: T.line3In },
  { type: "divider", key: "d1", text: "WHEN", start: T.dividerIn },
  { type: "line", key: "l4", text: "THE PRICE WAS", size: 54, weight: 800, spacing: 0.5, color: "cream", start: T.line4In },
  { type: "line", key: "l5", text: "NEVER", size: 92, weight: 800, spacing: 0.5, color: "amber", start: T.neverIn },
  { type: "line", key: "l6", text: "THE PROBLEM", size: 68, weight: 800, spacing: 0.5, color: "amberSoft", start: T.problemIn },
];

export const BAR_BASE_Y = 830;
export const BAR_W = 64;
export const BAR_GAP = 24;
export const BAR_START_X = 1440;
export const BAR_HEIGHTS = [120, 210, 300, 390];

export const barX = (i: number) => BAR_START_X + i * (BAR_W + BAR_GAP);

export const TAG_CENTER = { x: 1210, y: 560 };
export const TAG_W = 210;
export const TAG_H = 264;
export const TAG_REST_ROTATE = -7;
