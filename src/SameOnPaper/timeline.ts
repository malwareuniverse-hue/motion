export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 960; // 32s

/* ------------------------------------------------------------------ *
 * Layout                                                              *
 * ------------------------------------------------------------------ */

export const SAFE_X = 96;
export const CENTER_X = WIDTH / 2;

export const CARD_W = 440;
export const CARD_H = 280;
export const CARD_LEFT_X = 560;
export const CARD_RIGHT_X = 1360;

/** Cards sit low while the two houses read as identical... */
export const CARD_Y_WIDE = 344;
/** ...then lift to make room for the difference column beneath House B. */
export const CARD_Y_TIGHT = 280;

export const TOP_LABEL_Y = 132;

/** Matched-spec rows, centred under both cards. */
export const SPEC_ROW_Y = 578;
export const SPEC_ROW_PITCH = 72;
export const SPEC_DOT_R = 4;
/** Clear space either side of the centred label, so no line ever touches it. */
export const SPEC_LABEL_PAD = 40;

export const PIVOT_Y = 620;

/** Difference chips stack down the right column, flush with House B's card. */
export const CHIP_W = CARD_W;
export const CHIP_H = 50;
export const CHIP_PITCH = 64;
/** Width of the gold spine the chips hang off. */
export const SPINE_W = 3;
export const CHIP_FIRST_Y = 460;
export const CHIP_X = CARD_RIGHT_X - CHIP_W / 2;

export const SPLIT_TOP = 158;
export const SPLIT_BOTTOM = 886;

/* ------------------------------------------------------------------ *
 * Timing — frames keyed to the transcript timecodes (30fps)           *
 * ------------------------------------------------------------------ */

export const T = {
  // "take two five bedroom beach houses" — 00:00:00:07
  labelIn: 4,
  labelDur: 26,
  cardsIn: 10,
  cardsInDur: 34,

  // matched specs: 5 bedrooms / pool / sleeps 12 / close to the beach
  specRowDur: 26,

  // "same thing no" — 00:00:09:24
  specRowsOut: 292,
  specRowsOutDur: 22,
  labelOut: 292,
  labelOutDur: 24,

  questionIn: 300,
  questionDur: 22,
  answerStart: 330,
  answerDur: 18,
  pivotOut: 366,
  pivotOutDur: 24,

  splitDraw: 342,
  splitDrawDur: 40,

  regroupStart: 350,
  regroupDur: 36,

  chipDur: 26,
  spineDur: 20,

  // "that house may be worth more to the guest" — 00:00:25:29
  stageOut: 786,
  stageOutDur: 34,
  ruleIn: 806,
  ruleDur: 30,
  headlineIn: 814,
  headlineDur: 30,

  // "and that matters" — 00:00:28:29
  subIn: 872,
  subDur: 28,

  end: DURATION_IN_FRAMES,
} as const;

/* ------------------------------------------------------------------ *
 * Content                                                             *
 * ------------------------------------------------------------------ */

export type SpecRow = {
  label: string;
  inStart: number;
};

/** Everything the two houses share — the reason they look interchangeable. */
export const SPEC_ROWS: SpecRow[] = [
  { label: "FIVE BEDROOMS", inStart: 40 }, // 00:00:00:07
  { label: "PRIVATE POOL", inStart: 118 }, // 00:00:03:18
  { label: "SLEEPS 12", inStart: 168 },
  { label: "CLOSE TO THE BEACH", inStart: 240 }, // 00:00:07:23
];

export type DifferenceChip = {
  label: string;
  inStart: number;
};

/** What actually separates them — revealed one at a time, in gold. */
export const DIFFERENCE_CHIPS: DifferenceChip[] = [
  { label: "BETTER DESIGN", inStart: 368 }, // 00:00:12:05
  { label: "BETTER PHOTOS", inStart: 477 }, // 00:00:15:27
  { label: "A BETTER VIEW", inStart: 532 },
  { label: "A BETTER POOL", inStart: 582 }, // 00:00:19:12
  { label: "A GAME ROOM", inStart: 634 },
  { label: "BETTER OUTDOOR SPACE", inStart: 681 }, // 00:00:22:21
  { label: "BETTER REVIEWS", inStart: 730 },
];

export const TOP_LABEL = "TWO BEACH HOUSES";
export const QUESTION_TEXT = "SAME THING?";
export const ANSWER_TEXT = "NO.";
export const HEADLINE_LEAD = "WORTH MORE";
export const HEADLINE_TAIL = " TO THE GUEST";
export const SUB_TEXT = "AND THAT MATTERS.";

export const specRowY = (index: number) => SPEC_ROW_Y + index * SPEC_ROW_PITCH;
export const chipY = (index: number) => CHIP_FIRST_Y + index * CHIP_PITCH;
