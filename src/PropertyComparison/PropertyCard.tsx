import React from "react";
import { interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { sans } from "./fonts";
import { T, DIFFERENCES_A, DIFFERENCES_B } from "./timeline";
import { fadeSlide, springIn } from "./utils";
import { HouseArt } from "./HouseArt";
import { StatStrip } from "./StatStrip";
import { DifferenceList } from "./DifferenceList";

type Props = {
  side: "a" | "b";
  fromEdge: "left" | "right";
};

export const PropertyCard: React.FC<Props> = ({ side, fromEdge }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isPremium = side === "b";

  const enter = springIn(frame, T.cardsIn, fps);
  const slideDistance = fromEdge === "left" ? -70 : 70;
  const cardX = interpolate(enter, [0, 1], [slideDistance, 0]);
  const cardOpacity = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const label = fadeSlide(frame, T.labelIn, 26, 10);

  const quality = interpolate(frame, [T.divergeStart, T.divergeStart + 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [T.divergeStart + 40, T.divergeStart + 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accentColor = interpolateColors(
    quality,
    [0, 1],
    [palette.creamDim, isPremium ? palette.gold : palette.slate],
  );
  const items = isPremium ? DIFFERENCES_B : DIFFERENCES_A;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 64px",
        opacity: cardOpacity,
        transform: `translateX(${cardX}px)`,
      }}
    >
      {/* eyebrow label */}
      <div
        style={{
          opacity: label.opacity,
          transform: `translateY(${label.translateY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <div style={{ width: 22, height: 1, background: accentColor, opacity: 0.8 }} />
        <span
          style={{
            fontFamily: sans,
            fontSize: 16,
            letterSpacing: 4,
            fontWeight: 500,
            color: accentColor,
          }}
        >
          PROPERTY {side.toUpperCase()}
        </span>
        <div style={{ width: 22, height: 1, background: accentColor, opacity: 0.8 }} />
      </div>

      {/* house art panel */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          aspectRatio: "400 / 300",
          borderRadius: 10,
          overflow: "hidden",
          border: `1px solid ${palette.panelBorder}`,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        <HouseArt tier={side} quality={quality} uid={side} />

        {/* tier ribbon */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            opacity: tagOpacity,
            transform: `translateY(${(1 - tagOpacity) * -8}px)`,
            padding: "6px 14px",
            borderRadius: 3,
            background: isPremium ? "rgba(203,163,82,0.92)" : "rgba(20,24,30,0.78)",
            border: isPremium ? "none" : `1px solid ${palette.slate}`,
          }}
        >
          <span
            style={{
              fontFamily: sans,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 2,
              color: isPremium ? "#211705" : palette.slate,
            }}
          >
            {isPremium ? "★ PREMIUM" : "STANDARD"}
          </span>
        </div>
      </div>

      {/* stats */}
      <div style={{ marginTop: 22, marginBottom: 20, width: "100%", maxWidth: 560 }}>
        <StatStrip />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 560,
          height: 1,
          background: palette.divider,
          marginBottom: 18,
        }}
      />

      {/* differences */}
      <div style={{ width: "100%", maxWidth: 560 }}>
        <DifferenceList
          items={items}
          tier={side}
          startFrame={T.divergeStart}
          step={isPremium ? T.bStep : T.aStep}
        />
      </div>
    </div>
  );
};
