import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { END_LOCKUP_DUR, END_LOCKUP_START } from "./timeline";

export const EndLockup: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = clampedInterp(frame, [END_LOCKUP_START, END_LOCKUP_START + END_LOCKUP_DUR], [0, 1]);
  const scale = 0.94 + opacity * 0.06;
  const dim = clampedInterp(frame, [END_LOCKUP_START, END_LOCKUP_START + END_LOCKUP_DUR], [1, 0.35]);
  const ruleWidth = clampedInterp(frame, [END_LOCKUP_START + 6, END_LOCKUP_START + 26], [0, 130]);

  return (
    <>
      {/* dim the scene behind the lockup so it reads as the hero */}
      <div style={{ position: "absolute", inset: 0, background: "#000000", opacity: (1 - dim) * 0.55 }} />

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
          gap: 18,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: 1,
            color: palette.cream,
          }}
        >
          PRICING <span style={{ color: palette.teal }}>BY MIRA</span>
        </span>
        <div style={{ width: ruleWidth, height: 2, background: palette.rule }} />
        <span
          style={{
            fontFamily: poppins,
            fontSize: 19,
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
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 1.4,
            color: palette.amberSoft,
            marginTop: 6,
          }}
        >
          pricingbymira.com
        </span>
      </div>
    </>
  );
};
