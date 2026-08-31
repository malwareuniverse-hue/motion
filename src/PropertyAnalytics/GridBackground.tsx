import React from "react";
import { palette } from "./theme";

export const GridBackground: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(120% 90% at 50% 10%, ${palette.bgLift} 0%, ${palette.bg} 55%, #060708 100%)`,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(80% 70% at 50% 40%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(80% 70% at 50% 40%, black 40%, transparent 100%)",
      }}
    />
  </div>
);
