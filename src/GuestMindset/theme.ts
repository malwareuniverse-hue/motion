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

  // soft-white at reduced prominence
  softWhiteSoft: "rgba(243, 241, 236, 0.62)",

  // muted-gray at reduced prominence — labels, dismissed information
  mutedGraySoft: "rgba(167, 167, 165, 0.68)",
  mutedGrayFaint: "rgba(167, 167, 165, 0.4)",

  // charcoal at overlay alpha, for cards that sit over footage
  panelOverlay: "rgba(27, 29, 33, 0.94)",

  // deep navy at low alpha — the only lift on the near-black ground, kept far
  // below charcoal so card surfaces still separate from it
  groundLift: "rgba(23, 32, 51, 0.4)",

  // thin precise lines — soft-white at line weight
  hairline: "rgba(243, 241, 236, 0.1)",
  hairlineLift: "rgba(243, 241, 236, 0.18)",
  ghost: "rgba(243, 241, 236, 0.042)",
} as const;
