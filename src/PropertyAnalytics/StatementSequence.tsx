import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { T } from "./timeline";

const Statement: React.FC<{
  text: string;
  start: number;
  holdEnd?: number;
  exitDur?: number;
  fontSize: number;
  fontWeight: number;
  color: string;
}> = ({ text, start, holdEnd, exitDur, fontSize, fontWeight, color }) => {
  const frame = useCurrentFrame();
  const inT = clampedInterp(frame, [start, start + 22], [0, 1]);
  const outT = holdEnd && exitDur ? clampedInterp(frame, [holdEnd, holdEnd + exitDur], [1, 0]) : 1;
  const opacity = Math.min(inT, outT);
  const translateY = (1 - inT) * 24 - (1 - outT) * 16;

  if (opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: "0 140px",
      }}
    >
      <span
        style={{
          fontFamily: poppins,
          fontSize,
          fontWeight,
          letterSpacing: 1,
          color,
          textAlign: "center",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const StatementSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = clampedInterp(frame, [T.calloutFadeOutStart, T.calloutFadeOutStart + T.calloutFadeOutDur], [0, 1]);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: dim }}>
      <Statement
        text="THE GUEST SEES THE PROBLEM FAST."
        start={T.seq1Start}
        holdEnd={T.seq1HoldEnd}
        exitDur={T.seq1ExitDur}
        fontSize={44}
        fontWeight={700}
        color={palette.cream}
      />
      <Statement
        text="AND THAT'S GOOD."
        start={T.seq2Start}
        holdEnd={T.seq2HoldEnd}
        exitDur={T.seq2ExitDur}
        fontSize={40}
        fontWeight={500}
        color={palette.tealSoft}
      />
      <Statement
        text="NOW YOU CAN FIX IT."
        start={T.seq3Start}
        fontSize={56}
        fontWeight={800}
        color={palette.amberSoft}
      />
    </div>
  );
};
