export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 680; // 22s 20f

/**
 * A three-beat full-bleed script sequence, same family as CalmDiagnosis and
 * FiveNumbersIntro: the seductive setup, the ironic contrast, then the
 * resolution card that names the actual danger. Unlike FiveNumbersIntro this
 * one does resolve on its own — it ends on the transcript's own punchline
 * rather than a handoff. 16:9, PBM near-black ground, no side panel, no
 * chroma.
 *
 * Source placement: drop this composition at 00:00:00:11 on the master timeline.
 *
 *   abs 00:00:00:11  local    0  imagine you sell almost every night
 *   abs 00:00:03:15  local   94  but you sold those nights too cheap
 *   abs 00:00:06:20  local  189  your calendar looks amazing
 *   abs 00:00:09:01  local  260  your bank account maybe not
 *   abs 00:00:11:24  local  343  that is the danger a full calendar feels good
 *   abs 00:00:16:18  local  487  but sometimes
 *   abs 00:00:18:11  local  540  a full calendar means your price was too low
 */
export const SOURCE_IN_TIMECODE = "00:00:00:11";

export const T = {
  openingIn: 0,
  openingInDur: 28,
  openingRecedeStart: 161,
  openingRecedeDur: 22,

  contrastLine1In: 189,
  contrastLine2In: 260,
  contrastLineDur: 30,

  cardBgStart: 305,
  cardBgDur: 30,

  dangerIn: 343,
  dangerDur: 30,

  leadInIn: 487,
  leadInDur: 22,

  finalIn: 540,
  finalDur: 30,

  outStart: 630,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export const OPENING_LEAD =
  "IMAGINE YOU SELL ALMOST EVERY NIGHT — BUT YOU SOLD THOSE NIGHTS ";
export const OPENING_ACCENT = "TOO CHEAP";

export const CONTRAST_LINE_1_LEAD = "YOUR CALENDAR LOOKS ";
export const CONTRAST_LINE_1_ACCENT = "AMAZING";
export const CONTRAST_LINE_2 = "YOUR BANK ACCOUNT MAYBE NOT";

export const DANGER_LEAD = "THAT IS THE DANGER — A FULL CALENDAR ";
export const DANGER_ACCENT = "FEELS GOOD";

export const LEAD_IN = "BUT SOMETIMES";

export const FINAL_LEAD = "A FULL CALENDAR MEANS YOUR PRICE WAS ";
export const FINAL_ACCENT = "TOO LOW";
