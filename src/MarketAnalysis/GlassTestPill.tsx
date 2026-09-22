import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import type { TestSpec } from "./timeline";

interface GlassTestPillProps {
  spec: TestSpec;
}

/**
 * Liquid-glass pill for one market test. Enters from below with a fade-slide
 * timed to the moment its name is spoken. The glass look uses a translucent
 * gold-tinted gradient + a bright upper border edge — readable on dark because
 * the tint is warm rather than pure-white.
 */
export const GlassTestPill: React.FC<GlassTestPillProps> = ({ spec }) => {
  const frame = useCurrentFrame();
  const motion = fadeSlide(frame, spec.frameIn, 22, 22);

  const indexStr = String(spec.index + 1).padStart(2, "0");

  return (
    <div
      style={{
        opacity: motion.opacity,
        transform: `translateY(${motion.translateY}px)`,
        width: 900,
        height: 82,
        display: "flex",
        alignItems: "center",
        padding: "0 34px",
        gap: 28,
        background:
          "linear-gradient(135deg, rgba(201,164,92,0.13) 0%, rgba(201,164,92,0.05) 60%, rgba(255,255,255,0.04) 100%)",
        backdropFilter: "blur(28px)",
        border: "1px solid rgba(201,164,92,0.30)",
        borderTopColor: "rgba(255,255,255,0.22)",
        borderRadius: 22,
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.16)",
      }}
    >
      {/* Index badge */}
      <span
        style={{
          fontFamily: poppins,
          fontSize: 20,
          fontWeight: 600,
          color: palette.warmGold,
          opacity: 0.65,
          letterSpacing: 1,
          minWidth: 32,
        }}
      >
        {indexStr}
      </span>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 38,
          background: "rgba(201,164,92,0.28)",
          flexShrink: 0,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: poppins,
          fontSize: 38,
          fontWeight: 700,
          color: palette.softWhite,
          letterSpacing: 4,
          flexGrow: 1,
        }}
      >
        {spec.label}
      </span>

      {/* Right accent */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: palette.warmGold,
          opacity: 0.55,
          flexShrink: 0,
        }}
      />
    </div>
  );
};
