// ---------------------------------------------------------------------------
// Vertical "reel" format — 9:16, short-form (Shorts / Reels / TikTok).
//
// Timed to the VRMA Nashville voiceover in public/vo.mp3 (~80.6s of speech).
// Beat frames were aligned to the phrase boundaries detected in that audio
// (energy-based VAD), not the looser transcript timestamps. The spoken VO ends
// at "...with the Pricing By Mira team"; the closing VRMA CTA card holds as a
// short silent outro after that.
// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 2520; // 84s: ~80.6s VO + ~3.4s CTA outro

// Voiceover.
export const AUDIO_SRC = "vo.mp3";

// ---------------------------------------------------------------------------
// Caption model — VOX / short-form: one short phrase on screen at a time, with
// the currently-spoken word highlighted (karaoke) and key words locked to gold.
// ---------------------------------------------------------------------------
export type CaptionWord = {
  text: string;
  key?: boolean; // key word — always rendered in warm gold
};

export type CaptionLine = {
  words: CaptionWord[];
  start: number;
  end: number;
};

type WordSpec = string | { gold: string };
const w = (spec: WordSpec): CaptionWord =>
  typeof spec === "string" ? { text: spec } : { text: spec.gold, key: true };
const line = (start: number, end: number, ...specs: WordSpec[]): CaptionLine => ({
  start,
  end,
  words: specs.map(w),
});

// Captions run only where a graphic beat is NOT already carrying the words
// (growth stats, fragment list, framework, and statement cards are self-titled).
export const CAPTION_LINES: CaptionLine[] = [
  // seg1 0.5–7.3s  "If you want to double your property management company,
  //                 but your revenue strategy still lives inside one person's head,"
  line(18, 76, "IF", "YOU", "WANT", "TO", { gold: "DOUBLE" }),
  line(80, 132, "YOUR", { gold: "MANAGEMENT COMPANY" }),
  line(136, 180, "BUT", "YOUR", { gold: "REVENUE STRATEGY" }),
  line(184, 226, "LIVES", "IN", "ONE", { gold: "PERSON'S HEAD" }),
  // seg2 7.9–9.3s  "you don't have a revenue system."
  line(236, 296, "YOU", "DON'T", "HAVE", "A", { gold: "REVENUE SYSTEM" }),
  // seg3/seg4 → growth stats carry "30 → 75" and "100 → 250"
  // seg5 16.4–18.8s  "But here's what happens."
  line(490, 566, "BUT", "HERE'S", { gold: "WHAT HAPPENS" }),
  // seg6 19.3–22.8s  "As property management companies grow,"
  line(576, 684, "AS", "COMPANIES", { gold: "GROW" }),
  // seg7 23.8–26.2s  "the systems that worked when we're small start to break."
  line(710, 788, "OLD", "SYSTEMS", "START", "TO", { gold: "BREAK" }),
  // seg8–14 → fragmented-systems graphic carries this stretch + the gap reveal
  // seg14 → gap statement card carries "That's the gap we're solving..."
  // seg15/16 49.2–51.0s  "Not just dynamic pricing."
  line(1476, 1534, "NOT", "JUST", { gold: "DYNAMIC PRICING" }),
  // seg17–22 → six-pillar framework carries the pillars
  // seg23 67.6–69.6s  "Because if you're serious"
  line(2030, 2098, "IF", "YOU'RE", { gold: "SERIOUS" }),
  // seg24 70.0–71.4s  "about becoming dominant operator in your market,"
  line(2102, 2150, "THE", { gold: "DOMINANT OPERATOR" }),
  // seg25 71.8–73.9s  "revenue management can't just be another task."
  line(2154, 2224, "IT", "CAN'T", "BE", "JUST", { gold: "ANOTHER TASK" }),
  // seg26/27 → "growth infrastructure" statement card
  // seg28 77.2–78.3s  "I'll be at VRMA Nashville"
  line(2312, 2360, "I'LL", "BE", "AT", { gold: "VRMA NASHVILLE" }),
  // seg29 78.8–80.6s  "with the Pricing By Mira team."
  line(2366, 2418, "WITH", "THE", { gold: "PBM" }, "TEAM"),
];

// ---------------------------------------------------------------------------
// Graphic beats (start/end in frames), synced to the detected speech.
// ---------------------------------------------------------------------------
export const GROWTH_1 = { start: 296, end: 400, from: "30", to: "75" }; // seg3
export const GROWTH_2 = { start: 404, end: 480, from: "100", to: "250" }; // seg4

export const FRAGMENT = { start: 800, end: 1360 }; // seg8–13
export type FragmentRow = { rel: number; owner: string; job: string };
export const FRAGMENT_ROWS: FragmentRow[] = [
  { rel: 12, owner: "ONE PERSON", job: "PRICING STRATEGY" }, // seg8 f812
  { rel: 72, owner: "SOMEONE ELSE", job: "WATCHING THE MARKET" }, // seg9 f872
  { rel: 163, owner: "SOFTWARE", job: "MAKING RECOMMENDATIONS" }, // seg10 f963
  { rel: 265, owner: "OWNERS", job: "ASKING WHY IT CHANGED" }, // seg11 f1065
];
export const FRAGMENT_GAP_REL = 423; // seg12 f1223 "no single view of the portfolio"

export const GAP_STATEMENT = { start: 1362, end: 1466 }; // seg14

export const FRAMEWORK = { start: 1540, end: 2018 }; // seg17–22
export type Pillar = { rel: number; text: string };
export const PILLARS: Pillar[] = [
  { rel: 60, text: "MARKET INTELLIGENCE" }, // f1600
  { rel: 105, text: "BOOKING BEHAVIOR" }, // f1645
  { rel: 171, text: "FORECASTING" }, // f1711
  { rel: 230, text: "PORTFOLIO PERFORMANCE" }, // f1770
  { rel: 286, text: "OWNER COMMUNICATION" }, // f1826
  { rel: 400, text: "HUMAN DECISION-MAKING" }, // f1940
];

export const INFRA_STATEMENT = { start: 2228, end: 2310 }; // seg26/27

export const VRMA_CTA = { start: 2412, end: DURATION_IN_FRAMES }; // silent outro

// ---------------------------------------------------------------------------
// B-roll windows — placeholder slots the editor swaps for real footage.
// ---------------------------------------------------------------------------
export type BrollWindow = { start: number; end: number; label: string };
export const BROLL_WINDOWS: BrollWindow[] = [
  { start: 14, end: 232, label: "OPERATOR REVIEWING PORTFOLIO · PROPERTY EXTERIORS" },
  { start: 2300, end: 2418, label: "VRMA NASHVILLE · CONFERENCE FLOOR · SKYLINE" },
];

// Persistent brand elements.
export const BRAND_BUG_IN = 8;
export const PROGRESS_BAR_IN = 6;
export const LOWER_THIRD_START = 60;
export const LOWER_THIRD_HOLD = 110;
export const LOWER_THIRD_OUT_DUR = 16;

// The brand bug hides once the first full-frame graphic card takes over.
export const BRAND_BUG_OUT = GAP_STATEMENT.start;
