import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { END_LOCKUP_START } from "./timeline";

export const BrandBug: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = clampedInterp(frame, [0, 16], [0, 0.85]) * clampedInterp(frame, [END_LOCKUP_START - 10, END_LOCKUP_START + 10], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        right: 64,
        display: "flex",
        alignItems: "center",
        gap: 9,
        opacity,
      }}
    >
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: palette.teal }} />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: 2.4,
          color: palette.creamSoft,
        }}
      >
        PRICING BY MIRA
      </span>
    </div>
  );
};
