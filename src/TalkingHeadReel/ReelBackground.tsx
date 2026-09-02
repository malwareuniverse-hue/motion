import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";

// Vertical bokeh field. This stands in for Emile's talking-head clip so the
// reel previews and renders without an asset. When the real footage is ready,
// drop it in as the background layer of index.tsx, e.g.:
//
//   <OffthreadVideo
//     src={staticFile("emile-reel.mp4")}
//     style={{ position: "absolute", inset: 0, objectFit: "cover" }}
//   />
//
// placed just above (or replacing) <ReelBackground />. The scrim + caption /
// lower-third / brand system layered on top are timed independently and will
// sit over the footage unchanged.

const blobs = [
  { cx: 0.28, cy: 0.22, r: 320, color: palette.navy, speed: 0.006, phase: 0 },
  { cx: 0.78, cy: 0.34, r: 360, color: palette.goldDeep, speed: 0.005, phase: 2.1 },
  { cx: 0.55, cy: 0.62, r: 420, color: palette.navy, speed: 0.0045, phase: 4.2 },
  { cx: 0.2, cy: 0.78, r: 300, color: palette.gold, speed: 0.007, phase: 1.3 },
];

export const ReelBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(165deg, ${palette.charcoalLift} 0%, ${palette.charcoal} 45%, ${palette.nearBlack} 100%)`,
        overflow: "hidden",
      }}
    >
      {blobs.map((b, i) => {
        const driftX = Math.sin(frame * b.speed + b.phase) * 44;
        const driftY = Math.cos(frame * b.speed * 0.8 + b.phase) * 34;
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
              opacity: 0.2,
              filter: "blur(110px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 70% at 50% 42%, transparent 42%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* bottom scrim so captions stay legible over any footage */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "46%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,12,15,0.55) 55%, rgba(10,12,15,0.9) 100%)",
        }}
      />
    </div>
  );
};
