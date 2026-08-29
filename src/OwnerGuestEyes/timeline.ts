export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const OWNER_LABELS = ["$80,000 KITCHEN", "NEW RENOVATION", "EXPENSIVE MATERIALS"];

export const GUEST_QUESTION = "IS THIS BETTER THAN MY OTHER OPTIONS?";

export const T = {
  panelsStart: 0,
  panelsDur: 36,
  headerStart: 12,
  headerDur: 26,

  ownerChipStart: 52,
  ownerChipStep: 22,
  ownerHoldEnd: 172,

  guestCardStart: 172,
  guestCardStep: 18,
  questionStart: 252,
  questionDur: 26,

  fullHoldEnd: 352,

  ownerFadeStart: 358,
  ownerFadeDur: 28,

  emphasizeStart: 358,
  emphasizeDur: 40,
  emphasizeHoldEnd: 462,

  toFinalStart: 468,
  toFinalDur: 30,

  finalLine1Start: 508,
  finalLine1Dur: 28,
  finalLine2Start: 562,
  finalLine2Dur: 30,

  end: 640,
} as const;

export const DURATION_IN_FRAMES = T.end;
