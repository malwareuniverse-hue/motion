import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { AMENITY_ICON, HeartIcon, PinIcon, StarIcon } from "./icons";
import type { Listing } from "./timeline";
import { CARD_WIDTH } from "./timeline";

type Props = {
  listing: Listing;
  photoHue: [string, string];
  winnerProgress: number; // 0-1
};

export const ListingCardBS: React.FC<Props> = ({ listing, photoHue, winnerProgress }) => {
  const frame = useCurrentFrame();
  const kenBurns = 1 + ((frame % 900) / 900) * 0.06;

  return (
    <div
      style={{
        width: CARD_WIDTH,
        flexShrink: 0,
        borderRadius: 16,
        overflow: "visible",
        background: palette.siteBg,
        boxShadow:
          winnerProgress > 0
            ? `0 0 0 ${2 + winnerProgress * 2}px ${palette.winner}, 0 20px 40px -20px rgba(0,0,0,0.35)`
            : "0 10px 26px -18px rgba(0,0,0,0.3)",
        position: "relative",
      }}
    >
      {winnerProgress > 0.4 && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: 16,
            opacity: Math.min(1, (winnerProgress - 0.4) / 0.4),
            transform: `translateY(${(1 - Math.min(1, (winnerProgress - 0.4) / 0.4)) * 8}px)`,
            background: palette.winner,
            borderRadius: 999,
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
            gap: 5,
            boxShadow: "0 8px 16px -8px rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        >
          <StarIcon color="#3A2A08" size={10} />
          <span style={{ fontFamily: poppins, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, color: "#3A2A08" }}>
            GREAT VALUE
          </span>
        </div>
      )}

      <div style={{ borderRadius: "16px 16px 0 0", overflow: "hidden", position: "relative", height: 176 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(150deg, ${photoHue[0]}, ${photoHue[1]})`,
            transform: `scale(${kenBurns})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(0deg, rgba(0,0,0,0.22), transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HeartIcon color={palette.ink} size={14} />
        </div>
      </div>

      <div style={{ padding: "13px 16px 16px" }}>
        <div style={{ fontFamily: poppins, fontSize: 15.5, fontWeight: 600, color: palette.ink, marginBottom: 4 }}>
          {listing.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
          <PinIcon color={palette.inkFaint} size={11} />
          <span style={{ fontFamily: poppins, fontSize: 12.5, color: palette.inkSoft, fontWeight: 500 }}>
            {listing.location}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
          <StarIcon color={palette.amber} size={12} />
          <span style={{ fontFamily: poppins, fontSize: 12.5, fontWeight: 700, color: palette.ink }}>
            {listing.rating.toFixed(2)}
          </span>
          <span style={{ fontFamily: poppins, fontSize: 12, color: palette.inkFaint, fontWeight: 500 }}>
            ({listing.reviews})
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          {listing.amenities.map((a) => {
            const Icon = AMENITY_ICON[a];
            return (
              <div key={a} style={{ width: 22, height: 22, borderRadius: 6, background: palette.siteBgAlt, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon color={palette.inkSoft} size={12} />
              </div>
            );
          })}
        </div>
        <div style={{ height: 1, background: palette.rule, marginBottom: 10 }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: poppins, fontSize: 17, fontWeight: 700, color: palette.ink }}>
            ${listing.price}
          </span>
          <span style={{ fontFamily: poppins, fontSize: 12, color: palette.inkFaint, fontWeight: 500 }}>
            / night
          </span>
        </div>
      </div>
    </div>
  );
};
