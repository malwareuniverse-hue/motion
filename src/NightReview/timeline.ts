export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1350;
export const DURATION_IN_FRAMES = 210; // 7s

export const T = {
  roomInStart: 0,
  roomInDur: 30,

  shelfGlowStart: 12,
  shelfGlowStagger: 6,
  shelfGlowDur: 20,

  windowInStart: 16,
  windowInDur: 30,
  lampInStart: 24,
  lampInDur: 20,

  personStart: 32,
  personDur: 26,

  deskStart: 46,
  deskDur: 22,

  laptopStart: 58,
  laptopDur: 26,

  screenOnStart: 82,
  screenOnDur: 14,

  chartDrawStart: 92,
  chartDrawDur: 40,

  heatStart: 108,
  heatStagger: 2,
  heatDur: 10,

  donutStart: 128,
  donutDur: 30,

  barsStart: 132,
  barStagger: 6,
  barDur: 18,

  pushInStart: 150,
  pushInDur: 60,

  end: DURATION_IN_FRAMES,
} as const;

// 5 rows x 7 cols heatmap; true = "hot" (booked) cell
export const HEAT_ROWS: boolean[][] = [
  [false, false, true, false, false, true, true],
  [false, true, false, false, true, true, false],
  [true, true, false, true, true, false, false],
  [false, false, true, true, false, true, true],
  [true, false, false, true, true, false, false],
];

export const BAR_ROWS = [0.86, 0.62, 0.74, 0.45];
