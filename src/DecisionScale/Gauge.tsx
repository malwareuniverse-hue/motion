import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { GAUGE_CENTER, GAUGE_R, T, TICK_ANGLES, needleAngleAt } from "./timeline";

const toRad = (deg: number) => (deg * Math.PI) / 180;
const pointAt = (deg: number, r: number) => ({
  x: GAUGE_CENTER.x + r * Math.cos(toRad(deg)),
  y: GAUGE_CENTER.y + r * Math.sin(toRad(deg)),
});

export const Gauge: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = clampedInterp(frame, [T.rigInStart, T.rigInStart + T.rigInDur], [0, 1]);
  if (opacity <= 0) return null;

  const needleDeg = needleAngleAt(frame);
  const needleTip = pointAt(needleDeg, GAUGE_R - 42);
  const rimStart = pointAt(-176, GAUGE_R);
  const rimEnd = pointAt(-4, GAUGE_R);

  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity }}>
      <path
        d={`M ${rimStart.x} ${rimStart.y} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${rimEnd.x} ${rimEnd.y}`}
        fill="none"
        stroke={palette.lineFaint}
        strokeWidth={1.4}
      />
      {TICK_ANGLES.map((deg) => {
        const inner = pointAt(deg, GAUGE_R - 22);
        const outer = pointAt(deg, GAUGE_R - 4);
        return (
          <line
            key={deg}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke={palette.line}
            strokeWidth={1.6}
          />
        );
      })}
      <line
        x1={GAUGE_CENTER.x}
        y1={GAUGE_CENTER.y}
        x2={needleTip.x}
        y2={needleTip.y}
        stroke={palette.amber}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={GAUGE_CENTER.x} cy={GAUGE_CENTER.y} r={9} fill={palette.amber} />
    </svg>
  );
};
