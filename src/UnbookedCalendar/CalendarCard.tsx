import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import {
  CARD_H,
  CARD_LEFT,
  CARD_TOP,
  CARD_W,
  COL_W,
  DAY_LABELS,
  GRID_LEFT,
  GRID_ROWS,
  GRID_TOP,
  HEADER_H,
  ROW_H,
  T,
} from "./timeline";

const RING_COUNT = 11;

const SpiralRings: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: -22,
      display: "flex",
      justifyContent: "space-evenly",
      padding: "0 46px",
    }}
  >
    {Array.from({ length: RING_COUNT }).map((_, i) => (
      <div
        key={i}
        style={{
          width: 26,
          height: 44,
          borderRadius: 13,
          border: `4px solid ${palette.gold}`,
          background: palette.bg,
          boxShadow: "0 6px 10px rgba(0,0,0,0.45)",
        }}
      />
    ))}
  </div>
);

export const CalendarCard: React.FC = () => {
  const frame = useCurrentFrame();

  const cardT = clampedInterp(frame, [T.cardInStart, T.cardInStart + T.cardInDur], [0, 1], easeOutCubic);
  const cardOpacity = cardT;
  const cardScale = 0.92 + cardT * 0.08;

  // Soft depth-of-field on the body grid once the lens takes focus.
  const focusShift = clampedInterp(frame, [T.glassInStart, T.glassInStart + T.glassInDur], [0, 1]);
  const gridBlur = focusShift * 1.6;
  const gridDim = 1 - focusShift * 0.22;

  return (
    <div
      style={{
        position: "absolute",
        left: CARD_LEFT,
        top: CARD_TOP,
        width: CARD_W,
        height: CARD_H,
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        transformOrigin: "50% 50%",
      }}
    >
      <SpiralRings />

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: `linear-gradient(155deg, ${palette.paperLift} 0%, ${palette.paper} 55%, ${palette.bg} 100%)`,
          border: `1.5px solid ${palette.gridLine}`,
          boxShadow: "0 60px 120px -40px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.4)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 64,
          width: CARD_W,
          height: HEADER_H,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          padding: "0 60px",
        }}
      >
        {DAY_LABELS.map((d) => (
          <div key={d} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span
              style={{
                fontFamily: poppins,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 3,
                color: palette.gold,
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: GRID_LEFT - CARD_LEFT,
          top: GRID_TOP - CARD_TOP,
          width: CARD_W - (GRID_LEFT - CARD_LEFT) * 2,
          height: ROW_H * GRID_ROWS.length,
          filter: `blur(${gridBlur}px)`,
          opacity: gridDim,
        }}
      >
        {GRID_ROWS.map((row, r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              top: r * ROW_H,
              left: 0,
              width: "100%",
              height: ROW_H,
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              borderTop: `1px solid ${palette.gridLine}`,
            }}
          >
            {row.map((cell, c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: "14px 0 0 18px",
                  borderLeft: c === 0 ? "none" : `1px solid ${palette.gridLine}`,
                  width: COL_W,
                }}
              >
                <span
                  style={{
                    fontFamily: poppins,
                    fontSize: 28,
                    fontWeight: 600,
                    color: cell.faded ? palette.creamFaint : palette.creamSoft,
                  }}
                >
                  {cell.n}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
