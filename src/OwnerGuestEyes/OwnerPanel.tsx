import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { OWNER_LABELS, T } from "./timeline";
import { fadeSlide, springIn, clampedInterp } from "./utils";
import { PanelHeader } from "./PanelHeader";
import { KitchenArt } from "./KitchenArt";
import { AnnotationChip } from "./AnnotationChip";

const CHIP_POSITIONS: Array<{ x: number; y: number; side: "left" | "right" }> = [
  { x: 24, y: 68, side: "left" },
  { x: 40, y: 18, side: "right" },
  { x: 78, y: 74, side: "right" },
];

export const OwnerPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = springIn(frame, T.panelsStart, fps);
  const panelX = interpolate(enter, [0, 1], [-64, 0]);
  const panelOpacity = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const header = fadeSlide(frame, T.headerStart, T.headerDur, 10);

  const pride = clampedInterp(frame, [T.ownerChipStart, T.ownerChipStart + 60], [0, 1]);

  const labelsFadeOut = clampedInterp(
    frame,
    [T.ownerFadeStart, T.ownerFadeStart + T.ownerFadeDur],
    [1, 0],
  );

  const recede = clampedInterp(
    frame,
    [T.emphasizeStart, T.emphasizeStart + T.emphasizeDur],
    [0, 1],
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 70px",
        opacity: panelOpacity,
        transform: `translateX(${panelX}px)`,
      }}
    >
      <div style={{ width: "100%", maxWidth: 660, marginBottom: 26 }}>
        <PanelHeader label="OWNER EYES" color={palette.amber} opacity={header.opacity} translateY={header.translateY} />
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 660,
          aspectRatio: "400 / 300",
          borderRadius: 14,
          overflow: "visible",
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden", border: `1px solid ${palette.rule}`, boxShadow: "0 30px 60px -30px rgba(23,26,31,0.3)" }}>
          <KitchenArt pride={pride} recede={recede} />
        </div>

        <div style={{ position: "absolute", inset: 0, opacity: labelsFadeOut }}>
          {OWNER_LABELS.map((label, i) => {
            const start = T.ownerChipStart + i * T.ownerChipStep;
            const progress = clampedInterp(frame, [start, start + 22], [0, 1]);
            const pos = CHIP_POSITIONS[i];
            return (
              <AnnotationChip
                key={label}
                label={label}
                xPercent={pos.x}
                yPercent={pos.y}
                side={pos.side}
                progress={progress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
