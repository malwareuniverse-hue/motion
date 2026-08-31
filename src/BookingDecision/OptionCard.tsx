import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { CheckIcon, HotTubIcon, PoolIcon, StarIcon, XIcon } from "./icons";
import type { Option } from "./timeline";
import { CARD_H, CARD_TOP, CARD_W } from "./timeline";

const ACCENT_COLOR: Record<Option["accent"], string> = {
  amber: palette.amber,
  teal: palette.teal,
  slate: palette.slate,
};

const tagIcon = (tag: string, color: string) => {
  const t = tag.toLowerCase();
  if (t.startsWith("no ")) return <XIcon color={palette.creamFaint} size={13} />;
  if (t.includes("pool")) return <PoolIcon color={color} size={14} />;
  if (t.includes("hot tub")) return <HotTubIcon color={color} size={14} />;
  if (t.includes("review")) return <StarIcon color={palette.amber} size={13} />;
  return <CheckIcon color={color} size={13} />;
};

type Props = {
  option: Option;
  entrance: number;
  recede: number; // 0-1, only used for the fading option
  glow: number; // 0-1, cursor-focus highlight
};

export const OptionCard: React.FC<Props> = ({ option, entrance, recede, glow }) => {
  const frame = useCurrentFrame();
  const accent = ACCENT_COLOR[option.accent];
  const kenBurns = 1 + ((frame % 900) / 900) * 0.05;

  const scale = (0.94 + entrance * 0.06) * (1 - recede * 0.08);
  const translateY = (1 - entrance) * 30;
  const opacity = entrance * (1 - recede * 0.62);
  const blur = recede * 2.2;
  const saturate = 1 - recede * 0.55;

  return (
    <div
      style={{
        position: "absolute",
        left: option.left,
        top: CARD_TOP,
        width: CARD_W,
        height: CARD_H,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: `blur(${blur}px) saturate(${saturate})`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          overflow: "hidden",
          background: palette.panel,
          border: `1.5px solid ${glow > 0 ? accent : palette.panelBorder}`,
          boxShadow:
            glow > 0
              ? `0 0 0 ${3 * glow}px ${option.accent === "amber" ? palette.amberBg : palette.tealBg}, 0 40px 80px -30px rgba(0,0,0,0.65)`
              : "0 30px 60px -30px rgba(0,0,0,0.55)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(150deg, ${option.hue[0]}, ${option.hue[1]})`,
              transform: `scale(${kenBurns})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(0deg, rgba(0,0,0,0.32), transparent 55%)",
            }}
          />
        </div>

        <div style={{ padding: "22px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
          <span
            style={{
              fontFamily: poppins,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2.4,
              color: accent,
              marginBottom: 16,
            }}
          >
            {option.title}
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {option.tags.map((tag) => (
              <div key={tag} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {tagIcon(tag, accent)}
                <span
                  style={{
                    fontFamily: poppins,
                    fontSize: 16,
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
    </div>
  );
};
