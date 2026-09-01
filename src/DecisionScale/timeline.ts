import { interpolate } from "remotion";
import { buildStepRamp } from "./utils";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 680; // ~22.7s

export const PIVOT = { x: 960, y: 420 };
export const BEAM_HALF = 310;
export const MAX_TILT = 0.046; // radians, ~2.6deg

export const PAN_DROP = 100;
export const PAN_W = 190;
export const TILE_W = 190;
export const TILE_H = 58;
export const TILE_GAP = 10;

export const GAUGE_CENTER = { x: PIVOT.x + BEAM_HALF, y: PIVOT.y + 230 };
export const GAUGE_R = 150;
export const NEEDLE_START_DEG = -150;
export const NEEDLE_END_DEG = -30;
export const TICK_ANGLES = [-150, -120, -90, -60, -30];

export const beamEnds = (tilt: number) => {
  const theta = -tilt;
  const left = {
    x: PIVOT.x - BEAM_HALF * Math.cos(theta),
    y: PIVOT.y - BEAM_HALF * Math.sin(theta),
  };
  const right = {
    x: PIVOT.x + BEAM_HALF * Math.cos(theta),
    y: PIVOT.y + BEAM_HALF * Math.sin(theta),
  };
  return { left, right };
};

export type TileSpec = {
  index: number;
  inStart: number;
  inDur: number;
};

export const T = {
  rigInStart: 10,
  rigInDur: 34,

  labelStart: 56,
  labelDur: 26,

  tile1In: 96,
  tile2In: 180,
  tile3In: 264,
  tile4In: 348,
  tileInDur: 30,
  rampDur: 26,
  rampOffset: 15,

  holdEnd: 460,

  toFinalStart: 460,
  toFinalDur: 30,

  statementStart: 500,
  statementDur: 32,

  end: DURATION_IN_FRAMES,
} as const;

export const TILES: TileSpec[] = [
  { index: 0, inStart: T.tile1In, inDur: T.tileInDur },
  { index: 1, inStart: T.tile2In, inDur: T.tileInDur },
  { index: 2, inStart: T.tile3In, inDur: T.tileInDur },
  { index: 3, inStart: T.tile4In, inDur: T.tileInDur },
];

const TILE_TIMES = TILES.map((t) => t.inStart + T.rampOffset);
const TILT_VALUES = TILES.map((_, i) => ((i + 1) / TILES.length) * MAX_TILT);
const NEEDLE_STEP = (NEEDLE_END_DEG - NEEDLE_START_DEG) / TILES.length;
const NEEDLE_VALUES = TILES.map((_, i) => NEEDLE_START_DEG + (i + 1) * NEEDLE_STEP);

const tiltRamp = buildStepRamp(TILE_TIMES, T.rampDur, 0, TILT_VALUES);
const needleRamp = buildStepRamp(TILE_TIMES, T.rampDur, NEEDLE_START_DEG, NEEDLE_VALUES);

export const tiltMagnitudeAt = (frame: number) =>
  interpolate(frame, tiltRamp.inputs, tiltRamp.outputs, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const needleAngleAt = (frame: number) =>
  interpolate(frame, needleRamp.inputs, needleRamp.outputs, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
