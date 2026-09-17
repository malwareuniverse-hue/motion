export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 780; // 26s

/**
 * A second, fuller assessment call-to-action: unlike AssessmentCTA (which
 * opened mid-sentence and had to invent its button/URL copy because
 * pricingbymira.com was network-blocked at authoring time), this one gets
 * the complete standalone hook plus a handoff into the next segment, and it
 * renders the assessment page's own verified copy and the Mira Hospitality
 * mark — both supplied directly as reference screenshots rather than
 * fetched, so nothing here is guessed.
 *
 * Source placement: drop this composition at 00:00:00:02 on the master timeline.
 *
 *   abs 00:00:00:02  local   0  if you're not sure
 *   abs 00:00:01:25  local  53  take this free STR revenue assessment below
 *   abs 00:00:05:03  local 151  take it now and it'll help you see
 *   abs 00:00:07:14  local 222  where your revenue strategy is strong
 *   abs 00:00:10:05  local 303  where you may have gaps
 *   abs 00:00:12:03  local 361  and where you may be leaving money on the table
 *   abs 00:00:15:00  local 448  the link is below this video
 *   abs 00:00:17:03  local 511  take the assessment — stop guessing at your numbers
 *   abs 00:00:20:27  local 625  and before you go — here is your revenue minute
 *
 * The closing line is a handoff, not a resolution: it never explains "the
 * revenue minute," it only earns the cut into whatever segment opens with
 * it next — the same anticipation-card contract FiveNumbersIntro's ending
 * uses for its own handoff.
 */
export const SOURCE_IN_TIMECODE = "00:00:00:02";

export const T = {
  hookLine1In: 0,
  hookLine2In: 53,
  hookDur: 26,
  hookRecedeStart: 128,
  hookRecedeDur: 23,

  outcomesLeadIn: 151,
  outcomesLeadDur: 26,
  outcome1In: 222,
  outcome2In: 303,
  outcome3In: 361,
  outcomeDur: 24,

  stage2RecedeStart: 420,
  stage2RecedeDur: 24,

  assessmentCardIn: 420,
  assessmentCardDur: 30,

  linkTextIn: 448,
  linkTextDur: 26,
  ctaTextIn: 511,
  ctaTextDur: 28,

  stage3BgStart: 600,
  stage3BgDur: 24,

  handoffLine1In: 625,
  handoffLine2In: 653,
  handoffDur: 28,

  outStart: 731,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const HOOK_LINE_1 = "IF YOU'RE NOT SURE";
export const HOOK_LINE_2 = "TAKE THIS FREE STR REVENUE ASSESSMENT BELOW";

export const OUTCOMES_LEAD = "TAKE IT NOW AND IT'LL HELP YOU SEE";

export type OutcomeSpec = {
  slot: number;
  text: string;
  emphasis?: boolean;
  in: number;
};

export const OUTCOMES: OutcomeSpec[] = [
  { slot: 0, text: "WHERE YOUR REVENUE STRATEGY IS STRONG", in: T.outcome1In },
  { slot: 1, text: "WHERE YOU MAY HAVE GAPS", in: T.outcome2In },
  {
    slot: 2,
    text: "WHERE YOU MAY BE LEAVING MONEY ON THE TABLE",
    emphasis: true,
    in: T.outcome3In,
  },
];

export const LINK_TEXT = "THE LINK IS BELOW THIS VIDEO";
export const CTA_TEXT = "TAKE THE ASSESSMENT — STOP GUESSING AT YOUR NUMBERS";

/**
 * Verified against the reference screenshot of the live assessment page —
 * not reconstructed from the transcript the way AssessmentCTA's placeholder
 * copy was. MIRA HOSPITALITY is the brand shown on that page's own header.
 */
export const BRAND_NAME = "MIRA HOSPITALITY";
export const CARD_HEADLINE = "IS YOUR STR POSITIONED FOR TOP 1% PERFORMANCE?";
export const CARD_SUBHEAD =
  "Most properties don't have a demand problem — they have a positioning problem. This 60-second assessment shows where yours stands.";
export const CARD_BUTTON = "START ASSESSMENT";
export const CARD_TIME_NOTE = "TAKES 1 MINUTE";

export const HANDOFF_LINE_1 = "AND BEFORE YOU GO —";
export const HANDOFF_LINE_2 = "HERE IS YOUR REVENUE MINUTE";
