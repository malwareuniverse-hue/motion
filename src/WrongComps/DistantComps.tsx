import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { DISTANT_COMPS, HOUSES, MAP_H, MAP_W, T } from "./timeline";
import { MapPinIcon } from "./icons";

const HOUSE_A = HOUSES[0];

export const DistantComps: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} width={MAP_W} height={MAP_H} style={{ position: "absolute", inset: 0 }}>
        {DISTANT_COMPS.map((comp, i) => {
          const start = T.compStart + i * T.compStep;
          const progress = clampedInterp(frame, [start, start + T.compDur], [0, 1]);
          const dx = comp.x - HOUSE_A.x;
          const dy = comp.y - HOUSE_A.y;
          const length = Math.sqrt(dx * dx + dy * dy);
          return (
            <line
              key={comp.address}
              x1={HOUSE_A.x}
              y1={HOUSE_A.y}
              x2={comp.x}
              y2={comp.y}
              stroke={palette.amberSoft}
              strokeWidth={1.6}
              strokeDasharray={`${length}`}
              strokeDashoffset={length * (1 - progress)}
              opacity={0.55}
            />
          );
        })}
      </svg>

      {DISTANT_COMPS.map((comp, i) => {
        const start = T.compStart + i * T.compStep + 8;
        const progress = clampedInterp(frame, [start, start + T.compDur], [0, 1]);
        const scale = 0.6 + progress * 0.4;
        const drop = (1 - progress) * -20;
        return (
          <div
            key={comp.address}
            style={{
              position: "absolute",
              left: comp.x,
              top: comp.y,
              opacity: progress,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translate(-50%, -100%) translateY(${drop}px) scale(${scale})`,
              }}
            >
              <MapPinIcon color={palette.amber} size={28} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 8,
                transform: "translate(-50%, 0)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: palette.amber,
                  background: `${palette.amber}1F`,
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                LUXURY
              </span>
              <span style={{ fontFamily: poppins, fontSize: 11.5, fontWeight: 600, color: palette.creamSoft }}>
                {comp.address}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};
