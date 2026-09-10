import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic, fadeRise } from "./utils";
import { HouseGlyph } from "./HouseGlyph";
import { CARD_H, CARD_W, CARD_Y_TIGHT, CARD_Y_WIDE, T } from "./timeline";

type Props = {
  name: string;
  centerX: number;
  /** The house that turns out to be worth more carries the gold emphasis. */
  emphasised: boolean;
};

export const PropertyCard: React.FC<Props> = ({
  name,
  centerX,
  emphasised,
}) => {
  const frame = useCurrentFrame();

  const enter = fadeRise(frame, T.cardsIn, T.cardsInDur, 12);

  // Both cards lift and settle back once the comparison narrows to one column.
  const regroup = clampedInterp(
    frame,
    [T.regroupStart, T.regroupStart + T.regroupDur],
    [0, 1],
    easeInOutCubic,
  );
  const centerY = CARD_Y_WIDE + (CARD_Y_TIGHT - CARD_Y_WIDE) * regroup;

  const lift = emphasised ? regroup : 0;
  const recede = emphasised ? 0 : regroup;

  const border = interpolateColors(
    lift,
    [0, 1],
    [palette.hairline, palette.goldLine],
  );
  const glyphStroke = interpolateColors(
    lift,
    [0, 1],
    [palette.softWhite, palette.gold],
  );
  const nameColor = interpolateColors(
    lift,
    [0, 1],
    [palette.mutedGray, palette.goldSoft],
  );

  return (
    <div
      style={{
        position: "absolute",
        left: centerX,
        top: centerY,
        width: CARD_W,
        height: CARD_H,
        transform: `translate(-50%, -50%) translateY(${enter.translateY}px)`,
        opacity: enter.opacity * (1 - 0.58 * recede),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          background: palette.charcoal,
          border: `1px solid ${border}`,
          boxShadow: "0 26px 52px -34px rgba(0, 0, 0, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <HouseGlyph stroke={glyphStroke} opacity={0.82 + lift * 0.18} />
        <span
          style={{
            fontFamily: poppins,
            fontSize: 17,
            fontWeight: 500,
            letterSpacing: 4.5,
            color: nameColor,
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
};
