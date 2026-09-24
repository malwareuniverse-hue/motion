import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { poppins } from "../MovingPicture/fonts";
import { palette } from "../MovingPicture/theme";

export const FPS = 30;
export const DURATION_IN_FRAMES = 1160;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Timecodes → frames  (HH:MM:SS:FF @ 30fps)
// 00:00:00:02 = 2   "premium five bedroom home"
// 00:00:03:01 = 91  "300 random properties"
// 00:00:06:26 = 206 "are those really your competitors"
// 00:00:09:13 = 283 "maybe not at 120 days out"
// 00:00:12:07 = 367 "real competition may be other..."
// 00:00:14:25 = 445 "five bedroom homes but 10 days out"
// 00:00:17:15 = 525 "guest may become more flexible"
// 00:00:20:11 = 611 "maybe they look at four bedroom homes"
// 00:00:23:05 = 695 "maybe they look at six bedroom homes"
// 00:00:26:12 = 792 "maybe a premium home drops..."
// 00:00:30:01 = 901 "your competitive field can change"
// 00:00:31:29 = 959 "as the booking window closes"
// 00:00:34:07 = 1027 "this does not mean changing your comps"
// 00:00:37:29 = 1139 "it means knowing what question..."

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

function sceneOp(
  frame: number,
  inFrom: number,
  inTo: number,
  outFrom: number,
  outTo: number
): number {
  return Math.min(fi(frame, inFrom, inTo), fo(frame, outFrom, outTo));
}

// ─── SVG: single house icon ──────────────────────────────────────────────────

function HouseIcon({
  size = 80,
  color = palette.gold,
  fillAlpha = 0,
}: {
  size?: number;
  color?: string;
  fillAlpha?: number;
}) {
  return (
    <svg width={size} height={size * 0.88} viewBox="0 0 100 88" fill="none">
      <polygon
        points="50,2 98,36 2,36"
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
        fill={`rgba(201,164,92,${fillAlpha})`}
      />
      <rect
        x="12"
        y="36"
        width="76"
        height="52"
        stroke={color}
        strokeWidth={2.5}
        fill={`rgba(201,164,92,${fillAlpha * 0.7})`}
      />
      <rect x="18" y="48" width="20" height="15" stroke={color} strokeWidth={1.5} opacity={0.7} />
      <line x1="28" y1="48" x2="28" y2="63" stroke={color} strokeWidth={0.8} opacity={0.5} />
      <line x1="18" y1="55.5" x2="38" y2="55.5" stroke={color} strokeWidth={0.8} opacity={0.5} />
      <rect x="62" y="48" width="20" height="15" stroke={color} strokeWidth={1.5} opacity={0.7} />
      <line x1="72" y1="48" x2="72" y2="63" stroke={color} strokeWidth={0.8} opacity={0.5} />
      <line x1="62" y1="55.5" x2="82" y2="55.5" stroke={color} strokeWidth={0.8} opacity={0.5} />
      <rect x="39" y="59" width="22" height="29" stroke={color} strokeWidth={1.5} opacity={0.85} />
    </svg>
  );
}

function TinyHouse({
  size = 18,
  color = palette.slate,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size * 0.88} viewBox="0 0 20 18" fill="none">
      <polygon
        points="10,1 19,7 1,7"
        stroke={color}
        strokeWidth={1.3}
        fill={`${color}22`}
      />
      <rect
        x="2"
        y="7"
        width="16"
        height="11"
        stroke={color}
        strokeWidth={1.3}
        fill={`${color}11`}
      />
      <rect x="7" y="11" width="6" height="7" stroke={color} strokeWidth={0.9} opacity={0.7} />
    </svg>
  );
}

// ─── Scatter positions (deterministic spiral) ────────────────────────────────

const SCATTER: Array<{ x: number; y: number; size: number; delay: number; isPremium: boolean }> =
  (() => {
    const pts: typeof SCATTER = [];
    const cx = 1080;
    const cy = 520;
    const goldenAngle = 2.399963;
    for (let i = 0; i < 48; i++) {
      const r = 130 + Math.sqrt(i) * 62;
      const a = i * goldenAngle;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r * 0.52;
      if (px > 480 && px < 1860 && py > 100 && py < 970) {
        pts.push({
          x: px,
          y: py,
          size: 14 + (i % 3) * 4,
          delay: i * 4,
          isPremium: false,
        });
      }
    }
    return pts;
  })();

// ─── Scene 1: Premium 5BR Home (0 → 91) ─────────────────────────────────────

function Scene1() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 0, 18, 76, 91);
  const houseScale = interpolate(frame, [0, 28], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const houseOp = fi(frame, 0, 22);
  const badgeOp = fi(frame, 20, 44);
  const textOp = fi(frame, 34, 58);
  const textY = interpolate(frame, [34, 58], [18, 0], {
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
        gap: 0,
      }}
    >
      <div
        style={{
          opacity: houseOp,
          transform: `scale(${houseScale})`,
          transformOrigin: "center bottom",
        }}
      >
        <HouseIcon size={210} color={palette.gold} fillAlpha={0.07} />
      </div>

      <div
        style={{
          opacity: badgeOp,
          marginTop: 22,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "8px 22px",
          background: palette.goldFaint,
          border: `1px solid rgba(201,164,92,0.28)`,
          borderRadius: 40,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.20em",
            color: palette.gold,
            textTransform: "uppercase" as const,
          }}
        >
          Premium · 5 Bedrooms
        </span>
      </div>

      <div
        style={{
          opacity: textOp,
          transform: `translateY(${textY}px)`,
          marginTop: 36,
          textAlign: "center" as const,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 38,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.03em",
            lineHeight: 1.4,
          }}
        >
          Let's say you own a{" "}
          <span style={{ color: palette.gold, fontWeight: 500 }}>
            premium five bedroom home
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 2: 300 Random Properties (88 → 206) ──────────────────────────────

function Scene2() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 88, 108, 190, 206);
  const houseX = interpolate(frame, [88, 118], [0, -320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const labelOp = fi(frame, 136, 158);
  const labelY = interpolate(frame, [136, 158], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill style={{ opacity: op }}>
      {/* Your premium property — shifts left */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${houseX}px), -58%)`,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 10,
        }}
      >
        <HouseIcon size={130} color={palette.gold} fillAlpha={0.06} />
        <span
          style={{
            fontFamily: poppins,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: palette.gold,
            textTransform: "uppercase" as const,
          }}
        >
          Your Property
        </span>
      </div>

      {/* Scatter houses */}
      {SCATTER.map((pos, i) => {
        const dotOp = fi(frame, 98 + pos.delay, 118 + pos.delay) * 0.7;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x - pos.size / 2,
              top: pos.y - (pos.size * 0.88) / 2,
              opacity: dotOp,
            }}
          >
            <TinyHouse size={pos.size} color={palette.slate} />
          </div>
        );
      })}

      {/* Count label */}
      <div
        style={{
          position: "absolute",
          bottom: 164,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: labelOp,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: palette.slate,
            textTransform: "uppercase" as const,
            marginBottom: 8,
          }}
        >
          Compared to
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 40,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.03em",
          }}
        >
          300{" "}
          <span style={{ color: palette.gold }}>random</span> properties nearby
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 3: Are Those Really Your Competitors? (200 → 283) ────────────────

function Scene3() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 200, 218, 265, 283);
  const textOp = fi(frame, 206, 228);
  const textY = interpolate(frame, [206, 228], [20, 0], {
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
      }}
    >
      {/* Ghost scatter in background */}
      {SCATTER.slice(0, 22).map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: pos.x - pos.size / 2,
            top: pos.y - (pos.size * 0.88) / 2,
            opacity: 0.09,
          }}
        >
          <TinyHouse size={pos.size} />
        </div>
      ))}

      <div
        style={{
          opacity: textOp,
          transform: `translateY(${textY}px)`,
          textAlign: "center" as const,
          maxWidth: 880,
          padding: "0 40px",
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.24em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 18,
          }}
        >
          The Question
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
          Are those really
          <br />
          <span style={{ color: palette.gold, fontWeight: 500 }}>
            your competitors?
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 4: Booking Window / 120→10 Days (275 → 525) ──────────────────────

function Scene4() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 275, 296, 508, 525);

  const BAR_W = 860;
  const BAR_X = (1920 - BAR_W) / 2;
  const BAR_Y = 470;

  // Marker moves from 120-days (0.10) toward 10-days (0.72) as booking window closes
  const markerProg = clamp01(
    interpolate(frame, [400, 495], [0.1, 0.72], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    })
  );
  const markerX = BAR_X + BAR_W * markerProg;

  // Competing houses: 5 premium at 120 days, widens to 14 at 10 days
  const compCount = Math.round(
    interpolate(frame, [400, 505], [5, 14], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Days counter
  const daysLabel = Math.round(
    interpolate(frame, [400, 495], [120, 10], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const barOp = fi(frame, 283, 308);
  const headlineOp = fi(frame, 290, 315);
  const headlineY = interpolate(frame, [290, 315], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const sub1Op = fi(frame, 345, 368);
  const flexOp = fi(frame, 475, 500);

  const housesStartX =
    (1920 - compCount * 54) / 2;

  return (
    <AbsoluteFill style={{ opacity: op }}>
      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 148,
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
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 10,
          }}
        >
          Maybe Not
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 44,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.03em",
          }}
        >
          at{" "}
          <span style={{ color: palette.gold, fontWeight: 500 }}>
            {daysLabel} days out
          </span>
        </div>
      </div>

      {/* SVG timeline bar */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Track */}
        <rect
          x={BAR_X}
          y={BAR_Y}
          width={BAR_W}
          height={3}
          rx={1.5}
          fill="rgba(140,147,160,0.22)"
          opacity={barOp}
        />
        {/* Gold fill to marker */}
        <rect
          x={BAR_X}
          y={BAR_Y}
          width={BAR_W * markerProg}
          height={3}
          rx={1.5}
          fill={palette.gold}
          opacity={barOp * 0.65}
        />
        {/* Far-out label */}
        <text
          x={BAR_X}
          y={BAR_Y - 18}
          fill={palette.slate}
          fontFamily="Poppins, sans-serif"
          fontSize={11}
          fontWeight={600}
          letterSpacing={2}
          textAnchor="start"
          opacity={barOp}
        >
          ← 120+ DAYS OUT
        </text>
        {/* Close label */}
        <text
          x={BAR_X + BAR_W}
          y={BAR_Y - 18}
          fill={palette.slate}
          fontFamily="Poppins, sans-serif"
          fontSize={11}
          fontWeight={600}
          letterSpacing={2}
          textAnchor="end"
          opacity={barOp}
        >
          BOOKING WINDOW CLOSES →
        </text>
        {/* 10-day tick */}
        <line
          x1={BAR_X + BAR_W * 0.72}
          y1={BAR_Y - 8}
          x2={BAR_X + BAR_W * 0.72}
          y2={BAR_Y + 8}
          stroke={palette.slate}
          strokeWidth={1}
          opacity={barOp * 0.45}
        />
        <text
          x={BAR_X + BAR_W * 0.72}
          y={BAR_Y + 22}
          fill={palette.slate}
          fontFamily="Poppins, sans-serif"
          fontSize={10}
          letterSpacing={1}
          textAnchor="middle"
          opacity={barOp * 0.45}
        >
          10 DAYS
        </text>
        {/* Marker dashed line */}
        <line
          x1={markerX}
          y1={BAR_Y - 78}
          x2={markerX}
          y2={BAR_Y + 78}
          stroke={palette.gold}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          opacity={barOp}
        />
        <circle cx={markerX} cy={BAR_Y} r={5.5} fill={palette.gold} opacity={barOp} />
        {/* Days bubble */}
        <rect
          x={markerX - 46}
          y={BAR_Y - 108}
          width={92}
          height={26}
          rx={4}
          fill={palette.goldFaint}
          stroke={palette.goldGlow}
          strokeWidth={1}
          opacity={barOp}
        />
        <text
          x={markerX}
          y={BAR_Y - 89}
          fill={palette.gold}
          fontFamily="Poppins, sans-serif"
          fontSize={12}
          fontWeight={600}
          letterSpacing={1}
          textAnchor="middle"
          opacity={barOp}
        >
          {daysLabel} DAYS
        </text>
      </svg>

      {/* Competing houses row */}
      <div
        style={{
          position: "absolute",
          top: BAR_Y + 52,
          left: housesStartX,
          display: "flex",
          gap: 10,
          transition: "left 0s",
        }}
      >
        {Array.from({ length: compCount }).map((_, i) => {
          const hOp = fi(frame, 310 + i * 10, 330 + i * 10);
          const isPremium = i < 5;
          return (
            <div key={i} style={{ opacity: hOp }}>
              <TinyHouse size={22} color={isPremium ? palette.gold : palette.slate} />
            </div>
          );
        })}
      </div>

      {/* Sub label */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: sub1Op,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 300,
            color: palette.creamSoft,
            letterSpacing: "0.04em",
          }}
        >
          Your real competition:{" "}
          <span style={{ color: palette.cream }}>
            other high-quality 5BR homes
          </span>
        </div>
      </div>

      {/* Flexibility hint */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: flexOp,
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
          But as the window closes…{" "}
          <span style={{ color: palette.gold }}>
            the guest may become more flexible
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 5: Guest Flexibility / 4BR + 6BR (515 → 760) ─────────────────────

function BedroomCard({
  beds,
  label,
  isYours,
  frame,
  inFrame,
}: {
  beds: number;
  label?: string;
  isYours?: boolean;
  frame: number;
  inFrame: number;
}) {
  const cardOp = fi(frame, inFrame, inFrame + 22);
  const cardY = interpolate(frame, [inFrame, inFrame + 22], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const color = isYours ? palette.gold : palette.slate;
  return (
    <div
      style={{
        opacity: cardOp,
        transform: `translateY(${cardY}px)`,
        width: 234,
        background: isYours ? "rgba(27,29,33,0.95)" : "rgba(20,22,26,0.78)",
        border: `1px solid ${isYours ? "rgba(201,164,92,0.38)" : "rgba(140,147,160,0.18)"}`,
        borderRadius: 6,
        padding: "28px 24px 24px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 10,
      }}
    >
      <HouseIcon size={58} color={color} fillAlpha={isYours ? 0.07 : 0} />
      <div
        style={{
          fontFamily: poppins,
          fontSize: 52,
          fontWeight: 600,
          color,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {beds}
      </div>
      <div
        style={{
          fontFamily: poppins,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.18em",
          color,
          textTransform: "uppercase" as const,
        }}
      >
        Bedrooms
      </div>
      {label && (
        <div
          style={{
            fontFamily: poppins,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.14em",
            color: isYours ? palette.gold : palette.slate,
            textTransform: "uppercase" as const,
            padding: "4px 10px",
            border: `1px solid ${isYours ? "rgba(201,164,92,0.30)" : "rgba(140,147,160,0.18)"}`,
            borderRadius: 20,
            marginTop: 4,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

function Scene5() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 515, 535, 740, 760);

  const headlineOp = fi(frame, 525, 548);
  const headlineY = interpolate(frame, [525, 548], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const subOp = fi(frame, 700, 722);

  return (
    <AbsoluteFill
      style={{
        opacity: op,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      <div
        style={{
          opacity: headlineOp,
          transform: `translateY(${headlineY}px)`,
          marginBottom: 48,
          textAlign: "center" as const,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 10,
          }}
        >
          Guest Flexibility
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 40,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.03em",
          }}
        >
          The{" "}
          <span style={{ color: palette.gold }}>competitive set expands</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 22, alignItems: "stretch" }}>
        {/* 4BR — appears at "maybe they look at four bedroom homes" (frame 611) */}
        <BedroomCard beds={4} frame={frame} inFrame={611} />
        {/* 5BR — your property, appears first */}
        <BedroomCard beds={5} label="Your Property" isYours frame={frame} inFrame={525} />
        {/* 6BR — appears at "maybe they look at six bedroom homes" (frame 695) */}
        <BedroomCard beds={6} frame={frame} inFrame={695} />
      </div>

      <div
        style={{
          marginTop: 44,
          opacity: subOp,
          textAlign: "center" as const,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 300,
            color: palette.creamSoft,
            letterSpacing: "0.03em",
          }}
        >
          Maybe{" "}
          <span style={{ color: palette.gold }}>four</span> — or{" "}
          <span style={{ color: palette.gold }}>six</span> bedroom homes
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 6: Premium Home Drops in Range (748 → 901) ───────────────────────

function Scene6() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 748, 768, 882, 901);

  const arrowOp = fi(frame, 758, 778);
  const arrowY = interpolate(frame, [758, 782], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const houseOp = fi(frame, 790, 812);
  const textOp = fi(frame, 808, 832);
  const textY = interpolate(frame, [808, 832], [14, 0], {
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
        flexDirection: "column" as const,
        gap: 0,
      }}
    >
      {/* Down arrow */}
      <div
        style={{
          opacity: arrowOp,
          transform: `translateY(${arrowY}px)`,
          marginBottom: 10,
        }}
      >
        <svg width={36} height={58} viewBox="0 0 36 58" fill="none">
          <line
            x1="18"
            y1="0"
            x2="18"
            y2="46"
            stroke={palette.gold}
            strokeWidth={2}
          />
          <polygon points="18,58 6,40 30,40" fill={palette.gold} />
        </svg>
      </div>

      {/* Premium house */}
      <div
        style={{
          opacity: houseOp,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 14,
        }}
      >
        <HouseIcon size={110} color={palette.gold} fillAlpha={0.07} />
        <div
          style={{
            padding: "6px 18px",
            background: palette.goldFaint,
            border: `1px solid rgba(201,164,92,0.30)`,
            borderRadius: 24,
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: palette.gold,
              textTransform: "uppercase" as const,
            }}
          >
            Premium Property
          </span>
        </div>
      </div>

      {/* Text */}
      <div
        style={{
          marginTop: 40,
          opacity: textOp,
          transform: `translateY(${textY}px)`,
          textAlign: "center" as const,
          maxWidth: 720,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 38,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.03em",
            lineHeight: 1.4,
          }}
        >
          Maybe a premium home
          <br />
          <span style={{ color: palette.gold }}>
            drops into their price range
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 7: Competitive Field Changes (888 → 1027) ────────────────────────

function Scene7() {
  const frame = useCurrentFrame();
  const op = sceneOp(frame, 888, 908, 1010, 1027);

  const headlineOp = fi(frame, 901, 924);
  const headlineY = interpolate(frame, [901, 924], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const panelsOp = fi(frame, 920, 945);
  const sub2Op = fi(frame, 959, 980);

  return (
    <AbsoluteFill style={{ opacity: op }}>
      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 148,
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
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 10,
          }}
        >
          Key Insight
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 46,
            fontWeight: 300,
            color: palette.cream,
            letterSpacing: "0.03em",
          }}
        >
          Your competitive field can{" "}
          <span style={{ color: palette.gold }}>change</span>
        </div>
      </div>

      {/* Two comparison panels */}
      <div
        style={{
          position: "absolute",
          top: "54%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
          opacity: panelsOp,
        }}
      >
        {/* 120 days panel */}
        <div
          style={{
            width: 340,
            background: "rgba(27,29,33,0.88)",
            border: "1px solid rgba(140,147,160,0.18)",
            borderRadius: 6,
            padding: "24px 28px 28px",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: palette.slate,
              textTransform: "uppercase" as const,
            }}
          >
            120 Days Out
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap" as const,
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <TinyHouse key={i} size={24} color={palette.gold} />
            ))}
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 13,
              fontWeight: 300,
              color: palette.slate,
              letterSpacing: "0.05em",
              textAlign: "center" as const,
              lineHeight: 1.5,
            }}
          >
            Narrow field
            <br />
            5BR premium only
          </div>
        </div>

        {/* Arrow */}
        <svg width={42} height={18} viewBox="0 0 42 18" fill="none">
          <line x1="0" y1="9" x2="32" y2="9" stroke={palette.gold} strokeWidth={1.5} />
          <polygon points="42,9 28,3 28,15" fill={palette.gold} />
        </svg>

        {/* 10 days panel */}
        <div
          style={{
            width: 340,
            background: "rgba(27,29,33,0.88)",
            border: `1px solid rgba(201,164,92,0.28)`,
            borderRadius: 6,
            padding: "24px 28px 28px",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: palette.gold,
              textTransform: "uppercase" as const,
            }}
          >
            10 Days Out
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap" as const,
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <TinyHouse key={i} size={24} color={palette.gold} />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <TinyHouse key={i + 5} size={19} color={palette.slate} />
            ))}
          </div>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 13,
              fontWeight: 300,
              color: palette.creamSoft,
              letterSpacing: "0.05em",
              textAlign: "center" as const,
              lineHeight: 1.5,
            }}
          >
            Wider field
            <br />
            4BR, 5BR, 6BR in range
          </div>
        </div>
      </div>

      {/* Sub: "as the booking window closes" */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center" as const,
          opacity: sub2Op,
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
          as the{" "}
          <span style={{ color: palette.gold }}>booking window closes</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Scene 8: Conclusion (1015 → 1160) ──────────────────────────────────────

function Scene8() {
  const frame = useCurrentFrame();
  const op = fi(frame, 1015, 1038);

  const line1Op = fi(frame, 1027, 1050);
  const line1Y = interpolate(frame, [1027, 1050], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const line2Op = fi(frame, 1055, 1078);
  const line2Y = interpolate(frame, [1055, 1078], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  // Gold divider line
  const dividerOp = fi(frame, 1085, 1100);

  const line3Op = fi(frame, 1095, 1120);
  const line3Y = interpolate(frame, [1095, 1120], [14, 0], {
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
        flexDirection: "column" as const,
      }}
    >
      <div
        style={{
          maxWidth: 920,
          textAlign: "center" as const,
          padding: "0 60px",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 0,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: palette.gold,
            textTransform: "uppercase" as const,
            marginBottom: 24,
          }}
        >
          The Real Takeaway
        </div>

        {/* Strikethrough lines */}
        <div
          style={{
            opacity: line1Op,
            transform: `translateY(${line1Y}px)`,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 24,
              fontWeight: 300,
              color: palette.slate,
              letterSpacing: "0.03em",
              textDecoration: "line-through",
              textDecorationColor: "rgba(140,147,160,0.50)",
            }}
          >
            This does not mean changing your comps
          </div>
        </div>
        <div
          style={{
            opacity: line2Op,
            transform: `translateY(${line2Y}px)`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 24,
              fontWeight: 300,
              color: palette.slate,
              letterSpacing: "0.03em",
              textDecoration: "line-through",
              textDecorationColor: "rgba(140,147,160,0.50)",
            }}
          >
            until you get the answer you want
          </div>
        </div>

        {/* Gold divider */}
        <div
          style={{
            opacity: dividerOp,
            width: 280,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${palette.gold}, transparent)`,
            marginBottom: 32,
          }}
        />

        {/* Gold conclusion */}
        <div
          style={{
            opacity: line3Op,
            transform: `translateY(${line3Y}px)`,
          }}
        >
          <div
            style={{
              fontFamily: poppins,
              fontSize: 40,
              fontWeight: 400,
              color: palette.cream,
              letterSpacing: "0.02em",
              lineHeight: 1.4,
            }}
          >
            It means knowing what
            <br />
            <span style={{ color: palette.gold, fontWeight: 500 }}>
              question you're trying to answer
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ─── Main composition ────────────────────────────────────────────────────────

export const CompsWindowScene: React.FC = () => {
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
      <Scene7 />
      <Scene8 />
    </AbsoluteFill>
  );
};
