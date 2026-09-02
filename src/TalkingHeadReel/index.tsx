import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ReelBackground } from "./ReelBackground";
import { BrollSlot } from "./BrollSlot";
import { ProgressBar } from "./ProgressBar";
import { BrandBug } from "./BrandBug";
import { CaptionStack } from "./CaptionStack";
import { LowerThird } from "./LowerThird";
import { GrowthStat } from "./GrowthStat";
import { FragmentedSystem } from "./FragmentedSystem";
import { StatementCard } from "./StatementCard";
import { PillarFramework } from "./PillarFramework";
import { VrmaCta } from "./VrmaCta";
import {
  AUDIO_SRC,
  BROLL_WINDOWS,
  FRAGMENT,
  FRAMEWORK,
  GAP_STATEMENT,
  GROWTH_1,
  GROWTH_2,
  INFRA_STATEMENT,
  VRMA_CTA,
} from "./timeline";

const span = (b: { start: number; end: number }) => ({
  from: b.start,
  durationInFrames: b.end - b.start,
});

// VOX-style vertical talking-head reel for Pricing By Mira (VRMA Nashville).
//
// Layer order (bottom → top):
//   1. ReelBackground   — placeholder for Emile's talking-head clip.
//   2. BrollSlot(s)     — full-frame B-roll windows (swap for footage).
//   3. CaptionStack     — running VOX word-highlight captions.
//   4. Graphic beats    — growth stats, fragmented-system gap, statement
//      cards, six-pillar framework, VRMA CTA (each a timed Sequence).
//   5. LowerThird       — speaker name card, early then out.
//   6. BrandBug         — brand tag (hides once full-frame cards take over).
//   7. ProgressBar      — thin top-edge reel progress (always on top).
export const TalkingHeadReelScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile(AUDIO_SRC)} />

      <ReelBackground />

      {BROLL_WINDOWS.map((b) => (
        <Sequence key={`broll-${b.start}`} {...span(b)}>
          <BrollSlot label={b.label} />
        </Sequence>
      ))}

      <CaptionStack />

      <Sequence {...span(GROWTH_1)}>
        <GrowthStat from={GROWTH_1.from} to={GROWTH_1.to} />
      </Sequence>
      <Sequence {...span(GROWTH_2)}>
        <GrowthStat from={GROWTH_2.from} to={GROWTH_2.to} />
      </Sequence>

      <Sequence {...span(FRAGMENT)}>
        <FragmentedSystem />
      </Sequence>

      <Sequence {...span(GAP_STATEMENT)}>
        <StatementCard headline="THE GAP WE'RE SOLVING" gold="GAP" sub="at Pricing By Mira" />
      </Sequence>

      <Sequence {...span(FRAMEWORK)}>
        <PillarFramework />
      </Sequence>

      <Sequence {...span(INFRA_STATEMENT)}>
        <StatementCard
          label="NOT JUST ANOTHER TASK"
          headline="IT'S YOUR GROWTH INFRASTRUCTURE"
          gold="GROWTH INFRASTRUCTURE"
        />
      </Sequence>

      <Sequence {...span(VRMA_CTA)}>
        <VrmaCta />
      </Sequence>

      <LowerThird />
      <BrandBug />
      <ProgressBar />
    </AbsoluteFill>
  );
};
