import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import { LENS_CX, LENS_CY, LENS_D, T, UNBOOKED_DAYS } from "./timeline";

const UNBOOKED_START = [T.unbookedFriStart, T.unbookedSatStart, T.unbookedSunStart];

export const MagnifyingGlass: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = springIn(frame - T.glassInStart, 0, 30, { damping: 15, stiffness: 130, mass: 0.8 });
  const enterClamped = Math.max(0, Math.min(enter, 1.12));
  const scale = 0.4 + enterClamped * 0.6;
  const opacity = clampedInterp(frame, [T.glassInStart, T.glassInStart + 14], [0, 1]);
  const offsetX = (1 - Math.min(enter, 1)) * 130;
  const offsetY = (1 - Math.min(enter, 1)) * -90;

  const pulseWave = interpolate(
    frame,
    [T.pulseStart, T.pulseStart + T.pulseDur / 2, T.pulseStart + T.pulseDur],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const headerT = clampedInterp(frame, [T.lensHeaderStart, T.lensHeaderStart + T.lensHeaderDur], [0, 1]);
  const numT = clampedInterp(frame, [T.lensNumStart, T.lensNumStart + T.lensNumDur], [0, 1]);

  const glintX = clampedInterp(frame, [T.glintStart, T.glintStart + T.glintDur], [-40, 140]);
  const glintOpacity = interpolate(
    frame,
    [T.glintStart, T.glintStart + 10, T.glintStart + T.glintDur - 10, T.glintStart + T.glintDur],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: LENS_CX,
        top: LENS_CY,
        width: LENS_D,
        height: LENS_D,
        transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${scale * (1 + pulseWave * 0.045)})`,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -14,
          borderRadius: "50%",
          boxShadow: `0 0 ${60 + pulseWave * 50}px ${8 + pulseWave * 10}px rgba(201,169,97,${0.28 + pulseWave * 0.22})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `14px solid ${palette.gold}`,
          background: `radial-gradient(120% 120% at 30% 22%, ${palette.paperLift} 0%, ${palette.bg} 78%)`,
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.55)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${glintX}%`,
            width: "26%",
            height: "100%",
            background: "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
            opacity: glintOpacity,
            transform: "translateX(-50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              opacity: headerT,
              transform: `translateY(${(1 - headerT) * -8}px)`,
            }}
          >
            {UNBOOKED_DAYS.map((d) => (
              <span
                key={d.label}
                style={{
                  width: 104,
                  textAlign: "center",
                  fontFamily: poppins,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: 2.4,
                  color: palette.goldSoft,
                }}
              >
                {d.label}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              opacity: numT,
              transform: `translateY(${(1 - numT) * -6}px) scale(${0.9 + numT * 0.1})`,
            }}
          >
            {UNBOOKED_DAYS.map((d) => (
              <span
                key={d.label}
                style={{
                  width: 104,
                  textAlign: "center",
                  fontFamily: poppins,
                  fontSize: 52,
                  fontWeight: 700,
                  color: palette.cream,
                }}
              >
                {d.n}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            {UNBOOKED_DAYS.map((d, i) => {
              const start = UNBOOKED_START[i];
              const t = springIn(frame, start, 30, { damping: 13, stiffness: 220, mass: 0.6 });
              const tClamped = Math.max(0, Math.min(t, 1));
              return (
                <div key={d.label} style={{ width: 104, textAlign: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      opacity: tClamped,
                      transform: `scale(${0.7 + tClamped * 0.3})`,
                      fontFamily: poppins,
                      fontSize: 14.5,
                      fontWeight: 800,
                      letterSpacing: 1.4,
                      color: palette.rose,
                    }}
                  >
                    UNBOOKED
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
