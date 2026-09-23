import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { T } from "./timeline";
import { clamp } from "./utils";
import { LiquidPanel } from "./LiquidPanel";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { poppins } from "./fonts";
import { palette } from "./theme";

const PANEL_W = 370;
const PANEL_H = 530;
const PANEL_TOP = (1080 - PANEL_H) / 2 - 10; // slightly above center
const PANEL_EDGE = 58;

export const MovingPictureScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Both panels slide in simultaneously from their respective sides
  const leftEnter = clamp(frame, [T.panelIn, T.panelIn + T.panelInDur], [-(PANEL_W + PANEL_EDGE + 40), 0], (t) => 1 - Math.pow(1 - t, 3));
  const leftOpacity = clamp(frame, [T.panelIn, T.panelIn + 20], [0, 1]);

  const rightEnter = clamp(frame, [T.panelIn, T.panelIn + T.panelInDur], [PANEL_W + PANEL_EDGE + 40, 0], (t) => 1 - Math.pow(1 - t, 3));
  const rightOpacity = clamp(frame, [T.panelIn, T.panelIn + 20], [0, 1]);

  // Conclusion text strip at the very bottom
  const conclusionFade = clamp(frame, [T.conclusionAt, T.conclusionAt + 30], [0, 1]);
  const conclusionOut = clamp(frame, [T.end - 30, T.end - 10], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        // Transparent so it composites over Emile's footage in the NLE
        background: "transparent",
      }}
    >
      {/* ═══ LEFT PANEL ═══ */}
      <LiquidPanel
        side="left"
        width={PANEL_W}
        height={PANEL_H}
        top={PANEL_TOP}
        left={PANEL_EDGE}
        opacity={leftOpacity}
        translateX={leftEnter}
      >
        <LeftPanel />
      </LiquidPanel>

      {/* ═══ RIGHT PANEL ═══ */}
      <LiquidPanel
        side="right"
        width={PANEL_W}
        height={PANEL_H}
        top={PANEL_TOP}
        right={PANEL_EDGE}
        opacity={rightOpacity}
        translateX={rightEnter}
      >
        <RightPanel />
      </LiquidPanel>

      {/* ═══ CONCLUSION STRIP ═══ */}
      {frame >= T.conclusionAt && (
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: conclusionFade * conclusionOut,
          }}
        >
          <div style={{
            padding: "10px 28px",
            borderRadius: 50,
            background: "rgba(9, 11, 18, 0.78)",
            border: `1px solid rgba(201, 164, 92, 0.35)`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              fontFamily: poppins,
              fontSize: 14,
              fontWeight: 500,
              color: palette.creamSoft,
              letterSpacing: 0.4,
            }}>
              Don&apos;t compare a{" "}
              <span style={{ color: palette.gold, fontWeight: 600 }}>
                moving picture
              </span>
              {" "}to a{" "}
              <span style={{ color: palette.gold, fontWeight: 600 }}>
                finished photo
              </span>
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
