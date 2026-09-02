import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, fadeRise, seeded } from "./utils";
import {
  BOOKING_WINDOWS,
  BOOKING_WINDOWS_DURATION,
  SAFE_X,
  WIDTH,
} from "./timeline";
import { LabelBar, SceneShell, Surface } from "./primitives";

/**
 * 0:43-0:49  "booking windows,"
 *
 * Two readings of the same idea: lead-time buckets on top, and a forward
 * calendar underneath where reservations land on future dates. Pairs directly
 * with MarketPace as one analytical beat if the edit wants a single clip.
 */

const PANEL_W = WIDTH - SAFE_X * 2;
const BUCKETS = [0.28, 0.46, 0.72, 0.95, 0.81, 0.6, 0.42, 0.3];
const CAL_COLS = 7;
const CAL_ROWS = 5;

const LeadTimeBars: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 250 }}
    >
      {BUCKETS.map((v, i) => {
        const start =
          BOOKING_WINDOWS.barsStart + i * BOOKING_WINDOWS.barStagger;
        const grow = clampedInterp(
          frame,
          [start, start + BOOKING_WINDOWS.barDur],
          [0, 1],
          easeOutCubic,
        );
        const peak = v > 0.9;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                height: 250 * v * grow,
                borderRadius: 4,
                background: peak ? palette.goldFaint : "rgba(167,167,165,0.12)",
                borderTop: `2px solid ${peak ? palette.gold : palette.graySoft}`,
                marginTop: "auto",
              }}
            />
            <LabelBar width={30} height={6} opacity={0.4 * grow} />
          </div>
        );
      })}
    </div>
  );
};

const ForwardCalendar: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${CAL_COLS}, 1fr)`,
        gap: 12,
      }}
    >
      {Array.from({ length: CAL_COLS * CAL_ROWS }).map((_, i) => {
        const start =
          BOOKING_WINDOWS.calendarStart +
          i * BOOKING_WINDOWS.calendarStagger * 0.28;
        const on = clampedInterp(frame, [start, start + 16], [0, 1]);
        // Bookings concentrate further out - that spread is the booking window.
        const row = Math.floor(i / CAL_COLS);
        const far = row >= 2;
        const booked = seeded(i, 7) > 0.74 - row * 0.11;
        return (
          <div
            key={i}
            style={{
              height: 68,
              borderRadius: 6,
              border: `1px solid ${booked ? "rgba(201,164,92,0.40)" : palette.hairline}`,
              background: booked
                ? far
                  ? "rgba(201,164,92,0.15)"
                  : "rgba(201,164,92,0.07)"
                : "rgba(167,167,165,0.05)",
              opacity: on,
              display: "flex",
              alignItems: "flex-end",
              padding: 8,
            }}
          >
            <LabelBar
              width={booked ? 26 : 14}
              height={5}
              opacity={booked ? 0.7 : 0.28}
              color={booked ? "rgba(201,164,92,0.55)" : palette.graySoft}
            />
          </div>
        );
      })}
    </div>
  );
};

export const BookingWindows: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = fadeRise(frame, BOOKING_WINDOWS.surfaceIn, 18, 12);

  return (
    <SceneShell
      duration={BOOKING_WINDOWS_DURATION}
      outStart={BOOKING_WINDOWS.outStart}
    >
      <Surface
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 400,
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
            marginBottom: 40,
          }}
        >
          <LabelBar width={176} height={9} color={palette.whiteFaint} />
          <LabelBar width={112} height={7} opacity={0.55} />
        </div>
        <LeadTimeBars />
      </Surface>

      <Surface
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 1050,
          width: PANEL_W,
          padding: 40,
          opacity: rise.opacity,
          transform: `translateY(${rise.translateY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 26,
          }}
        >
          {Array.from({ length: CAL_COLS }).map((_, i) => (
            <LabelBar key={i} width={22} height={6} opacity={0.4} />
          ))}
        </div>
        <ForwardCalendar />
      </Surface>
    </SceneShell>
  );
};
