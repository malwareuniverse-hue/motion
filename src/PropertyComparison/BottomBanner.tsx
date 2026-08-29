import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { serif } from "./fonts";
import { T } from "./timeline";

export const BottomBanner: React.FC = () => {
  const frame = useCurrentFrame();

  const inT = interpolate(frame, [T.bannerStart, T.bannerStart + T.bannerDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outT = interpolate(
    frame,
    [T.fadeToFinalStart, T.fadeToFinalStart + T.fadeToFinalDur],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const opacity = inT * outT;
  const translateY = (1 - inT) * 34;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 46,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ width: 60, height: 1, background: palette.gold, opacity: 0.6 }} />
      <span
        style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 30,
          fontWeight: 500,
          color: palette.cream,
          letterSpacing: 0.5,
        }}
      >
        Same size <span style={{ color: palette.gold }}>≠</span> Same value
      </span>
      <div style={{ width: 60, height: 1, background: palette.gold, opacity: 0.6 }} />
    </div>
  );
};
