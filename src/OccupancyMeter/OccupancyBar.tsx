import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import {
  METER_H,
  METER_W,
  OCCUPANCY_FIRST,
  OCCUPANCY_SECOND,
  T,
} from "./timeline";

/**
 * The number made visible: a bar that climbs to 80, holds, then climbs again
 * to 90 — matching the line's own "80 or 90%" rather than settling on one
 * figure. Gold fill, since this is the specific claim the statement makes.
 */
export const OccupancyBar: React.FC = () => {
  const frame = useCurrentFrame();

  const trackOpacity = clampedInterp(
    frame,
    [T.meterTrackIn, T.meterTrackIn + T.meterTrackDur],
    [0, 1],
    easeOutCubic,
  );

  const pct =
    frame < T.riseTo90Start
      ? clampedInterp(
          frame,
          [T.fillTo80Start, T.fillTo80Start + T.fillTo80Dur],
          [0, OCCUPANCY_FIRST],
          easeOutCubic,
        )
      : clampedInterp(
          frame,
          [T.riseTo90Start, T.riseTo90Start + T.riseTo90Dur],
          [OCCUPANCY_FIRST, OCCUPANCY_SECOND],
          easeOutCubic,
        );

  const fillWidth = (pct / 100) * METER_W;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        opacity: trackOpacity,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 46,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: palette.warmGold,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {Math.round(pct)}%
      </span>

      <div
        style={{
          position: "relative",
          width: METER_W,
          height: METER_H,
          borderRadius: METER_H / 2,
          background: palette.charcoal,
          border: `1px solid ${palette.hairline}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: fillWidth,
            borderRadius: METER_H / 2,
            background: palette.warmGold,
          }}
        />
      </div>
    </div>
  );
};
