import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, easeOutCubic, fadeRise } from "./utils";
import { TileGlyph } from "./TileGlyph";
import {
  CENTER_X,
  GRID_CAPTION,
  GRID_CAPTION_Y,
  GRID_LABEL,
  GRID_LABEL_Y,
  T,
  TILE_COUNT,
  TILE_H,
  TILE_W,
  YOURS_INDEX,
  YOURS_TEXT,
  tileX,
  tileY,
} from "./timeline";

/** Every other listing lifts to full weight — that is the surprise. */
const Tile: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();

  const start = T.gridIn + index * T.gridStagger;
  const enter = fadeRise(frame, start, T.gridDur, 10);

  const isYours = index === YOURS_INDEX;
  const mine = isYours
    ? clampedInterp(frame, [T.yoursIn, T.yoursIn + T.yoursDur], [0, 1], easeOutCubic)
    : 0;
  const equalize = isYours
    ? 0
    : clampedInterp(
        frame,
        [T.equalizeStart, T.equalizeStart + T.equalizeDur],
        [0, 1],
        easeInOutCubic,
      );

  if (enter.opacity <= 0) return null;

  const weight = isYours ? 1 : 0.42 + 0.58 * equalize;
  const border = interpolateColors(mine, [0, 1], [palette.hairline, palette.goldLine]);
  const stroke = interpolateColors(mine, [0, 1], [palette.softWhite, palette.gold]);

  return (
    <div
      style={{
        position: "absolute",
        left: tileX(index),
        top: tileY(index),
        width: TILE_W,
        height: TILE_H,
        transform: `translate(-50%, -50%) translateY(${enter.translateY}px)`,
        opacity: enter.opacity * weight,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          background: palette.charcoal,
          border: `1px solid ${border}`,
          boxShadow: "0 20px 44px -32px rgba(0, 0, 0, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TileGlyph stroke={stroke} />
      </div>
      {isYours ? (
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: -38,
            transform: "translateX(-50%)",
            opacity: mine,
            fontFamily: poppins,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 5,
            color: palette.gold,
          }}
        >
          {YOURS_TEXT}
        </span>
      ) : null}
    </div>
  );
};

/** Act 3: your listing, and the nine others the guest sees beside it. */
export const ListingGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const label = fadeRise(frame, T.gridLabelIn, T.gridLabelDur, 8);
  const caption = fadeRise(frame, T.gridCaptionIn, T.gridCaptionDur, 10);
  const out = clampedInterp(frame, [T.stage3Out, T.stage3Out + T.stage3OutDur], [1, 0]);

  if (label.opacity <= 0 || out <= 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: GRID_LABEL_Y,
          transform: `translate(-50%, -50%) translateY(${label.translateY}px)`,
          opacity: label.opacity,
          fontFamily: poppins,
          fontSize: 19,
          fontWeight: 500,
          letterSpacing: 7,
          color: palette.gold,
          whiteSpace: "nowrap",
        }}
      >
        {GRID_LABEL}
      </span>

      {Array.from({ length: TILE_COUNT }, (_, i) => (
        <Tile key={i} index={i} />
      ))}

      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: GRID_CAPTION_Y,
          transform: `translate(-50%, -50%) translateY(${caption.translateY}px)`,
          opacity: caption.opacity,
          fontFamily: poppins,
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: 4,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {GRID_CAPTION}
      </span>
    </div>
  );
};
