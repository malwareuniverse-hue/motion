import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import { MARKET_PACE, MARKET_PACE_DURATION, SAFE_X, WIDTH } from "./timeline";
import { LabelBar, Numeral, SceneShell, Surface } from "./primitives";

/**
 * 0:43-0:49  "Market pace,"
 *
 * Cumulative pace against the prior period. One gold line, one muted line, and
 * a marker on the current position. Slow analytical progression - no ticker,
 * no green/red, no arrows.
 */

const PANEL_W = WIDTH - SAFE_X * 2;
const CHART_W = PANEL_W - 88;
const CHART_H = 420;

const CURRENT = [
  0.06, 0.13, 0.21, 0.32, 0.44, 0.53, 0.62, 0.71, 0.79, 0.86, 0.91,
];
const PRIOR = [0.05, 0.11, 0.17, 0.25, 0.34, 0.42, 0.5, 0.57, 0.64, 0.7, 0.75];

const toPath = (series: number[]) =>
  series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * CHART_W;
      const y = CHART_H - v * CHART_H;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

const PaceLine: React.FC<{
  series: number[];
  color: string;
  width: number;
  start: number;
  dur: number;
  dashed?: boolean;
}> = ({ series, color, width, start, dur, dashed }) => {
  const frame = useCurrentFrame();
  const length = CHART_W * 1.35;
  const drawn = clampedInterp(
    frame,
    [start, start + dur],
    [0, length],
    easeOutCubic,
  );

  return (
    <path
      d={toPath(series)}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? `6 10` : `${drawn} ${length}`}
      strokeDashoffset={dashed ? -drawn : 0}
      opacity={
        dashed ? clampedInterp(frame, [start, start + dur], [0, 0.75]) : 1
      }
    />
  );
};

const CurrentMarker: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = clampedInterp(
    frame,
    [MARKET_PACE.markerStart, MARKET_PACE.markerStart + 14],
    [0, 1],
  );
  const last = CURRENT[CURRENT.length - 1];
  return (
    <g opacity={opacity}>
      <line
        x1={CHART_W}
        y1={CHART_H - last * CHART_H}
        x2={CHART_W}
        y2={CHART_H}
        stroke={palette.goldFaint}
        strokeWidth={1}
      />
      <circle
        cx={CHART_W}
        cy={CHART_H - last * CHART_H}
        r={6}
        fill={palette.gold}
      />
    </g>
  );
};

export const MarketPace: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = fadeRise(frame, MARKET_PACE.surfaceIn, 18, 12);
  const axis = clampedInterp(
    frame,
    [MARKET_PACE.axisStart, MARKET_PACE.axisStart + 20],
    [0, 1],
  );

  return (
    <SceneShell duration={MARKET_PACE_DURATION} outStart={MARKET_PACE.outStart}>
      <Surface
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 560,
          width: PANEL_W,
          padding: 44,
          opacity: rise.opacity,
          transform: `translateY(${rise.translateY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 44,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <LabelBar width={162} height={9} color={palette.whiteFaint} />
            <LabelBar width={104} height={7} opacity={0.55} />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <Numeral value="+18" size={38} color={palette.gold} />
            <Numeral value="%" size={18} color={palette.gray} weight={500} />
          </div>
        </div>

        <svg
          width={CHART_W}
          height={CHART_H}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        >
          <g opacity={axis * 0.5}>
            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1={0}
                y1={CHART_H * g}
                x2={CHART_W}
                y2={CHART_H * g}
                stroke={palette.hairline}
                strokeWidth={1}
              />
            ))}
            <line
              x1={0}
              y1={CHART_H}
              x2={CHART_W}
              y2={CHART_H}
              stroke={palette.hairlineStrong}
              strokeWidth={1}
            />
          </g>
          <PaceLine
            series={PRIOR}
            color={palette.graySoft}
            width={2}
            start={MARKET_PACE.priorLineStart}
            dur={MARKET_PACE.priorLineDur}
          />
          <PaceLine
            series={CURRENT}
            color={palette.gold}
            width={3}
            start={MARKET_PACE.currentLineStart}
            dur={MARKET_PACE.currentLineDur}
          />
          <CurrentMarker />
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <LabelBar key={i} width={40} height={6} opacity={0.4 * axis} />
          ))}
        </div>
      </Surface>
    </SceneShell>
  );
};
