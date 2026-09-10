import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import { Statement } from "./Statement";
import {
  KNOW_KEY,
  KNOW_LEAD,
  NOT_DREAM_TEXT,
  NOT_ENOUGH_TEXT,
  PROBLEM_TEXT,
  T,
  TARGET_TEXT,
  WIN_TEXT,
} from "./timeline";

/** The three full-screen beats that carry the argument between the acts. */
export const TargetBeats: React.FC = () => {
  const frame = useCurrentFrame();

  // "that is not enough" — the verdict on a guessed number.
  const notEnough = fadeRise(frame, T.notEnoughIn, T.notEnoughDur, 12);
  const notEnoughOut = clampedInterp(
    frame,
    [T.notEnoughOut, T.notEnoughOut + T.notEnoughOutDur],
    [1, 0],
  );

  // "now we can build a real target / not a dream, not a guess"
  const target = fadeRise(frame, T.targetIn, T.targetDur, 12);
  const notDream = fadeRise(frame, T.notDreamIn, T.notDreamDur, 10);
  const targetRule = clampedInterp(
    frame,
    [T.targetIn - 8, T.targetIn + 22],
    [0, 140],
    easeOutCubic,
  );
  const a3Out = clampedInterp(frame, [T.a3Out, T.a3Out + T.a3OutDur], [1, 0]);

  // "if you don't know the target / you don't know if you're winning"
  const know = fadeRise(frame, T.knowIn, T.knowDur, 12);
  const win = fadeRise(frame, T.winIn, T.winDur, 12);
  const problem = fadeRise(frame, T.problemIn, T.problemDur, 10);
  const a3bOut = clampedInterp(
    frame,
    [T.a3bOut, T.a3bOut + T.a3bOutDur],
    [1, 0],
  );

  return (
    <>
      <Statement
        opacity={notEnough.opacity > 0 ? notEnoughOut : 0}
        lines={[
          {
            content: NOT_ENOUGH_TEXT,
            opacity: notEnough.opacity,
            shift: notEnough.translateY,
            size: 68,
            color: palette.gold,
          },
        ]}
      />

      <Statement
        opacity={target.opacity > 0 ? a3Out : 0}
        rule={targetRule}
        lines={[
          {
            content: TARGET_TEXT,
            opacity: target.opacity,
            shift: target.translateY,
            size: 58,
          },
          {
            content: NOT_DREAM_TEXT,
            opacity: notDream.opacity,
            shift: notDream.translateY,
            size: 28,
            weight: 400,
            letterSpacing: 6,
            color: palette.mutedGray,
          },
        ]}
      />

      <Statement
        opacity={know.opacity > 0 ? a3bOut : 0}
        gap={28}
        lines={[
          {
            content: (
              <>
                {KNOW_LEAD}
                <span style={{ color: palette.gold }}>{KNOW_KEY}</span>
              </>
            ),
            opacity: know.opacity,
            shift: know.translateY,
            size: 54,
          },
          {
            content: WIN_TEXT,
            opacity: win.opacity,
            shift: win.translateY,
            size: 54,
          },
          {
            content: PROBLEM_TEXT,
            opacity: problem.opacity,
            shift: problem.translateY,
            size: 28,
            weight: 400,
            letterSpacing: 6,
            color: palette.mutedGray,
          },
        ]}
      />
    </>
  );
};
