import React from "react";
import { AbsoluteFill } from "remotion";
import { ReelBackground } from "./ReelBackground";
import { ProgressBar } from "./ProgressBar";
import { BrandBug } from "./BrandBug";
import { CaptionStack } from "./CaptionStack";
import { LowerThird } from "./LowerThird";
import { EndCard } from "./EndCard";

// VOX-style vertical talking-head reel for Pricing By Mira.
//
// Layer order (bottom → top):
//   1. ReelBackground  — placeholder for Emile's talking-head clip (see the
//      OffthreadVideo note inside ReelBackground.tsx). Includes the bottom
//      scrim that keeps captions legible over any footage.
//   2. ProgressBar     — thin top-edge reel progress.
//   3. BrandBug        — "PRICING BY MIRA" tag, top-left.
//   4. LowerThird      — speaker name card, early then out.
//   5. CaptionStack    — the caption-driven VOX word highlights (edit the
//      script in timeline.ts → CAPTION_LINES).
//   6. EndCard         — closing brand + CTA lockup.
export const TalkingHeadReelScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <ReelBackground />
      <ProgressBar />
      <BrandBug />
      <LowerThird />
      <CaptionStack />
      <EndCard />
    </AbsoluteFill>
  );
};
