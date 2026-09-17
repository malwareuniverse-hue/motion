export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 420; // 14s

/**
 * The payoff to SimpleStrategiesCTA's own handoff ("because in the next
 * episode —"): what that next episode actually covers. Same right-side
 * placement as SimpleStrategiesCTA (Emile on camera-left, card on the open
 * ground to camera-right) — the earlier scene's own five lines aren't
 * repeated here since they already have their composition.
 *
 * The transcript carries two explicit pause markers. Both are used verbatim
 * as animation transition windows rather than re-timed by eye: the first is
 * the card's own entrance, assembling during the silence right after "next
 * episode" lands; the second is the divider draw that makes room for the
 * final, gold "and when to panic" line, so the beat of hesitation before
 * naming panic lands on the same silence the transcript has.
 *
 * Source placement: drop this composition at 00:00:11:09 on the master timeline.
 *
 *   abs 00:00:11:09  local   0  [pause 0.53s] — the card's entrance
 *   abs 00:00:11:26  local  17  we're going to keep breaking down the numbers
 *   abs 00:00:15:21  local 132  that help you decide when to hold
 *   abs 00:00:19:01  local 232  when to move
 *   abs 00:00:20:21  local 282  [pause 0.70s] — the divider draw
 *   abs 00:00:21:13  local 304  and when to panic
 */
export const SOURCE_IN_TIMECODE = "00:00:11:09";

export const CARD_W = 820;
export const CARD_LEFT = 940;
export const CARD_TOP = 490;
export const CARD_H_COMPACT = 260;
export const CARD_H_FULL = 380;

export const PAD_LEFT = 52;
export const PAD_TOP = 44;

/**
 * The card assembles during the first pause, then grows again during the
 * second — the same "only ever holds what's been said" contract
 * SimpleStrategiesCTA's card uses, but here the two growth windows are the
 * transcript's own pauses rather than invented gaps.
 */
export const GROW_FRAMES = [0, 16, 282, 303];
export const GROW_HEIGHTS = [0, CARD_H_COMPACT, CARD_H_COMPACT, CARD_H_FULL];

export const T = {
  cardRiseDur: 16,

  line1Start: 17,
  line2Start: 132,
  line3Start: 232,
  buildDur: 24,

  ruleStart: 282,
  ruleDur: 21,

  line4Start: 304,
  line4Dur: 26,

  outStart: 390,
  outDur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const LINE_1 = "WE'RE GOING TO KEEP BREAKING DOWN THE NUMBERS";
export const LINE_2 = "THAT HELP YOU DECIDE WHEN TO HOLD";
export const LINE_3 = "WHEN TO MOVE";
export const LINE_4 = "AND WHEN TO PANIC";
