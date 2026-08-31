import React from "react";
import { useCurrentFrame } from "remotion";
import { palette, scoreColor } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import {
  HIGHLIGHT_INDEX,
  MARKET_AVG_PRICE,
  MARKET_AVG_SCORE,
  PROPERTIES,
  T,
} from "./timeline";
import { BedIcon, FlagIcon, PoolIcon, StarIcon } from "./icons";

export const InsightCallout: React.FC = () => {
  const frame = useCurrentFrame();
  const property = PROPERTIES[HIGHLIGHT_INDEX];

  const inT = clampedInterp(frame, [T.calloutStart, T.calloutStart + T.calloutDur], [0, 1]);
  const outT = clampedInterp(frame, [T.calloutFadeOutStart, T.calloutFadeOutStart + T.calloutFadeOutDur], [1, 0]);
  const opacity = Math.min(inT, outT);
  const translateY = (1 - inT) * 26;

  const priceDelta = Math.round(((property.price - MARKET_AVG_PRICE) / MARKET_AVG_PRICE) * 100);
  const scoreDelta = MARKET_AVG_SCORE - property.score;

  const barsProgress = clampedInterp(frame, [T.calloutStart + 10, T.calloutStart + 40], [0, 1]);
  const sColor = scoreColor(property.score);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 860,
          background: palette.panel,
          border: `1px solid ${palette.panelBorderLift}`,
          borderRadius: 20,
          padding: "40px 48px",
          boxShadow: "0 60px 120px -40px rgba(0,0,0,0.7)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <FlagIcon color={palette.rose} size={14} />
          <span style={{ fontFamily: poppins, fontSize: 12.5, fontWeight: 700, letterSpacing: 2, color: palette.rose }}>
            FLAGGED IN COMPARISON
          </span>
        </div>

        <div style={{ fontFamily: poppins, fontSize: 32, fontWeight: 700, color: palette.cream, marginBottom: 4 }}>
          {property.address}
        </div>
        <div style={{ fontFamily: poppins, fontSize: 14, fontWeight: 500, color: palette.creamFaint, marginBottom: 28 }}>
          {property.city}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 30 }}>
          <Stat icon={<StarIcon color={palette.amber} size={14} />} label="RATING" value={property.rating.toFixed(2)} />
          <Stat icon={<BedIcon color={palette.creamSoft} size={15} />} label="BEDROOMS" value={String(property.beds)} />
          <Stat icon={<PoolIcon color={palette.creamFaint} size={15} />} label="AMENITIES" value="No pool" muted />
          <Stat label="PRICE" value={`$${property.price}/nt`} sub={`${priceDelta > 0 ? "+" : ""}${priceDelta}% vs market`} subColor={palette.rose} />
        </div>

        <div style={{ height: 1, background: palette.panelBorder, marginBottom: 26 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <BarRow label="THIS LISTING" value={property.score} color={sColor} progress={barsProgress} />
          <BarRow label="MARKET AVERAGE" value={MARKET_AVG_SCORE} color={palette.teal} progress={barsProgress} />
        </div>

        <div style={{ marginTop: 20, fontFamily: poppins, fontSize: 14.5, fontWeight: 500, color: palette.creamSoft }}>
          <span style={{ color: palette.rose, fontWeight: 700 }}>{scoreDelta} points</span> below the market&rsquo;s
          average value score — guests notice this in seconds.
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ icon?: React.ReactNode; label: string; value: string; sub?: string; subColor?: string; muted?: boolean }> = ({
  icon,
  label,
  value,
  sub,
  subColor,
  muted,
}) => (
  <div>
    <div style={{ fontFamily: poppins, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, color: palette.creamFaint, marginBottom: 6 }}>
      {label}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {icon}
      <span style={{ fontFamily: poppins, fontSize: 18, fontWeight: 700, color: muted ? palette.creamFaint : palette.cream }}>
        {value}
      </span>
    </div>
    {sub && (
      <div style={{ fontFamily: poppins, fontSize: 11.5, fontWeight: 600, color: subColor ?? palette.creamFaint, marginTop: 2 }}>
        {sub}
      </div>
    )}
  </div>
);

const BarRow: React.FC<{ label: string; value: number; color: string; progress: number }> = ({ label, value, color, progress }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontFamily: poppins, fontSize: 11.5, fontWeight: 700, letterSpacing: 1.2, color: palette.creamSoft }}>
        {label}
      </span>
      <span style={{ fontFamily: poppins, fontSize: 12.5, fontWeight: 700, color }}>{Math.round(value * progress)}</span>
    </div>
    <div style={{ height: 8, borderRadius: 4, background: "rgba(246,244,238,0.08)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value * progress}%`, background: color, borderRadius: 4 }} />
    </div>
  </div>
);
