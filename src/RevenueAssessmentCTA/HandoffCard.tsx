import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { HANDOFF_LINE_1, HANDOFF_LINE_2, T } from "./timeline";

/**
 * The handoff beat: this clip never explains "the revenue minute", it only
 * earns the cut into whatever segment opens with it — the same contract
 * FiveNumbersIntro's own closing card uses.
 */
export const HandoffCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.stage3BgStart, T.stage3BgStart + T.stage3BgDur],
    [0, 1],
    easeOutCubic,
  );
  const line1 = fadeSlide(frame, T.handoffLine1In, T.handoffDur, 18);
  const line2 = fadeSlide(frame, T.handoffLine2In, T.handoffDur, 22);

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
          gap: 30,
          padding: "0 90px",
        }}
      >
        <span
          style={{
            opacity: line1.opacity,
            transform: `translateY(${line1.translateY}px)`,
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: 1.4,
            color: palette.mutedGraySoft,
            textAlign: "center",
          }}
        >
          {HANDOFF_LINE_1}
        </span>
        <span
          style={{
            maxWidth: "88%",
            opacity: line2.opacity,
            transform: `translateY(${line2.translateY}px)`,
            fontFamily: poppins,
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.3,
            letterSpacing: 0.4,
            color: palette.warmGold,
            textAlign: "center",
          }}
        >
          {HANDOFF_LINE_2}
        </span>
      </div>
    </div>
  );
};
