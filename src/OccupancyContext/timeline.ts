export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 660;

export const SOURCE_IN_TIMECODE = "00:00:00:01";

/**
 * abs 00:00:00:01  local   0  "your property is 50% occupied 45 days out"
 * abs 00:00:03:27  local 116  "is that good you don't know"
 * abs 00:00:06:09  local 188  "if your market is only 30% occupied"
 * abs 00:00:09:08  local 277  "you may be ahead"
 * abs 00:00:11:01  local 330  "but if your market's already 75% occupied"
 * abs 00:00:14:06  local 425  "you may be behind same property"
 * abs 00:00:18:00  local 539  "same 50% totally different story"
 */

export const T = {
  // Stage A: "50%" hero with fill bar
  heroIn: 0,
  heroInDur: 20,
  barFillStart: 10,
  barFillDur: 55,

  // Stage A → B transition
  aOut: 100,
  aOutDur: 16,

  // Stage B: "IS THAT GOOD? / YOU DON'T KNOW."
  stageB: 116,
  stageBDur: 22,
  stageBOut: 172,
  stageBOutDur: 16,

  // Stage C: shared header
  sharedHeaderIn: 188,
  sharedHeaderInDur: 20,

  // Stage C left column
  leftColIn: 198,
  leftColInDur: 22,
  leftBarsIn: 214,
  leftBarsDur: 55,
  leftVerdictIn: 277,
  leftVerdictInDur: 22,

  // Stage C right column (enters at frame 330)
  rightColIn: 330,
  rightColInDur: 22,
  rightBarsIn: 346,
  rightBarsDur: 55,
  rightVerdictIn: 425,
  rightVerdictInDur: 22,

  // Stage C → D transition
  cOut: 523,
  cOutDur: 16,

  // Stage D: "SAME 50%. / TOTALLY DIFFERENT STORY."
  stageD: 539,
  stageDDur: 22,

  // Outro
  outStart: 600,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;
