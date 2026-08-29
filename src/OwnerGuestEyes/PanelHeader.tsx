import React from "react";
import { poppins } from "./fonts";
import { EyeIcon } from "./icons";

type Props = {
  label: string;
  color: string;
  opacity: number;
  translateY: number;
};

export const PanelHeader: React.FC<Props> = ({ label, color, opacity, translateY }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      opacity,
      transform: `translateY(${translateY}px)`,
    }}
  >
    <EyeIcon color={color} size={20} />
    <span
      style={{
        fontFamily: poppins,
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: 3.4,
        color,
      }}
    >
      {label}
    </span>
  </div>
);
