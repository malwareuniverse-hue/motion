import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { T, QUESTION } from "./timeline";

export const Q1CardScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Intro eases ─────────────────────────────────────────────────────
  const gridOpacity = clampedInterp(
    frame, [T.gridIn, T.gridIn + T.gridInDur], [0, 1], easeOutCubic,
  );
  const circleT = clampedInterp(
    frame, [T.circleIn, T.circleIn + T.circleInDur], [0, 1], easeOutCubic,
  );
  const labelT = clampedInterp(
    frame, [T.labelIn, T.labelIn + T.labelInDur], [0, 1], easeOutCubic,
  );
  const textT = clampedInterp(
    frame, [T.textIn, T.textIn + T.textInDur], [0, 1], easeOutCubic,
  );

  // ── Outro ────────────────────────────────────────────────────────────
  const outT = clampedInterp(
    frame, [T.outStart, T.outStart + T.outDur], [0, 1], easeInCubic,
  );
  const globalOpacity = 1 - outT;
  const circleExitX   = outT * -50;
  const textExitX     = outT * 40;

  // Circle intro transform
  const circleScale  = 0.80 + circleT * 0.20;
  const circleSlideX = (1 - circleT) * -80;

  const boxOpacity = gridOpacity * globalOpacity;

  return (
    <AbsoluteFill style={{ background: palette.nearBlack }}>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.038) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "110px 110px",
          opacity: boxOpacity,
        }}
      />

      {/* ── Decorative white line boxes ───────────────────────── */}
      {/* Outer frame */}
      <div
        style={{
          position: "absolute",
          top: 68, left: 68, right: 68, bottom: 68,
          border: "1px solid rgba(255,255,255,0.07)",
          pointerEvents: "none",
          opacity: boxOpacity,
        }}
      />
      {/* Inner frame */}
      <div
        style={{
          position: "absolute",
          top: 148, left: 148, right: 148, bottom: 148,
          border: "1px solid rgba(255,255,255,0.045)",
          pointerEvents: "none",
          opacity: boxOpacity,
        }}
      />

      {/* ── Centered main content ─────────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: globalOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 80,
          }}
        >

          {/* ── Gold circle with Q1 ─────────────────────────── */}
          <div
            style={{
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: palette.warmGold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: circleT,
              transform: `translateX(${circleSlideX + circleExitX}px) scale(${circleScale})`,
            }}
          >
            <div
              style={{
                opacity: labelT,
                display: "flex",
                alignItems: "flex-end",
                marginLeft: -8,
              }}
            >
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 140,
                  fontWeight: 200,
                  color: palette.softWhite,
                  lineHeight: 1,
                  letterSpacing: -8,
                }}
              >
                Q
              </span>
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 72,
                  fontWeight: 200,
                  color: palette.softWhite,
                  lineHeight: 1,
                  marginBottom: 18,
                }}
              >
                1
              </span>
            </div>
          </div>

          {/* ── Question text ───────────────────────────────── */}
          <div
            style={{
              maxWidth: 860,
              opacity: textT,
              transform: `translateX(${(1 - textT) * 64 + textExitX}px)`,
            }}
          >
            <span
              style={{
                fontFamily: poppins,
                fontSize: 50,
                fontWeight: 800,
                lineHeight: 1.24,
                color: palette.softWhite,
                letterSpacing: 0.4,
                whiteSpace: "pre-line",
                display: "block",
              }}
            >
              {QUESTION}
            </span>
          </div>

        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
