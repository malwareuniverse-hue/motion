import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { HEIGHT, T, WIDTH } from "./timeline";

const FRAME_W = 1020;
const FRAME_H = 400;
const PERIMETER = 2 * (FRAME_W + FRAME_H);

/**
 * VRMA NASHVILLE (1:00–1:06). Reusable event/chapter card: charcoal surface,
 * a single thin gold frame that draws on, no other decoration.
 */
export const EventCard: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = beatOpacity(frame, T.eventIn, 1, T.eventOut, T.eventOutDur);
  if (opacity <= 0) return null;

  const panel = fadeUp(frame, T.eventIn, 30, 16);
  const draw = clampedInterp(
    frame,
    [T.eventFrameIn, T.eventFrameIn + 40],
    [0, 1],
    easeOutCubic,
  );
  const title = fadeUp(frame, T.eventIn + 14, 28, 14);
  const sub = fadeUp(frame, T.eventSubIn, 28, 14);

  const left = (WIDTH - FRAME_W) / 2;
  const top = (HEIGHT - FRAME_H) / 2;

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <div
        style={{
          position: "absolute",
          left,
          top,
          width: FRAME_W,
          height: FRAME_H,
          background: palette.panel,
          opacity: panel.opacity,
          transform: `translateY(${panel.translateY}px)`,
        }}
      />

      <svg
        width={WIDTH}
        height={HEIGHT}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        <rect
          x={left}
          y={top}
          width={FRAME_W}
          height={FRAME_H}
          fill="none"
          stroke={palette.gold}
          strokeWidth={1.5}
          strokeDasharray={PERIMETER}
          strokeDashoffset={PERIMETER * (1 - draw)}
          opacity={0.75}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left,
          top,
          width: FRAME_W,
          height: FRAME_H,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 5,
            color: palette.gold,
            opacity: title.opacity,
            transform: `translateY(${title.translateY}px)`,
          }}
        >
          LET&rsquo;S HAVE THE CONVERSATION AT
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 118,
            fontWeight: 800,
            letterSpacing: 6,
            color: palette.white,
            opacity: title.opacity,
            transform: `translateY(${title.translateY}px)`,
          }}
        >
          VRMA
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: 8,
            color: palette.whiteSoft,
            opacity: sub.opacity,
            transform: `translateY(${sub.translateY}px)`,
          }}
        >
          NASHVILLE
        </div>
      </div>
    </div>
  );
};
