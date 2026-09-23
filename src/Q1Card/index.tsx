import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic, fadeSlide } from "./utils";
import { T, QUESTION } from "./timeline";

/**
 * Recreates the Q1 card graphic exactly:
 *   – dark near-black ground with a subtle grid overlay
 *   – oversized gold circle on the left with "Q1" monogram
 *   – bold white question text to the right
 *   – "PRICING BY MIRA / MH" logotype top-right
 *
 * Intro: circle scales + slides from the left; text slides from the right.
 * Outro: unified fade with the circle drifting left, text drifting right.
 */
export const Q1CardScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Intro eases ─────────────────────────────────────────────────────
  const gridOpacity = clampedInterp(
    frame, [T.gridIn, T.gridIn + T.gridInDur], [0, 1], easeOutCubic,
  );
  const logoMotion  = fadeSlide(frame, T.logoIn,   T.logoInDur,  -20);
  const circleT     = clampedInterp(
    frame, [T.circleIn, T.circleIn + T.circleInDur], [0, 1], easeOutCubic,
  );
  const labelMotion = fadeSlide(frame, T.labelIn,  T.labelInDur,  14);
  const textT       = clampedInterp(
    frame, [T.textIn, T.textIn + T.textInDur], [0, 1], easeOutCubic,
  );

  // ── Outro ────────────────────────────────────────────────────────────
  const outT = clampedInterp(
    frame, [T.outStart, T.outStart + T.outDur], [0, 1], easeInCubic,
  );
  const globalOpacity = 1 - outT;

  // Directional drift on exit
  const circleExitX = outT * -60;
  const textExitX   = outT * 48;

  // Combined circle transform values
  const circleScale  = 0.76 + circleT * 0.24;
  const circleSlideX = (1 - circleT) * -100;

  return (
    <AbsoluteFill style={{ background: palette.nearBlack }}>

      {/* Grid overlay — 110 × 110 px cells, very faint */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.040) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.040) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "110px 110px",
          opacity: gridOpacity * globalOpacity,
        }}
      />

      {/* Everything else fades out together on exit */}
      <AbsoluteFill style={{ opacity: globalOpacity }}>

        {/* ── LOGO — top right ───────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 72,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: logoMotion.opacity,
            transform: `translateY(${logoMotion.translateY}px)`,
          }}
        >
          {/* MH monogram in decorative ring */}
          <svg width="86" height="86" viewBox="0 0 86 86" overflow="visible">
            {/* Outer circle */}
            <circle
              cx="43" cy="43" r="37"
              fill="none"
              stroke={palette.warmGold}
              strokeWidth="1.3"
            />
            {/* Rotated square (diamond frame) */}
            <rect
              x="12" y="12" width="62" height="62"
              fill="none"
              stroke={palette.warmGold}
              strokeWidth="0.7"
              transform="rotate(45 43 43)"
            />
            {/* Cardinal accent dots */}
            {([[43,6],[43,80],[6,43],[80,43]] as [number,number][]).map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r="2.3" fill={palette.warmGold} />
            ))}
            {/* MH lettering */}
            <text
              x="43" y="52"
              textAnchor="middle"
              style={{
                fontFamily: poppins,
                fontSize: "22px",
                fontWeight: "400",
                fill: palette.warmGold,
                letterSpacing: "2px",
              }}
            >
              MH
            </text>
          </svg>

          {/* Brand name */}
          <span
            style={{
              fontFamily: poppins,
              fontSize: 10,
              fontWeight: 600,
              color: palette.warmGold,
              letterSpacing: 3.5,
              marginTop: 8,
              whiteSpace: "nowrap",
            }}
          >
            PRICING BY MIRA
          </span>
        </div>

        {/* ── GOLD CIRCLE with Q1 ────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            // Bleed slightly off the left edge to match the original
            left: -18,
            top: "50%",
            width: 482,
            height: 482,
            borderRadius: "50%",
            background: palette.warmGold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: circleT,
            transform: `translateY(-50%) translateX(${circleSlideX + circleExitX}px) scale(${circleScale})`,
          }}
        >
          {/* Q1 label */}
          <div
            style={{
              opacity: labelMotion.opacity,
              transform: `translateY(${labelMotion.translateY}px)`,
              display: "flex",
              alignItems: "flex-end",
              gap: 0,
              // slight left offset to optically center inside the circle
              marginLeft: -10,
            }}
          >
            <span
              style={{
                fontFamily: poppins,
                fontSize: 152,
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
                fontSize: 78,
                fontWeight: 200,
                color: palette.softWhite,
                lineHeight: 1,
                marginBottom: 20,
              }}
            >
              1
            </span>
          </div>
        </div>

        {/* ── QUESTION TEXT ──────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: 534,
            right: 108,
            top: "50%",
            transform: `translateY(-50%) translateX(${(1 - textT) * 64 + textExitX}px)`,
            opacity: textT,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.22,
              color: palette.softWhite,
              letterSpacing: 0.4,
              whiteSpace: "pre-line",
            }}
          >
            {QUESTION}
          </span>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
