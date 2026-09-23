export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 380; // 12s 20f

/**
 * A subscribe CTA overlay, positioned on the RIGHT rather than SubscribeCTA's
 * lower-left: the reference frame has Emile on camera-left with the open
 * ground on camera-right (marked with a red circle in the reference
 * screenshot), so the card sits there instead of dead-centre or mirroring
 * the other scene's corner.
 *
 * The background is transparent so Emile stays on camera underneath. To
 * composite it in Premiere, render with an alpha-capable codec — the pixel
 * format and image format both matter, otherwise the alpha channel is
 * flattened away:
 *
 *   npx remotion render SimpleStrategiesCTA out/SimpleStrategiesCTA.mov \
 *     --codec=prores --prores-profile=4444 \
 *     --pixel-format=yuva444p10le --image-format=png
 *
 * Source placement: drop this composition at 00:00:01:00 on the master timeline.
 *
 *   abs 00:00:01:00  local   0  if you want more simple strategies
 *   abs 00:00:03:05  local  65  to help you make more money
 *   abs 00:00:05:08  local 128  from your short term rental
 *   abs 00:00:07:02  local 182  subscribe to this channel below
 *   abs 00:00:09:06  local 246  because in the next episode
 *
 * The closing line is a handoff, not a resolution — it never says what the
 * next episode is about, it only earns the cut into it, the same contract
 * FiveNumbersIntro's and RevenueAssessmentCTA's closing lines use.
 */
export const SOURCE_IN_TIMECODE = "00:00:01:00";

export const CARD_W = 820;
export const CARD_LEFT = 940;
export const CARD_TOP = 490;
export const CARD_H_COMPACT = 230;
export const CARD_H_FULL = 384;

export const PAD_LEFT = 52;
export const PAD_TOP = 44;

/** The card only ever holds what has already been said — it grows per beat. */
export const GROW_FRAMES = [0, 166, 196, 236, 266];
export const GROW_HEIGHTS = [
  CARD_H_COMPACT,
  CARD_H_COMPACT,
  CARD_H_FULL,
  CARD_H_FULL,
  CARD_H_FULL,
];

export const T = {
  cardStart: 0,
  cardDur: 26,

  line1Start: 0,
  line2Start: 65,
  line3Start: 128,
  buildDur: 24,

  ruleStart: 160,
  ruleDur: 20,

  ctaStart: 182,
  ctaDur: 26,

  teaseStart: 246,
  teaseDur: 24,

  outStart: 340,
  outDur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const LINE_1 = "IF YOU WANT MORE SIMPLE STRATEGIES";
export const LINE_2 = "TO HELP YOU MAKE MORE MONEY";
export const LINE_3 = "FROM YOUR SHORT-TERM RENTAL";

export const CTA_TEXT = "SUBSCRIBE TO THIS CHANNEL BELOW";
export const TEASE_TEXT = "BECAUSE IN THE NEXT EPISODE —";
