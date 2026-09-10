import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic } from "./utils";
import { TopLabel } from "./TopLabel";
import { PropertyCard } from "./PropertyCard";
import { MatchedSpecRow } from "./MatchedSpecRow";
import { PivotStatement } from "./PivotStatement";
import { SplitLine } from "./SplitLine";
import { DifferenceColumn } from "./DifferenceColumn";
import { ClosingStatement } from "./ClosingStatement";
import { CARD_LEFT_X, CARD_RIGHT_X, SPEC_ROWS, T } from "./timeline";

export const SameOnPaperScene: React.FC = () => {
  const frame = useCurrentFrame();

  const stageOpacity = clampedInterp(
    frame,
    [T.stageOut, T.stageOut + T.stageOutDur],
    [1, 0],
    easeOutCubic,
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(118% 88% at 50% 14%, ${palette.charcoal} 0%, ${palette.nearBlack} 62%)`,
      }}
    >
      {stageOpacity > 0 ? (
        <AbsoluteFill style={{ opacity: stageOpacity }}>
          <TopLabel />

          <SplitLine />

          <PropertyCard
            name="HOUSE A"
            centerX={CARD_LEFT_X}
            emphasised={false}
          />
          <PropertyCard name="HOUSE B" centerX={CARD_RIGHT_X} emphasised />

          {SPEC_ROWS.map((row, i) => (
            <MatchedSpecRow key={row.label} row={row} index={i} />
          ))}

          <PivotStatement />

          <DifferenceColumn />
        </AbsoluteFill>
      ) : null}

      <ClosingStatement />
    </AbsoluteFill>
  );
};
