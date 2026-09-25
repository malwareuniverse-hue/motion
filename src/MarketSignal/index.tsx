import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { poppins } from "../MovingPicture/fonts";
import { palette } from "../MovingPicture/theme";

export const FPS = 30;
export const DURATION_IN_FRAMES = 1710;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// ── Frame map (30fps, timecode SS*30+FF) ─────────────────────────────────────
//   31  "so this week's market signal"
//   78  "and here's your challenge for this week"
//  137  "pick one important period within your next 60 days"
//  241  "maybe it's a holiday a major weekend"
//  335  "an event or another high value stay period"
//  467  "run all 10 questions"
//  534  "then label every answer with one word"
//  650  "evidence or Assumption – that's it"
//  795  "evidence and here's the important part"
//  974  "do not change your price yet"
// 1074  "first find your biggest Assumption"
// 1211  "maybe you do not know the real booking window"
// 1290  "maybe the event is not creating pickup"
// 1380  "maybe your comp set is too broad"
// 1469  "maybe the problem is not price at all"
// 1579  "find the gap"
// 1629  "then fix the gap"
// ─────────────────────────────────────────────────────────────────────────────

const GOLD = palette.gold;       // #C9A45C
const CREAM = palette.cream;     // #F3F1EC
const SLATE = palette.slate;     // #8C93A0
const AMBER = palette.amber;     // #D4956A
const BG = "#0B0C0E";
const RED = "#C95C5C";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function fi(frame: number, from: number, to: number): number {
  return clamp01(
    interpolate(frame, [from, to], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    })
  );
}
function fo(frame: number, from: number, to: number): number {
  return 1 - fi(frame, from, to);
}
function sceneOp(f: number, i0: number, i1: number, o0: number, o1: number): number {
  return Math.min(fi(f, i0, i1), fo(f, o0, o1));
}

// ─── Shared SVG Icons ─────────────────────────────────────────────────────────

function CalendarIcon({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="8" width="32" height="28" rx="4" stroke={color} strokeWidth="2" />
      <line x1="4" y1="16" x2="36" y2="16" stroke={color} strokeWidth="2" />
      <line x1="13" y1="4" x2="13" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="4" x2="27" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="13" cy="24" r="2" fill={color} />
      <circle cx="20" cy="24" r="2" fill={color} />
      <circle cx="27" cy="24" r="2" fill={color} />
      <circle cx="13" cy="31" r="2" fill={color} />
      <circle cx="20" cy="31" r="2" fill={color} />
    </svg>
  );
}

function StarIcon({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <polygon
        points="18,3 22.1,13.1 33,13.8 25,20.8 27.6,31.5 18,25.8 8.4,31.5 11,20.8 3,13.8 13.9,13.1"
        fill={color}
        opacity={0.9}
      />
    </svg>
  );
}

function LockIcon({ color, size = 80 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="12" y="36" width="56" height="40" rx="8" fill={`${color}22`} stroke={color} strokeWidth="2.5" />
      <path
        d="M 24 36 L 24 24 Q 24 10 40 10 Q 56 10 56 24 L 56 36"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="40" cy="56" r="6" fill={color} />
      <line x1="40" y1="62" x2="40" y2="70" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Scene 1: Market Signal Intro (0 → 120) ──────────────────────────────────

function Scene1({ frame }: { frame: number }) {
  const op = sceneOp(frame, 0, 24, 90, 120);
  const progress = fi(frame, 0, 36);
  const y = interpolate(progress, [0, 1], [50, 0]);
  const lineW = interpolate(fi(frame, 20, 70), [0, 1], [0, 420]);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ transform: `translateY(${y}px)`, textAlign: "center" }}>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 18,
            letterSpacing: 10,
            color: SLATE,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Pricing by Mira
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 20,
            letterSpacing: 6,
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          This Week's
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 100,
            fontWeight: 800,
            color: CREAM,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          Market Signal
        </div>
        <div
          style={{
            width: lineW,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            margin: "28px auto 28px",
          }}
        />
        <div
          style={{
            fontFamily: poppins,
            fontSize: 28,
            color: CREAM,
            opacity: 0.6,
          }}
        >
          Here's your challenge for this week
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 2: Pick One Period / 60 Days (90 → 460) ───────────────────────────

function PeriodOption({
  icon,
  label,
  color,
  delay,
  frame,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  delay: number;
  frame: number;
}) {
  const op = fi(frame, delay, delay + 20);
  const y = interpolate(fi(frame, delay, delay + 20), [0, 1], [24, 0]);
  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${y}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        background: `${color}10`,
        border: `1.5px solid ${color}44`,
        borderRadius: 16,
        padding: "28px 36px",
        minWidth: 180,
      }}
    >
      {icon}
      <div
        style={{
          fontFamily: poppins,
          fontSize: 17,
          color: CREAM,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Timeline60Days({ frame }: { frame: number }) {
  const barProgress = fi(frame, 150, 200);
  const highlightProgress = fi(frame, 200, 250);
  const BAR_W = 800;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div
        style={{
          fontFamily: poppins,
          fontSize: 14,
          letterSpacing: 4,
          color: SLATE,
          textTransform: "uppercase",
          width: 70,
          textAlign: "right",
        }}
      >
        Today
      </div>
      <div
        style={{
          position: "relative",
          width: BAR_W,
          height: 10,
          borderRadius: 5,
          background: "rgba(255,255,255,0.07)",
          overflow: "visible",
        }}
      >
        {/* base fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${barProgress * 100}%`,
            height: "100%",
            borderRadius: 5,
            background: "rgba(255,255,255,0.05)",
          }}
        />
        {/* highlighted range ~30%–70% */}
        <div
          style={{
            position: "absolute",
            left: "28%",
            top: 0,
            width: `${highlightProgress * 42}%`,
            height: "100%",
            borderRadius: 5,
            background: `linear-gradient(90deg, ${GOLD}88, ${GOLD})`,
          }}
        />
        {/* tick + label at 60 days */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            marginTop: 10,
            fontFamily: poppins,
            fontSize: 13,
            color: GOLD,
            letterSpacing: 3,
            whiteSpace: "nowrap",
            opacity: barProgress,
          }}
        >
          + 60 days
        </div>
        {/* bracket arrow */}
        <div
          style={{
            position: "absolute",
            left: "28%",
            top: "100%",
            marginTop: 28,
            fontFamily: poppins,
            fontSize: 13,
            color: GOLD,
            opacity: highlightProgress,
            whiteSpace: "nowrap",
          }}
        >
          ← pick a period here →
        </div>
      </div>
      <div
        style={{
          fontFamily: poppins,
          fontSize: 14,
          letterSpacing: 4,
          color: SLATE,
          textTransform: "uppercase",
        }}
      >
        +60d
      </div>
    </div>
  );
}

function Scene2({ frame }: { frame: number }) {
  const op = sceneOp(frame, 90, 130, 430, 460);
  const headerOp = fi(frame, 90, 130);
  const headerY = interpolate(fi(frame, 90, 130), [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 1200, width: "100%" }}>
        {/* Header */}
        <div
          style={{
            transform: `translateY(${headerY}px)`,
            opacity: headerOp,
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 20,
              letterSpacing: 6,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Your Challenge
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 72,
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1.05,
              marginBottom: 8,
            }}
          >
            Pick One Important Period
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 38,
              color: SLATE,
            }}
          >
            within your next 60 days
          </div>
        </div>

        {/* Timeline */}
        <div
          style={{
            opacity: fi(frame, 140, 180),
            display: "flex",
            justifyContent: "center",
            marginBottom: 60,
          }}
        >
          <Timeline60Days frame={frame} />
        </div>

        {/* Period options */}
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <PeriodOption
            icon={<StarIcon color={GOLD} size={36} />}
            label="Holiday"
            color={GOLD}
            delay={241}
            frame={frame}
          />
          <PeriodOption
            icon={<CalendarIcon color={AMBER} size={36} />}
            label={"Major\nWeekend"}
            color={AMBER}
            delay={260}
            frame={frame}
          />
          <PeriodOption
            icon={
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="14" stroke={CREAM} strokeWidth="2" />
                <polyline
                  points="18,10 18,18 24,22"
                  stroke={CREAM}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            label="Event"
            color={CREAM}
            delay={280}
            frame={frame}
          />
          <PeriodOption
            icon={
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="4" y="22" width="28" height="12" rx="3" fill={GOLD} opacity={0.4} />
                <rect x="8" y="14" width="20" height="8" rx="2" fill={GOLD} opacity={0.7} />
                <rect x="13" y="8" width="10" height="6" rx="2" fill={GOLD} />
              </svg>
            }
            label="High-Value Stay"
            color={GOLD}
            delay={300}
            frame={frame}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 3: Run 10 Questions (430 → 720) ───────────────────────────────────

const Q_LABELS = ["E", "A", "E", "E", "A", "A", "E", "A", "E", "A"] as const;

function QuestionRow({
  num,
  delay,
  labelDelay,
  frame,
}: {
  num: number;
  delay: number;
  labelDelay: number;
  frame: number;
}) {
  const op = fi(frame, delay, delay + 14);
  const x = interpolate(fi(frame, delay, delay + 14), [0, 1], [-40, 0]);
  const label = Q_LABELS[num - 1];
  const isEvidence = label === "E";
  const labelOp = fi(frame, labelDelay, labelDelay + 16);

  return (
    <div
      style={{
        opacity: op,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 9,
      }}
    >
      {/* number */}
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: poppins,
          fontSize: 11,
          color: SLATE,
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      {/* bar */}
      <div
        style={{
          flex: 1,
          height: 2,
          borderRadius: 1,
          background: "rgba(255,255,255,0.07)",
        }}
      />
      {/* label badge */}
      <div
        style={{
          opacity: labelOp,
          transform: `scale(${interpolate(fi(frame, labelDelay, labelDelay + 16), [0, 1], [0.7, 1])})`,
          width: 34,
          height: 24,
          borderRadius: 6,
          background: isEvidence ? `${GOLD}22` : `${AMBER}22`,
          border: `1px solid ${isEvidence ? GOLD : AMBER}66`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: poppins,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1,
          color: isEvidence ? GOLD : AMBER,
          flexShrink: 0,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Scene3({ frame }: { frame: number }) {
  const op = sceneOp(frame, 430, 470, 700, 730);
  const headerOp = fi(frame, 430, 470);
  const headerY = interpolate(fi(frame, 430, 470), [0, 1], [30, 0]);
  const labelSectionOp = fi(frame, 540, 580);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", gap: 100, alignItems: "center", maxWidth: 1300 }}>
        {/* Left: question list */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              transform: `translateY(${headerY}px)`,
              opacity: headerOp,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                fontFamily: poppins,
                fontSize: 18,
                letterSpacing: 6,
                color: GOLD,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              The Diagnostic
            </div>
            <div
              style={{
                fontFamily: poppins,
                fontSize: 56,
                fontWeight: 700,
                color: CREAM,
                lineHeight: 1.1,
              }}
            >
              Run All<br />10 Questions
            </div>
          </div>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <QuestionRow
              key={n}
              num={n}
              delay={470 + n * 7}
              labelDelay={544 + n * 6}
              frame={frame}
            />
          ))}
        </div>

        {/* Right: label system */}
        <div
          style={{
            flex: 1,
            opacity: labelSectionOp,
            transform: `translateY(${interpolate(fi(frame, 540, 580), [0, 1], [24, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 18,
              letterSpacing: 5,
              color: SLATE,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Then label every answer
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 32,
              color: CREAM,
              marginBottom: 40,
              opacity: 0.8,
            }}
          >
            with one word
          </div>

          <div style={{ display: "flex", gap: 20 }}>
            {/* Evidence box */}
            <div
              style={{
                opacity: fi(frame, 560, 590),
                transform: `translateY(${interpolate(fi(frame, 560, 590), [0, 1], [20, 0])}px)`,
                flex: 1,
                background: `${GOLD}14`,
                border: `2px solid ${GOLD}`,
                borderRadius: 16,
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 11,
                  letterSpacing: 4,
                  color: SLATE,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Option A
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 38,
                  fontWeight: 800,
                  color: GOLD,
                  letterSpacing: 1,
                }}
              >
                E
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 16,
                  color: GOLD,
                  marginTop: 4,
                  opacity: 0.8,
                }}
              >
                Evidence
              </div>
            </div>

            {/* Assumption box */}
            <div
              style={{
                opacity: fi(frame, 580, 610),
                transform: `translateY(${interpolate(fi(frame, 580, 610), [0, 1], [20, 0])}px)`,
                flex: 1,
                background: `${AMBER}14`,
                border: `2px solid ${AMBER}`,
                borderRadius: 16,
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 11,
                  letterSpacing: 4,
                  color: SLATE,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Option B
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 38,
                  fontWeight: 800,
                  color: AMBER,
                  letterSpacing: 1,
                }}
              >
                A
              </div>
              <div
                style={{
                  fontFamily: poppins,
                  fontSize: 16,
                  color: AMBER,
                  marginTop: 4,
                  opacity: 0.8,
                }}
              >
                Assumption
              </div>
            </div>
          </div>

          {/* "That's it" */}
          <div
            style={{
              opacity: fi(frame, 640, 670),
              marginTop: 24,
              fontFamily: poppins,
              fontSize: 22,
              color: SLATE,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            That's it.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 4: Do Not Change Your Price (700 → 1090) ──────────────────────────

function EvidenceAssumptionSplit({ frame }: { frame: number }) {
  const op = fi(frame, 700, 740);
  const lX = interpolate(fi(frame, 700, 740), [0, 1], [-60, 0]);
  const rX = interpolate(fi(frame, 720, 760), [0, 1], [60, 0]);
  const rOp = fi(frame, 720, 760);

  return (
    <div
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        marginBottom: 40,
      }}
    >
      <div
        style={{
          transform: `translateX(${lX}px)`,
          fontFamily: poppins,
          fontSize: 56,
          fontWeight: 800,
          color: GOLD,
          letterSpacing: 2,
        }}
      >
        EVIDENCE
      </div>
      <div
        style={{
          fontFamily: poppins,
          fontSize: 28,
          color: SLATE,
        }}
      >
        or
      </div>
      <div
        style={{
          opacity: rOp,
          transform: `translateX(${rX}px)`,
          fontFamily: poppins,
          fontSize: 56,
          fontWeight: 800,
          color: AMBER,
          letterSpacing: 2,
        }}
      >
        ASSUMPTION
      </div>
    </div>
  );
}

function Scene4({ frame }: { frame: number }) {
  const op = sceneOp(frame, 700, 730, 1065, 1090);

  const importantOp = fi(frame, 790, 830);
  const importantY = interpolate(fi(frame, 790, 830), [0, 1], [20, 0]);

  const lockOp = fi(frame, 900, 940);
  const dontOp = fi(frame, 950, 990);

  // separator line width
  const sepW = interpolate(fi(frame, 850, 900), [0, 1], [0, 240]);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Evidence or Assumption */}
      <EvidenceAssumptionSplit frame={frame} />

      {/* "here's the important part" */}
      <div
        style={{
          opacity: importantOp,
          transform: `translateY(${importantY}px)`,
          fontFamily: poppins,
          fontSize: 22,
          letterSpacing: 5,
          color: SLATE,
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        And here's the important part
      </div>

      {/* Separator */}
      <div
        style={{
          width: sepW,
          height: 1,
          background: `rgba(255,255,255,0.12)`,
          marginBottom: 48,
        }}
      />

      {/* DO NOT CHANGE YOUR PRICE YET */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
        }}
      >
        {/* Lock */}
        <div
          style={{
            opacity: lockOp,
            transform: `scale(${interpolate(fi(frame, 900, 940), [0, 1], [0.7, 1])})`,
          }}
        >
          <LockIcon color={RED} size={96} />
        </div>

        {/* Text */}
        <div
          style={{
            opacity: dontOp,
            transform: `translateX(${interpolate(fi(frame, 950, 990), [0, 1], [40, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 18,
              letterSpacing: 8,
              color: RED,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Do Not
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 80,
              fontWeight: 800,
              color: CREAM,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            Change Your<br />Price Yet
          </div>
        </div>
      </div>

      {/* Underline pulse */}
      <div
        style={{
          opacity: fi(frame, 990, 1020) * 0.5,
          marginTop: 32,
          width: 600,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
}

// ─── Scene 5: Find Your Biggest Assumption (1065 → 1590) ─────────────────────

function AssumptionCard({
  text,
  delay,
  frame,
  accent,
}: {
  text: string;
  delay: number;
  frame: number;
  accent?: boolean;
}) {
  const op = fi(frame, delay, delay + 22);
  const x = interpolate(fi(frame, delay, delay + 22), [0, 1], [80, 0]);
  const color = accent ? AMBER : SLATE;

  return (
    <div
      style={{
        opacity: op,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: accent ? `${AMBER}10` : "rgba(255,255,255,0.03)",
        border: `1.5px solid ${accent ? AMBER : "rgba(255,255,255,0.08)"}`,
        borderRadius: 14,
        padding: "22px 28px",
        marginBottom: 14,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontFamily: poppins,
          fontSize: 24,
          color: accent ? AMBER : CREAM,
          fontWeight: accent ? 600 : 400,
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function Scene5({ frame }: { frame: number }) {
  const op = sceneOp(frame, 1065, 1100, 1565, 1590);
  const headerOp = fi(frame, 1065, 1105);
  const headerY = interpolate(fi(frame, 1065, 1105), [0, 1], [36, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 960, width: "100%" }}>
        {/* Header */}
        <div
          style={{
            transform: `translateY(${headerY}px)`,
            opacity: headerOp,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 18,
              letterSpacing: 6,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Step One
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 62,
              fontWeight: 700,
              color: CREAM,
              lineHeight: 1.1,
            }}
          >
            Find Your Biggest<br />Assumption
          </div>
        </div>

        {/* Assumption cards */}
        <AssumptionCard
          text="Maybe you don't know the real booking window"
          delay={1211}
          frame={frame}
          accent
        />
        <AssumptionCard
          text="Maybe the event is not creating pickup"
          delay={1290}
          frame={frame}
        />
        <AssumptionCard
          text="Maybe your comp set is too broad"
          delay={1380}
          frame={frame}
        />
        <AssumptionCard
          text="Maybe the problem is not price at all"
          delay={1469}
          frame={frame}
          accent
        />
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 6: Find → Fix the Gap (1565 → 1710) ───────────────────────────────

function GapIllustration({ frame }: { frame: number }) {
  // Two platforms with a gap. Bridge builds in when "fix" arrives.
  const bridgeProgress = fi(frame, 1629, 1670);
  const gapSize = interpolate(bridgeProgress, [0, 1], [140, 0]);

  const PLATFORM_W = 240;
  const PLATFORM_H = 100;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 56,
        position: "relative",
      }}
    >
      {/* Left platform */}
      <div
        style={{
          width: PLATFORM_W,
          height: PLATFORM_H,
          background: `linear-gradient(180deg, ${GOLD}28 0%, ${GOLD}40 100%)`,
          border: `2px solid ${GOLD}55`,
          borderBottom: "none",
          borderRadius: "10px 10px 0 0",
        }}
      />

      {/* Gap */}
      <div
        style={{
          width: gapSize,
          height: 40,
          position: "relative",
          transition: "width 0ms",
          overflow: "hidden",
        }}
      >
        {/* bridge fill */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 4,
            background: GOLD,
            transform: "translateY(-50%)",
            opacity: bridgeProgress,
            borderRadius: 2,
          }}
        />
        {/* "gap" label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: poppins,
            fontSize: 12,
            color: SLATE,
            letterSpacing: 3,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            opacity: fo(frame, 1629, 1660),
          }}
        >
          gap
        </div>
      </div>

      {/* Right platform */}
      <div
        style={{
          width: PLATFORM_W,
          height: PLATFORM_H,
          background: `linear-gradient(180deg, ${GOLD}28 0%, ${GOLD}40 100%)`,
          border: `2px solid ${GOLD}55`,
          borderBottom: "none",
          borderRadius: "10px 10px 0 0",
        }}
      />
    </div>
  );
}

function Scene6({ frame }: { frame: number }) {
  const op = fi(frame, 1565, 1600);
  const findOp = fi(frame, 1570, 1600);
  const findY = interpolate(fi(frame, 1570, 1600), [0, 1], [30, 0]);
  const arrowOp = fi(frame, 1610, 1632);
  const fixOp = fi(frame, 1625, 1655);
  const fixScale = interpolate(fi(frame, 1625, 1655), [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <GapIllustration frame={frame} />

      {/* Text */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            opacity: findOp,
            transform: `translateY(${findY}px)`,
            fontFamily: poppins,
            fontSize: 68,
            fontWeight: 800,
            color: AMBER,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Find the Gap
        </div>

        <div
          style={{
            opacity: arrowOp,
            fontFamily: poppins,
            fontSize: 36,
            color: SLATE,
            marginBottom: 16,
          }}
        >
          ↓
        </div>

        <div
          style={{
            opacity: fixOp,
            transform: `scale(${fixScale})`,
            fontFamily: poppins,
            fontSize: 68,
            fontWeight: 800,
            color: GOLD,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Then Fix the Gap
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export const MarketSignalScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Radial vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      <Scene1 frame={frame} />
      <Scene2 frame={frame} />
      <Scene3 frame={frame} />
      <Scene4 frame={frame} />
      <Scene5 frame={frame} />
      <Scene6 frame={frame} />
    </AbsoluteFill>
  );
};
