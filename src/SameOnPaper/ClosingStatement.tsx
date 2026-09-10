import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import { HEADLINE_LEAD, HEADLINE_TAIL, SUB_TEXT, T } from "./timeline";

/** Full-screen key statement: the conclusion the whole comparison was for. */
export const ClosingStatement: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.ruleIn, T.ruleIn + T.ruleDur],
    [0, 140],
    easeOutCubic,
  );
  const headline = fadeRise(frame, T.headlineIn, T.headlineDur, 12);
  const sub = fadeRise(frame, T.subIn, T.subDur, 10);

  if (headline.opacity <= 0 && rule <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: "0 200px",
      }}
    >
      <div
        style={{
          width: rule,
          height: 1,
          background: palette.gold,
          opacity: 0.85,
        }}
      />
      <span
        style={{
          opacity: headline.opacity,
          transform: `translateY(${headline.translateY}px)`,
          fontFamily: poppins,
          fontSize: 68,
          fontWeight: 600,
          letterSpacing: 1.5,
          color: palette.softWhite,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        <span style={{ color: palette.gold }}>{HEADLINE_LEAD}</span>
        {HEADLINE_TAIL}
      </span>
      <span
        style={{
          opacity: sub.opacity,
          transform: `translateY(${sub.translateY}px)`,
          fontFamily: poppins,
          fontSize: 26,
          fontWeight: 400,
          letterSpacing: 6,
          color: palette.mutedGray,
          textAlign: "center",
        }}
      >
        {SUB_TEXT}
      </span>
    </div>
  );
};
