export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 420; // exactly 14.00s at 30fps

export type CaptionBeat = {
  text: string;
  start: number;
  end: number;
  emphasis?: string; // substring rendered in the accent color
  emphasisColor?: "teal" | "amber";
};

export const CAPTIONS: CaptionBeat[] = [
  { text: "BY THE WAY…", start: 8, end: 42 },
  { text: "IF YOU'RE NEW HERE,", start: 42, end: 82 },
  { text: "I'M EMILE", start: 82, end: 116, emphasis: "EMILE", emphasisColor: "teal" },
  { text: "WITH PRICING BY MIRA.", start: 116, end: 158, emphasis: "PRICING BY MIRA", emphasisColor: "teal" },
  { text: "WE HELP SHORT-TERM RENTAL", start: 158, end: 198 },
  { text: "OPERATORS & INVESTORS", start: 198, end: 234 },
  { text: "MAKE MORE MONEY", start: 234, end: 268, emphasis: "MORE MONEY", emphasisColor: "amber" },
  { text: "FROM THEIR PROPERTIES", start: 268, end: 300 },
  { text: "THROUGH STRATEGIC PRICING", start: 300, end: 338, emphasis: "STRATEGIC PRICING", emphasisColor: "teal" },
  { text: "AND REVENUE MANAGEMENT.", start: 338, end: 378, emphasis: "REVENUE MANAGEMENT", emphasisColor: "teal" },
];

export const LOWER_THIRD_START = 90;
export const LOWER_THIRD_OUT_START = 372;
export const LOWER_THIRD_OUT_DUR = 16;

export const END_LOCKUP_START = 372;
export const END_LOCKUP_DUR = 26;
