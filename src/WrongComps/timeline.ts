export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 900; // 30s

export const MAP_W = 1500;
export const MAP_H = 760;

export type Tier = "luxury" | "basic" | "mid";

export type CardDir = "left" | "right" | "down";

export type House = {
  id: string;
  label: string;
  tier: Tier;
  tags: string[];
  x: number;
  y: number;
  cardDir: CardDir;
};

export const HOUSES: House[] = [
  {
    id: "A",
    label: "House A",
    tier: "luxury",
    tags: ["Pool", "Hot tub", "Great design", "Sleeps 12", "5-star reviews"],
    x: 660,
    y: 290,
    cardDir: "left",
  },
  {
    id: "B",
    label: "House B",
    tier: "basic",
    tags: ["No pool", "No hot tub", "Standard design", "Sleeps 10"],
    x: 855,
    y: 335,
    cardDir: "right",
  },
  {
    id: "C",
    label: "House C",
    tier: "mid",
    tags: ["Pool", "Average design", "Sleeps 8"],
    x: 735,
    y: 410,
    cardDir: "down",
  },
];

export const RADIUS_CENTER = { x: 750, y: 345 };
export const RADIUS_R = 158;

export type DistantComp = {
  address: string;
  x: number;
  y: number;
};

export const DISTANT_COMPS: DistantComp[] = [
  { address: "412 Ridgeline Dr", x: 150, y: 110 },
  { address: "88 Sunset Bluff", x: 1320, y: 90 },
  { address: "27 Highland Reserve", x: 1280, y: 640 },
  { address: "6 Golden Vista Way", x: 170, y: 660 },
];

export const T = {
  titleIn: 0,
  titleInDur: 26,
  titleHoldEnd: 70,
  titleOutDur: 30, // title recedes to kicker; map fades in over the same window
  mapKickerAt: 100,

  pinStart: 96,
  pinStep: 22,
  pinDur: 26,
  cardOffset: 20, // card fades in this many frames after its pin starts

  hold1End: 300,

  radiusStart: 300,
  radiusDur: 46,

  assumptionStart: 356,
  assumptionDur: 26,
  hold2End: 452,

  strikeStart: 452,
  strikeDur: 26,
  hold3End: 494,

  flipStart: 500,
  flipDur: 30,
  hold4End: 566,

  clearStart: 572,
  clearDur: 30,

  focusStart: 572,
  focusDur: 34,

  compStart: 612,
  compStep: 24,
  compDur: 30,

  hold5End: 806,

  toFinalStart: 806,
  toFinalDur: 30,

  finalStart: 846,
  finalDur: 32,

  end: DURATION_IN_FRAMES,
} as const;
