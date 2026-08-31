import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide, clampedInterp } from "./utils";
import { GridBackground } from "./GridBackground";
import { ComparisonWall } from "./ComparisonWall";
import { InsightCallout } from "./InsightCallout";
import { StatementSequence } from "./StatementSequence";
import { T } from "./timeline";

export const PropertyAnalyticsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const header = fadeSlide(frame, T.headerStart, T.headerDur, -14);
  const headerOut = clampedInterp(frame, [T.highlightStart, T.highlightStart + T.highlightDur], [1, 0]);

  return (
    <AbsoluteFill>
      <GridBackground />

      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: header.opacity * headerOut,
          transform: `translateY(${header.translateY}px)`,
        }}
      >
        <span style={{ fontFamily: poppins, fontSize: 13, fontWeight: 700, letterSpacing: 4, color: palette.teal }}>
          COMPARATIVE MARKET ANALYSIS
        </span>
        <span style={{ fontFamily: poppins, fontSize: 22, fontWeight: 600, color: palette.cream }}>
          10 Properties · Asheville, NC
        </span>
      </div>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <ComparisonWall />
      </AbsoluteFill>

      <InsightCallout />

      <StatementSequence />
    </AbsoluteFill>
  );
};
