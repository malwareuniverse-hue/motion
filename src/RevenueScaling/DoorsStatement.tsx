import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { useLayout } from "./layout";
import { T } from "./timeline";

/**
 * MORE DOORS (0:12–0:19). The campaign line over the doors B-roll. In 16:9 it
 * sits left so the right third stays open footage; in 9:16 it stacks and
 * centres, with the inequality on its own line. Gold carries the ≠ either way —
 * the single idea the frame exists to land.
 */
export const DoorsStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();

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

  const headStyle: React.CSSProperties = {
    fontFamily: poppins,
    fontSize: l.portrait ? 66 : 72,
    fontWeight: 700,
    letterSpacing: -0.2,
    lineHeight: 1.14,
    color: palette.white,
    opacity: head.opacity,
    transform: `translateY(${head.translateY}px)`,
  };

  const subStyle: React.CSSProperties = {
    fontFamily: poppins,
    fontSize: l.portrait ? 26 : 28,
    fontWeight: 400,
    letterSpacing: 0.5,
    color: palette.gray,
    marginTop: l.portrait ? 30 : 20,
    opacity: sub.opacity,
    transform: `translateY(${sub.translateY}px)`,
  };

  if (l.portrait) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `0 ${l.margin}px`,
          textAlign: "center",
          opacity,
        }}
      >
        <div style={headStyle}>MORE DOORS</div>
        <div
          style={{
            ...headStyle,
            fontSize: 78,
            color: palette.gold,
            margin: "6px 0",
            transform: `translateY(${head.translateY}px) scaleX(${0.6 + bar * 0.4})`,
          }}
        >
          &ne;
        </div>
        <div style={headStyle}>MORE PROFIT</div>
        <div style={subStyle}>
          Unless your revenue infrastructure can scale.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        left: l.margin,
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
        <div style={{ ...headStyle, whiteSpace: "nowrap" }}>
          MORE DOORS <span style={{ color: palette.gold }}>&ne;</span> MORE
          PROFIT
        </div>
        <div style={subStyle}>
          Unless your revenue infrastructure can scale.
        </div>
      </div>
    </div>
  );
};
