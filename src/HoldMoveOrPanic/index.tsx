import React from "react";
import { AbsoluteFill } from "remotion";
import { CtaCard } from "./CtaCard";

/**
 * Transparent-background overlay: Emile stays on camera underneath, on the
 * left of frame — same right-side placement as SimpleStrategiesCTA. See
 * timeline.ts for the alpha render command.
 */
export const HoldMoveOrPanicScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <CtaCard />
    </AbsoluteFill>
  );
};
