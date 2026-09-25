import React from "react";
import { palette } from "./theme";

// Timeline: x-axis = time from "same point last year" → weekend
// y-axis = market occupancy %
// Journey A (early bookers): starts 60%, gently climbs → 65%
// Journey B (last-minute): starts 20%, climbs sharply → 65%

const W = 290;
const H = 150;
const PAD_L = 32;
const PAD_B = 24;
const CHART_W = W - PAD_L - 8;
const CHART_H = H - PAD_B - 8;

const yScale = (pct: number) => CHART_H - (pct / 80) * CHART_H + 8;
const xScale = (i: number, total: number) => PAD_L + (i / (total - 1)) * CHART_W;

const JOURNEY_A = [60, 61, 62, 63, 64, 65]; // same point → weekend (6 intervals)
const JOURNEY_B = [20, 22, 28, 38, 51, 65];
function toPath(values: number[]) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xScale(i, values.length).toFixed(1)},${yScale(v).toFixed(1)}`)
    .join(" ");
}

// Compute total SVG path length for a polyline
function pathLength(values: number[]) {
  let len = 0;
  for (let i = 1; i < values.length; i++) {
    const dx = xScale(i, values.length) - xScale(i - 1, values.length);
    const dy = yScale(values[i]) - yScale(values[i - 1]);
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

const LEN_A = pathLength(JOURNEY_A);
const LEN_B = pathLength(JOURNEY_B);

interface BookingTimelineProps {
  // 0–1 progress for drawing each journey line
  progressA: number;
  progressB: number;
  // highlight which scenario (undefined = none, "A" or "B")
  highlight?: "A" | "B" | "both";
  showSamePoint?: boolean; // show the vertical reference line at x=0
  showLabels?: boolean;
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({
  progressA,
  progressB,
  highlight,
  showSamePoint = false,
  showLabels = false,
}) => {
  const opA = highlight === "B" ? 0.28 : 1;
  const opB = highlight === "A" ? 0.28 : 1;

  const dashA = LEN_A * progressA;
  const dashB = LEN_B * progressB;

  const sameX = PAD_L; // x position of "same point" reference

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      {/* Grid lines */}
      {[20, 40, 60, 80].map((pct) => (
        <line
          key={pct}
          x1={PAD_L} y1={yScale(pct)}
          x2={PAD_L + CHART_W} y2={yScale(pct)}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={0.8}
          strokeDasharray="3 4"
        />
      ))}

      {/* Y-axis labels */}
      {[20, 40, 60].map((pct) => (
        <text
          key={pct}
          x={PAD_L - 6}
          y={yScale(pct) + 3.5}
          textAnchor="end"
          fontSize={8}
          fill="rgba(243,241,236,0.30)"
          fontFamily="sans-serif"
        >
          {pct}%
        </text>
      ))}

      {/* Baseline */}
      <line
        x1={PAD_L} y1={yScale(0) + 1}
        x2={PAD_L + CHART_W} y2={yScale(0) + 1}
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={0.8}
      />
      {/* Left axis */}
      <line
        x1={PAD_L} y1={8}
        x2={PAD_L} y2={yScale(0) + 1}
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={0.8}
      />

      {/* "Same point" reference line */}
      {showSamePoint && (
        <g>
          <line
            x1={sameX} y1={8}
            x2={sameX} y2={yScale(0)}
            stroke={palette.gold}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.6}
          />
          <text
            x={sameX + 4}
            y={14}
            fontSize={7}
            fill={palette.gold}
            fontFamily="sans-serif"
            opacity={0.85}
          >
            Same point
          </text>
        </g>
      )}

      {/* Journey A line — teal */}
      <path
        d={toPath(JOURNEY_A)}
        stroke={palette.teal}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opA}
        strokeDasharray={`${dashA} ${LEN_A}`}
      />
      {/* Journey A dot at same point */}
      {progressA > 0 && showSamePoint && (
        <g opacity={opA}>
          <circle cx={sameX} cy={yScale(60)} r={3.5} fill={palette.teal} opacity={0.85} />
          {showLabels && (
            <text
              x={sameX + 6}
              y={yScale(60) + 4}
              fontSize={9}
              fill={palette.teal}
              fontFamily="sans-serif"
              fontWeight={600}
            >
              60%
            </text>
          )}
        </g>
      )}

      {/* Journey B line — amber */}
      <path
        d={toPath(JOURNEY_B)}
        stroke={palette.amber}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opB}
        strokeDasharray={`${dashB} ${LEN_B}`}
      />
      {/* Journey B dot at same point */}
      {progressB > 0 && showSamePoint && (
        <g opacity={opB}>
          <circle cx={sameX} cy={yScale(20)} r={3.5} fill={palette.amber} opacity={0.85} />
          {showLabels && (
            <text
              x={sameX + 6}
              y={yScale(20) + 4}
              fontSize={9}
              fill={palette.amber}
              fontFamily="sans-serif"
              fontWeight={600}
            >
              20%
            </text>
          )}
        </g>
      )}

      {/* Convergence dot at 65% / weekend */}
      {(progressA >= 1 || progressB >= 1) && (
        <circle
          cx={xScale(5, 6)}
          cy={yScale(65)}
          r={4}
          fill={palette.gold}
          opacity={0.9}
          style={{ filter: `drop-shadow(0 0 5px ${palette.gold}80)` }}
        />
      )}
    </svg>
  );
};
