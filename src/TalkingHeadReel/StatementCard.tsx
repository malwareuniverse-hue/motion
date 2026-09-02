import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";

const withGold = (headline: string, gold?: string) => {
  if (!gold) return headline;
  const idx = headline.indexOf(gold);
  if (idx === -1) return headline;
  return (
    <>
      {headline.slice(0, idx)}
      <span style={{ color: palette.gold }}>{gold}</span>
      {headline.slice(idx + gold.length)}
    </>
  );
};

// Full-frame key statement. Dims the scene behind it so it reads as the hero.
export const StatementCard: React.FC<{
  label?: string;
  headline: string;
  gold?: string;
  sub?: string;
}> = ({ label, headline, gold, sub }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const inT = clampedInterp(frame, [0, 16], [0, 1]);
  const outT = clampedInterp(frame, [durationInFrames - 14, durationInFrames], [1, 0]);
  const progress = Math.min(inT, outT);
  const dim = clampedInterp(frame, [0, 16], [0, 0.62]) * outT;
  const ruleWidth = clampedInterp(frame, [8, 30], [0, 150]) * outT;

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
          padding: "0 90px",
          textAlign: "center",
          opacity: progress,
          transform: `translateY(${(1 - inT) * 24}px)`,
        }}
      >
        {label ? (
          <span
            style={{
              fontFamily: poppins,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 5,
              color: palette.gold,
            }}
          >
            {label}
          </span>
        ) : null}
        <span
          style={{
            fontFamily: poppins,
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.08,
            color: palette.softWhite,
            textShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          {withGold(headline, gold)}
        </span>
        <div style={{ width: ruleWidth, height: 2, background: palette.rule }} />
        {sub ? (
          <span
            style={{
              fontFamily: poppins,
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: 1,
              color: palette.softWhiteSoft,
            }}
          >
            {sub}
          </span>
        ) : null}
      </div>
    </>
  );
};
