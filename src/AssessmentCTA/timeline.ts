export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 640; // 21s 10f

/**
 * The assessment call to action, built on the same left-side panel as
 * FiveThings so the two read as one system when they land in the same video.
 *
 * Source placement: drop this composition at 00:00:00:00 on the master timeline.
 *
 *   abs 00:00:00:00  local   0  and it'll help you see where your strategy is strong
 *   abs 00:00:04:20  local 140  where you may have gaps
 *   abs 00:00:07:03  local 213  and where you may be leaving money on the table
 *   abs 00:00:09:27  local 297  the link is below this video
 *   abs 00:00:11:29  local 359  take the assessment now
 *   abs 00:00:14:01  local 421  and find out if you're just changing prices
 *   abs 00:00:16:27  local 507  or actually managing revenue
 */
export const SOURCE_IN_TIMECODE = "00:00:00:00";

/**
 * Which ground the panel sits on — same contract as FiveThings.
 *
 *   npx remotion render AssessmentCTA out/AssessmentCTA.mp4
 *   npx remotion render AssessmentCTA out/AssessmentCTA.mov \
 *     --props='{"backdrop":"transparent"}' \
 *     --codec=prores --prores-profile=4444 \
 *     --pixel-format=yuva444p10le --image-format=png
 */
export type Backdrop = "green" | "transparent" | "dark";
export type AssessmentCTAProps = { backdrop: Backdrop };

export const PANEL_LEFT = 120;
export const PANEL_TOP = 110;
export const PANEL_W = 760;

export const PAD_LEFT = 56;
export const PAD_RIGHT = 48;
export const CONTENT_W = PANEL_W - PAD_LEFT - PAD_RIGHT;

export const HEADER_Y = 44;
export const HEAD_RULE_Y = 96;
export const ROW0_Y = 128;
export const ROW_PITCH = 68;
export const ROW_MARK_W = 40;

export const CTA_RULE_Y = 336;
export const LINK_Y = 368;
export const CTA_Y = 404;
export const URL_Y = 468;

export const CMP_RULE_Y = 538;
export const CMP_A_Y = 570;
export const CMP_B_Y = 618;

export type OutcomeSpec = {
  slot: number;
  text: string;
  /** The third outcome is the one that costs money, so it takes the gold. */
  emphasis?: boolean;
  inStart: number;
};

export const OUTCOMES: OutcomeSpec[] = [
  { slot: 0, text: "WHERE YOUR STRATEGY IS STRONG", inStart: 8 },
  { slot: 1, text: "WHERE YOU MAY HAVE GAPS", inStart: 146 },
  {
    slot: 2,
    text: "WHERE YOU’RE LEAVING MONEY",
    emphasis: true,
    inStart: 219,
  },
];

/** The panel only ever holds what has already been said. Height, never opacity. */
export const GROW_FRAMES = [
  0, 26, 140, 166, 213, 239, 297, 323, 359, 385, 421, 447, 507, 533,
];
export const GROW_HEIGHTS = [
  0, 218, 218, 286, 286, 354, 354, 454, 454, 554, 554, 662, 662, 710,
];

export const T = {
  headerStart: 12,
  headerDur: 24,

  headRuleStart: 20,
  headRuleDur: 24,

  rowDur: 24,

  ctaRuleStart: 300,
  ctaRuleDur: 24,

  linkStart: 306,
  linkDur: 26,

  ctaStart: 365,
  ctaDur: 28,
  urlStart: 381,
  urlDur: 26,

  cmpRuleStart: 425,
  cmpRuleDur: 24,

  cmpAStart: 429,
  cmpADur: 28,
  cmpBStart: 513,
  cmpBDur: 28,

  outStart: 580,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const HEADER_TEXT = "THE ASSESSMENT SHOWS YOU";

export const LINK_TEXT = "LINK BELOW THIS VIDEO";
export const CTA_TEXT = "TAKE THE ASSESSMENT NOW";

/**
 * The destination Maynard supplied. pricingbymira.com is blocked by this
 * session's network egress policy, so the assessment's on-page name and button
 * wording could not be read — nothing here is copied from the site, and the
 * headline above uses the transcript's own words rather than a product name.
 * Worth a check against the live page before this ships.
 */
export const URL_TEXT = "PRICINGBYMIRA.COM";

export const CMP_A_TEXT = "JUST CHANGING PRICES?";
export const CMP_B_TEXT = "OR ACTUALLY MANAGING REVENUE";
