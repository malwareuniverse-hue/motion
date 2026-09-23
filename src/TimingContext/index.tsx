import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic, easeOutQuart } from "./utils";
import { T } from "./timeline";

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: Large house (5-bedroom) — thin-line SVG
// ─────────────────────────────────────────────────────────────────────────────
const HouseIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 160 }) => (
  <svg width={size} height={size * 0.88} viewBox="0 0 140 123">
    {/* Roof */}
    <polygon points="70,4 134,52 6,52" fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" />
    {/* Chimney */}
    <rect x="98" y="22" width="11" height="22" fill="none" stroke={color} strokeWidth={1.8} />
    {/* Body */}
    <rect x="8" y="51" width="124" height="68" fill="none" stroke={color} strokeWidth={2.2} />
    {/* Windows — 3 cols × 2 rows */}
    {[14, 48, 82, 116].map((x, ci) => ci < 3 && (
      [60, 82].map((y, ri) => (
        <rect key={`${ci}-${ri}`} x={x} y={y} width={20} height={14}
          fill={`rgba(201,164,92,0.10)`} stroke={color} strokeWidth={1.4} />
      ))
    ))}
    {/* Extra window col 2 */}
    <rect x="48" y="60" width="20" height="14" fill="rgba(201,164,92,0.10)" stroke={color} strokeWidth={1.4} />
    <rect x="48" y="82" width="20" height="14" fill="rgba(201,164,92,0.10)" stroke={color} strokeWidth={1.4} />
    <rect x="82" y="60" width="20" height="14" fill="rgba(201,164,92,0.10)" stroke={color} strokeWidth={1.4} />
    <rect x="82" y="82" width="20" height="14" fill="rgba(201,164,92,0.10)" stroke={color} strokeWidth={1.4} />
    {/* Door */}
    <rect x="56" y="97" width="28" height="22" fill="none" stroke={color} strokeWidth={1.8} />
    <circle cx="79" cy="108" r="2.5" fill={color} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: Small condo — compact tower
// ─────────────────────────────────────────────────────────────────────────────
const CondoIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 160 }) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 60 120">
    {/* Main body */}
    <rect x="4" y="10" width="52" height="106" fill="none" stroke={color} strokeWidth={2.2} />
    {/* Rooftop ledge */}
    <rect x="2" y="4" width="56" height="8" fill="none" stroke={color} strokeWidth={1.8} />
    {/* Windows — 2 cols × 5 rows */}
    {[0, 1].map(col =>
      [0, 1, 2, 3, 4].map(row => (
        <rect
          key={`${col}-${row}`}
          x={col === 0 ? 10 : 34}
          y={18 + row * 18}
          width={14} height={10}
          fill="rgba(167,167,165,0.10)"
          stroke={color} strokeWidth={1.3}
        />
      ))
    )}
    {/* Door */}
    <rect x="20" y="100" width="20" height="16" fill="none" stroke={color} strokeWidth={1.6} />
    <circle cx="36" cy="109" r="2" fill={color} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: Booking lead-time bar — how far ahead a property books
// ─────────────────────────────────────────────────────────────────────────────
interface LeadBarProps {
  weeksAhead: number;   // how far ahead (for display label)
  maxWeeks: number;     // scale maximum
  fillT: number;        // animation 0→1
  color: string;
  trackW?: number;
  sublabel: string;
}

const LeadBar: React.FC<LeadBarProps> = ({ weeksAhead, maxWeeks, fillT, color, trackW = 360, sublabel }) => {
  const fillW = (weeksAhead / maxWeeks) * trackW * fillT;
  const labelStr = weeksAhead >= 8 ? `${Math.round(weeksAhead / 4)}–${Math.round(weeksAhead / 4) + 2} months ahead`
    : `${weeksAhead}–${weeksAhead + 2} weeks ahead`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: trackW }}>
      {/* Track */}
      <div style={{ position: "relative", width: trackW, height: 10, background: "rgba(255,255,255,0.07)", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fillW, background: color, borderRadius: 5 }} />
      </div>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", width: trackW }}>
        <span style={{ fontFamily: poppins, fontSize: 14, color, fontWeight: 600, letterSpacing: 0.5 }}>
          {labelStr}
        </span>
        <span style={{ fontFamily: poppins, fontSize: 13, color: "rgba(167,167,165,0.5)", letterSpacing: 1 }}>
          TODAY →
        </span>
      </div>
      <span style={{ fontFamily: poppins, fontSize: 16, color: palette.mutedGray, letterSpacing: 2.5, textTransform: "uppercase" as const }}>
        {sublabel}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: Seasonal booking curve — 12-week sparkline
// ─────────────────────────────────────────────────────────────────────────────
interface SeasonCurveProps {
  pattern: number[];   // 12 values 0-1 representing weekly booking activity
  drawT: number;       // 0-1, how much of the curve is drawn
  color: string;
  label: string;
  sublabel: string;
  enterT: number;
  width?: number;
  height?: number;
}

const SeasonCurve: React.FC<SeasonCurveProps> = ({
  pattern, drawT, color, label, sublabel, enterT, width = 380, height = 120,
}) => {
  const pts: [number, number][] = pattern.map((v, i) => [
    (i / (pattern.length - 1)) * width,
    height - v * (height - 12) - 6,
  ]);

  const visibleCount = Math.max(2, Math.ceil(drawT * pts.length));
  const visible = pts.slice(0, visibleCount);

  const pathD = visible.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = visible[i - 1];
    const cpx = (px + x) / 2;
    return `${d} C${cpx},${py} ${cpx},${y} ${x},${y}`;
  }, "");

  const areaD = visible.length > 1
    ? `${pathD} L${visible[visible.length - 1][0]},${height} L${visible[0][0]},${height} Z`
    : "";

  return (
    <div style={{ opacity: enterT, transform: `translateY(${(1 - enterT) * 20}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {/* Season label */}
      <span style={{ fontFamily: poppins, fontSize: 22, fontWeight: 600, color, letterSpacing: 2, textTransform: "uppercase" as const }}>
        {label}
      </span>
      {/* SVG sparkline */}
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        {/* Area fill */}
        {areaD && (
          <path d={areaD} fill={color} fillOpacity={0.08} />
        )}
        {/* Curve line */}
        {visible.length > 1 && (
          <path d={pathD} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        )}
        {/* Dots at each data point */}
        {visible.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.5} fill={color} opacity={0.85} />
        ))}
        {/* Baseline */}
        <line x1={0} y1={height} x2={width} y2={height} stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
      </svg>
      {/* Week labels */}
      <div style={{ display: "flex", justifyContent: "space-between", width }}>
        <span style={{ fontFamily: poppins, fontSize: 12, color: "rgba(167,167,165,0.45)", letterSpacing: 1 }}>WEEK 1</span>
        <span style={{ fontFamily: poppins, fontSize: 12, color: "rgba(167,167,165,0.45)", letterSpacing: 1 }}>WEEK 12</span>
      </div>
      {/* Sublabel */}
      <span style={{ fontFamily: poppins, fontSize: 16, color: palette.mutedGray, letterSpacing: 2.5, textTransform: "uppercase" as const }}>
        {sublabel}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: Days-out urgency card — shows demand vs urgency contrast
// ─────────────────────────────────────────────────────────────────────────────
interface UrgencyCardProps {
  days: number;
  urgencyBars: number;   // 1-3
  urgencyLabel: string;
  urgencyColor: string;
  enterT: number;
  barsT: number;
}

const UrgencyCard: React.FC<UrgencyCardProps> = ({
  days, urgencyBars, urgencyLabel, urgencyColor, enterT, barsT,
}) => {
  const DEMAND_PCT = 65;

  return (
    <div style={{
      opacity: enterT,
      transform: `translateY(${(1 - enterT) * 28}px)`,
      width: 420,
      padding: "38px 44px",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: 8,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
      boxSizing: "border-box" as const,
    }}>
      {/* Big days number */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <span style={{ fontFamily: poppins, fontSize: 100, fontWeight: 800, color: urgencyColor, lineHeight: 1, letterSpacing: -4 }}>
          {days}
        </span>
        <span style={{ fontFamily: poppins, fontSize: 17, fontWeight: 400, color: palette.mutedGray, letterSpacing: 4, textTransform: "uppercase" as const }}>
          Days Out
        </span>
      </div>

      {/* Demand bar — identical in both cards */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: poppins, fontSize: 14, color: palette.mutedGray, letterSpacing: 2.5, textTransform: "uppercase" as const }}>
            Demand
          </span>
          <span style={{ fontFamily: poppins, fontSize: 13, color: palette.warmGold, fontWeight: 600, letterSpacing: 1 }}>
            SAME
          </span>
        </div>
        <div style={{ position: "relative", height: 10, background: "rgba(255,255,255,0.07)", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${DEMAND_PCT * barsT}%`, background: palette.warmGold, borderRadius: 5 }} />
        </div>
      </div>

      {/* Urgency signal bars */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: poppins, fontSize: 14, color: palette.mutedGray, letterSpacing: 2.5, textTransform: "uppercase" as const }}>
            Urgency
          </span>
          <span style={{ fontFamily: poppins, fontSize: 14, color: urgencyColor, fontWeight: 700, letterSpacing: 1 }}>
            {urgencyLabel}
          </span>
        </div>
        {/* 4 signal bars — like mobile signal strength */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 40 }}>
          {[1, 2, 3, 4].map(bar => {
            const barH = bar * 10;
            const filled = bar <= urgencyBars && barsT > bar * 0.18;
            return (
              <div key={bar} style={{
                width: 22, height: barH,
                background: filled ? urgencyColor : "rgba(255,255,255,0.07)",
                borderRadius: 3,
                alignSelf: "flex-end",
                flexShrink: 0,
              }} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main scene
// ─────────────────────────────────────────────────────────────────────────────
// Summer booking pattern: books early, peaks around weeks 3-5, holds strong
const SUMMER_PATTERN = [0.3, 0.55, 0.82, 0.91, 0.95, 0.93, 0.88, 0.85, 0.82, 0.78, 0.72, 0.65];
// Shoulder: starts low, builds later, less consistent
const SHOULDER_PATTERN = [0.08, 0.14, 0.22, 0.30, 0.38, 0.45, 0.50, 0.52, 0.48, 0.42, 0.36, 0.28];

export const TimingContextScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Global outro ──────────────────────────────────────────────────────────
  const outT     = clampedInterp(frame, [T.outStart, T.outStart + T.outDur], [0, 1], easeInCubic);
  const globalOp = 1 - outT;

  // ── Decorative grid + frames ──────────────────────────────────────────────
  const decT    = clampedInterp(frame, [0, 18], [0, 1], easeOutCubic);
  const boxOpac = decT * globalOp;

  // ── Stage A: property comparison ──────────────────────────────────────────
  const houseT = clampedInterp(frame, [T.houseIn, T.houseIn + T.houseInDur], [0, 1], easeOutCubic);
  const condoT = clampedInterp(frame, [T.condoIn, T.condoIn + T.condoInDur], [0, 1], easeOutCubic);
  const barsT  = clampedInterp(frame, [T.barsIn, T.barsIn + T.barsDur], [0, 1], easeOutQuart);
  const aOut   = clampedInterp(frame, [T.aOut, T.aOut + T.aOutDur], [0, 1], easeInCubic);
  const stageAOp = Math.min(houseT, 1 - aOut);

  // ── Stage B: seasonal patterns ────────────────────────────────────────────
  const summerT   = clampedInterp(frame, [T.summerIn, T.summerIn + T.summerInDur], [0, 1], easeOutCubic);
  const shoulderT = clampedInterp(frame, [T.shoulderIn, T.shoulderIn + T.shoulderInDur], [0, 1], easeOutCubic);
  const summerDraw   = clampedInterp(frame, [T.summerIn + 6, T.summerIn + T.summerInDur + 50], [0, 1], easeOutCubic);
  const shoulderDraw = clampedInterp(frame, [T.shoulderIn + 6, T.shoulderIn + T.shoulderInDur + 50], [0, 1], easeOutCubic);

  // Stage C: "And that matters"
  const matterT = clampedInterp(frame, [T.matterIn, T.matterIn + T.matterInDur], [0, 1], easeOutCubic);

  const bcOut  = clampedInterp(frame, [T.bcOut, T.bcOut + T.bcOutDur], [0, 1], easeInCubic);
  const stageBCOp = Math.min(summerT, 1 - bcOut);

  // ── Stage D: 120 vs 12 days ───────────────────────────────────────────────
  const card120T  = clampedInterp(frame, [T.card120In, T.card120In + T.card120Dur], [0, 1], easeOutCubic);
  const bars120T  = clampedInterp(frame, [T.bars120In, T.bars120In + T.bars120Dur], [0, 1], easeOutQuart);
  const card12T   = clampedInterp(frame, [T.card12In, T.card12In + T.card12Dur], [0, 1], easeOutCubic);
  const bars12T   = clampedInterp(frame, [T.bars12In, T.bars12In + T.bars12Dur], [0, 1], easeOutQuart);
  const dOut      = clampedInterp(frame, [T.dOut, T.dOut + T.dOutDur], [0, 1], easeInCubic);
  const stageDOp  = Math.min(card120T, 1 - dOut);

  // ── Stage E: closing statement ────────────────────────────────────────────
  const stageET = clampedInterp(frame, [T.stageE, T.stageE + T.stageEDur], [0, 1], easeOutCubic);

  return (
    <AbsoluteFill style={{ background: palette.nearBlack }}>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <AbsoluteFill style={{
        backgroundImage: [
          "linear-gradient(rgba(255,255,255,0.038) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "110px 110px",
        opacity: boxOpac,
      }} />
      <div style={{ position: "absolute", top: 68, left: 68, right: 68, bottom: 68, border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none", opacity: boxOpac }} />
      <div style={{ position: "absolute", top: 148, left: 148, right: 148, bottom: 148, border: "1px solid rgba(255,255,255,0.045)", pointerEvents: "none", opacity: boxOpac }} />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Stage A: Property type comparison                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AbsoluteFill style={{
        opacity: stageAOp * globalOp,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Section label */}
        <div style={{ fontFamily: poppins, fontSize: 18, fontWeight: 400, color: palette.mutedGray, letterSpacing: 4, textTransform: "uppercase", marginBottom: 52 }}>
          Property Type affects Booking Window
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 100 }}>

          {/* ── Big house card ──────────────────────────── */}
          <div style={{
            opacity: houseT,
            transform: `translateY(${(1 - houseT) * 28}px)`,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
          }}>
            <HouseIcon color={palette.warmGold} size={170} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: poppins, fontSize: 22, fontWeight: 600, color: palette.softWhite, letterSpacing: 1.5 }}>
                5-Bedroom House
              </div>
              <div style={{ fontFamily: poppins, fontSize: 15, color: palette.mutedGray, letterSpacing: 1, marginTop: 4 }}>
                Large property, high demand
              </div>
            </div>
            <LeadBar
              weeksAhead={16}
              maxWeeks={20}
              fillT={barsT}
              color={palette.warmGold}
              sublabel="Books Months Ahead"
              trackW={360}
            />
          </div>

          {/* Thin divider */}
          <div style={{
            width: 1, height: 280, marginBottom: 60,
            background: "rgba(255,255,255,0.10)",
            flexShrink: 0,
            opacity: Math.min(houseT, condoT),
          }} />

          {/* ── Small condo card ─────────────────────────── */}
          <div style={{
            opacity: condoT,
            transform: `translateY(${(1 - condoT) * 28}px)`,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
          }}>
            <CondoIcon color={palette.mutedGray} size={170} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: poppins, fontSize: 22, fontWeight: 600, color: palette.softWhite, letterSpacing: 1.5 }}>
                Small Condo
              </div>
              <div style={{ fontFamily: poppins, fontSize: 15, color: palette.mutedGray, letterSpacing: 1, marginTop: 4 }}>
                Compact, flexible demand
              </div>
            </div>
            <LeadBar
              weeksAhead={4}
              maxWeeks={20}
              fillT={barsT}
              color={palette.mutedGray}
              sublabel="Books Much Later"
              trackW={360}
            />
          </div>

        </div>
      </AbsoluteFill>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Stage B-C: Seasonal comparison + "And that matters"                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AbsoluteFill style={{
        opacity: stageBCOp * globalOp,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 0,
      }}>
        {/* Section label */}
        <div style={{ fontFamily: poppins, fontSize: 18, fontWeight: 400, color: palette.mutedGray, letterSpacing: 4, textTransform: "uppercase", marginBottom: 40 }}>
          Season affects Booking Pattern
        </div>

        {/* Two season charts */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 80 }}>

          <SeasonCurve
            pattern={SUMMER_PATTERN}
            drawT={summerDraw}
            color={palette.warmGold}
            label="Summer"
            sublabel="Books Early — Fills Fast"
            enterT={summerT}
            width={380}
            height={130}
          />

          {/* Thin divider */}
          <div style={{
            width: 1, height: 200, marginTop: 50,
            background: "rgba(255,255,255,0.10)",
            flexShrink: 0,
            opacity: Math.min(summerT, shoulderT),
          }} />

          <SeasonCurve
            pattern={SHOULDER_PATTERN}
            drawT={shoulderDraw}
            color={palette.mutedGray}
            label="Shoulder Season"
            sublabel="Books Later — Slower Ramp"
            enterT={shoulderT}
            width={380}
            height={130}
          />

        </div>

        {/* Stage C: "And That Matters." */}
        <div style={{
          marginTop: 52,
          opacity: matterT,
          transform: `translateY(${(1 - matterT) * 14}px)`,
        }}>
          <span style={{ fontFamily: poppins, fontSize: 46, fontWeight: 700, color: palette.softWhite, letterSpacing: -0.5 }}>
            And{" "}
          </span>
          <span style={{ fontFamily: poppins, fontSize: 46, fontWeight: 800, color: palette.warmGold, letterSpacing: -0.5 }}>
            that matters.
          </span>
        </div>
      </AbsoluteFill>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Stage D: 120 vs 12 days — same demand, different urgency            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AbsoluteFill style={{
        opacity: stageDOp * globalOp,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 40,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: poppins, fontSize: 30, fontWeight: 700, color: palette.softWhite, letterSpacing: -0.5 }}>
            Same demand.{" "}
            <span style={{ color: palette.warmGold }}>Very different urgency.</span>
          </div>
          <div style={{ fontFamily: poppins, fontSize: 17, color: palette.mutedGray, letterSpacing: 2, textTransform: "uppercase", marginTop: 10 }}>
            Timing changes the context
          </div>
        </div>

        {/* Two urgency cards */}
        <div style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>

          <UrgencyCard
            days={120}
            urgencyBars={1}
            urgencyLabel="LOW"
            urgencyColor={palette.mutedGray}
            enterT={card120T}
            barsT={bars120T}
          />

          {/* VS divider */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            height: 300, gap: 8,
            opacity: Math.min(card120T, card12T),
          }}>
            <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.10)" }} />
            <span style={{ fontFamily: poppins, fontSize: 20, fontWeight: 700, color: "rgba(167,167,165,0.40)", letterSpacing: 2 }}>
              VS
            </span>
            <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.10)" }} />
          </div>

          <UrgencyCard
            days={12}
            urgencyBars={4}
            urgencyLabel="HIGH"
            urgencyColor={palette.warmGold}
            enterT={card12T}
            barsT={bars12T}
          />

        </div>
      </AbsoluteFill>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Stage E: "Timing changes the strategy."                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AbsoluteFill style={{
        opacity: stageET * globalOp,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 16,
      }}>
        <span style={{ fontFamily: poppins, fontSize: 30, fontWeight: 300, color: palette.mutedGray, letterSpacing: 3, textTransform: "uppercase" }}>
          But the urgency is not.
        </span>
        <span style={{ fontFamily: poppins, fontSize: 80, fontWeight: 800, color: palette.warmGold, lineHeight: 1.1, letterSpacing: -2 }}>
          Timing changes
        </span>
        <span style={{ fontFamily: poppins, fontSize: 80, fontWeight: 800, color: palette.softWhite, lineHeight: 1.1, letterSpacing: -2 }}>
          the strategy.
        </span>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
