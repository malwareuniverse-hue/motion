import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeSlide } from "./utils";
import { MiraMark } from "./icons";
import {
  BRAND_NAME,
  CARD_BUTTON,
  CARD_HEADLINE,
  CARD_SUBHEAD,
  CARD_TIME_NOTE,
  CTA_TEXT,
  LINK_TEXT,
  T,
} from "./timeline";

/**
 * A recreation of the assessment page's own card — logo, headline, subhead,
 * button and time note all match the reference screenshot's verified copy,
 * standing in for the page itself rather than the placeholder wording
 * AssessmentCTA had to invent when pricingbymira.com was blocked.
 */
export const AssessmentCard: React.FC = () => {
  const frame = useCurrentFrame();

  const stage2Recede = clampedInterp(
    frame,
    [T.stage2RecedeStart, T.stage2RecedeStart + T.stage2RecedeDur],
    [0, 1],
    easeOutCubic,
  );
  const stage3Bg = clampedInterp(
    frame,
    [T.stage3BgStart, T.stage3BgStart + T.stage3BgDur],
    [1, 0],
    easeOutCubic,
  );

  const cardReveal = fadeSlide(frame, T.assessmentCardIn, T.assessmentCardDur, 26);
  const link = fadeSlide(frame, T.linkTextIn, T.linkTextDur, 16);
  const cta = fadeSlide(frame, T.ctaTextIn, T.ctaTextDur, 18);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: stage2Recede * stage3Bg,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <div
          style={{
            width: 900,
            borderRadius: 22,
            background: palette.charcoal,
            border: `1px solid ${palette.hairline}`,
            padding: "44px 60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
            opacity: cardReveal.opacity,
            transform: `translateY(${cardReveal.translateY}px)`,
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <MiraMark size={44} />
            <span
              style={{
                fontFamily: poppins,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 3,
                color: palette.warmGold,
              }}
            >
              {BRAND_NAME}
            </span>
          </div>

          <span
            style={{
              maxWidth: "92%",
              fontFamily: poppins,
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.3,
              color: palette.warmGold,
              textAlign: "center",
            }}
          >
            {CARD_HEADLINE}
          </span>

          <span
            style={{
              maxWidth: "86%",
              fontFamily: poppins,
              fontSize: 20,
              fontWeight: 400,
              lineHeight: 1.5,
              color: palette.mutedGraySoft,
              textAlign: "center",
            }}
          >
            {CARD_SUBHEAD}
          </span>

          <div
            style={{
              marginTop: 8,
              padding: "16px 40px",
              borderRadius: 10,
              background: palette.warmGold,
            }}
          >
            <span
              style={{
                fontFamily: poppins,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: palette.nearBlack,
              }}
            >
              {CARD_BUTTON}
            </span>
          </div>

          <span
            style={{
              fontFamily: poppins,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 1,
              color: palette.mutedGray,
            }}
          >
            {CARD_TIME_NOTE}
          </span>
        </div>

        <span
          style={{
            opacity: link.opacity,
            transform: `translateY(${link.translateY}px)`,
            fontFamily: poppins,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 2.4,
            color: palette.softWhite,
            textAlign: "center",
          }}
        >
          {LINK_TEXT}
        </span>

        <span
          style={{
            maxWidth: "80%",
            opacity: cta.opacity,
            transform: `translateY(${cta.translateY}px)`,
            fontFamily: poppins,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 0.4,
            color: palette.warmGold,
            textAlign: "center",
          }}
        >
          {CTA_TEXT}
        </span>
      </div>
    </div>
  );
};
