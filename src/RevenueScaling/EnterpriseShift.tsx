import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import {
  beatOpacity,
  clampedInterp,
  easeInOutCubic,
  easeOutCubic,
  fadeUp,
  seeded,
} from "./utils";
import {
  HEIGHT,
  SHIFT_COLS,
  SHIFT_FRAME_PAD,
  SHIFT_GRID_H,
  SHIFT_GRID_LEFT,
  SHIFT_GRID_TOP,
  SHIFT_GRID_W,
  SHIFT_NODE,
  SHIFT_NODE_COUNT,
  SHIFT_NODE_GAP,
  T,
  WIDTH,
} from "./timeline";

const NODES = Array.from({ length: SHIFT_NODE_COUNT }, (_, i) => {
  const col = i % SHIFT_COLS;
  const row = Math.floor(i / SHIFT_COLS);
  return {
    i,
    // scattered: every property managed on its own, at its own size
    sx: 220 + seeded(i, 11) * 1420,
    sy: 220 + seeded(i, 12) * 560,
    ssize: 92 + seeded(i, 13) * 72,
    srot: (seeded(i, 14) - 0.5) * 16,
    // resolved: one grid, one scale, one system
    gx: SHIFT_GRID_LEFT + col * (SHIFT_NODE + SHIFT_NODE_GAP),
    gy: SHIFT_GRID_TOP + row * (SHIFT_NODE + SHIFT_NODE_GAP),
    delay: seeded(i, 15) * 18,
  };
});

const FRAME_W = SHIFT_GRID_W + SHIFT_FRAME_PAD * 2;
const FRAME_H = SHIFT_GRID_H + SHIFT_FRAME_PAD * 2;
const FRAME_LEFT = SHIFT_GRID_LEFT - SHIFT_FRAME_PAD;
const FRAME_TOP = SHIFT_GRID_TOP - SHIFT_FRAME_PAD;
const PERIMETER = 2 * (FRAME_W + FRAME_H);

/**
 * PROPERTY BY PROPERTY -> ENTERPRISE SYSTEM (1:07–1:19). Twelve independently
 * managed properties, each its own size and angle, resolve into one grid inside
 * a single gold frame. The motion is the argument.
 */
export const EnterpriseShift: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = beatOpacity(
    frame,
    T.shiftNodesIn,
    1,
    T.shiftOut,
    T.shiftOutDur,
  );
  if (opacity <= 0) return null;

  const frameDraw = clampedInterp(
    frame,
    [T.shiftFrameIn, T.shiftFrameIn + 46],
    [0, 1],
    easeOutCubic,
  );
  const labelBefore = clampedInterp(
    frame,
    [T.shiftLabelSwap, T.shiftLabelSwap + 20],
    [1, 0],
  );
  const labelAfter = clampedInterp(
    frame,
    [T.shiftLabelSwap + 8, T.shiftLabelSwap + 34],
    [0, 1],
    easeOutCubic,
  );
  const labelIn = fadeUp(frame, T.shiftLabelIn, 26, 12);
  const sub = fadeUp(frame, T.shiftSubIn, 28, 14);

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <svg
        width={WIDTH}
        height={HEIGHT}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        <rect
          x={FRAME_LEFT}
          y={FRAME_TOP}
          width={FRAME_W}
          height={FRAME_H}
          fill="none"
          stroke={palette.gold}
          strokeWidth={1.5}
          strokeDasharray={PERIMETER}
          strokeDashoffset={PERIMETER * (1 - frameDraw)}
          opacity={0.7}
        />
      </svg>

      {NODES.map((n) => {
        const appear = fadeUp(frame, T.shiftNodesIn + n.delay, 24, 12);
        const t = clampedInterp(
          frame,
          [
            T.shiftConvergeStart + n.delay,
            T.shiftConvergeStart + n.delay + T.shiftConvergeDur,
          ],
          [0, 1],
          easeInOutCubic,
        );
        // idle drift while the properties are still managed separately
        const drift = (1 - t) * Math.sin(frame * 0.02 + n.i) * 5;

        // interpolate centres, not corners, so the boxes converge on the grid
        // instead of drifting by half the difference in their scattered sizes
        const size = n.ssize + (SHIFT_NODE - n.ssize) * t;
        const cx =
          n.sx +
          n.ssize / 2 +
          (n.gx + SHIFT_NODE / 2 - (n.sx + n.ssize / 2)) * t;
        const cy =
          n.sy +
          n.ssize / 2 +
          (n.gy + SHIFT_NODE / 2 - (n.sy + n.ssize / 2)) * t;
        const x = cx - size / 2 + drift;
        const y = cy - size / 2 + drift * 0.6;

        return (
          <div
            key={n.i}
            style={{
              position: "absolute",
              left: x,
              top: y + appear.translateY,
              width: size,
              height: size,
              background: palette.charcoal,
              border: `1px solid ${t > 0.5 ? palette.goldRule : palette.panelBorder}`,
              transform: `rotate(${n.srot * (1 - t)}deg)`,
              opacity: appear.opacity * (0.7 + t * 0.3),
            }}
          >
            {/* roofline — a property, not a generic box */}
            <div
              style={{
                position: "absolute",
                left: "22%",
                right: "22%",
                top: "30%",
                height: 1,
                background: t > 0.5 ? palette.gold : palette.whiteFaint,
                opacity: 0.6,
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: FRAME_TOP + FRAME_H + 74,
          textAlign: "center",
          opacity: labelIn.opacity,
          transform: `translateY(${labelIn.translateY}px)`,
        }}
      >
        <div style={{ position: "relative", height: 66 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              fontFamily: poppins,
              fontSize: 46,
              fontWeight: 600,
              letterSpacing: 3,
              color: palette.gray,
              opacity: labelBefore,
            }}
          >
            PROPERTY BY PROPERTY
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              fontFamily: poppins,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: 2,
              color: palette.white,
              opacity: labelAfter,
            }}
          >
            AN <span style={{ color: palette.gold }}>ENTERPRISE-LEVEL</span>{" "}
            REVENUE SYSTEM
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 400,
            letterSpacing: 2.6,
            color: palette.gray,
            opacity: sub.opacity,
            transform: `translateY(${sub.translateY}px)`,
          }}
        >
          ONE SYSTEM · EVERY PROPERTY · EVERY MARKET
        </div>
      </div>
    </div>
  );
};
