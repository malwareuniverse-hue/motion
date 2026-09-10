import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, easeOutCubic, fadeRise } from "./utils";
import {
  CENTER_X,
  CRITERIA,
  HEAD_LABEL,
  HEAD_SCALE_DOCKED,
  HEAD_TEXT,
  HEAD_Y_DOCKED,
  HEAD_Y_OPEN,
  ROW_LABEL_X,
  ROW_LEFT_X,
  ROW_RIGHT_X,
  T,
  rowY,
  type Criterion,
} from "./timeline";

const RULE_OFFSET = 40;

const CriterionRow: React.FC<{ criterion: Criterion; index: number }> = ({
  criterion,
  index,
}) => {
  const frame = useCurrentFrame();

  const enter = fadeRise(frame, criterion.inStart, T.criteriaDur, 10);
  const rule = clampedInterp(
    frame,
    [criterion.inStart + 10, criterion.inStart + 10 + T.ruleDur],
    [0, 1],
    easeOutCubic,
  );

  if (enter.opacity <= 0) return null;

  const y = rowY(index);

  return (
    <>
      <span
        style={{
          position: "absolute",
          left: ROW_LEFT_X,
          top: y,
          transform: `translateY(-50%) translateY(${enter.translateY}px)`,
          opacity: enter.opacity,
          fontFamily: poppins,
          fontSize: 25,
          fontWeight: 600,
          letterSpacing: 2,
          color: palette.gold,
        }}
      >
        {criterion.index}
      </span>
      <span
        style={{
          position: "absolute",
          left: ROW_LABEL_X,
          top: y,
          transform: `translateY(-50%) translateY(${enter.translateY}px)`,
          opacity: enter.opacity,
          fontFamily: poppins,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: 3,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {criterion.label}
      </span>
      <div
        style={{
          position: "absolute",
          left: ROW_LEFT_X,
          top: y + RULE_OFFSET,
          width: ROW_RIGHT_X - ROW_LEFT_X,
          height: 1,
          background: palette.hairline,
          transform: `scaleX(${rule})`,
          transformOrigin: "left",
        }}
      />
    </>
  );
};

/**
 * Act 2: the question opens full-screen, then docks to the top and becomes
 * the header for the five things the guest actually judges.
 */
export const CriteriaList: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = fadeRise(frame, T.headIn, T.headDur, 14);
  const dock = clampedInterp(
    frame,
    [T.headDockStart, T.headDockStart + T.headDockDur],
    [0, 1],
    easeInOutCubic,
  );
  const out = clampedInterp(frame, [T.stage2Out, T.stage2Out + T.stage2OutDur], [1, 0]);

  if (enter.opacity <= 0 || out <= 0) return null;

  const headY = HEAD_Y_OPEN + (HEAD_Y_DOCKED - HEAD_Y_OPEN) * dock;
  const headScale = 1 + (HEAD_SCALE_DOCKED - 1) * dock;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: headY,
          transform: `translate(-50%, -50%) translateY(${enter.translateY}px) scale(${headScale})`,
          opacity: enter.opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 19,
            fontWeight: 500,
            letterSpacing: 7,
            color: palette.gold,
            whiteSpace: "nowrap",
          }}
        >
          {HEAD_LABEL}
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 50,
            fontWeight: 600,
            letterSpacing: 1.5,
            color: palette.softWhite,
            whiteSpace: "nowrap",
          }}
        >
          {HEAD_TEXT}
        </span>
      </div>

      {CRITERIA.map((criterion, i) => (
        <CriterionRow key={criterion.index} criterion={criterion} index={i} />
      ))}
    </div>
  );
};
