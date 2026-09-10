export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 3060; // 102s

export const CENTER_X = WIDTH / 2;

/* ------------------------------------------------------------------ *
 * Act 1 — three ways owners guess, collapsing into one number         *
 * ------------------------------------------------------------------ */

export const A1_LABEL_Y = 190;
export const A1_HEAD_Y = 282;
export const GUESS_W = 400;
export const GUESS_H = 140;
export const GUESS_GAP = 36;
export const GUESS_Y = 470;
export const FUNNEL_TIP_Y = 636;
export const NUMBER_Y = 726;
export const NUMBER_W = 420;
export const NUMBER_H = 108;
export const PROMISE_Y = 848;

const GUESS_SPAN = 3 * GUESS_W + 2 * GUESS_GAP;
export const guessX = (index: number) =>
  (WIDTH - GUESS_SPAN) / 2 + GUESS_W / 2 + index * (GUESS_W + GUESS_GAP);

/* ------------------------------------------------------------------ *
 * Act 2 — the questions that actually decide the number               *
 * ------------------------------------------------------------------ */

export const A2_LABEL_Y = 172;
export const Q_W = 480;
export const Q_H = 150;
export const Q_GAP_X = 32;
export const Q_GAP_Y = 32;
export const Q_COLS = 3;
export const Q_ROW_Y = [382, 564, 746];
export const FIT_BAND_H = 190;
export const FIT_BAND_Y = 564;

const Q_SPAN = Q_COLS * Q_W + (Q_COLS - 1) * Q_GAP_X;
export const questionX = (index: number) =>
  (WIDTH - Q_SPAN) / 2 + Q_W / 2 + (index % Q_COLS) * (Q_W + Q_GAP_X);
export const questionY = (index: number) => Q_ROW_Y[Math.floor(index / Q_COLS)];

/* ------------------------------------------------------------------ *
 * Act 4 — the annual target broken into twelve months                 *
 * ------------------------------------------------------------------ */

export const BAR_LABEL_Y = 300;
export const BAR_W = 1240;
export const BAR_H = 52;
export const BAR_Y = 448;
export const BAR_GAP_MAX = 10;
export const MONTH_LABEL_Y = 526;
export const JOB_Y = 668;
export const REASON_Y = 758;

export const BAR_LEFT = (WIDTH - BAR_W) / 2;
export const MONTHS = [
  "J",
  "F",
  "M",
  "A",
  "M",
  "J",
  "J",
  "A",
  "S",
  "O",
  "N",
  "D",
];

/** Segment geometry at a given inter-segment gap. */
export const segmentWidth = (gap: number) => (BAR_W - gap * 11) / 12;
export const segmentX = (index: number, gap: number) =>
  BAR_LEFT + index * (segmentWidth(gap) + gap);

/* Act 4b — the question owners ask, and the one that replaces it */
export const WRONG_Y = 538;
export const BETTER_LABEL_Y = 418;
export const BETTER_1_Y = 538;
export const BETTER_2_Y = 650;

/* ------------------------------------------------------------------ *
 * Timing — frames keyed to the transcript timecodes (30fps)           *
 * ------------------------------------------------------------------ */

export const T = {
  // "now we get into revenue potential" — 00:00:00:00
  a1LabelIn: 8,
  a1LabelDur: 26,
  // "and this is where a lot of owners start to guess" — 00:00:03:19
  a1HeadIn: 118,
  a1HeadDur: 30,
  guessDur: 26,
  funnelDraw: 470,
  funnelDur: 26,
  // "they see a number" — 00:00:15:17
  numberIn: 478,
  numberDur: 28,
  // "and they treat it like an ultimate promise" — 00:00:16:29
  promiseIn: 518,
  promiseDur: 26,
  a1Out: 596,
  a1OutDur: 26,

  // "that is not enough" — 00:00:19:27
  notEnoughIn: 608,
  notEnoughDur: 28,
  notEnoughOut: 676,
  notEnoughOutDur: 24,

  // Act 2 — nine questions
  a2LabelIn: 676,
  a2LabelDur: 26,
  questionDur: 26,
  // "where does this property / fit into all of those questions"
  fitStart: 1452,
  fitDur: 34,
  a2Out: 1544,
  a2OutDur: 28,

  // "now we can build a real target" — 00:00:52:01
  targetIn: 1572,
  targetDur: 32,
  // "not a dream not a guess" — 00:00:54:11
  notDreamIn: 1642,
  notDreamDur: 26,
  a3Out: 1714,
  a3OutDur: 24,

  // "a target and if you do not know the target" — 00:00:57:17
  knowIn: 1740,
  knowDur: 32,
  // "you do not know if you are winning" — 00:01:01:11
  winIn: 1850,
  winDur: 30,
  // "that is a huge problem" — 00:01:04:06
  problemIn: 1934,
  problemDur: 28,
  a3bOut: 1994,
  a3bOutDur: 26,

  // "because once I know the annualized revenue target goal" — 00:01:07:13
  barLabelIn: 2028,
  barLabelDur: 26,
  barIn: 2042,
  barDur: 30,
  // "I can break it into monthly goals" — 00:01:11:08
  splitStart: 2146,
  splitDur: 52,
  monthsIn: 2172,
  monthsDur: 26,
  monthStagger: 3,
  // "now every [month] has a job" — 00:01:13:09
  jobIn: 2232,
  jobDur: 28,
  // "every price has a reason instead of asking" — 00:01:17:26
  reasonIn: 2346,
  reasonDur: 28,
  a4aOut: 2418,
  a4aOutDur: 26,

  // "should I charge $700 or $750" — 00:01:22:03
  wrongIn: 2470,
  wrongDur: 28,
  wrongOut: 2574,
  wrongOutDur: 24,
  // "I ask what does this month need to make" — 00:01:26:03
  betterLabelIn: 2584,
  betterLabelDur: 24,
  better1In: 2592,
  better1Dur: 30,
  // "and what does this date need to do to help us get there" — 00:01:29:20
  better2In: 2698,
  better2Dur: 30,
  a4bOut: 2828,
  a4bOutDur: 28,

  // "now we are not guessing" — 00:01:35:26
  closeRuleIn: 2872,
  closeRuleDur: 30,
  close1In: 2884,
  close1Dur: 32,
  // "now we are managing the business" — 00:01:38:12
  close2In: 2958,
  close2Dur: 30,

  end: DURATION_IN_FRAMES,
} as const;

/* ------------------------------------------------------------------ *
 * Content                                                             *
 * ------------------------------------------------------------------ */

export type Guess = { label: string; inStart: number };

/** The three shortcuts owners reach for instead of doing the work. */
export const GUESSES: Guess[] = [
  { label: "LAST YEAR + 10%", inStart: 200 }, // 00:00:06:12
  { label: "A REVENUE ESTIMATOR", inStart: 336 }, // 00:00:10:26
  { label: "A THIRD-PARTY TOOL", inStart: 404 }, // 00:00:13:05
];

export type Question = { label: string; inStart: number };

/** What a real target is actually built from. */
export const QUESTIONS: Question[] = [
  { label: "WHAT HAS THIS PROPERTY DONE?", inStart: 682 }, // 00:00:22:09
  { label: "WHAT ARE THE BEST COMPS DOING?", inStart: 806 }, // 00:00:26:20
  { label: "WHAT DOES DEMAND LOOK LIKE?", inStart: 875 }, // 00:00:28:29
  { label: "WHEN DOES THE MARKET GET BUSY?", inStart: 947 }, // 00:00:31:11
  { label: "WHEN DOES IT SLOW DOWN?", inStart: 1059 }, // 00:00:35:03
  { label: "WHAT HAPPENS AROUND EVENTS?", inStart: 1098 },
  { label: "HOW FAR OUT DO GUESTS BOOK?", inStart: 1188 }, // 00:00:39:12
  { label: "WHAT DO THE BEST WEEKENDS PRODUCE?", inStart: 1279 }, // 00:00:42:13
  { label: "WHAT DOES THE SLOW SEASON LOOK LIKE?", inStart: 1367 }, // 00:00:45:11
];

export const A1_LABEL = "REVENUE POTENTIAL";
export const A1_HEAD = "THIS IS WHERE OWNERS GUESS";
export const NUMBER_TEXT = "ONE NUMBER";
export const PROMISE_TEXT = "TREATED LIKE A PROMISE";
export const NOT_ENOUGH_TEXT = "THAT IS NOT ENOUGH.";

export const A2_LABEL = "WHAT A REAL TARGET IS BUILT FROM";
export const FIT_TEXT = "WHERE DOES THIS PROPERTY FIT?";

export const TARGET_TEXT = "NOW WE CAN BUILD A REAL TARGET";
export const NOT_DREAM_TEXT = "NOT A DREAM. NOT A GUESS.";
export const KNOW_LEAD = "IF YOU DON'T KNOW THE ";
export const KNOW_KEY = "TARGET";
export const WIN_TEXT = "YOU DON'T KNOW IF YOU'RE WINNING";
export const PROBLEM_TEXT = "THAT IS A HUGE PROBLEM.";

export const BAR_LABEL = "ANNUALIZED REVENUE TARGET";
export const JOB_TEXT = "EVERY MONTH HAS A JOB";
export const REASON_TEXT = "EVERY PRICE HAS A REASON";

export const WRONG_TEXT = "SHOULD I CHARGE $700 OR $750?";
export const BETTER_LABEL = "THE BETTER QUESTION";
export const BETTER_1 = "WHAT DOES THIS MONTH NEED TO MAKE?";
export const BETTER_2 = "WHAT DOES THIS DATE NEED TO DO?";

export const CLOSE_1 = "WE ARE NOT GUESSING.";
export const CLOSE_2_LEAD = "WE ARE ";
export const CLOSE_2_KEY = "MANAGING THE BUSINESS.";
