export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 720;

export const SOURCE_IN_TIMECODE = "00:00:00:00";

/**
 * abs 00:00:00:00  local   0  "let's say a market is 90% occupied"
 * abs 00:00:02:27  local  87  "that sounds strong but"
 * abs 00:00:05:05  local 155  "what if almost nobody has booked in the last seven days"
 * abs 00:00:08:27  local 267  "the market may have stopped moving"
 * abs 00:00:11:13  local 343  "now flip it maybe occupancy is only 65%"
 * abs 00:00:16:03  local 483  "but bookings are coming in fast"
 * abs 00:00:18:13  local 553  "that market may be heating up"
 * abs 00:00:20:26  local 626  "two completely different situations"
 */

export const T = {
  // Stage A: "90% Occupied" — gauge animates in
  gaugeAIn: 0,
  gaugeAInDur: 32,

  // Stage B: "That sounds strong, but..."
  stageB: 87,
  stageBDur: 22,

  // Stage C: 7-day booking strip appears (empty)
  stripIn: 155,
  stripInDur: 24,
  stripFillDur: 80,   // fills in as empty/near-zero

  // Stage D: "The market may have stopped moving"
  frozenLabel: 267,
  frozenLabelDur: 22,

  // A→B transition
  aOut: 307,
  aOutDur: 20,

  // Stage E: "65% occupied" — flip/transition
  stagEIn: 343,
  stageEInDur: 28,
  gaugeBIn: 343,
  gaugeBInDur: 36,

  // Stage F: "But bookings are coming in fast"
  activeStripIn: 483,
  activeStripInDur: 24,
  activeStripFillDur: 60,

  // Stage G: "That market may be heating up"
  heatingLabel: 553,
  heatingLabelDur: 22,
  heatingGlow: 566,
  heatingGlowDur: 40,

  // Stage E-G → Stage H transition
  eOut: 600,
  eOutDur: 20,

  // Stage H: "Two completely different situations" — split comparison
  splitIn: 626,
  splitInDur: 28,

  // Outro
  outStart: 670,
  outDur: 40,

  end: DURATION_IN_FRAMES,
} as const;
