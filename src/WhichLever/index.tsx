import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, fadeRise } from "./utils";
import { LeverRow } from "./LeverRow";
import { Statement } from "./Statement";
import {
  CENTER_X,
  HEAD_SCALE_DOCKED,
  HEAD_TEXT,
  HEAD_Y_DOCKED,
  HEAD_Y_OPEN,
  Q1_KEY,
  Q1_LEAD,
  Q2_KEY,
  Q2_LEAD,
  SUB_GAP,
  SUB_TEXT,
  T,
  TEXT_MAX_W,
} from "./timeline";

export const WhichLeverScene: React.FC = () => {
  const frame = useCurrentFrame();

  const head = fadeRise(frame, T.headIn, T.headDur, 14);
  const sub = fadeRise(frame, T.subIn, T.subDur, 10);
  const dock = clampedInterp(
    frame,
    [T.dockStart, T.dockStart + T.dockDur],
    [0, 1],
    easeInOutCubic,
  );

  // The lever stage recedes behind the first question, then clears.
  const dim = clampedInterp(
    frame,
    [T.stageDim, T.stageDim + T.stageDimDur],
    [1, 0.26],
  );
  const stageOut = clampedInterp(
    frame,
    [T.stageOut, T.stageOut + T.stageOutDur],
    [1, 0],
  );

  const q1 = fadeRise(frame, T.q1In, T.q1Dur, 12);
  const q1Out = clampedInterp(frame, [T.q1Out, T.q1Out + T.q1OutDur], [1, 0]);
  const q2 = fadeRise(frame, T.q2In, T.q2Dur, 12);

  const headY = HEAD_Y_OPEN + (HEAD_Y_DOCKED - HEAD_Y_OPEN) * dock;
  const headScale = 1 + (HEAD_SCALE_DOCKED - 1) * dock;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(118% 88% at 50% 14%, ${palette.charcoal} 0%, ${palette.nearBlack} 62%)`,
      }}
    >
      <AbsoluteFill style={{ opacity: dim * stageOut }}>
        <div
          style={{
            position: "absolute",
            left: CENTER_X,
            top: headY,
            width: TEXT_MAX_W,
            transform: `translate(-50%, -50%) translateY(${head.translateY}px) scale(${headScale})`,
            opacity: head.opacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: SUB_GAP,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 66,
              fontWeight: 600,
              letterSpacing: 1,
              color: palette.softWhite,
              textAlign: "center",
              lineHeight: 1.18,
              maxWidth: TEXT_MAX_W,
              whiteSpace: "pre-line",
            }}
          >
            {HEAD_TEXT}
          </span>
          <span
            style={{
              opacity: sub.opacity * (1 - dock * 0.55),
              transform: `translateY(${sub.translateY}px)`,
              fontFamily: poppins,
              fontSize: 24,
              fontWeight: 400,
              letterSpacing: 4,
              color: palette.mutedGray,
              textAlign: "center",
            }}
          >
            {SUB_TEXT}
          </span>
        </div>

        <LeverRow />
      </AbsoluteFill>

      <Statement
        opacity={q1.opacity > 0 ? q1Out : 0}
        lines={[
          {
            content: (
              <>
                {Q1_LEAD}
                <span style={{ color: palette.gold }}>{Q1_KEY}</span>
              </>
            ),
            opacity: q1.opacity,
            shift: q1.translateY,
            size: 58,
          },
        ]}
      />

      <Statement
        opacity={q2.opacity > 0 ? 1 : 0}
        lines={[
          {
            content: (
              <>
                {Q2_LEAD}
                <span style={{ color: palette.gold }}>{Q2_KEY}</span>
              </>
            ),
            opacity: q2.opacity,
            shift: q2.translateY,
            size: 58,
          },
        ]}
      />
    </AbsoluteFill>
  );
};
