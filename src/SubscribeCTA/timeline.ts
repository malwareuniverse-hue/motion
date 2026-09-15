export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 390; // 13s

/**
 * Lower-left CTA overlay. The background is transparent, so Emile stays on
 * camera underneath. To composite it in Premiere, render with an alpha-capable
 * codec — the pixel format and image format both matter, otherwise the alpha
 * channel is flattened away:
 *
 *   npx remotion render SubscribeCTA out/SubscribeCTA.mov \
 *     --codec=prores --prores-profile=4444 \
 *     --pixel-format=yuva444p10le --image-format=png
 *
 * Source placement: drop this composition at 00:00:16:19 on the master timeline.
 * Local frame 0 lands on "if this is helping you".
 *
 *   abs 00:00:16:19  local   0  if this is helping you
 *   abs 00:00:17:29  local  40  look at your property differently
 *   abs 00:00:20:09  local 110  subscribe to this channel
 *   abs 00:00:21:26  local 157  this revenue management blueprint
 *   abs 00:00:23:18  local 209  is built to help you stop guessing
 *   abs 00:00:25:26  local 277  and make more money from your short term rental
 */
export const SOURCE_IN_TIMECODE = "00:00:16:19";

export const CARD_LEFT = 140;
export const CARD_TOP = 490;
export const CARD_W = 840;
export const CARD_H_COMPACT = 292;
export const CARD_H_FULL = 420;

/** The card only ever holds what has already been said — it grows per beat. */
export const GROW_FRAMES = [0, 196, 226, 268, 298];
export const GROW_HEIGHTS = [
  CARD_H_COMPACT,
  CARD_H_COMPACT,
  364,
  364,
  CARD_H_FULL,
];

export const PAD_LEFT = 56;
export const PAD_TOP = 48;

export const LABEL_Y = PAD_TOP;
export const HEADLINE_Y = 122;
export const HEADLINE_H = 116;
export const DIVIDER_Y = 252;
export const BENEFIT0_Y = 286;
export const BENEFIT_PITCH = 56;

export type BenefitSpec = {
  slot: number;
  text: string;
  inStart: number;
};

export const T = {
  cardStart: 0,
  cardDur: 26,
  ruleDrawStart: 0,
  ruleDrawDur: 26,

  labelStart: 8,
  labelDur: 24,

  headlineAStart: 16,
  headlineADur: 26,

  swapStart: 110,
  swapDur: 22,

  markStart: 114,
  markDur: 22,

  dividerStart: 196,
  dividerDur: 22,

  benefitDur: 24,

  outStart: 348,
  outDur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const LABEL_TEXT = "THE REVENUE MANAGEMENT BLUEPRINT";
export const HEADLINE_A = "SEE YOUR PROPERTY DIFFERENTLY";
export const HEADLINE_B = "SUBSCRIBE TO THIS CHANNEL";

export const BENEFITS: BenefitSpec[] = [
  { slot: 0, text: "STOP GUESSING", inStart: 209 },
  { slot: 1, text: "MAKE MORE FROM YOUR SHORT-TERM RENTAL", inStart: 277 },
];
