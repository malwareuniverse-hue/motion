import React from "react";
import { palette, scoreColor } from "./theme";
import { poppins } from "./fonts";
import { BedIcon, FlagIcon, PoolIcon, StarIcon } from "./icons";
import type { Property } from "./timeline";
import { CARD_H, CARD_W } from "./timeline";

const THUMB_HUES: Array<[string, string]> = [
  ["#8FB79B", "#4E7A5E"],
  ["#D9A97C", "#B06B3E"],
  ["#8EB4C7", "#3E6E8A"],
  ["#B7AFA0", "#7A6F5C"],
  ["#E3C081", "#B98A3B"],
  ["#A791B0", "#6B5479"],
  ["#9BB98C", "#5D7C4C"],
  ["#C9B79A", "#93744F"],
  ["#8FC4BA", "#3E7E71"],
  ["#C8A0A0", "#8A4E4E"],
];

type Props = {
  property: Property;
  index: number;
  entrance: number; // 0-1
  dim: number; // 0-1 opacity multiplier
  glow: number; // 0-1 highlight ring/scale
};

export const PropertyTile: React.FC<Props> = ({ property, index, entrance, dim, glow }) => {
  const hue = THUMB_HUES[index % THUMB_HUES.length];
  const isProblem = property.score < 60;
  const sColor = scoreColor(property.score);
  const scale = 0.92 + entrance * 0.08 + glow * 0.05;
  const translateY = (1 - entrance) * 24;

  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        borderRadius: 14,
        background: palette.panel,
        border: `1px solid ${glow > 0 ? palette.teal : palette.panelBorder}`,
        boxShadow:
          glow > 0
            ? `0 0 0 ${3 * glow}px ${palette.tealBg}, 0 24px 50px -24px rgba(0,0,0,0.6)`
            : "0 14px 30px -20px rgba(0,0,0,0.5)",
        opacity: entrance * dim,
        transform: `translateY(${translateY}px) scale(${scale})`,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 10,
            flexShrink: 0,
            background: `linear-gradient(150deg, ${hue[0]}, ${hue[1]})`,
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: poppins,
              fontSize: 15,
              fontWeight: 600,
              color: palette.cream,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {property.address}
          </div>
          <div style={{ fontFamily: poppins, fontSize: 11.5, fontWeight: 500, color: palette.creamFaint }}>
            {property.city}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Stat icon={<StarIcon color={palette.amber} size={12} />} value={property.rating.toFixed(2)} />
        <Stat icon={<BedIcon color={palette.creamSoft} size={13} />} value={String(property.beds)} />
        <Stat
          icon={<PoolIcon color={property.pool ? palette.teal : palette.creamFaint} size={13} />}
          value={property.pool ? "Pool" : "No pool"}
          muted={!property.pool}
        />
        <div style={{ marginLeft: "auto", fontFamily: poppins, fontSize: 16, fontWeight: 700, color: palette.cream }}>
          ${property.price}
          <span style={{ fontSize: 11, fontWeight: 500, color: palette.creamFaint }}> /nt</span>
        </div>
      </div>

      <div style={{ marginTop: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontFamily: poppins, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: palette.creamFaint }}>
            VALUE SCORE
          </span>
          <span style={{ fontFamily: poppins, fontSize: 11, fontWeight: 700, color: sColor, display: "flex", alignItems: "center", gap: 4 }}>
            {isProblem && <FlagIcon color={palette.rose} size={11} />}
            {property.score}
          </span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: "rgba(246,244,238,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${property.score}%`, background: sColor, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ icon: React.ReactNode; value: string; muted?: boolean }> = ({ icon, value, muted }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    {icon}
    <span
      style={{
        fontFamily: poppins,
        fontSize: 12.5,
        fontWeight: 600,
        color: muted ? palette.creamFaint : palette.creamSoft,
      }}
    >
      {value}
    </span>
  </div>
);
