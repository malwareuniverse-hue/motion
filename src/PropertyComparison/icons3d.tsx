import React from "react";
import { useCurrentFrame } from "remotion";
import { clamp01 } from "./utils";

export type Icon3DKind =
  | "design"
  | "photo"
  | "view"
  | "pool"
  | "game"
  | "outdoor"
  | "review";

const THEME: Record<Icon3DKind, { light: string; dark: string; glyph: string }> = {
  design: { light: "#F0D9FA", dark: "#8C5FB0", glyph: "#3A2350" },
  photo: { light: "#CDE7FF", dark: "#3E7BC4", glyph: "#122744" },
  view: { light: "#FFE3B8", dark: "#E8875A", glyph: "#5A2C10" },
  pool: { light: "#CFF6EF", dark: "#2FA6A0", glyph: "#0E3B38" },
  game: { light: "#E4D8FF", dark: "#6C4BC4", glyph: "#2A1C55" },
  outdoor: { light: "#E5F6C9", dark: "#5FA13B", glyph: "#22380F" },
  review: { light: "#FCEBB8", dark: "#CBA352", glyph: "#4A3410" },
};

const Glyph: Record<Icon3DKind, (color: string) => React.ReactNode> = {
  design: (c) => (
    <path
      d="M12 3l4.2 4.2L12 21l-4.2-13.8L12 3z M7.8 7.2h8.4"
      stroke={c}
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
  ),
  photo: (c) => (
    <>
      <path
        d="M4 8.5C4 7.67 4.67 7 5.5 7h2l1-1.6h7L16.5 7h2c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13C4.67 18 4 17.33 4 16.5v-8z"
        stroke={c}
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx={12} cy={12.3} r={3.1} stroke={c} strokeWidth={1.5} fill="none" />
    </>
  ),
  view: (c) => (
    <>
      <circle cx={7.2} cy={7.5} r={2.1} stroke={c} strokeWidth={1.5} fill="none" />
      <path
        d="M3 18l5.5-6.5L12 15l3-3.5L21 18"
        stroke={c}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  pool: (c) => (
    <>
      <path
        d="M4 10c1.4 1.1 2.8 1.1 4.2 0s2.8-1.1 4.2 0 2.8 1.1 4.2 0 2.8-1.1 4.2 0"
        stroke={c}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 15c1.4 1.1 2.8 1.1 4.2 0s2.8-1.1 4.2 0 2.8 1.1 4.2 0 2.8-1.1 4.2 0"
        stroke={c}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  game: (c) => (
    <>
      <path
        d="M6.5 8.5h11a3 3 0 0 1 2.95 3.53l-.68 3.8a2.4 2.4 0 0 1-4.4 1L14 15.5h-4l-1.37 1.33a2.4 2.4 0 0 1-4.4-1l-.68-3.8A3 3 0 0 1 6.5 8.5z"
        stroke={c}
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M8.2 10.6v2.4M7 11.8h2.4" stroke={c} strokeWidth={1.3} strokeLinecap="round" />
      <circle cx={16} cy={11.2} r={0.75} fill={c} />
      <circle cx={17.6} cy={12.8} r={0.75} fill={c} />
    </>
  ),
  outdoor: (c) => (
    <>
      <path
        d="M4 10.5C4 7 7.6 4.5 12 4.5S20 7 20 10.5H4z"
        stroke={c}
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 10.5V20" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M12 20l-3-2.2" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
    </>
  ),
  review: (c) => (
    <path
      fill={c}
      d="M12 4.2l2.35 4.9 5.35.7-3.9 3.7 1 5.3L12 16.2l-4.8 2.6 1-5.3-3.9-3.7 5.35-.7z"
    />
  ),
};

type Props = {
  kind: Icon3DKind;
  size?: number;
  phase?: number;
  progress?: number;
};

export const Icon3D: React.FC<Props> = ({
  kind,
  size = 34,
  phase = 0,
  progress = 1,
}) => {
  const frame = useCurrentFrame();
  const theme = THEME[kind];
  const p = clamp01(progress);

  const bob = Math.sin((frame + phase) / 17) * 5 * p;
  const rotate = Math.sin((frame + phase) / 29) * 5 * p;
  const shadowScale = 1 - (bob / 5) * 0.22;
  const shadowOpacity = 0.32 - (bob / 5) * 0.14;

  const gradId = `i3d-grad-${kind}`;
  const shadowW = size * 0.72;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size + 8,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexShrink: 0,
        opacity: p,
        transform: `scale(${0.75 + 0.25 * p})`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        style={{
          position: "relative",
          transform: `translateY(${-bob}px) rotate(${rotate}deg)`,
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.45))",
        }}
      >
        <defs>
          <radialGradient id={gradId} cx="34%" cy="28%" r="80%">
            <stop offset="0%" stopColor={theme.light} />
            <stop offset="100%" stopColor={theme.dark} />
          </radialGradient>
        </defs>
        <circle cx={20} cy={20} r={19} fill={`url(#${gradId})`} />
        <circle
          cx={20}
          cy={20}
          r={18.5}
          fill="none"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth={1}
        />
        <ellipse
          cx={14.5}
          cy={12.5}
          rx={8}
          ry={5}
          fill="#FFFFFF"
          opacity={0.32}
        />
        <g transform="translate(8, 8)">{Glyph[kind](theme.glyph)}</g>
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: shadowW,
          height: shadowW * 0.28,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 75%)",
          opacity: Math.max(0, shadowOpacity) * p,
          transform: `scale(${shadowScale})`,
        }}
      />
    </div>
  );
};

export const ICON3D_KIND_BY_ITEM = (item: string): Icon3DKind => {
  const lower = item.toLowerCase();
  if (lower.includes("review") || lower.includes("star")) return "review";
  if (lower.includes("design")) return "design";
  if (lower.includes("photo")) return "photo";
  if (lower.includes("ocean") || lower.includes("beach") || lower.includes("view"))
    return "view";
  if (lower.includes("pool")) return "pool";
  if (lower.includes("game")) return "game";
  return "outdoor";
};
