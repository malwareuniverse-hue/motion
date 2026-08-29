import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { sans } from "./fonts";
import { SHARED_STATS, T } from "./timeline";
import { fadeSlide } from "./utils";
import { BedIcon, BeachIcon, PoolIcon, SleepsIcon } from "./icons";

const icons = [BedIcon, SleepsIcon, PoolIcon, BeachIcon];

export const StatStrip: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        width: "100%",
      }}
    >
      {SHARED_STATS.map((label, i) => {
        const Icon = icons[i];
        const start = T.statStart + i * T.statStep;
        const { opacity, translateY } = fadeSlide(frame, start, 22, 14);
        return (
          <React.Fragment key={label}>
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  height: 22,
                  background: palette.divider,
                  margin: "0 20px",
                  opacity,
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <Icon color={palette.gold} size={16} />
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: 1.6,
                  color: palette.cream,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
