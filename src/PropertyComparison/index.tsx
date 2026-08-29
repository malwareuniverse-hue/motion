import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { sans } from "./fonts";
import { T } from "./timeline";
import { fadeSlide, springIn } from "./utils";
import { PropertyCard } from "./PropertyCard";
import { BottomBanner } from "./BottomBanner";
import { FinalStatement } from "./FinalStatement";

export const PropertyComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kicker = fadeSlide(frame, 0, 30, -10);
  const kickerOut = interpolate(
    frame,
    [T.fadeToFinalStart, T.fadeToFinalStart + T.fadeToFinalDur],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const dividerScale = springIn(frame, T.cardsIn + 6, fps);

  const comparisonOpacity = interpolate(
    frame,
    [T.fadeToFinalStart, T.fadeToFinalStart + T.fadeToFinalDur],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const recede = interpolate(frame, [T.bannerStart, T.bannerStart + T.bannerDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardsScale = interpolate(recede, [0, 1], [1, 0.96]);
  const cardsDim = interpolate(recede, [0, 1], [1, 0.55]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 100% at 50% 0%, ${palette.bgBottom} 0%, ${palette.bgTop} 60%)`,
      }}
    >
      {/* comparison layer */}
      <AbsoluteFill style={{ opacity: comparisonOpacity }}>
        {/* top kicker */}
        <div
          style={{
            position: "absolute",
            top: 56,
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
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: 6,
              color: palette.creamDim,
            }}
          >
            TWO 5-BEDROOM BEACHFRONT LISTINGS
          </span>
        </div>

        {/* split row */}
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 0,
            right: 0,
            bottom: 60,
            display: "flex",
            opacity: cardsDim,
            transform: `scale(${cardsScale})`,
            transformOrigin: "50% 0%",
          }}
        >
          <PropertyCard side="a" fromEdge="left" />
          <PropertyCard side="b" fromEdge="right" />
        </div>

        {/* center divider */}
        <div
          style={{
            position: "absolute",
            top: 150,
            bottom: 130,
            left: "50%",
            width: 1,
            opacity: 0.45 * cardsDim,
            transform: `translateX(-0.5px) scaleY(${dividerScale})`,
            transformOrigin: "top",
            background: `linear-gradient(to bottom, transparent, ${palette.gold}, transparent)`,
          }}
        />

        <BottomBanner />
      </AbsoluteFill>

      <FinalStatement />
    </AbsoluteFill>
  );
};
