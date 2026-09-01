import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { springIn } from "./utils";
import type { LoopNodeSpec } from "./timeline";
import { NODE_W, NODE_H, posAt } from "./timeline";

export const LoopNode: React.FC<{ spec: LoopNodeSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inT = springIn(frame, spec.inStart, fps, { damping: 16, stiffness: 200, mass: 0.6 });
  const opacity = inT;
  if (opacity <= 0) return null;

  const scale = 0.85 + inT * 0.15;
  const translateY = (1 - inT) * 16;
  const { x, y } = posAt(spec.index);

  const accent = spec.emphasis ? palette.amber : palette.panelBorder;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        width: NODE_W,
        height: NODE_H,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 14,
          background: palette.panel,
          border: `1.5px solid ${accent}`,
          boxShadow: spec.emphasis
            ? `0 20px 40px -24px ${palette.amberBg}, 0 0 0 4px ${palette.amberBg}`
            : `0 18px 36px -22px rgba(0,0,0,0.5)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: spec.emphasis ? palette.amberSoft : palette.cream,
          }}
        >
          {spec.text}
        </span>
      </div>
    </div>
  );
};
