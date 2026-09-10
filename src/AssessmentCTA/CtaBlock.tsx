import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import {
  CONTENT_W,
  CTA_RULE_Y,
  CTA_TEXT,
  CTA_Y,
  LINK_TEXT,
  LINK_Y,
  PAD_LEFT,
  T,
  URL_TEXT,
  URL_Y,
} from "./timeline";

export const CtaBlock: React.FC = () => {
  const frame = useCurrentFrame();

  const rule = clampedInterp(
    frame,
    [T.ctaRuleStart, T.ctaRuleStart + T.ctaRuleDur],
    [0, CONTENT_W],
    easeOutCubic,
  );
  const link = fadeSlide(frame, T.linkStart, T.linkDur, 10);
  const cta = fadeSlide(frame, T.ctaStart, T.ctaDur, 16);
  const url = fadeSlide(frame, T.urlStart, T.urlDur, 10);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: CTA_RULE_Y,
          width: rule,
          height: 1,
          background: palette.hairline,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: LINK_Y,
          whiteSpace: "nowrap",
          opacity: link.opacity,
          transform: `translateY(${link.translateY}px)`,
          fontFamily: poppins,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: 4.5,
          color: palette.mutedGray,
        }}
      >
        {LINK_TEXT}
      </span>
      <span
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: CTA_Y,
          whiteSpace: "nowrap",
          opacity: cta.opacity,
          transform: `translateY(${cta.translateY}px)`,
          fontFamily: poppins,
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: 0.8,
          color: palette.softWhite,
        }}
      >
        {CTA_TEXT}
      </span>
      <span
        style={{
          position: "absolute",
          left: PAD_LEFT,
          top: URL_Y,
          whiteSpace: "nowrap",
          opacity: url.opacity,
          transform: `translateY(${url.translateY}px)`,
          fontFamily: poppins,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 2.6,
          color: palette.warmGold,
        }}
      >
        {URL_TEXT}
      </span>
    </>
  );
};
