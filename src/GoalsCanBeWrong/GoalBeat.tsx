import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";

/**
 * One of the two "goal can be wrong" beats: an abstract icon over a
 * two-line headline, both entering with a slight rise. Visibility across
 * the full beat (including its crossfade in/out) is owned by the stage
 * wrapper in index.tsx — this component only times its own internal
 * entrance.
 */
export const GoalBeat: React.FC<{
  icon: React.ReactNode;
  lines: [string, string];
  startFrame: number;
}> = ({ icon, lines, startFrame }) => {
  const frame = useCurrentFrame();
  const iconMotion = fadeSlide(frame, startFrame, 18, 14);
  const textMotion = fadeSlide(frame, startFrame + 8, 22, 18);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 46,
        padding: "0 72px",
      }}
    >
      <div
        style={{
          opacity: iconMotion.opacity,
          transform: `translateY(${iconMotion.translateY}px)`,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          maxWidth: "88%",
          opacity: textMotion.opacity,
          transform: `translateY(${textMotion.translateY}px)`,
          fontFamily: poppins,
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1.28,
          letterSpacing: 0.4,
          color: palette.softWhite,
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {lines[0]}
        {"\n"}
        {lines[1]}
      </span>
    </div>
  );
};
