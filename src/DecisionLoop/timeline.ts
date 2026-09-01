export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 700; // ~23.3s

export const CX = WIDTH / 2;
export const CY = 560;
export const R = 340;
export const MARGIN_DEG = 15;
export const NODE_W = 300;
export const NODE_H = 82;

const toRad = (deg: number) => (deg * Math.PI) / 180;

// Index 0..5 walk clockwise around the loop starting at 12 o'clock; index 5
// lands back on index 0's position, which lets arc math stay a plain formula.
export const angleDeg = (i: number) => -90 + i * 72;

export const posAt = (i: number, radius: number = R) => {
  const rad = toRad(angleDeg(i));
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
};

export type LoopNodeSpec = {
  index: number;
  text: string;
  emphasis?: boolean;
  inStart: number;
  inDur: number;
};

export type LoopArcSpec = {
  fromIndex: number;
  drawStart: number;
  drawDur: number;
};

export const T = {
  ringInStart: 10,
  ringInDur: 34,

  node0In: 40,
  arc0: 74,
  node1In: 108,
  arc1: 142,
  node2In: 176,
  arc2: 210,
  node3In: 244,
  arc3: 278,
  node4In: 312,
  arc4: 346,

  nodeInDur: 26,
  arcDrawDur: 26,

  loopCloseEnd: 372,

  pulseStart: 388,
  pulseDur: 70,

  holdEnd: 470,

  toFinalStart: 470,
  toFinalDur: 30,

  statementStart: 510,
  statementDur: 32,

  end: DURATION_IN_FRAMES,
} as const;

export const NODES: LoopNodeSpec[] = [
  { index: 0, text: "DECISION", inStart: T.node0In, inDur: T.nodeInDur },
  { index: 1, text: "BOOKING", inStart: T.node1In, inDur: T.nodeInDur },
  { index: 2, text: "ASSESSMENT", inStart: T.node2In, inDur: T.nodeInDur },
  { index: 3, text: "LEARNING", inStart: T.node3In, inDur: T.nodeInDur },
  { index: 4, text: "NEXT DECISION", emphasis: true, inStart: T.node4In, inDur: T.nodeInDur },
];

export const ARCS: LoopArcSpec[] = [
  { fromIndex: 0, drawStart: T.arc0, drawDur: T.arcDrawDur },
  { fromIndex: 1, drawStart: T.arc1, drawDur: T.arcDrawDur },
  { fromIndex: 2, drawStart: T.arc2, drawDur: T.arcDrawDur },
  { fromIndex: 3, drawStart: T.arc3, drawDur: T.arcDrawDur },
  { fromIndex: 4, drawStart: T.arc4, drawDur: T.arcDrawDur },
];
