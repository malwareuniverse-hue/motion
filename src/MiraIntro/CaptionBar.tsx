import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import type { CaptionBeat } from "./timeline";

const renderText = (beat: CaptionBeat) => {
  if (!beat.emphasis) return beat.text;
  const idx = beat.text.indexOf(beat.emphasis);
  if (idx === -1) return beat.text;
  const before = beat.text.slice(0, idx);
  const mid = beat.text.slice(idx, idx + beat.emphasis.length);
  const after = beat.text.slice(idx + beat.emphasis.length);
  const color = beat.emphasisColor === "amber" ? palette.amber : palette.teal;
  return (
    <>
      {before}
      <span style={{ color }}>{mid}</span>
      {after}
    </>
  );
};

export const CaptionBar: React.FC<{ beat: CaptionBeat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = springIn(frame, beat.start, fps, { damping: 16, stiffness: 220, mass: 0.6 });
  const exitStart = beat.end - 10;
  const exit = clampedInterp(frame, [exitStart, beat.end], [1, 0]);

  const scale = 0.88 + enter * 0.12;
  const translateY = (1 - enter) * 20 - (1 - exit) * 14;
  const opacity = Math.min(enter, exit);

  const ruleWidth = clampedInterp(frame, [beat.start, beat.start + 16], [0, 1]) * exit;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          fontFamily: poppins,
          fontSize: 54,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: palette.cream,
          textAlign: "center",
          textShadow: "0 6px 30px rgba(0,0,0,0.45)",
          maxWidth: 1300,
        }}
      >
        {renderText(beat)}
      </div>
      <div
        style={{
          width: 90 * ruleWidth,
          height: 4,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${palette.teal}, ${palette.amber})`,
        }}
      />
    </div>
  );
};
