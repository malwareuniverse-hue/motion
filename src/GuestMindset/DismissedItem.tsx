import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic } from "./utils";
import type { DismissedSpec } from "./timeline";
import { ITEM_H, ITEM_W, T, WIDTH, itemY } from "./timeline";

type Props = { spec: DismissedSpec };

export const DismissedItem: React.FC<Props> = ({ spec }) => {
  const frame = useCurrentFrame();

  const enter = clampedInterp(
    frame,
    [spec.inStart, spec.inStart + T.itemInDur],
    [0, 1],
    easeOutCubic,
  );
  const strike = clampedInterp(
    frame,
    [
      T.strikeStart + spec.slot * 6,
      T.strikeStart + spec.slot * 6 + T.strikeDur,
    ],
    [0, 1],
    easeOutCubic,
  );

  const textColor = strike > 0.5 ? palette.mutedGrayFaint : palette.mutedGray;

  return (
    <div
      style={{
        position: "absolute",
        left: (WIDTH - ITEM_W) / 2,
        top: itemY(spec.slot),
        width: ITEM_W,
        height: ITEM_H,
        opacity: enter * (1 - strike * 0.34),
        transform: `translateY(${(1 - enter) * 14}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          background: palette.charcoal,
          border: `1px solid ${palette.hairline}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          paddingLeft: 44,
        }}
      >
        <span
          style={{
            position: "relative",
            fontFamily: poppins,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: 2.4,
            color: textColor,
          }}
        >
          {spec.text}
          {/* dismissal rule — draws left to right across the words once the point lands */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: `${strike * 100}%`,
              height: 2,
              background: palette.mutedGray,
              opacity: 0.8,
            }}
          />
        </span>
      </div>
    </div>
  );
};
