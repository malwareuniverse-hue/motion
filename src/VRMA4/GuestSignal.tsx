import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import { GUEST_SIGNAL, GUEST_SIGNAL_DURATION, SAFE_X, WIDTH } from "./timeline";
import { DrawRule, LabelBar, Numeral, SceneShell, Surface } from "./primitives";

/**
 * 0:24-0:32  "They don't know your guest"
 *
 * Option A from the plan - the operator's own guest-behaviour data, not smiling
 * family stock. Three compact rows: lead-time shape, stay length, returning
 * share. No faces, no icons.
 */

const PANEL_W = WIDTH - SAFE_X * 2;
const LEAD_TIME = [0.22, 0.41, 0.68, 0.92, 0.74, 0.55, 0.38, 0.26, 0.18, 0.12];

const Row: React.FC<{
  index: number;
  height: number;
  children: React.ReactNode;
}> = ({ index, height, children }) => {
  const frame = useCurrentFrame();
  const rise = fadeRise(frame, GUEST_SIGNAL.rowIn[index], 16, 12);

  return (
    <Surface
      style={{
        width: PANEL_W,
        height,
        padding: 34,
        display: "flex",
        alignItems: "center",
        gap: 30,
        opacity: rise.opacity,
        transform: `translateY(${rise.translateY}px)`,
      }}
    >
      {children}
    </Surface>
  );
};

const LeadTimeHistogram: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        height: 130,
        flex: 1,
      }}
    >
      {LEAD_TIME.map((v, i) => {
        const start =
          GUEST_SIGNAL.histogramStart + i * GUEST_SIGNAL.histogramStagger;
        const grow = clampedInterp(
          frame,
          [start, start + 16],
          [0, 1],
          easeOutCubic,
        );
        const peak = v > 0.85;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: 130 * v * grow,
              borderRadius: 3,
              background: peak ? palette.goldFaint : "rgba(167,167,165,0.12)",
              borderTop: `2px solid ${peak ? palette.gold : palette.graySoft}`,
            }}
          />
        );
      })}
    </div>
  );
};

/** Returning-guest share as a thin arc. Draws once, then holds. */
const ShareArc: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = clampedInterp(
    frame,
    [GUEST_SIGNAL.arcStart, GUEST_SIGNAL.arcStart + GUEST_SIGNAL.arcDur],
    [0, 0.34],
    easeOutCubic,
  );
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <svg width={132} height={132} viewBox="0 0 132 132">
      <circle
        cx="66"
        cy="66"
        r={r}
        fill="none"
        stroke={palette.hairlineStrong}
        strokeWidth={4}
      />
      <circle
        cx="66"
        cy="66"
        r={r}
        fill="none"
        stroke={palette.gold}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={`${c * progress} ${c}`}
        transform="rotate(-90 66 66)"
      />
    </svg>
  );
};

export const GuestSignal: React.FC = () => {
  return (
    <SceneShell
      duration={GUEST_SIGNAL_DURATION}
      outStart={GUEST_SIGNAL.outStart}
    >
      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 560,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <Row index={0} height={250}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              width: 150,
            }}
          >
            <LabelBar width={132} height={9} color={palette.whiteFaint} />
            <LabelBar width={88} height={7} opacity={0.55} />
            <DrawRule
              start={GUEST_SIGNAL.rowIn[0] + 10}
              dur={16}
              width={44}
              height={2}
            />
          </div>
          <LeadTimeHistogram />
        </Row>

        <Row index={1} height={190}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              flex: 1,
            }}
          >
            <LabelBar width={168} height={9} color={palette.whiteFaint} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <Numeral value="4.6" size={42} />
              <LabelBar width={62} height={7} opacity={0.5} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 30,
                  height: 62,
                  borderRadius: 4,
                  background:
                    i < 3 ? "rgba(201,164,92,0.14)" : "rgba(167,167,165,0.08)",
                  border: `1px solid ${i < 3 ? "rgba(201,164,92,0.40)" : palette.hairline}`,
                }}
              />
            ))}
          </div>
        </Row>

        <Row index={2} height={210}>
          <ShareArc />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              flex: 1,
            }}
          >
            <LabelBar width={196} height={9} color={palette.whiteFaint} />
            <LabelBar width={124} height={7} opacity={0.55} />
            <LabelBar width={92} height={7} opacity={0.35} />
          </div>
          <Numeral value="34" size={40} color={palette.gold} />
        </Row>
      </div>
    </SceneShell>
  );
};
