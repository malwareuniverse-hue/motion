import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { CheckIcon } from "./icons";
import type { OutcomeSpec } from "./timeline";
import { OUTCOMES, OUTCOMES_LEAD, T } from "./timeline";

const OutcomeLine: React.FC<{ spec: OutcomeSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, spec.in, T.outcomeDur, 16);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: reveal.opacity,
        transform: `translateY(${reveal.translateY}px)`,
      }}
    >
      <CheckIcon
        color={spec.emphasis ? palette.warmGold : palette.mutedGray}
      />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: 0.6,
          color: spec.emphasis ? palette.warmGold : palette.softWhite,
        }}
      >
        {spec.text}
      </span>
    </div>
  );
};

export const OutcomesStage: React.FC = () => {
  const frame = useCurrentFrame();

  const recede = clampedInterp(
    frame,
    [T.stage2RecedeStart, T.stage2RecedeStart + T.stage2RecedeDur],
    [0, 1],
    easeOutCubic,
  );
  const lead = fadeSlide(frame, T.outcomesLeadIn, T.outcomesLeadDur, 20);

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
        padding: "0 90px",
        opacity: 1 - recede,
        transform: `translateY(${-recede * 30}px) scale(${1 - recede * 0.03})`,
        filter: `blur(${recede * 3}px)`,
      }}
    >
      <span
        style={{
          maxWidth: "82%",
          opacity: lead.opacity,
          transform: `translateY(${lead.translateY}px)`,
          fontFamily: poppins,
          fontSize: 36,
          fontWeight: 600,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {OUTCOMES_LEAD}
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 24,
        }}
      >
        {OUTCOMES.map((spec) => (
          <OutcomeLine key={spec.slot} spec={spec} />
        ))}
      </div>
    </div>
  );
};
