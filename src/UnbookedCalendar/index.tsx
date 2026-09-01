import React from "react";
import { AbsoluteFill } from "remotion";
import { palette } from "./theme";
import { CalendarCard } from "./CalendarCard";
import { MagnifyingGlass } from "./MagnifyingGlass";

export const UnbookedCalendarScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 40%, ${palette.bgLift} 0%, ${palette.bg} 65%)`,
      }}
    >
      <CalendarCard />
      <MagnifyingGlass />
    </AbsoluteFill>
  );
};
