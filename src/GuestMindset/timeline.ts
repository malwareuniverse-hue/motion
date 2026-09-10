export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 500; // 16s 20f

/**
 * Source placement: drop this composition at 00:00:01:14 on the master timeline.
 * Local frame 0 lands on "the guest is not thinking about your renovation cost".
 *
 *   abs 00:00:01:14  local   0  the guest is not thinking about your renovation cost
 *   abs 00:00:04:29  local 105  they're thinking about how hard you worked
 *   abs 00:00:07:05  local 171  they're not thinking about that
 *   abs 00:00:08:19  local 215  they're asking which one should I book
 *   abs 00:00:12:01  local 317  if your answer is not obvious
 *   abs 00:00:14:13  local 389  that is a revenue problem
 */
export const SOURCE_IN_TIMECODE = "00:00:01:14";

export const ITEM_W = 900;
export const ITEM_H = 100;
export const ITEM_PITCH = 124;
export const ITEM0_Y = 268;

export const itemY = (slot: number) => ITEM0_Y + slot * ITEM_PITCH;

export type DismissedSpec = {
  slot: number;
  text: string;
  inStart: number;
};

export const T = {
  eyebrowStart: 0,
  eyebrowDur: 26,

  itemInDur: 26,

  strikeStart: 171,
  strikeDur: 28,

  recedeStart: 199,
  recedeDur: 30,

  questionStart: 215,
  questionDur: 32,
  questionRuleDur: 24,

  toFinalStart: 299,
  toFinalDur: 30,

  line1Start: 317,
  line1Dur: 30,
  line2Start: 389,
  line2Dur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const EYEBROW_TEXT = "THE GUEST IS NOT THINKING ABOUT";

export const DISMISSED_ITEMS: DismissedSpec[] = [
  { slot: 0, text: "YOUR RENOVATION COST", inStart: 18 },
  { slot: 1, text: "HOW HARD YOU WORKED", inStart: 105 },
];

export const QUESTION_LABEL = "THEY’RE ASKING";
export const QUESTION_TEXT = "WHICH ONE SHOULD I BOOK?";

export const CLOSING_LINE_1 = "IF THE ANSWER ISN’T OBVIOUS,";
export const CLOSING_LINE_2_LEAD = "THAT’S A ";
export const CLOSING_LINE_2_ACCENT = "REVENUE PROBLEM.";
