export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 180; // 6 s

export const SOURCE_IN_TIMECODE = "00:00:04:25";

export const T = {
  // Intro — grid + logo first, circle follows, text last
  gridIn:    0,
  gridInDur: 20,
  logoIn:    0,
  logoInDur: 22,
  circleIn:  6,
  circleInDur: 26,
  labelIn:   14,
  labelInDur: 20,
  textIn:    10,
  textInDur: 28,

  // Hold: frames 38 → 148 (≈ 3.7 s)

  // Outro — unified fade with slight directional drift
  outStart: 148,
  outDur:   28,

  end: DURATION_IN_FRAMES,
} as const;

export const QUESTION =
  "DO YOU KNOW IF YOUR PROPERTY IS\nBOOKING FASTER OR SLOWER THAN\nYOUR MARKET";
