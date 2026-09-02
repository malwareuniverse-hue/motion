import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { T } from "./timeline";
import { useLayout } from "./layout";

/**
 * CTA (1:20–1:30). The frame darkens so the lockup is the only thing left,
 * and gold lands once — on the event.
 */
export const EndLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();
  if (frame < T.ctaKickerIn - 20) return null;

  const dim = clampedInterp(
    frame,
    [T.ctaKickerIn - 20, T.ctaKickerIn + 20],
    [0, 0.62],
  );
  const kicker = fadeUp(frame, T.ctaKickerIn, 26, 12);
  const lockup = fadeUp(frame, T.ctaLockupIn, 30, 16);
  const rule = clampedInterp(
    frame,
    [T.ctaRuleIn, T.ctaRuleIn + 26],
    [0, 1],
    easeOutCubic,
  );
  const growth = fadeUp(frame, T.ctaGrowthIn, 28, 14);
  const event = fadeUp(frame, T.ctaEventIn, 28, 14);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.black,
          opacity: dim,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: l.portrait ? 22 : 26,
        }}
      >
        <div
          style={{
            fontFamily: poppins,
            fontSize: l.portrait ? 18 : 20,
            fontWeight: 600,
            letterSpacing: l.portrait ? 4 : 5,
            color: palette.gold,
            opacity: kicker.opacity,
            transform: `translateY(${kicker.translateY}px)`,
          }}
        >
          COME FIND US
        </div>

        <div
          style={{
            fontFamily: poppins,
            fontSize: l.type.lockup,
            fontWeight: 800,
            letterSpacing: 1.4,
            color: palette.white,
            opacity: lockup.opacity,
            transform: `translateY(${lockup.translateY}px)`,
          }}
        >
          PRICING BY MIRA
        </div>

        <div
          style={{
            width: l.portrait ? 160 : 200,
            height: 1,
            background: palette.rule,
            transform: `scaleX(${rule})`,
            transformOrigin: "center",
          }}
        />

        <div
          style={{
            fontFamily: poppins,
            fontSize: l.portrait ? 34 : 40,
            fontWeight: 500,
            letterSpacing: 1,
            color: palette.whiteSoft,
            opacity: growth.opacity,
            transform: `translateY(${growth.translateY}px)`,
          }}
        >
          Let&rsquo;s talk growth
        </div>

        <div
          style={{
            fontFamily: poppins,
            fontSize: l.portrait ? 21 : 24,
            fontWeight: 600,
            letterSpacing: l.portrait ? 5 : 7,
            color: palette.gold,
            marginTop: 6,
            opacity: event.opacity,
            transform: `translateY(${event.translateY}px)`,
          }}
        >
          VRMA · NASHVILLE
        </div>
      </div>
    </>
  );
};
