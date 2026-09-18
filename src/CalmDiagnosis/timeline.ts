export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 440; // 14s 20f

/**
 * A three-beat full-screen sequence: the warning, the calm claim, then the
 * two-step process that backs it up. No side panel, no chroma — this plays
 * full-bleed on the locked PBM near-black ground. 9:16 vertical — every text
 * block wraps within a percentage-based safe width rather than a fixed pixel
 * one, so it holds up whether this lands at 1080x1920 or any other 9:16 size.
 *
 * Source placement: drop this composition at 00:00:00:00 on the master timeline.
 * The transcript's own pause markers set the transition timing below — each
 * lands exactly where the next line begins, so they are the silence gaps
 * between spoken lines, not slack to trim.
 *
 *   abs 00:00:00:08  local   8  that is how owners give money away
 *   abs 00:00:03:17  local 107  a professional revenue manager does not panic
 *   abs 00:00:06:15  local 195  when the calendar looks slow
 *   abs 00:00:08:09  local 249  [pause 0.67s]
 *   abs 00:00:09:00  local 270  we diagnose
 *   abs 00:00:10:10  local 310  [pause 0.70s]
 *   abs 00:00:11:02  local 332  then we move
 */
export const SOURCE_IN_TIMECODE = "00:00:00:00";

export const T = {
  openingIn: 8,
  openingInDur: 28,
  openingRecedeStart: 92,
  openingRecedeDur: 22,

  calmLine1In: 107,
  calmLine2In: 195,
  calmLineDur: 30,

  // the two pause markers, used verbatim as transition windows
  processBgStart: 249,
  processBgDur: 30,
  lineDrawStart: 310,
  lineDrawDur: 21,

  diagnoseIn: 270,
  diagnoseDur: 28,
  moveIn: 332,
  moveDur: 30,

  outStart: 400,
  outDur: 34,

  end: DURATION_IN_FRAMES,
} as const;

export const OPENING_TEXT = "THAT IS HOW OWNERS GIVE MONEY AWAY";

export const CALM_LINE_1_LEAD = "A PROFESSIONAL REVENUE MANAGER ";
export const CALM_LINE_1_ACCENT = "DOES NOT PANIC";
export const CALM_LINE_2 = "WHEN THE CALENDAR LOOKS SLOW";

export const STEP_1_LEAD = "WE ";
export const STEP_1_ACCENT = "DIAGNOSE";
export const STEP_2_LEAD = "THEN WE ";
export const STEP_2_ACCENT = "MOVE";

export const LINE_SLOT_H = 100;
export const LINE_MAX_H = 84;
