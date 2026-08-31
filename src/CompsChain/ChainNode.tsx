import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import type { ChainNodeSpec } from "./timeline";
import { CARD_W, WIDTH, slotY } from "./timeline";

export const ChainNode: React.FC<{ spec: ChainNodeSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inT = springIn(frame, spec.inStart, fps, { damping: 16, stiffness: 200, mass: 0.6 });
  const outT =
    spec.outStart !== undefined && spec.outDur !== undefined
      ? clampedInterp(frame, [spec.outStart, spec.outStart + spec.outDur], [1, 0])
      : 1;

  const opacity = Math.min(inT, outT);
  if (opacity <= 0) return null;

  const scale = (0.85 + inT * 0.15) * (0.9 + outT * 0.1);
  const translateY = (1 - inT) * 16 + (1 - outT) * -14;

  const isPositive = spec.kind === "right";
  const isImpact = Boolean(spec.impact);
  const accent = isImpact && isPositive ? palette.amber : isPositive ? palette.teal : palette.rose;
  const accentBg = isPositive ? palette.tealBg : palette.roseBg;

  return (
    <div
      style={{
        position: "absolute",
        left: WIDTH / 2,
        top: slotY(spec.slot),
        transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        width: CARD_W,
      }}
    >
      <div
        style={{
          borderRadius: 16,
          padding: isImpact ? "22px 32px" : "18px 32px",
          background: isImpact ? accent : palette.panel,
          border: isImpact ? "none" : `1.5px solid ${accent}`,
          boxShadow: isImpact
            ? `0 24px 48px -20px ${accentBg}, 0 0 0 8px ${accentBg}`
            : `0 20px 40px -24px rgba(0,0,0,0.55), 0 0 0 4px ${accentBg}`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: isImpact ? 30 : 22,
            fontWeight: isImpact ? 800 : 700,
            letterSpacing: isImpact ? 1.2 : 1.6,
            color: isImpact ? "#0B0D11" : palette.cream,
          }}
        >
          {spec.text}
        </span>
      </div>
    </div>
  );
};
