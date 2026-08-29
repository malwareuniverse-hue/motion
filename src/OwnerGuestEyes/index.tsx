import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { T } from "./timeline";
import { fadeSlide, springIn } from "./utils";
import { OwnerPanel } from "./OwnerPanel";
import { GuestPanel } from "./GuestPanel";
import { ClosingStatement } from "./ClosingStatement";

export const OwnerGuestEyesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kicker = fadeSlide(frame, 0, 30, -10);
  const kickerOut = interpolate(
    frame,
    [T.toFinalStart, T.toFinalStart + T.toFinalDur],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const dividerScale = springIn(frame, T.panelsStart + 6, fps);

  const comparisonOpacity = interpolate(
    frame,
    [T.toFinalStart, T.toFinalStart + T.toFinalDur],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bgToDark = interpolate(
    frame,
    [T.toFinalStart, T.toFinalStart + T.toFinalDur],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${palette.charcoal} 0%, ${palette.charcoalDeep} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: palette.bg,
          opacity: 1 - bgToDark,
        }}
      />

      <AbsoluteFill style={{ opacity: comparisonOpacity }}>
        <div
          style={{
            position: "absolute",
            top: 54,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: kicker.opacity * kickerOut,
            transform: `translateY(${kicker.translateY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 5,
              color: palette.inkFaint,
            }}
          >
            TWO PERSPECTIVES, ONE LISTING
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 146,
            left: 0,
            right: 0,
            bottom: 70,
            display: "flex",
          }}
        >
          <OwnerPanel />
          <GuestPanel />
        </div>

        <div
          style={{
            position: "absolute",
            top: 146,
            bottom: 100,
            left: "50%",
            width: 1,
            transform: `translateX(-0.5px) scaleY(${dividerScale})`,
            transformOrigin: "top",
            background: `linear-gradient(to bottom, transparent, ${palette.rule}, transparent)`,
          }}
        />
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
