export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 640; // ~21.3s

export const CARD_W = 760;
export const CARD_H = 92;
export const ARROW_LEN = 58;
export const PITCH = CARD_H + ARROW_LEN;
export const SLOT0_Y = 300;

export const slotY = (slot: number) => SLOT0_Y + slot * PITCH;

export type ChainNodeSpec = {
  slot: number;
  text: string;
  impact?: boolean;
  inStart: number;
  inDur: number;
};

export type ChainArrowSpec = {
  fromSlot: number;
  drawStart: number;
  drawDur: number;
};

export const T = {
  node0In: 34,
  nodeInDur: 28,

  arrow1: 78,
  node1In: 122,

  arrow2: 166,
  node2In: 210,

  arrow3: 254,
  node3In: 300,
  node3InDur: 32,

  arrowDrawDur: 22,

  holdEnd: 400,

  toFinalStart: 400,
  toFinalDur: 30,

  statementStart: 440,
  statementDur: 32,

  end: DURATION_IN_FRAMES,
} as const;

export const NODES: ChainNodeSpec[] = [
  { slot: 0, text: "INFORMATION", inStart: T.node0In, inDur: T.nodeInDur },
  { slot: 1, text: "INTERPRETATION", inStart: T.node1In, inDur: T.nodeInDur },
  { slot: 2, text: "DECISIONS", inStart: T.node2In, inDur: T.nodeInDur },
  { slot: 3, text: "REVENUE", impact: true, inStart: T.node3In, inDur: T.node3InDur },
];

export const ARROWS: ChainArrowSpec[] = [
  { fromSlot: 0, drawStart: T.arrow1, drawDur: T.arrowDrawDur },
  { fromSlot: 1, drawStart: T.arrow2, drawDur: T.arrowDrawDur },
  { fromSlot: 2, drawStart: T.arrow3, drawDur: T.arrowDrawDur },
];
