import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { beatOpacity, fadeUp } from "./utils";
import { Kicker, StatementFrame, headlineStyle } from "./Primitives";
import { useLayout } from "./layout";
import { T } from "./timeline";

/**
 * THE QUESTION (0:20–0:25). Full-screen key statement on near-black — no
 * B-roll behind it, so the question is the only thing in the frame.
 */
export const QuestionStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();

  const opacity = beatOpacity(
    frame,
    T.questionIn,
    1,
    T.questionOut,
    T.questionOutDur,
  );
  if (opacity <= 0) return null;

  const kicker = fadeUp(frame, T.questionIn, 24, 12);
  const l1 = fadeUp(frame, T.questionIn + 10, 28);
  const l2 = fadeUp(frame, T.questionLine2In, 28);

  return (
    <StatementFrame opacity={opacity} gap={30}>
      <div
        style={{
          opacity: kicker.opacity,
          transform: `translateY(${kicker.translateY}px)`,
        }}
      >
        <Kicker>THE REAL QUESTION</Kicker>
      </div>
      <div>
        <div
          style={{
            ...headlineStyle(l),
            opacity: l1.opacity,
            transform: `translateY(${l1.translateY}px)`,
          }}
        >
          IS YOUR REVENUE OPERATION
        </div>
        <div
          style={{
            ...headlineStyle(l),
            marginTop: 8,
            opacity: l2.opacity,
            transform: `translateY(${l2.translateY}px)`,
          }}
        >
          ACTUALLY <span style={{ color: palette.gold }}>READY</span> FOR THEM?
        </div>
      </div>
    </StatementFrame>
  );
};
