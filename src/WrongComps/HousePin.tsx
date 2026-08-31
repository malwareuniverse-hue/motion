import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { CheckIcon, HotTubIcon, MapPinIcon, PoolIcon, StarIcon, XIcon } from "./icons";
import type { House } from "./timeline";

const TIER_META: Record<House["tier"], { color: string; label: string }> = {
  luxury: { color: palette.amber, label: "LUXURY" },
  basic: { color: palette.slate, label: "BASIC" },
  mid: { color: palette.teal, label: "MID-TIER" },
};

const tagIcon = (tag: string, color: string) => {
  const t = tag.toLowerCase();
  if (t.startsWith("no ")) return <XIcon color={palette.creamFaint} size={10} />;
  if (t.includes("pool")) return <PoolIcon color={color} size={11} />;
  if (t.includes("hot tub")) return <HotTubIcon color={color} size={11} />;
  if (t.includes("review")) return <StarIcon color={palette.amber} size={10} />;
  return <CheckIcon color={color} size={10} />;
};

type Props = {
  house: House;
  pinProgress: number;
  cardProgress: number;
  dim: number;
  glow: number;
};

export const HousePin: React.FC<Props> = ({ house, pinProgress, cardProgress, dim, glow }) => {
  const meta = TIER_META[house.tier];
  const pinScale = 0.5 + pinProgress * 0.5;
  const pinDrop = (1 - pinProgress) * -30;

  const cardTranslate =
    house.cardDir === "left"
      ? "translate(calc(-100% - 26px), -58%)"
      : house.cardDir === "right"
        ? "translate(26px, -58%)"
        : "translate(-50%, 22px)";

  const cardSlide = (1 - cardProgress) * (house.cardDir === "down" ? -10 : 10);

  return (
    <div
      style={{
        position: "absolute",
        left: house.x,
        top: house.y,
        opacity: dim,
      }}
    >
      {glow > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 90 * glow,
            height: 90 * glow,
            borderRadius: "50%",
            background: palette.amberBg,
            transform: "translate(-50%, -78%)",
            filter: "blur(2px)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(-50%, -100%) translateY(${pinDrop}px) scale(${pinScale})`,
          opacity: pinProgress,
        }}
      >
        <MapPinIcon color={meta.color} size={34} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `${cardTranslate} translateY(${cardSlide}px)`,
          opacity: cardProgress,
          width: 230,
          background: palette.panel,
          border: `1px solid ${palette.panelBorderLift}`,
          borderRadius: 14,
          padding: "14px 16px",
          boxShadow: "0 24px 48px -26px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontFamily: poppins, fontSize: 14, fontWeight: 700, color: palette.cream }}>
            {house.label}
          </span>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: 1,
              color: meta.color,
              background: `${meta.color}1F`,
              borderRadius: 999,
              padding: "3px 8px",
            }}
          >
            {meta.label}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {house.tags.map((tag) => (
            <div key={tag} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              {tagIcon(tag, meta.color)}
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: tag.toLowerCase().startsWith("no ") ? palette.creamFaint : palette.creamSoft,
                }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
