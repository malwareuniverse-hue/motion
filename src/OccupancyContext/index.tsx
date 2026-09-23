import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic } from "./utils";
import { T } from "./timeline";

// ── Sub-components ──────────────────────────────────────────────────────────

interface BarProps {
  label: string;
  percentage: number;
  fillT: number;
  color: string;
  showRefLine?: boolean;
  refLinePct?: number;
  barWidth: number;
}

const OccupancyBar: React.FC<BarProps> = ({
  label, percentage, fillT, color, showRefLine, refLinePct = 50, barWidth,
}) => {
  const trackH = 34;
  const fillW = barWidth * (percentage / 100) * fillT;
  const refX = barWidth * (refLinePct / 100);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 18 }}>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 20,
          fontWeight: 400,
          color: palette.mutedGray,
          width: 180,
          textAlign: "right",
          letterSpacing: 1.2,
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {label}
      </span>

      {/* Track */}
      <div
        style={{
          position: "relative",
          width: barWidth,
          height: trackH,
          background: palette.barTrack,
          borderRadius: 4,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: fillW,
            background: color,
            borderRadius: 4,
          }}
        />
        {/* Reference line at refLinePct */}
        {showRefLine && (
          <div
            style={{
              position: "absolute",
              left: refX,
              top: 0, bottom: 0,
              width: 2,
              background: "rgba(201,164,92,0.60)",
            }}
          />
        )}
      </div>

      <span
        style={{
          fontFamily: poppins,
          fontSize: 24,
          fontWeight: 700,
          color,
          width: 58,
          flexShrink: 0,
        }}
      >
        {Math.round(percentage * fillT)}%
      </span>
    </div>
  );
};

interface ScenarioPanelProps {
  marketPct: number;
  scenarioLabel: string;
  verdict: string;
  verdictColor: string;
  verdictArrow: string;
  enterT: number;
  barsT: number;
  verdictT: number;
  barWidth: number;
}

const ScenarioPanel: React.FC<ScenarioPanelProps> = ({
  marketPct, scenarioLabel, verdict, verdictColor, verdictArrow,
  enterT, barsT, verdictT, barWidth,
}) => {
  const propertyPct = 50;

  return (
    <div
      style={{
        opacity: enterT,
        transform: `translateY(${(1 - enterT) * 28}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: barWidth + 280,
      }}
    >
      {/* Scenario label */}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 22,
          fontWeight: 600,
          color: palette.mutedGray,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 32,
          paddingBottom: 12,
          borderBottom: `1px solid rgba(255,255,255,0.10)`,
          width: "100%",
          textAlign: "center",
        }}
      >
        {scenarioLabel}
      </div>

      {/* Bars */}
      <OccupancyBar
        label="Your Property"
        percentage={propertyPct}
        fillT={barsT}
        color={palette.warmGold}
        showRefLine={false}
        barWidth={barWidth}
      />
      <OccupancyBar
        label="Market"
        percentage={marketPct}
        fillT={barsT}
        color={palette.mutedGray}
        showRefLine={true}
        refLinePct={propertyPct}
        barWidth={barWidth}
      />

      {/* Verdict */}
      <div
        style={{
          marginTop: 24,
          opacity: verdictT,
          transform: `translateY(${(1 - verdictT) * 14}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          alignSelf: "center",
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 20,
            fontWeight: 700,
            color: verdictColor,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          {verdictArrow}
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 28,
            fontWeight: 700,
            color: verdictColor,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {verdict}
        </span>
      </div>
    </div>
  );
};

// ── Main scene ───────────────────────────────────────────────────────────────

export const OccupancyContextScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Global outro ─────────────────────────────────────────────────────────
  const outT = clampedInterp(frame, [T.outStart, T.outStart + T.outDur], [0, 1], easeInCubic);
  const globalOpacity = 1 - outT;

  // ── Decorative layers (grid + frames) ────────────────────────────────────
  const decT = clampedInterp(frame, [0, 18], [0, 1], easeOutCubic);
  const boxOpacity = decT * globalOpacity;

  // ── Stage A ───────────────────────────────────────────────────────────────
  const heroT    = clampedInterp(frame, [T.heroIn, T.heroIn + T.heroInDur], [0, 1], easeOutCubic);
  const barFillT = clampedInterp(frame, [T.barFillStart, T.barFillStart + T.barFillDur], [0, 1], easeOutCubic);
  const aOutT    = clampedInterp(frame, [T.aOut, T.aOut + T.aOutDur], [0, 1], easeInCubic);
  const stageAOpacity = heroT * (1 - aOutT);

  // ── Stage B ───────────────────────────────────────────────────────────────
  const stageBInT  = clampedInterp(frame, [T.stageB, T.stageB + T.stageBDur], [0, 1], easeOutCubic);
  const stageBOutT = clampedInterp(frame, [T.stageBOut, T.stageBOut + T.stageBOutDur], [0, 1], easeInCubic);
  const stageBOpacity = stageBInT * (1 - stageBOutT);

  // ── Stage C ───────────────────────────────────────────────────────────────
  const sharedHeaderT  = clampedInterp(frame, [T.sharedHeaderIn, T.sharedHeaderIn + T.sharedHeaderInDur], [0, 1], easeOutCubic);
  const leftColEnterT  = clampedInterp(frame, [T.leftColIn, T.leftColIn + T.leftColInDur], [0, 1], easeOutCubic);
  const leftBarsT      = clampedInterp(frame, [T.leftBarsIn, T.leftBarsIn + T.leftBarsDur], [0, 1], easeOutCubic);
  const leftVerdictT   = clampedInterp(frame, [T.leftVerdictIn, T.leftVerdictIn + T.leftVerdictInDur], [0, 1], easeOutCubic);
  const rightColEnterT = clampedInterp(frame, [T.rightColIn, T.rightColIn + T.rightColInDur], [0, 1], easeOutCubic);
  const rightBarsT     = clampedInterp(frame, [T.rightBarsIn, T.rightBarsIn + T.rightBarsDur], [0, 1], easeOutCubic);
  const rightVerdictT  = clampedInterp(frame, [T.rightVerdictIn, T.rightVerdictIn + T.rightVerdictInDur], [0, 1], easeOutCubic);
  const stageCOutT     = clampedInterp(frame, [T.cOut, T.cOut + T.cOutDur], [0, 1], easeInCubic);
  const stageCOpacity  = sharedHeaderT * (1 - stageCOutT);

  // ── Stage D ───────────────────────────────────────────────────────────────
  const stageDT = clampedInterp(frame, [T.stageD, T.stageD + T.stageDDur], [0, 1], easeOutCubic);

  const BAR_WIDTH = 460;

  return (
    <AbsoluteFill style={{ background: palette.nearBlack }}>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.038) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "110px 110px",
          opacity: boxOpacity,
        }}
      />

      {/* ── Outer decorative frame ────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 68, left: 68, right: 68, bottom: 68,
          border: "1px solid rgba(255,255,255,0.07)",
          pointerEvents: "none",
          opacity: boxOpacity,
        }}
      />
      {/* ── Inner decorative frame ────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 148, left: 148, right: 148, bottom: 148,
          border: "1px solid rgba(255,255,255,0.045)",
          pointerEvents: "none",
          opacity: boxOpacity,
        }}
      />

      {/* ── Stage A: 50% Hero ─────────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: stageAOpacity * globalOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Gold pill label */}
        <div
          style={{
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 600,
            color: palette.mutedGray,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Your Property — 45 Days Out
        </div>

        {/* Big percentage */}
        <div
          style={{
            fontFamily: poppins,
            fontSize: 200,
            fontWeight: 800,
            color: palette.warmGold,
            lineHeight: 1,
            letterSpacing: -6,
          }}
        >
          50%
        </div>

        {/* Sub-label */}
        <div
          style={{
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 300,
            color: palette.mutedGray,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 48,
            marginTop: 8,
          }}
        >
          Occupancy Rate
        </div>

        {/* Animated progress bar */}
        <div style={{ position: "relative", width: 840, height: 40 }}>
          {/* Track */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: palette.barTrack,
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {/* Fill */}
            <div
              style={{
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: `${50 * barFillT}%`,
                background: palette.warmGold,
                borderRadius: 6,
              }}
            />
          </div>
          {/* Tick marks at 25%, 50%, 75% */}
          {[25, 50, 75].map((pct) => (
            <div
              key={pct}
              style={{
                position: "absolute",
                left: `${pct}%`,
                top: -18,
                transform: "translateX(-50%)",
                fontFamily: poppins,
                fontSize: 16,
                fontWeight: 400,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: 0.5,
              }}
            >
              {pct}%
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* ── Stage B: IS THAT GOOD? ─────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: stageBOpacity * globalOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 68,
            fontWeight: 300,
            color: palette.mutedGray,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Is that good?
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 88,
            fontWeight: 800,
            color: palette.warmGold,
            letterSpacing: -1,
          }}
        >
          You don't know.
        </span>
      </AbsoluteFill>

      {/* ── Stage C: Comparison layout ────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: stageCOpacity * globalOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 0,
        }}
      >
        {/* Shared header */}
        <div
          style={{
            fontFamily: poppins,
            fontSize: 30,
            fontWeight: 700,
            color: palette.softWhite,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Your Property:{" "}
          <span style={{ color: palette.warmGold }}>50% Occupied</span>
        </div>
        {/* Gold underline */}
        <div
          style={{
            width: 560,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${palette.warmGold}, transparent)`,
            marginBottom: 52,
            opacity: 0.5,
          }}
        />

        {/* Two-column comparison */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 0,
          }}
        >
          {/* Left column */}
          <ScenarioPanel
            marketPct={30}
            scenarioLabel="If Market is 30% Occupied"
            verdict="You're Ahead"
            verdictColor={palette.warmGold}
            verdictArrow="▲"
            enterT={leftColEnterT}
            barsT={leftBarsT}
            verdictT={leftVerdictT}
            barWidth={BAR_WIDTH}
          />

          {/* Vertical gold divider */}
          <div
            style={{
              width: 1,
              height: 260,
              background: palette.divider,
              marginTop: 64,
              marginLeft: 48,
              marginRight: 48,
              flexShrink: 0,
              opacity: leftColEnterT,
            }}
          />

          {/* Right column */}
          <ScenarioPanel
            marketPct={75}
            scenarioLabel="If Market is 75% Occupied"
            verdict="You're Behind"
            verdictColor={palette.mutedGray}
            verdictArrow="▽"
            enterT={rightColEnterT}
            barsT={rightBarsT}
            verdictT={rightVerdictT}
            barWidth={BAR_WIDTH}
          />
        </div>
      </AbsoluteFill>

      {/* ── Stage D: Same 50% ─────────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: stageDT * globalOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 110,
            fontWeight: 800,
            color: palette.warmGold,
            letterSpacing: -3,
          }}
        >
          Same 50%.
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 54,
            fontWeight: 300,
            color: palette.softWhite,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Totally Different Story.
        </span>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
