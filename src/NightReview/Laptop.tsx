import React from "react";
import { palette } from "./theme";
import { DashboardScreen } from "./DashboardScreen";
import { clampedInterp, easeOutCubic } from "./utils";
import { T } from "./timeline";

const SCREEN_X = 360;
const SCREEN_Y = 780;
const SCREEN_W = 390;
const SCREEN_H = 270;
const BEZEL = 14;

export const Laptop: React.FC<{ frame: number }> = ({ frame }) => {
  const t = clampedInterp(frame, [T.laptopStart, T.laptopStart + T.laptopDur], [0, 1], easeOutCubic);
  if (t <= 0) return null;

  const openScale = 0.25 + t * 0.75;
  const originX = SCREEN_X + SCREEN_W / 2;
  const originY = SCREEN_Y + SCREEN_H;
  const hingeTransform = `translate(${originX} ${originY}) scale(1 ${openScale}) translate(${-originX} ${-originY})`;

  return (
    <>
      <svg
        viewBox="0 0 1080 1350"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, display: "block", opacity: t }}
      >
        <g transform={hingeTransform}>
          <rect
            x={SCREEN_X}
            y={SCREEN_Y}
            width={SCREEN_W}
            height={SCREEN_H}
            rx={10}
            fill={palette.ink}
            stroke={palette.gold}
            strokeWidth={3}
          />
        </g>
        <path
          d={`M${SCREEN_X - 30} ${SCREEN_Y + SCREEN_H + 8} L${SCREEN_X + SCREEN_W + 30} ${SCREEN_Y + SCREEN_H + 8} L${SCREEN_X + SCREEN_W + 10} ${SCREEN_Y + SCREEN_H + 44} L${SCREEN_X - 10} ${SCREEN_Y + SCREEN_H + 44} Z`}
          fill={palette.ink}
          stroke={palette.gold}
          strokeWidth={2}
          opacity={0.9}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: SCREEN_X + BEZEL,
          top: SCREEN_Y + BEZEL,
          width: SCREEN_W - BEZEL * 2,
          height: SCREEN_H - BEZEL * 2,
          borderRadius: 4,
          overflow: "hidden",
          opacity: t,
          transform: `scaleY(${openScale})`,
          transformOrigin: `${(SCREEN_W - BEZEL * 2) / 2}px ${SCREEN_H - BEZEL}px`,
        }}
      >
        <DashboardScreen frame={frame} />
      </div>
    </>
  );
};
