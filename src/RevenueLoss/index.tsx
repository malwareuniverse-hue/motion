import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { BackgroundField } from "./BackgroundField";
import { BaselineRule } from "./BaselineRule";
import { TrendArea } from "./TrendArea";
import { LeakParticles } from "./LeakParticles";
import type { Backdrop, RevenueLossProps } from "./timeline";

const backdropFill = (backdrop: Backdrop): React.CSSProperties => {
  if (backdrop === "transparent") {
    return { backgroundColor: "transparent" };
  }
  return {
    background: `radial-gradient(120% 90% at 50% 20%, ${palette.groundLift} 0%, transparent 62%), ${palette.nearBlack}`,
  };
};

/**
 * A reusable animated background for "losing money" / business decline — not
 * cued to any script. No on-screen wording: add typography in the editor.
 * See timeline.ts for the alpha render command.
 */
export const RevenueLossScene: React.FC<RevenueLossProps> = ({ backdrop }) => {
  return (
    <AbsoluteFill style={backdropFill(backdrop)}>
      <BackgroundField />
      <BaselineRule />
      <TrendArea />
      <LeakParticles />
    </AbsoluteFill>
  );
};
