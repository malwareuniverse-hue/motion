import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { CX, CY, HEIGHT, R, T, WIDTH } from "./timeline";

const PULSE_DELAYS = [0, 30];
const PULSE_LEN = 42;

export const LoopRing: React.FC = () => {
  const frame = useCurrentFrame();

  const guideOpacity = clampedInterp(frame, [T.ringInStart, T.ringInStart + T.ringInDur], [0, 1]) * 0.5;

  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke={palette.ring}
        strokeWidth={1}
        strokeDasharray="2 10"
        opacity={guideOpacity}
      />
      {PULSE_DELAYS.map((delay, i) => {
        const local = frame - (T.pulseStart + delay);
        if (local < 0 || local > PULSE_LEN) return null;
        const t = local / PULSE_LEN;
        const radius = R * (1 + t * 0.05);
        const opacity = (1 - t) * 0.45;
        return (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={radius}
            fill="none"
            stroke={palette.amber}
            strokeWidth={1.5}
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
};
