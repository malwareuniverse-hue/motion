import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { FrameworkPanel } from "./FrameworkPanel";
import type { Backdrop, FiveThingsProps } from "./timeline";

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
 * fade happens against charcoal inside it. That keeps the key free of spill and
 * grey edges. See timeline.ts for the render commands.
 */
export const FiveThingsScene: React.FC<FiveThingsProps> = ({ backdrop }) => {
  return (
    <AbsoluteFill style={backdropFill(backdrop)}>
      <FrameworkPanel />
    </AbsoluteFill>
  );
};
