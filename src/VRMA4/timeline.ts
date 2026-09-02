// VRMA Reel 4 - vertical B-roll set.
//
// Every composition here is an INSERT, not the reel. Emile's camera track is the
// spine; these clips cut in underneath the sections listed in README.md and are
// cut to length in Premiere. Durations are deliberately a little longer than the
// recommended on-screen time so the editor has handles at both ends.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Broadcast-safe inset for a 1080x1920 reel. */
export const SAFE_X = 96;
export const SAFE_TOP = 240;
export const SAFE_BOTTOM = 420;

const sec = (s: number) => Math.round(s * FPS);

// --- 0:07-0:19 "obsession with what are my comps charging" -------------------
export const COMP_SCAN_DURATION = sec(8);
export const COMP_SCAN = {
  surfaceIn: 6,
  cardIn: [18, 30, 42],
  /** The selection frame rests on card 0, then 1, then 2. */
  scanHold: [58, 118, 178],
  scanMove: 26,
  calendarIn: 66,
  outStart: COMP_SCAN_DURATION - 18,
} as const;

// --- 0:24 "they don't know your booking history" -----------------------------
export const BOOKING_HISTORY_DURATION = sec(4);
export const BOOKING_HISTORY = {
  surfaceIn: 4,
  barsStart: 14,
  barStagger: 4,
  barDur: 18,
  averageLineStart: 62,
  averageLineDur: 22,
  outStart: BOOKING_HISTORY_DURATION - 16,
} as const;

// --- 0:24-0:32 "they don't know your guest" ----------------------------------
export const GUEST_SIGNAL_DURATION = sec(4);
export const GUEST_SIGNAL = {
  surfaceIn: 4,
  rowIn: [14, 34, 54],
  histogramStart: 24,
  histogramStagger: 3,
  arcStart: 62,
  arcDur: 30,
  outStart: GUEST_SIGNAL_DURATION - 16,
} as const;

// --- 0:32-0:38 "no idea whether their strategy is actually working" ----------
export const SURFACE_PRICE_DURATION = sec(7);
export const SURFACE_PRICE = {
  surfaceIn: 6,
  tileIn: [16, 26, 36, 46],
  tileStagger: 10,
  /** The public rate is legible; the performance rows below never resolve. */
  hiddenStart: 76,
  hiddenDur: 30,
  outStart: SURFACE_PRICE_DURATION - 18,
} as const;

// --- 0:43-0:49 "market pace" -------------------------------------------------
export const MARKET_PACE_DURATION = sec(4);
export const MARKET_PACE = {
  surfaceIn: 4,
  axisStart: 10,
  priorLineStart: 20,
  priorLineDur: 40,
  currentLineStart: 34,
  currentLineDur: 54,
  markerStart: 84,
  outStart: MARKET_PACE_DURATION - 16,
} as const;

// --- 0:43-0:49 "booking windows" ---------------------------------------------
export const BOOKING_WINDOWS_DURATION = sec(4);
export const BOOKING_WINDOWS = {
  surfaceIn: 4,
  barsStart: 14,
  barStagger: 5,
  barDur: 20,
  calendarStart: 46,
  calendarStagger: 4,
  outStart: BOOKING_WINDOWS_DURATION - 16,
} as const;

// --- 0:58-1:04 "and where we believe the market is going next" ---------------
export const FORWARD_VIEW_DURATION = sec(5);
export const FORWARD_VIEW = {
  surfaceIn: 4,
  axisStart: 10,
  knownStart: 18,
  knownDur: 40,
  forecastStart: 58,
  forecastDur: 52,
  bandStart: 70,
  bandDur: 40,
  outStart: FORWARD_VIEW_DURATION - 18,
} as const;

// --- 0:43-1:04 optional native framework -------------------------------------
// Sequential reveal, one term as Emile says it. Nudge these against the real VO
// once the camera track is laid down - they are the only timings in this file
// that must sit on the word.
export const DECISION_SET_DURATION = sec(21);
export const DECISION_SET = {
  frameStart: 4,
  frameDur: 26,
  /** Offsets from 0:43.0. Order matches the script exactly. */
  itemIn: [
    12, //  0:43.4  Market pace
    75, //  0:45.5  Booking windows
    180, // 0:49.0  Property positioning
    255, // 0:51.5  Historical behavior
    330, // 0:54.0  Supply
    390, // 0:56.0  Demand
    450, // 0:58.0  Revenue targets
  ],
  itemDur: 14,
  dividerDur: 10,
  outStart: DECISION_SET_DURATION - 24,
  outDur: 24,
} as const;

/** Exact script terminology. Do not abbreviate or re-order. */
export const DECISION_TERMS = [
  "Market pace",
  "Booking windows",
  "Property positioning",
  "Historical behavior",
  "Supply",
  "Demand",
  "Revenue targets",
] as const;

// --- 1:22-end compact event lower third --------------------------------------
export const LOWER_THIRD_DURATION = sec(5);
export const LOWER_THIRD = {
  ruleStart: 2,
  ruleDur: 10,
  labelStart: 10,
  headlineStart: 16,
  textDur: 14,
  outStart: LOWER_THIRD_DURATION - 20,
  outDur: 20,
} as const;
