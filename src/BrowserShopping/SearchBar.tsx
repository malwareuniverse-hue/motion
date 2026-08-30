import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { fadeSlide } from "./utils";
import { PinIcon } from "./icons";
import { T } from "./timeline";

const FIELDS = [
  { label: "SAME MARKET", value: "Asheville, NC", icon: "pin" as const },
  { label: "SAME DATES", value: "Mar 14 – Mar 21", icon: "cal" as const },
  { label: "SAME GROUP SIZE", value: "8 guests", icon: "user" as const },
];

const FieldIcon: React.FC<{ kind: "pin" | "cal" | "user" }> = ({ kind }) => {
  if (kind === "pin") return <PinIcon color={palette.teal} size={15} />;
  if (kind === "cal")
    return (
      <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
        <rect x={4} y={5} width={16} height={15} rx={2.5} stroke={palette.teal} strokeWidth={1.6} />
        <path d="M4 10h16" stroke={palette.teal} strokeWidth={1.6} />
        <path d="M8 3v4M16 3v4" stroke={palette.teal} strokeWidth={1.6} strokeLinecap="round" />
      </svg>
    );
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <circle cx={12} cy={8} r={3.4} stroke={palette.teal} strokeWidth={1.6} />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke={palette.teal} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
};

export const SearchBar: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 14,
        padding: "18px 40px",
        background: palette.siteBgAlt,
        borderBottom: `1px solid ${palette.rule}`,
      }}
    >
      {FIELDS.map((field, i) => {
        const start = T.searchFieldStart + i * T.searchFieldStep;
        const { opacity, translateY } = fadeSlide(frame, start, 20, 12);
        return (
          <div
            key={field.label}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              flex: 1,
              maxWidth: 260,
              background: palette.siteBg,
              border: `1px solid ${palette.rule}`,
              borderRadius: 10,
              padding: "9px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span
                style={{
                  fontFamily: poppins,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: 1.3,
                  color: palette.teal,
                }}
              >
                {field.label}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <FieldIcon kind={field.icon} />
              <span style={{ fontFamily: poppins, fontSize: 15, fontWeight: 600, color: palette.ink }}>
                {field.value}
              </span>
            </div>
          </div>
        );
      })}

      <div style={{ flex: 1 }} />

      <div
        style={{
          opacity: fadeSlide(frame, T.searchFieldStart + 3 * T.searchFieldStep, 20, 12).opacity,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: palette.ink,
          borderRadius: 10,
          padding: "0 22px",
        }}
      >
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
          <circle cx={11} cy={11} r={6.5} stroke={palette.cream} strokeWidth={1.8} />
          <path d="M20 20l-4.3-4.3" stroke={palette.cream} strokeWidth={1.8} strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: poppins, fontSize: 14, fontWeight: 600, color: palette.cream }}>
          10 stays found
        </span>
      </div>
    </div>
  );
};
