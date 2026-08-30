import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";
import { T } from "./timeline";

export const BROWSER_CHROME_HEIGHT = 56;

export const BrowserChrome: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = clampedInterp(frame, [T.chromeInStart, T.chromeInStart + T.chromeInDur], [0, 1]);

  return (
    <div
      style={{
        height: BROWSER_CHROME_HEIGHT,
        background: palette.chrome,
        borderBottom: `1px solid ${palette.chromeBorder}`,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 18,
        opacity,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#E5605A" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#E8B84B" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#5FB56A" }} />
      </div>
      <div
        style={{
          flex: 1,
          height: 30,
          borderRadius: 8,
          background: "#FFFFFF",
          border: `1px solid ${palette.chromeBorder}`,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8,
        }}
      >
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
          <rect x={5} y={11} width={14} height={9} rx={2} stroke={palette.inkFaint} strokeWidth={1.6} />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={palette.inkFaint} strokeWidth={1.6} />
        </svg>
        <span style={{ fontFamily: poppins, fontSize: 13, color: palette.inkSoft, fontWeight: 500 }}>
          havenlist.example/search?market=asheville-nc
        </span>
      </div>
    </div>
  );
};
