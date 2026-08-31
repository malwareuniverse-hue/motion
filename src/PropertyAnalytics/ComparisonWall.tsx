import React from "react";
import { useCurrentFrame } from "remotion";
import { clampedInterp, easeInOutCubic } from "./utils";
import { CARD_GAP, GRID_COLS, GRID_H, GRID_W, HIGHLIGHT_INDEX, PROPERTIES, T, cardOrigin } from "./timeline";
import { PropertyTile } from "./PropertyTile";

export const ComparisonWall: React.FC = () => {
  const frame = useCurrentFrame();
  const origin = cardOrigin(HIGHLIGHT_INDEX);

  const zoomT = clampedInterp(frame, [T.zoomStart, T.zoomStart + T.zoomDur], [0, 1], easeInOutCubic);
  const zoomScale = 1 + zoomT * 2.4;

  const wallOpacity = clampedInterp(frame, [T.zoomStart + T.zoomDur * 0.6, T.zoomStart + T.zoomDur], [1, 0]);

  return (
    <div
      style={{
        width: GRID_W,
        height: GRID_H,
        position: "relative",
        opacity: wallOpacity,
        transform: `scale(${zoomScale})`,
        transformOrigin: `${origin.originXPct}% ${origin.originYPct}%`,
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gap: CARD_GAP,
      }}
    >
      {PROPERTIES.map((property, i) => {
        const entrance = clampedInterp(frame, [T.gridStart + i * T.gridStep, T.gridStart + i * T.gridStep + T.gridCardDur], [0, 1]);
        const isHighlighted = i === HIGHLIGHT_INDEX;
        const targetDim = isHighlighted ? 1 : 0.22;
        const dim = clampedInterp(frame, [T.highlightStart, T.highlightStart + T.highlightDur], [1, targetDim]);
        const glow = isHighlighted
          ? clampedInterp(frame, [T.highlightStart, T.highlightStart + T.highlightDur], [0, 1])
          : 0;
        return <PropertyTile key={property.address} property={property} index={i} entrance={entrance} dim={dim} glow={glow} />;
      })}
    </div>
  );
};
