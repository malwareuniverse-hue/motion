import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { GUEST_QUESTION } from "./timeline";

type Props = {
  progress: number; // 0-1 entrance
  emphasize: number; // 0-1 grows into the hero statement of the panel
};

export const QuestionBubble: React.FC<Props> = ({ progress, emphasize }) => {
  const scale = 1 + emphasize * 0.14;
  const translateY = (1 - progress) * 16;
  const bg = emphasize > 0 ? palette.teal : palette.card;
  const textColor = emphasize > 0.5 ? "#FFFFFF" : palette.ink;
  const borderColor = emphasize > 0 ? palette.teal : palette.rule;

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      <div
        style={{
          background: bg,
          border: `1.5px solid ${borderColor}`,
          borderRadius: 18,
          padding: "20px 26px",
          boxShadow: "0 24px 46px -26px rgba(23,26,31,0.4)",
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 21 + emphasize * 5,
            fontWeight: 700,
            lineHeight: 1.32,
            letterSpacing: 0.2,
            color: textColor,
            textAlign: "center",
          }}
        >
          {GUEST_QUESTION}
        </div>
      </div>
      <div
        style={{
          width: 18,
          height: 18,
          background: bg,
          border: `1.5px solid ${borderColor}`,
          borderTop: "none",
          borderLeft: "none",
          transform: "translate(30px, -10px) rotate(45deg)",
        }}
      />
    </div>
  );
};
