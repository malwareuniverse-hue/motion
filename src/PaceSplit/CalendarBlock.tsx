import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "./icons";
import { clampedInterp, springIn } from "./utils";
import { DAY_LABELS, GRID_ROWS, HIGHLIGHT_CELLS, T, type Verdict } from "./timeline";

const COLS = 7;

export const CalendarBlock: React.FC<{ frame: number; entryDelay: number; verdict: Verdict }> = ({
  frame,
  entryDelay,
  verdict,
}) => {
  const isAhead = verdict === "ahead";
  const accent = isAhead ? palette.green : palette.red;
  const accentSoft = isAhead ? palette.greenSoft : palette.redSoft;
  const accentBg = isAhead ? palette.greenBg : palette.redBg;
  const label = isAhead ? "BOOKED" : "UNBOOKED";

  const headerStart = T.calHeaderStart + entryDelay;
  const headerT = clampedInterp(frame, [headerStart, headerStart + T.calHeaderDur], [0, 1]);

  return (
    <div style={{ opacity: headerT, transform: `translateY(${(1 - headerT) * 10}px)` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontFamily: poppins, fontSize: 22, fontWeight: 700, letterSpacing: 1.4, color: palette.gold }}>
          MAY 2025
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <ChevronLeftIcon color={palette.creamFaint} size={18} />
          <ChevronRightIcon color={palette.creamFaint} size={18} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, marginBottom: 6 }}>
        {DAY_LABELS.map((d) => (
          <div key={d} style={{ textAlign: "center", padding: "4px 0" }}>
            <span style={{ fontFamily: poppins, fontSize: 13, fontWeight: 700, letterSpacing: 1.6, color: palette.creamSoft }}>
              {d}
            </span>
          </div>
        ))}
      </div>

      {GRID_ROWS.map((row, r) => {
        const rowStart = T.gridRowStart + entryDelay + r * T.gridRowStagger;
        const rowT = clampedInterp(frame, [rowStart, rowStart + T.gridRowDur], [0, 1]);
        return (
          <div
            key={r}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              opacity: rowT,
              transform: `translateY(${(1 - rowT) * 6}px)`,
              borderTop: `1px solid ${palette.gridLine}`,
            }}
          >
            {row.map((cell, c) => {
              const focus = HIGHLIGHT_CELLS.findIndex((h) => h.row === r && h.col === c);
              if (focus >= 0) {
                const hStart = T.highlightStart + entryDelay + focus * T.highlightStagger;
                const hT = springIn(frame, hStart, 30, { damping: 14, stiffness: 220, mass: 0.6 });
                const hClamped = Math.max(0, Math.min(hT, 1));
                return (
                  <div
                    key={c}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                      padding: "10px 2px",
                      opacity: hClamped,
                      transform: `scale(${0.82 + hClamped * 0.18})`,
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: accentBg,
                        border: `1.5px solid ${accent}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isAhead ? <CheckIcon color={accentSoft} size={14} /> : <XIcon color={accentSoft} size={14} />}
                    </div>
                    <span style={{ fontFamily: poppins, fontSize: 13, fontWeight: 700, color: palette.cream }}>{cell.n}</span>
                    <span style={{ fontFamily: poppins, fontSize: 8.5, fontWeight: 800, letterSpacing: 0.6, color: accentSoft }}>
                      {label}
                    </span>
                  </div>
                );
              }
              return (
                <div key={c} style={{ padding: "12px 2px 0", textAlign: "center" }}>
                  <span
                    style={{
                      fontFamily: poppins,
                      fontSize: 15,
                      fontWeight: 600,
                      color: cell.faded ? palette.creamFaint : palette.creamSoft,
                    }}
                  >
                    {cell.n}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
