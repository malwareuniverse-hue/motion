import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Fine film grain. Rendered at quarter resolution and scaled up so the noise
 * stays coarse and cheap; the seed steps every other frame so it breathes
 * without strobing.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 12;

  return (
    <svg
      viewBox="0 0 480 270"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
    >
      <filter id="rs-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={2}
          seed={seed}
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="480" height="270" filter="url(#rs-grain)" />
    </svg>
  );
};
