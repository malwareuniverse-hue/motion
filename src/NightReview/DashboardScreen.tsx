import React from "react";
import { palette } from "./theme";
import { clampedInterp, springIn } from "./utils";
import { BAR_ROWS, HEAT_ROWS, T } from "./timeline";

const CHART_DATA = [0.4, 0.55, 0.35, 0.6, 0.5, 0.75, 0.6, 0.8, 0.65, 0.9, 0.7, 0.85, 0.75, 0.95];
const CHART_W = 360;
const CHART_H = 60;
const CHART_TOP = 16;

const chartPoint = (i: number) => {
  const x = (i / (CHART_DATA.length - 1)) * CHART_W;
  const y = CHART_TOP + CHART_H - CHART_DATA[i] * CHART_H;
  return { x, y };
};

const linePath = CHART_DATA.map((_, i) => {
  const p = chartPoint(i);
  return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
}).join(" ");

const areaPath = `${linePath} L${CHART_W} ${CHART_TOP + CHART_H} L0 ${CHART_TOP + CHART_H} Z`;

const DONUT_R = 24;
const DONUT_C = 2 * Math.PI * DONUT_R;

export const DashboardScreen: React.FC<{ frame: number }> = ({ frame }) => {
  const screenT = clampedInterp(frame, [T.screenOnStart, T.screenOnStart + T.screenOnDur], [0, 1]);
  if (screenT <= 0) return null;

  const chartT = clampedInterp(frame, [T.chartDrawStart, T.chartDrawStart + T.chartDrawDur], [0, 1]);
  const donutT = clampedInterp(frame, [T.donutStart, T.donutStart + T.donutDur], [0, 1]);

  return (
    <svg
      viewBox="0 0 400 260"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, display: "block", opacity: screenT }}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x={0} y={0} width={400} height={260} fill={palette.screenBg} />

      {/* status row */}
      <g opacity={0.7}>
        <circle cx={14} cy={12} r={3} fill={palette.amber} />
        <rect x={26} y={9} width={54} height={6} rx={3} fill={palette.creamFaint} />
        <rect x={330} y={9} width={54} height={6} rx={3} fill={palette.creamFaint} />
      </g>

      {/* sparkline chart */}
      <g transform="translate(20 24)" clipPath={`inset(0 ${(1 - chartT) * 100}% 0 0)`}>
        <path d={areaPath} fill={palette.amber} opacity={0.14} />
        <path d={linePath} stroke={palette.amber} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* heatmap */}
      <g transform="translate(20 130)">
        {HEAT_ROWS.map((row, r) =>
          row.map((hot, c) => {
            const idx = r * row.length + c;
            const start = T.heatStart + idx * T.heatStagger;
            const t = springIn(frame, start, 30, { damping: 14, stiffness: 240, mass: 0.5 });
            const tC = Math.max(0, Math.min(t, 1));
            return (
              <rect
                key={`${r}-${c}`}
                x={c * 14}
                y={r * 14}
                width={10}
                height={10}
                rx={2}
                fill={hot ? palette.amber : palette.creamFaint}
                opacity={hot ? 0.35 + tC * 0.65 : 0.18 + tC * 0.12}
                transform={`scale(${0.6 + tC * 0.4})`}
                style={{ transformOrigin: `${c * 14 + 5}px ${r * 14 + 5}px` }}
              />
            );
          }),
        )}
      </g>

      {/* bar rows */}
      <g transform="translate(220 128)">
        {BAR_ROWS.map((v, i) => {
          const start = T.barsStart + i * T.barStagger;
          const t = clampedInterp(frame, [start, start + T.barDur], [0, 1]);
          return (
            <g key={i} transform={`translate(0 ${i * 16})`}>
              <rect x={0} y={0} width={70} height={6} rx={3} fill={palette.creamFaint} opacity={0.3} />
              <rect x={0} y={0} width={70 * v * t} height={6} rx={3} fill={palette.gold} />
            </g>
          );
        })}
      </g>

      {/* donut */}
      <g transform="translate(345 190)">
        <circle r={DONUT_R} fill="none" stroke={palette.creamFaint} strokeWidth={7} opacity={0.3} />
        <circle
          r={DONUT_R}
          fill="none"
          stroke={palette.amber}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={DONUT_C}
          strokeDashoffset={DONUT_C * (1 - 0.72 * donutT)}
          transform="rotate(-90)"
        />
      </g>
    </svg>
  );
};
