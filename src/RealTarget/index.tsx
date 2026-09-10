import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { GuessFunnel } from "./GuessFunnel";
import { QuestionGrid } from "./QuestionGrid";
import { TargetBeats } from "./TargetBeats";
import { MonthBreakdown } from "./MonthBreakdown";
import { BetterQuestion } from "./BetterQuestion";
import { ClosingStatement } from "./ClosingStatement";

export const RealTargetScene: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(118% 88% at 50% 14%, ${palette.charcoal} 0%, ${palette.nearBlack} 62%)`,
    }}
  >
    <GuessFunnel />
    <QuestionGrid />
    <MonthBreakdown />
    <BetterQuestion />
    <TargetBeats />
    <ClosingStatement />
  </AbsoluteFill>
);
