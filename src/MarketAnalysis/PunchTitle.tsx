import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";

interface PunchTitleProps {
  number: string;
  label: string;
  startFrame: number;
  durationFrames: number;
}

/**
 * Big numbered punchline: gold number over soft-white uppercase label.
 * The whole block scales up from 0.88 as one unit so the gap stays stable.
 */
export const PunchTitle: React.FC<PunchTitleProps> = ({
  number,
  label,
  startFrame,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const t = clampedInterp(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    easeOutCubic,
  );
  const scale = 0.88 + t * 0.12;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        opacity: t,
        transform: `scale(${scale})`,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 220,
          fontWeight: 800,
          lineHeight: 1,
          color: palette.warmGold,
          letterSpacing: -6,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1,
          color: palette.softWhite,
          letterSpacing: 14,
        }}
      >
        {label}
      </span>
    </div>
  );
};
