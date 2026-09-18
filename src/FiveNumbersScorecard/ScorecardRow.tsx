import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import type { RowSpec } from "./timeline";
import { T } from "./timeline";

type Props = { spec: RowSpec };

export const ScorecardRow: React.FC<Props> = ({ spec }) => {
  const frame = useCurrentFrame();

  const label = fadeSlide(frame, spec.labelIn, T.rowDur, 16);
  const question = fadeSlide(frame, spec.questionIn, T.rowDur, 14);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          opacity: label.opacity,
          transform: `translateY(${label.translateY}px)`,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `2px solid ${spec.emphasis ? palette.warmGold : palette.hairline}`,
            fontFamily: poppins,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: spec.emphasis ? palette.warmGold : palette.mutedGray,
          }}
        >
          {spec.index}
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 1.4,
            color: spec.emphasis ? palette.warmGold : palette.softWhite,
          }}
        >
          {spec.label}
        </span>
      </div>
      <span
        style={{
          maxWidth: 780,
          opacity: question.opacity,
          transform: `translateY(${question.translateY}px)`,
          fontFamily: poppins,
          fontSize: 22,
          fontWeight: 400,
          letterSpacing: 0.3,
          color: palette.mutedGray,
          textAlign: "center",
        }}
      >
        {spec.question}
      </span>
    </div>
  );
};
