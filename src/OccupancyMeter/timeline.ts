export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 260; // 8s 20f

/**
 * A single spoken line carries two claims: what the owner sees (bookings),
 * and the number they read it as (80 or 90% occupancy). The transcript gives
 * one timecode for the whole sentence, so the internal pacing below is
 * invented to match natural delivery — there is no second timecode to key off.
 *
 * Source placement: drop this composition at 00:00:00:03 on the master timeline.
 *
 *   abs 00:00:00:03  local  3  you see bookings you see 80 or 90% occupancy
 */
export const SOURCE_IN_TIMECODE = "00:00:00:03";

export const CONTENT_LEFT = 220;
export const METER_W = 900;
export const METER_H = 14;

export const T = {
  line1In: 3,
  line1Dur: 26,

  ruleStart: 70,
  ruleDur: 22,

  line2In: 92,
  line2Dur: 30,

  meterTrackIn: 100,
  meterTrackDur: 22,

  // "80 or 90%" — the bar and counter climb to 80, hold, then climb again to 90
  fillTo80Start: 118,
  fillTo80Dur: 34,
  holdAt80Dur: 46,
  riseTo90Start: 198,
  riseTo90Dur: 26,

  outStart: 226,
  outDur: 30,

  end: DURATION_IN_FRAMES,
} as const;

export const OCCUPANCY_FIRST = 80;
export const OCCUPANCY_SECOND = 90;

export const LINE_1 = "YOU SEE BOOKINGS";
export const LINE_2_LEAD = "YOU SEE ";
export const LINE_2_ACCENT = "80 OR 90%";
export const LINE_2_TAIL = " OCCUPANCY";
