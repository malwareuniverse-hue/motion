export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 780; // 26s

export type Property = {
  address: string;
  city: string;
  rating: number;
  beds: number;
  pool: boolean;
  price: number;
  score: number;
};

export const PROPERTIES: Property[] = [
  { address: "118 Birchwood Ln", city: "Asheville, NC", rating: 4.86, beds: 3, pool: true, price: 245, score: 91 },
  { address: "42 Laurel Ridge Ct", city: "Asheville, NC", rating: 4.72, beds: 4, pool: false, price: 210, score: 84 },
  { address: "305 Cascade Ave", city: "Asheville, NC", rating: 4.90, beds: 3, pool: true, price: 268, score: 95 },
  { address: "76 Hollow Creek Rd", city: "Asheville, NC", rating: 4.65, beds: 2, pool: false, price: 175, score: 82 },
  { address: "210 Maple Hill Dr", city: "Asheville, NC", rating: 4.79, beds: 4, pool: true, price: 290, score: 88 },
  { address: "19 Summit Pass", city: "Asheville, NC", rating: 4.83, beds: 3, pool: false, price: 225, score: 86 },
  { address: "88 Orchard View Way", city: "Asheville, NC", rating: 4.34, beds: 3, pool: false, price: 310, score: 54 },
  { address: "154 Cedarbrook Ln", city: "Asheville, NC", rating: 4.91, beds: 4, pool: true, price: 295, score: 93 },
  { address: "63 Riverbend Trl", city: "Asheville, NC", rating: 4.70, beds: 2, pool: true, price: 198, score: 85 },
  { address: "297 Skyline Terrace", city: "Asheville, NC", rating: 4.88, beds: 3, pool: true, price: 272, score: 90 },
];

export const HIGHLIGHT_INDEX = 6; // "88 Orchard View Way" — the problem listing

const others = PROPERTIES.filter((_, i) => i !== HIGHLIGHT_INDEX);
export const MARKET_AVG_SCORE = Math.round(others.reduce((s, p) => s + p.score, 0) / others.length);
export const MARKET_AVG_PRICE = Math.round(others.reduce((s, p) => s + p.price, 0) / others.length);

export const GRID_COLS = 5;
export const CARD_W = 328;
export const CARD_H = 196;
export const CARD_GAP = 24;

export const GRID_W = GRID_COLS * CARD_W + (GRID_COLS - 1) * CARD_GAP;
export const GRID_ROWS = Math.ceil(PROPERTIES.length / GRID_COLS);
export const GRID_H = GRID_ROWS * CARD_H + (GRID_ROWS - 1) * CARD_GAP;

export const cardOrigin = (index: number) => {
  const row = Math.floor(index / GRID_COLS);
  const col = index % GRID_COLS;
  const cx = col * (CARD_W + CARD_GAP) + CARD_W / 2;
  const cy = row * (CARD_H + CARD_GAP) + CARD_H / 2;
  return { cx, col, row, originXPct: (cx / GRID_W) * 100, originYPct: (cy / GRID_H) * 100 };
};

export const T = {
  headerStart: 0,
  headerDur: 26,

  gridStart: 24,
  gridStep: 9,
  gridCardDur: 26,

  hold1End: 220,

  highlightStart: 220,
  highlightDur: 34,
  highlightHoldEnd: 300,

  zoomStart: 300,
  zoomDur: 56,
  zoomHoldEnd: 410,

  calloutStart: 330,
  calloutDur: 30,
  calloutFadeOutStart: 404,
  calloutFadeOutDur: 20,

  seq1Start: 424,
  seq1HoldEnd: 494,
  seq1ExitDur: 18,

  seq2Start: 512,
  seq2HoldEnd: 576,
  seq2ExitDur: 18,

  seq3Start: 594,
  seq3In: 30,

  end: DURATION_IN_FRAMES,
} as const;
