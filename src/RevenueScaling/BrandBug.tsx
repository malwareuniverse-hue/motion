import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { T } from "./timeline";

/** Persistent corner mark. Retires before the end lockup takes the frame. */
export const BrandBug: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity =
    clampedInterp(frame, [T.brandBugIn, T.brandBugIn + 20], [0, 0.8]) *
    clampedInterp(frame, [T.brandBugOut, T.brandBugOut + 18], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        right: 72,
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity,
      }}
    >
      <div style={{ width: 6, height: 6, background: palette.gold }} />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: 3,
          color: palette.whiteSoft,
        }}
      >
        PRICING BY MIRA
      </span>
    </div>
  );
};
