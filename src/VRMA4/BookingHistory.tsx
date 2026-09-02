import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import {
  BOOKING_HISTORY,
  BOOKING_HISTORY_DURATION,
  SAFE_X,
  WIDTH,
} from "./timeline";
import { DrawRule, LabelBar, Numeral, SceneShell, Surface } from "./primitives";

/**
 * 0:24  "They don't know your booking history."
 *
 * Deliberately a different data structure than the comps shot: settled history
 * rather than live rates. Twelve completed periods, a hairline gold average,
 * and a density grid of prior occupancy underneath.
 */

const PANEL_W = WIDTH - SAFE_X * 2;
const CHART_H = 360;
const BAR_COUNT = 12;

const HISTORY = [
  0.52, 0.58, 0.61, 0.74, 0.83, 0.91, 0.88, 0.79, 0.66, 0.71, 0.63, 0.57,
];

const HistoryBars: React.FC = () => {
  const frame = useCurrentFrame();
  const barW = (PANEL_W - 88 - (BAR_COUNT - 1) * 14) / BAR_COUNT;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 14,
        height: CHART_H,
        position: "relative",
      }}
    >
      {HISTORY.map((value, i) => {
        const start =
          BOOKING_HISTORY.barsStart + i * BOOKING_HISTORY.barStagger;
        const grow = clampedInterp(
          frame,
          [start, start + BOOKING_HISTORY.barDur],
          [0, 1],
          easeOutCubic,
        );
        return (
          <div
            key={i}
            style={{
              width: barW,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                height: CHART_H * value * grow,
                borderRadius: 4,
                background:
                  i >= BAR_COUNT - 3
                    ? `linear-gradient(180deg, rgba(201,164,92,0.30) 0%, rgba(201,164,92,0.06) 100%)`
                    : `linear-gradient(180deg, rgba(167,167,165,0.46) 0%, rgba(167,167,165,0.14) 100%)`,
                borderTop: `2px solid ${i >= BAR_COUNT - 3 ? palette.gold : palette.graySoft}`,
                alignSelf: "flex-end",
                width: "100%",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export const BookingHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = fadeRise(frame, BOOKING_HISTORY.surfaceIn, 18, 12);

  return (
    <SceneShell
      duration={BOOKING_HISTORY_DURATION}
      outStart={BOOKING_HISTORY.outStart}
    >
      <Surface
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 630,
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
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <LabelBar width={188} height={9} color={palette.whiteFaint} />
            <LabelBar width={116} height={7} opacity={0.55} />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <Numeral value="71" size={40} />
            <Numeral value="%" size={20} color={palette.gray} weight={500} />
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <HistoryBars />
          {/* Trailing average, drawn only after the history has settled. */}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: CHART_H * 0.71,
              width: "100%",
            }}
          >
            <DrawRule
              start={BOOKING_HISTORY.averageLineStart}
              dur={BOOKING_HISTORY.averageLineDur}
              width={PANEL_W - 88}
              height={1}
              color={palette.goldSoft}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 26,
            paddingTop: 24,
            borderTop: `1px solid ${palette.hairline}`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <LabelBar key={i} width={38} height={6} opacity={0.4} />
          ))}
        </div>
      </Surface>
    </SceneShell>
  );
};
