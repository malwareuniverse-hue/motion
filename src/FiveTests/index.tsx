import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { poppins } from "../MovingPicture/fonts";
import { palette } from "../MovingPicture/theme";

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 1350;

// Frame map:
//   12   PACE — "remember these five test"
//  114   "are you moving faster or slower than the market"
//  224   TIMING — "timing are you looking at the correct"
//  300   "booking window and lead time"
//  386   DEMAND — "demand is the demand real"
//  506   "or are you reacting to a headline"
//  600   COMPARISON — "comparison are you using"
//  659   "the right market and the right competitors"
//  743   DECISION — "decision can you explain why you made the move"
//  882   CONCLUSION — "that is the difference between having market data"
//  996   "and having market intelligence"
// 1079   "data is the number"
// 1134   "intelligence is what the number means in context"
// 1263   "the decision is what you are going to do about it"

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function fi(frame: number, from: number, to: number) {
  return clamp01(
    interpolate(frame, [from, to], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    })
  );
}
function fo(frame: number, from: number, to: number) {
  return 1 - fi(frame, from, to);
}
function sceneOp(f: number, i0: number, i1: number, o0: number, o1: number) {
  return Math.min(fi(f, i0, i1), fo(f, o0, o1));
}

const { gold, cream, slate } = palette;

// ── Liquid Glass Panel ────────────────────────────────────────────────────────

const GlassPanel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  frame: number;
  children: React.ReactNode;
}> = ({ x, y, w, h, opacity, frame, children }) => {
  const shimmerY = ((frame * 0.55) % 220) - 55;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        opacity,
        borderRadius: 24,
        background:
          "linear-gradient(148deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 55%, rgba(255,255,255,0.13) 100%)",
        border: "1.5px solid rgba(255,255,255,0.30)",
        boxShadow:
          "inset 0 1.5px 0 rgba(255,255,255,0.44), inset 0 -1px 0 rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.12)",
        backdropFilter: "blur(28px) saturate(1.7) brightness(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(1.7) brightness(1.05)",
        overflow: "hidden",
      }}
    >
      {/* Rolling liquid shimmer drop */}
      <div
        style={{
          position: "absolute",
          left: "-15%",
          right: "-15%",
          top: `${shimmerY}%`,
          height: "42%",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.10) 0%, transparent 68%)",
          transform: "rotate(-7deg) scaleX(1.25)",
          pointerEvents: "none",
        }}
      />
      {/* Top edge specular line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "12%",
          right: "12%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.68), transparent)",
        }}
      />
      {/* Bottom inner shadow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.10) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

// ── SVG Icons ─────────────────────────────────────────────────────────────────

const PaceIcon = ({ c = gold, s = 48 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="28" r="16" stroke={c} strokeWidth="2" />
    <path d="M10 28 Q24 12 38 28" stroke={c} strokeWidth="1.5" fill="none" opacity="0.40" strokeDasharray="3 3" />
    <line x1="24" y1="28" x2="33" y2="19" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="28" r="3" fill={c} />
    <line x1="9" y1="28" x2="11" y2="28" stroke={c} strokeWidth="2" strokeLinecap="round" />
    <line x1="37" y1="28" x2="39" y2="28" stroke={c} strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="11" x2="24" y2="13.5" stroke={c} strokeWidth="2" strokeLinecap="round" />
    <line x1="14.2" y1="14.2" x2="15.8" y2="15.8" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
    <line x1="33.8" y1="14.2" x2="32.2" y2="15.8" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
  </svg>
);

const TimingIcon = ({ c = gold, s = 48 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
    <rect x="6" y="12" width="36" height="30" rx="4" stroke={c} strokeWidth="2" />
    <line x1="16" y1="6" x2="16" y2="17" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="6" x2="32" y2="17" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="6" y1="22" x2="42" y2="22" stroke={c} strokeWidth="1.5" opacity="0.32" />
    <circle cx="24" cy="33" r="6.5" stroke={c} strokeWidth="1.5" />
    <line x1="24" y1="28.5" x2="24" y2="33" stroke={c} strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="33" x2="28" y2="36" stroke={c} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const DemandIcon = ({ c = gold, s = 48 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
    <polyline
      points="5,40 13,26 20,31 28,18 36,24 44,10"
      stroke={c}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="5" y1="43" x2="44" y2="43" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.38" />
    <line x1="5" y1="7" x2="5" y2="43" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.38" />
    <circle cx="44" cy="10" r="3.5" fill={c} />
    <line x1="38" y1="10" x2="40.5" y2="10" stroke={c} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.45" />
  </svg>
);

const ComparisonIcon = ({ c = gold, s = 48 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="16" width="16" height="24" rx="3" stroke={c} strokeWidth="2" />
    <rect x="28" y="8" width="16" height="32" rx="3" stroke={c} strokeWidth="2" />
    <line x1="20" y1="26" x2="28" y2="26" stroke={c} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.52" />
    <polyline points="24,22 28,26 24,30" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="8" y1="23" x2="16" y2="23" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.40" />
    <line x1="8" y1="29" x2="16" y2="29" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.40" />
    <line x1="32" y1="15" x2="40" y2="15" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.40" />
    <line x1="32" y1="21" x2="40" y2="21" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.40" />
    <line x1="32" y1="27" x2="40" y2="27" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.40" />
  </svg>
);

const DecisionIcon = ({ c = gold, s = 48 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="20" r="13" stroke={c} strokeWidth="2" />
    <polyline points="17,20 21,24 31,14" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="24" y1="33" x2="24" y2="42" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="42" x2="31" y2="42" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DataIcon = ({ c = gold, s = 40 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
    <rect x="4" y="6" width="32" height="28" rx="3" stroke={c} strokeWidth="1.8" />
    <line x1="4" y1="16" x2="36" y2="16" stroke={c} strokeWidth="1" opacity="0.28" />
    <line x1="15" y1="6" x2="15" y2="34" stroke={c} strokeWidth="1" opacity="0.28" />
    <text x="5.5" y="14" fontSize="5.5" fill={c} fontFamily="monospace" opacity="0.50">
      01011
    </text>
    <text x="5.5" y="28" fontSize="9" fill={c} fontFamily="monospace" fontWeight="700">
      42.8
    </text>
    <text x="18.5" y="28" fontSize="6" fill={c} fontFamily="monospace" opacity="0.50">
      %
    </text>
  </svg>
);

const BrainIcon = ({ c = gold, s = 40 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
    <path
      d="M20 7 C14 7 8 12 8 18 C8 23 11 27 16 29 L16 33 L24 33 L24 29 C29 27 32 23 32 18 C32 12 26 7 20 7Z"
      stroke={c}
      strokeWidth="1.8"
      fill="none"
    />
    <line x1="16" y1="33" x2="24" y2="33" stroke={c} strokeWidth="1.5" />
    <line x1="17" y1="36" x2="23" y2="36" stroke={c} strokeWidth="1.5" />
    <line x1="20" y1="13" x2="20" y2="24" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
    <line x1="14" y1="18" x2="26" y2="18" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
    <circle cx="17" cy="15" r="1.2" fill={c} opacity="0.55" />
    <circle cx="23" cy="21" r="1.2" fill={c} opacity="0.55" />
  </svg>
);

const ActionIcon = ({ c = gold, s = 40 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
    <polygon points="20,6 37,33 3,33" stroke={c} strokeWidth="1.8" fill="none" />
    <line x1="20" y1="16" x2="20" y2="25" stroke={c} strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="29" r="1.8" fill={c} />
  </svg>
);

// ── Test definitions ──────────────────────────────────────────────────────────

const TESTS = [
  {
    label: "PACE",
    Icon: PaceIcon,
    question: "Are you moving\nfaster or slower\nthan the market?",
    startFrame: 12,
    endFrame: 224,
  },
  {
    label: "TIMING",
    Icon: TimingIcon,
    question: "Are you looking at\nthe correct booking\nwindow and lead time?",
    startFrame: 224,
    endFrame: 386,
  },
  {
    label: "DEMAND",
    Icon: DemandIcon,
    question: "Is the demand real —\nor are you reacting\nto a headline?",
    startFrame: 386,
    endFrame: 600,
  },
  {
    label: "COMPARISON",
    Icon: ComparisonIcon,
    question: "Are you using the right\nmarket and the right\ncompetitors?",
    startFrame: 600,
    endFrame: 743,
  },
  {
    label: "DECISION",
    Icon: DecisionIcon,
    question: "Can you explain why\nyou made the move?",
    startFrame: 743,
    endFrame: 900,
  },
];

// ── Left Panel ────────────────────────────────────────────────────────────────

const LeftPanelContent: React.FC<{ frame: number }> = ({ frame }) => {
  const testsOp = fo(frame, 882, 916);
  const conclusionOp = fi(frame, 882, 916);

  const activeIdx =
    frame >= 743 ? 4 :
    frame >= 600 ? 3 :
    frame >= 386 ? 2 :
    frame >= 224 ? 1 :
    frame >= 12  ? 0 : -1;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>

      {/* ── TESTS PHASE ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: testsOp,
          padding: "28px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 10,
            fontWeight: 700,
            color: gold,
            letterSpacing: 2.8,
            marginBottom: 14,
          }}
        >
          5 PACE TESTS
        </div>
        <div style={{ height: 1, background: "rgba(201,164,92,0.22)", marginBottom: 20 }} />

        {TESTS.map((t, i) => {
          const chipSlide = fi(frame, t.startFrame, t.startFrame + 18);
          const isActive = i === activeIdx && frame < 882;
          const isDone = i < activeIdx && frame < 882;
          return (
            <div
              key={t.label}
              style={{
                opacity: chipSlide,
                transform: `translateX(${(1 - chipSlide) * -16}px)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 13px",
                borderRadius: 12,
                marginBottom: 13,
                background: isActive
                  ? "rgba(201,164,92,0.13)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  isActive
                    ? "rgba(201,164,92,0.32)"
                    : "rgba(255,255,255,0.07)"
                }`,
              }}
            >
              <t.Icon s={26} c={isActive ? gold : slate} />
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? cream : slate,
                  letterSpacing: 2,
                  flex: 1,
                }}
              >
                {t.label}
              </div>
              {isDone && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke={gold} strokeWidth="1.2" opacity="0.65" />
                  <polyline
                    points="4,7 6,9 10,5"
                    stroke={gold}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {isActive && (
                <div
                  style={{ width: 5, height: 5, borderRadius: "50%", background: gold }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── CONCLUSION PHASE ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: conclusionOp,
          padding: "28px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 10,
            fontWeight: 700,
            color: gold,
            letterSpacing: 2.8,
            marginBottom: 14,
          }}
        >
          THE DIFFERENCE
        </div>
        <div style={{ height: 1, background: "rgba(201,164,92,0.22)", marginBottom: 26 }} />

        {/* DATA label */}
        {(() => {
          const op = fi(frame, 882, 910);
          return (
            <div
              style={{
                opacity: op,
                transform: `translateY(${(1 - op) * 18}px)`,
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontFamily: poppins, fontSize: 24, fontWeight: 700, color: cream, letterSpacing: 0.5 }}
              >
                DATA
              </div>
              <div
                style={{ fontFamily: poppins, fontSize: 11, color: slate, marginTop: 3, lineHeight: 1.5 }}
              >
                The number
              </div>
            </div>
          );
        })()}

        <div
          style={{
            opacity: fi(frame, 882, 910) * 0.40,
            fontSize: 18,
            color: gold,
            marginBottom: 18,
            marginLeft: 2,
          }}
        >
          ↓
        </div>

        {/* INTELLIGENCE label */}
        {(() => {
          const op = fi(frame, 996, 1024);
          return (
            <div
              style={{
                opacity: op,
                transform: `translateY(${(1 - op) * 18}px)`,
                marginBottom: 20,
              }}
            >
              <div
                style={{ fontFamily: poppins, fontSize: 16, fontWeight: 700, color: cream, letterSpacing: 0.3 }}
              >
                INTELLIGENCE
              </div>
              <div
                style={{ fontFamily: poppins, fontSize: 11, color: slate, marginTop: 3, lineHeight: 1.5 }}
              >
                What the number means
              </div>
            </div>
          );
        })()}

        <div
          style={{
            opacity: fi(frame, 996, 1024) * 0.40,
            fontSize: 18,
            color: gold,
            marginBottom: 18,
            marginLeft: 2,
          }}
        >
          ↓
        </div>

        {/* DECISION label */}
        {(() => {
          const op = fi(frame, 1263, 1291);
          return (
            <div
              style={{
                opacity: op,
                transform: `translateY(${(1 - op) * 18}px)`,
              }}
            >
              <div
                style={{ fontFamily: poppins, fontSize: 24, fontWeight: 700, color: gold, letterSpacing: 0.5 }}
              >
                DECISION
              </div>
              <div
                style={{ fontFamily: poppins, fontSize: 11, color: slate, marginTop: 3, lineHeight: 1.5 }}
              >
                What you do about it
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

// ── Right Panel ───────────────────────────────────────────────────────────────

const RightPanelContent: React.FC<{ frame: number }> = ({ frame }) => {
  const conclusionOp = fi(frame, 882, 916);
  const dataOp = fi(frame, 1079, 1109);
  const intOp = fi(frame, 1134, 1164);
  const decOp = fi(frame, 1263, 1293);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>

      {/* ── PER-TEST CONTENT ── */}
      {TESTS.map((t, i) => {
        const op = sceneOp(frame, t.startFrame, t.startFrame + 18, t.endFrame - 16, t.endFrame);
        const slide = (1 - fi(frame, t.startFrame, t.startFrame + 18)) * 22;
        return (
          <div
            key={t.label}
            style={{
              position: "absolute",
              inset: 0,
              opacity: op,
              transform: `translateY(${slide}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              padding: "20px 22px",
              boxSizing: "border-box",
            }}
          >
            {/* Test number chip */}
            <div
              style={{
                fontFamily: poppins,
                fontSize: 9,
                fontWeight: 700,
                color: gold,
                letterSpacing: 2.5,
                padding: "4px 12px",
                background: "rgba(201,164,92,0.11)",
                borderRadius: 20,
                border: "1px solid rgba(201,164,92,0.24)",
              }}
            >
              {i + 1} OF 5
            </div>

            <t.Icon s={82} />

            <div
              style={{
                fontFamily: poppins,
                fontSize: 10,
                fontWeight: 700,
                color: gold,
                letterSpacing: 2.8,
              }}
            >
              {t.label}
            </div>

            <div
              style={{
                fontFamily: poppins,
                fontSize: 19,
                fontWeight: 600,
                color: cream,
                textAlign: "center",
                lineHeight: 1.55,
                whiteSpace: "pre-line",
              }}
            >
              {t.question}
            </div>
          </div>
        );
      })}

      {/* ── CONCLUSION CONTENT ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: conclusionOp,
          padding: "28px 20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 10,
            fontWeight: 700,
            color: gold,
            letterSpacing: 2.8,
            marginBottom: 20,
          }}
        >
          MARKET INTELLIGENCE
        </div>

        {/* DATA definition */}
        <div
          style={{
            opacity: dataOp,
            transform: `translateX(${(1 - dataOp) * -18}px)`,
            display: "flex",
            alignItems: "flex-start",
            gap: 13,
            marginBottom: 10,
          }}
        >
          <div style={{ flexShrink: 0, marginTop: 2 }}>
            <DataIcon s={38} />
          </div>
          <div>
            <div
              style={{ fontFamily: poppins, fontSize: 14, fontWeight: 700, color: cream, marginBottom: 3 }}
            >
              DATA
            </div>
            <div
              style={{ fontFamily: poppins, fontSize: 11, color: slate, lineHeight: 1.55 }}
            >
              The number
            </div>
          </div>
        </div>

        <div
          style={{
            opacity: Math.max(dataOp, intOp) * 0.38,
            color: gold,
            fontSize: 16,
            marginBottom: 10,
            marginLeft: 50,
          }}
        >
          ↓
        </div>

        {/* INTELLIGENCE definition */}
        <div
          style={{
            opacity: intOp,
            transform: `translateX(${(1 - intOp) * -18}px)`,
            display: "flex",
            alignItems: "flex-start",
            gap: 13,
            marginBottom: 10,
          }}
        >
          <div style={{ flexShrink: 0, marginTop: 2 }}>
            <BrainIcon s={38} />
          </div>
          <div>
            <div
              style={{ fontFamily: poppins, fontSize: 14, fontWeight: 700, color: cream, marginBottom: 3 }}
            >
              INTELLIGENCE
            </div>
            <div
              style={{ fontFamily: poppins, fontSize: 11, color: slate, lineHeight: 1.55 }}
            >
              {`What the number\nmeans in context`}
            </div>
          </div>
        </div>

        <div
          style={{
            opacity: Math.max(intOp, decOp) * 0.38,
            color: gold,
            fontSize: 16,
            marginBottom: 10,
            marginLeft: 50,
          }}
        >
          ↓
        </div>

        {/* DECISION definition */}
        <div
          style={{
            opacity: decOp,
            transform: `translateX(${(1 - decOp) * -18}px)`,
            display: "flex",
            alignItems: "flex-start",
            gap: 13,
          }}
        >
          <div style={{ flexShrink: 0, marginTop: 2 }}>
            <ActionIcon s={38} />
          </div>
          <div>
            <div
              style={{ fontFamily: poppins, fontSize: 14, fontWeight: 700, color: gold, marginBottom: 3 }}
            >
              DECISION
            </div>
            <div
              style={{ fontFamily: poppins, fontSize: 11, color: slate, lineHeight: 1.55 }}
            >
              {`What you are going\nto do about it`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Scene ────────────────────────────────────────────────────────────────

export const FiveTestsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const panelOp = fi(frame, 0, 22);

  const PANEL_W = 340;
  const PANEL_H = 960;
  const PANEL_Y = 60;

  return (
    <AbsoluteFill style={{ background: palette.bg }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
      {/* Left panel */}
      <GlassPanel
        x={28}
        y={PANEL_Y}
        w={PANEL_W}
        h={PANEL_H}
        opacity={panelOp}
        frame={frame}
      >
        <LeftPanelContent frame={frame} />
      </GlassPanel>

      {/* Right panel — shimmer offset by +38 frames for visual variety */}
      <GlassPanel
        x={1920 - 28 - PANEL_W}
        y={PANEL_Y}
        w={PANEL_W}
        h={PANEL_H}
        opacity={panelOp}
        frame={frame + 38}
      >
        <RightPanelContent frame={frame} />
      </GlassPanel>
    </AbsoluteFill>
  );
};
