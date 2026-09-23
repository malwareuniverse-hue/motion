import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { TESTS, T } from "./timeline";
import { GlassTestPill } from "./GlassTestPill";

/**
 * Stage C: header lockup + five glass pills appearing on cue.
 * The whole stage fades in as one block (opacity managed by the parent),
 * while each pill independently times its own entrance from fadeSlide.
 */
export const TestList: React.FC = () => {
  const frame = useCurrentFrame();

  const header = fadeSlide(frame, T.listTransStart, T.listTransDur, 14);
  const ruleW = clampedInterp(
    frame,
    [T.listTransStart + 8, T.listTransStart + 30],
    [0, 180],
    easeOutCubic,
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        paddingTop: 40,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginBottom: 22,
          opacity: header.opacity,
          transform: `translateY(${header.translateY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: poppins,
            fontSize: 20,
            fontWeight: 600,
            color: palette.mutedGray,
            letterSpacing: 5,
          }}
        >
          THE 5 MARKET TESTS
        </span>
        <div
          style={{
            width: ruleW,
            height: 2,
            background: palette.warmGold,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Pills */}
      {TESTS.map((spec) => (
        <GlassTestPill key={spec.id} spec={spec} />
      ))}
    </div>
  );
};
