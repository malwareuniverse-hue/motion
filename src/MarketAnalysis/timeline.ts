export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 630;

export const SOURCE_IN_TIMECODE = "00:00:00:00";

/**
 * abs 00:00:00:00  local   0  "10 questions"
 * abs 00:00:01:04  local  34  [Pauses 0.50s]
 * abs 00:00:01:20  local  50  "five test and by the end of this video"
 * abs 00:00:04:03  local 123  "you'll know if you're actually reading your market"
 * abs 00:00:06:23  local 203  "or just reacting to what already happened"
 * abs 00:00:10:05  local 305  "the five tests are simple pace"
 * abs 00:00:13:06  local 396  "timing demand"
 * abs 00:00:15:07  local 457  "comparison and decision"
 */

export const T = {
  // Stage A: "10 QUESTIONS" big punch
  aIn: 0,
  aInDur: 22,

  // Crossfade over the 0.50s pause window
  fadeStart: 34,
  fadeDur: 16,

  // Stage B: "5 TESTS"
  bIn: 50,
  bInDur: 22,

  // Supporting copy lines
  supportLine1: 123,
  supportLine1Dur: 24,
  supportLine2: 203,
  supportLine2Dur: 24,

  // Transition from Stage B to the test list
  listTransStart: 290,
  listTransDur: 26,

  // Exit
  outStart: 570,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;

export type TestSpec = {
  id: string;
  label: string;
  frameIn: number;
  index: number;
};

// Five tests in transcript order; same-beat pairs staggered by 8 frames
export const TESTS: TestSpec[] = [
  { id: "pace", label: "PACE", frameIn: 305, index: 0 },
  { id: "timing", label: "TIMING", frameIn: 396, index: 1 },
  { id: "demand", label: "DEMAND", frameIn: 404, index: 2 },
  { id: "comparison", label: "COMPARISON", frameIn: 457, index: 3 },
  { id: "decision", label: "DECISION", frameIn: 465, index: 4 },
];
