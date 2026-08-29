import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { sans } from "./fonts";
import { fadeSlide } from "./utils";
import { CheckIcon, DotIcon, StarIcon } from "./icons";

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
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {items.map((item, i) => {
        const start = startFrame + i * step;
        const { opacity, translateY } = fadeSlide(frame, start, 20, 16);
        const isReview = item.toLowerCase().includes("review");
        const Icon = isPremium ? (isReview ? StarIcon : CheckIcon) : DotIcon;
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
                width: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon color={iconColor} size={isPremium ? 15 : 8} />
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
