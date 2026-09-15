export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 300; // 10s — an ambient loop, not cued to a script

/**
 * A full-screen animated background for "losing money" / business decline.
 * Not tied to a transcript — this is a reusable backdrop element. Per the PBM
 * visual system's rule against literal price tags, dollar signs or an
 * oversized red X, the loss is shown as a shape: a steady gold baseline (what
 * revenue should be) against a soft-white line that bleeds away from it, with
 * the growing gap between them shaded in, plus small points detaching from the
 * line and drifting off — the money leaking away.
 *
 * There is no on-screen wording; add typography in the editor per the PBM
 * "AI-generated / motion background" rule.
 *
 * Which ground the layers sit on:
 *   npx remotion render RevenueLoss out/RevenueLoss.mp4                    # dark, default
 *   npx remotion render RevenueLoss out/RevenueLoss.mov \
 *     --props='{"backdrop":"transparent"}' \
 *     --codec=prores --prores-profile=4444 \
 *     --pixel-format=yuva444p10le --image-format=png                      # true alpha, to lay over other footage
 */
export type Backdrop = "dark" | "transparent";
export type RevenueLossProps = { backdrop: Backdrop };

export const CONTENT_LEFT = 90;
export const CONTENT_RIGHT = WIDTH - 90;
export const CONTENT_W = CONTENT_RIGHT - CONTENT_LEFT;

export const BASELINE_Y = HEIGHT * 0.3;
export const DECLINE_END_Y = HEIGHT * 0.7;

export const TREND_SAMPLES = 48;

export const T = {
  baselineIn: 0,
  baselineInDur: 26,

  declineStart: 14,
  declineDur: 170,

  // once the line has fully bled away, particles keep leaking on a loop for
  // the rest of the duration, so the background stays alive if extended
  leakLoopStart: 60,
  leakLoopLen: 70,

  end: DURATION_IN_FRAMES,
} as const;

/** Count of leak points spawned per loop cycle, staggered evenly across it. */
export const LEAKS_PER_LOOP = 4;
export const LEAK_LIFE = 46;
