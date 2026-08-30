export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 720; // 24s

export const CARD_WIDTH = 340;
export const CARD_GAP = 26;
export const CARD_STEP = CARD_WIDTH + CARD_GAP;
export const VIEWPORT_WIDTH = 1700;
export const MAX_SCROLL = CARD_STEP * 10 - CARD_GAP - VIEWPORT_WIDTH;

export type Amenity = "wifi" | "pool" | "hottub" | "kitchen" | "parking";

export type Listing = {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  amenities: Amenity[];
};

export const LISTINGS: Listing[] = [
  { title: "The Hillside Modern", location: "Asheville, NC", rating: 4.92, reviews: 128, price: 265, amenities: ["wifi", "pool", "kitchen"] },
  { title: "Cascade Creek Cabin", location: "Asheville, NC", rating: 4.76, reviews: 94, price: 189, amenities: ["wifi", "hottub", "parking"] },
  { title: "Blue Ridge Bungalow", location: "Asheville, NC", rating: 4.88, reviews: 156, price: 310, amenities: ["wifi", "pool", "parking"] },
  { title: "Riverside Loft", location: "Asheville, NC", rating: 4.65, reviews: 61, price: 210, amenities: ["wifi", "kitchen", "parking"] },
  { title: "Maple Hollow House", location: "Asheville, NC", rating: 4.95, reviews: 203, price: 345, amenities: ["wifi", "hottub", "kitchen"] },
  { title: "Summit View Retreat", location: "Asheville, NC", rating: 4.70, reviews: 48, price: 250, amenities: ["wifi", "pool", "kitchen"] },
  { title: "Cedar & Stone Cottage", location: "Asheville, NC", rating: 4.97, reviews: 241, price: 298, amenities: ["wifi", "hottub", "pool"] },
  { title: "The Orchard House", location: "Asheville, NC", rating: 4.55, reviews: 37, price: 175, amenities: ["wifi", "parking"] },
  { title: "Willow Creek Farmhouse", location: "Asheville, NC", rating: 4.90, reviews: 172, price: 282, amenities: ["wifi", "kitchen", "hottub"] },
  { title: "Skyline Terrace Loft", location: "Asheville, NC", rating: 4.83, reviews: 110, price: 320, amenities: ["wifi", "pool", "parking"] },
];

export const WINNER_INDICES = [6, 7, 8];

export type ScanTarget = "photo" | "reviews" | "location" | "amenities" | "design" | "price" | "value";

export type ScanBeat = {
  label: string;
  target: ScanTarget;
  cardIndex: number;
  start: number;
  end: number;
};

const BEAT_DUR = 46;
const SCAN_START = 76;

const beat = (i: number, label: string, target: ScanTarget, cardIndex: number): ScanBeat => ({
  label,
  target,
  cardIndex,
  start: SCAN_START + i * BEAT_DUR,
  end: SCAN_START + (i + 1) * BEAT_DUR,
});

export const SCAN_BEATS: ScanBeat[] = [
  beat(0, "PHOTOS", "photo", 0),
  beat(1, "REVIEWS", "reviews", 1),
  beat(2, "LOCATION", "location", 2),
  beat(3, "AMENITIES", "amenities", 3),
  beat(4, "DESIGN", "design", 4),
  beat(5, "PRICE", "price", 5),
  beat(6, "OVERALL VALUE", "value", 6),
];

export const SCAN_START_FRAME = SCAN_START;
export const SCAN_END_FRAME = SCAN_BEATS[SCAN_BEATS.length - 1].end;

export const T = {
  chromeInStart: 0,
  chromeInDur: 20,
  searchFieldStart: 16,
  searchFieldStep: 14,
  cardsRevealStart: 40,
  cardsRevealDur: 30,

  scanStart: SCAN_START_FRAME,
  scanEnd: SCAN_END_FRAME,

  winnersStart: SCAN_END_FRAME,
  winnersStep: 24,

  holdEnd: 522,

  fadeUiStart: 528,
  fadeUiDur: 34,

  statementInStart: 556,
  statementInDur: 30,

  line1Start: 596,
  line1Dur: 28,
  line2Start: 660,
  line2Dur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const scrollForCard = (cardIndex: number) =>
  Math.min(MAX_SCROLL, Math.max(0, cardIndex * CARD_STEP - 140));

const PAN_DUR = 14;

export const computeScrollX = (frame: number) => {
  const first = SCAN_BEATS[0];
  const last = SCAN_BEATS[SCAN_BEATS.length - 1];
  if (frame <= first.start) return 0;
  if (frame >= last.end) return scrollForCard(last.cardIndex);

  const idx = SCAN_BEATS.findIndex((b) => frame >= b.start && frame < b.end);
  const beat = SCAN_BEATS[idx === -1 ? SCAN_BEATS.length - 1 : idx];
  const target = scrollForCard(beat.cardIndex);
  const prevTarget = idx > 0 ? scrollForCard(SCAN_BEATS[idx - 1].cardIndex) : 0;
  const panEnd = beat.start + PAN_DUR;
  if (frame >= panEnd) return target;

  const t = (frame - beat.start) / PAN_DUR;
  const eased = t * t * (3 - 2 * t); // smoothstep
  return prevTarget + (target - prevTarget) * eased;
};
