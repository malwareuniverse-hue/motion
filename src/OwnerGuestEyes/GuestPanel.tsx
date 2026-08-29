import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { T } from "./timeline";
import { fadeSlide, springIn, clampedInterp } from "./utils";
import { PanelHeader } from "./PanelHeader";
import { ListingStack } from "./ListingStack";
import { QuestionBubble } from "./QuestionBubble";

export const GuestPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = springIn(frame, T.panelsStart, fps);
  const panelX = interpolate(enter, [0, 1], [64, 0]);
  const panelOpacity = interpolate(enter, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const header = fadeSlide(frame, T.headerStart, T.headerDur, 10);

  const questionProgress = clampedInterp(
    frame,
    [T.questionStart, T.questionStart + T.questionDur],
    [0, 1],
  );
  const emphasize = clampedInterp(
    frame,
    [T.emphasizeStart, T.emphasizeStart + T.emphasizeDur],
    [0, 1],
  );
  const recede = clampedInterp(
    frame,
    [T.emphasizeStart, T.emphasizeStart + T.emphasizeDur],
    [0, 1],
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 70px",
        opacity: panelOpacity,
        transform: `translateX(${panelX}px)`,
      }}
    >
      <div style={{ width: "100%", maxWidth: 660, marginBottom: 26 }}>
        <PanelHeader label="GUEST EYES" color={palette.teal} opacity={header.opacity} translateY={header.translateY} />
      </div>

      <div style={{ width: "100%", maxWidth: 500 }}>
        <ListingStack recede={recede} />
      </div>

      <div style={{ width: "100%", maxWidth: 500, marginTop: 30 }}>
        <QuestionBubble progress={questionProgress} emphasize={emphasize} />
      </div>
    </div>
  );
};
