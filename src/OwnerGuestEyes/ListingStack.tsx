import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide, clampedInterp } from "./utils";
import { T } from "./timeline";
import { ListingCard } from "./ListingCard";
import { CursorRing } from "./icons";

const LISTINGS = [
  { title: "Oceanview Cottage", price: "$340/nt", rating: "4.86", photoFrom: "#CFE0DA", photoTo: "#9FC2B7", own: false },
  { title: "Your Beach Retreat", price: "$365/nt", rating: "4.92", photoFrom: "#BFE3DC", photoTo: "#63B3A6", own: true },
  { title: "Coastal Bungalow", price: "$310/nt", rating: "4.78", photoFrom: "#D9E4E0", photoTo: "#AFC7BE", own: false },
];

export const ListingStack: React.FC<{ recede: number }> = ({ recede }) => {
  const frame = useCurrentFrame();

  const cursorProgress = clampedInterp(frame, [T.guestCardStep * 2 + T.guestCardStart, T.questionStart], [0, 1]);
  const cursorY = 46 + cursorProgress * 172;

  return (
    <div style={{ width: "100%", opacity: 1 - recede * 0.4 }}>
      <div
        style={{
          border: `1px solid ${palette.rule}`,
          borderRadius: 16,
          background: "rgba(255,255,255,0.6)",
          padding: "14px 16px 18px",
          boxShadow: "0 20px 40px -28px rgba(23,26,31,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          {[palette.amberSoft, palette.tealSoft, palette.ruleFaint].map((c, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
          ))}
          <span
            style={{
              fontFamily: poppins,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 1,
              color: palette.inkFaint,
              marginLeft: 6,
            }}
          >
            COMPARING LISTINGS
          </span>
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
          {LISTINGS.map((listing, i) => {
            const start = T.guestCardStart + i * T.guestCardStep;
            const { opacity, translateY } = fadeSlide(frame, start, 20, 22);
            const highlight = listing.own
              ? clampedInterp(frame, [start + 10, start + 40], [0, 1])
              : 0;
            return (
              <div key={listing.title} style={{ opacity, transform: `translateY(${translateY}px)` }}>
                <ListingCard {...listing} highlight={highlight} />
              </div>
            );
          })}

          <div
            style={{
              position: "absolute",
              right: -14,
              top: cursorY,
              opacity: clampedInterp(frame, [T.guestCardStart + 30, T.guestCardStart + 50], [0, 0.9]) * (1 - recede),
              transform: "translate(0, -50%)",
            }}
          >
            <CursorRing color={palette.teal} size={40} />
          </div>
        </div>
      </div>
    </div>
  );
};
