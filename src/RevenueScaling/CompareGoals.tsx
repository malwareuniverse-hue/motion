import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { beatOpacity, clampedInterp, easeOutCubic, fadeUp } from "./utils";
import { useLayout, type Layout } from "./layout";
import { T } from "./timeline";

const kickerStyle = (color: string, l: Layout): React.CSSProperties => ({
  fontFamily: poppins,
  fontSize: l.portrait ? 16 : 17,
  fontWeight: 600,
  letterSpacing: l.portrait ? 3.8 : 4.6,
  color,
});

/** Column geometry: side by side in 16:9, stacked in 9:16. */
const columns = (l: Layout) =>
  l.portrait
    ? {
        w: l.width - l.margin * 2,
        h: 240,
        rejected: { left: l.margin, top: 540 },
        real: { left: l.margin, top: 880 },
        captionTop: 1310,
      }
    : {
        w: 720,
        h: 268,
        rejected: { left: l.margin, top: 348 },
        real: { left: 1000, top: 348 },
        captionTop: 736,
      };

/**
 * WORK HARDER vs. A PROCESS THAT COMPOUNDS (0:47–0:56). The rejected goal is
 * stated first, then dimmed and ruled through as the real one arrives in gold.
 */
export const CompareGoals: React.FC = () => {
  const frame = useCurrentFrame();
  const l = useLayout();
  const col = columns(l);

  const opacity = beatOpacity(
    frame,
    T.harderIn,
    1,
    T.compareOut,
    T.compareOutDur,
  );
  if (opacity <= 0) return null;

  const left = fadeUp(frame, T.harderIn, 28);
  const dim = clampedInterp(frame, [T.harderDim, T.harderDim + 30], [1, 0.4]);
  const strike = clampedInterp(
    frame,
    [T.harderDim, T.harderDim + 26],
    [0, 1],
    easeOutCubic,
  );
  const right = fadeUp(frame, T.systemIn, 30);
  const rightBar = clampedInterp(
    frame,
    [T.systemIn, T.systemIn + 24],
    [0, 1],
    easeOutCubic,
  );
  const caption = fadeUp(frame, T.systemCaptionIn, 28, 14);

  const headline: React.CSSProperties = {
    fontFamily: poppins,
    fontSize: l.type.h2,
    letterSpacing: 0.4,
    lineHeight: 1.16,
  };

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {/* rejected goal */}
      <div
        style={{
          position: "absolute",
          left: col.rejected.left,
          top: col.rejected.top,
          width: col.w,
          height: col.h,
          opacity: left.opacity * dim,
          transform: `translateY(${left.translateY}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          borderLeft: `1px solid ${palette.rule}`,
          paddingLeft: 40,
        }}
      >
        <div style={kickerStyle(palette.graySoft, l)}>THE GOAL ISN&rsquo;T</div>
        <div style={{ position: "relative", alignSelf: "flex-start" }}>
          <div style={{ ...headline, fontWeight: 600, color: palette.gray }}>
            WORK HARDER
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "52%",
              height: 2,
              background: palette.gray,
              opacity: 0.7,
              transform: `scaleX(${strike})`,
              transformOrigin: "left",
            }}
          />
        </div>
      </div>

      {/* the real goal */}
      <div
        style={{
          position: "absolute",
          left: col.real.left,
          top: col.real.top,
          width: col.w,
          height: col.h,
          opacity: right.opacity,
          transform: `translateY(${right.translateY}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          paddingLeft: 40,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: palette.gold,
            transform: `scaleY(${rightBar})`,
            transformOrigin: "center",
          }}
        />
        <div style={kickerStyle(palette.gold, l)}>THE GOAL IS</div>
        <div style={{ ...headline, fontWeight: 700, color: palette.white }}>
          BUILD A REVENUE
          <br />
          PROCESS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: col.captionTop,
          padding: `0 ${l.margin}px`,
          textAlign: "center",
          fontFamily: poppins,
          fontSize: l.portrait ? 28 : 32,
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: 0.6,
          color: palette.gray,
          opacity: caption.opacity,
          transform: `translateY(${caption.translateY}px)`,
        }}
      >
        that becomes{" "}
        <span style={{ color: palette.gold, fontWeight: 600 }}>
          more powerful
        </span>{" "}
        as the company grows.
      </div>
    </div>
  );
};
