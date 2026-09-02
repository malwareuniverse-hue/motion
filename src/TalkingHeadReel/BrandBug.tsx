import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { BRAND_BUG_IN, END_CARD_START } from "./timeline";

export const BrandBug: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity =
    clampedInterp(frame, [BRAND_BUG_IN, BRAND_BUG_IN + 16], [0, 0.9]) *
    clampedInterp(frame, [END_CARD_START - 12, END_CARD_START + 8], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 84,
        left: 60,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: palette.teal }} />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 2.6,
          color: palette.creamSoft,
        }}
      >
        PRICING BY MIRA
      </span>
    </div>
  );
};
