import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { springIn } from "./utils";
import { BAR_BASE_Y, BAR_HEIGHTS, BAR_W, T, barX } from "./timeline";

const STARTS = [T.bar1In, T.bar2In, T.bar3In, T.bar4In];

export const Bars: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {BAR_HEIGHTS.map((h, i) => {
        const grow = springIn(frame, STARTS[i], fps, { damping: 18, stiffness: 140, mass: 0.7 });
        if (grow <= 0) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: barX(i),
              top: BAR_BASE_Y - h,
              width: BAR_W,
              height: h,
              opacity: Math.min(grow * 1.4, 1),
              transform: `scaleY(${grow})`,
              transformOrigin: "bottom",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "4px 4px 0 0",
                background: palette.bar,
                borderTop: `2px solid ${palette.barTop}`,
              }}
            />
          </div>
        );
      })}
    </>
  );
};
