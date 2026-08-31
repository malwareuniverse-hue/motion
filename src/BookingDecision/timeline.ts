import { interpolate } from "remotion";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 780; // 26s

export const CARD_W = 460;
export const CARD_H = 580;
export const CARD_GAP = 48;
export const CARD_TOP = 260;

const TOTAL_W = CARD_W * 3 + CARD_GAP * 2;
export const CARDS_LEFT = (WIDTH - TOTAL_W) / 2;

export type OptionId = "A" | "B" | "C";

export type Option = {
  id: OptionId;
  title: string;
  tags: string[];
  accent: "amber" | "teal" | "slate";
  hue: [string, string];
  left: number;
};

export const OPTIONS: Option[] = [
  {
    id: "A",
    title: "OPTION A",
    tags: ["Luxury pool", "Great design", "Strong reviews"],
    accent: "amber",
    hue: ["#E3C081", "#B98A3B"],
    left: CARDS_LEFT,
  },
  {
    id: "B",
    title: "OPTION B",
    tags: ["Luxury outdoor space", "Hot tub", "Strong reviews"],
    accent: "teal",
    hue: ["#8FC4BA", "#3E7E71"],
    left: CARDS_LEFT + CARD_W + CARD_GAP,
  },
  {
    id: "C",
    title: "OPTION C",
    tags: ["Basic 5-bedroom", "No pool", "Average reviews"],
    accent: "slate",
    hue: ["#B7AFA0", "#7A6F5C"],
    left: CARDS_LEFT + (CARD_W + CARD_GAP) * 2,
  },
];

export const cardCenter = (opt: Option) => opt.left + CARD_W / 2;

export const cursorTarget = (opt: Option) => ({ x: opt.left + 360, y: CARD_TOP + 66 });

export const cursorBlend = (frame: number, easing: (t: number) => number) =>
  interpolate(
    frame,
    [
      0,
      T.moveAB1Start,
      T.moveAB1Start + T.moveAB1Dur,
      T.moveBA1Start,
      T.moveBA1Start + T.moveBA1Dur,
      T.moveAB2Start,
      T.moveAB2Start + T.moveAB2Dur,
      DURATION_IN_FRAMES,
    ],
    [0, 0, 1, 1, 0, 0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing },
  );

export const T = {
  headerStart: 0,
  headerDur: 26,

  cardsStart: 20,
  cardsStep: 20,
  cardsDur: 32,

  hold1End: 160,

  fadeCStart: 160,
  fadeCDur: 60,

  cursorInStart: 190,
  cursorInDur: 24,

  holdA1End: 260,
  moveAB1Start: 260,
  moveAB1Dur: 40,
  holdB1End: 360,
  moveBA1Start: 360,
  moveBA1Dur: 40,
  holdA2End: 450,
  moveAB2Start: 450,
  moveAB2Dur: 40,
  holdB2End: 580,

  toFinalStart: 580,
  toFinalDur: 30,

  line1Start: 618,
  line1Dur: 28,
  line2Start: 674,
  line2Dur: 30,

  end: DURATION_IN_FRAMES,
} as const;
