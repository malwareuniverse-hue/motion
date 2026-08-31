import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic } from "./utils";
import { T } from "./timeline";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();

  const introOpacity = clampedInterp(frame, [T.titleIn, T.titleIn + T.titleInDur], [0, 1]);
  const transition = clampedInterp(
    frame,
    [T.titleHoldEnd, T.titleHoldEnd + T.titleOutDur],
    [0, 1],
    easeInOutCubic,
  );

  const fontSize = 88 - transition * 68; // 88 -> 20
  const topPct = 48 - transition * 43; // 48% -> ~5%
  const letterSpacing = 1 + transition * 3;
  const outOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + 16], [1, 0]);
  const color = interpolateColors(transition, [0, 1], [palette.cream, palette.teal]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: `${topPct}%`,
        display: "flex",
        justifyContent: "center",
        opacity: introOpacity * outOpacity,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontWeight: 800,
          fontSize,
          letterSpacing,
          color,
        }}
      >
        WRONG COMPS
      </span>
    </div>
  );
};
