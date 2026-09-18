import React from "react";
import { AbsoluteFill } from "remotion";
import { CtaCard } from "./CtaCard";

/**
 * Transparent-background overlay: Emile stays on camera underneath.
 * See timeline.ts for the alpha render command.
 */
export const SubscribeCTAScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <CtaCard />
    </AbsoluteFill>
  );
};
