export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 300; // 10s

/**
 * A three-beat full-screen sequence, same contract as CalmDiagnosis and
 * OwnerEyesShort: each statement takes the frame, then crossfades to the
 * next exactly on the transcript's own pause rather than an invented gap.
 * No side panel, no chroma, full-bleed on the locked PBM near-black ground.
 * 9:16 vertical: every text block wraps within a percentage-based safe
 * width rather than a fixed pixel one.
 *
 * The first two beats each carry a small abstract line icon (a missed
 * target for the revenue line, an off-zone gauge needle for the occupancy
 * line) — the same "aimed at something, landed elsewhere" shape twice, so
 * the two goals read as one idea before the third line generalises it. No
 * literal dollar sign or price tag; per the PBM system, revenue is never
 * drawn as currency iconography.
 *
 * Source placement: drop this composition at 00:00:00:06 on the master timeline.
 *
 *   abs 00:00:00:06  local   0  your revenue goal can be wrong
 *   abs 00:00:02:18  local  72  [pause 0.53s]
 *   abs 00:00:03:05  local  89  your occupancy goal can be wrong
 *   abs 00:00:05:26  local 170  [pause 0.53s]
 *   abs 00:00:06:13  local 187  everything can start wrong
 *
 * Both pauses are 0.53s (16 frames at 30fps) and are used verbatim as the
 * two crossfade windows — the motion and the on-set silence land on the
 * same beat. The closing line is the widest claim of the three ("everything"
 * vs "your revenue goal" / "your occupancy goal"), so it drops the icon and
 * scales up as a plain typographic escalation rather than a third icon beat.
 */
export const SOURCE_IN_TIMECODE = "00:00:00:06";

export const T = {
  beat1In: 0,
  beat1InDur: 24,

  // the transcript's own first pause (0.53s), used verbatim as the
  // beat1 -> beat2 crossfade window
  fade1Start: 72,
  fade1Dur: 16,

  beat2In: 72,
  beat2InDur: 24,

  // the transcript's own second pause (0.53s), used verbatim as the
  // beat2 -> beat3 crossfade window
  fade2Start: 170,
  fade2Dur: 16,

  beat3In: 170,
  beat3InDur: 22,

  outStart: 267,
  outDur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const LINE_1 = "YOUR REVENUE GOAL\nCAN BE WRONG";
export const LINE_2 = "YOUR OCCUPANCY GOAL\nCAN BE WRONG";
export const LINE_3 = "EVERYTHING CAN\nSTART WRONG";
