import React from "react";
import { useCurrentFrame } from "remotion";
import { PHOTO_HUES } from "./theme";
import { fadeSlide, clampedInterp } from "./utils";
import {
  CARD_GAP,
  LISTINGS,
  SCAN_BEATS,
  T,
  VIEWPORT_WIDTH,
  WINNER_INDICES,
  computeScrollX,
} from "./timeline";
import { ListingCardBS } from "./ListingCardBS";
import { ScanSpotlight } from "./ScanSpotlight";

export const CardTrack: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollX = computeScrollX(frame);
  const reveal = fadeSlide(frame, T.cardsRevealStart, T.cardsRevealDur, 26);

  return (
    <div
      style={{
        width: VIEWPORT_WIDTH,
        overflow: "hidden",
        opacity: reveal.opacity,
        paddingTop: 36,
        paddingBottom: 56,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: CARD_GAP,
          transform: `translateX(${-scrollX}px) translateY(${reveal.translateY}px)`,
        }}
      >
        {LISTINGS.map((listing, i) => {
          const winnerIdx = WINNER_INDICES.indexOf(i);
          const winnerStart = T.winnersStart + Math.max(winnerIdx, 0) * T.winnersStep;
          const winnerProgress = winnerIdx === -1 ? 0 : clampedInterp(frame, [winnerStart, winnerStart + 26], [0, 1]);
          return (
            <ListingCardBS
              key={listing.title}
              listing={listing}
              photoHue={PHOTO_HUES[i]}
              winnerProgress={winnerProgress}
            />
          );
        })}

        {SCAN_BEATS.map((beat) => (
          <ScanSpotlight key={beat.label} beat={beat} />
        ))}
      </div>
    </div>
  );
};
