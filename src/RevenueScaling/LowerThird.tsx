import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import { T } from "./timeline";
import { useLayout } from "./layout";

/**
 * PBM lower third, lower-left safe area. Placed on the one beat with no
 * full-screen graphic (1:00 — "that's the conversation I want to have"), so it
 * identifies Emile while he carries the frame alone.
 */
export const LowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();

  const inT = clampedInterp(
    frame,
    [T.lowerThirdIn, T.lowerThirdIn + 20],
    [0, 1],
    easeOutCubic,
  );
  const outT = clampedInterp(
    frame,
    [T.lowerThirdOut, T.lowerThirdOut + T.lowerThirdOutDur],
    [1, 0],
  );
  const progress = Math.min(inT, outT);
  if (progress <= 0) return null;

  const barDraw =
    clampedInterp(
      frame,
      [T.lowerThirdIn, T.lowerThirdIn + 16],
      [0, 1],
      easeOutCubic,
    ) * outT;

  return (
    <div
      style={{
        position: "absolute",
        left: l.portrait ? l.margin : 120,
        bottom: l.portrait ? 300 : 132,
        display: "flex",
        alignItems: "stretch",
        gap: 20,
        opacity: progress,
        transform: `translateX(${(1 - progress) * -24}px)`,
      }}
    >
      <div
        style={{
          width: 3,
          background: palette.gold,
          transform: `scaleY(${barDraw})`,
          transformOrigin: "bottom",
        }}
      />
      <div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: l.portrait ? 30 : 34,
            fontWeight: 700,
            letterSpacing: 0.4,
            color: palette.white,
          }}
        >
          EMILE SAKHEL
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 3.2,
            color: palette.gold,
            marginTop: 6,
          }}
        >
          PRICING BY MIRA
        </div>
      </div>
    </div>
  );
};
