import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { Room } from "./Room";
import { PersonSilhouette } from "./PersonSilhouette";
import { Desk } from "./Desk";
import { Laptop } from "./Laptop";
import { clampedInterp, easeOutCubic, easeInOutCubic } from "./utils";
import { T } from "./timeline";

const SCREEN_ORIGIN = "51.4% 67.8%";

export const NightReviewScene: React.FC = () => {
  const frame = useCurrentFrame();

  const settleScale = clampedInterp(frame, [0, 60], [1.06, 1], easeOutCubic);
  const pushScale = clampedInterp(frame, [T.pushInStart, T.pushInStart + T.pushInDur], [1, 1.09], easeInOutCubic);

  return (
    <AbsoluteFill style={{ background: palette.bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${settleScale * pushScale})`,
          transformOrigin: SCREEN_ORIGIN,
        }}
      >
        <Room frame={frame} />
        <PersonSilhouette frame={frame} />
        <Desk frame={frame} />
        <Laptop frame={frame} />
      </div>
    </AbsoluteFill>
  );
};
