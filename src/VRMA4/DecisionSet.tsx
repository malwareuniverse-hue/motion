import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeRise, slowPush } from "./utils";
import {
  DECISION_SET,
  DECISION_SET_DURATION,
  DECISION_TERMS,
  HEIGHT,
  SAFE_X,
  WIDTH,
} from "./timeline";

/**
 * 0:43-1:04  optional native framework - the seven inputs PBM actually examines.
 *
 * This is the ONE place in the reel that carries typography inside the asset,
 * because the plan specifies exact wording and a sequential reveal on the word.
 * Wording is the script's own terminology, verbatim. "where we believe the
 * market is going next" is deliberately NOT an eighth label - it stays Emile's.
 *
 * Render `transparent` over Emile or the montage (ProRes 4444 / WebM alpha), or
 * leave the charcoal ground on for a full-frame beat.
 */

export type DecisionSetProps = {
  /** Drop the background so the grid keys over the camera track. */
  transparent: boolean;
};

const COLS = 2;
const GRID_W = WIDTH - SAFE_X * 2;
const COL_GAP = 28;
const CELL_W = (GRID_W - COL_GAP) / COLS;
const CELL_H = 132;
const ROW_GAP = 22;
const ROWS = Math.ceil(DECISION_TERMS.length / COLS);
const GRID_H = ROWS * CELL_H + (ROWS - 1) * ROW_GAP;
const GRID_TOP = (HEIGHT - GRID_H) / 2;

const Term: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const start = DECISION_SET.itemIn[index];
  const rise = fadeRise(frame, start, DECISION_SET.itemDur, 10);
  // The gold divider draws first, the word settles after it - never together.
  const divider = clampedInterp(
    frame,
    [start, start + DECISION_SET.dividerDur],
    [0, CELL_H - 34],
  );

  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const isLast = index === DECISION_TERMS.length - 1;

  return (
    <div
      style={{
        position: "absolute",
        left: col * (CELL_W + COL_GAP),
        top: row * (CELL_H + ROW_GAP),
        width: isLast && DECISION_TERMS.length % COLS === 1 ? GRID_W : CELL_W,
        height: CELL_H,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          width: 2,
          height: divider,
          background: palette.gold,
          borderRadius: 2,
          opacity: isLast ? 1 : 0.8,
        }}
      />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 36,
          fontWeight: 500,
          whiteSpace: "nowrap",
          letterSpacing: 0.2,
          lineHeight: 1.15,
          color: isLast ? palette.gold : palette.white,
          opacity: rise.opacity,
          transform: `translateY(${rise.translateY}px)`,
        }}
      >
        {DECISION_TERMS[index]}
      </span>
    </div>
  );
};

export const DecisionSet: React.FC<DecisionSetProps> = ({ transparent }) => {
  const frame = useCurrentFrame();
  const scale = slowPush(frame, DECISION_SET_DURATION, 1, 0.99);
  const out = clampedInterp(
    frame,
    [DECISION_SET.outStart, DECISION_SET.outStart + DECISION_SET.outDur],
    [1, 0],
  );
  const frameRule = clampedInterp(
    frame,
    [DECISION_SET.frameStart, DECISION_SET.frameStart + DECISION_SET.frameDur],
    [0, GRID_W],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparent ? "transparent" : palette.nearBlack,
      }}
    >
      {!transparent ? (
        <AbsoluteFill
          style={{
            background: `radial-gradient(120% 70% at 50% 26%, ${palette.charcoal} 0%, ${palette.nearBlack} 64%)`,
          }}
        />
      ) : null}

      <AbsoluteFill style={{ opacity: out, transform: `scale(${scale})` }}>
        <div
          style={{
            position: "absolute",
            left: SAFE_X,
            top: GRID_TOP - 74,
            width: frameRule,
            height: 1,
            background: palette.hairlineStrong,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: SAFE_X,
            top: GRID_TOP,
            width: GRID_W,
            height: GRID_H,
          }}
        >
          {DECISION_TERMS.map((term, i) => (
            <Term key={term} index={i} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: SAFE_X,
            top: GRID_TOP + GRID_H + 74,
            width: frameRule,
            height: 1,
            background: palette.hairlineStrong,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const decisionSetDefaults: DecisionSetProps = { transparent: false };
