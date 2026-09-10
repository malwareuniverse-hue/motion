import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import {
  CARD_LEFT_X,
  CARD_RIGHT_X,
  SPEC_DOT_R,
  SPEC_LABEL_PAD,
  T,
  specRowY,
  type SpecRow,
} from "./timeline";

const dotStyle: React.CSSProperties = {
  width: SPEC_DOT_R * 2,
  height: SPEC_DOT_R * 2,
  borderRadius: "50%",
  background: palette.mutedGray,
  flex: "0 0 auto",
};

/**
 * One attribute both houses share: a centred label with hairlines drawn out to
 * a marker under each card. Reads as "both" without a checkmark or a tick.
 */
export const MatchedSpecRow: React.FC<{ row: SpecRow; index: number }> = ({
  row,
  index,
}) => {
  const frame = useCurrentFrame();

  const label = fadeRise(frame, row.inStart, T.specRowDur, 10);
  const draw = clampedInterp(
    frame,
    [row.inStart + 8, row.inStart + 30],
    [0, 1],
    easeOutCubic,
  );
  const dot = clampedInterp(
    frame,
    [row.inStart + 26, row.inStart + 38],
    [0, 1],
  );
  const out = clampedInterp(
    frame,
    [T.specRowsOut, T.specRowsOut + T.specRowsOutDur],
    [1, 0],
  );

  if (out <= 0) return null;

  const line = (origin: "left" | "right"): React.CSSProperties => ({
    flex: 1,
    height: 1,
    background: palette.mutedGrayFaint,
    transform: `scaleX(${draw})`,
    transformOrigin: origin,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: CARD_LEFT_X,
        top: specRowY(index),
        width: CARD_RIGHT_X - CARD_LEFT_X,
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        opacity: out,
      }}
    >
      <div
        style={{ ...dotStyle, opacity: dot * 0.8, marginLeft: -SPEC_DOT_R }}
      />
      <div style={line("right")} />
      <span
        style={{
          padding: `0 ${SPEC_LABEL_PAD}px`,
          transform: `translateY(${label.translateY}px)`,
          opacity: label.opacity,
          fontFamily: poppins,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 3.2,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {row.label}
      </span>
      <div style={line("left")} />
      <div
        style={{ ...dotStyle, opacity: dot * 0.8, marginRight: -SPEC_DOT_R }}
      />
    </div>
  );
};
