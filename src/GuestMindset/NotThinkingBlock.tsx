import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { DismissedItem } from "./DismissedItem";
import { DISMISSED_ITEMS, EYEBROW_TEXT, ITEM0_Y, T } from "./timeline";

export const NotThinkingBlock: React.FC = () => {
  const frame = useCurrentFrame();

  const eyebrow = fadeSlide(frame, T.eyebrowStart, T.eyebrowDur, 14);
  const recede = clampedInterp(
    frame,
    [T.recedeStart, T.recedeStart + T.recedeDur],
    [0, 1],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 1 - recede * 0.78,
        transform: `translateY(${recede * -28}px) scale(${1 - recede * 0.03})`,
        filter: `blur(${recede * 2.4}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: ITEM0_Y - 68,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: eyebrow.opacity,
          transform: `translateY(${eyebrow.translateY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 6.5,
            color: palette.creamFaint,
          }}
        >
          {EYEBROW_TEXT}
        </span>
      </div>

      {DISMISSED_ITEMS.map((spec) => (
        <DismissedItem key={spec.slot} spec={spec} />
      ))}
    </div>
  );
};
