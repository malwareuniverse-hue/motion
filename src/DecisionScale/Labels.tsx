import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { GAUGE_CENTER, T } from "./timeline";
import { scalePanCenter } from "./ScaleRig";

const LABEL_Y = 860;

const labelStyle: React.CSSProperties = {
  position: "absolute",
  fontFamily: poppins,
  fontSize: 26,
  fontWeight: 700,
  letterSpacing: 2.4,
  textAlign: "center",
  transform: "translate(-50%, 0)",
};

export const Labels: React.FC = () => {
  const frame = useCurrentFrame();
  const pan = scalePanCenter(frame);
  const anim = fadeSlide(frame, T.labelStart, T.labelDur, 14);

  return (
    <>
      <span
        style={{
          ...labelStyle,
          left: pan.x,
          top: LABEL_Y,
          opacity: anim.opacity,
          transform: `translate(-50%, 0) translateY(${anim.translateY}px)`,
          color: palette.creamSoft,
        }}
      >
        DECISIONS
      </span>
      <span
        style={{
          ...labelStyle,
          left: GAUGE_CENTER.x,
          top: LABEL_Y,
          opacity: anim.opacity,
          transform: `translate(-50%, 0) translateY(${anim.translateY}px)`,
          color: palette.amberSoft,
        }}
      >
        OUTCOME
      </span>
    </>
  );
};
