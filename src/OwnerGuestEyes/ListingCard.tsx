import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { StarIcon } from "./icons";

type Props = {
  title: string;
  price: string;
  rating: string;
  own?: boolean;
  photoFrom: string;
  photoTo: string;
  highlight: number; // 0-1 focus ring intensity
};

export const ListingCard: React.FC<Props> = ({
  title,
  price,
  rating,
  own,
  photoFrom,
  photoTo,
  highlight,
}) => {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: 14,
        background: palette.card,
        border: `1px solid ${own ? palette.teal : palette.rule}`,
        boxShadow: own
          ? `0 0 0 ${2 + highlight * 2}px ${palette.tealBg}, 0 16px 30px -18px rgba(23,26,31,0.35)`
          : "0 10px 22px -16px rgba(23,26,31,0.25)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {own && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 2,
            background: palette.teal,
            borderRadius: 999,
            padding: "3px 10px",
          }}
        >
          <span
            style={{
              fontFamily: poppins,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 0.8,
              color: "#FFFFFF",
            }}
          >
            YOUR LISTING
          </span>
        </div>
      )}
      <div
        style={{
          height: 92,
          background: `linear-gradient(135deg, ${photoFrom}, ${photoTo})`,
        }}
      />
      <div style={{ padding: "10px 14px 12px" }}>
        <div
          style={{
            fontFamily: poppins,
            fontSize: 13.5,
            fontWeight: 600,
            color: palette.ink,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <StarIcon color={palette.amber} size={11} />
            <span
              style={{
                fontFamily: poppins,
                fontSize: 12,
                fontWeight: 500,
                color: palette.inkSoft,
              }}
            >
              {rating}
            </span>
          </div>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 13.5,
              fontWeight: 700,
              color: palette.ink,
            }}
          >
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};
