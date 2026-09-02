import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, seeded } from "./utils";
import { BROLL, type BrollSpec } from "./timeline";
import { useLayout } from "./layout";

/* ---------------------------------------------------------------- */
/* Procedural placeholders                                           */
/* ---------------------------------------------------------------- */

/** Depth-layered property plates — stands in for portfolio / aerial B-roll. */
const PortfolioPlaceholder: React.FC<{ local: number }> = ({ local }) => {
  const { width, height } = useLayout();
  const plates = React.useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const band = i % 3;
        return {
          band,
          x: seeded(i, 1) * 1.18 - 0.09,
          y: 0.3 + band * 0.19 + seeded(i, 2) * 0.08,
          w: 190 + seeded(i, 3) * 150 - band * 26,
          h: 130 + seeded(i, 4) * 120 - band * 18,
          lit: seeded(i, 5) > 0.62,
          windows: 2 + Math.floor(seeded(i, 6) * 3),
        };
      }),
    [],
  );

  // plates are sized against the 16:9 frame; keep their apparent scale in 9:16
  const plateScale = Math.max(1, (1920 / width) * 0.62);
  const push = 1.05 + local * 0.00016;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, ${palette.navy} 0%, ${palette.charcoal} 46%, ${palette.black} 100%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{ position: "absolute", inset: 0, transform: `scale(${push})` }}
      >
        {plates.map((p, i) => {
          const parallax = local * (0.16 + p.band * 0.09);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x * width - parallax,
                top: p.y * height,
                width: p.w * plateScale,
                height: p.h * plateScale,
                background: palette.charcoal,
                border: `1px solid rgba(243, 241, 236, ${0.1 - p.band * 0.025})`,
                opacity: 0.92 - p.band * 0.22,
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                padding: 14,
              }}
            >
              {Array.from({ length: p.windows }, (_, w) => (
                <div
                  key={w}
                  style={{
                    width: 16,
                    height: 22,
                    background: p.lit ? palette.gold : palette.charcoalLift,
                    opacity: p.lit ? 0.5 - p.band * 0.12 : 0.5,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** A receding row of lit doorways — stands in for "more doors" B-roll. */
const DoorsPlaceholder: React.FC<{ local: number }> = ({ local }) => {
  const { width, height, portrait } = useLayout();
  const count = portrait ? 4 : 7;
  const doors = Array.from({ length: count }, (_, i) => i);
  const slide = local * (portrait ? 0.24 : 0.42);
  const pitch = width / (count - 0.8);
  const doorH = height * (portrait ? 0.34 : 0.57);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, ${palette.charcoal} 0%, ${palette.black} 100%)`,
        overflow: "hidden",
      }}
    >
      {doors.map((i) => {
        const depth = i / (doors.length - 1);
        const h = doorH - depth * doorH * 0.32;
        const w = pitch * 0.72 - depth * pitch * 0.22;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pitch * 0.4 + i * pitch - slide,
              top: height / 2 - h / 2 + depth * 22,
              width: w,
              height: h,
              background: palette.black,
              border: `1px solid rgba(243, 241, 236, ${0.12 - depth * 0.05})`,
              boxShadow: `inset 0 -180px 160px -140px ${palette.gold}`,
              opacity: 0.94 - depth * 0.3,
            }}
          >
            {/* warm light spill at the threshold */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 6,
                background: palette.gold,
                opacity: 0.35 - depth * 0.1,
              }}
            />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${palette.black} 0%, transparent 22%, transparent 78%, ${palette.black} 100%)`,
        }}
      />
    </div>
  );
};

/** Layered blue-hour skyline — stands in for Nashville establishing footage. */
const SkylinePlaceholder: React.FC<{ local: number }> = ({ local }) => {
  const { width, height } = useLayout();
  const bands = [
    {
      y: 0.66,
      h: 0.34,
      count: 14,
      tint: palette.navy,
      opacity: 0.9,
      speed: 0.05,
    },
    {
      y: 0.72,
      h: 0.28,
      count: 11,
      tint: palette.charcoal,
      opacity: 0.95,
      speed: 0.11,
    },
    {
      y: 0.79,
      h: 0.21,
      count: 9,
      tint: palette.black,
      opacity: 1,
      speed: 0.18,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, ${palette.navy} 0%, #101725 40%, ${palette.black} 100%)`,
        overflow: "hidden",
      }}
    >
      {bands.map((band, b) =>
        Array.from({ length: band.count }, (_, i) => {
          const seedBase = b * 40 + i;
          const w = (90 + seeded(seedBase, 7) * 110) * (width / 1920) * 1.4;
          const h = band.h * height * (0.5 + seeded(seedBase, 8) * 0.6);
          const x = (i / band.count) * (width + 240) - 120 - local * band.speed;
          return (
            <div
              key={`${b}-${i}`}
              style={{
                position: "absolute",
                left: x,
                top: band.y * height - h + band.h * height * 0.4,
                width: w,
                height: h + height,
                background: band.tint,
                opacity: band.opacity,
              }}
            >
              {seeded(seedBase, 9) > 0.45 ? (
                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 18,
                    width: 6,
                    height: 6,
                    background: palette.gold,
                    opacity: 0.4,
                  }}
                />
              ) : null}
            </div>
          );
        }),
      )}
    </div>
  );
};

/* ---------------------------------------------------------------- */
/* Slot                                                              */
/* ---------------------------------------------------------------- */

const Placeholder: React.FC<{ spec: BrollSpec; local: number }> = ({
  spec,
  local,
}) => {
  if (spec.variant === "doors") return <DoorsPlaceholder local={local} />;
  if (spec.variant === "skyline") return <SkylinePlaceholder local={local} />;
  return <PortfolioPlaceholder local={local} />;
};

const BrollSlot: React.FC<{ spec: BrollSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  if (frame < spec.start || frame > spec.end) return null;

  const local = frame - spec.start;
  const opacity = Math.min(
    clampedInterp(frame, [spec.start, spec.start + spec.fadeIn], [0, 1]),
    spec.fadeOut > 0
      ? clampedInterp(frame, [spec.end - spec.fadeOut, spec.end], [1, 0])
      : 1,
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {spec.src ? (
        <OffthreadVideo
          src={staticFile(spec.src)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Placeholder spec={spec} local={local} />
      )}

      {/* grade + scrim so typography always clears the footage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.black,
          opacity: spec.scrim,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(112% 84% at 50% 50%, transparent 34%, rgba(0,0,0,0.78) 100%)",
        }}
      />
    </div>
  );
};

/**
 * B-roll layer. Every slot renders a procedural placeholder until a real clip
 * is dropped into `public/` and named on the spec's `src` field in timeline.ts
 * — the exact stock search phrases for each slot live there too.
 */
export const BRollLayer: React.FC = () => (
  <>
    {BROLL.map((spec) => (
      <BrollSlot key={spec.id} spec={spec} />
    ))}
  </>
);
