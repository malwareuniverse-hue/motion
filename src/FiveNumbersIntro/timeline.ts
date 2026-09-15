export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 700; // 23s 10f

/**
 * A chapter-opener: the warning against judging by one number, the "five"
 * framework claim with its payoff stacking in underneath, then the handoff
 * line that sets up the next clip's reveal. Full-bleed on the locked PBM
 * near-black ground, 9:16 vertical, no side panel, no chroma. This clip does
 * not itself resolve — it ends on the anticipation line and cuts to whatever
 * reveals the first number.
 *
 * Source placement: drop this composition at 00:00:00:02 on the master timeline.
 *
 *   abs 00:00:00:02  local    0  that is why professional revenue managers
 *   abs 00:00:02:05  local   63  do not judge a property by one number
 *   abs 00:00:05:18  local  166  we watch five
 *   abs 00:00:07:13  local  221  and when you understand these five numbers together
 *   abs 00:00:10:07  local  305  you can stop guessing you can see problems sooner
 *   abs 00:00:15:11  local  459  and make better money decisions
 *   abs 00:00:18:08  local  546  let's start with
 *   abs 00:00:19:09  local  577  the number almost everybody watches
 */
export const SOURCE_IN_TIMECODE = "00:00:00:02";

export const T = {
  openingIn: 0,
  openingInDur: 28,
  openingRecedeStart: 138,
  openingRecedeDur: 22,

  headlineIn: 166,
  headlineDur: 26,

  benefit1In: 221,
  benefit2In: 305,
  benefit3In: 459,
  benefitDur: 26,

  cardBgStart: 520,
  cardBgDur: 30,

  startWithIn: 546,
  numberIn: 577,
  cardLineDur: 28,

  outStart: 650,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const OPENING_LEAD =
  "THAT IS WHY PROFESSIONAL REVENUE MANAGERS DO NOT JUDGE A PROPERTY BY ";
export const OPENING_ACCENT = "ONE NUMBER";

export const HEADLINE_LEAD = "WE WATCH ";
export const HEADLINE_ACCENT = "FIVE";

export const BENEFIT_1 = "WHEN YOU UNDERSTAND THESE FIVE NUMBERS TOGETHER";
export const BENEFIT_2 = "YOU STOP GUESSING — YOU SEE PROBLEMS SOONER";
export const BENEFIT_3 = "AND MAKE BETTER MONEY DECISIONS";

export const START_WITH = "LET'S START WITH";
export const NUMBER_LEAD = "THE NUMBER ";
export const NUMBER_ACCENT = "ALMOST EVERYBODY WATCHES";
