import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const WIDTH = 400;
export const HEIGHT = 560;
export const DURATION_IN_FRAMES = 180;

// Frame map:
//  0-8    fade in
//  5-68   path draws bottom→top
//  5-20   node 1 pops (bottom-left)
//  35-50  node 2 pops (centre)
//  65-80  node 3 pops (top-right)
// 68-90   completion glow burst
// 90-180  idle: soft pulse + travelling spark loop (~90 frames/cycle)

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const spring = Easing.bezier(0.34, 1.56, 0.64, 1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function fi(frame: number, from: number, to: number, easing = easeOut) {
  return clamp01(
    interpolate(frame, [from, to], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing,
    })
  );
}

const GOLD_BRIGHT = "#FFD780";
const GOLD = "#C9A45C";
const AMBER = "#E8851A";

// S-curve: bottom-left → centre → top-right
const PATH = "M 55,255 C 165,260 165,155 100,148 C 38,142 38,45 155,38";
const PATH_LEN = 560; // safe overestimate for dasharray

const NODES = [
  { x: 55, y: 255, popFrame: 5 },
  { x: 100, y: 148, popFrame: 36 },
  { x: 155, y: 38, popFrame: 65 },
];

export const StepByStepScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Draw ─────────────────────────────────────────────────────────────────
  const drawProg = fi(frame, 5, 68);
  const dashOffset = PATH_LEN * (1 - drawProg);

  // ── Completion flash ─────────────────────────────────────────────────────
  const flash = fi(frame, 68, 82) * (1 - fi(frame, 78, 94));

  // ── Idle pulse ───────────────────────────────────────────────────────────
  const idleIn = fi(frame, 88, 110);
  const pulse = idleIn * (0.5 + 0.5 * Math.sin((frame - 90) * 0.10));

  // ── Travelling spark ─────────────────────────────────────────────────────
  const sparkProgress = idleIn > 0 ? ((frame - 90) % 90) / 90 : 0;
  const sparkOffset = PATH_LEN * (1 - sparkProgress);

  // ── Glow amounts ─────────────────────────────────────────────────────────
  const pathBlur = 5 + flash * 10 + pulse * 3.5;
  const nodeBlur = 3 + flash * 8 + pulse * 2.5;

  // ── Fade in ──────────────────────────────────────────────────────────────
  const fadeIn = fi(frame, 0, 10);

  return (
    <AbsoluteFill
      style={{
        background: "#00FF00",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={310}
        height={430}
        viewBox="0 0 210 294"
        fill="none"
        style={{ opacity: fadeIn }}
      >
        <defs>
          {/* Path glow filter */}
          <filter id="pg" x="-80%" y="-30%" width="260%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={pathBlur} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Node glow filter */}
          <filter id="ng" x="-160%" y="-160%" width="420%" height="420%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={nodeBlur} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Spark glow filter */}
          <filter id="sg" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={6 + pulse * 2} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Node radial gradient */}
          <radialGradient id="ng-fill" cx="36%" cy="30%" r="65%">
            <stop offset="0%" stopColor={GOLD_BRIGHT} />
            <stop offset="55%" stopColor={GOLD} />
            <stop offset="100%" stopColor={AMBER} />
          </radialGradient>
        </defs>

        {/* ── Path layers ──────────────────────────────────────────────── */}

        {/* Wide outer glow */}
        <path
          d={PATH}
          stroke={AMBER}
          strokeWidth={18}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={dashOffset}
          opacity={0.22 + flash * 0.20 + pulse * 0.10}
          filter="url(#pg)"
        />

        {/* Mid glow */}
        <path
          d={PATH}
          stroke={GOLD}
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={dashOffset}
          opacity={0.60 + flash * 0.25 + pulse * 0.12}
          filter="url(#pg)"
        />

        {/* Core bright line */}
        <path
          d={PATH}
          stroke={GOLD_BRIGHT}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={PATH_LEN}
          strokeDashoffset={dashOffset}
          opacity={0.95}
        />

        {/* ── Travelling spark (idle phase) ────────────────────────── */}
        <path
          d={PATH}
          stroke={GOLD_BRIGHT}
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`14 ${PATH_LEN - 14}`}
          strokeDashoffset={sparkOffset}
          opacity={idleIn * 0.9}
          filter="url(#sg)"
        />
        {/* Spark bright core */}
        <path
          d={PATH}
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`6 ${PATH_LEN - 6}`}
          strokeDashoffset={sparkOffset + 4}
          opacity={idleIn * 0.7}
        />

        {/* ── Nodes ───────────────────────────────────────────────── */}
        {NODES.map((node, i) => {
          const t = fi(frame, node.popFrame, node.popFrame + 15, spring);
          const ringPulse = t > 0.8
            ? 0.5 + 0.5 * Math.sin((frame - node.popFrame - 15) * 0.10 + i * 2.1)
            : 0;

          return (
            <g key={i} transform={`translate(${node.x}, ${node.y})`}>
              {/* Outer pulse ring */}
              <circle
                r={17 + ringPulse * 5 + flash * 6}
                fill="none"
                stroke={AMBER}
                strokeWidth={1.5}
                opacity={(0.18 + ringPulse * 0.14 + flash * 0.20) * t}
              />
              {/* Mid ring */}
              <circle
                r={13 + ringPulse * 2 + flash * 3}
                fill="none"
                stroke={GOLD}
                strokeWidth={1}
                opacity={(0.25 + flash * 0.25) * t}
              />

              {/* Glowing body */}
              <g transform={`scale(${t})`} filter="url(#ng)">
                {/* Outer amber halo */}
                <circle r={11} fill={AMBER} opacity={0.55 + flash * 0.2} />
                {/* Main fill */}
                <circle r={9} fill="url(#ng-fill)" />
              </g>

              {/* Specular highlight (no filter — stays crisp) */}
              <g transform={`scale(${t})`}>
                <ellipse cx={-3.5} cy={-3.5} rx={3.5} ry={2.2} fill="rgba(255,255,255,0.55)" />
              </g>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
