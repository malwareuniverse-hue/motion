import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide, clampedInterp } from "./utils";
import { T } from "./timeline";

export const SearchHeader: React.FC = () => {
  const frame = useCurrentFrame();
  const header = fadeSlide(frame, T.headerStart, T.headerDur, -14);
  const headerOut = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + 16], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 74,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: header.opacity * headerOut,
        transform: `translateY(${header.translateY}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <circle cx={11} cy={11} r={7} stroke={palette.teal} strokeWidth={1.8} />
          <path d="M21 21l-4.8-4.8" stroke={palette.teal} strokeWidth={1.8} strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: poppins, fontSize: 14, fontWeight: 700, letterSpacing: 3, color: palette.teal }}>
          SEARCHING STAYS FOR 12 GUESTS
        </span>
      </div>
    </div>
  );
};
