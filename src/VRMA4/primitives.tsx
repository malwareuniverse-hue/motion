import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeOut, fadeRise, slowPush } from "./utils";
import { SAFE_X } from "./timeline";

/**
 * Every B-roll insert sits on the same near-black ground with one soft
 * off-centre lift, a restrained analytical push, and a clean fade out. No
 * texture, no vignette ring, no glow.
 */
export const SceneShell: React.FC<{
  duration: number;
  outStart: number;
  children: React.ReactNode;
  push?: boolean;
}> = ({ duration, outStart, children, push = true }) => {
  const frame = useCurrentFrame();
  const scale = push ? slowPush(frame, duration) : 1;
  const opacity = fadeOut(frame, outStart, duration - outStart);

  return (
    <AbsoluteFill style={{ backgroundColor: palette.nearBlack }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 70% at 50% 22%, ${palette.charcoal} 0%, ${palette.nearBlack} 62%)`,
        }}
      />
      <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Charcoal information surface with a hairline edge and restrained rounding. */
export const Surface: React.FC<{
  style?: React.CSSProperties;
  children?: React.ReactNode;
  lift?: boolean;
}> = ({ style, children, lift = false }) => (
  <div
    style={{
      background: lift ? palette.charcoalLift : palette.charcoal,
      border: `1px solid ${palette.hairline}`,
      borderRadius: 14,
      boxShadow: "0 24px 60px -40px rgba(0, 0, 0, 0.9)",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Stand-in for UI copy. Keeps the asset text-free the way the plan requires. */
export const LabelBar: React.FC<{
  width: number;
  height?: number;
  opacity?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ width, height = 8, opacity = 1, color = palette.graySoft, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: height / 2,
      background: color,
      opacity,
      ...style,
    }}
  />
);

/** A thin horizontal rule that draws on from the left over `dur` frames. */
export const DrawRule: React.FC<{
  start: number;
  dur: number;
  width: number;
  color?: string;
  height?: number;
  style?: React.CSSProperties;
}> = ({ start, dur, width, color = palette.gold, height = 2, style }) => {
  const frame = useCurrentFrame();
  const w = clampedInterp(frame, [start, start + dur], [0, width]);
  return (
    <div
      style={{
        width: w,
        height,
        background: color,
        borderRadius: height,
        ...style,
      }}
    />
  );
};

/** Numerals only. PBM never uses currency symbols on a rate. */
export const Numeral: React.FC<{
  value: string;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ value, size = 34, color = palette.white, weight = 600, style }) => (
  <span
    style={{
      fontFamily: poppins,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: 0.4,
      lineHeight: 1,
      color,
      fontVariantNumeric: "tabular-nums",
      ...style,
    }}
  >
    {value}
  </span>
);

/** Column of content inside the reel's safe area. */
export const SafeColumn: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{
      padding: `0 ${SAFE_X}px`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Muted architectural block standing in for listing photography. */
export const PhotoBlock: React.FC<{
  width: number;
  height: number;
  seed?: number;
  style?: React.CSSProperties;
}> = ({ width, height, seed = 0, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 10,
      background: `linear-gradient(${150 + seed * 22}deg, ${palette.charcoalLift} 0%, #2B2F35 46%, ${palette.charcoal} 100%)`,
      border: `1px solid ${palette.hairline}`,
      overflow: "hidden",
      position: "relative",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: height * (0.3 + seed * 0.06),
        background:
          "linear-gradient(180deg, rgba(11,12,14,0) 0%, rgba(11,12,14,0.55) 100%)",
      }}
    />
  </div>
);

export const useRise = (start: number, dur?: number, distance?: number) =>
  fadeRise(useCurrentFrame(), start, dur, distance);
