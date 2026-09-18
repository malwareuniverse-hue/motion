export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 700; // 23s 10f

/**
 * Two properties, two nightly rates, one unanswerable question — until you
 * know revenue. First illustrated scene in this batch: house icons and a
 * nights-sold strip per property, then a nights x rate = revenue equation
 * built from the same shape language (a strip, a tag, a solid bar) rather
 * than literal icons. Ends on anticipation, same device as FiveNumbersIntro
 * — the actual number this leads to is withheld for the next clip. 16:9,
 * PBM near-black ground, no chroma.
 *
 * Source placement: drop this composition at 00:00:00:07 on the master timeline.
 *
 *   abs 00:00:00:07  local    0  one property sells for more than
 *   abs 00:00:04:23  local  136  nights at $350 another property sells fewer nights
 *   abs 00:00:08:18  local  251  at four hundred and eighty dollars
 *   abs 00:00:10:06  local  299  which one is better you cannot answer that yet
 *   abs 00:00:12:29  local  382  you need to know
 *   abs 00:00:13:27  local  410  how much revenue each calendar actually produced
 *   abs 00:00:17:03  local  506  that leads to
 *   abs 00:00:17:26  local  529  one of the most important numbers that we watch
 *
 * L2's one timecode covers two clauses ("...at $350" finishing property A's
 * line, then "another property sells fewer nights" opening property B's) —
 * property B's rate label lands on its own real cue (L3) but its "FEWER
 * NIGHTS" text has no separate timestamp, so it's placed a beat after
 * property A's rate, same invented-pacing rule as OccupancyMeter.
 */
export const SOURCE_IN_TIMECODE = "00:00:00:07";

export const T = {
  // property duel
  cardALabelIn: 0,
  cardARateIn: 136,
  cardBLabelIn: 156,
  cardBRateIn: 251,
  vsIn: 271,
  cardDur: 26,

  questionIn: 299,
  questionDur: 30,
  duelDimStart: 289,
  duelDimDur: 26,

  // crossfade into the resolution card
  cardBgStart: 375,
  cardBgDur: 20,

  // resolution card, phase 1: the revenue question + illustrated equation
  needToKnowIn: 382,
  needToKnowDur: 24,
  revenueStatementIn: 410,
  revenueStatementDur: 30,

  eqNightsIn: 440,
  eqMultiplyIn: 446,
  eqRateIn: 452,
  eqEqualsIn: 458,
  eqRevenueIn: 464,
  eqDur: 14,

  // phase 1 recedes with a clean beat of hold after the equation lands,
  // finishing just before phase 2 (the anticipation beat) begins
  phase1RecedeStart: 478,
  phase1RecedeDur: 20,

  leadsToIn: 506,
  leadsToDur: 22,
  numberIn: 529,
  numberDur: 30,

  outStart: 640,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const CARD_A_LABEL = "MORE NIGHTS";
export const CARD_A_RATE = "$350";
export const CARD_A_NIGHTS_FILLED = 6;

export const CARD_B_LABEL = "FEWER NIGHTS";
export const CARD_B_RATE = "$480";
export const CARD_B_NIGHTS_FILLED = 3;

export const NIGHTS_STRIP_TOTAL = 7;

export const VS_LABEL = "VS";

export const QUESTION_LEAD = "WHICH ONE IS BETTER?";
export const QUESTION_SUB = "YOU CANNOT ANSWER THAT YET";

export const NEED_TO_KNOW = "YOU NEED TO KNOW";
export const REVENUE_STATEMENT_LEAD = "HOW MUCH REVENUE EACH ";
export const REVENUE_STATEMENT_ACCENT = "CALENDAR ACTUALLY PRODUCED";

export const EQ_NIGHTS_LABEL = "NIGHTS SOLD";
export const EQ_RATE_LABEL = "NIGHTLY RATE";
export const EQ_REVENUE_LABEL = "REVENUE";

export const LEADS_TO = "THAT LEADS TO";
export const NUMBER_LEAD = "ONE OF THE MOST IMPORTANT NUMBERS ";
export const NUMBER_ACCENT = "THAT WE WATCH";
