import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { T } from "./timeline";

export const AssumptionFlip: React.FC = () => {
  const frame = useCurrentFrame();

  const scrimIn = clampedInterp(frame, [T.assumptionStart - 20, T.assumptionStart + 10], [0, 0.6]);
  const scrimOut = clampedInterp(frame, [T.clearStart, T.clearStart + T.clearDur], [1, 0]);
  const scrimOpacity = Math.min(scrimIn, scrimOut);

  const assumptionIn = clampedInterp(frame, [T.assumptionStart, T.assumptionStart + T.assumptionDur], [0, 1]);
  const assumptionOut = clampedInterp(frame, [T.flipStart, T.flipStart + 16], [1, 0]);
  const assumptionOpacity = Math.min(assumptionIn, assumptionOut);

  const strikeWidth = clampedInterp(frame, [T.strikeStart, T.strikeStart + T.strikeDur], [0, 1]);

  const flipIn = clampedInterp(frame, [T.flipStart + 10, T.flipStart + T.flipDur], [0, 1]);
  const flipOut = clampedInterp(frame, [T.clearStart, T.clearStart + 16], [1, 0]);
  const flipOpacity = Math.min(flipIn, flipOut);
  const flipScale = 0.9 + flipIn * 0.1;

  if (scrimOpacity <= 0 && assumptionOpacity <= 0 && flipOpacity <= 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "#050607", opacity: scrimOpacity }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 270,
        }}
      >
        <div style={{ position: "relative", opacity: assumptionOpacity }}>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: 1,
              color: palette.cream,
              whiteSpace: "nowrap",
            }}
          >
            NEARBY = COMP
          </span>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "112%",
              height: 5,
              borderRadius: 3,
              background: palette.rose,
              transform: `translate(-50%, -50%) scaleX(${strikeWidth})`,
              transformOrigin: "left center",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            opacity: flipOpacity,
            transform: `scale(${flipScale})`,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: 1,
              color: palette.cream,
              whiteSpace: "nowrap",
            }}
          >
            COMPETITION = <span style={{ color: palette.tealSoft }}>SAME GUEST</span>
          </span>
        </div>
      </div>
    </div>
  );
};
