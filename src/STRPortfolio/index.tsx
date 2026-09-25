import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { poppins } from "../MovingPicture/fonts";
import { palette } from "../MovingPicture/theme";

const FPS = 30;
export const DURATION_IN_FRAMES = 90;
export const WIDTH = 1920;
export const HEIGHT = 1080;

const ease = Easing.bezier(0.16, 1, 0.3, 1);

function fade(frame: number, start: number, dur: number) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

function slideUp(frame: number, start: number, dur: number, px = 28) {
  return interpolate(frame, [start, start + dur], [px, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

const properties = [
  { label: "BEACHFRONT", metric: "92%", sub: "Peak Occupancy" },
  { label: "MOUNTAIN RETREAT", metric: "88%", sub: "Peak Occupancy" },
  { label: "CITY SUITE", metric: "94%", sub: "Peak Occupancy" },
];

function PropertyCard({
  label,
  metric,
  sub,
  delay,
}: {
  label: string;
  metric: string;
  sub: string;
  delay: number;
}) {
  const frame = useCurrentFrame();
  const opacity = fade(frame, delay, 22);
  const ty = slideUp(frame, delay, 22);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${ty}px)`,
        width: 296,
        background: "rgba(27, 29, 33, 0.92)",
        border: `1px solid rgba(201, 164, 92, 0.28)`,
        borderRadius: 6,
        padding: "32px 30px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 0,
      }}
    >
      {/* Property type label */}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          color: palette.slate,
          textTransform: "uppercase" as const,
          marginBottom: 18,
        }}
      >
        {label}
      </div>

      {/* Metric */}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 56,
          fontWeight: 600,
          color: palette.gold,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          marginBottom: 10,
        }}
      >
        {metric}
      </div>

      {/* Sublabel */}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 13,
          fontWeight: 400,
          color: palette.creamFaint,
          letterSpacing: "0.04em",
        }}
      >
        {sub}
      </div>

      {/* Bottom gold accent bar */}
      <div
        style={{
          marginTop: 22,
          width: "100%",
          height: 1,
          background: `linear-gradient(90deg, ${palette.goldFaint} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

export const STRPortfolioScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Gold line draw-on: frames 0-22
  const lineProgress = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  // Headline: frames 14-38
  const headlineOpacity = fade(frame, 14, 24);
  const headlineTy = slideUp(frame, 14, 24, 20);

  // Cards staggered: 26, 38, 50
  const cardDelays = [26, 38, 50];

  // Bottom chip: frames 60-78
  const chipOpacity = fade(frame, 60, 18);
  const chipTy = slideUp(frame, 60, 18, 14);

  return (
    <AbsoluteFill
      style={{
        background: "#0B0C0E",
        fontFamily: poppins,
        overflow: "hidden",
      }}
    >
      {/* Subtle vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Gold top line */}
      <div
        style={{
          position: "absolute",
          top: 88,
          left: 120,
          right: 120,
          height: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(90deg, ${palette.gold} 0%, ${palette.goldSoft} 60%, transparent 100%)`,
            transformOrigin: "left center",
            transform: `scaleX(${lineProgress})`,
          }}
        />
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 112,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: headlineOpacity,
          transform: `translateY(${headlineTy}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 10,
          }}
        >
          Portfolio Review
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 42,
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: palette.cream,
            textTransform: "uppercase" as const,
          }}
        >
          Strong STR Portfolio
        </div>
      </div>

      {/* Cards row */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          paddingTop: 60,
        }}
      >
        {properties.map((p, i) => (
          <PropertyCard
            key={p.label}
            label={p.label}
            metric={p.metric}
            sub={p.sub}
            delay={cardDelays[i]}
          />
        ))}
      </div>

      {/* Bottom chip */}
      <div
        style={{
          position: "absolute",
          bottom: 76,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: chipOpacity,
          transform: `translateY(${chipTy}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "10px 28px",
            background: "rgba(201, 164, 92, 0.08)",
            border: `1px solid rgba(201, 164, 92, 0.20)`,
            borderRadius: 40,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: palette.gold,
              textTransform: "uppercase" as const,
            }}
          >
            3 Properties
          </span>
          <span
            style={{
              width: 1,
              height: 12,
              background: `rgba(201, 164, 92, 0.35)`,
            }}
          />
          <span
            style={{
              fontFamily: poppins,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: palette.creamSoft,
              textTransform: "uppercase" as const,
            }}
          >
            Consistent Performance
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
