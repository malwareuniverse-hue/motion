import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";

// "30 → 75" / "100 → 250" growth beat. from = today, to = target (gold).
export const GrowthStat: React.FC<{ from: string; to: string }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fromEnter = springIn(frame, 2, fps, { damping: 18, stiffness: 200 });
  const arrow = clampedInterp(frame, [14, 30], [0, 1]);
  const toEnter = springIn(frame, 28, fps, { damping: 15, stiffness: 220 });
  const out = clampedInterp(frame, [durationInFrames - 12, durationInFrames], [1, 0]);

  // Count the target number up as it enters.
  const toNum = parseInt(to, 10);
  const counted = Math.round(clampedInterp(frame, [28, 64], [0, toNum]));

  const cell = (
    label: string,
    value: string,
    accent: boolean,
    enter: number,
  ) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 22}px) scale(${0.9 + enter * 0.1})`,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 3,
          color: palette.mutedGray,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 190,
          fontWeight: 800,
          lineHeight: 1,
          color: accent ? palette.gold : palette.softWhite,
          textShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        opacity: out,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
        {cell("TODAY", from, false, fromEnter)}
        <span
          style={{
            fontFamily: poppins,
            fontSize: 120,
            fontWeight: 300,
            color: palette.gold,
            opacity: arrow,
            transform: `translateX(${(1 - arrow) * -20}px)`,
            marginTop: 30,
          }}
        >
          →
        </span>
        {cell("TARGET", String(counted), true, toEnter)}
      </div>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: 2,
          color: palette.softWhiteSoft,
          opacity: toEnter,
        }}
      >
        PROPERTIES UNDER MANAGEMENT
      </span>
    </div>
  );
};
