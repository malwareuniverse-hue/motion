// ---------------------------------------------------------------------------
// Vertical "reel" format — 9:16, short-form (Shorts / Reels / TikTok).
// Timed to the VRMA Nashville talking-head script. Segment start frames follow
// the transcript timestamps (30fps); word-level timing within a segment is
// estimated and should be nudged once the real voiceover audio is dropped in.
// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 2760; // ~92s at 30fps

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

// Captions run only where a graphic beat is NOT already carrying the words.
// (During the growth stats, fragment list, framework, and statement cards the
// on-screen graphic is the text, so no caption line is defined there.)
export const CAPTION_LINES: CaptionLine[] = [
  // 0:01 – 0:05  "If you want to double your property management company,"
  line(34, 100, "IF", "YOU", "WANT", "TO", { gold: "DOUBLE" }),
  line(104, 150, "YOUR", "MANAGEMENT", "COMPANY"),
  // 0:05 – 0:14  "but your revenue strategy still lives inside one person's head,
  //              you don't have a revenue system."
  line(156, 214, "BUT", "YOUR", { gold: "REVENUE STRATEGY" }),
  line(218, 286, "LIVES", "IN", "ONE", { gold: "PERSON'S HEAD" }),
  line(292, 356, "YOU", "DON'T", "HAVE"),
  line(360, 418, "A", { gold: "REVENUE SYSTEM" }),
  // 0:14 – 0:22  growth stats carry these (30 -> 75, 100 -> 250)
  line(640, 700, "BUT", "HERE'S", { gold: "WHAT HAPPENS" }),
  // 0:22 – 0:27  "As property management companies grow, the systems that
  //              worked when we're small start to break."
  line(704, 762, "AS", "COMPANIES", { gold: "GROW" }),
  line(766, 810, "OLD", "SYSTEMS", "START", "TO", { gold: "BREAK" }),
  // 0:27 – 0:49  fragmented-systems graphic carries this stretch
  // 0:49 – 0:54  gap statement card carries this
  // 0:54  "Not just dynamic pricing."
  line(1624, 1688, "NOT", "JUST", { gold: "DYNAMIC PRICING" }),
  // 0:54 – 1:05  six-pillar framework carries the pillars
  // 1:07 – 1:12  "Because if you're serious about becoming dominant operator..."
  line(2014, 2080, "IF", "YOU'RE", { gold: "SERIOUS" }),
  line(2084, 2150, "ABOUT", "BEING", "THE", { gold: "DOMINANT OPERATOR" }),
  // 1:12  "revenue management can't just be another task."
  line(2164, 2230, "IT", "CAN'T", "BE", "JUST", { gold: "ANOTHER TASK" }),
  // 1:12 – 1:17  "growth infrastructure" statement card carries this
  // 1:17 – 1:21  "I'll be at VRMA Nashville with the Pricing By Mira team."
  line(2346, 2412, "I'LL", "BE", "AT", { gold: "VRMA NASHVILLE" }),
  line(2416, 2470, "WITH", "THE", { gold: "PBM" }, "TEAM"),
  // 1:21 – end  "If you're building the next version of your company,
  //             I want to meet you." → then the CTA card takes over.
  line(2474, 2540, "BUILDING", "YOUR", { gold: "NEXT VERSION" }, "?"),
  // (VRMA CTA card carries "Book 20 minutes / bring your biggest bottleneck")
];

// ---------------------------------------------------------------------------
// Graphic beats (start/end in frames).
// ---------------------------------------------------------------------------
export const GROWTH_1 = { start: 424, end: 540, from: "30", to: "75" };
export const GROWTH_2 = { start: 540, end: 636, from: "100", to: "250" };

export const FRAGMENT = { start: 812, end: 1470 };
export type FragmentRow = { rel: number; owner: string; job: string };
export const FRAGMENT_ROWS: FragmentRow[] = [
  { rel: 12, owner: "ONE PERSON", job: "PRICING STRATEGY" },
  { rel: 100, owner: "SOMEONE ELSE", job: "WATCHING THE MARKET" },
  { rel: 190, owner: "SOFTWARE", job: "MAKING RECOMMENDATIONS" },
  { rel: 302, owner: "OWNERS", job: "ASKING WHY IT CHANGED" },
];
export const FRAGMENT_GAP_REL = 478; // "no single view of the portfolio"

export const GAP_STATEMENT = { start: 1474, end: 1618 };

export const FRAMEWORK = { start: 1692, end: 1986 };
export type Pillar = { rel: number; text: string };
export const PILLARS: Pillar[] = [
  { rel: 16, text: "MARKET INTELLIGENCE" },
  { rel: 58, text: "BOOKING BEHAVIOR" },
  { rel: 100, text: "FORECASTING" },
  { rel: 142, text: "PORTFOLIO PERFORMANCE" },
  { rel: 184, text: "OWNER COMMUNICATION" },
  { rel: 226, text: "HUMAN DECISION-MAKING" },
];

export const INFRA_STATEMENT = { start: 2236, end: 2340 };

export const VRMA_CTA = { start: 2560, end: DURATION_IN_FRAMES };

// ---------------------------------------------------------------------------
// B-roll windows — placeholder slots the editor swaps for real footage.
// Captions/graphics layer on top; see BrollSlot.tsx + the shot list in the PR.
// ---------------------------------------------------------------------------
export type BrollWindow = { start: number; end: number; label: string };
export const BROLL_WINDOWS: BrollWindow[] = [
  { start: 30, end: 150, label: "OPERATOR REVIEWING PORTFOLIO · PROPERTY EXTERIORS" },
  { start: 2312, end: 2520, label: "VRMA NASHVILLE · CONFERENCE FLOOR · SKYLINE" },
];

// Persistent brand elements.
export const BRAND_BUG_IN = 8;
export const PROGRESS_BAR_IN = 6;
export const LOWER_THIRD_START = 40;
export const LOWER_THIRD_HOLD = 120;
export const LOWER_THIRD_OUT_DUR = 16;

// The brand bug hides while full-frame graphic cards own the screen.
export const BRAND_BUG_OUT = GAP_STATEMENT.start; // first full-frame takeover
