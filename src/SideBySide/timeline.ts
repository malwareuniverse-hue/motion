export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 1620; // 54s

/* ------------------------------------------------------------------ *
 * Layout                                                              *
 * ------------------------------------------------------------------ */

export const CENTER_X = WIDTH / 2;

/* Act 1 — the channels the guest shops on */
export const CHANNEL_LABEL_Y = 258;
export const CHANNEL_W = 300;
export const CHANNEL_H = 120;
export const CHANNEL_GAP = 36;
export const CHANNEL_Y = 500;
export const CONSTRAINT_Y = 720;

const CHANNEL_SPAN = 4 * CHANNEL_W + 3 * CHANNEL_GAP;
export const channelX = (index: number) =>
  (WIDTH - CHANNEL_SPAN) / 2 + CHANNEL_W / 2 + index * (CHANNEL_W + CHANNEL_GAP);

/* Act 2 — the five things the guest actually judges */
/** The headline opens centred, then docks to the top as the list header. */
export const HEAD_Y_OPEN = 520;
export const HEAD_Y_DOCKED = 208;
export const HEAD_SCALE_DOCKED = 0.84;

export const ROW_FIRST_Y = 380;
export const ROW_PITCH = 104;
export const ROW_LEFT_X = 620;
export const ROW_LABEL_X = 760;
export const ROW_RIGHT_X = 1300;

export const rowY = (index: number) => ROW_FIRST_Y + index * ROW_PITCH;

/* Act 3 — your listing, sitting in a wall of ten */
export const GRID_LABEL_Y = 200;
export const TILE_W = 260;
export const TILE_H = 160;
export const TILE_GAP_X = 28;
export const TILE_GAP_Y = 28;
export const GRID_COLS = 5;
export const GRID_ROW_Y = [470, 658];
export const GRID_CAPTION_Y = 850;
/** Top-row middle tile — the owner's own listing. */
export const YOURS_INDEX = 2;

const GRID_SPAN = GRID_COLS * TILE_W + (GRID_COLS - 1) * TILE_GAP_X;
export const tileX = (index: number) =>
  (WIDTH - GRID_SPAN) / 2 + TILE_W / 2 + (index % GRID_COLS) * (TILE_W + TILE_GAP_X);
export const tileY = (index: number) => GRID_ROW_Y[Math.floor(index / GRID_COLS)];

/* ------------------------------------------------------------------ *
 * Timing — frames keyed to the transcript timecodes (30fps)           *
 * ------------------------------------------------------------------ */

export const T = {
  // "so we go where the guest goes Airbnb VRBO" — 00:00:00:00
  // "Google Direct booking same dates" — 00:00:05:13
  channelLabelIn: 8,
  channelLabelDur: 26,
  channelDur: 28,
  constraintDur: 24,

  // "same market same group size" — 00:00:09:14
  stage1Out: 352,
  stage1OutDur: 26,

  // "and then we shop which listings catch your eye" — 00:00:12:11
  headIn: 378,
  headDur: 32,
  headDockStart: 486,
  headDockDur: 44,

  criteriaDur: 26,
  ruleDur: 22,

  stage2Out: 1000,
  stage2OutDur: 28,

  // "that is where owners get surprised" — 00:00:33:25
  gridLabelIn: 1025,
  gridLabelDur: 26,
  gridIn: 1040,
  gridStagger: 5,
  gridDur: 24,

  // "because you may think a property is amazing" — 00:00:36:15
  yoursIn: 1105,
  yoursDur: 26,

  // "but when you put it side by side with 10 homes" — 00:00:39:02
  equalizeStart: 1195,
  equalizeDur: 44,
  gridCaptionIn: 1212,
  gridCaptionDur: 26,

  stage3Out: 1262,
  stage3OutDur: 28,

  // "the guest that actually choosing from you" — 00:00:42:17
  // "may see the problem fast and that is good" — 00:00:45:13
  st1In: 1292,
  st1Dur: 32,
  st1SubIn: 1385,
  st1SubDur: 26,
  st1Out: 1462,
  st1OutDur: 26,

  // "because now you can fix it but don't get defensive" — 00:00:49:07
  st2In: 1490,
  st2Dur: 32,
  st2SubIn: 1540,
  st2SubDur: 26,

  end: DURATION_IN_FRAMES,
} as const;

/* ------------------------------------------------------------------ *
 * Content                                                             *
 * ------------------------------------------------------------------ */

export type Channel = { label: string; inStart: number };

/** Where the guest actually shops — named, never shown as brand logos. */
export const CHANNELS: Channel[] = [
  { label: "AIRBNB", inStart: 24 },
  { label: "VRBO", inStart: 84 },
  { label: "GOOGLE", inStart: 168 },
  { label: "DIRECT", inStart: 222 },
];

export type Constraint = { label: string; inStart: number };

/** The comparison is like-for-like — that is what makes it fair. */
export const CONSTRAINTS: Constraint[] = [
  { label: "SAME DATES", inStart: 236 }, // 00:00:05:13
  { label: "SAME MARKET", inStart: 292 }, // 00:00:09:14
  { label: "SAME GROUP SIZE", inStart: 330 },
];

export type Criterion = { index: string; label: string; inStart: number };

/** What the guest judges, in the order Emile says them. */
export const CRITERIA: Criterion[] = [
  { index: "01", label: "BETTER PHOTOS", inStart: 545 }, // 00:00:17:25
  { index: "02", label: "STRONGER REVIEWS", inStart: 685 }, // 00:00:22:19
  { index: "03", label: "BETTER LOCATION", inStart: 763 }, // 00:00:25:07
  { index: "04", label: "BETTER AMENITIES", inStart: 855 }, // 00:00:28:09
  { index: "05", label: "EASIER TO BOOK", inStart: 932 }, // 00:00:30:26
];

export const TILE_COUNT = 10;

export const CHANNEL_LABEL = "WHERE THE GUEST GOES";
export const HEAD_LABEL = "THE GUEST COMPARES";
export const HEAD_TEXT = "WHICH LISTINGS CATCH YOUR EYE?";
export const GRID_LABEL = "WHERE OWNERS GET SURPRISED";
export const YOURS_TEXT = "YOURS";
export const GRID_CAPTION = "SIDE BY SIDE WITH 10 HOMES";

export const ST1_LEAD = "THE GUEST SEES ";
export const ST1_KEY = "THE PROBLEM";
export const ST1_TAIL = " FIRST";
export const ST1_SUB = "AND THAT IS GOOD.";

export const ST2_LEAD = "NOW YOU CAN ";
export const ST2_KEY = "FIX IT";
export const ST2_SUB = "DON'T GET DEFENSIVE.";
