import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { END_CARD_DUR, END_CARD_START } from "./timeline";

// Closing lockup — dims the scene and resolves to the brand + CTA.
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = clampedInterp(frame, [END_CARD_START, END_CARD_START + END_CARD_DUR], [0, 1]);
  const scale = 0.94 + opacity * 0.06;
  const dim = clampedInterp(frame, [END_CARD_START, END_CARD_START + END_CARD_DUR], [1, 0.3]);
  const ruleWidth = clampedInterp(frame, [END_CARD_START + 6, END_CARD_START + 26], [0, 150]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
          opacity: (1 - dim) * 0.6,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity,
          transform: `scale(${scale})`,
          gap: 22,
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: 1,
            color: palette.cream,
            lineHeight: 1.1,
          }}
        >
          PRICING <span style={{ color: palette.teal }}>BY MIRA</span>
        </span>
        <div style={{ width: ruleWidth, height: 2, background: palette.rule }} />
        <span
          style={{
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: 3,
            color: palette.creamSoft,
          }}
        >
          STRATEGIC PRICING · REAL REVENUE
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 1.6,
            color: palette.amberSoft,
            marginTop: 8,
          }}
        >
          pricingbymira.com
        </span>
      </div>
    </>
  );
};
