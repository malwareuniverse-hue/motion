export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 1100; // 36s 20f

/**
 * Same flipped-scenario shape as BookingWindow, on a shorter transcript: one
 * occupancy-strip illustration (your four weekends vs. everyone else) shared
 * across both scenarios. Scenario A explains away a slow calendar (the whole
 * market is slow too); the transcript's own pause flips it into scenario B,
 * where the market is fine and only you are slow — a real problem with four
 * possible causes, resolving on the self-accountability punchline. 16:9, PBM
 * near-black ground, no chroma.
 *
 * Source placement: drop this composition at 00:00:00:03 on the master timeline.
 *
 *   abs 00:00:00:03  local    0  let's say your next four weekends look slow
 *   abs 00:00:03:02  local   89  that feels bad
 *   abs 00:00:04:27  local  144  but then you look at the market and every day is slow
 *   abs 00:00:08:21  local  258  now i may make one decision
 *   abs 00:00:11:09  local  336  [pause 0.53s]
 *   abs 00:00:11:26  local  353  but if your next four weekends are slow
 *   abs 00:00:15:06  local  453  and the best homes around you are filling up
 *   abs 00:00:18:24  local  561  now i have a very different problem
 *   abs 00:00:21:14  local  641  maybe your price is wrong
 *   abs 00:00:23:11  local  698  maybe your listing is weak
 *   abs 00:00:25:09  local  756  maybe your restrictions are blocking bookings
 *   abs 00:00:28:07  local  844  maybe you're watching the wrong competitors
 *   abs 00:00:31:00  local  927  but now i know the problem may be you
 */
export const SOURCE_IN_TIMECODE = "00:00:00:03";

export const T = {
  // scenario A
  openingIn: 0,
  openingDur: 28,
  openingRecedeStart: 120,
  openingRecedeDur: 20,

  marketContextIn: 144,
  marketContextDur: 26,
  decisionIn: 258,
  decisionDur: 26,

  // crossfade into act 2 on the transcript's own pause
  cardBgStart: 336,
  cardBgDur: 16,

  // act 2, phase 1: the flipped scenario
  flipIn: 353,
  flipDur: 26,
  fillingUpIn: 453,
  fillingUpDur: 26,
  problemIn: 561,
  problemDur: 24,

  phase1RecedeStart: 615,
  phase1RecedeDur: 20,

  // act 2, phase 2: the four possible causes
  cause1In: 641,
  cause2In: 698,
  cause3In: 756,
  cause4In: 844,
  causeDur: 24,

  phase2RecedeStart: 895,
  phase2RecedeDur: 20,

  // act 2, phase 3: the punchline
  punchlineIn: 927,
  punchlineDur: 30,

  outStart: 1037,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const OPENING_LEAD = "LET'S SAY YOUR NEXT FOUR WEEKENDS LOOK SLOW — ";
export const OPENING_ACCENT = "THAT FEELS BAD";

export const MARKET_CONTEXT = "BUT EVERY DAY IS SLOW ACROSS THE MARKET";
export const DECISION = "NOW I MAY MAKE ONE DECISION";

export const YOU_LABEL = "YOU";
export const WEEKENDS_TOTAL = 4;

export const MARKET_LABEL_A = "MARKET";
export const MARKET_TOTAL_A = 8;
export const MARKET_FILLED_A = 0;

export const FLIP_LEAD = "BUT IF YOUR NEXT FOUR WEEKENDS ARE SLOW";
export const FILLING_UP = "AND THE BEST HOMES AROUND YOU ARE FILLING UP";
export const DIFFERENT_PROBLEM = "NOW I HAVE A VERY DIFFERENT PROBLEM";

export const COMPETITORS_LABEL = "COMPETITORS";
export const COMPETITORS_TOTAL = 8;
export const COMPETITORS_FILLED = 7;

export const CAUSE_1 = "MAYBE YOUR PRICE IS WRONG";
export const CAUSE_2 = "MAYBE YOUR LISTING IS WEAK";
export const CAUSE_3 = "MAYBE YOUR RESTRICTIONS ARE BLOCKING BOOKINGS";
export const CAUSE_4 = "MAYBE YOU'RE WATCHING THE WRONG COMPETITORS";

export const PUNCHLINE_LEAD = "BUT NOW I KNOW ";
export const PUNCHLINE_ACCENT = "THE PROBLEM MAY BE YOU";
