import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { GoalBeat } from "./GoalBeat";
import { FinalStatement } from "./FinalStatement";
import { TargetIcon } from "./TargetIcon";
import { GaugeIcon } from "./GaugeIcon";
import { LINE_1, LINE_2, T } from "./timeline";

const splitLines = (text: string): [string, string] => {
  const [first, second] = text.split("\n");
  return [first, second];
};

export const GoalsCanBeWrongScene: React.FC = () => {
  const frame = useCurrentFrame();

  // beat1 -> beat2, crossfaded exactly over the transcript's first pause
  const beat1Opacity = clampedInterp(
    frame,
    [T.fade1Start, T.fade1Start + T.fade1Dur],
    [1, 0],
    easeInCubic,
  );
  const beat2Opacity = clampedInterp(
    frame,
    [T.fade1Start, T.fade1Start + T.fade1Dur],
    [0, 1],
    easeOutCubic,
  );

  // beat2 -> beat3, crossfaded exactly over the transcript's second pause
  const beat2ExitOpacity = clampedInterp(
    frame,
    [T.fade2Start, T.fade2Start + T.fade2Dur],
    [1, 0],
    easeInCubic,
  );
  const beat3Opacity = clampedInterp(
    frame,
    [T.fade2Start, T.fade2Start + T.fade2Dur],
    [0, 1],
    easeOutCubic,
  );

  const exit = clampedInterp(
    frame,
    [T.outStart, T.outStart + T.outDur],
    [1, 0],
    easeInCubic,
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 14%, ${palette.groundLift} 0%, transparent 62%), ${palette.nearBlack}`,
      }}
    >
      <AbsoluteFill style={{ opacity: exit }}>
        <AbsoluteFill style={{ opacity: beat1Opacity }}>
          <GoalBeat
            icon={<TargetIcon />}
            lines={splitLines(LINE_1)}
            startFrame={T.beat1In}
          />
        </AbsoluteFill>

        <AbsoluteFill style={{ opacity: Math.min(beat2Opacity, beat2ExitOpacity) }}>
          <GoalBeat
            icon={<GaugeIcon />}
            lines={splitLines(LINE_2)}
            startFrame={T.beat2In}
          />
        </AbsoluteFill>

        <AbsoluteFill style={{ opacity: beat3Opacity }}>
          <FinalStatement />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
