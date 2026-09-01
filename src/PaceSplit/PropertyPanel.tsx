import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { TrendDownIcon, TrendUpIcon } from "./icons";
import { VillaArt } from "./VillaArt";
import { CalendarBlock } from "./CalendarBlock";
import { StatTile } from "./StatTile";
import { clampedInterp, easeOutCubic, springIn } from "./utils";
import { LEFT_X, PANEL_W, PANEL_Y, RIGHT_X, T, type PanelData } from "./timeline";

export const PropertyPanel: React.FC<{ frame: number; data: PanelData }> = ({ frame, data }) => {
  const { side, verdict, title, subtitle, stats, entryDelay } = data;
  const isAhead = verdict === "ahead";
  const accent = isAhead ? palette.greenSoft : palette.redSoft;
  const accentBg = isAhead ? palette.greenBg : palette.redBg;

  const panelStart = T.panelInStart + entryDelay;
  const panelT = clampedInterp(frame, [panelStart, panelStart + T.panelInDur], [0, 1], easeOutCubic);
  const slideFrom = side === "left" ? -60 : 60;
  const panelX = (1 - panelT) * slideFrom;

  const headerStart = T.headerStart + entryDelay;
  const headerT = clampedInterp(frame, [headerStart, headerStart + T.headerDur], [0, 1]);

  const badgeStart = T.badgeStart + entryDelay;
  const badgeT = springIn(frame, badgeStart, 30, { damping: 13, stiffness: 210, mass: 0.6 });
  const badgeClamped = Math.max(0, Math.min(badgeT, 1));

  return (
    <div
      style={{
        position: "absolute",
        left: side === "left" ? LEFT_X : RIGHT_X,
        top: PANEL_Y,
        width: PANEL_W,
        opacity: panelT,
        transform: `translateX(${panelX}px)`,
      }}
    >
      <div
        style={{
          borderRadius: 20,
          background: `linear-gradient(165deg, ${palette.panelLift} 0%, ${palette.panel} 60%, ${palette.bg} 100%)`,
          border: `1.5px solid ${palette.panelBorder}`,
          boxShadow: "0 50px 100px -36px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "26px 30px 18px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ opacity: headerT, transform: `translateY(${(1 - headerT) * 10}px)` }}>
              <span style={{ fontFamily: poppins, fontSize: 30, fontWeight: 700, letterSpacing: 1, color: palette.goldSoft }}>
                {title}
              </span>
              <div style={{ width: 120, height: 2, background: palette.gold, opacity: 0.7, margin: "10px 0 12px" }} />
              <span style={{ fontFamily: poppins, fontSize: 15, fontWeight: 500, color: palette.creamSoft }}>{subtitle}</span>
            </div>

            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: `2px solid ${palette.gold}`,
                background: accentBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                opacity: badgeClamped,
                transform: `scale(${0.6 + badgeClamped * 0.4})`,
              }}
            >
              {isAhead ? <TrendUpIcon color={accent} size={26} /> : <TrendDownIcon color={accent} size={26} />}
            </div>
          </div>
        </div>

        <div style={{ margin: "0 30px", borderRadius: 14, overflow: "hidden", height: 220 }}>
          <VillaArt frame={frame} entryDelay={entryDelay} />
        </div>

        <div style={{ padding: "22px 30px 0" }}>
          <CalendarBlock frame={frame} entryDelay={entryDelay} verdict={verdict} />
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            margin: "22px 30px 0",
            padding: "20px 4px 26px",
            borderTop: `1px solid ${palette.panelBorder}`,
          }}
        >
          {stats.map((spec, i) => (
            <StatTile key={spec.label} frame={frame} entryDelay={entryDelay} index={i} spec={spec} verdict={verdict} />
          ))}
        </div>
      </div>
    </div>
  );
};
