import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { AssessmentPanel } from "./AssessmentPanel";
import type { AssessmentCTAProps, Backdrop } from "./timeline";

const backdropFill = (backdrop: Backdrop): React.CSSProperties => {
  if (backdrop === "green") {
    return { backgroundColor: palette.chromaGreen };
  }
  if (backdrop === "dark") {
    return {
      background: `radial-gradient(110% 80% at 26% 40%, ${palette.groundLift} 0%, transparent 64%), ${palette.nearBlack}`,
    };
  }
  return { backgroundColor: "transparent" };
};

/**
 * On the green backdrop nothing is drawn over the green at partial opacity: the
 * panel is a solid surface that wipes in by height and slides out, and every
 * fade happens against charcoal inside it. See timeline.ts for render commands.
 */
export const AssessmentCTAScene: React.FC<AssessmentCTAProps> = ({
  backdrop,
}) => {
  return (
    <AbsoluteFill style={backdropFill(backdrop)}>
      <AssessmentPanel />
    </AbsoluteFill>
  );
};
