export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 210; // 7s

/**
 * Reusable PBM chapter opener. Only the numeral, label and headline change
 * between chapters — dimensions, spacing, timing and gold treatment stay put.
 *
 * Source placement: drop this composition at 00:00:29:11 on the master timeline.
 * Local frame 0 lands on "alright so let's keep going".
 *
 *   abs 00:00:29:11  local   0  alright so let's keep going
 *   abs 00:00:31:03  local  52  because number three is where
 *   abs 00:00:32:13  local  92  a lot of bad pricing decisions start to happen
 */
export const SOURCE_IN_TIMECODE = "00:00:29:11";

export const CONTENT_LEFT = 200;
export const RULE_Y = 404;
export const LABEL_Y = 444;
export const HEADLINE_Y = 520;
export const HEADLINE_LINE_H = 96;

export const T = {
  ruleStart: 4,
  ruleDur: 26,
  ruleWidth: 108,

  ghostStart: 30,
  ghostDur: 40,

  labelStart: 52,
  labelDur: 24,

  line1Start: 92,
  line2Start: 104,
  lineDur: 28,

  outStart: 180,
  outDur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const GHOST_NUMERAL = "03";
export const LABEL_TEXT = "NUMBER THREE";
export const HEADLINE_LINE_1_LEAD = "WHERE ";
export const HEADLINE_LINE_1_ACCENT = "BAD PRICING";
export const HEADLINE_LINE_2 = "DECISIONS START";
