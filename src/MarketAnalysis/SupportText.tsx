import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { T } from "./timeline";

/**
 * Two supporting-copy lines that fade in below the "5 TESTS" punchline,
 * each synced to the moment it is spoken.
 */
export const SupportText: React.FC = () => {
  const frame = useCurrentFrame();
  const l1 = fadeSlide(frame, T.supportLine1, T.supportLine1Dur, 16);
  const l2 = fadeSlide(frame, T.supportLine2, T.supportLine2Dur, 16);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "22%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 400,
          color: palette.mutedGray,
          letterSpacing: 1,
          opacity: l1.opacity,
          transform: `translateY(${l1.translateY}px)`,
        }}
      >
        YOU'LL KNOW IF YOU'RE ACTUALLY READING YOUR MARKET
      </span>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 400,
          color: palette.mutedGray,
          letterSpacing: 1,
          opacity: l2.opacity,
          transform: `translateY(${l2.translateY}px)`,
        }}
      >
        OR JUST REACTING TO WHAT ALREADY HAPPENED
      </span>
    </div>
  );
};
