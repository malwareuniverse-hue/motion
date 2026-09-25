import React from "react";
import { palette } from "./theme";

interface LiquidPanelProps {
  children: React.ReactNode;
  width: number;
  height: number;
  side: "left" | "right";
  opacity: number;
  translateX: number;
  top: number;
  left?: number;
  right?: number;
}

export const LiquidPanel: React.FC<LiquidPanelProps> = ({
  children, width, height, side, opacity, translateX, top, left, right,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        ...(left !== undefined ? { left } : {}),
        ...(right !== undefined ? { right } : {}),
        width,
        height,
        opacity,
        transform: `translateX(${translateX}px)`,
        willChange: "transform, opacity",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* ── Layer 1: deep glass base ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background: palette.glass,
          border: `1px solid ${palette.glassBorder}`,
          boxShadow: [
            `0 32px 80px ${palette.glassShadow}`,
            "0 0 0 1px rgba(255,255,255,0.04)",
            "inset 0 1px 0 rgba(255,255,255,0.10)",
            "inset 0 -1px 0 rgba(0,0,0,0.25)",
          ].join(", "),
        }}
      />

      {/* ── Layer 2: angled glass light refraction ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background: `linear-gradient(
            ${side === "left" ? "130deg" : "230deg"},
            rgba(255,255,255,0.09) 0%,
            rgba(255,255,255,0.035) 28%,
            rgba(0,0,0,0.04) 55%,
            transparent 80%
          )`,
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 3: warm-gold top-edge specular ── */}
      <div
        style={{
          position: "absolute",
          top: 1,
          left: "12%",
          width: "76%",
          height: 1,
          background: `linear-gradient(to right,
            transparent 0%,
            rgba(201, 164, 92, 0.55) 35%,
            rgba(201, 164, 92, 0.55) 65%,
            transparent 100%)`,
          filter: "blur(0.6px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 4: subtle bottom ambient glow ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          borderRadius: "0 0 20px 20px",
          background: "linear-gradient(to top, rgba(201,164,92,0.055) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Layer 5: corner highlight "bubble" ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          ...(side === "left" ? { left: 0 } : { right: 0 }),
          width: "55%",
          height: "35%",
          borderRadius: side === "left" ? "20px 0 80% 0" : "0 20px 0 80%",
          background: `radial-gradient(
            ellipse at ${side === "left" ? "15% 15%" : "85% 15%"},
            rgba(255,255,255,0.08) 0%,
            rgba(255,255,255,0.03) 50%,
            transparent 100%
          )`,
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 1, height: "100%", padding: "26px 26px" }}>
        {children}
      </div>
    </div>
  );
};
