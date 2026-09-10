import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, fadeRise } from "./utils";
import {
  A2_LABEL,
  A2_LABEL_Y,
  CENTER_X,
  FIT_BAND_H,
  FIT_BAND_Y,
  FIT_TEXT,
  QUESTIONS,
  Q_H,
  Q_W,
  T,
  questionX,
  questionY,
  type Question,
} from "./timeline";

const QuestionCard: React.FC<{
  question: Question;
  index: number;
  dim: number;
}> = ({ question, index, dim }) => {
  const frame = useCurrentFrame();
  const enter = fadeRise(frame, question.inStart, T.questionDur, 10);

  if (enter.opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: questionX(index),
        top: questionY(index),
        width: Q_W,
        height: Q_H,
        transform: `translate(-50%, -50%) translateY(${enter.translateY}px)`,
        opacity: enter.opacity * (1 - 0.72 * dim),
        background: palette.charcoal,
        border: `1px solid ${palette.hairline}`,
        borderRadius: 10,
        boxShadow: "0 22px 46px -34px rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 30px",
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 23,
          fontWeight: 500,
          letterSpacing: 1.6,
          color: palette.softWhite,
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {question.label}
      </span>
    </div>
  );
};

/** Act 2: nine questions a real target is built from, then the one that
 *  places this property inside them. */
export const QuestionGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const label = fadeRise(frame, T.a2LabelIn, T.a2LabelDur, 8);
  const fit = clampedInterp(
    frame,
    [T.fitStart, T.fitStart + T.fitDur],
    [0, 1],
    easeInOutCubic,
  );
  const out = clampedInterp(frame, [T.a2Out, T.a2Out + T.a2OutDur], [1, 0]);

  if (label.opacity <= 0 || out <= 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: A2_LABEL_Y,
          transform: `translate(-50%, -50%) translateY(${label.translateY}px)`,
          opacity: label.opacity * (1 - fit),
          fontFamily: poppins,
          fontSize: 19,
          fontWeight: 500,
          letterSpacing: 7,
          color: palette.gold,
          whiteSpace: "nowrap",
        }}
      >
        {A2_LABEL}
      </span>

      {QUESTIONS.map((question, i) => (
        <QuestionCard
          key={question.label}
          question={question}
          index={i}
          dim={fit}
        />
      ))}

      {fit > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: FIT_BAND_Y,
            height: FIT_BAND_H,
            transform: "translateY(-50%)",
            background: palette.nearBlack,
            opacity: fit * 0.94,
          }}
        />
      ) : null}

      {fit > 0 ? (
        <span
          style={{
            position: "absolute",
            left: CENTER_X,
            top: FIT_BAND_Y,
            transform: `translate(-50%, -50%) translateY(${(1 - fit) * 12}px)`,
            opacity: fit,
            fontFamily: poppins,
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: 1.5,
            color: palette.gold,
            whiteSpace: "nowrap",
          }}
        >
          {FIT_TEXT}
        </span>
      ) : null}
    </div>
  );
};
