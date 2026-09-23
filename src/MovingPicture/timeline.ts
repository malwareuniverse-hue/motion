export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 750; // 25s

// Timecodes from transcript → frames at 30fps
// 00:00:00:01 →   1  "this is a big one let's say last year"
// 00:00:02:21 →  81  "a weekend finished at 65% market occupancy"
// 00:00:05:27 → 177  [Pause 0.63s]
// 00:00:06:17 → 197  "but when did those bookings happen"
// 00:00:09:05 → 275  "at this same point last year"
// 00:00:12:01 → 361  "was the market already at 60%"
// 00:00:14:29 → 449  "or was it only at 20% and then filled last minute"
// 00:00:18:20 → 560  "those are completely different stories"
// 00:00:20:22 → 622  [Pause 0.50s]
// 00:00:21:08 → 638  "so don't compare a moving picture to a finished photo"

export const T = {
  panelIn: 0,
  panelInDur: 40,

  // "last year" context + icon animate-in
  iconAnimAt: 10,
  iconAnimDur: 50,

  // "65% market occupancy"
  occupancyAt: 81,
  occupancyFillDur: 48,

  // "but when did those bookings happen"
  questionAt: 197,
  questionDur: 28,

  // "at this same point last year"
  samePointAt: 275,
  samePointDur: 28,

  // "was the market already at 60%"
  scenarioAAt: 361,
  scenarioADur: 34,

  // "or was it only at 20% and then filled last minute"
  scenarioBAt: 449,
  scenarioBDur: 38,

  // "those are completely different stories"
  divergeAt: 560,
  divergeDur: 30,

  // "don't compare a moving picture to a finished photo"
  conclusionAt: 638,
  conclusionDur: 40,

  end: DURATION_IN_FRAMES,
} as const;
