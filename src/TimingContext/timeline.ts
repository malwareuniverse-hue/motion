export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 660;

export const SOURCE_IN_TIMECODE = "00:00:00:03";

/**
 * abs 00:00:00:03  local   0  "a big five bedroom house may book months ahead"
 * abs 00:00:02:29  local  86  "where a small condo may book much later"
 * abs 00:00:06:02  local 179  "summer may book one way"
 * abs 00:00:08:05  local 242  "shoulder season may book another way"
 * abs 00:00:10:27  local 324  "and that matters"
 * abs 00:00:12:26  local 383  "120 days away should not be treated the same as a date"
 * abs 00:00:15:29  local 476  "12 days away the demand might be the same"
 * abs 00:00:19:03  local 570  "but the urgency is not timing changes the strategy"
 */

export const T = {
  // Stage A: property type comparison
  houseIn: 0,   houseInDur: 24,
  condoIn: 86,  condoInDur: 22,
  barsIn: 14,   barsDur: 60,

  // Stage A → B
  aOut: 163, aOutDur: 16,

  // Stage B: seasonal booking patterns
  summerIn: 179, summerInDur: 22,
  shoulderIn: 242, shoulderInDur: 22,

  // Stage C: "And that matters."
  matterIn: 324, matterInDur: 22,

  // Stage B-C → D
  bcOut: 360, bcOutDur: 16,

  // Stage D: 120 vs 12 days
  card120In: 383,   card120Dur: 24,
  bars120In: 403,   bars120Dur: 40,
  card12In: 476,    card12Dur: 24,
  bars12In: 496,    bars12Dur: 40,

  // Stage D → E
  dOut: 548, dOutDur: 16,

  // Stage E: "Timing changes the strategy."
  stageE: 570, stageEDur: 24,

  // Outro
  outStart: 610, outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;
