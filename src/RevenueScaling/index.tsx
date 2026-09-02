import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { Backdrop } from "./Backdrop";
import { BRollLayer } from "./BRoll";
import { Grain } from "./Grain";
import { HookStatement } from "./HookStatement";
import { DoorsStatement } from "./DoorsStatement";
import { QuestionStatement } from "./QuestionStatement";
import { ScaleCounter } from "./ScaleCounter";
import { MoreStack } from "./MoreStack";
import { CompareGoals } from "./CompareGoals";
import { EventCard } from "./EventCard";
import { EnterpriseShift } from "./EnterpriseShift";
import { BrandBug } from "./BrandBug";
import { LowerThird } from "./LowerThird";
import { EndLockup } from "./EndLockup";

export type RevenueScalingProps = {
  /**
   * "full" renders the finished piece: backdrop, B-roll and every overlay.
   * "overlays" renders the graphics alone over transparency, so the pack can be
   * composited straight onto Emile's A-roll in Premiere / After Effects
   * (render with `--codec=prores --prores-profile=4444` or a PNG sequence).
   */
  mode?: "full" | "overlays";
};

/**
 * VRMA Nashville — "Revenue at scale" (90s).
 *
 * Layer order, bottom to top:
 *   1. Backdrop        base grade — replace with Emile's A-roll when available
 *   2. B-roll          timed slots; procedural until real clips are named
 *   3. Grain           film texture across the whole frame
 *   4. Graphics        one beat on screen at a time, never two
 *   5. Brand system    corner bug + lower third
 *
 * To drop in the talking-head footage, put the clip in `public/` and add,
 * directly above <BRollLayer />:
 *
 *   <OffthreadVideo
 *     src={staticFile("emile-vrma.mp4")}
 *     style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
 *   />
 *
 * All timings live in timeline.ts — re-time there against the final audio.
 */
export const RevenueScalingScene: React.FC<RevenueScalingProps> = ({
  mode = "full",
}) => {
  const withFootage = mode === "full";

  return (
    <AbsoluteFill
      style={{ backgroundColor: withFootage ? palette.black : "transparent" }}
    >
      {withFootage ? (
        <>
          <Backdrop />
          <BRollLayer />
        </>
      ) : null}

      <HookStatement />
      <DoorsStatement />
      <QuestionStatement />
      <ScaleCounter />
      <MoreStack />
      <CompareGoals />
      <EventCard />
      <EnterpriseShift />

      <BrandBug />
      <LowerThird />
      <EndLockup />

      {withFootage ? <Grain opacity={0.045} /> : null}
    </AbsoluteFill>
  );
};
