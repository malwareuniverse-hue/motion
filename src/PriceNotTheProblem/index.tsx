import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { TextBlock } from "./TextBlock";
import { Bars } from "./Bars";
import { TrendLine } from "./TrendLine";
import { PriceTag } from "./PriceTag";

export const PriceNotTheProblemScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 70% 20%, ${palette.bgLift} 0%, ${palette.bg} 60%)`,
      }}
    >
      <Bars />
      <TrendLine />
      <PriceTag />
      <TextBlock />
    </AbsoluteFill>
  );
};
