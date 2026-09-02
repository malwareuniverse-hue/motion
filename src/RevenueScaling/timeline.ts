export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 2700; // 90.00s at 30fps

/**
 * Frame timings are derived from the voiceover transcript (30fps):
 *   0:01 hook            0:12 more doors        0:20 the question
 *   0:26 30 -> 100       0:32 the "more" stack  0:47 harder vs. compounding
 *   0:57 VRMA            1:08 property-by-property -> enterprise
 *   1:20 CTA
 * Re-time here only — every component reads its beat from this file.
 */
export const T = {
  // HOOK — "Adding 50 more properties to a broken revenue system…"
  hookLine1In: 14,
  hookLine2In: 52,
  hookRuleIn: 92,
  hookVerdictIn: 178,
  hookMultiplyIn: 218,
  hookOut: 328,
  hookOutDur: 26,

  // MORE DOORS — creative text over B-roll
  doorsIn: 372,
  doorsSubIn: 424,
  doorsOut: 596,
  doorsOutDur: 26,

  // THE QUESTION — full-screen key statement
  questionIn: 606,
  questionLine2In: 638,
  questionOut: 752,
  questionOutDur: 26,

  // SCALE COUNTER — "going from 30 to 100 properties"
  counterIn: 782,
  counterRollStart: 818,
  counterRollEnd: 904,
  counterCaptionIn: 872,
  counterOut: 936,
  counterOutDur: 24,

  // THE "MORE" STACK
  stackLabelIn: 962,
  stackHeroIn: 1320,
  stackHeroDur: 34,
  stackRuleIn: 1300,
  stackOut: 1396,
  stackOutDur: 26,

  // WORK HARDER vs. A PROCESS THAT COMPOUNDS
  harderIn: 1420,
  harderDim: 1490,
  systemIn: 1536,
  systemCaptionIn: 1602,
  compareOut: 1682,
  compareOutDur: 26,

  // VRMA NASHVILLE event card
  eventIn: 1800,
  eventFrameIn: 1816,
  eventSubIn: 1848,
  eventOut: 1962,
  eventOutDur: 28,

  // PROPERTY BY PROPERTY -> ENTERPRISE SYSTEM
  shiftNodesIn: 2028,
  shiftLabelIn: 2050,
  shiftConvergeStart: 2140,
  shiftConvergeDur: 72,
  shiftFrameIn: 2196,
  shiftLabelSwap: 2238,
  shiftSubIn: 2296,
  shiftOut: 2374,
  shiftOutDur: 24,

  // CTA
  ctaKickerIn: 2404,
  ctaLockupIn: 2444,
  ctaRuleIn: 2478,
  ctaGrowthIn: 2514,
  ctaEventIn: 2562,

  // Brand system
  brandBugIn: 40,
  brandBugOut: 2386,
  lowerThirdIn: 1716,
  lowerThirdOut: 1826,
  lowerThirdOutDur: 18,

  end: DURATION_IN_FRAMES,
} as const;

/* ------------------------------------------------------------------ */
/* B-roll                                                              */
/* ------------------------------------------------------------------ */

export type BrollVariant = "portfolio" | "doors" | "skyline";

export type BrollSpec = {
  id: string;
  variant: BrollVariant;
  start: number;
  end: number;
  fadeIn: number;
  fadeOut: number;
  /** Scrim strength over the footage, 0-1. Higher = darker, more headroom for type. */
  scrim: number;
  /**
   * Drop the real clip into `public/` and set this to the filename — the layer
   * swaps from the procedural placeholder to <OffthreadVideo> automatically.
   */
  src?: string;
  /** Exact stock search phrases for the editor. */
  searchPhrases: string[];
};

export const BROLL: BrollSpec[] = [
  {
    id: "hook-portfolio",
    variant: "portfolio",
    start: 0,
    end: 356,
    fadeIn: 24,
    fadeOut: 28,
    scrim: 0.82,
    searchPhrases: [
      "aerial drone vacation rental neighborhood dusk",
      "modern short term rental exterior twilight warm windows",
      "luxury property portfolio architecture slow pan",
    ],
  },
  {
    id: "doors-portfolio",
    variant: "doors",
    start: 344,
    end: 652,
    fadeIn: 28,
    fadeOut: 28,
    scrim: 0.74,
    searchPhrases: [
      "hotel corridor doors warm lighting slow dolly",
      "vacation rental front door keyless entry close up",
      "hand unlocking smart lock rental property",
    ],
  },
  {
    id: "nashville-skyline",
    variant: "skyline",
    start: 1706,
    end: 2016,
    fadeIn: 30,
    fadeOut: 30,
    scrim: 0.72,
    searchPhrases: [
      "Nashville skyline blue hour aerial",
      "Nashville downtown evening cinematic drone",
      "hospitality conference expo hall professionals talking",
    ],
  },
  {
    id: "cta-portfolio",
    variant: "portfolio",
    start: 2384,
    end: DURATION_IN_FRAMES,
    fadeIn: 30,
    fadeOut: 0,
    scrim: 0.88,
    searchPhrases: [
      "business professionals meeting conference lobby warm light",
      "handshake hospitality conference networking",
      "Nashville skyline night slow aerial",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* The "more" stack                                                    */
/* ------------------------------------------------------------------ */

export type MoreCard = { text: string; col: number; row: number; in: number };

export const MORE_CARDS: MoreCard[] = [
  { text: "MORE MARKETS", col: 0, row: 0, in: 990 },
  { text: "MORE OWNERS", col: 1, row: 0, in: 1044 },
  { text: "MORE BOOKING WINDOWS", col: 2, row: 0, in: 1092 },
  { text: "MORE SEASONALITY", col: 0, row: 1, in: 1140 },
  { text: "MORE EXCEPTIONS", col: 1, row: 1, in: 1212 },
  { text: "MORE DATA", col: 2, row: 1, in: 1258 },
];

export const CARD_W = 484;
export const CARD_H = 96;
export const CARD_GAP = 34;
export const CARD_IN_DUR = 26;
export const GRID_LEFT = (WIDTH - (CARD_W * 3 + CARD_GAP * 2)) / 2;
export const GRID_TOP = 352;

export const cardX = (col: number) => GRID_LEFT + col * (CARD_W + CARD_GAP);
export const cardY = (row: number) => GRID_TOP + row * (CARD_H + CARD_GAP);

/* ------------------------------------------------------------------ */
/* Enterprise shift                                                    */
/* ------------------------------------------------------------------ */

export const SHIFT_NODE_COUNT = 12;
export const SHIFT_COLS = 4;
export const SHIFT_NODE = 150;
export const SHIFT_NODE_GAP = 44;
export const SHIFT_ROWS = SHIFT_NODE_COUNT / SHIFT_COLS;
export const SHIFT_GRID_W =
  SHIFT_COLS * SHIFT_NODE + (SHIFT_COLS - 1) * SHIFT_NODE_GAP;
export const SHIFT_GRID_H =
  SHIFT_ROWS * SHIFT_NODE + (SHIFT_ROWS - 1) * SHIFT_NODE_GAP;
export const SHIFT_CENTER_Y = 442;
export const SHIFT_GRID_LEFT = (WIDTH - SHIFT_GRID_W) / 2;
export const SHIFT_GRID_TOP = SHIFT_CENTER_Y - SHIFT_GRID_H / 2;
export const SHIFT_FRAME_PAD = 56;
