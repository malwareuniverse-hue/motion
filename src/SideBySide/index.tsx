import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { ChannelRail } from "./ChannelRail";
import { CriteriaList } from "./CriteriaList";
import { ListingGrid } from "./ListingGrid";
import { ClosingStatements } from "./ClosingStatements";

export const SideBySideScene: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(118% 88% at 50% 14%, ${palette.charcoal} 0%, ${palette.nearBlack} 62%)`,
    }}
  >
    <ChannelRail />
    <CriteriaList />
    <ListingGrid />
    <ClosingStatements />
  </AbsoluteFill>
);
