import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInOutCubic, fadeSlide } from "./utils";
import { MapBackground } from "./MapBackground";
import { HousePin } from "./HousePin";
import { RadiusCircle } from "./RadiusCircle";
import { AssumptionFlip } from "./AssumptionFlip";
import { DistantComps } from "./DistantComps";
import { TitleCard } from "./TitleCard";
import { ClosingStatement } from "./ClosingStatement";
import { DISTANT_COMPS, HOUSES, MAP_H, MAP_W, T } from "./timeline";

export const WrongCompsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const mapIn = fadeSlide(frame, T.mapKickerAt - 20, 40, 20);

  const houseA = HOUSES[0];
  const originXPct = (houseA.x / MAP_W) * 100;
  const originYPct = (houseA.y / MAP_H) * 100;
  const compEnd = T.compStart + (DISTANT_COMPS.length - 1) * T.compStep + T.compDur;
  const mapScale = clampedInterp(frame, [T.focusStart, compEnd], [1, 1.16], easeInOutCubic);

  const wallOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [1, 0]);

  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 90% at 50% 15%, ${palette.bgLift} 0%, ${palette.bg} 60%)` }}>
      <TitleCard />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: wallOpacity }}>
        <div
          style={{
            position: "relative",
            width: MAP_W,
            height: MAP_H,
            opacity: mapIn.opacity,
            transform: `translateY(${mapIn.translateY}px) scale(${mapScale})`,
            transformOrigin: `${originXPct}% ${originYPct}%`,
          }}
        >
          <MapBackground />

          <RadiusCircle
            progress={clampedInterp(frame, [T.radiusStart, T.radiusStart + T.radiusDur], [0, 1])}
            opacity={clampedInterp(frame, [T.clearStart, T.clearStart + T.clearDur], [1, 0])}
          />

          {HOUSES.map((house, i) => {
            const pinStart = T.pinStart + i * T.pinStep;
            const pinProgress = clampedInterp(frame, [pinStart, pinStart + T.pinDur], [0, 1]);
            const cardStart = pinStart + T.cardOffset;
            const cardProgress = clampedInterp(frame, [cardStart, cardStart + T.pinDur], [0, 1]);
            const isHouseA = i === 0;
            const dim = isHouseA
              ? 1
              : clampedInterp(frame, [T.clearStart, T.clearStart + T.clearDur], [1, 0]);
            const glow = isHouseA
              ? clampedInterp(frame, [T.focusStart, T.focusStart + T.focusDur], [0, 1])
              : 0;
            return (
              <HousePin
                key={house.id}
                house={house}
                pinProgress={pinProgress}
                cardProgress={cardProgress}
                dim={dim}
                glow={glow}
              />
            );
          })}

          <DistantComps />
        </div>
      </AbsoluteFill>

      <AssumptionFlip />

      <ClosingStatement />
    </AbsoluteFill>
  );
};
