import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { SAFE_X, TEXT_MAX_W } from "./timeline";

type Line = {
  content: React.ReactNode;
  opacity: number;
  shift: number;
  size: number;
  weight?: number;
  letterSpacing?: number;
  color?: string;
};

/**
 * Full-screen key statement: an optional warm-gold rule above a centred
 * stack of lines. Used for every beat where the frame carries one idea.
 */
export const Statement: React.FC<{
  opacity: number;
  rule?: number;
  lines: Line[];
  gap?: number;
}> = ({ opacity, rule, lines, gap = 34 }) => {
  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap,
        padding: `0 ${SAFE_X}px`,
      }}
    >
      {rule === undefined ? null : (
        <div
          style={{
            width: rule,
            height: 1,
            background: palette.gold,
            opacity: 0.85,
          }}
        />
      )}
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            opacity: line.opacity,
            transform: `translateY(${line.shift}px)`,
            fontFamily: poppins,
            fontSize: line.size,
            fontWeight: line.weight ?? 600,
            letterSpacing: line.letterSpacing ?? 1.5,
            color: line.color ?? palette.softWhite,
            textAlign: "center",
            lineHeight: 1.24,
            maxWidth: TEXT_MAX_W,
          }}
        >
          {line.content}
        </span>
      ))}
    </div>
  );
};
