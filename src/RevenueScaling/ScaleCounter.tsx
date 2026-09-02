import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import {
  beatOpacity,
  clampedInterp,
  easeInOutCubic,
  easeOutCubic,
  fadeUp,
} from "./utils";
import { GoldRule, Kicker } from "./Primitives";
import { T } from "./timeline";

const numberStyle: React.CSSProperties = {
  fontFamily: poppins,
  fontWeight: 700,
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1,
};

/**
 * 30 -> 100 (0:26–0:31). The door count is the only number that moves; the
 * caption undercuts it immediately so the frame reads as scope, not a win.
 */
export const ScaleCounter: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = beatOpacity(
    frame,
    T.counterIn,
    1,
    T.counterOut,
    T.counterOutDur,
  );
  if (opacity <= 0) return null;

  const kicker = fadeUp(frame, T.counterIn, 24, 12);
  const from = fadeUp(frame, T.counterIn + 8, 26, 14);
  const to = fadeUp(frame, T.counterRollStart - 6, 26, 14);
  const connector = clampedInterp(
    frame,
    [T.counterIn + 20, T.counterIn + 46],
    [0, 1],
    easeOutCubic,
  );
  const count = Math.round(
    clampedInterp(
      frame,
      [T.counterRollStart, T.counterRollEnd],
      [30, 100],
      easeInOutCubic,
    ),
  );
  const landed = clampedInterp(
    frame,
    [T.counterRollEnd - 12, T.counterRollEnd + 6],
    [0, 1],
  );
  const caption = fadeUp(frame, T.counterCaptionIn, 26, 14);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 42,
        opacity,
      }}
    >
      <div
        style={{
          opacity: kicker.opacity,
          transform: `translateY(${kicker.translateY}px)`,
        }}
      >
        <Kicker>GOING FROM</Kicker>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        <div
          style={{
            ...numberStyle,
            fontSize: 132,
            color: palette.gray,
            opacity: from.opacity * 0.75,
            transform: `translateY(${from.translateY}px)`,
          }}
        >
          30
        </div>

        <div style={{ display: "flex", alignItems: "center", width: 220 }}>
          <div
            style={{
              height: 2,
              flex: 1,
              background: palette.goldRule,
              transform: `scaleX(${connector})`,
              transformOrigin: "left",
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: `12px solid ${palette.gold}`,
              opacity: connector,
            }}
          />
        </div>

        <div
          style={{
            ...numberStyle,
            fontSize: 188,
            color: palette.white,
            opacity: to.opacity,
            transform: `translateY(${to.translateY}px)`,
          }}
        >
          {count}
        </div>
      </div>

      <GoldRule progress={landed} width={180} height={3} />

      <div
        style={{
          fontFamily: poppins,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 5,
          color: palette.whiteFaint,
          opacity: to.opacity,
        }}
      >
        PROPERTIES
      </div>

      <div
        style={{
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: 0.6,
          color: palette.gray,
          opacity: caption.opacity,
          transform: `translateY(${caption.translateY}px)`,
        }}
      >
        doesn&rsquo;t just mean managing more rates.
      </div>
    </div>
  );
};
