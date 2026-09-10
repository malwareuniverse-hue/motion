import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeRise } from "./utils";
import { CENTER_X, T, TOP_LABEL, TOP_LABEL_Y } from "./timeline";

export const TopLabel: React.FC = () => {
  const frame = useCurrentFrame();

  const enter = fadeRise(frame, T.labelIn, T.labelDur, 8);
  const out = clampedInterp(
    frame,
    [T.labelOut, T.labelOut + T.labelOutDur],
    [1, 0],
  );

  if (out <= 0) return null;

  return (
    <span
      style={{
        position: "absolute",
        left: CENTER_X,
        top: TOP_LABEL_Y,
        transform: `translate(-50%, -50%) translateY(${enter.translateY}px)`,
        opacity: enter.opacity * out,
        fontFamily: poppins,
        fontSize: 19,
        fontWeight: 500,
        letterSpacing: 7,
        color: palette.gold,
        whiteSpace: "nowrap",
      }}
    >
      {TOP_LABEL}
    </span>
  );
};
