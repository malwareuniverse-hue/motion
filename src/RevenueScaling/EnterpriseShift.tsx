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
import { shiftGrid, useLayout } from "./layout";
import { SHIFT_NODE_COUNT, T } from "./timeline";

/**
 * PROPERTY BY PROPERTY -> ENTERPRISE SYSTEM (1:07–1:19). Twelve independently
 * managed properties, each its own size and angle, resolve into one grid inside
 * a single gold frame. The motion is the argument. The grid is 4x3 in 16:9 and
 * 3x4 in 9:16; the scatter is expressed in fractions of the frame so it fills
 * either one.
 */
export const EnterpriseShift: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();
  const grid = shiftGrid(l, SHIFT_NODE_COUNT);

  const nodes = React.useMemo(() => {
    const s = l.shift.scatter;
    return Array.from({ length: SHIFT_NODE_COUNT }, (_, i) => ({
      i,
      // scattered: every property managed on its own, at its own size
      sx: (s.x0 + seeded(i, 11) * (s.x1 - s.x0)) * l.width,
      sy: (s.y0 + seeded(i, 12) * (s.y1 - s.y0)) * l.height,
      ssize: l.shift.node * (0.61 + seeded(i, 13) * 0.48),
      srot: (seeded(i, 14) - 0.5) * 16,
      // resolved: one grid, one scale, one system
      gx: grid.x(i),
      gy: grid.y(i),
      delay: seeded(i, 15) * 18,
    }));
  }, [l, grid]);

  const opacity = beatOpacity(
    frame,
    T.shiftNodesIn,
    1,
    T.shiftOut,
    T.shiftOutDur,
  );
  if (opacity <= 0) return null;

  const perimeter = 2 * (grid.frameW + grid.frameH);
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
        width={l.width}
        height={l.height}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        <rect
          x={grid.frameLeft}
          y={grid.frameTop}
          width={grid.frameW}
          height={grid.frameH}
          fill="none"
          stroke={palette.gold}
          strokeWidth={1.5}
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter * (1 - frameDraw)}
          opacity={0.7}
        />
      </svg>

      {nodes.map((n) => {
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
        const size = n.ssize + (l.shift.node - n.ssize) * t;
        const cx =
          n.sx +
          n.ssize / 2 +
          (n.gx + l.shift.node / 2 - (n.sx + n.ssize / 2)) * t;
        const cy =
          n.sy +
          n.ssize / 2 +
          (n.gy + l.shift.node / 2 - (n.sy + n.ssize / 2)) * t;

        return (
          <div
            key={n.i}
            style={{
              position: "absolute",
              left: cx - size / 2 + drift,
              top: cy - size / 2 + drift * 0.6 + appear.translateY,
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
          top: grid.frameTop + grid.frameH + 74,
          padding: `0 ${l.margin}px`,
          textAlign: "center",
          opacity: labelIn.opacity,
          transform: `translateY(${labelIn.translateY}px)`,
        }}
      >
        <div style={{ position: "relative", height: l.portrait ? 120 : 66 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              fontFamily: poppins,
              fontSize: l.portrait ? 40 : 46,
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
              fontSize: l.type.h2,
              fontWeight: 700,
              letterSpacing: 2,
              lineHeight: 1.18,
              color: palette.white,
              opacity: labelAfter,
            }}
          >
            AN <span style={{ color: palette.gold }}>ENTERPRISE-LEVEL</span>
            {l.portrait ? <br /> : " "}
            REVENUE SYSTEM
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            fontFamily: poppins,
            fontSize: l.portrait ? 22 : 26,
            fontWeight: 400,
            letterSpacing: l.portrait ? 1.8 : 2.6,
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
