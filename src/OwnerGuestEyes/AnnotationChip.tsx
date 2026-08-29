import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";

type Props = {
  label: string;
  xPercent: number;
  yPercent: number;
  side: "left" | "right";
  progress: number; // 0-1
};

export const AnnotationChip: React.FC<Props> = ({ label, xPercent, yPercent, side, progress }) => {
  const lineLength = 34 * progress;
  const chipOpacity = Math.max(0, (progress - 0.35) / 0.65);
  const chipX = side === "right" ? (1 - chipOpacity) * 14 : -(1 - chipOpacity) * 14;

  return (
    <div
      style={{
        position: "absolute",
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        display: "flex",
        flexDirection: side === "right" ? "row" : "row-reverse",
        alignItems: "center",
        transform: "translateY(-50%)",
      }}
    >
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: palette.amber,
          opacity: progress,
          flexShrink: 0,
          boxShadow: `0 0 0 3px ${palette.amberBg}`,
        }}
      />
      <div
        style={{
          width: lineLength,
          height: 1,
          background: palette.amber,
          opacity: progress * 0.7,
        }}
      />
      <div
        style={{
          opacity: chipOpacity,
          transform: `translateX(${chipX}px)`,
          background: palette.card,
          border: `1px solid ${palette.rule}`,
          borderRadius: 999,
          padding: "7px 16px",
          boxShadow: "0 8px 20px -10px rgba(23,26,31,0.25)",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0.4,
            color: palette.ink,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
