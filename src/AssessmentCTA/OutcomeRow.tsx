import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import type { OutcomeSpec } from "./timeline";
import { PAD_LEFT, ROW0_Y, ROW_MARK_W, ROW_PITCH, T } from "./timeline";

type Props = { spec: OutcomeSpec };

export const OutcomeRow: React.FC<Props> = ({ spec }) => {
  const frame = useCurrentFrame();

  const row = fadeSlide(frame, spec.inStart, T.rowDur, 12);
  // the marker draws before the words land, never the other way round
  const mark = clampedInterp(
    frame,
    [spec.inStart - 6, spec.inStart + 14],
    [0, 22],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: PAD_LEFT,
        top: ROW0_Y + spec.slot * ROW_PITCH,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 17,
          width: mark,
          height: 2,
          background: palette.warmGold,
          borderRadius: 1,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: ROW_MARK_W,
          top: 0,
          whiteSpace: "nowrap",
          opacity: row.opacity,
          transform: `translateY(${row.translateY}px)`,
          fontFamily: poppins,
          fontSize: 27,
          fontWeight: 600,
          letterSpacing: 1.6,
          color: spec.emphasis ? palette.warmGold : palette.softWhite,
        }}
      >
        {spec.text}
      </span>
    </div>
  );
};
