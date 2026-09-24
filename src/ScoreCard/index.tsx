import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { poppins } from "../MovingPicture/fonts";
import { palette } from "../MovingPicture/theme";

export const FPS = 30;
export const DURATION_IN_FRAMES = 1500;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Frame timing (@ 30fps):
// "now add up your score" = 0
// "if you scored eight to 10" = 78
// "you probably have the main pieces in place" = 135
// "now ask yourself are you doing it consistently" = 263
// "and are you seeing the information early enough to act" = 375
// "if you scored five to seven" = 511
// "you have some visibility but you also have some gaps" = 565
// "maybe you know the occupancy but not the pickup" = 684
// "maybe you know about events" = 769
// "but you don't know how to validate their impact" = 860
// "maybe you have a comp set" = 973
// "but you don't know if those properties are truly your competitors" = 1074
// "and if you scored 0 to 4" = 1187
// "you are probably making many of your decisions" = 1242
// "based only on your calendar" = 1316
// "that means you're seeing the result" = 1389
// "after it already happened" = 1473

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const spring = Easing.bezier(0.34, 1.56, 0.64, 1);
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

function sceneOp(
  frame: number,
  inFrom: number,
  inTo: number,
  outFrom: number,
  outTo: number
): number {
  return Math.min(fi(frame, inFrom, inTo), fo(frame, outFrom, outTo));
}

// ─── SVG metric icons ─────────────────────────────────────────────────────────

function OccupancyIcon({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="30" width="8" height="14" rx="1.5" fill={color} opacity={0.45} />
      <rect x="16" y="20" width="8" height="24" rx="1.5" fill={color} opacity={0.70} />
      <rect x="28" y="8" width="8" height="36" rx="1.5" fill={color} />
      <rect x="40" y="14" width="8" height="30" rx="1.5" fill={color} opacity={0.80} />
    </svg>
  );
}

function PaceIcon({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <polyline
        points="4,40 14,28 24,32 36,14 44,18"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points="36,8 44,8 44,18"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EventsIcon({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="40" height="36" rx="3" stroke={color} strokeWidth={2} />
      <line x1="4" y1="20" x2="44" y2="20" stroke={color} strokeWidth={1.5} opacity={0.45} />
      <line x1="14" y1="4" x2="14" y2="14" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <line x1="34" y1="4" x2="34" y2="14" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <polygon
        points="24,24 25.8,29.8 32,29.8 27,33.3 28.8,39.1 24,35.6 19.2,39.1 21,33.3 16,29.8 22.2,29.8"
        fill={color}
        opacity={0.85}
      />
    </svg>
  );
}

function CompSetIcon({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Center house */}
      <polygon points="24,5 40,17 8,17" stroke={color} strokeWidth={2} fill={`${color}20`} />
      <rect x="10" y="17" width="28" height="22" rx="1" stroke={color} strokeWidth={2} fill={`${color}10`} />
      <rect x="20" y="27" width="8" height="12" stroke={color} strokeWidth={1.5} opacity={0.7} />
      {/* Left satellite */}
      <polygon points="8,26 16,20 24,26" stroke={color} strokeWidth={1.2} fill="none" opacity={0.45} />
      <rect x="10" y="26" width="12" height="9" rx="1" stroke={color} strokeWidth={1.2} fill="none" opacity={0.35} />
      {/* Right satellite */}
      <polygon points="40,26 32,20 24,26" stroke={color} strokeWidth={1.2} fill="none" opacity={0.45} />
      <rect x="26" y="26" width="12" height="9" rx="1" stroke={color} strokeWidth={1.2} fill="none" opacity={0.35} />
    </svg>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

type MetricState = "lit" | "partial" | "gap";

function MetricCard({
  icon,
  label,
  value,
  state,
  frame,
  inFrame,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  state: MetricState;
  frame: number;
  inFrame: number;
}) {
  const op = fi(frame, inFrame, inFrame + 22);
  const cardY = interpolate(frame, [inFrame, inFrame + 22], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  const isLit = state === "lit";
  const isPartial = state === "partial";
  const color = isLit ? palette.gold : isPartial ? palette.amber : palette.slate;
  const borderColor = isLit
    ? "rgba(201,164,92,0.38)"
    : isPartial
    ? "rgba(212,149,106,0.28)"
    : "rgba(140,147,160,0.11)";
  const bg = isLit
    ? "rgba(201,164,92,0.07)"
    : isPartial
    ? "rgba(212,149,106,0.05)"
    : "rgba(14,15,18,0.70)";
  const iconOpacity = isLit ? 1 : isPartial ? 0.65 : 0.20;
  const labelOpacity = isLit ? 1 : isPartial ? 0.65 : 0.35;
  const valueOpacity = isLit ? 1 : isPartial ? 0.55 : 0;

  const indicatorBg = isLit
    ? palette.gold
    : isPartial
    ? "rgba(212,149,106,0.35)"
    : "rgba(140,147,160,0.18)";
  const indicatorText = isLit ? "✓" : "?";
  const indicatorColor = isLit ? "#0B0C0E" : color;

  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${cardY}px)`,
        width: 234,
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: "26px 20px 22px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 10,
        position: "relative",
      }}
    >
      <div style={{ opacity: iconOpacity }}>{icon}</div>
      <div
        style={{
          fontFamily: poppins,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          color,
          textTransform: "uppercase" as const,
          textAlign: "center" as const,
          opacity: labelOpacity,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: poppins,
          fontSize: 26,
          fontWeight: isLit ? 500 : 300,
          color: isLit ? palette.cream : color,
          letterSpacing: "0.02em",
          opacity: valueOpacity,
          minHeight: 32,
        }}
      >
        {isLit ? value : ""}
      </div>
      {/* Status dot */}
      <div
        style={{
          position: "absolute",
          top: 11,
          right: 11,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: indicatorBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: indicatorColor,
            fontSize: 10,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {isLit ? indicatorText : isPartial ? "?" : "?"}
        </span>
      </div>
    </div>
  );
}

// ─── Scene 1: Score Intro (0 → 90) ───────────────────────────────────────────

function Scene1() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 0, 16, 68, 88);

  const titleOp = fi(frame, 0, 22);
  const titleY = interpolate(frame, [0, 22], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const t1Op = fi(frame, 10, 30);
  const t2Op = fi(frame, 20, 40);
  const t3Op = fi(frame, 30, 50);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 0,
      }}
    >
      <div
        style={{
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          textAlign: "center" as const,
          marginBottom: 52,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.26em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 12,
          }}
        >
          Now
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 58,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.02em",
          }}
        >
          Add up your{" "}
          <span style={{ color: palette.gold, fontWeight: 500 }}>score</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
        <div style={{ opacity: t1Op }}>
          <div
            style={{
              padding: "14px 34px",
              background: palette.goldFaint,
              border: `1px solid rgba(201,164,92,0.38)`,
              borderRadius: 8,
              textAlign: "center" as const,
              minWidth: 180,
            }}
          >
            <div
              style={{
                fontFamily: poppins,
                fontSize: 46,
                fontWeight: 600,
                color: palette.gold,
                lineHeight: 1,
              }}
            >
              8–10
            </div>
            <div
              style={{
                fontFamily: poppins,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.17em",
                color: palette.goldSoft,
                marginTop: 8,
                textTransform: "uppercase" as const,
              }}
            >
              Main pieces in place
            </div>
          </div>
        </div>

        <div style={{ opacity: t2Op }}>
          <div
            style={{
              padding: "14px 34px",
              background: "rgba(212,149,106,0.07)",
              border: `1px solid rgba(212,149,106,0.30)`,
              borderRadius: 8,
              textAlign: "center" as const,
              minWidth: 180,
            }}
          >
            <div
              style={{
                fontFamily: poppins,
                fontSize: 46,
                fontWeight: 600,
                color: palette.amber,
                lineHeight: 1,
              }}
            >
              5–7
            </div>
            <div
              style={{
                fontFamily: poppins,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.17em",
                color: palette.amberSoft,
                marginTop: 8,
                textTransform: "uppercase" as const,
              }}
            >
              Some gaps
            </div>
          </div>
        </div>

        <div style={{ opacity: t3Op }}>
          <div
            style={{
              padding: "14px 34px",
              background: "rgba(140,147,160,0.06)",
              border: `1px solid rgba(140,147,160,0.22)`,
              borderRadius: 8,
              textAlign: "center" as const,
              minWidth: 180,
            }}
          >
            <div
              style={{
                fontFamily: poppins,
                fontSize: 46,
                fontWeight: 600,
                color: palette.slate,
                lineHeight: 1,
              }}
            >
              0–4
            </div>
            <div
              style={{
                fontFamily: poppins,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.17em",
                color: palette.slate,
                marginTop: 8,
                textTransform: "uppercase" as const,
                opacity: 0.65,
              }}
            >
              Calendar only
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 2: Tier 8–10 (78 → 480) ──────────────────────────────────────────

function Scene2() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 78, 98, 460, 480);

  const badgeOp = fi(frame, 88, 112);
  const badgeScale = interpolate(frame, [88, 112], [0.84, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: spring,
  });
  const headlineOp = fi(frame, 102, 128);
  const headlineY = interpolate(frame, [102, 128], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const consistOp = fi(frame, 263, 288);
  const consistY = interpolate(frame, [263, 288], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const earlyOp = fi(frame, 375, 400);
  const earlyY = interpolate(frame, [375, 400], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ opacity: op }}>
      {/* Score badge */}
      <div
        style={{
          position: "absolute",
          top: 106,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: badgeOp,
          transform: `scale(${badgeScale})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "8px 30px",
            background: palette.goldFaint,
            border: `1px solid rgba(201,164,92,0.38)`,
            borderRadius: 40,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: palette.gold,
              textTransform: "uppercase" as const,
            }}
          >
            Score
          </span>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 28,
              fontWeight: 700,
              color: palette.gold,
              lineHeight: 1,
            }}
          >
            8 – 10
          </span>
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 192,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: headlineOp,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.02em",
          }}
        >
          You have the{" "}
          <span style={{ color: palette.gold, fontWeight: 500 }}>
            main pieces
          </span>{" "}
          in place
        </div>
      </div>

      {/* 4 metric cards — all lit */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-42%)",
          display: "flex",
          justifyContent: "center",
          gap: 22,
        }}
      >
        <MetricCard
          icon={<OccupancyIcon color={palette.gold} />}
          label="Occupancy"
          value="87%"
          state="lit"
          frame={frame}
          inFrame={148}
        />
        <MetricCard
          icon={<PaceIcon color={palette.gold} />}
          label="Pickup / Pace"
          value="+14%"
          state="lit"
          frame={frame}
          inFrame={166}
        />
        <MetricCard
          icon={<EventsIcon color={palette.gold} />}
          label="Events"
          value="3 ahead"
          state="lit"
          frame={frame}
          inFrame={184}
        />
        <MetricCard
          icon={<CompSetIcon color={palette.gold} />}
          label="Comp Set"
          value="14 comps"
          state="lit"
          frame={frame}
          inFrame={202}
        />
      </div>

      {/* "Are you doing it consistently?" */}
      <div
        style={{
          position: "absolute",
          bottom: 208,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: consistOp,
          transform: `translateY(${consistY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 300,
            color: palette.creamSoft,
            letterSpacing: "0.03em",
          }}
        >
          Now ask yourself: are you doing it{" "}
          <span style={{ color: palette.gold }}>consistently</span>?
        </div>
      </div>

      {/* "Seeing information early enough?" */}
      <div
        style={{
          position: "absolute",
          bottom: 152,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: earlyOp,
          transform: `translateY(${earlyY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 300,
            color: palette.slate,
            letterSpacing: "0.03em",
          }}
        >
          Are you seeing the information{" "}
          <span style={{ color: palette.gold }}>early enough to act</span>?
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 3: Tier 5–7 Dashboard (468 → 970) ─────────────────────────────────

function Scene3() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 468, 490, 950, 970);

  const badgeOp = fi(frame, 511, 534);
  const badgeScale = interpolate(frame, [511, 534], [0.84, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: spring,
  });
  const headlineOp = fi(frame, 524, 548);
  const headlineY = interpolate(frame, [524, 548], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  const occTextOp = fi(frame, 684, 708);
  const occTextY = interpolate(frame, [684, 708], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const evTextOp = fi(frame, 769, 793);
  const evTextY = interpolate(frame, [769, 793], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const validTextOp = fi(frame, 860, 884);
  const validTextY = interpolate(frame, [860, 884], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ opacity: op }}>
      {/* Score badge */}
      <div
        style={{
          position: "absolute",
          top: 106,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: badgeOp,
          transform: `scale(${badgeScale})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "8px 30px",
            background: "rgba(212,149,106,0.09)",
            border: `1px solid rgba(212,149,106,0.35)`,
            borderRadius: 40,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: palette.amber,
              textTransform: "uppercase" as const,
            }}
          >
            Score
          </span>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 28,
              fontWeight: 700,
              color: palette.amber,
              lineHeight: 1,
            }}
          >
            5 – 7
          </span>
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 192,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: headlineOp,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.02em",
          }}
        >
          You have{" "}
          <span style={{ color: palette.amber, fontWeight: 500 }}>
            some visibility
          </span>{" "}
          but also{" "}
          <span style={{ color: palette.slate, fontWeight: 400 }}>
            some gaps
          </span>
        </div>
      </div>

      {/* 4 metric cards — mixed states */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-42%)",
          display: "flex",
          justifyContent: "center",
          gap: 22,
        }}
      >
        {/* Occupancy: lit */}
        <MetricCard
          icon={<OccupancyIcon color={palette.gold} />}
          label="Occupancy"
          value="87%"
          state="lit"
          frame={frame}
          inFrame={560}
        />
        {/* Pickup/Pace: gap */}
        <MetricCard
          icon={<PaceIcon color={palette.slate} />}
          label="Pickup / Pace"
          value=""
          state="gap"
          frame={frame}
          inFrame={578}
        />
        {/* Events: partial — you know about them but can't validate */}
        <MetricCard
          icon={<EventsIcon color={palette.amber} />}
          label="Events"
          value=""
          state="partial"
          frame={frame}
          inFrame={596}
        />
        {/* Comp Set: partial — you have one but not validated */}
        <MetricCard
          icon={<CompSetIcon color={palette.amber} />}
          label="Comp Set"
          value=""
          state="partial"
          frame={frame}
          inFrame={614}
        />
      </div>

      {/* Sub-texts appear at each cue */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: occTextOp,
          transform: `translateY(${occTextY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 300,
            color: palette.creamSoft,
            letterSpacing: "0.03em",
          }}
        >
          Maybe you know the{" "}
          <span style={{ color: palette.gold }}>occupancy</span> — but not the{" "}
          <span style={{ color: palette.slate }}>pickup</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 174,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: evTextOp,
          transform: `translateY(${evTextY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 300,
            color: palette.creamSoft,
            letterSpacing: "0.03em",
          }}
        >
          Maybe you know about{" "}
          <span style={{ color: palette.amber }}>events</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 118,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: validTextOp,
          transform: `translateY(${validTextY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 300,
            color: palette.slate,
            letterSpacing: "0.03em",
          }}
        >
          But you don't know how to{" "}
          <span style={{ color: palette.cream }}>validate their impact</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 4: Comp Set Gap (948 → 1182) ──────────────────────────────────────

const COMP_POSITIONS = [
  { x: -300, y: -40, scale: 0.75 },
  { x: -168, y: -88, scale: 0.80 },
  { x: -30, y: -100, scale: 0.75 },
  { x: 110, y: -82, scale: 0.80 },
  { x: 260, y: -44, scale: 0.75 },
  { x: -230, y: 52, scale: 0.72 },
  { x: -80, y: 38, scale: 0.78 },
  { x: 60, y: 46, scale: 0.72 },
  { x: 200, y: 56, scale: 0.78 },
];

function Scene4() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 948, 968, 1162, 1182);

  const housesOp = fi(frame, 960, 990);
  const compOp = fi(frame, 973, 998);
  const compY = interpolate(frame, [973, 998], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const questionOp = fi(frame, 1074, 1099);
  const questionY = interpolate(frame, [1074, 1099], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

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
      {/* Cluster of comp houses with question marks */}
      <div
        style={{
          position: "relative",
          width: 720,
          height: 280,
          marginBottom: 36,
        }}
      >
        {COMP_POSITIONS.map((pos, i) => {
          const hOp = fi(frame, 958 + i * 5, 978 + i * 5) * housesOp;
          const isCenterish = i === 2;
          const iconColor = isCenterish ? palette.gold : palette.slate;
          const iconSize = Math.round(52 * pos.scale);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                opacity: hOp,
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: 4,
              }}
            >
              <CompSetIcon color={iconColor} size={iconSize} />
              {!isCenterish && (
                <div
                  style={{
                    fontFamily: poppins,
                    fontSize: 13,
                    fontWeight: 600,
                    color: palette.slate,
                    opacity: 0.45,
                    lineHeight: 1,
                  }}
                >
                  ?
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* "Maybe you have a comp set" */}
      <div
        style={{
          opacity: compOp,
          transform: `translateY(${compY}px)`,
          textAlign: "center" as const,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.24em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 16,
          }}
        >
          Maybe
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 50,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.02em",
            lineHeight: 1.3,
          }}
        >
          You have a{" "}
          <span style={{ color: palette.gold, fontWeight: 500 }}>
            comp set
          </span>
        </div>
      </div>

      {/* "But don't know if those are truly your competitors" */}
      <div
        style={{
          opacity: questionOp,
          transform: `translateY(${questionY}px)`,
          textAlign: "center" as const,
          marginTop: 22,
          maxWidth: 860,
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 30,
            fontWeight: 300,
            color: palette.slate,
            letterSpacing: "0.03em",
            lineHeight: 1.5,
          }}
        >
          But you don't know if those properties are
          <br />
          <span style={{ color: palette.cream }}>
            truly your competitors
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 5: Tier 0–4 Calendar (1165 → 1420) ────────────────────────────────

const BOOKED_CELLS = new Set([2, 3, 8, 9, 10, 15, 16, 22, 23, 24, 29, 30]);
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function CalendarGrid({ frame, inFrame }: { frame: number; inFrame: number }) {
  const gridOp = fi(frame, inFrame, inFrame + 28);
  return (
    <div style={{ opacity: gridOp }}>
      {/* Day headers */}
      <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
        {DAY_LABELS.map((d, i) => (
          <div
            key={i}
            style={{
              width: 58,
              textAlign: "center" as const,
              fontFamily: poppins,
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: palette.slate,
              textTransform: "uppercase" as const,
              opacity: 0.45,
            }}
          >
            {d}
          </div>
        ))}
      </div>
      {/* 5 rows */}
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} style={{ display: "flex", gap: 5, marginBottom: 5 }}>
          {Array.from({ length: 7 }).map((_, col) => {
            const idx = row * 7 + col;
            const day = idx + 1;
            const isBooked = BOOKED_CELLS.has(idx);
            const cellDelay = inFrame + idx * 2;
            const cellOp = fi(frame, cellDelay, cellDelay + 16);
            return (
              <div
                key={col}
                style={{
                  width: 58,
                  height: 44,
                  borderRadius: 5,
                  background: isBooked
                    ? "rgba(201,164,92,0.13)"
                    : "rgba(140,147,160,0.055)",
                  border: `1px solid ${
                    isBooked
                      ? "rgba(201,164,92,0.28)"
                      : "rgba(140,147,160,0.09)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: cellOp,
                }}
              >
                {day <= 30 && (
                  <span
                    style={{
                      fontFamily: poppins,
                      fontSize: 14,
                      fontWeight: isBooked ? 600 : 300,
                      color: isBooked ? palette.gold : palette.slate,
                      opacity: isBooked ? 0.88 : 0.38,
                    }}
                  >
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Scene5() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 1165, 1188, 1400, 1422);

  const badgeOp = fi(frame, 1187, 1212);
  const badgeScale = interpolate(frame, [1187, 1212], [0.84, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: spring,
  });
  const headlineOp = fi(frame, 1200, 1228);
  const headlineY = interpolate(frame, [1200, 1228], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const subOp = fi(frame, 1316, 1342);
  const subY = interpolate(frame, [1316, 1342], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ opacity: op }}>
      {/* Score badge */}
      <div
        style={{
          position: "absolute",
          top: 106,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: badgeOp,
          transform: `scale(${badgeScale})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "8px 30px",
            background: "rgba(140,147,160,0.07)",
            border: `1px solid rgba(140,147,160,0.25)`,
            borderRadius: 40,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: palette.slate,
              textTransform: "uppercase" as const,
            }}
          >
            Score
          </span>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 28,
              fontWeight: 700,
              color: palette.slate,
              lineHeight: 1,
            }}
          >
            0 – 4
          </span>
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 192,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: headlineOp,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 44,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.02em",
          }}
        >
          Many decisions based{" "}
          <span style={{ color: palette.slate, fontWeight: 400 }}>
            only on your calendar
          </span>
        </div>
      </div>

      {/* Calendar — centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -42%)",
        }}
      >
        <CalendarGrid frame={frame} inFrame={1218} />
      </div>

      {/* Sub: "just bookings, no context" */}
      <div
        style={{
          position: "absolute",
          bottom: 190,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: subOp,
          transform: `translateY(${subY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 300,
            color: palette.slate,
            letterSpacing: "0.03em",
          }}
        >
          No pickup data. No events. No validated comp set.{" "}
          <span style={{ color: palette.creamSoft }}>Just bookings.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 6: "After It Already Happened" (1388 → 1500) ──────────────────────

function Scene6() {
  const frame = useCurrentFrame();
  const op = fi(frame, 1388, 1412);

  const line1Op = fi(frame, 1389, 1414);
  const line1Y = interpolate(frame, [1389, 1414], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  const BAR_W = 800;
  const BAR_X = (1920 - BAR_W) / 2;
  const BAR_Y = 570;

  const timelineOp = fi(frame, 1410, 1435);
  const markerProg = clamp01(
    interpolate(frame, [1420, 1468], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    })
  );

  const line2Op = fi(frame, 1446, 1472);
  const line2Y = interpolate(frame, [1446, 1472], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

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
      {/* "That means you're seeing the result" */}
      <div
        style={{
          position: "absolute",
          top: 196,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: line1Op,
          transform: `translateY(${line1Y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.24em",
            color: palette.slate,
            textTransform: "uppercase" as const,
            marginBottom: 14,
          }}
        >
          That means you're seeing
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 54,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.02em",
            lineHeight: 1.3,
          }}
        >
          the{" "}
          <span style={{ color: palette.gold, fontWeight: 500 }}>result</span>
        </div>
      </div>

      {/* Timeline SVG */}
      <svg
        width={1920}
        height={200}
        style={{
          position: "absolute",
          top: BAR_Y - 80,
          left: 0,
          opacity: timelineOp,
        }}
      >
        {/* Track */}
        <rect
          x={BAR_X}
          y={100}
          width={BAR_W}
          height={2}
          rx={1}
          fill="rgba(140,147,160,0.20)"
        />
        {/* Gold progress fill */}
        <rect
          x={BAR_X}
          y={100}
          width={BAR_W * markerProg}
          height={2}
          rx={1}
          fill={palette.gold}
          opacity={0.65}
        />
        {/* "Set Price" node */}
        <circle
          cx={BAR_X}
          cy={100}
          r={5.5}
          fill="rgba(140,147,160,0.40)"
        />
        <text
          x={BAR_X}
          y={86}
          fill={palette.slate}
          fontFamily="Poppins, sans-serif"
          fontSize={10}
          fontWeight={600}
          letterSpacing={1.5}
          textAnchor="middle"
          opacity={0.65}
        >
          SET PRICE
        </text>
        <text
          x={BAR_X}
          y={124}
          fill={palette.slate}
          fontFamily="Poppins, sans-serif"
          fontSize={9}
          letterSpacing={1.5}
          textAnchor="middle"
          opacity={0.38}
        >
          DECISION
        </text>
        {/* "Guest Books" mid node */}
        <circle
          cx={BAR_X + BAR_W * 0.52}
          cy={100}
          r={5}
          fill="rgba(140,147,160,0.30)"
        />
        <text
          x={BAR_X + BAR_W * 0.52}
          y={124}
          fill={palette.slate}
          fontFamily="Poppins, sans-serif"
          fontSize={9}
          letterSpacing={1.5}
          textAnchor="middle"
          opacity={0.38}
        >
          BOOKING
        </text>
        {/* "Result" end node — gold, animated */}
        <circle
          cx={BAR_X + BAR_W}
          cy={100}
          r={7}
          fill={palette.gold}
          opacity={markerProg}
        />
        <text
          x={BAR_X + BAR_W}
          y={84}
          fill={palette.gold}
          fontFamily="Poppins, sans-serif"
          fontSize={11}
          fontWeight={700}
          letterSpacing={1.5}
          textAnchor="middle"
          opacity={markerProg}
        >
          RESULT
        </text>
        {/* "You see it here" label */}
        <text
          x={BAR_X + BAR_W}
          y={124}
          fill={palette.slate}
          fontFamily="Poppins, sans-serif"
          fontSize={9}
          letterSpacing={1.5}
          textAnchor="middle"
          opacity={markerProg * 0.60}
        >
          ← YOU FIND OUT HERE
        </text>
      </svg>

      {/* "After it already happened" */}
      <div
        style={{
          position: "absolute",
          bottom: 188,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: line2Op,
          transform: `translateY(${line2Y}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 40,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.02em",
            lineHeight: 1.4,
          }}
        >
          <span style={{ color: palette.slate }}>after</span> it{" "}
          <span style={{ color: palette.slate }}>already happened</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Main composition ─────────────────────────────────────────────────────────

export const ScoreCardScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{ background: "#0B0C0E", fontFamily: poppins, overflow: "hidden" }}
    >
      {/* Radial vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 28%, rgba(0,0,0,0.52) 100%)",
          pointerEvents: "none",
        }}
      />

      <Scene1 />
      <Scene2 />
      <Scene3 />
      <Scene4 />
      <Scene5 />
      <Scene6 />
    </AbsoluteFill>
  );
};
