import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import { GHOST_NUMERAL, T } from "./timeline";

export const GhostNumeral: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = clampedInterp(
    frame,
    [T.ghostStart, T.ghostStart + T.ghostDur],
    [0, 1],
    easeOutCubic,
  );
  // a very slow settle — never a zoom
  const scale = clampedInterp(
    frame,
    [T.ghostStart, T.end],
    [0.985, 1],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        right: 150,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        opacity: enter,
        transform: `scale(${scale})`,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 620,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: -14,
          color: palette.ghost,
        }}
      >
        {GHOST_NUMERAL}
      </span>
    </div>
  );
};
