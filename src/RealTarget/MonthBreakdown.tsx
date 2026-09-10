import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, fadeRise } from "./utils";
import {
  BAR_GAP_MAX,
  BAR_H,
  BAR_LABEL,
  BAR_LABEL_Y,
  BAR_Y,
  CENTER_X,
  JOB_TEXT,
  JOB_Y,
  MONTHS,
  MONTH_LABEL_Y,
  REASON_TEXT,
  REASON_Y,
  T,
  segmentWidth,
  segmentX,
} from "./timeline";

/**
 * Act 4: one annual target, broken into twelve months that each carry a
 * job. The bar starts solid and separates — the split is the whole idea.
 */
export const MonthBreakdown: React.FC = () => {
  const frame = useCurrentFrame();

  const label = fadeRise(frame, T.barLabelIn, T.barLabelDur, 8);
  const bar = clampedInterp(
    frame,
    [T.barIn, T.barIn + T.barDur],
    [0, 1],
    easeInOutCubic,
  );
  const gap = clampedInterp(
    frame,
    [T.splitStart, T.splitStart + T.splitDur],
    [0, BAR_GAP_MAX],
    easeInOutCubic,
  );
  const job = fadeRise(frame, T.jobIn, T.jobDur, 12);
  const reason = fadeRise(frame, T.reasonIn, T.reasonDur, 10);
  const out = clampedInterp(frame, [T.a4aOut, T.a4aOut + T.a4aOutDur], [1, 0]);

  if (label.opacity <= 0 || out <= 0) return null;

  const segW = segmentWidth(gap);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: BAR_LABEL_Y,
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
        {BAR_LABEL}
      </span>

      {MONTHS.map((month, i) => {
        const monthStart = T.monthsIn + i * T.monthStagger;
        const monthIn = clampedInterp(
          frame,
          [monthStart, monthStart + T.monthsDur],
          [0, 1],
        );
        return (
          <React.Fragment key={`${month}-${i}`}>
            <div
              style={{
                position: "absolute",
                left: segmentX(i, gap),
                top: BAR_Y,
                width: segW,
                height: BAR_H,
                transform: `translateY(-50%) scaleY(${bar})`,
                opacity: bar,
                background: palette.gold,
                borderRadius: gap > 2 ? 3 : 0,
              }}
            />
            <span
              style={{
                position: "absolute",
                left: segmentX(i, gap) + segW / 2,
                top: MONTH_LABEL_Y,
                transform: `translate(-50%, -50%) translateY(${(1 - monthIn) * 8}px)`,
                opacity: monthIn,
                fontFamily: poppins,
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: 2,
                color: palette.mutedGray,
              }}
            >
              {month}
            </span>
          </React.Fragment>
        );
      })}

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: JOB_Y,
          transform: `translate(-50%, -50%) translateY(${job.translateY}px)`,
          opacity: job.opacity,
          fontFamily: poppins,
          fontSize: 46,
          fontWeight: 600,
          letterSpacing: 1.5,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {JOB_TEXT}
      </span>

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: REASON_Y,
          transform: `translate(-50%, -50%) translateY(${reason.translateY}px)`,
          opacity: reason.opacity,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: 4,
          color: palette.gold,
          whiteSpace: "nowrap",
        }}
      >
        {REASON_TEXT}
      </span>
    </div>
  );
};
