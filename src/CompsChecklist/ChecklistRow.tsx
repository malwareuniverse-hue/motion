import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import {
  BOX_RADIUS,
  BOX_SIZE,
  LABEL_GAP,
  LIST_X,
  T,
  rowY,
  type ChecklistItem,
} from "./timeline";

const TICK_PATH = "M13 30 L24 41 L45 17";
/** Long enough to cover the path so the dash offset can hide it entirely. */
const TICK_LEN = 70;

export const ChecklistRow: React.FC<{ item: ChecklistItem; index: number }> = ({
  item,
  index,
}) => {
  const frame = useCurrentFrame();

  const enter = fadeRise(frame, item.inStart, T.rowDur, 12);
  const tickStart = item.inStart + T.tickDelay;
  const tick = clampedInterp(
    frame,
    [tickStart, tickStart + T.tickDur],
    [0, 1],
    easeOutCubic,
  );
  // The ticks lose their gold once the verdict lands.
  const fade = clampedInterp(
    frame,
    [T.ticksFade, T.ticksFade + T.ticksFadeDur],
    [0, 1],
  );

  if (enter.opacity <= 0) return null;

  const y = rowY(index);
  const tickColor = interpolateColors(
    fade,
    [0, 1],
    [palette.gold, palette.mutedGrayFaint],
  );
  const boxBorder = interpolateColors(
    Math.min(tick, 1 - fade),
    [0, 1],
    [palette.hairline, palette.goldLine],
  );

  return (
    <div
      style={{
        position: "absolute",
        left: LIST_X,
        top: y,
        transform: `translateY(-50%) translateY(${enter.translateY}px)`,
        opacity: enter.opacity,
        display: "flex",
        alignItems: "center",
        gap: LABEL_GAP,
      }}
    >
      <div
        style={{
          width: BOX_SIZE,
          height: BOX_SIZE,
          flex: "0 0 auto",
          borderRadius: BOX_RADIUS,
          border: `1.5px solid ${boxBorder}`,
          background: palette.charcoal,
        }}
      >
        <svg width={BOX_SIZE} height={BOX_SIZE} viewBox="0 0 58 58" aria-hidden>
          <path
            d={TICK_PATH}
            fill="none"
            stroke={tickColor}
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={TICK_LEN}
            strokeDashoffset={TICK_LEN * (1 - tick)}
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: poppins,
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: 1.6,
          color: palette.softWhite,
          whiteSpace: "nowrap",
        }}
      >
        {item.label}
      </span>
    </div>
  );
};
