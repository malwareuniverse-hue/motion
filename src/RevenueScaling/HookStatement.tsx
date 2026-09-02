import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { GoldRule, headlineStyle } from "./Primitives";
import { useLayout } from "./layout";
import { T } from "./timeline";

/**
 * HOOK (0:01–0:11). The premise, then the verdict. Gold lands on the two words
 * that carry the argument: the count of doors, and what actually happens to
 * a broken system when you add them.
 */
export const HookStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();

  const opacity = beatOpacity(frame, T.hookLine1In, 1, T.hookOut, T.hookOutDur);
  if (opacity <= 0) return null;

  const l1 = fadeUp(frame, T.hookLine1In, 28);
  const l2 = fadeUp(frame, T.hookLine2In, 28);
  const rule = clampedInterp(
    frame,
    [T.hookRuleIn, T.hookRuleIn + 24],
    [0, 1],
    easeOutCubic,
  );
  const verdict = fadeUp(frame, T.hookVerdictIn, 26, 14);
  const multiply = fadeUp(frame, T.hookMultiplyIn, 26, 14);
  const underline = clampedInterp(
    frame,
    [T.hookMultiplyIn + 12, T.hookMultiplyIn + 40],
    [0, 1],
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
        gap: l.portrait ? 26 : 34,
        padding: `0 ${l.margin}px`,
        textAlign: "center",
        opacity,
      }}
    >
      <div>
        <div
          style={{
            ...headlineStyle(l),
            opacity: l1.opacity,
            transform: `translateY(${l1.translateY}px)`,
          }}
        >
          ADDING <span style={{ color: palette.gold }}>50 MORE</span> PROPERTIES
        </div>
        <div
          style={{
            ...headlineStyle(l),
            marginTop: 8,
            opacity: l2.opacity,
            transform: `translateY(${l2.translateY}px)`,
          }}
        >
          TO A BROKEN REVENUE SYSTEM
        </div>
      </div>

      <GoldRule progress={rule} width={l.portrait ? 150 : 200} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontFamily: poppins,
            fontSize: l.portrait ? 32 : 40,
            fontWeight: 500,
            letterSpacing: 1.2,
            color: palette.gray,
            opacity: verdict.opacity,
            transform: `translateY(${verdict.translateY}px)`,
          }}
        >
          DOESN&rsquo;T CREATE SCALE.
        </div>
        <div
          style={{
            fontFamily: poppins,
            fontSize: l.portrait ? 40 : 52,
            fontWeight: 700,
            letterSpacing: 0.6,
            color: palette.white,
            opacity: multiply.opacity,
            transform: `translateY(${multiply.translateY}px)`,
          }}
        >
          IT <span style={{ color: palette.gold }}>MULTIPLIES</span> THE
          PROBLEM.
        </div>
        <div
          style={{
            alignSelf: "center",
            width: Math.min(420, l.width - l.margin * 2),
            height: 1,
            marginTop: 6,
            background: palette.goldRule,
            transform: `scaleX(${underline})`,
            transformOrigin: "center",
          }}
        />
      </div>
    </div>
  );
};
