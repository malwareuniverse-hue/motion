import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";

// Closing call-to-action: meet the PBM team at VRMA Nashville, book 20 minutes.
export const VrmaCta: React.FC = () => {
  const frame = useCurrentFrame();

  const dim = clampedInterp(frame, [0, 18], [0, 0.72]);
  const label = clampedInterp(frame, [6, 24], [0, 1]);
  const head = clampedInterp(frame, [16, 36], [0, 1]);
  const rule = clampedInterp(frame, [30, 52], [0, 200]);
  const sub = clampedInterp(frame, [40, 60], [0, 1]);
  const url = clampedInterp(frame, [54, 74], [0, 1]);
  const scale = 0.95 + head * 0.05;

  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "#000000", opacity: dim }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          padding: "0 80px",
          textAlign: "center",
          transform: `scale(${scale})`,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 6,
            color: palette.gold,
            opacity: label,
          }}
        >
          VRMA · NASHVILLE
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            color: palette.softWhite,
            opacity: head,
            transform: `translateY(${(1 - head) * 20}px)`,
            textShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          BOOK <span style={{ color: palette.gold }}>20 MINUTES</span> WITH ME
        </span>
        <div style={{ width: rule, height: 2, background: palette.rule }} />
        <span
          style={{
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: 0.5,
            color: palette.softWhiteSoft,
            opacity: sub,
          }}
        >
          Bring your biggest revenue bottleneck.
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 1.4,
            color: palette.goldSoft,
            opacity: url,
            marginTop: 10,
          }}
        >
          pricingbymira.com
        </span>
      </div>
    </>
  );
};
