import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  SIDE_A_CONCLUSION,
  SIDE_A_LABEL,
  SIDE_B_CONCLUSION,
  SIDE_B_LABEL,
  T,
  TOP_LINE,
  TWO_SIDES_LABEL,
} from "./timeline";

type SideProps = {
  label: string;
  conclusion: string;
  labelIn: number;
  conclusionIn: number;
};

const Side: React.FC<SideProps> = ({
  label,
  conclusion,
  labelIn,
  conclusionIn,
}) => {
  const frame = useCurrentFrame();
  const labelReveal = fadeSlide(frame, labelIn, T.sideDur, 18);
  const conclusionReveal = fadeSlide(frame, conclusionIn, T.sideDur, 18);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        padding: "0 40px",
      }}
    >
      <span
        style={{
          maxWidth: "92%",
          opacity: labelReveal.opacity,
          transform: `translateY(${labelReveal.translateY}px)`,
          fontFamily: poppins,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 1,
          color: palette.mutedGraySoft,
          textAlign: "center",
        }}
      >
        {label}
      </span>
      <span
        style={{
          maxWidth: "92%",
          opacity: conclusionReveal.opacity,
          transform: `translateY(${conclusionReveal.translateY}px)`,
          fontFamily: poppins,
          fontSize: 42,
          fontWeight: 700,
          lineHeight: 1.25,
          color: palette.warmGold,
          textAlign: "center",
        }}
      >
        {conclusion}
      </span>
    </div>
  );
};

/**
 * The payoff: neither obsession works, shown as two columns rather than one
 * punchline since the transcript explicitly names both failure modes. The
 * dividing rule only grows in once both labels have landed.
 */
export const ResolutionCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = clampedInterp(
    frame,
    [T.cardBgStart, T.cardBgStart + T.cardBgDur],
    [0, 1],
    easeOutCubic,
  );
  const topLine = fadeSlide(frame, T.topLineIn, T.topLineDur, 20);
  const twoSidesLabel = fadeSlide(
    frame,
    T.twoSidesLabelIn,
    T.twoSidesLabelDur,
    16,
  );
  const dividerH = clampedInterp(
    frame,
    [T.sideBLabelIn, T.sideBLabelIn + T.sideDur],
    [0, 120],
    easeOutCubic,
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity: bgOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.nearBlack,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          padding: "0 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              opacity: topLine.opacity,
              transform: `translateY(${topLine.translateY}px)`,
              fontFamily: poppins,
              fontSize: 38,
              fontWeight: 600,
              letterSpacing: 0.4,
              color: palette.softWhite,
              textAlign: "center",
            }}
          >
            {TOP_LINE}
          </span>
          <span
            style={{
              opacity: twoSidesLabel.opacity,
              transform: `translateY(${twoSidesLabel.translateY}px)`,
              fontFamily: poppins,
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 2,
              color: palette.warmGold,
              textAlign: "center",
            }}
          >
            {TWO_SIDES_LABEL}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 1400,
          }}
        >
          <Side
            label={SIDE_A_LABEL}
            conclusion={SIDE_A_CONCLUSION}
            labelIn={T.sideALabelIn}
            conclusionIn={T.sideAConclusionIn}
          />
          <div
            style={{
              width: 2,
              height: dividerH,
              background: palette.hairline,
            }}
          />
          <Side
            label={SIDE_B_LABEL}
            conclusion={SIDE_B_CONCLUSION}
            labelIn={T.sideBLabelIn}
            conclusionIn={T.sideBConclusionIn}
          />
        </div>
      </div>
    </div>
  );
};
