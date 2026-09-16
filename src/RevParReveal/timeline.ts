export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 1290; // 43s

/**
 * The payoff to the arc FiveNumbersIntro and RevenueDuel left open: a worked
 * two-property example completes the nights x rate = revenue math those
 * clips withheld, then names RevPAR outright. Same illustration language as
 * RevenueDuel (house icon, nights strip, price tag) since this is its
 * direct resolution, extended with an actual computed result per property.
 * 16:9, PBM near-black ground, no chroma.
 *
 * Source placement: drop this composition at 00:00:00:03 on the master timeline.
 *
 *   abs 00:00:00:03  local    0  I like it because it helps answer a simple question
 *   abs 00:00:03:15  local  102  how hard is my calendar working for me
 *   abs 00:00:07:09  local  216  let's say I have 10 nights available
 *   abs 00:00:09:26  local  293  property a sells 8 of them at 300
 *   abs 00:00:13:11  local  398  that's 2,400 dollars
 *   abs 00:00:15:05  local  452  property B sells 10 at $220
 *   abs 00:00:18:08  local  545  that's 2,200 dollars
 *   abs 00:00:20:05  local  602  Property B had better occupancy
 *   abs 00:00:23:18  local  705  property a made more money
 *   abs 00:00:26:14  local  791  that is why I keep saying
 *   abs 00:00:28:25  local  862  full does not always mean better
 *   abs 00:00:32:01  local  958  revpar helps connect your rate and your occupancy
 *   abs 00:00:37:02  local 1109  into one clear picture
 *
 * "That's 20 four hundred dollars" / "that's 20 two hundred dollars" are the
 * transcript's own transcription of "$2,400" and "$2,200" — both check out
 * against the stated nights and rates (8 x $300, 10 x $220).
 */
export const SOURCE_IN_TIMECODE = "00:00:00:03";

export const T = {
  openingIn: 0,
  openingInDur: 28,
  openingRecedeStart: 188,
  openingRecedeDur: 22,

  cardBgStart: 210,
  cardBgDur: 20,

  setupIn: 216,
  setupDur: 22,

  cardABuildIn: 293,
  cardARevenueIn: 398,
  cardBBuildIn: 452,
  cardBRevenueIn: 545,
  cardDur: 26,

  calloutBIn: 602,
  calloutAIn: 705,
  calloutDur: 24,

  stage3BgStart: 770,
  stage3BgDur: 20,

  thesisLeadIn: 791,
  thesisLeadDur: 22,
  thesisAccentIn: 862,
  thesisAccentDur: 28,

  revparLine1In: 958,
  revparLine1Dur: 30,
  revparLine2In: 1109,
  revparLine2Dur: 28,

  outStart: 1229,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const OPENING_LEAD =
  "I LIKE IT BECAUSE IT HELPS ANSWER A SIMPLE QUESTION — ";
export const OPENING_ACCENT = "HOW HARD IS MY CALENDAR WORKING FOR ME";

export const SETUP_LINE = "LET'S SAY I HAVE 10 NIGHTS AVAILABLE";
export const NIGHTS_TOTAL = 10;

export const CARD_A_NIGHTS_FILLED = 8;
export const CARD_A_RATE = "$300 / NIGHT";
export const CARD_A_REVENUE = "$2,400";

export const CARD_B_NIGHTS_FILLED = 10;
export const CARD_B_RATE = "$220 / NIGHT";
export const CARD_B_REVENUE = "$2,200";

export const CALLOUT_B = "PROPERTY B HAD BETTER OCCUPANCY";
export const CALLOUT_A = "PROPERTY A MADE MORE MONEY";

export const THESIS_LEAD_SMALL = "THAT IS WHY I KEEP SAYING";
export const THESIS_LEAD = "FULL DOES NOT ALWAYS MEAN ";
export const THESIS_ACCENT = "BETTER";

export const REVPAR_ACCENT = "REVPAR ";
export const REVPAR_LEAD = "HELPS CONNECT YOUR RATE AND YOUR OCCUPANCY";
export const REVPAR_LINE2 = "INTO ONE CLEAR PICTURE";
