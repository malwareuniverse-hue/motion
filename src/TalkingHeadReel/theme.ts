// Shared PBM "VOX-style" palette — kept in sync with MiraIntro so the reel
// reads as part of the same brand system (charcoal base, teal/amber accents).
export const palette = {
  charcoal: "#14171C",
  charcoalDeep: "#0A0C0F",
  charcoalLift: "#1D2128",
  cream: "#F6F4EE",
  creamSoft: "rgba(246, 244, 238, 0.72)",
  creamFaint: "rgba(246, 244, 238, 0.4)",
  teal: "#14A08D",
  tealDeep: "#0F7A6C",
  tealSoft: "#7FC4B7",
  amber: "#E0A23D",
  amberSoft: "#F0CE94",
  rule: "rgba(246, 244, 238, 0.16)",
} as const;

export type AccentColor = "teal" | "amber";

export const accentHex = (accent: AccentColor) =>
  accent === "amber" ? palette.amber : palette.teal;
