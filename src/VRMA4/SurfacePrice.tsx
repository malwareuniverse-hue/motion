import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, fadeRise } from "./utils";
import {
  SAFE_X,
  SURFACE_PRICE,
  SURFACE_PRICE_DURATION,
  WIDTH,
} from "./timeline";
import {
  LabelBar,
  Numeral,
  PhotoBlock,
  SceneShell,
  Surface,
} from "./primitives";

/**
 * 0:32-0:38  "you have no idea whether their strategy is actually working."
 *
 * Four public listings. The rate resolves; the performance rows underneath
 * never do - they stay as unresolved hairline placeholders. The point is the
 * absence of information behind a public price, so nothing here says "bad".
 * No red X, no question mark, no crossing out.
 */

const GRID_W = WIDTH - SAFE_X * 2;
const TILE_W = (GRID_W - 30) / 2;
const TILE_H = 470;

const TILES = [
  { rate: "412", titleW: 168 },
  { rate: "455", titleW: 138 },
  { rate: "389", titleW: 186 },
  { rate: "431", titleW: 152 },
];

const Tile: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const tile = TILES[index];
  const rise = fadeRise(frame, SURFACE_PRICE.tileIn[index], 16, 12);

  // The three rows below the rate try to resolve and settle at an unread state.
  const hidden = clampedInterp(
    frame,
    [
      SURFACE_PRICE.hiddenStart,
      SURFACE_PRICE.hiddenStart + SURFACE_PRICE.hiddenDur,
    ],
    [0.32, 1],
  );

  return (
    <Surface
      style={{
        width: TILE_W,
        height: TILE_H,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        opacity: rise.opacity,
        transform: `translateY(${rise.translateY}px)`,
      }}
    >
      <PhotoBlock width={TILE_W - 44} height={196} seed={index} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <LabelBar width={tile.titleW} height={9} color={palette.whiteFaint} />
        <LabelBar width={tile.titleW * 0.6} height={7} opacity={0.5} />
      </div>

      {/* Public surface: legible. */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <Numeral value={tile.rate} size={38} />
        <LabelBar width={46} height={6} opacity={0.45} />
      </div>

      {/* Everything that would tell you whether it is working: never resolves. */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 18,
          borderTop: `1px solid ${palette.hairline}`,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <LabelBar
              width={78 - row * 12}
              height={6}
              opacity={0.4 * (1 - hidden * 0.55)}
            />
            <div
              style={{
                width: 62,
                height: 8,
                borderRadius: 4,
                border: `1px dashed ${palette.hairlineStrong}`,
                opacity: 0.35 + hidden * 0.3,
              }}
            />
          </div>
        ))}
      </div>
    </Surface>
  );
};

export const SurfacePrice: React.FC = () => {
  const frame = useCurrentFrame();
  const header = fadeRise(frame, SURFACE_PRICE.surfaceIn, 18, 10);

  return (
    <SceneShell
      duration={SURFACE_PRICE_DURATION}
      outStart={SURFACE_PRICE.outStart}
    >
      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 380,
          width: GRID_W,
          opacity: header.opacity,
          transform: `translateY(${header.translateY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <LabelBar width={148} height={9} color={palette.whiteFaint} />
        <div style={{ flex: 1, height: 1, background: palette.hairline }} />
        <LabelBar width={54} height={7} opacity={0.5} />
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 470,
          width: GRID_W,
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
        }}
      >
        {TILES.map((_, i) => (
          <Tile key={i} index={i} />
        ))}
      </div>
    </SceneShell>
  );
};
