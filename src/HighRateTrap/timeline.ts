export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 890; // 29s 20f

/**
 * The mirror mistake to FullCalendarTrap: chasing rate instead of occupancy.
 * Same three-beat shape — setup, ironic contrast, resolution — but the
 * resolution here is a two-sided framework rather than a single punchline,
 * since the transcript explicitly names both failure modes. 16:9, PBM
 * near-black ground, no side panel, no chroma.
 *
 * The transcript carries one explicit pause marker (0.57s at 00:00:13:00),
 * used verbatim as the stage-to-resolution crossfade window, same rule as
 * CalmDiagnosis.
 *
 * Source placement: drop this composition at 00:00:00:02 on the master timeline.
 *
 *   abs 00:00:00:02  local    0  now here's the other mistake
 *   abs 00:00:02:06  local   64  some owners chase the highest rate possible
 *   abs 00:00:05:21  local  169  they say my average rate is $800
 *   abs 00:00:09:01  local  269  great but what if the property is empty half the month
 *   abs 00:00:13:00  local  388  [pause 0.57s]
 *   abs 00:00:13:18  local  406  that does not help you either
 *   abs 00:00:16:02  local  480  so now we have two sides too much focus on occupancy
 *   abs 00:00:20:14  local  612  you may sell too cheap too much focus on rate
 *   abs 00:00:24:17  local  735  you may sit empty
 *
 * The last two rows share one timecode each across two clauses (the caption
 * chunk cuts mid-sentence, not at the logical break). "TOO MUCH FOCUS ON
 * OCCUPANCY" / "TOO MUCH FOCUS ON RATE" resolve as labels and "SELL TOO
 * CHEAP" / "SIT EMPTY" as their outcomes; only the label-then-outcome pairing
 * is real, the internal spacing between them is invented to match natural
 * delivery, same as OccupancyMeter's approach to a one-timecode line.
 */
export const SOURCE_IN_TIMECODE = "00:00:00:02";

export const T = {
  openingIn: 0,
  openingInDur: 28,
  openingRecedeStart: 141,
  openingRecedeDur: 22,

  contrastLine1In: 169,
  contrastLine2In: 269,
  contrastLineDur: 30,

  // the transcript's own 0.57s (17-frame) pause, used verbatim
  cardBgStart: 388,
  cardBgDur: 17,

  topLineIn: 406,
  topLineDur: 28,

  twoSidesLabelIn: 480,
  twoSidesLabelDur: 24,

  sideALabelIn: 520,
  sideAConclusionIn: 612,
  sideBLabelIn: 662,
  sideBConclusionIn: 735,
  sideDur: 26,

  outStart: 833,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const OPENING_LEAD =
  "NOW HERE'S THE OTHER MISTAKE — SOME OWNERS CHASE ";
export const OPENING_ACCENT = "THE HIGHEST RATE POSSIBLE";

export const CONTRAST_LINE_1_LEAD = "MY AVERAGE RATE IS ";
export const CONTRAST_LINE_1_ACCENT = "$800";
export const CONTRAST_LINE_2 = "BUT WHAT IF IT'S EMPTY HALF THE MONTH";

export const TOP_LINE = "THAT DOES NOT HELP YOU EITHER";
export const TWO_SIDES_LABEL = "SO NOW WE HAVE TWO SIDES";

export const SIDE_A_LABEL = "TOO MUCH FOCUS ON OCCUPANCY";
export const SIDE_A_CONCLUSION = "YOU MAY SELL TOO CHEAP";

export const SIDE_B_LABEL = "TOO MUCH FOCUS ON RATE";
export const SIDE_B_CONCLUSION = "YOU MAY SIT EMPTY";
