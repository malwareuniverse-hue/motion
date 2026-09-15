export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 1200; // 40s

/**
 * The five-check framework, built as a left-side panel so Emile keeps the right
 * two thirds of the frame.
 *
 * Source placement: drop this composition at 00:00:00:01 on the master timeline.
 * Local frame 0 lands on "check these five things number one is property".
 *
 *   abs 00:00:00:01  local    0  check these five things number one is property
 *   abs 00:00:04:14  local  133  is your property worth more
 *   abs 00:00:06:25  local  204  number two is guest why would they pick you
 *   abs 00:00:11:03  local  332  number three is competition
 *   abs 00:00:13:24  local  413  are you watching the wrong homes
 *   abs 00:00:16:07  local  486  No 4 is revenue target
 *   abs 00:00:18:13  local  552  what should this property really make
 *   abs 00:00:21:25  local  654  and number five is your strategy
 *   abs 00:00:25:13  local  762  what should you actually change
 *   abs 00:00:28:13  local  852  that is the pricing by mira framework
 *   abs 00:00:30:29  local  928  and if you get these five right
 *   abs 00:00:33:11  local 1000  your pricing gets easier
 *   abs 00:00:35:17  local 1066  because now the price has context
 */
export const SOURCE_IN_TIMECODE = "00:00:00:01";

/**
 * Which ground the panel sits on. "green" renders chroma key green for a keyer;
 * "transparent" renders a real alpha channel (better edges, no spill) and
 * "dark" renders the PBM near-black ground for a full-screen cut.
 *
 *   npx remotion render FiveThings out/FiveThings.mp4
 *   npx remotion render FiveThings out/FiveThings.mov \
 *     --props='{"backdrop":"transparent"}' \
 *     --codec=prores --prores-profile=4444 \
 *     --pixel-format=yuva444p10le --image-format=png
 */
export type Backdrop = "green" | "transparent" | "dark";
export type FiveThingsProps = { backdrop: Backdrop };

export const PANEL_LEFT = 120;
export const PANEL_TOP = 110;
export const PANEL_W = 760;

export const PAD_LEFT = 56;
export const PAD_RIGHT = 48;
export const CONTENT_W = PANEL_W - PAD_LEFT - PAD_RIGHT;

export const HEADER_Y = 44;
export const HEAD_RULE_Y = 96;
export const ROW0_Y = 124;
export const ROW_PITCH = 100;
export const ROW_INDEX_W = 60;
export const ROW_QUESTION_DY = 42;

export const FOOT_RULE_Y = 632;
export const CLOSING1_Y = 666;
export const CLOSING2_Y = 716;

export type CheckSpec = {
  slot: number;
  index: string;
  label: string;
  question: string;
  /** The fifth check carries the conclusion, so its label takes the gold. */
  emphasis?: boolean;
  labelIn: number;
  questionIn: number;
};

export const CHECKS: CheckSpec[] = [
  {
    slot: 0,
    index: "01",
    label: "PROPERTY",
    question: "Is your property worth more?",
    labelIn: 10,
    questionIn: 133,
  },
  {
    slot: 1,
    index: "02",
    label: "GUEST",
    question: "Why would they pick you?",
    labelIn: 210,
    questionIn: 238,
  },
  {
    slot: 2,
    index: "03",
    label: "COMPETITION",
    question: "Are you watching the wrong homes?",
    labelIn: 338,
    questionIn: 413,
  },
  {
    slot: 3,
    index: "04",
    label: "REVENUE TARGET",
    question: "What should this property really make?",
    labelIn: 492,
    questionIn: 552,
  },
  {
    slot: 4,
    index: "05",
    label: "STRATEGY",
    question: "What should you actually change?",
    emphasis: true,
    labelIn: 660,
    questionIn: 762,
  },
];

/**
 * The panel only ever holds what has already been said. This one curve is both
 * the entrance wipe and the per-check growth — and because it moves height
 * rather than opacity, every frame of it is fully opaque, which is what keeps
 * the chroma key clean.
 */
export const GROW_FRAMES = [
  0, 26, 204, 226, 332, 354, 486, 508, 654, 676, 928, 954,
];
export const GROW_HEIGHTS = [
  0, 272, 272, 372, 372, 472, 472, 572, 572, 672, 672, 800,
];

export const T = {
  headerStart: 12,
  headerDur: 24,

  headRuleStart: 20,
  headRuleDur: 24,

  rowDur: 24,

  swapStart: 852,
  swapDur: 26,

  footRuleStart: 940,
  footRuleDur: 24,

  closing1Start: 1000,
  closing1Dur: 28,
  closing2Start: 1066,
  closing2Dur: 28,

  outStart: 1150,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const HEADER_A = "CHECK THESE FIVE THINGS";
export const HEADER_B = "THE PRICING BY MIRA FRAMEWORK";

export const CLOSING_1 = "YOUR PRICING GETS EASIER";
export const CLOSING_2 = "NOW THE PRICE HAS CONTEXT";
