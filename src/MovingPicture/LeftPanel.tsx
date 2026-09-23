import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { T } from "./timeline";
import { clamp, fadeUp, pulse } from "./utils";
import { FilmIcon, TimelineIcon } from "./icons";
import { BookingTimeline } from "./BookingTimeline";

const LABEL: React.FC<{ children: React.ReactNode; color?: string; size?: number; weight?: number; opacity?: number }> = ({
  children, color = palette.slate, size = 10, weight = 600, opacity = 1,
}) => (
  <span style={{
    fontFamily: poppins,
    fontSize: size,
    fontWeight: weight,
    letterSpacing: 2.2,
    color,
    opacity,
    textTransform: "uppercase",
  }}>
    {children}
  </span>
);

export const LeftPanel: React.FC = () => {
  const frame = useCurrentFrame();

  // Icon animation (film scroll)
  const iconProgress = clamp(frame, [T.iconAnimAt, T.iconAnimAt + T.iconAnimDur], [0, 1]);
  const filmScroll = clamp(frame, [T.occupancyAt, T.occupancyAt + 60], [0, 11]);

  // Header fade-in
  const header = fadeUp(frame, T.iconAnimAt, 30);

  // Timeline progress
  const timelineProgress = clamp(frame, [T.occupancyAt, T.occupancyAt + T.occupancyFillDur], [0, 1]);

  // Journey A reveals at scenarioA
  const journeyAProgress = clamp(frame, [T.scenarioAAt, T.scenarioAAt + T.scenarioADur], [0, 1]);
  // Journey B reveals at scenarioB
  const journeyBProgress = clamp(frame, [T.scenarioBAt, T.scenarioBAt + T.scenarioBDur], [0, 1]);

  // Question state: pulsing question dot
  const questionPhase = clamp(frame, [T.questionAt, T.questionAt + T.questionDur], [0, 1]);
  const questionPulse = pulse(frame, 28, 0) * questionPhase;

  // Same point reference
  const samePointPhase = clamp(frame, [T.samePointAt, T.samePointAt + T.samePointDur], [0, 1]);

  // Conclusion glow
  const conclusionGlow = clamp(frame, [T.conclusionAt, T.conclusionAt + 24], [0, 1]);

  // What highlight to apply to the timeline
  const highlight =
    frame >= T.divergeAt ? "both" :
    frame >= T.scenarioBAt ? "B" :
    frame >= T.scenarioAAt ? "A" :
    undefined;

  // "65% MARKET" label
  const occupancyLabel = fadeUp(frame, T.occupancyAt + 20, 22);

  // Scenario labels
  const scenALabel = fadeUp(frame, T.scenarioAAt + 10, 22);
  const scenBLabel = fadeUp(frame, T.scenarioBAt + 10, 22);

  // Diverge emphasis
  const divergeEmphasis = fadeUp(frame, T.divergeAt, T.divergeDur);

  // Conclusion label
  const conclusionFade = fadeUp(frame, T.conclusionAt, 30);

  const showSamePoint = frame >= T.samePointAt;
  const showLabels = frame >= T.scenarioAAt;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 0 }}>
      {/* ─── Header ─── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: header.opacity,
          transform: `translateY(${header.translateY}px)`,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: palette.goldFaint,
            border: `1px solid rgba(201,164,92,${0.22 + conclusionGlow * 0.44})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: conclusionGlow > 0
              ? `0 0 ${12 + conclusionGlow * 18}px ${palette.goldGlow}`
              : "none",
          }}
        >
          <FilmIcon
            color={palette.gold}
            size={24}
            scrollOffset={filmScroll}
          />
        </div>
        <div>
          <div>
            <LABEL color={palette.gold} size={9}>The Moving Picture</LABEL>
          </div>
          <div style={{ fontFamily: poppins, fontSize: 13, fontWeight: 600, color: palette.cream, lineHeight: 1.2, marginTop: 1 }}>
            How bookings came in
          </div>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div style={{
        height: 1,
        background: `linear-gradient(to right, ${palette.glassBorder}, transparent)`,
        marginBottom: 18,
        opacity: header.opacity,
      }} />

      {/* ─── Timeline track icon ─── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
        opacity: clamp(frame, [T.occupancyAt - 10, T.occupancyAt + 10], [0, 1]),
      }}>
        <TimelineIcon color={palette.gold} size={28} progress={timelineProgress} />
        <div
          style={{
            opacity: occupancyLabel.opacity,
            transform: `translateY(${occupancyLabel.translateY}px)`,
          }}
        >
          <span style={{ fontFamily: poppins, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: palette.cream }}>
            65%
          </span>
          <span style={{ fontFamily: poppins, fontSize: 9, fontWeight: 500, letterSpacing: 1.5, color: palette.slate, marginLeft: 6 }}>
            WEEKEND RESULT
          </span>
        </div>
      </div>

      {/* ─── Question pulse ─── */}
      {questionPhase > 0 && frame < T.scenarioAAt && (
        <div
          style={{
            marginBottom: 10,
            opacity: questionPhase,
          }}
        >
          <div style={{
            fontFamily: poppins,
            fontSize: 11,
            fontWeight: 500,
            color: palette.creamSoft,
            lineHeight: 1.55,
          }}>
            <span style={{ color: palette.gold, opacity: 0.7 + questionPulse * 0.3 }}>When</span>
            {" "}did those bookings happen?
          </div>
        </div>
      )}

      {/* ─── Booking timeline chart ─── */}
      <div
        style={{
          opacity: clamp(frame, [T.scenarioAAt - 20, T.scenarioAAt], [0, 1]),
          marginBottom: 14,
        }}
      >
        <BookingTimeline
          progressA={journeyAProgress}
          progressB={journeyBProgress}
          highlight={highlight}
          showSamePoint={showSamePoint}
          showLabels={showLabels}
        />
      </div>

      {/* ─── Scenario A label ─── */}
      {frame >= T.scenarioAAt && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
            opacity: scenALabel.opacity * (highlight === "B" ? 0.32 : 1),
            transform: `translateY(${scenALabel.translateY}px)`,
          }}
        >
          <div style={{
            width: 3,
            height: 28,
            borderRadius: 2,
            background: palette.teal,
            flexShrink: 0,
          }} />
          <div>
            <div style={{ fontFamily: poppins, fontSize: 10, fontWeight: 700, letterSpacing: 1.4, color: palette.teal }}>
              SCENARIO A
            </div>
            <div style={{ fontFamily: poppins, fontSize: 10, fontWeight: 500, color: palette.creamSoft, marginTop: 1 }}>
              Already 60% booked
            </div>
          </div>
        </div>
      )}

      {/* ─── Scenario B label ─── */}
      {frame >= T.scenarioBAt && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
            opacity: scenBLabel.opacity * (highlight === "A" ? 0.32 : 1),
            transform: `translateY(${scenBLabel.translateY}px)`,
          }}
        >
          <div style={{
            width: 3,
            height: 28,
            borderRadius: 2,
            background: palette.amber,
            flexShrink: 0,
          }} />
          <div>
            <div style={{ fontFamily: poppins, fontSize: 10, fontWeight: 700, letterSpacing: 1.4, color: palette.amber }}>
              SCENARIO B
            </div>
            <div style={{ fontFamily: poppins, fontSize: 10, fontWeight: 500, color: palette.creamSoft, marginTop: 1 }}>
              Only 20% — filled last minute
            </div>
          </div>
        </div>
      )}

      {/* ─── Diverge / conclusion ─── */}
      <div style={{ flexGrow: 1 }} />

      {frame >= T.divergeAt && (
        <div
          style={{
            paddingTop: 12,
            borderTop: `1px solid ${palette.glassBorder}`,
            opacity: divergeEmphasis.opacity,
            transform: `translateY(${divergeEmphasis.translateY}px)`,
          }}
        >
          <div style={{
            fontFamily: poppins,
            fontSize: 11,
            fontWeight: 600,
            color: frame >= T.conclusionAt ? palette.gold : palette.creamSoft,
            lineHeight: 1.5,
            letterSpacing: 0.3,
            transition: "color 0.4s",
          }}>
            Same destination.{"\n"}
            <span style={{ color: palette.gold }}>Completely different story.</span>
          </div>
        </div>
      )}

      {frame >= T.conclusionAt && (
        <div
          style={{
            marginTop: 8,
            opacity: conclusionFade.opacity,
            transform: `translateY(${conclusionFade.translateY}px)`,
          }}
        >
          <LABEL color={palette.gold} size={8} opacity={0.8}>
            Don&apos;t compare a moving picture
          </LABEL>
        </div>
      )}
    </div>
  );
};
