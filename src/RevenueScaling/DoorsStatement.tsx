import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { T } from "./timeline";

/**
 * MORE DOORS (0:12–0:19). The campaign line, set left over the doors B-roll so
 * the right third stays open footage. Gold carries the inequality — the single
 * idea the frame exists to land.
 */
export const DoorsStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = beatOpacity(frame, T.doorsIn, 1, T.doorsOut, T.doorsOutDur);
  if (opacity <= 0) return null;

  const head = fadeUp(frame, T.doorsIn, 28);
  const sub = fadeUp(frame, T.doorsSubIn, 26, 14);
  const bar = clampedInterp(
    frame,
    [T.doorsIn, T.doorsIn + 22],
    [0, 1],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 200,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        gap: 34,
        opacity,
      }}
    >
      <div
        style={{
          width: 3,
          height: 152,
          background: palette.gold,
          transform: `scaleY(${bar})`,
          transformOrigin: "center",
        }}
      />
      <div style={{ maxWidth: 1460 }}>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -0.2,
            lineHeight: 1.16,
            whiteSpace: "nowrap",
            color: palette.white,
            opacity: head.opacity,
            transform: `translateY(${head.translateY}px)`,
          }}
        >
          MORE DOORS <span style={{ color: palette.gold }}>&ne;</span> MORE
          PROFIT
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: 0.5,
            color: palette.gray,
            marginTop: 20,
            opacity: sub.opacity,
            transform: `translateY(${sub.translateY}px)`,
          }}
        >
          Unless your revenue infrastructure can scale.
        </div>
      </div>
    </div>
  );
};
