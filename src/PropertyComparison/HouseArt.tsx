import React from "react";
import { interpolate, interpolateColors } from "remotion";

type Tier = "a" | "b";

type Props = {
  tier: Tier;
  quality: number; // 0 = neutral / identical, 1 = fully revealed
  uid: string; // unique id suffix so gradients don't collide across two instances
};

const NEUTRAL_TRIM = "#9AA3AF";
const NEUTRAL_HORIZON = "#7B828E";

export const HouseArt: React.FC<Props> = ({ tier, quality, uid }) => {
  const isPremium = tier === "b";

  const trimColor = interpolateColors(
    quality,
    [0, 1],
    [NEUTRAL_TRIM, isPremium ? "#E9CD8C" : "#6B7280"],
  );
  const horizonColor = interpolateColors(
    quality,
    [0, 1],
    [NEUTRAL_HORIZON, isPremium ? "#F3D9A8" : "#6B7280"],
  );
  const skyTop = interpolateColors(
    quality,
    [0, 1],
    ["#5B6472", isPremium ? "#E8A672" : "#4A515C"],
  );
  const skyBottom = interpolateColors(
    quality,
    [0, 1],
    ["#333C4C", isPremium ? "#2B3A5C" : "#262E38"],
  );
  const oceanColor = interpolateColors(
    quality,
    [0, 1],
    ["#25414A", isPremium ? "#2E6E76" : "#26343A"],
  );
  const poolColor = interpolateColors(
    quality,
    [0, 1],
    ["#2E6E76", isPremium ? "#4FC7C2" : "#3C6367"],
  );
  const waveOpacity = interpolate(quality, [0, 1], [0.34, isPremium ? 0.5 : 0.22]);
  const trimStrokeOpacity = interpolate(quality, [0, 1], [0.6, isPremium ? 0.6 : 0.5]);

  const glowOpacity = isPremium ? quality : 0;
  const flatOverlayOpacity = isPremium ? 0 : quality * 0.35;
  const fenceOpacity = isPremium ? 0 : quality;

  const skyId = `sky-${uid}`;
  const poolId = `pool-${uid}`;
  const vignetteId = `vig-${uid}`;

  return (
    <svg
      viewBox="0 0 400 300"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBottom} />
        </linearGradient>
        <linearGradient id={poolId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={poolColor} stopOpacity={0.9} />
          <stop offset="100%" stopColor={oceanColor} stopOpacity={0.9} />
        </linearGradient>
        <radialGradient id={vignetteId} cx="50%" cy="35%" r="75%">
          <stop offset="60%" stopColor="#000000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.35} />
        </radialGradient>
      </defs>

      {/* sky + ground */}
      <rect x={0} y={0} width={400} height={210} fill={`url(#${skyId})`} />
      <rect x={0} y={190} width={400} height={110} fill="#171D24" />
      {/* horizon */}
      <line x1={0} y1={190} x2={400} y2={190} stroke={horizonColor} strokeOpacity={0.5} strokeWidth={1} />

      {/* ocean glints (premium only) */}
      <g opacity={glowOpacity}>
        <circle cx={70} cy={182} r={1.4} fill="#FFE9BE" />
        <circle cx={110} cy={178} r={1} fill="#FFE9BE" />
        <circle cx={40} cy={186} r={0.8} fill="#FFE9BE" />
        <circle cx={330} cy={180} r={1.2} fill="#FFE9BE" />
      </g>

      {/* palm silhouette */}
      <g stroke={trimColor} strokeOpacity={0.8} strokeWidth={2} fill="none" strokeLinecap="round">
        <path d="M356 296 C 352 250, 348 220, 346 196" />
        <path d="M346 200 C 330 190, 316 188, 302 196" />
        <path d="M346 198 C 334 182, 328 172, 320 160" />
        <path d="M346 196 C 350 178, 352 166, 350 150" />
        <path d="M346 198 C 358 184, 366 176, 378 170" />
        <path d="M346 200 C 362 198, 372 200, 384 208" />
      </g>

      {/* house volume */}
      <g>
        {/* roof */}
        <rect x={78} y={104} width={216} height={7} rx={1.5} fill={trimColor} opacity={0.92} />
        {/* body */}
        <rect x={92} y={111} width={188} height={80} fill="#12161C" stroke={trimColor} strokeOpacity={trimStrokeOpacity} strokeWidth={1} />
        {/* window band */}
        <rect x={104} y={128} width={164} height={46} fill={isPremium ? interpolateColors(quality, [0, 1], ["#2B333B", "#3B4A55"]) : "#2B333B"} opacity={0.9} />
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={104 + (i * 164) / 7}
            y1={128}
            x2={104 + (i * 164) / 7}
            y2={174}
            stroke="#0E1116"
            strokeWidth={1.4}
          />
        ))}
        {/* warm interior glow, premium only */}
        <rect x={104} y={128} width={164} height={46} fill="#F3C77E" opacity={glowOpacity * 0.28} />
        {/* entry step */}
        <rect x={176} y={191} width={22} height={6} fill={trimColor} opacity={0.5} />
      </g>

      {/* deck / yard */}
      <rect x={50} y={197} width={300} height={4} fill={trimColor} opacity={0.35} />

      {/* limited-yard fence (property A reveal only) */}
      <g opacity={fenceOpacity} stroke="#6B7280" strokeWidth={1.4}>
        <line x1={40} y1={214} x2={40} y2={198} />
        <line x1={40} y1={198} x2={70} y2={198} />
        <line x1={70} y1={214} x2={70} y2={198} />
        <line x1={330} y1={214} x2={330} y2={198} />
        <line x1={330} y1={198} x2={360} y2={198} />
        <line x1={360} y1={214} x2={360} y2={198} />
      </g>

      {/* pool */}
      <rect x={62} y={218} width={276} height={52} rx={13} fill={`url(#${poolId})`} stroke={horizonColor} strokeOpacity={0.6} strokeWidth={1.2} />
      <g stroke="#F4EEDF" strokeOpacity={waveOpacity} strokeWidth={1}>
        <path d="M78 234 q10 5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" />
        <path d="M78 250 q10 5 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" />
      </g>
      {/* pool reflection sparkle, premium only */}
      <g opacity={glowOpacity}>
        <rect x={90} y={222} width={54} height={8} rx={4} fill="#FFFFFF" opacity={0.22} />
      </g>

      {/* flattening overlay to mute property A over time */}
      <rect x={0} y={0} width={400} height={300} fill="#10131A" opacity={flatOverlayOpacity} />

      <rect x={0} y={0} width={400} height={300} fill={`url(#${vignetteId})`} />
    </svg>
  );
};
