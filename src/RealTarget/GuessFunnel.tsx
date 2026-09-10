import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import {
  A1_HEAD,
  A1_HEAD_Y,
  A1_LABEL,
  A1_LABEL_Y,
  CENTER_X,
  FUNNEL_TIP_Y,
  GUESSES,
  GUESS_H,
  GUESS_W,
  GUESS_Y,
  NUMBER_H,
  NUMBER_TEXT,
  NUMBER_W,
  NUMBER_Y,
  PROMISE_TEXT,
  PROMISE_Y,
  T,
  guessX,
  type Guess,
} from "./timeline";

const GuessCard: React.FC<{ guess: Guess; index: number }> = ({
  guess,
  index,
}) => {
  const frame = useCurrentFrame();
  const enter = fadeRise(frame, guess.inStart, T.guessDur, 12);

  if (enter.opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: guessX(index),
        top: GUESS_Y,
        width: GUESS_W,
        height: GUESS_H,
        transform: `translate(-50%, -50%) translateY(${enter.translateY}px)`,
        opacity: enter.opacity,
        background: palette.charcoal,
        border: `1px solid ${palette.hairline}`,
        borderRadius: 12,
        boxShadow: "0 26px 52px -34px rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: 2.4,
          color: palette.softWhite,
          textAlign: "center",
        }}
      >
        {guess.label}
      </span>
    </div>
  );
};

/** Three shortcuts, all funnelling down into a single number. */
export const GuessFunnel: React.FC = () => {
  const frame = useCurrentFrame();

  const label = fadeRise(frame, T.a1LabelIn, T.a1LabelDur, 8);
  const head = fadeRise(frame, T.a1HeadIn, T.a1HeadDur, 12);
  const funnel = clampedInterp(
    frame,
    [T.funnelDraw, T.funnelDraw + T.funnelDur],
    [0, 1],
    easeOutCubic,
  );
  const number = fadeRise(frame, T.numberIn, T.numberDur, 12);
  const promise = fadeRise(frame, T.promiseIn, T.promiseDur, 10);
  const out = clampedInterp(frame, [T.a1Out, T.a1Out + T.a1OutDur], [1, 0]);

  if (out <= 0) return null;

  const cardBottom = GUESS_Y + GUESS_H / 2;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: A1_LABEL_Y,
          transform: `translate(-50%, -50%) translateY(${label.translateY}px)`,
          opacity: label.opacity,
          fontFamily: poppins,
          fontSize: 19,
          fontWeight: 500,
          letterSpacing: 7,
          color: palette.gold,
          whiteSpace: "nowrap",
        }}
      >
        {A1_LABEL}
      </span>

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: A1_HEAD_Y,
          transform: `translate(-50%, -50%) translateY(${head.translateY}px)`,
          opacity: head.opacity,
          fontFamily: poppins,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: 1.5,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {A1_HEAD}
      </span>

      {GUESSES.map((guess, i) => (
        <GuessCard key={guess.label} guess={guess} index={i} />
      ))}

      {funnel > 0 ? (
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
          aria-hidden
        >
          {GUESSES.map((guess, i) => (
            <line
              key={guess.label}
              x1={guessX(i)}
              y1={cardBottom}
              x2={CENTER_X + (guessX(i) - CENTER_X) * (1 - funnel)}
              y2={cardBottom + (FUNNEL_TIP_Y - cardBottom) * funnel}
              stroke={palette.goldLine}
              strokeWidth={1}
            />
          ))}
        </svg>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: NUMBER_Y,
          width: NUMBER_W,
          height: NUMBER_H,
          transform: `translate(-50%, -50%) translateY(${number.translateY}px)`,
          opacity: number.opacity,
          background: palette.charcoal,
          border: `1.5px solid ${palette.goldLine}`,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: 3,
            color: palette.gold,
          }}
        >
          {NUMBER_TEXT}
        </span>
      </div>

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: PROMISE_Y,
          transform: `translate(-50%, -50%) translateY(${promise.translateY}px)`,
          opacity: promise.opacity,
          fontFamily: poppins,
          fontSize: 26,
          fontWeight: 400,
          letterSpacing: 5,
          color: palette.mutedGray,
          whiteSpace: "nowrap",
        }}
      >
        {PROMISE_TEXT}
      </span>
    </div>
  );
};
