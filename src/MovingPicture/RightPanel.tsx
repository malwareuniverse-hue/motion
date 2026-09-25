import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { T } from "./timeline";
import { clamp, fadeUp, pulse } from "./utils";
import { CameraIcon, OccupancyRing } from "./icons";

const LABEL: React.FC<{ children: React.ReactNode; color?: string; size?: number; weight?: number }> = ({
  children, color = palette.slate, size = 10, weight = 600,
}) => (
  <span style={{
    fontFamily: poppins,
    fontSize: size,
    fontWeight: weight,
    letterSpacing: 2.2,
    color,
    textTransform: "uppercase",
  }}>
    {children}
  </span>
);

// Mini occupancy bar with label
const ScenarioBar: React.FC<{
  pct: number;
  fillColor: string;
  label: string;
  sublabel: string;
  progress: number;
  dimmed: boolean;
}> = ({ pct, fillColor, label, sublabel, progress, dimmed }) => {
  const barW = Math.round(pct * progress);
  return (
    <div style={{ opacity: dimmed ? 0.30 : 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <span style={{ fontFamily: poppins, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: fillColor, textTransform: "uppercase" }}>
          {label}
        </span>
        <span style={{ fontFamily: poppins, fontSize: 11, fontWeight: 700, color: fillColor }}>
          {pct}%
        </span>
      </div>
      {/* Bar track */}
      <div style={{
        position: "relative",
        height: 6,
        borderRadius: 3,
        background: "rgba(255,255,255,0.07)",
        marginBottom: 5,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: `${barW}%`,
          borderRadius: 3,
          background: fillColor,
          boxShadow: `0 0 8px ${fillColor}55`,
        }} />
      </div>
      <div style={{ fontFamily: poppins, fontSize: 9, fontWeight: 400, color: palette.creamFaint, marginBottom: 2 }}>
        {sublabel}
      </div>
    </div>
  );
};

export const RightPanel: React.FC = () => {
  const frame = useCurrentFrame();

  // Header animate-in
  const header = fadeUp(frame, T.iconAnimAt, 30);

  // Camera aperture rotation for key moments
  const apertureAngle = clamp(frame, [T.questionAt, T.questionAt + T.questionDur], [0, 30]);

  // Conclusion glow
  const conclusionGlow = clamp(frame, [T.conclusionAt, T.conclusionAt + 24], [0, 1]);

  // Big 65% metric
  const metricFade = fadeUp(frame, T.occupancyAt, 28);
  const ringPct = clamp(frame, [T.occupancyAt, T.occupancyAt + T.occupancyFillDur], [0, 65]);

  // Question phase
  const questionPhase = clamp(frame, [T.questionAt, T.questionAt + T.questionDur], [0, 1]);
  const questionPulse = pulse(frame, 28, 14) * questionPhase;

  // "Same point" label
  const samePointFade = fadeUp(frame, T.samePointAt, T.samePointDur);

  // Scenario A
  const scenAFade = fadeUp(frame, T.scenarioAAt, T.scenarioADur);
  const scenABarProgress = clamp(frame, [T.scenarioAAt + 8, T.scenarioAAt + T.scenarioADur + 16], [0, 100]);

  // Scenario B
  const scenBFade = fadeUp(frame, T.scenarioBAt, T.scenarioBDur);
  const scenBBarProgress = clamp(frame, [T.scenarioBAt + 8, T.scenarioBAt + T.scenarioBDur + 16], [0, 100]);

  // Diverge emphasis
  const divergeFade = fadeUp(frame, T.divergeAt, T.divergeDur);

  // Conclusion
  const conclusionFade = fadeUp(frame, T.conclusionAt, 30);

  // dimming logic
  const highlightA = frame >= T.scenarioAAt && frame < T.scenarioBAt;
  const highlightB = frame >= T.scenarioBAt && frame < T.divergeAt;
  const showBoth = frame >= T.divergeAt;

  const dimA = showBoth ? false : highlightB;
  const dimB = showBoth ? false : highlightA;

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
          <CameraIcon
            color={palette.gold}
            size={24}
            apertureAngle={apertureAngle}
          />
        </div>
        <div>
          <div>
            <LABEL color={palette.gold} size={9}>The Finished Photo</LABEL>
          </div>
          <div style={{ fontFamily: poppins, fontSize: 13, fontWeight: 600, color: palette.cream, lineHeight: 1.2, marginTop: 1 }}>
            Just the final number
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

      {/* ─── 65% Metric with ring ─── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
          opacity: metricFade.opacity,
          transform: `translateY(${metricFade.translateY}px)`,
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <OccupancyRing
            color={palette.gold}
            size={72}
            pct={ringPct}
            radius={28}
            strokeWidth={3}
          />
          {/* Percentage text inside ring */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: poppins,
              fontSize: 14,
              fontWeight: 700,
              color: palette.gold,
              letterSpacing: -0.5,
            }}>
              {Math.round(ringPct)}%
            </span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: poppins, fontSize: 11, fontWeight: 700, color: palette.cream, letterSpacing: 0.5 }}>
            Market Occupancy
          </div>
          <div style={{ fontFamily: poppins, fontSize: 9, fontWeight: 500, color: palette.slate, letterSpacing: 1.2, marginTop: 3, textTransform: "uppercase" }}>
            Weekend Result
          </div>
          {/* Question overlay */}
          {questionPhase > 0 && frame < T.scenarioAAt && (
            <div style={{
              marginTop: 5,
              opacity: questionPhase,
            }}>
              <span style={{
                fontFamily: poppins,
                fontSize: 9,
                fontWeight: 500,
                color: palette.creamFaint,
                opacity: 0.6 + questionPulse * 0.4,
              }}>
                But when did these book?
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ─── "Same point last year" section ─── */}
      {frame >= T.samePointAt && (
        <div
          style={{
            opacity: samePointFade.opacity,
            transform: `translateY(${samePointFade.translateY}px)`,
            marginBottom: 14,
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 10,
          }}>
            <div style={{ width: 16, height: 1, background: palette.gold, opacity: 0.5, flexShrink: 0 }} />
            <LABEL color={palette.slate} size={8}>Same point last year</LABEL>
          </div>

          {/* Scenario A bar */}
          {frame >= T.scenarioAAt && (
            <div
              style={{
                opacity: scenAFade.opacity,
                transform: `translateY(${scenAFade.translateY}px)`,
                marginBottom: 14,
              }}
            >
              <ScenarioBar
                pct={60}
                fillColor={palette.teal}
                label="Scenario A"
                sublabel="Market already at 60% — steady fill"
                progress={scenABarProgress}
                dimmed={dimA}
              />
            </div>
          )}

          {/* Scenario B bar */}
          {frame >= T.scenarioBAt && (
            <div
              style={{
                opacity: scenBFade.opacity,
                transform: `translateY(${scenBFade.translateY}px)`,
                marginBottom: 14,
              }}
            >
              <ScenarioBar
                pct={20}
                fillColor={palette.amber}
                label="Scenario B"
                sublabel="Only 20% — filled last minute"
                progress={scenBBarProgress}
                dimmed={dimB}
              />
            </div>
          )}
        </div>
      )}

      <div style={{ flexGrow: 1 }} />

      {/* ─── Diverge ─── */}
      {frame >= T.divergeAt && (
        <div
          style={{
            paddingTop: 12,
            borderTop: `1px solid ${palette.glassBorder}`,
            opacity: divergeFade.opacity,
            transform: `translateY(${divergeFade.translateY}px)`,
          }}
        >
          <div style={{
            display: "flex",
            gap: 10,
          }}>
            <div style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 10,
              background: palette.tealBg,
              border: `1px solid rgba(20,160,141,0.25)`,
            }}>
              <div style={{ fontFamily: poppins, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: palette.teal, textTransform: "uppercase", marginBottom: 2 }}>
                Story A
              </div>
              <div style={{ fontFamily: poppins, fontSize: 9, fontWeight: 400, color: palette.creamSoft, lineHeight: 1.4 }}>
                Demand was always there
              </div>
            </div>
            <div style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 10,
              background: palette.amberBg,
              border: `1px solid rgba(212,149,106,0.25)`,
            }}>
              <div style={{ fontFamily: poppins, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: palette.amber, textTransform: "uppercase", marginBottom: 2 }}>
                Story B
              </div>
              <div style={{ fontFamily: poppins, fontSize: 9, fontWeight: 400, color: palette.creamSoft, lineHeight: 1.4 }}>
                Demand showed up late
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Conclusion ─── */}
      {frame >= T.conclusionAt && (
        <div
          style={{
            marginTop: 10,
            opacity: conclusionFade.opacity,
            transform: `translateY(${conclusionFade.translateY}px)`,
          }}
        >
          <LABEL color={palette.gold} size={8}>
            to a finished photo
          </LABEL>
        </div>
      )}
    </div>
  );
};
