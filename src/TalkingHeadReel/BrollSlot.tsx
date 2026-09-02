import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp } from "./utils";

// Placeholder for a B-roll window. Sits full-frame over the background and is
// meant to be swapped for real footage in the editor, e.g.:
//
//   <OffthreadVideo src={staticFile("broll-vrma.mp4")}
//     style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
//
// It carries a labelled shot description (a corner tag) so the intended footage
// is obvious; captions layer on top. See the B-roll shot list in the PR notes.
export const BrollSlot: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity =
    clampedInterp(frame, [0, 12], [0, 1]) *
    clampedInterp(frame, [durationInFrames - 12, durationInFrames], [1, 0]);

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {/* subtle placeholder fill (real footage replaces this whole layer) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 22px, rgba(255,255,255,0.045) 22px 44px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 20px",
          borderRadius: 12,
          background: "rgba(11,12,14,0.7)",
          border: `1px solid ${palette.gold}`,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 3,
            color: palette.gold,
          }}
        >
          B-ROLL
        </span>
        <span
          style={{
            fontFamily: poppins,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 1,
            color: palette.softWhiteSoft,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
