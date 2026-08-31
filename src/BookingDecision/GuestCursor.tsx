import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeInOutCubic } from "./utils";
import { OPTIONS, T, cursorBlend, cursorTarget } from "./timeline";
import { CursorIcon } from "./icons";

const posA = cursorTarget(OPTIONS[0]);
const posB = cursorTarget(OPTIONS[1]);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const GuestCursor: React.FC = () => {
  const frame = useCurrentFrame();

  const blend = cursorBlend(frame, easeInOutCubic);
  const x = lerp(posA.x, posB.x, blend);
  const y = lerp(posA.y, posB.y, blend);

  const opacityIn = clampedInterp(frame, [T.cursorInStart, T.cursorInStart + T.cursorInDur], [0, 1]);
  const opacityOut = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + 16], [1, 0]);
  const opacity = Math.min(opacityIn, opacityOut);

  if (opacity <= 0) return null;

  const color = palette.cream;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: "translate(-6px, -4px)",
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
      }}
    >
      <CursorIcon color={color} size={30} />
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 14,
          whiteSpace: "nowrap",
          background: palette.panel,
          border: `1px solid ${palette.panelBorderLift}`,
          borderRadius: 8,
          padding: "4px 10px",
        }}
      >
        <span style={{ fontFamily: poppins, fontSize: 12, fontWeight: 600, color: palette.creamSoft }}>
          Guest comparing options
        </span>
      </div>
    </div>
  );
};

export const cardGlow = (frame: number, id: "A" | "B") => {
  const blend = cursorBlend(frame, easeInOutCubic);
  const opacityIn = clampedInterp(frame, [T.cursorInStart, T.cursorInStart + T.cursorInDur], [0, 1]);
  const opacityOut = clampedInterp(frame, [T.toFinalStart, T.toFinalStart + 16], [1, 0]);
  const opacity = Math.min(opacityIn, opacityOut);
  return id === "A" ? opacity * (1 - blend) : opacity * blend;
};
