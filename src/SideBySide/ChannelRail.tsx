import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, easeOutCubic, fadeRise } from "./utils";
import { AirbnbMark, DirectMark, GoogleMark, VrboMark } from "./BrandMarks";
import {
  CENTER_X,
  CHANNELS,
  CHANNEL_H,
  CHANNEL_LABEL,
  CHANNEL_LABEL_Y,
  CHANNEL_W,
  CHANNEL_Y,
  CONSTRAINTS,
  CONSTRAINT_Y,
  T,
  channelX,
  type Channel,
  type ChannelMark,
  type Constraint,
} from "./timeline";

const ChannelGlyph: React.FC<{ mark: ChannelMark; color: string }> = ({
  mark,
  color,
}) => {
  switch (mark) {
    case "airbnb":
      return <AirbnbMark color={color} />;
    case "vrbo":
      return <VrboMark color={color} fontFamily={poppins} />;
    case "google":
      return <GoogleMark color={color} />;
    default:
      return <DirectMark color={color} />;
  }
};

const ChannelCard: React.FC<{ channel: Channel; index: number }> = ({
  channel,
  index,
}) => {
  const frame = useCurrentFrame();

  const enter = fadeRise(frame, channel.inStart, T.channelDur, 12);
  const rule = clampedInterp(
    frame,
    [channel.inStart + 12, channel.inStart + 34],
    [0, 72],
    easeOutCubic,
  );

  if (enter.opacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: channelX(index),
        top: CHANNEL_Y,
        width: CHANNEL_W,
        height: CHANNEL_H,
        transform: `translate(-50%, -50%) translateY(${enter.translateY}px)`,
        opacity: enter.opacity,
        background: palette.charcoal,
        border: `1px solid ${palette.hairline}`,
        borderRadius: 12,
        boxShadow: "0 26px 52px -34px rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      }}
    >
      <ChannelGlyph mark={channel.mark} color={palette.softWhite} />
      <span
        style={{
          fontFamily: poppins,
          fontSize: 21,
          fontWeight: 500,
          letterSpacing: 4,
          color: palette.mutedGray,
        }}
      >
        {channel.label}
      </span>
      <div
        style={{
          width: rule,
          height: 1,
          background: palette.gold,
          opacity: 0.9,
        }}
      />
    </div>
  );
};

const ConstraintPill: React.FC<{ constraint: Constraint }> = ({
  constraint,
}) => {
  const frame = useCurrentFrame();
  const enter = fadeRise(frame, constraint.inStart, T.constraintDur, 8);

  return (
    <span
      style={{
        transform: `translateY(${enter.translateY}px)`,
        opacity: enter.opacity,
        padding: "12px 26px",
        border: `1px solid ${palette.mutedGrayFaint}`,
        borderRadius: 999,
        fontFamily: poppins,
        fontSize: 18,
        fontWeight: 400,
        letterSpacing: 3,
        color: palette.mutedGray,
        whiteSpace: "nowrap",
      }}
    >
      {constraint.label}
    </span>
  );
};

/** Act 1: the channels the guest shops, and the like-for-like constraints. */
export const ChannelRail: React.FC = () => {
  const frame = useCurrentFrame();

  const label = fadeRise(frame, T.channelLabelIn, T.channelLabelDur, 8);
  const out = clampedInterp(
    frame,
    [T.stage1Out, T.stage1Out + T.stage1OutDur],
    [1, 0],
  );

  if (out <= 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out }}>
      <span
        style={{
          position: "absolute",
          left: CENTER_X,
          top: CHANNEL_LABEL_Y,
          transform: `translate(-50%, -50%) translateY(${label.translateY}px)`,
          opacity: label.opacity,
          fontFamily: poppins,
          fontSize: 19,
          fontWeight: 500,
          letterSpacing: 7,
          color: palette.gold,
          whiteSpace: "nowrap",
        }}
      >
        {CHANNEL_LABEL}
      </span>

      {CHANNELS.map((channel, i) => (
        <ChannelCard key={channel.label} channel={channel} index={i} />
      ))}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CONSTRAINT_Y,
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "center",
          gap: 22,
        }}
      >
        {CONSTRAINTS.map((constraint) => (
          <ConstraintPill key={constraint.label} constraint={constraint} />
        ))}
      </div>
    </div>
  );
};
