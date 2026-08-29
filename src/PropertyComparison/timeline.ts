export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const SHARED_STATS = ["5 BEDROOMS", "SLEEPS 12", "POOL", "NEAR BEACH"];

export const DIFFERENCES_A = [
  "Basic design",
  "Average photos",
  "Standard pool",
  "Limited outdoor space",
];

export const DIFFERENCES_B = [
  "Better design",
  "Professional photography",
  "Ocean / beach view",
  "Luxury pool",
  "Game room",
  "Premium outdoor space",
  "5-star reviews",
];

export const T = {
  cardsIn: 0,
  cardsInDur: 36,
  labelIn: 16,
  statStart: 58,
  statStep: 13,
  divergeStart: 168,
  aStep: 20,
  bStep: 16,
  holdDiffEnd: 340,
  bannerStart: 348,
  bannerDur: 26,
  fadeToFinalStart: 432,
  fadeToFinalDur: 32,
  finalLine1Start: 470,
  finalLine1Dur: 30,
  finalLine2Start: 552,
  finalLine2Dur: 32,
  end: 660,
} as const;

export const DURATION_IN_FRAMES = T.end;
