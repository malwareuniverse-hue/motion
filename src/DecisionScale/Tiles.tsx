import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { springIn } from "./utils";
import { scalePanCenter } from "./ScaleRig";
import { TILES, TILE_GAP, TILE_H, TILE_W } from "./timeline";

export const Tiles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pan = scalePanCenter(frame);

  return (
    <>
      {TILES.map((spec) => {
        const inT = springIn(frame, spec.inStart, fps, { damping: 16, stiffness: 200, mass: 0.6 });
        if (inT <= 0) return null;

        const stackY = pan.y - 30 - TILE_H / 2 - spec.index * (TILE_H + TILE_GAP);
        const translateY = (1 - inT) * -22;
        const scale = 0.88 + inT * 0.12;

        return (
          <div
            key={spec.index}
            style={{
              position: "absolute",
              left: pan.x,
              top: stackY,
              transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`,
              opacity: inT,
              width: TILE_W,
              height: TILE_H,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                background: palette.panel,
                border: `1px solid ${palette.panelBorder}`,
                borderTop: `2px solid ${palette.amber}`,
                boxShadow: "0 14px 26px -18px rgba(0,0,0,0.55)",
              }}
            />
          </div>
        );
      })}
    </>
  );
};
