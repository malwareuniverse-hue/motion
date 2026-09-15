import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, smoothPath, trendYAt } from "./utils";
import {
  BASELINE_Y,
  CONTENT_LEFT,
  CONTENT_RIGHT,
  CONTENT_W,
  DECLINE_END_Y,
  HEIGHT,
  T,
  TREND_SAMPLES,
  WIDTH,
} from "./timeline";

/**
 * The decline itself: a soft-white line bleeding away from the gold baseline,
 * with the growing gap between them shaded in — a chart's loss area, without
 * a single price tag or dollar sign. Revealed left to right, like the rest of
 * this system's process animations.
 */
export const TrendArea: React.FC = () => {
  const frame = useCurrentFrame();

  const revealFrac = clampedInterp(
    frame,
    [T.declineStart, T.declineStart + T.declineDur],
    [0, 1],
    easeOutCubic,
  );
  const revealWidth = CONTENT_LEFT + revealFrac * CONTENT_W;

  const points = useMemo(() => {
    return Array.from({ length: TREND_SAMPLES + 1 }, (_, i) => {
      const xFrac = i / TREND_SAMPLES;
      const x = CONTENT_LEFT + xFrac * CONTENT_W;
      const y = trendYAt(xFrac, frame, BASELINE_Y, DECLINE_END_Y);
      return [x, y] as [number, number];
    });
  }, [frame]);

  const linePath = smoothPath(points);
  const fillPath = `${linePath} L ${CONTENT_RIGHT} ${BASELINE_Y} L ${CONTENT_LEFT} ${BASELINE_Y} Z`;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: revealWidth,
        height: HEIGHT,
        overflow: "hidden",
      }}
    >
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <path d={fillPath} fill={palette.lossFill} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke={palette.softWhite}
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.88}
        />
      </svg>
    </div>
  );
};
