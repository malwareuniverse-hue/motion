import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import { FRAGMENT_GAP_REL, FRAGMENT_ROWS } from "./timeline";

// The pricing knowledge scattered across people/tools, then the reveal that
// nobody has one view. Rows reveal sequentially and sit slightly askew to feel
// disconnected; at FRAGMENT_GAP_REL they dim and the gap statement takes over.
export const FragmentedSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const gapIn = clampedInterp(frame, [FRAGMENT_GAP_REL, FRAGMENT_GAP_REL + 18], [0, 1]);
  const out = clampedInterp(frame, [durationInFrames - 14, durationInFrames], [1, 0]);
  const rowsDim = 1 - gapIn * 0.8;

  const skews = [-2.2, 1.8, -1.4, 2.4];
  const offsets = [-46, 40, -30, 52];

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "0 70px",
          opacity: rowsDim,
        }}
      >
        {FRAGMENT_ROWS.map((row, i) => {
          const enter = springIn(frame, row.rel, fps, { damping: 16, stiffness: 210 });
          return (
            <div
              key={row.job}
              style={{
                opacity: enter,
                transform: `translateX(${offsets[i]}px) translateY(${(1 - enter) * 26}px) rotate(${skews[i]}deg) scale(${0.9 + enter * 0.1})`,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "26px 40px",
                borderRadius: 20,
                background: "rgba(20, 22, 26, 0.72)",
                border: `1px solid ${palette.rule}`,
                boxShadow: "0 18px 50px rgba(0,0,0,0.4)",
                minWidth: 560,
              }}
            >
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: 3,
                  color: palette.mutedGray,
                }}
              >
                {row.owner}
              </span>
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 50,
                  fontWeight: 700,
                  color: palette.softWhite,
                }}
              >
                {row.job}
              </span>
            </div>
          );
        })}
      </div>

      {/* Gap reveal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "0 90px",
          textAlign: "center",
          opacity: gapIn,
          transform: `translateY(${(1 - gapIn) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 5,
            color: palette.gold,
          }}
        >
          THE RESULT
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 1.08,
            color: palette.softWhite,
            textShadow: "0 8px 30px rgba(0,0,0,0.55)",
          }}
        >
          NO SINGLE VIEW OF THE{" "}
          <span style={{ color: palette.gold }}>PORTFOLIO</span>
        </span>
      </div>
    </div>
  );
};
