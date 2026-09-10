import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import {
  ST1_KEY,
  ST1_LEAD,
  ST1_SUB,
  ST1_TAIL,
  ST2_KEY,
  ST2_LEAD,
  ST2_SUB,
  T,
} from "./timeline";

type StatementProps = {
  opacity: number;
  headline: React.ReactNode;
  headlineOpacity: number;
  headlineShift: number;
  rule: number;
  sub: string;
  subOpacity: number;
  subShift: number;
};

const Statement: React.FC<StatementProps> = ({
  opacity,
  headline,
  headlineOpacity,
  headlineShift,
  rule,
  sub,
  subOpacity,
  subShift,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      padding: "0 200px",
    }}
  >
    <div style={{ width: rule, height: 1, background: palette.gold, opacity: 0.85 }} />
    <span
      style={{
        opacity: headlineOpacity,
        transform: `translateY(${headlineShift}px)`,
        fontFamily: poppins,
        fontSize: 66,
        fontWeight: 600,
        letterSpacing: 1.5,
        color: palette.softWhite,
        textAlign: "center",
        lineHeight: 1.2,
      }}
    >
      {headline}
    </span>
    <span
      style={{
        opacity: subOpacity,
        transform: `translateY(${subShift}px)`,
        fontFamily: poppins,
        fontSize: 26,
        fontWeight: 400,
        letterSpacing: 6,
        color: palette.mutedGray,
        textAlign: "center",
      }}
    >
      {sub}
    </span>
  </div>
);

/** Act 4: the diagnosis, then what to do with it. */
export const ClosingStatements: React.FC = () => {
  const frame = useCurrentFrame();

  const first = fadeRise(frame, T.st1In, T.st1Dur, 12);
  const firstSub = fadeRise(frame, T.st1SubIn, T.st1SubDur, 10);
  const firstRule = clampedInterp(frame, [T.st1In - 8, T.st1In + 22], [0, 140], easeOutCubic);
  const firstOut = clampedInterp(frame, [T.st1Out, T.st1Out + T.st1OutDur], [1, 0]);

  const second = fadeRise(frame, T.st2In, T.st2Dur, 12);
  const secondSub = fadeRise(frame, T.st2SubIn, T.st2SubDur, 10);
  const secondRule = clampedInterp(frame, [T.st2In - 8, T.st2In + 22], [0, 140], easeOutCubic);

  return (
    <>
      {first.opacity > 0 && firstOut > 0 ? (
        <Statement
          opacity={firstOut}
          headline={
            <>
              {ST1_LEAD}
              <span style={{ color: palette.gold }}>{ST1_KEY}</span>
              {ST1_TAIL}
            </>
          }
          headlineOpacity={first.opacity}
          headlineShift={first.translateY}
          rule={firstRule}
          sub={ST1_SUB}
          subOpacity={firstSub.opacity}
          subShift={firstSub.translateY}
        />
      ) : null}

      {second.opacity > 0 ? (
        <Statement
          opacity={1}
          headline={
            <>
              {ST2_LEAD}
              <span style={{ color: palette.gold }}>{ST2_KEY}</span>
            </>
          }
          headlineOpacity={second.opacity}
          headlineShift={second.translateY}
          rule={secondRule}
          sub={ST2_SUB}
          subOpacity={secondSub.opacity}
          subShift={secondSub.translateY}
        />
      ) : null}
    </>
  );
};
