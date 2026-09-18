export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 1930; // 64s 10f

/**
 * The longest scene in this batch: two flipped scenarios on the same
 * booking-window ruler illustration (a market marker and a your-property
 * marker on a days-out axis), then the metric named outright and its
 * time-dependent-pricing thesis closed with a today-vs-three-weeks-later
 * comparison. The transcript carries two explicit 0.50s pause markers,
 * used verbatim as transition windows per the CalmDiagnosis rule — the
 * second is the act break between the two scenarios, the first is a
 * beat-hold inside the opening countdown.
 *
 * Source placement: drop this composition at 00:00:00:02 on the master timeline.
 *
 *   abs 00:00:00:02  local    0  maybe they booked a hundred and twenty days out
 *   abs 00:00:02:21  local   79  [pause 0.50s]
 *   abs 00:00:03:07  local   95  maybe sixty maybe thirty
 *   abs 00:00:06:13  local  191  maybe three why does that matter
 *   abs 00:00:09:23  local  291  because timing tells us a lot
 *   abs 00:00:12:09  local  367  let's say guests in your market normally book summer
 *   abs 00:00:15:00  local  448  forty five days out but your house is almost sold out
 *   abs 00:00:18:14  local  552  a hundred and twenty days out
 *   abs 00:00:20:11  local  609  you might think awesome
 *   abs 00:00:22:21  local  679  we're winning maybe
 *   abs 00:00:25:05  local  753  or you may have been too cheap
 *   abs 00:00:30:04  local  902  [pause 0.50s]
 *   abs 00:00:30:20  local  918  now flip it
 *   abs 00:00:32:06  local  964  the market normally books forty five days out
 *   abs 00:00:35:14  local 1062  you are twenty days away
 *   abs 00:00:37:26  local 1134  and your house is still wide open
 *   abs 00:00:40:11  local 1209  now we have a different problem
 *   abs 00:00:42:09  local 1267  the booking window tells us when to wait
 *   abs 00:00:45:06  local 1354  and when to move
 *   abs 00:00:47:02  local 1410  this is why i hate random price changes
 *   abs 00:00:50:21  local 1519  a price can look high today and be completely right
 *   abs 00:00:55:20  local 1668  because you still have time
 *   abs 00:00:58:05  local 1743  the same price can become a problem three weeks later
 *
 * "Why does that matter" shares L3's one timecode with the tail end of the
 * countdown ("maybe three") — its own onset is invented a beat later, same
 * rule as every other one-timecode-multi-clause line in this batch.
 */
export const SOURCE_IN_TIMECODE = "00:00:00:02";

export const T = {
  // opening countdown
  line120In: 0,
  line120Dur: 30,
  tickerIn: 95,
  tickerDur: 26,
  whyMatterIn: 211,
  whyMatterDur: 24,
  becauseIn: 291,
  becauseDur: 28,

  // scenario A
  scenarioASetupIn: 367,
  scenarioASetupDur: 24,
  scenarioAMarketIn: 448,
  scenarioAYoursIn: 552,
  scenarioADur: 26,

  ambiguityLeadIn: 609,
  ambiguityLeadDur: 22,
  ambiguityWinningIn: 679,
  ambiguityCheapIn: 753,
  ambiguityDur: 26,

  // crossfade into act 2 on the transcript's own second pause
  cardBgStart: 902,
  cardBgDur: 15,

  // act 2, phase 1: the flipped scenario
  flipIn: 918,
  flipDur: 22,
  scenarioBMarketIn: 964,
  scenarioBYoursIn: 1062,
  scenarioBDur: 26,
  differentProblemIn: 1134,
  differentProblemDur: 26,

  phase1RecedeStart: 1245,
  phase1RecedeDur: 20,

  // act 2, phase 2: the named metric + thesis
  bookingWindowIn: 1267,
  bookingWindowDur: 28,
  whenToMoveIn: 1354,
  whenToMoveDur: 22,
  thesisIn: 1410,
  thesisDur: 28,

  phase2RecedeStart: 1500,
  phase2RecedeDur: 18,

  // act 2, phase 3: today vs three weeks later
  todayLabelIn: 1519,
  todayLabelDur: 30,
  todayTimeIn: 1668,
  todayTimeDur: 22,
  laterLabelIn: 1743,
  laterLabelDur: 30,

  outStart: 1863,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const LINE_120 = "MAYBE 120 DAYS OUT";
export const TICKER = "MAYBE 60 · MAYBE 30 · MAYBE 3";
export const WHY_MATTER = "WHY DOES THAT MATTER?";
export const BECAUSE = "BECAUSE TIMING TELLS US A LOT";

export const SCENARIO_A_SETUP =
  "YOUR MARKET NORMALLY BOOKS SUMMER STAYS 45 DAYS OUT";
export const SCENARIO_A_OUTCOME = "BUT YOUR HOUSE IS ALMOST SOLD OUT";
export const MARKET_DAYS = 45;
export const SCENARIO_A_YOUR_DAYS = 120;

export const AMBIGUITY_LEAD = "YOU MIGHT THINK AWESOME";
export const AMBIGUITY_WINNING = "WE'RE WINNING?";
export const AMBIGUITY_CHEAP = "OR TOO CHEAP?";

export const FLIP_LABEL = "NOW FLIP IT";
export const SCENARIO_B_YOUR_DAYS = 20;
export const SCENARIO_B_OUTCOME = "AND YOUR HOUSE IS STILL WIDE OPEN";
export const DIFFERENT_PROBLEM = "NOW WE HAVE A DIFFERENT PROBLEM";

export const BOOKING_WINDOW_ACCENT = "THE BOOKING WINDOW ";
export const BOOKING_WINDOW_LEAD = "TELLS US WHEN TO WAIT";
export const WHEN_TO_MOVE = "AND WHEN TO MOVE";

export const THESIS = "THIS IS WHY RANDOM PRICE CHANGES DON'T WORK";

export const TODAY_LABEL = "TODAY";
export const TODAY_OUTCOME = "LOOKS HIGH — COMPLETELY RIGHT";
export const TODAY_REASON = "YOU STILL HAVE TIME";

export const LATER_LABEL = "3 WEEKS LATER";
export const LATER_OUTCOME = "SAME PRICE — NOW A PROBLEM";
