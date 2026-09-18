import React from "react";
import { palette } from "./theme";
import { poppins } from "./fonts";

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = palette.warmGold,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={10.5} stroke={color} strokeWidth={1.6} />
    <path
      d="M7.5 12.5L10.3 15.3L16.5 9"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A recreation of the Mira Hospitality mark from the reference screenshot —
 * an interlocking M/H monogram inside a thin ring — built in Poppins rather
 * than traced from the source image, since the composition only ever draws
 * vector shapes and type.
 */
export const MiraMark: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      style={{ position: "absolute", inset: 0 }}
    >
      <circle
        cx={28}
        cy={28}
        r={26}
        stroke={palette.warmGold}
        strokeWidth={1.4}
        fill="none"
      />
    </svg>
    <span
      style={{
        fontFamily: poppins,
        fontSize: size * 0.42,
        fontWeight: 700,
        letterSpacing: -1,
        color: palette.warmGold,
      }}
    >
      MH
    </span>
  </div>
);
