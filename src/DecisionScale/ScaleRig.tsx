import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { GAUGE_CENTER, GAUGE_R, PAN_DROP, PAN_W, PIVOT, T, beamEnds, tiltMagnitudeAt } from "./timeline";

export const ScaleRig: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = clampedInterp(frame, [T.rigInStart, T.rigInStart + T.rigInDur], [0, 1]);
  if (opacity <= 0) return null;

  const tilt = tiltMagnitudeAt(frame);
  const { left, right } = beamEnds(tilt);
  const gaugeTop = { x: GAUGE_CENTER.x, y: GAUGE_CENTER.y - GAUGE_R };

  const panCenter = { x: left.x, y: left.y + PAN_DROP };
  const panLeft = { x: panCenter.x - PAN_W / 2, y: panCenter.y };
  const panRight = { x: panCenter.x + PAN_W / 2, y: panCenter.y };

  const fulcrumBaseY = PIVOT.y + 150;
  const fulcrumHalfW = 70;

  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity }}>
      <path
        d={`M ${PIVOT.x - fulcrumHalfW} ${fulcrumBaseY} L ${PIVOT.x + fulcrumHalfW} ${fulcrumBaseY} L ${PIVOT.x} ${PIVOT.y} Z`}
        fill="none"
        stroke={palette.lineFaint}
        strokeWidth={1.5}
      />
      <line
        x1={PIVOT.x - fulcrumHalfW}
        y1={fulcrumBaseY}
        x2={PIVOT.x + fulcrumHalfW}
        y2={fulcrumBaseY}
        stroke={palette.lineFaint}
        strokeWidth={1.5}
      />

      <line x1={left.x} y1={left.y} x2={right.x} y2={right.y} stroke={palette.amber} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={PIVOT.x} cy={PIVOT.y} r={7} fill={palette.amber} />

      <line x1={left.x} y1={left.y} x2={panLeft.x} y2={panLeft.y} stroke={palette.line} strokeWidth={1.4} />
      <line x1={left.x} y1={left.y} x2={panRight.x} y2={panRight.y} stroke={palette.line} strokeWidth={1.4} />
      <path
        d={`M ${panLeft.x} ${panLeft.y} Q ${panCenter.x} ${panCenter.y + 16} ${panRight.x} ${panRight.y}`}
        fill="none"
        stroke={palette.line}
        strokeWidth={1.6}
      />

      <line x1={right.x} y1={right.y} x2={gaugeTop.x} y2={gaugeTop.y} stroke={palette.line} strokeWidth={1.4} />
    </svg>
  );
};

export const scalePanCenter = (frame: number) => {
  const tilt = tiltMagnitudeAt(frame);
  const { left } = beamEnds(tilt);
  return { x: left.x, y: left.y + PAN_DROP };
};
