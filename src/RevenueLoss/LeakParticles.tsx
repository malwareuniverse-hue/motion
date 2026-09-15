import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic, trendYAt } from "./utils";
import {
  BASELINE_Y,
  CONTENT_LEFT,
  CONTENT_W,
  DECLINE_END_Y,
  LEAKS_PER_LOOP,
  LEAK_LIFE,
  T,
} from "./timeline";

// evenly spread along the line's middle stretch — never right at either end
const LEAK_XFRACS = Array.from(
  { length: LEAKS_PER_LOOP },
  (_, i) => 0.18 + (i / (LEAKS_PER_LOOP - 1)) * 0.66,
);

type LeakDotProps = {
  xFrac: number;
  index: number;
  frame: number;
  revealFrac: number;
};

const LeakDot: React.FC<LeakDotProps> = ({
  xFrac,
  index,
  frame,
  revealFrac,
}) => {
  if (xFrac > revealFrac || frame < T.leakLoopStart) return null;

  const phase = index * (T.leakLoopLen / LEAKS_PER_LOOP);
  const cycleFrame = frame - T.leakLoopStart;
  const age =
    (((cycleFrame - phase) % T.leakLoopLen) + T.leakLoopLen) % T.leakLoopLen;

  if (age > LEAK_LIFE) return null;

  const t = age / LEAK_LIFE;
  const inOp = clampedInterp(t, [0, 0.16], [0, 1]);
  const outOp = clampedInterp(t, [0.6, 1], [1, 0]);
  const opacity = Math.min(inOp, outOp) * 0.95;

  const x0 = CONTENT_LEFT + xFrac * CONTENT_W;
  const y0 = trendYAt(xFrac, frame, BASELINE_Y, DECLINE_END_Y);
  const dx = clampedInterp(t, [0, 1], [0, 46], easeOutCubic);
  const dy = clampedInterp(t, [0, 1], [0, 78], easeInCubic);
  const scale = 1 - t * 0.35;

  return (
    <div
      style={{
        position: "absolute",
        left: x0 + dx,
        top: y0 + dy,
        width: 10,
        height: 10,
        borderRadius: 5,
        transform: `scale(${scale})`,
        background: index % 2 === 0 ? palette.softWhite : palette.mutedGray,
        opacity,
      }}
    />
  );
};

/**
 * Points detach from the trend line and drift down and away, fading as they
 * go — the money leaking out, without a coin or a dollar sign in sight. Each
 * gates on the line's own reveal, so a leak never appears ahead of the
 * decline that produced it.
 */
export const LeakParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const revealFrac = clampedInterp(
    frame,
    [T.declineStart, T.declineStart + T.declineDur],
    [0, 1],
    easeOutCubic,
  );

  return (
    <>
      {LEAK_XFRACS.map((xFrac, i) => (
        <LeakDot
          key={i}
          xFrac={xFrac}
          index={i}
          frame={frame}
          revealFrac={revealFrac}
        />
      ))}
    </>
  );
};
