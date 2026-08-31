export const palette = {
  bg: "#0B0D11",
  bgLift: "#12151B",
  panel: "#151920",
  panelBorder: "rgba(246, 244, 238, 0.09)",
  panelBorderLift: "rgba(246, 244, 238, 0.16)",
  grid: "rgba(246, 244, 238, 0.045)",
  cream: "#F6F4EE",
  creamSoft: "rgba(246, 244, 238, 0.62)",
  creamFaint: "rgba(246, 244, 238, 0.34)",
  teal: "#14A08D",
  tealSoft: "#7FC4B7",
  tealBg: "rgba(20, 160, 141, 0.12)",
  amber: "#E0A23D",
  amberSoft: "#F0CE94",
  rose: "#C25B4F",
  roseSoft: "#E5A79C",
  roseBg: "rgba(194, 91, 79, 0.14)",
} as const;

export const scoreColor = (score: number) => {
  if (score >= 75) return palette.teal;
  if (score >= 60) return palette.amber;
  return palette.rose;
};
