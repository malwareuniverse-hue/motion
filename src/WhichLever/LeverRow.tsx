import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, fadeRise } from "./utils";
import {
  DROP_LABEL,
  DROP_LABEL_Y,
  HANDLE_H,
  HANDLE_PULLED,
  HANDLE_REST,
  HANDLE_W,
  LABEL_Y,
  LEVER_COUNT,
  PRICE_INDEX,
  PRICE_LABEL,
  T,
  TRACK_H,
  TRACK_TOP,
  TRACK_W,
  UNNAMED_LABEL,
  CENTER_X,
  handleY,
  leverX,
} from "./timeline";

const Lever: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();

  const start = T.leverStarts[index];
  const enter = fadeRise(frame, start, T.leverDur, 12);

  const isPrice = index === PRICE_INDEX;
  const pull = isPrice
    ? clampedInterp(
        frame,
        [T.pullStart, T.pullStart + T.pullDur],
        [0, 1],
        easeInOutCubic,
      )
    : 0;

  if (enter.opacity <= 0) return null;

  const x = leverX(index);
  const t = HANDLE_REST + (HANDLE_PULLED - HANDLE_REST) * pull;
  const y = handleY(t);

  const handleColor = isPrice
    ? pull > 0
      ? palette.gold
      : palette.softWhite
    : palette.softWhite;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: enter.opacity,
        transform: `translateY(${enter.translateY}px)`,
      }}
    >
      {/* track */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: TRACK_TOP,
          width: TRACK_W,
          height: TRACK_H,
          transform: "translateX(-50%)",
          background: palette.charcoalLift,
          borderRadius: TRACK_W / 2,
        }}
      />
      {/* travelled portion, drawn only on the lever that moves */}
      {isPrice && pull > 0 ? (
        <div
          style={{
            position: "absolute",
            left: x,
            top: handleY(HANDLE_REST),
            width: TRACK_W,
            height: y - handleY(HANDLE_REST),
            transform: "translateX(-50%)",
            background: palette.gold,
            opacity: 0.55,
            borderRadius: TRACK_W / 2,
          }}
        />
      ) : null}
      {/* handle */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: HANDLE_W,
          height: HANDLE_H,
          transform: "translate(-50%, -50%)",
          background: handleColor,
          borderRadius: 5,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: x,
          top: LABEL_Y,
          transform: "translate(-50%, -50%)",
          fontFamily: poppins,
          fontSize: isPrice ? 21 : 19,
          fontWeight: 500,
          letterSpacing: isPrice ? 3 : 2,
          color: isPrice ? palette.softWhite : palette.mutedGrayFaint,
          whiteSpace: "nowrap",
        }}
      >
        {isPrice ? PRICE_LABEL : UNNAMED_LABEL}
      </span>
    </div>
  );
};

/** Four levers; only the one everyone reaches for is named. */
export const LeverRow: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = fadeRise(frame, T.dropLabelIn, T.dropLabelDur, 10);

  return (
    <>
      {Array.from({ length: LEVER_COUNT }, (_, i) => (
        <Lever key={i} index={i} />
      ))}
      {drop.opacity > 0 ? (
        <span
          style={{
            position: "absolute",
            left: CENTER_X,
            top: DROP_LABEL_Y,
            transform: `translate(-50%, -50%) translateY(${drop.translateY}px)`,
            opacity: drop.opacity,
            fontFamily: poppins,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: 4,
            color: palette.gold,
            whiteSpace: "nowrap",
          }}
        >
          {DROP_LABEL}
        </span>
      ) : null}
    </>
  );
};
