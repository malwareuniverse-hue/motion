import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { BarsIcon, LineChartIcon, TargetIcon } from "./icons";
import { clampedInterp } from "./utils";
import { T, type StatSpec, type Verdict } from "./timeline";

const ICONS: Record<string, React.FC<{ color: string; size?: number }>> = {
  OCCUPANCY: TargetIcon,
  ADR: BarsIcon,
  REVENUE: LineChartIcon,
};

export const StatTile: React.FC<{ frame: number; entryDelay: number; index: number; spec: StatSpec; verdict: Verdict }> = ({
  frame,
  entryDelay,
  index,
  spec,
  verdict,
}) => {
  const accent = verdict === "ahead" ? palette.greenSoft : palette.redSoft;
  const Icon = ICONS[spec.label] ?? TargetIcon;

  const start = T.statsStart + entryDelay + index * T.statStagger;
  const inT = clampedInterp(frame, [start, start + T.statDur], [0, 1]);
  const count = clampedInterp(frame, [start, start + T.countDur], [0, spec.value]);
  const deltaStart = start + T.deltaOffset;
  const deltaT = clampedInterp(frame, [deltaStart, deltaStart + T.deltaDur], [0, 1]);

  const display = spec.decimals ? count.toFixed(spec.decimals) : Math.round(count).toLocaleString();

  return (
    <div
      style={{
        flex: 1,
        opacity: inT,
        transform: `translateY(${(1 - inT) * 12}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <Icon color={palette.gold} size={20} />
      <span style={{ fontFamily: poppins, fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: palette.creamFaint }}>
        {spec.label}
      </span>
      <span style={{ fontFamily: poppins, fontSize: 30, fontWeight: 700, color: palette.cream }}>
        {spec.prefix ?? ""}
        {display}
        {spec.suffix ?? ""}
      </span>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 13,
          fontWeight: 600,
          color: accent,
          opacity: deltaT,
          transform: `translateY(${(1 - deltaT) * 6}px)`,
        }}
      >
        {spec.delta}
      </span>
    </div>
  );
};
