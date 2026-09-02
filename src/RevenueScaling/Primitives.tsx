import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { useLayout, type Layout } from "./layout";

/** Small warm-gold category label that sits above every headline. */
export const Kicker: React.FC<{
  children: React.ReactNode;
  align?: "left" | "center";
}> = ({ children, align = "center" }) => {
  const l = useLayout();
  return (
    <div
      style={{
        fontFamily: poppins,
        fontSize: l.type.kicker,
        fontWeight: 600,
        letterSpacing: l.portrait ? 4.4 : 5.2,
        color: palette.gold,
        textAlign: align,
      }}
    >
      {children}
    </div>
  );
};

/** Thin warm-gold rule that draws on from the centre. */
export const GoldRule: React.FC<{
  progress: number;
  width?: number;
  height?: number;
}> = ({ progress, width = 168, height = 2 }) => (
  <div
    style={{
      width,
      height,
      background: palette.gold,
      transform: `scaleX(${progress})`,
      transformOrigin: "center",
      opacity: 0.85,
    }}
  />
);

/** Full-screen statement stack, centred inside broadcast-safe margins. */
export const StatementFrame: React.FC<{
  opacity: number;
  translateY?: number;
  gap?: number;
  children: React.ReactNode;
}> = ({ opacity, translateY = 0, gap = 26, children }) => {
  const l = useLayout();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap,
        padding: `0 ${l.margin}px`,
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export const headlineStyle = (l: Layout): React.CSSProperties => ({
  fontFamily: poppins,
  fontSize: l.type.h1,
  fontWeight: 700,
  letterSpacing: -0.4,
  lineHeight: 1.14,
  color: palette.white,
});

export const subStyle = (l: Layout): React.CSSProperties => ({
  fontFamily: poppins,
  fontSize: l.type.body,
  fontWeight: 400,
  letterSpacing: 0.6,
  lineHeight: 1.5,
  color: palette.gray,
});
