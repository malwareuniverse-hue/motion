import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CAUSE_1,
  CAUSE_2,
  CAUSE_3,
  CAUSE_4,
  PUNCHLINE_ACCENT,
  PUNCHLINE_LEAD,
  T,
} from "./timeline";

const CauseLine: React.FC<{ text: string; revealIn: number }> = ({
  text,
  revealIn,
}) => {
  const frame = useCurrentFrame();
  const reveal = fadeSlide(frame, revealIn, T.causeDur, 16);
  return (
    <span
      style={{
        maxWidth: "78%",
        opacity: reveal.opacity,
        transform: `translateY(${reveal.translateY}px)`,
        fontFamily: poppins,
        fontSize: 32,
        fontWeight: 600,
        color: palette.softWhite,
        textAlign: "center",
      }}
    >
      {text}
    </span>
  );
};

/**
 * The four causes (phase 2) recede exactly as the self-accountability
 * punchline (phase 3) takes over the same card — the same nested pattern
 * BookingWindow, RevenueDuel and RevParReveal all use.
 */
export const ResolutionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.phase1RecedeStart, T.phase1RecedeStart + T.phase1RecedeDur],
    [0, 1],
    easeOutCubic,
  );
  const phase2Recede = clampedInterp(
    frame,
    [T.phase2RecedeStart, T.phase2RecedeStart + T.phase2RecedeDur],
    [0, 1],
    easeOutCubic,
  );

  const punchline = fadeSlide(frame, T.punchlineIn, T.punchlineDur, 22);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: bgOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.nearBlack,
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
          gap: 26,
          padding: "0 100px",
          opacity: 1 - phase2Recede,
          transform: `translateY(${-phase2Recede * 30}px) scale(${1 - phase2Recede * 0.03})`,
          filter: `blur(${phase2Recede * 3}px)`,
        }}
      >
        <CauseLine text={CAUSE_1} revealIn={T.cause1In} />
        <CauseLine text={CAUSE_2} revealIn={T.cause2In} />
        <CauseLine text={CAUSE_3} revealIn={T.cause3In} />
        <CauseLine text={CAUSE_4} revealIn={T.cause4In} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
        }}
      >
        <span
          style={{
            maxWidth: "84%",
            opacity: punchline.opacity,
            transform: `translateY(${punchline.translateY}px)`,
            fontFamily: poppins,
            fontSize: 50,
            fontWeight: 700,
            lineHeight: 1.3,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {PUNCHLINE_LEAD}
          <span style={{ color: palette.warmGold }}>{PUNCHLINE_ACCENT}</span>
        </span>
      </div>
    </div>
  );
};
