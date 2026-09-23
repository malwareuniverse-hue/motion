/**
 * Locked PBM palette. These six roles are the whole colour system — every other
 * token below is one of them at a different opacity. Do not add a hue that is
 * not in this table.
 */
export const palette = {
  nearBlack: "#0B0C0E",
  charcoal: "#1B1D21",
  warmGold: "#C9A45C",
  softWhite: "#F3F1EC",
  mutedGray: "#A7A7A5",
  deepNavy: "#172033",

  softWhiteSoft: "rgba(243, 241, 236, 0.62)",
  mutedGraySoft: "rgba(167, 167, 165, 0.7)",

  hairline: "rgba(243, 241, 236, 0.12)",
  groundLift: "rgba(23, 32, 51, 0.4)",
} as const;
