export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 450; // 15s

export const CENTER_X = WIDTH / 2;

/** Side gutter. Vertical crops are watched with UI over the extreme edges. */
export const SAFE_X = 70;
/** Headline and statement wrap width. */
export const TEXT_MAX_W = 920;

/* ------------------------------------------------------------------ *
 * Layout                                                              *
 * ------------------------------------------------------------------ */

/** The setup line opens centred, then docks above the checklist. */
export const HEAD_Y_OPEN = 860;
export const HEAD_Y_DOCKED = 545;
export const HEAD_SCALE_DOCKED = 0.84;

export const BOX_SIZE = 58;
export const BOX_RADIUS = 7;
/** Left edge of the list block, chosen so the widest row sits centred. */
export const LIST_X = 240;
export const LABEL_GAP = 30;
export const ROW_FIRST_Y = 800;
export const ROW_PITCH = 170;

export const rowY = (index: number) => ROW_FIRST_Y + index * ROW_PITCH;

export const VERDICT_Y = 1330;

/* ------------------------------------------------------------------ *
 * Timing — frames keyed to the transcript timecodes (30fps)           *
 * ------------------------------------------------------------------ */

export const T = {
  // "most owners pick comps like this" — 00:00:00:11
  headIn: 18,
  headDur: 32,
  dockStart: 96,
  dockDur: 42,

  rowDur: 26,
  /** The gold tick draws on after its row has landed. */
  tickDelay: 12,
  tickDur: 22,

  // "good enough no" — 00:00:10:18
  questionIn: 326,
  questionDur: 26,
  answerStart: 362,
  answerDur: 20,
  /** On "no", the ticks fall back to muted — they never proved anything. */
  ticksFade: 362,
  ticksFadeDur: 28,

  end: DURATION_IN_FRAMES,
} as const;

/* ------------------------------------------------------------------ *
 * Content                                                             *
 * ------------------------------------------------------------------ */

export type ChecklistItem = { label: string; inStart: number };

/** The three boxes owners tick before calling something a comp. */
export const ITEMS: ChecklistItem[] = [
  { label: "SAME BEDROOM COUNT", inStart: 100 }, // 00:00:03:05
  { label: "SAME TOWN", inStart: 168 }, // 00:00:05:13
  { label: "GEOGRAPHICALLY CLOSE", inStart: 230 }, // 00:00:07:14
];

export const HEAD_TEXT = "MOST OWNERS PICK\nCOMPS LIKE THIS";
export const QUESTION_TEXT = "GOOD ENOUGH?";
export const ANSWER_TEXT = "NO.";
