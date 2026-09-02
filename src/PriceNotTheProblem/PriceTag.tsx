import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import { T, TAG_CENTER, TAG_H, TAG_REST_ROTATE, TAG_W } from "./timeline";

export const PriceTag: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = springIn(frame, T.tagStart, fps, { damping: 14, stiffness: 130, mass: 0.8 });
  const opacity = clampedInterp(frame, [T.tagStart, T.tagStart + 20], [0, 1]);
  if (opacity <= 0) return null;

  const rotate = -30 + enter * (30 + TAG_REST_ROTATE);
  const translateY = (1 - enter) * -60;
  const scale = 0.9 + enter * 0.1;

  const holeR = 9;
  const holeCx = TAG_W / 2;
  const holeCy = 34;

  return (
    <div
      style={{
        position: "absolute",
        left: TAG_CENTER.x,
        top: TAG_CENTER.y,
        width: TAG_W,
        height: TAG_H,
        opacity,
        transform: `translate(-50%, -50%) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: `${holeCx}px ${holeCy}px`,
      }}
    >
      <svg width={TAG_W} height={TAG_H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path
          d={`M ${holeCx - 34} ${holeCy - 14} Q ${holeCx} ${holeCy - 70} ${holeCx + 34} ${holeCy - 14}`}
          fill="none"
          stroke={palette.amber}
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.9}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 20,
          borderRadius: 16,
          background: palette.panel,
          border: `1.5px solid ${palette.amber}`,
          boxShadow: `0 26px 50px -22px rgba(0,0,0,0.6), 0 0 0 6px ${palette.amberBg}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: holeCx,
          top: holeCy,
          width: holeR * 2,
          height: holeR * 2,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: `2px solid ${palette.amber}`,
          background: palette.bg,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 110,
            fontWeight: 800,
            color: palette.amber,
          }}
        >
          $
        </span>
      </div>
    </div>
  );
};
