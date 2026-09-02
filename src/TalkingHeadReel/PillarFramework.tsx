import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import { PILLARS } from "./timeline";

// The six-part PBM revenue system, revealed one row at a time top to bottom,
// each with a thin gold index and a hairline separator drawn on after it lands.
export const PillarFramework: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleEnter = springIn(frame, 0, fps, { damping: 18, stiffness: 200 });
  const out = clampedInterp(frame, [durationInFrames - 16, durationInFrames], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 90px",
        opacity: out,
      }}
    >
      <div
        style={{
          opacity: titleEnter,
          transform: `translateY(${(1 - titleEnter) * 18}px)`,
          marginBottom: 54,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 5,
            color: palette.gold,
            marginBottom: 12,
          }}
        >
          THE PBM REVENUE SYSTEM
        </div>
        <div style={{ width: 120, height: 2, background: palette.rule }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {PILLARS.map((pillar, i) => {
          const enter = springIn(frame, pillar.rel, fps, { damping: 17, stiffness: 210 });
          const rule = clampedInterp(frame, [pillar.rel + 6, pillar.rel + 22], [0, 1]);
          return (
            <div
              key={pillar.text}
              style={{
                opacity: enter,
                transform: `translateY(${(1 - enter) * 20}px)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 26 }}>
                <span
                  style={{
                    fontFamily: poppins,
                    fontSize: 30,
                    fontWeight: 700,
                    color: palette.gold,
                    minWidth: 52,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: poppins,
                    fontSize: 54,
                    fontWeight: 700,
                    color: palette.softWhite,
                    lineHeight: 1.05,
                  }}
                >
                  {pillar.text}
                </span>
              </div>
              <div
                style={{
                  marginTop: 18,
                  height: 1,
                  width: `${rule * 100}%`,
                  background: palette.rule,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
