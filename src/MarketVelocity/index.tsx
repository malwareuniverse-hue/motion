import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInCubic, easeOutCubic, easeOutQuart } from "./utils";
import { T } from "./timeline";

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: Arc gauge — circular arc showing an occupancy percentage
// ─────────────────────────────────────────────────────────────────────────────
interface ArcGaugeProps {
  percentage: number;      // target 0-100
  fillT: number;           // animation 0-1
  gaugeColor: string;      // arc stroke color
  labelColor: string;      // number color
  size: number;            // outer diameter
  label?: string;
}

const ArcGauge: React.FC<ArcGaugeProps> = ({
  percentage, fillT, gaugeColor, labelColor, size, label,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const strokeW = 14;
  const r = size / 2 - strokeW / 2 - 4;
  // 300-degree arc: starts at 120° (lower-left), sweeps clockwise to 60° (lower-right)
  const rotationOffset = 120;

  const displayPct = Math.round(percentage * fillT);

  // Convert polar to cartesian for path endpoints
  const polarToCart = (angleDeg: number, radius: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const arcPath = (startDeg: number, endDeg: number, rr: number) => {
    const s = polarToCart(startDeg, rr);
    const e = polarToCart(endDeg, rr);
    const sweep = endDeg - startDeg;
    const largeArc = sweep > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${rr} ${rr} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const startAngle = rotationOffset;
  const endAngle = startAngle + 300;
  const fillEndAngle = startAngle + 300 * (percentage / 100) * fillT;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        {/* Track arc */}
        <path
          d={arcPath(startAngle, endAngle, r)}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        {/* Fill arc */}
        <path
          d={arcPath(startAngle, fillEndAngle, r)}
          fill="none"
          stroke={gaugeColor}
          strokeWidth={strokeW}
          strokeLinecap="round"
          opacity={fillT > 0.01 ? 1 : 0}
        />
        {/* Tick marks at 25/50/75% positions */}
        {[25, 50, 75].map((pct) => {
          const angle = startAngle + 300 * (pct / 100);
          const inner = polarToCart(angle, r - strokeW / 2 - 4);
          const outer = polarToCart(angle, r + strokeW / 2 + 4);
          return (
            <line
              key={pct}
              x1={inner.x} y1={inner.y}
              x2={outer.x} y2={outer.y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1.5}
            />
          );
        })}
      </svg>

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: size * 0.06,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: size * 0.30,
            fontWeight: 800,
            color: labelColor,
            lineHeight: 1,
            letterSpacing: -2,
          }}
        >
          {displayPct}%
        </span>
        {label && (
          <span
            style={{
              fontFamily: poppins,
              fontSize: size * 0.065,
              fontWeight: 400,
              color: palette.mutedGray,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: 7-day booking bar chart — mini bars per day showing booking pace
// ─────────────────────────────────────────────────────────────────────────────
interface BookingChartProps {
  active: boolean;       // true = bookings exist, false = empty
  fillT: number;         // 0-1 for bars growing
  enterT: number;        // 0-1 for chart entering
  barColor: string;
}

const BOOKING_COUNTS = [3, 5, 4, 6, 3, 5, 4];
const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const CHART_H = 120;
const BAR_W = 40;
const BAR_GAP = 16;
const MAX_COUNT = 6;

const BookingChart: React.FC<BookingChartProps> = ({ active, fillT, enterT, barColor }) => {
  return (
    <div
      style={{
        opacity: enterT,
        transform: `translateY(${(1 - enterT) * 24}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header label */}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 16,
          fontWeight: 400,
          color: palette.mutedGray,
          letterSpacing: 3.5,
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        New Bookings — Last 7 Days
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: BAR_GAP }}>
        {DAY_LABELS.map((day, i) => {
          // Stagger each bar: column i appears after a delay proportional to i
          const colT = clampedInterp(fillT, [i * 0.07, i * 0.07 + 0.30], [0, 1], easeOutQuart);
          const count = active ? BOOKING_COUNTS[i] : 0;
          const heightPct = (count / MAX_COUNT) * colT;

          return (
            <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              {/* Track + fill column */}
              <div
                style={{
                  position: "relative",
                  width: BAR_W,
                  height: CHART_H,
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                {/* Fill — grows from bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${heightPct * 100}%`,
                    background: count === 0 ? "transparent" : barColor,
                    borderRadius: 3,
                    transition: "none",
                  }}
                />
                {/* Booking dot markers inside the bar */}
                {active && count > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 6,
                      left: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 5,
                      opacity: Math.min(1, colT * 2),
                    }}
                  >
                    {Array.from({ length: Math.min(count, 4) }).map((_, di) => (
                      <div
                        key={di}
                        style={{
                          width: 8, height: 8,
                          borderRadius: "50%",
                          background: "rgba(11,12,14,0.4)",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Day label */}
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 13,
                  fontWeight: 400,
                  color: "rgba(167,167,165,0.55)",
                  letterSpacing: 1,
                }}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: "Flatline" — thin horizontal pulse line showing stopped momentum
// ─────────────────────────────────────────────────────────────────────────────
const Flatline: React.FC<{ enterT: number; width: number }> = ({ enterT, width }) => {
  const drawW = width * enterT;
  return (
    <div style={{ position: "relative", width, height: 32 }}>
      <svg width={width} height={32} style={{ overflow: "visible" }}>
        {/* Horizontal flatline */}
        <line
          x1={0} y1={16}
          x2={drawW} y2={16}
          stroke={palette.mutedGray}
          strokeWidth={2}
          strokeOpacity={0.5}
        />
        {/* End marker */}
        {enterT > 0.9 && (
          <circle
            cx={drawW} cy={16} r={4}
            fill={palette.mutedGray}
            opacity={0.6}
          />
        )}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Illustration: "Rising trend" — upward stepped line with dots for heating up
// ─────────────────────────────────────────────────────────────────────────────
const TrendRising: React.FC<{ drawT: number; width: number; color: string }> = ({
  drawT, width, color,
}) => {
  const pts: [number, number][] = [
    [0, 70], [40, 60], [80, 52], [130, 38], [180, 28], [240, 16], [300, 6],
  ];
  const drawPts = Math.max(2, Math.round(drawT * pts.length));
  const visiblePts = pts.slice(0, drawPts);
  const d = visiblePts.reduce((s, p, i) => s + (i === 0 ? `M${p[0]} ${p[1]}` : ` L${p[0]} ${p[1]}`), "");

  return (
    <div style={{ width, height: 80, position: "relative" }}>
      <svg width={width} height={80} viewBox="0 0 300 80" style={{ overflow: "visible" }}>
        {visiblePts.length > 1 && (
          <path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
        )}
        {visiblePts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill={color} opacity={0.85} />
        ))}
        {/* Arrowhead at end */}
        {visiblePts.length > 1 && drawT > 0.85 && (() => {
          const last = visiblePts[visiblePts.length - 1];
          return (
            <polygon
              points={`${last[0]},${last[1] - 7} ${last[0] - 5},${last[1] + 3} ${last[0] + 5},${last[1] + 3}`}
              fill={color}
              opacity={Math.min(1, (drawT - 0.85) * 7)}
            />
          );
        })()}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Compact scenario card for the split-screen Stage H comparison
// ─────────────────────────────────────────────────────────────────────────────
interface MiniCardProps {
  pct: number;
  gaugeColor: string;
  label: string;
  verdict: string;
  verdictColor: string;
  isActive: boolean;
}

const MiniCard: React.FC<MiniCardProps> = ({ pct, gaugeColor, label, verdict, verdictColor, isActive }) => {
  const MINI_COUNTS = [1, 0, 0, 1, 0, 0, 1];
  const ACTIVE_COUNTS = [3, 5, 4, 6, 3, 5, 4];
  const counts = isActive ? ACTIVE_COUNTS : MINI_COUNTS;
  const BAR_H = 56;

  return (
    <div
      style={{
        width: 560,
        padding: "40px 48px",
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* Scenario label */}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 16,
          fontWeight: 600,
          color: palette.mutedGray,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      {/* Gauge mini */}
      <ArcGauge
        percentage={pct}
        fillT={1}
        gaugeColor={gaugeColor}
        labelColor={gaugeColor}
        size={180}
        label="Occupancy"
      />

      {/* Mini bar chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        {DAY_LABELS.map((day, i) => (
          <div key={day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 22,
                height: BAR_H,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.09)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: `${(counts[i] / 6) * 100}%`,
                  background: gaugeColor,
                  opacity: isActive ? 1 : 0.35,
                  borderRadius: 2,
                }}
              />
            </div>
            <span style={{ fontFamily: poppins, fontSize: 10, color: "rgba(167,167,165,0.45)", letterSpacing: 0.5 }}>
              {day.slice(0, 1)}
            </span>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 20,
          fontWeight: 700,
          color: verdictColor,
          letterSpacing: 2.5,
          textTransform: "uppercase",
        }}
      >
        {verdict}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main scene
// ─────────────────────────────────────────────────────────────────────────────
export const MarketVelocityScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Global outro ──────────────────────────────────────────────────────────
  const outT     = clampedInterp(frame, [T.outStart, T.outStart + T.outDur], [0, 1], easeInCubic);
  const globalOp = 1 - outT;

  // ── Decorative grid + frames ──────────────────────────────────────────────
  const decT    = clampedInterp(frame, [0, 18], [0, 1], easeOutCubic);
  const boxOpac = decT * globalOp;

  // ── Stage A-D: Scenario A (90%, frozen) ──────────────────────────────────
  const gaugeAIn   = clampedInterp(frame, [T.gaugeAIn, T.gaugeAIn + T.gaugeAInDur], [0, 1], easeOutCubic);
  const gaugeFillA = clampedInterp(frame, [T.gaugeAIn + 4, T.gaugeAIn + T.gaugeAInDur + 20], [0, 1], easeOutCubic);
  const stageBT    = clampedInterp(frame, [T.stageB, T.stageB + T.stageBDur], [0, 1], easeOutCubic);
  const stripInA   = clampedInterp(frame, [T.stripIn, T.stripIn + T.stripInDur], [0, 1], easeOutCubic);
  const stripFillA = clampedInterp(frame, [T.stripIn + T.stripInDur, T.stripIn + T.stripInDur + T.stripFillDur], [0, 1], easeOutCubic);
  const frozenT    = clampedInterp(frame, [T.frozenLabel, T.frozenLabel + T.frozenLabelDur], [0, 1], easeOutCubic);
  const flatlineT  = clampedInterp(frame, [T.frozenLabel + 4, T.frozenLabel + T.frozenLabelDur + 30], [0, 1], easeOutCubic);

  const scenAOut   = clampedInterp(frame, [T.aOut, T.aOut + T.aOutDur], [0, 1], easeInCubic);
  const scenAOp    = gaugeAIn * (1 - scenAOut);

  // ── Stage E-G: Scenario B (65%, heating) ─────────────────────────────────
  const scenBIn    = clampedInterp(frame, [T.stagEIn, T.stagEIn + T.stageEInDur], [0, 1], easeOutCubic);
  const gaugeFillB = clampedInterp(frame, [T.gaugeBIn + 6, T.gaugeBIn + T.gaugeBInDur + 20], [0, 1], easeOutCubic);
  const activeStrip  = clampedInterp(frame, [T.activeStripIn, T.activeStripIn + T.activeStripInDur], [0, 1], easeOutCubic);
  const activeFill   = clampedInterp(frame, [T.activeStripIn + T.activeStripInDur, T.activeStripIn + T.activeStripInDur + T.activeStripFillDur], [0, 1], easeOutCubic);
  const heatingT     = clampedInterp(frame, [T.heatingLabel, T.heatingLabel + T.heatingLabelDur], [0, 1], easeOutCubic);
  const heatingGoldT = clampedInterp(frame, [T.heatingGlow, T.heatingGlow + T.heatingGlowDur], [0, 1], easeOutCubic);
  const trendDrawT   = clampedInterp(frame, [T.heatingLabel + 6, T.heatingLabel + T.heatingLabelDur + 50], [0, 1], easeOutCubic);

  const scenBOut   = clampedInterp(frame, [T.eOut, T.eOut + T.eOutDur], [0, 1], easeInCubic);
  const scenBOp    = scenBIn * (1 - scenBOut);

  // ── Stage H: split comparison ─────────────────────────────────────────────
  const splitT     = clampedInterp(frame, [T.splitIn, T.splitIn + T.splitInDur], [0, 1], easeOutCubic);

  return (
    <AbsoluteFill style={{ background: palette.nearBlack }}>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.038) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "110px 110px",
          opacity: boxOpac,
        }}
      />
      {/* Outer frame */}
      <div style={{ position: "absolute", top: 68, left: 68, right: 68, bottom: 68, border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none", opacity: boxOpac }} />
      {/* Inner frame */}
      <div style={{ position: "absolute", top: 148, left: 148, right: 148, bottom: 148, border: "1px solid rgba(255,255,255,0.045)", pointerEvents: "none", opacity: boxOpac }} />

      {/* ── Stage A-D: Scenario A — 90% frozen ───────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: scenAOp * globalOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Scenario label */}
        <div
          style={{
            fontFamily: poppins,
            fontSize: 18,
            fontWeight: 400,
            color: palette.mutedGray,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: stageBT > 0 ? 1 : gaugeAIn,
          }}
        >
          Market Occupancy
        </div>

        {/* Arc gauge */}
        <ArcGauge
          percentage={90}
          fillT={gaugeFillA}
          gaugeColor={palette.warmGold}
          labelColor={palette.warmGold}
          size={300}
        />

        {/* "That sounds strong. BUT..." — Stage B */}
        <div
          style={{
            marginTop: 28,
            opacity: stageBT,
            transform: `translateY(${(1 - stageBT) * 18}px)`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 32,
              fontWeight: 300,
              color: palette.softWhite,
              letterSpacing: 1,
            }}
          >
            That sounds strong.{" "}
          </span>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 36,
              fontWeight: 700,
              color: palette.warmGold,
              letterSpacing: 0.5,
            }}
          >
            But...
          </span>
        </div>

        {/* 7-day booking chart (empty) — Stage C */}
        <div style={{ marginTop: 36 }}>
          <BookingChart
            active={false}
            fillT={stripFillA}
            enterT={stripInA}
            barColor={palette.mutedGray}
          />
        </div>

        {/* Stage D: "Stopped" label + flatline */}
        <div
          style={{
            marginTop: 24,
            opacity: frozenT,
            transform: `translateY(${(1 - frozenT) * 14}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Flatline enterT={flatlineT} width={340} />
          <span
            style={{
              fontFamily: poppins,
              fontSize: 22,
              fontWeight: 600,
              color: palette.mutedGray,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            The market has stopped moving
          </span>
        </div>
      </AbsoluteFill>

      {/* ── Stage E-G: Scenario B — 65% heating ──────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: scenBOp * globalOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: poppins,
            fontSize: 18,
            fontWeight: 400,
            color: palette.mutedGray,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Now flip it — same market
        </div>

        {/* Arc gauge at 65%, starts muted then warms to gold */}
        <ArcGauge
          percentage={65}
          fillT={gaugeFillB}
          gaugeColor={palette.warmGold}
          labelColor={heatingGoldT > 0.5 ? palette.warmGold : palette.mutedGray}
          size={300}
        />

        {/* "But bookings are coming in fast" — active chart */}
        <div style={{ marginTop: 36 }}>
          <BookingChart
            active={true}
            fillT={activeFill}
            enterT={activeStrip}
            barColor={palette.warmGold}
          />
        </div>

        {/* Stage G: "Heating up" label + rising trend line */}
        <div
          style={{
            marginTop: 24,
            opacity: heatingT,
            transform: `translateY(${(1 - heatingT) * 14}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TrendRising drawT={trendDrawT} width={340} color={palette.warmGold} />
          <span
            style={{
              fontFamily: poppins,
              fontSize: 22,
              fontWeight: 600,
              color: palette.warmGold,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            That market may be heating up
          </span>
        </div>
      </AbsoluteFill>

      {/* ── Stage H: Split comparison ─────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          opacity: splitT * globalOp,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: poppins,
            fontSize: 48,
            fontWeight: 800,
            color: palette.softWhite,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          Two{" "}
          <span style={{ color: palette.warmGold }}>completely different</span>
          {" "}situations.
        </div>

        {/* Side-by-side mini cards */}
        <div style={{ display: "flex", gap: 48, alignItems: "stretch" }}>
          <MiniCard
            pct={90}
            gaugeColor={palette.mutedGray}
            label="90% Occupied"
            verdict="— Stopped Moving"
            verdictColor={palette.mutedGray}
            isActive={false}
          />
          <MiniCard
            pct={65}
            gaugeColor={palette.warmGold}
            label="65% Occupied"
            verdict="▲ Heating Up"
            verdictColor={palette.warmGold}
            isActive={true}
          />
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
