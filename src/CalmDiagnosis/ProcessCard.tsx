import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  LINE_MAX_H,
  LINE_SLOT_H,
  STEP_1_ACCENT,
  STEP_1_LEAD,
  STEP_2_ACCENT,
  STEP_2_LEAD,
  T,
} from "./timeline";

/**
 * The resolution beat: two steps, revealed in order, with the connecting line
 * drawn only after the first has landed — during the transcript's own pause,
 * so the motion and the silence read as the same beat.
 */
export const ProcessCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.processBgStart, T.processBgStart + T.processBgDur],
    [0, 1],
    easeOutCubic,
  );
  const step1 = fadeSlide(frame, T.diagnoseIn, T.diagnoseDur, 18);
  const lineH = clampedInterp(
    frame,
    [T.lineDrawStart, T.lineDrawStart + T.lineDrawDur],
    [0, LINE_MAX_H],
    easeOutCubic,
  );
  const step2 = fadeSlide(frame, T.moveIn, T.moveDur, 20);

  const stepStyle: React.CSSProperties = {
    fontFamily: poppins,
    fontSize: 74,
    fontWeight: 700,
    letterSpacing: 0.6,
    color: palette.softWhite,
    textAlign: "center",
  };

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
        }}
      >
        <span
          style={{
            ...stepStyle,
            opacity: step1.opacity,
            transform: `translateY(${step1.translateY}px)`,
          }}
        >
          {STEP_1_LEAD}
          <span style={{ color: palette.warmGold }}>{STEP_1_ACCENT}</span>
        </span>

        <div
          style={{
            height: LINE_SLOT_H,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 8,
          }}
        >
          <div
            style={{
              width: 3,
              height: lineH,
              background: palette.warmGold,
              borderRadius: 2,
            }}
          />
        </div>

        <span
          style={{
            ...stepStyle,
            opacity: step2.opacity,
            transform: `translateY(${step2.translateY}px)`,
          }}
        >
          {STEP_2_LEAD}
          <span style={{ color: palette.warmGold }}>{STEP_2_ACCENT}</span>
        </span>
      </div>
    </div>
  );
};
