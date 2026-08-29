import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { sans } from "./fonts";
import { fadeSlide } from "./utils";
import { DotIcon } from "./icons";
import { Icon3D, ICON3D_KIND_BY_ITEM } from "./icons3d";

type Props = {
  items: readonly string[];
  tier: "a" | "b";
  startFrame: number;
  step: number;
};

export const DifferenceList: React.FC<Props> = ({
  items,
  tier,
  startFrame,
  step,
}) => {
  const frame = useCurrentFrame();
  const isPremium = tier === "b";
  const iconColor = isPremium ? palette.gold : palette.slate;
  const textColor = isPremium ? palette.cream : palette.creamDim;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isPremium ? 15 : 9,
      }}
    >
      {items.map((item, i) => {
        const start = startFrame + i * step;
        const { opacity, translateY } = fadeSlide(frame, start, 20, 16);
        return (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity,
              transform: `translateY(${translateY}px)`,
            }}
          >
            <div
              style={{
                width: isPremium ? 34 : 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isPremium ? (
                <Icon3D
                  kind={ICON3D_KIND_BY_ITEM(item)}
                  size={30}
                  phase={i * 37}
                  progress={opacity}
                />
              ) : (
                <DotIcon color={iconColor} size={8} />
              )}
            </div>
            <span
              style={{
                fontFamily: sans,
                fontSize: 18,
                fontWeight: isPremium ? 500 : 400,
                color: textColor,
                letterSpacing: 0.2,
              }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};
