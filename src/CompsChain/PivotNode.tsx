import React from "react";
import { interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import { CARD_W, PIVOT_RIGHT_TEXT, PIVOT_WRONG_TEXT, T, WIDTH, slotY } from "./timeline";

export const PivotNode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = springIn(frame, T.pivotInStart, fps, { damping: 16, stiffness: 200, mass: 0.6 });
  const opacity = clampedInterp(enter, [0, 1], [0, 1]);
  const translateY = (1 - enter) * 16;

  const flip = clampedInterp(frame, [T.pivotFlipStart, T.pivotFlipStart + T.pivotFlipDur], [0, 1]);
  const bulge = Math.sin(flip * Math.PI) * 0.08;
  const accent = interpolateColors(flip, [0, 1], [palette.rose, palette.teal]);
  const accentBg = interpolateColors(flip, [0, 1], [palette.roseBg, palette.tealBg]);

  const midpoint = T.pivotFlipStart + T.pivotFlipDur * 0.5;
  const outT = clampedInterp(frame, [T.pivotFlipStart, midpoint], [0, 1]);
  const inT = clampedInterp(frame, [midpoint, T.pivotFlipStart + T.pivotFlipDur], [0, 1]);
  const wrongOpacity = 1 - outT;
  const wrongTranslateY = outT * -16;
  const rightOpacity = inT;
  const rightTranslateY = (1 - inT) * 16;

  return (
    <div
      style={{
        position: "absolute",
        left: WIDTH / 2,
        top: slotY(0),
        transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${0.85 + enter * 0.15 + bulge})`,
        opacity,
        width: CARD_W,
      }}
    >
      <div
        style={{
          borderRadius: 16,
          height: 64,
          background: palette.panel,
          border: `1.5px solid ${accent}`,
          boxShadow: `0 20px 40px -24px rgba(0,0,0,0.55), 0 0 0 4px ${accentBg}`,
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: wrongOpacity,
            transform: `translateY(${wrongTranslateY}px)`,
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 1.6,
            color: palette.cream,
          }}
        >
          {PIVOT_WRONG_TEXT}
        </span>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: rightOpacity,
            transform: `translateY(${rightTranslateY}px)`,
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 1.6,
            color: palette.cream,
          }}
        >
          {PIVOT_RIGHT_TEXT}
        </span>
      </div>
    </div>
  );
};
