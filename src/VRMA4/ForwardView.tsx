import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import { FORWARD_VIEW, FORWARD_VIEW_DURATION, SAFE_X, WIDTH } from "./timeline";
import { LabelBar, SceneShell, Surface } from "./primitives";

/**
 * 0:58-1:04  "and where we believe the market is going next."
 *
 * Predictive rather than historical: a settled solid curve, then a hairline
 * forward projection with a restrained confidence band. Nothing in this frame
 * claims certainty - the band widens as it goes out.
 *
 * Per the plan, the montage should END on a human decision-maker. Cut from this
 * clip to the operator/analyst shot; do not end the section on the software.
 */

const PANEL_W = WIDTH - SAFE_X * 2;
const CHART_W = PANEL_W - 88;
const CHART_H = 400;
const SPLIT = 0.52;

const KNOWN = [0.3, 0.36, 0.34, 0.44, 0.51, 0.49, 0.58];
const FORECAST = [0.58, 0.64, 0.69, 0.73, 0.79, 0.84];

const px = (i: number, count: number, offset: number, span: number) =>
  offset + (i / (count - 1)) * span;

const knownPath = KNOWN.map((v, i) => {
  const x = px(i, KNOWN.length, 0, CHART_W * SPLIT);
  return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${(CHART_H - v * CHART_H).toFixed(1)}`;
}).join(" ");

const forecastPath = FORECAST.map((v, i) => {
  const x = px(i, FORECAST.length, CHART_W * SPLIT, CHART_W * (1 - SPLIT));
  return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${(CHART_H - v * CHART_H).toFixed(1)}`;
}).join(" ");

const bandPath = (() => {
  const upper = FORECAST.map((v, i) => {
    const x = px(i, FORECAST.length, CHART_W * SPLIT, CHART_W * (1 - SPLIT));
    const spread = 0.02 + (i / (FORECAST.length - 1)) * 0.1;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${(CHART_H - (v + spread) * CHART_H).toFixed(1)}`;
  }).join(" ");
  const lowerPath = FORECAST.slice()
    .reverse()
    .map((v, i) => {
      const idx = FORECAST.length - 1 - i;
      const x = px(
        idx,
        FORECAST.length,
        CHART_W * SPLIT,
        CHART_W * (1 - SPLIT),
      );
      const spread = 0.02 + (idx / (FORECAST.length - 1)) * 0.1;
      return `L ${x.toFixed(1)} ${(CHART_H - (v - spread) * CHART_H).toFixed(1)}`;
    })
    .join(" ");
  return `${upper} ${lowerPath} Z`;
})();

export const ForwardView: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = fadeRise(frame, FORWARD_VIEW.surfaceIn, 18, 12);
  const axis = clampedInterp(
    frame,
    [FORWARD_VIEW.axisStart, FORWARD_VIEW.axisStart + 20],
    [0, 1],
  );

  const knownLen = CHART_W;
  const knownDrawn = clampedInterp(
    frame,
    [FORWARD_VIEW.knownStart, FORWARD_VIEW.knownStart + FORWARD_VIEW.knownDur],
    [0, knownLen],
    easeOutCubic,
  );
  const forecastDrawn = clampedInterp(
    frame,
    [
      FORWARD_VIEW.forecastStart,
      FORWARD_VIEW.forecastStart + FORWARD_VIEW.forecastDur,
    ],
    [0, knownLen],
    easeOutCubic,
  );
  const bandOpacity = clampedInterp(
    frame,
    [FORWARD_VIEW.bandStart, FORWARD_VIEW.bandStart + FORWARD_VIEW.bandDur],
    [0, 0.5],
  );

  return (
    <SceneShell
      duration={FORWARD_VIEW_DURATION}
      outStart={FORWARD_VIEW.outStart}
    >
      <Surface
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 580,
          width: PANEL_W,
          padding: 44,
          opacity: rise.opacity,
          transform: `translateY(${rise.translateY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 44,
          }}
        >
          <LabelBar width={204} height={9} color={palette.whiteFaint} />
          <LabelBar width={128} height={7} opacity={0.55} />
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

          {/* The line between what is known and what is projected. */}
          <line
            x1={CHART_W * SPLIT}
            y1={0}
            x2={CHART_W * SPLIT}
            y2={CHART_H}
            stroke={palette.hairlineStrong}
            strokeWidth={1}
            strokeDasharray="4 8"
            opacity={axis * 0.8}
          />

          <path d={bandPath} fill={palette.goldFaint} opacity={bandOpacity} />

          <path
            d={knownPath}
            fill="none"
            stroke={palette.white}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${knownDrawn} ${knownLen}`}
            opacity={0.85}
          />
          <path
            d={forecastPath}
            fill="none"
            stroke={palette.gold}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${forecastDrawn} ${knownLen}`}
          />
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <LabelBar
              key={i}
              width={34}
              height={6}
              opacity={(i > 2 ? 0.22 : 0.4) * axis}
            />
          ))}
        </div>
      </Surface>
    </SceneShell>
  );
};
