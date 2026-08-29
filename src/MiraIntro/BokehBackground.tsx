import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";

const blobs = [
  { cx: 0.22, cy: 0.32, r: 220, color: palette.tealDeep, speed: 0.006, phase: 0 },
  { cx: 0.74, cy: 0.22, r: 260, color: palette.amber, speed: 0.005, phase: 2.1 },
  { cx: 0.62, cy: 0.78, r: 300, color: palette.teal, speed: 0.0045, phase: 4.2 },
  { cx: 0.15, cy: 0.82, r: 180, color: palette.amberSoft, speed: 0.007, phase: 1.3 },
];

export const BokehBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(160deg, ${palette.charcoalLift} 0%, ${palette.charcoal} 45%, ${palette.charcoalDeep} 100%)`,
        overflow: "hidden",
      }}
    >
      {blobs.map((b, i) => {
        const driftX = Math.sin(frame * b.speed + b.phase) * 40;
        const driftY = Math.cos(frame * b.speed * 0.8 + b.phase) * 30;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(${b.cx * 100}% + ${driftX}px)`,
              top: `calc(${b.cy * 100}% + ${driftY}px)`,
              width: b.r,
              height: b.r,
              borderRadius: "50%",
              background: b.color,
              opacity: 0.28,
              filter: "blur(90px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* film grain / vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
};
