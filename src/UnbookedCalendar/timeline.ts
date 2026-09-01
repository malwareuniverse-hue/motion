export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 180; // 6s

export const CARD_W = 1520;
export const CARD_H = 900;
export const CARD_LEFT = (WIDTH - CARD_W) / 2;
export const CARD_TOP = (HEIGHT - CARD_H) / 2;

export const RING_ZONE_H = 64;
export const HEADER_H = 96;
export const PAD_X = 60;
export const PAD_BOTTOM = 56;

export const COLS = 7;
export const ROWS = 5;

export const GRID_LEFT = CARD_LEFT + PAD_X;
export const GRID_TOP = CARD_TOP + RING_ZONE_H + HEADER_H;
export const GRID_W = CARD_W - PAD_X * 2;
export const GRID_H = CARD_H - RING_ZONE_H - HEADER_H - PAD_BOTTOM;
export const COL_W = GRID_W / COLS;
export const ROW_H = GRID_H / ROWS;

export const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type DayCell = { n: number; faded?: boolean };

export const GRID_ROWS: DayCell[][] = [
  [{ n: 28, faded: true }, { n: 29, faded: true }, { n: 30, faded: true }, { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }],
  [{ n: 5 }, { n: 6 }, { n: 7 }, { n: 8 }, { n: 9 }, { n: 10 }, { n: 11 }],
  [{ n: 12 }, { n: 13 }, { n: 14 }, { n: 15 }, { n: 16 }, { n: 17 }, { n: 18 }],
  [{ n: 19 }, { n: 20 }, { n: 21 }, { n: 22 }, { n: 23 }, { n: 24 }, { n: 25 }],
  [{ n: 26 }, { n: 27 }, { n: 28 }, { n: 29 }, { n: 30 }, { n: 1, faded: true }, { n: 2, faded: true }],
];

export const LENS_D = 460;
export const LENS_CX = CARD_LEFT + CARD_W - 210;
export const LENS_CY = CARD_TOP + 190;

export const UNBOOKED_DAYS = [
  { label: "FRI", n: 3 },
  { label: "SAT", n: 4 },
  { label: "SUN", n: 5 },
];

export const T = {
  cardInStart: 0,
  cardInDur: 22,

  glassInStart: 14,
  glassInDur: 32,

  lensHeaderStart: 42,
  lensHeaderDur: 14,

  lensNumStart: 48,
  lensNumDur: 14,

  unbookedFriStart: 60,
  unbookedSatStart: 76,
  unbookedSunStart: 92,
  unbookedDur: 18,

  glintStart: 108,
  glintDur: 44,

  pulseStart: 146,
  pulseDur: 26,

  end: DURATION_IN_FRAMES,
} as const;
