import React from "react";
import { palette } from "./theme";

type Props = {
  pride: number; // 0-1, warm glow intensity behind the island
  recede: number; // 0-1, desaturates + dims the scene once the owner's view fades
};

export const KitchenArt: React.FC<Props> = ({ pride, recede }) => {
  const ink = palette.ink;
  const fade = 1 - recede * 0.55;

  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <radialGradient id="kitchenGlow" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#F2C77E" stopOpacity={0.55 * pride} />
          <stop offset="100%" stopColor="#F2C77E" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="wallLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#F1ECDF" />
        </linearGradient>
        <linearGradient id="marbleTop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FAF8F3" />
          <stop offset="100%" stopColor="#EDE7D8" />
        </linearGradient>
      </defs>

      <rect x={0} y={0} width={400} height={300} fill="url(#wallLight)" opacity={fade} />

      {/* window */}
      <g opacity={0.9 * fade}>
        <rect x={40} y={30} width={90} height={70} rx={2} fill="#FFFFFF" stroke={ink} strokeOpacity={0.28} strokeWidth={1.2} />
        <line x1={85} y1={30} x2={85} y2={100} stroke={ink} strokeOpacity={0.22} strokeWidth={1} />
        <line x1={40} y1={65} x2={130} y2={65} stroke={ink} strokeOpacity={0.22} strokeWidth={1} />
      </g>

      {/* upper cabinets */}
      <g opacity={fade}>
        <rect x={150} y={36} width={210} height={54} rx={2} fill="#FFFFFF" stroke={ink} strokeOpacity={0.3} strokeWidth={1.2} />
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={150 + (i * 210) / 5}
            y1={36}
            x2={150 + (i * 210) / 5}
            y2={90}
            stroke={ink}
            strokeOpacity={0.16}
            strokeWidth={1}
          />
        ))}
      </g>

      {/* pendant lights */}
      <g opacity={fade}>
        {[190, 230, 270].map((cx, i) => (
          <g key={i}>
            <line x1={cx} y1={90} x2={cx} y2={132} stroke={ink} strokeOpacity={0.3} strokeWidth={1} />
            <circle cx={cx} cy={140} r={9} fill="#FFFFFF" stroke={ink} strokeOpacity={0.35} strokeWidth={1.2} />
            <circle cx={cx} cy={141} r={3} fill={palette.amber} opacity={0.55 + pride * 0.35} />
          </g>
        ))}
      </g>

      {/* warm glow of pride behind the island */}
      <rect x={0} y={120} width={400} height={180} fill="url(#kitchenGlow)" />

      {/* island */}
      <g opacity={fade}>
        <rect x={78} y={196} width={244} height={58} rx={6} fill="#1E2229" opacity={0.92} />
        {/* waterfall marble side */}
        <rect x={78} y={196} width={16} height={92} fill="url(#marbleTop)" stroke={ink} strokeOpacity={0.2} strokeWidth={1} />
        <path d="M80 210 q6 8 0 18 t2 20" stroke={palette.amberSoft} strokeOpacity={0.7} strokeWidth={1} fill="none" />
        {/* countertop */}
        <rect x={70} y={190} width={260} height={10} rx={3} fill="url(#marbleTop)" stroke={ink} strokeOpacity={0.25} strokeWidth={1} />
        <path
          d="M90 194 q30 6 60 -1 t60 2 t60 -2"
          stroke={palette.amberSoft}
          strokeOpacity={0.6}
          strokeWidth={0.9}
          fill="none"
        />
      </g>

      {/* bar stools */}
      <g opacity={0.85 * fade} stroke={ink} strokeOpacity={0.32} strokeWidth={1.3} fill="none">
        <path d="M150 288 L156 262 M172 288 L166 262 M150 262 h22" />
        <path d="M228 288 L234 262 M250 288 L244 262 M228 262 h22" />
      </g>

      {/* floor line */}
      <line x1={0} y1={288} x2={400} y2={288} stroke={ink} strokeOpacity={0.15 * fade} strokeWidth={1} />
    </svg>
  );
};
