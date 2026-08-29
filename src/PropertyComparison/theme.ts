export const palette = {
  bgTop: "#0B0F16",
  bgBottom: "#141B26",
  panelBg: "#101722",
  panelBorder: "rgba(203, 163, 82, 0.18)",
  cream: "#F4EEDF",
  creamDim: "rgba(244, 238, 223, 0.62)",
  gold: "#CBA352",
  goldBright: "#E9CD8C",
  slate: "#8B93A1",
  slateDim: "rgba(139, 147, 161, 0.55)",
  divider: "rgba(244, 238, 223, 0.14)",
  skyStandard: ["#4A5568", "#2D3542"],
  skyPremium: ["#E8A672", "#7A4E6B", "#2B3A5C"],
} as const;

export const accent = {
  a: palette.slate,
  b: palette.gold,
} as const;
