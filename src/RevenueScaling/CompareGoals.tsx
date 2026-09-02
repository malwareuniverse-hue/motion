import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { T } from "./timeline";

const COL_W = 720;
const COL_LEFT = 200;
const COL_RIGHT = 1000;
const COL_TOP = 348;
const COL_H = 268;

const kickerStyle = (color: string): React.CSSProperties => ({
  fontFamily: poppins,
  fontSize: 17,
  fontWeight: 600,
  letterSpacing: 4.6,
  color,
});

/**
 * WORK HARDER vs. A PROCESS THAT COMPOUNDS (0:47–0:56). The rejected goal is
 * stated first, then dimmed and ruled through as the real one arrives in gold.
 */
export const CompareGoals: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = beatOpacity(
    frame,
    T.harderIn,
    1,
    T.compareOut,
    T.compareOutDur,
  );
  if (opacity <= 0) return null;

  const left = fadeUp(frame, T.harderIn, 28);
  const dim = clampedInterp(frame, [T.harderDim, T.harderDim + 30], [1, 0.4]);
  const strike = clampedInterp(
    frame,
    [T.harderDim, T.harderDim + 26],
    [0, 1],
    easeOutCubic,
  );
  const right = fadeUp(frame, T.systemIn, 30);
  const rightBar = clampedInterp(
    frame,
    [T.systemIn, T.systemIn + 24],
    [0, 1],
    easeOutCubic,
  );
  const caption = fadeUp(frame, T.systemCaptionIn, 28, 14);

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {/* rejected goal */}
      <div
        style={{
          position: "absolute",
          left: COL_LEFT,
          top: COL_TOP,
          width: COL_W,
          height: COL_H,
          opacity: left.opacity * dim,
          transform: `translateY(${left.translateY}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          borderLeft: `1px solid ${palette.rule}`,
          paddingLeft: 40,
        }}
      >
        <div style={kickerStyle(palette.graySoft)}>THE GOAL ISN&rsquo;T</div>
        <div style={{ position: "relative", alignSelf: "flex-start" }}>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 62,
              fontWeight: 600,
              letterSpacing: 0.4,
              color: palette.gray,
            }}
          >
            WORK HARDER
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "52%",
              height: 2,
              background: palette.gray,
              opacity: 0.7,
              transform: `scaleX(${strike})`,
              transformOrigin: "left",
            }}
          />
        </div>
      </div>

      {/* the real goal */}
      <div
        style={{
          position: "absolute",
          left: COL_RIGHT,
          top: COL_TOP,
          width: COL_W,
          height: COL_H,
          opacity: right.opacity,
          transform: `translateY(${right.translateY}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          paddingLeft: 40,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: palette.gold,
            transform: `scaleY(${rightBar})`,
            transformOrigin: "center",
          }}
        />
        <div style={kickerStyle(palette.gold)}>THE GOAL IS</div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: 0.2,
            lineHeight: 1.16,
            color: palette.white,
          }}
        >
          BUILD A REVENUE
          <br />
          PROCESS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 736,
          textAlign: "center",
          fontFamily: poppins,
          fontSize: 32,
          fontWeight: 500,
          letterSpacing: 0.6,
          color: palette.gray,
          opacity: caption.opacity,
          transform: `translateY(${caption.translateY}px)`,
        }}
      >
        that becomes{" "}
        <span style={{ color: palette.gold, fontWeight: 600 }}>
          more powerful
        </span>{" "}
        as the company grows.
      </div>
    </div>
  );
};
