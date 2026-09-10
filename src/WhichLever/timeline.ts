export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 480; // 16s

export const CENTER_X = WIDTH / 2;

/* ------------------------------------------------------------------ *
 * Layout                                                              *
 * ------------------------------------------------------------------ */

/** The question opens centred, then docks to the top over the levers. */
export const HEAD_Y_OPEN = 470;
export const HEAD_Y_DOCKED = 216;
export const HEAD_SCALE_DOCKED = 0.82;
export const SUB_GAP = 34;

export const LEVER_COUNT = 4;
export const LEVER_PITCH = 340;
export const TRACK_TOP = 392;
export const TRACK_H = 236;
export const TRACK_W = 6;
export const HANDLE_W = 62;
export const HANDLE_H = 22;
export const LABEL_Y = 700;

/** Handles rest here, and the pulled one travels to the bottom of its track. */
export const HANDLE_REST = 0.32;
export const HANDLE_PULLED = 0.93;

/** Index of the lever everyone reaches for first. */
export const PRICE_INDEX = 0;

const LEVER_SPAN = (LEVER_COUNT - 1) * LEVER_PITCH;
export const leverX = (index: number) =>
  CENTER_X - LEVER_SPAN / 2 + index * LEVER_PITCH;
export const handleY = (t: number) => TRACK_TOP + TRACK_H * t;

export const DROP_LABEL_Y = 800;

/* ------------------------------------------------------------------ *
 * Timing — frames keyed to the transcript timecodes (30fps)           *
 * ------------------------------------------------------------------ */

export const T = {
  // "which lever should you pull" — 00:00:00:03
  headIn: 10,
  headDur: 32,
  // "when a property isn't booking" — 00:00:03:18
  subIn: 112,
  subDur: 26,

  // "what's the first thing most people do" — 00:00:05:26
  dockStart: 178,
  dockDur: 42,
  leverDur: 26,
  leverStarts: [188, 208, 228, 248],

  // "they drop their price" — 00:00:08:20
  pullStart: 266,
  pullDur: 36,
  dropLabelIn: 272,
  dropLabelDur: 26,

  // "but what if the price isn't the problem" — 00:00:10:03
  stageDim: 310,
  stageDimDur: 30,
  q1In: 314,
  q1Dur: 32,
  q1Out: 372,
  q1OutDur: 24,
  stageOut: 372,
  stageOutDur: 24,

  // "what if the guest literally can't book you" — 00:00:12:18
  q2In: 386,
  q2Dur: 34,

  end: DURATION_IN_FRAMES,
} as const;

/* ------------------------------------------------------------------ *
 * Content                                                             *
 * ------------------------------------------------------------------ */

export const HEAD_TEXT = "WHICH LEVER SHOULD YOU PULL?";
export const SUB_TEXT = "WHEN A PROPERTY ISN'T BOOKING";

/**
 * Only the price lever is named. The other three stay unlabelled on
 * purpose — they are the levers owners have not thought about yet, and
 * naming them here would answer the question the scene is asking.
 */
export const PRICE_LABEL = "PRICE";
export const UNNAMED_LABEL = "—";

export const DROP_LABEL = "THEY DROP THEIR PRICE";

export const Q1_LEAD = "BUT WHAT IF THE PRICE ";
export const Q1_KEY = "ISN'T THE PROBLEM?";

export const Q2_LEAD = "WHAT IF THE GUEST LITERALLY ";
export const Q2_KEY = "CAN'T BOOK YOU?";
