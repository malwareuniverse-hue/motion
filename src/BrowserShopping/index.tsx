import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { clampedInterp, springIn } from "./utils";
import { BrowserChrome } from "./BrowserChrome";
import { SearchBar } from "./SearchBar";
import { CardTrack } from "./CardTrack";
import { ClosingStatement } from "./ClosingStatement";
import { T } from "./timeline";

export const BrowserShoppingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const windowIn = springIn(frame, 0, fps, { damping: 20, stiffness: 90, mass: 0.9 });
  const windowScale =
    clampedInterp(windowIn, [0, 1], [0.94, 1]) * clampedInterp(frame, [0, durationInFrames], [1, 1.02]);
  const windowOpacity = clampedInterp(frame, [0, 14], [0, 1]);

  const uiFade = clampedInterp(frame, [T.fadeUiStart, T.fadeUiStart + T.fadeUiDur], [1, 0]);
  const uiScale = clampedInterp(frame, [T.fadeUiStart, T.fadeUiStart + T.fadeUiDur], [1, 0.96]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${palette.stageTop} 0%, ${palette.stageBottom} 100%)`,
      }}
    >
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: uiFade }}>
        <div
          style={{
            width: 1800,
            height: 900,
            borderRadius: 18,
            overflow: "hidden",
            background: palette.siteBg,
            boxShadow: "0 60px 120px -40px rgba(0,0,0,0.6)",
            opacity: windowOpacity,
            transform: `scale(${windowScale * uiScale})`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BrowserChrome />
          <SearchBar />
          <div style={{ flex: 1, display: "flex", alignItems: "flex-start", padding: "0 0 0 40px", background: palette.siteBg }}>
            <CardTrack />
          </div>
        </div>
      </AbsoluteFill>

      <ClosingStatement />
    </AbsoluteFill>
  );
};
