import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { CARD_STEP, CARD_WIDTH, type ScanBeat } from "./timeline";

const CARD_HEIGHT = 339;

const POINT_TARGETS: Record<string, { x: number; y: number }> = {
  photo: { x: 170, y: 85 },
  reviews: { x: 116, y: 244 },
  location: { x: 92, y: 220 },
  amenities: { x: 170, y: 269 },
  price: { x: 66, y: 313 },
};

const FRAME_TARGETS = new Set(["design", "value"]);

export const ScanSpotlight: React.FC<{ beat: ScanBeat }> = ({ beat }) => {
  const frame = useCurrentFrame();

  const enter = clampedInterp(frame, [beat.start, beat.start + 12], [0, 1]);
  const exit = clampedInterp(frame, [beat.end - 12, beat.end], [1, 0]);
  const progress = Math.min(enter, exit);
  if (progress <= 0) return null;

  const cardLeft = beat.cardIndex * CARD_STEP;
  const isFrame = FRAME_TARGETS.has(beat.target);

  if (isFrame) {
    return (
      <div
        style={{
          position: "absolute",
          left: cardLeft - 6,
          top: -6,
          width: CARD_WIDTH + 12,
          height: CARD_HEIGHT + 12,
          borderRadius: 20,
          border: `3px solid ${palette.teal}`,
          opacity: progress,
          boxShadow: `0 0 0 6px ${palette.tealBg}`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -18,
            left: 20,
            transform: `translateY(${(1 - progress) * -8}px)`,
            background: palette.teal,
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <span style={{ fontFamily: poppins, fontSize: 12.5, fontWeight: 700, letterSpacing: 1.4, color: "#FFFFFF" }}>
            {beat.label}
          </span>
        </div>
      </div>
    );
  }

  const point = POINT_TARGETS[beat.target] ?? { x: 170, y: 170 };
  const ringScale = 0.7 + progress * 0.3;

  return (
    <div
      style={{
        position: "absolute",
        left: cardLeft + point.x,
        top: point.y,
        transform: "translate(-50%, -50%)",
        opacity: progress,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          border: `2.5px solid ${palette.teal}`,
          boxShadow: `0 0 0 6px ${palette.tealBg}`,
          transform: `scale(${ringScale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: `translate(-50%, 10px)`,
          background: palette.teal,
          borderRadius: 999,
          padding: "5px 13px",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontFamily: poppins, fontSize: 12, fontWeight: 700, letterSpacing: 1.2, color: "#FFFFFF" }}>
          {beat.label}
        </span>
      </div>
    </div>
  );
};
