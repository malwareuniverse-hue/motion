import React from "react";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic } from "./utils";
import { T } from "./timeline";

export const PersonSilhouette: React.FC<{ frame: number }> = ({ frame }) => {
  const t = clampedInterp(frame, [T.personStart, T.personStart + T.personDur], [0, 1], easeOutCubic);
  if (t <= 0) return null;

  const rise = (1 - t) * 26;

  return (
    <svg
      viewBox="0 0 1080 1350"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, display: "block", opacity: t }}
    >
      <g transform={`translate(0 ${rise})`}>
        {/* torso / shoulders */}
        <path
          d="M300 1060 C300 930 340 800 470 780 C600 800 640 930 640 1060 L300 1060 Z"
          fill={palette.ink}
        />
        {/* rim light along shoulder edge */}
        <path
          d="M300 1060 C300 930 340 800 470 780"
          stroke={palette.gold}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
          opacity={0.45}
        />
        {/* head */}
        <ellipse cx={468} cy={706} rx={58} ry={68} fill={palette.ink} />
        <path d="M414 700 Q420 632 468 626 Q524 630 524 692" stroke={palette.gold} strokeWidth={2} fill="none" opacity={0.3} />
        {/* collar hint */}
        <path d="M430 782 L468 812 L508 782" stroke={palette.creamFaint} strokeWidth={3} fill="none" opacity={0.5} />
      </g>
    </svg>
  );
};
