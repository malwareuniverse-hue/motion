export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 540; // 18s

/**
 * A three-beat full-screen sequence, same contract as CalmDiagnosis: the
 * owner/guest contrast, the owner's defensive claim, then the rebuttal —
 * cross-dissolving into the resolution card on the transcript's own pause
 * rather than an invented gap. No side panel, no chroma, full-bleed on the
 * locked PBM near-black ground. 9:16 vertical: every text block wraps within
 * a percentage-based safe width rather than a fixed pixel one.
 *
 * This covers different transcript wording than the existing 16:9
 * OwnerGuestEyes scene (which also references the $80,000 kitchen) — this is
 * the vertical Shorts/Reels companion, not a re-edit of that composition.
 *
 * Source placement: drop this composition at 00:00:00:13 on the master timeline.
 *
 *   abs 00:00:00:13  local   0  owners look at their properties through owner eyes
 *   abs 00:00:04:02  local 109  but guests do not
 *   abs 00:00:06:06  local 173  you may say — I spent $80,000 on this kitchen
 *   abs 00:00:10:21  local 308  [pause 0.83s]
 *   abs 00:00:11:17  local 334  the guest does not care what you spent
 *   abs 00:00:14:09  local 416  they care about one thing —
 *
 * The closing line is a handoff, not a resolution: it never names the one
 * thing guests care about, it only earns the cut into whatever segment
 * answers it next — the same contract FiveNumbersIntro's own closing line
 * uses.
 */
export const SOURCE_IN_TIMECODE = "00:00:00:13";

export const T = {
  openingIn: 0,
  openingInDur: 28,
  openingRecedeStart: 80,
  openingRecedeDur: 27,

  contrastLine1In: 109,
  contrastLine2In: 173,
  contrastLineDur: 30,

  // the transcript's own pause, used verbatim as the crossfade window
  cardBgStart: 308,
  cardBgDur: 25,

  rebuttalLine1In: 334,
  rebuttalLine1Dur: 28,
  rebuttalLine2In: 416,
  rebuttalLine2Dur: 30,

  outStart: 496,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const OPENING_TEXT = "OWNERS LOOK AT THEIR PROPERTIES";
export const OPENING_ACCENT = "THROUGH OWNER EYES";

export const CONTRAST_LINE_1 = "BUT GUESTS DO NOT";
export const CONTRAST_LINE_2_LEAD = "YOU MAY SAY — ";
export const CONTRAST_LINE_2_ACCENT = "“I SPENT $80,000 ON THIS KITCHEN”";

export const REBUTTAL_LINE_1 = "THE GUEST DOES NOT CARE WHAT YOU SPENT";
export const REBUTTAL_LINE_2_LEAD = "THEY CARE ABOUT ";
export const REBUTTAL_LINE_2_ACCENT = "ONE THING —";
