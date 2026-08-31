import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp } from "./utils";
import { SearchHeader } from "./SearchHeader";
import { OptionCard } from "./OptionCard";
import { GuestCursor, cardGlow } from "./GuestCursor";
import { ClosingStatement } from "./ClosingStatement";
import { OPTIONS, T } from "./timeline";

export const BookingDecisionScene: React.FC = () => {
  const frame = useCurrentFrame();

  const wallOpacity = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + T.toFinalDur], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 12%, ${palette.bgLift} 0%, ${palette.bg} 60%)`,
      }}
    >
      <AbsoluteFill style={{ opacity: wallOpacity }}>
        <SearchHeader />

        {OPTIONS.map((option, i) => {
          const entrance = clampedInterp(
            frame,
            [T.cardsStart + i * T.cardsStep, T.cardsStart + i * T.cardsStep + T.cardsDur],
            [0, 1],
          );
          const recede =
            option.id === "C"
              ? clampedInterp(frame, [T.fadeCStart, T.fadeCStart + T.fadeCDur], [0, 1])
              : 0;
          const glow = option.id === "A" || option.id === "B" ? cardGlow(frame, option.id) : 0;
          return <OptionCard key={option.id} option={option} entrance={entrance} recede={recede} glow={glow} />;
        })}

        <GuestCursor />
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
