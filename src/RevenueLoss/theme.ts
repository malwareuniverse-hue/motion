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

  softWhiteFaint: "rgba(243, 241, 236, 0.5)",
  mutedGraySoft: "rgba(167, 167, 165, 0.62)",
  mutedGrayFaint: "rgba(167, 167, 165, 0.3)",

  hairline: "rgba(243, 241, 236, 0.08)",
  groundLift: "rgba(23, 32, 51, 0.4)",

  // the shaded gap between "what revenue should be" and where it actually
  // fell to — charcoal at low alpha, never a hue outside the six roles above
  lossFill: "rgba(27, 29, 33, 0.55)",
} as const;
