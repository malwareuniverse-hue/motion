import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, fadeRise } from "./utils";
import { HEIGHT, LOWER_THIRD, SAFE_X } from "./timeline";

/**
 * 1:22-end  compact event lower third under the CTA.
 *
 * Sits on the quiet side of frame in the lower-left safe area and clears once
 * the point lands - it never covers Emile's face and never becomes a CTA panel.
 * Render with alpha and key it over the camera track.
 *
 * WORDING NEEDS MAYNARD'S CONFIRMATION. Defaults below are placeholders taken
 * from Emile's own line; swap them for the approved VRMA template copy.
 */

export type VrmaLowerThirdProps = {
  label: string;
  headline: string;
  transparent: boolean;
};

export const VrmaLowerThird: React.FC<VrmaLowerThirdProps> = ({
  label,
  headline,
  transparent,
}) => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [LOWER_THIRD.ruleStart, LOWER_THIRD.ruleStart + LOWER_THIRD.ruleDur],
    [0, 96],
  );
  const labelRise = fadeRise(
    frame,
    LOWER_THIRD.labelStart,
    LOWER_THIRD.textDur,
    10,
  );
  const headlineRise = fadeRise(
    frame,
    LOWER_THIRD.headlineStart,
    LOWER_THIRD.textDur,
    10,
  );
  const out = clampedInterp(
    frame,
    [LOWER_THIRD.outStart, LOWER_THIRD.outStart + LOWER_THIRD.outDur],
    [1, 0],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparent ? "transparent" : palette.nearBlack,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: HEIGHT - 620,
          opacity: out,
          display: "flex",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 2,
            height: rule,
            background: palette.gold,
            borderRadius: 2,
            marginTop: 6,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 3.2,
              color: palette.gold,
              opacity: labelRise.opacity,
              transform: `translateY(${labelRise.translateY}px)`,
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 46,
              fontWeight: 600,
              letterSpacing: 0.4,
              color: palette.white,
              opacity: headlineRise.opacity,
              transform: `translateY(${headlineRise.translateY}px)`,
            }}
          >
            {headline}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const vrmaLowerThirdDefaults: VrmaLowerThirdProps = {
  label: "COME SEE ME AT",
  headline: "VRMA Nashville",
  transparent: true,
};
