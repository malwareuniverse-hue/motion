import type { AccentColor } from "./theme";

// ---------------------------------------------------------------------------
// Vertical "reel" format — 9:16, short-form (Shorts / Reels / TikTok).
// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 600; // 20.00s at 30fps — adjust to the cut.

// ---------------------------------------------------------------------------
// Caption model.
//
// The reel is caption-driven, VOX / short-form style: one short phrase on
// screen at a time, with the currently-spoken word highlighted (karaoke) and
// key words locked to the brand accent colors. A line is one phrase; its words
// highlight evenly across [start, end).
// ---------------------------------------------------------------------------
export type CaptionWord = {
  text: string;
  accent?: AccentColor; // key word — always rendered in this accent color
};

export type CaptionLine = {
  words: CaptionWord[];
  start: number; // frame the phrase appears
  end: number; // frame the phrase leaves
};

// Small helper so the script below stays readable. Wrap a word in {teal:"..."}
// or {amber:"..."} to make it a key word.
type WordSpec = string | { teal: string } | { amber: string };
const w = (spec: WordSpec): CaptionWord => {
  if (typeof spec === "string") return { text: spec };
  if ("teal" in spec) return { text: spec.teal, accent: "teal" };
  return { text: spec.amber, accent: "amber" };
};
const line = (start: number, end: number, ...specs: WordSpec[]): CaptionLine => ({
  start,
  end,
  words: specs.map(w),
});

// ---------------------------------------------------------------------------
// PLACEHOLDER SCRIPT.
//
// These captions are sample copy so the composition previews and renders end
// to end. Replace CAPTION_LINES with the real voiceover once the script + audio
// are available — keep each line to ~3–6 words for short-form legibility, and
// re-time `start`/`end` (in frames) to the spoken word. Mark the key words with
// {teal:"..."} / {amber:"..."}; use amber sparingly, for the payoff word.
// ---------------------------------------------------------------------------
export const CAPTION_LINES: CaptionLine[] = [
  line(14, 78, "MORE", "BOOKINGS", "ISN'T", "THE", { teal: "GOAL" }),
  line(84, 150, "MORE", { amber: "REVENUE" }, "IS."),
  line(158, 232, "MOST", "OPERATORS", "PRICE", "OFF", "THE", { teal: "WRONG COMPS" }),
  line(240, 312, "SO", "THEY", "LEAVE", { amber: "MONEY" }, "ON", "THE", "TABLE"),
  line(320, 392, "AT", { teal: "PRICING BY MIRA" }),
  line(398, 470, "WE", "PRICE", "OFF", { teal: "REAL DEMAND" }, "—"),
  line(476, 540, "NOT", "A", { amber: "GUESS." }),
];

// Brand bug (top): fades in early, out before the end card takes over.
export const BRAND_BUG_IN = 8;

// Reel progress bar along the top edge.
export const PROGRESS_BAR_IN = 6;

// Lower-third name card.
export const LOWER_THIRD_START = 40;
export const LOWER_THIRD_HOLD = 120; // frames fully visible after entering
export const LOWER_THIRD_OUT_DUR = 16;

// End card lockup.
export const END_CARD_START = 548;
export const END_CARD_DUR = 26;
