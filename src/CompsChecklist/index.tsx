import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, easeOutCubic, fadeRise } from "./utils";
import { ChecklistRow } from "./ChecklistRow";
import {
  ANSWER_TEXT,
  CENTER_X,
  HEAD_SCALE_DOCKED,
  HEAD_TEXT,
  HEAD_Y_DOCKED,
  HEAD_Y_OPEN,
  ITEMS,
  QUESTION_TEXT,
  T,
  TEXT_MAX_W,
  VERDICT_Y,
} from "./timeline";

export const CompsChecklistScene: React.FC = () => {
  const frame = useCurrentFrame();

  const head = fadeRise(frame, T.headIn, T.headDur, 14);
  const dock = clampedInterp(
    frame,
    [T.dockStart, T.dockStart + T.dockDur],
    [0, 1],
    easeInOutCubic,
  );

  const question = clampedInterp(
    frame,
    [T.questionIn, T.questionIn + T.questionDur],
    [0, 1],
    easeOutCubic,
  );
  const swap = clampedInterp(
    frame,
    [T.answerStart, T.answerStart + T.answerDur],
    [0, 1],
    easeOutCubic,
  );

  const headY = HEAD_Y_OPEN + (HEAD_Y_DOCKED - HEAD_Y_OPEN) * dock;
  const headScale = 1 + (HEAD_SCALE_DOCKED - 1) * dock;

  const verdictBase: React.CSSProperties = {
    position: "absolute",
    left: CENTER_X,
    top: VERDICT_Y,
    fontFamily: poppins,
    fontSize: 62,
    fontWeight: 600,
    letterSpacing: 2,
    whiteSpace: "nowrap",
  };

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(118% 88% at 50% 14%, ${palette.charcoal} 0%, ${palette.nearBlack} 62%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: headY,
          width: TEXT_MAX_W,
          transform: `translate(-50%, -50%) translateY(${head.translateY}px) scale(${headScale})`,
          opacity: head.opacity,
          fontFamily: poppins,
          fontSize: 64,
          fontWeight: 600,
          letterSpacing: 1,
          color: palette.softWhite,
          textAlign: "center",
          lineHeight: 1.18,
          whiteSpace: "pre-line",
        }}
      >
        {HEAD_TEXT}
      </div>

      {ITEMS.map((item, i) => (
        <ChecklistRow key={item.label} item={item} index={i} />
      ))}

      {question > 0 ? (
        <>
          <span
            style={{
              ...verdictBase,
              transform: `translate(-50%, -50%) translateY(${(1 - question) * 12 - swap * 16}px)`,
              opacity: question * (1 - swap),
              color: palette.softWhite,
            }}
          >
            {QUESTION_TEXT}
          </span>
          <span
            style={{
              ...verdictBase,
              transform: `translate(-50%, -50%) translateY(${(1 - swap) * 16}px)`,
              opacity: swap,
              color: palette.gold,
            }}
          >
            {ANSWER_TEXT}
          </span>
        </>
      ) : null}
    </AbsoluteFill>
  );
};
