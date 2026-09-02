import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";

/**
 * The base grade every graphic sits on: near-black with a single deep-navy
 * lift, a barely-there measuring grid, and a controlled vignette. When Emile's
 * A-roll is available this layer is what the footage replaces.
 */
export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.0035) * 26;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: palette.black,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -80,
          background: `radial-gradient(64% 52% at 50% 6%, ${palette.navy} 0%, rgba(23, 32, 51, 0) 62%)`,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(120% 80% at 50% 46%, ${palette.charcoal} 0%, ${palette.black} 72%)`,
          opacity: 0.7,
        }}
      />

      {/* measuring grid — structure, not decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${palette.rule} 1px, transparent 1px), linear-gradient(90deg, ${palette.rule} 1px, transparent 1px)`,
          backgroundSize: "160px 160px",
          backgroundPosition: `${drift}px 0px`,
          opacity: 0.22,
          maskImage:
            "radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 50%, #000 0%, transparent 78%)",
        }}
      />

      {/* one warm horizon line, low and quiet */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "78%",
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${palette.goldRule} 50%, transparent 100%)`,
          opacity: 0.16,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(118% 88% at 50% 48%, transparent 38%, rgba(0,0,0,0.72) 100%)",
        }}
      />
    </div>
  );
};
