import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { QUOTE_ROWS, T, TEXT_LEFT, TEXT_TOP, TEXT_WIDTH, type QuoteColor } from "./timeline";

const colorMap: Record<QuoteColor, string> = {
  cream: palette.cream,
  amber: palette.amber,
  amberSoft: palette.amberSoft,
  slate: palette.slate,
};

export const TextBlock: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: TEXT_LEFT,
        top: TEXT_TOP,
        width: TEXT_WIDTH,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {QUOTE_ROWS.map((row) => {
        const anim = fadeSlide(frame, row.start, T.lineDur, 20);
        const rowStyle: React.CSSProperties = {
          opacity: anim.opacity,
          transform: `translateY(${anim.translateY}px)`,
        };

        if (row.type === "divider") {
          return (
            <div
              key={row.key}
              style={{
                ...rowStyle,
                display: "flex",
                alignItems: "center",
                gap: 20,
                margin: "6px 0",
              }}
            >
              <div style={{ flex: 1, height: 1, background: palette.line }} />
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: 3,
                  color: palette.slate,
                }}
              >
                {row.text}
              </span>
              <div style={{ flex: 1, height: 1, background: palette.line }} />
            </div>
          );
        }

        return (
          <span
            key={row.key}
            style={{
              ...rowStyle,
              fontFamily: poppins,
              fontSize: row.size,
              fontWeight: row.weight,
              letterSpacing: row.spacing,
              lineHeight: 1.08,
              color: colorMap[row.color],
            }}
          >
            {row.text}
          </span>
        );
      })}
    </div>
  );
};
