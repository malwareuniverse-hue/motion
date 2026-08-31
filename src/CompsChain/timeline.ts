export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 900; // 30s

export const CARD_W = 700;
export const CARD_H = 84;
export const ARROW_LEN = 56;
export const PITCH = CARD_H + ARROW_LEN;
export const SLOT0_Y = 260;

export const slotY = (slot: number) => SLOT0_Y + slot * PITCH;

export type ChainKind = "wrong" | "right";

export type ChainNodeSpec = {
  slot: number;
  text: string;
  kind: ChainKind;
  impact?: boolean;
  inStart: number;
  inDur: number;
  outStart?: number;
  outDur?: number;
};

export type ChainArrowSpec = {
  fromSlot: number;
  kind: ChainKind;
  drawStart: number;
  drawDur: number;
  retractStart?: number;
  retractDur?: number;
};

export const T = {
  pivotInStart: 20,
  pivotInDur: 30,

  wrongPriceIn: 72,
  wrongOccIn: 122,
  wrongRevIn: 172,
  lessMoneyIn: 222,
  nodeInDur: 28,

  arrowW1: 50,
  arrowW2: 100,
  arrowW3: 150,
  arrowW4: 200,
  arrowDrawDur: 22,

  hold1End: 340,

  lessMoneyOut: 340,
  arrowW4Retract: 364,
  wrongRevOut: 384,
  arrowW3Retract: 408,
  wrongOccOut: 428,
  arrowW2Retract: 452,
  wrongPriceOut: 472,
  arrowW1Retract: 496,
  nodeOutDur: 24,
  arrowRetractDur: 20,

  pivotFlipStart: 516,
  pivotFlipDur: 30,

  arrowR1: 546,
  betterPricingIn: 568,
  arrowR2: 596,
  betterStrategyIn: 618,
  arrowR3: 646,
  betterRevenueIn: 668,

  hold2End: 780,

  toFinalStart: 780,
  toFinalDur: 30,

  statementStart: 818,
  statementDur: 32,

  end: DURATION_IN_FRAMES,
} as const;

export const PIVOT_WRONG_TEXT = "WRONG COMPS";
export const PIVOT_RIGHT_TEXT = "RIGHT COMPS";

export const WRONG_NODES: ChainNodeSpec[] = [
  { slot: 1, text: "WRONG PRICE", kind: "wrong", inStart: T.wrongPriceIn, inDur: T.nodeInDur, outStart: T.wrongPriceOut, outDur: T.nodeOutDur },
  { slot: 2, text: "WRONG OCCUPANCY EXPECTATION", kind: "wrong", inStart: T.wrongOccIn, inDur: T.nodeInDur, outStart: T.wrongOccOut, outDur: T.nodeOutDur },
  { slot: 3, text: "WRONG REVENUE TARGET", kind: "wrong", inStart: T.wrongRevIn, inDur: T.nodeInDur, outStart: T.wrongRevOut, outDur: T.nodeOutDur },
  { slot: 4, text: "LESS MONEY", kind: "wrong", impact: true, inStart: T.lessMoneyIn, inDur: T.nodeInDur, outStart: T.lessMoneyOut, outDur: T.nodeOutDur },
];

export const RIGHT_NODES: ChainNodeSpec[] = [
  { slot: 1, text: "BETTER PRICING CONTEXT", kind: "right", inStart: T.betterPricingIn, inDur: T.nodeInDur },
  { slot: 2, text: "BETTER STRATEGY", kind: "right", inStart: T.betterStrategyIn, inDur: T.nodeInDur },
  { slot: 3, text: "BETTER REVENUE DECISIONS", kind: "right", impact: true, inStart: T.betterRevenueIn, inDur: T.nodeInDur + 4 },
];

export const WRONG_ARROWS: ChainArrowSpec[] = [
  { fromSlot: 0, kind: "wrong", drawStart: T.arrowW1, drawDur: T.arrowDrawDur, retractStart: T.arrowW1Retract, retractDur: T.arrowRetractDur },
  { fromSlot: 1, kind: "wrong", drawStart: T.arrowW2, drawDur: T.arrowDrawDur, retractStart: T.arrowW2Retract, retractDur: T.arrowRetractDur },
  { fromSlot: 2, kind: "wrong", drawStart: T.arrowW3, drawDur: T.arrowDrawDur, retractStart: T.arrowW3Retract, retractDur: T.arrowRetractDur },
  { fromSlot: 3, kind: "wrong", drawStart: T.arrowW4, drawDur: T.arrowDrawDur, retractStart: T.arrowW4Retract, retractDur: T.arrowRetractDur },
];

export const RIGHT_ARROWS: ChainArrowSpec[] = [
  { fromSlot: 0, kind: "right", drawStart: T.arrowR1, drawDur: T.arrowDrawDur },
  { fromSlot: 1, kind: "right", drawStart: T.arrowR2, drawDur: T.arrowDrawDur },
  { fromSlot: 2, kind: "right", drawStart: T.arrowR3, drawDur: T.arrowDrawDur },
];
