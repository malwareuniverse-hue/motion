import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import type { ChainArrowSpec } from "./timeline";
import { ARROW_LEN, CARD_H, WIDTH, slotY } from "./timeline";

export const ChainArrow: React.FC<{ spec: ChainArrowSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();

  const scaleY = interpolate(frame, [spec.drawStart, spec.drawStart + spec.drawDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (scaleY <= 0) return null;

  const headOpacity = interpolate(scaleY, [0.82, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const top = slotY(spec.fromSlot) + CARD_H / 2;

  return (
    <div
      style={{
        position: "absolute",
        left: WIDTH / 2,
        top,
        height: ARROW_LEN,
        width: 2,
        transform: "translateX(-50%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.amber,
          opacity: 0.85,
          transform: `scaleY(${scaleY})`,
          transformOrigin: "top",
        }}
      />
      <svg
        width={16}
        height={10}
        viewBox="0 0 16 10"
        style={{
          position: "absolute",
          left: "50%",
          top: ARROW_LEN - 8,
          transform: "translateX(-50%)",
          opacity: headOpacity,
        }}
      >
        <path
          d="M0 0 L8 9 L16 0"
          fill="none"
          stroke={palette.amber}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
