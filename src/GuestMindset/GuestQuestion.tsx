import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { QUESTION_LABEL, QUESTION_TEXT, T } from "./timeline";

const CARD_W = 1180;
const CARD_H = 236;
const CARD_TOP = 580;

export const GuestQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  const card = fadeSlide(frame, T.questionStart, T.questionDur, 22);
  const rule = clampedInterp(
    frame,
    [T.questionStart, T.questionStart + T.questionRuleDur],
    [0, CARD_H - 72],
    easeOutCubic,
  );
  const label = fadeSlide(frame, T.questionStart + 10, 24, 10);
  const headline = fadeSlide(frame, T.questionStart + 20, 28, 16);

  return (
    <div
      style={{
        position: "absolute",
        left: (1920 - CARD_W) / 2,
        top: CARD_TOP,
        width: CARD_W,
        height: CARD_H,
        opacity: card.opacity,
        transform: `translateY(${card.translateY}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: palette.panel,
          border: `1px solid ${palette.panelBorderLift}`,
        }}
      />

      {/* the single warm accent in the frame — the guest's real question */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 36,
          width: 4,
          height: rule,
          background: palette.amber,
          borderRadius: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          paddingLeft: 64,
        }}
      >
        <span
          style={{
            opacity: label.opacity,
            transform: `translateY(${label.translateY}px)`,
            fontFamily: poppins,
            fontSize: 21,
            fontWeight: 600,
            letterSpacing: 6,
            color: palette.amber,
          }}
        >
          {QUESTION_LABEL}
        </span>
        <span
          style={{
            opacity: headline.opacity,
            transform: `translateY(${headline.translateY}px)`,
            fontFamily: poppins,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: palette.cream,
          }}
        >
          {QUESTION_TEXT}
        </span>
      </div>
    </div>
  );
};
