import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import type { BenefitSpec } from "./timeline";
import { BENEFIT0_Y, BENEFIT_PITCH, PAD_LEFT, T } from "./timeline";

type Props = { spec: BenefitSpec };

export const BenefitRow: React.FC<Props> = ({ spec }) => {
  const frame = useCurrentFrame();
  const row = fadeSlide(frame, spec.inStart, T.benefitDur, 12);

  return (
    <div
      style={{
        position: "absolute",
        left: PAD_LEFT,
        top: BENEFIT0_Y + spec.slot * BENEFIT_PITCH,
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: row.opacity,
        transform: `translateY(${row.translateY}px)`,
      }}
    >
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: 4,
          background: palette.mutedGray,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: 2.6,
          color: palette.mutedGray,
        }}
      >
        {spec.text}
      </span>
    </div>
  );
};
