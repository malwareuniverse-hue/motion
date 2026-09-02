import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme";
import { poppins } from "./fonts";
import { clampedInterp, springIn } from "./utils";
import { CAPTION_LINES, type CaptionLine } from "./timeline";

const EXIT_PAD = 8; // frames reserved at the end of a line for the fade-out

const CaptionPhrase: React.FC<{ line: CaptionLine }> = ({ line }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = springIn(frame, line.start, fps, {
    damping: 16,
    stiffness: 220,
    mass: 0.6,
  });
  const exit = clampedInterp(frame, [line.end - EXIT_PAD, line.end], [1, 0]);
  const opacity = Math.min(enter, exit);

  // Karaoke highlight: which word is "being spoken" right now.
  const spoken = clampedInterp(
    frame,
    [line.start, line.end - EXIT_PAD],
    [0, line.words.length],
  );
  const activeIndex = Math.min(Math.floor(spoken), line.words.length - 1);

  const cardScale = 0.9 + enter * 0.1;
  const cardY = (1 - enter) * 26;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px 20px",
        maxWidth: 880,
        padding: "34px 44px",
        borderRadius: 28,
        background: "rgba(10, 12, 15, 0.55)",
        border: `1px solid ${palette.rule}`,
        boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
      }}
    >
      {line.words.map((word, i) => {
        // Per-word pop as the phrase enters (staggered).
        const wordEnter = springIn(frame, line.start + i * 2, fps, {
          damping: 18,
          stiffness: 240,
          mass: 0.5,
        });

        const isActive = i === activeIndex;
        const isKey = Boolean(word.key);
        // Gold is the single accent: key words stay gold, and the currently
        // spoken (karaoke) word flashes gold as it passes; everything else is
        // soft white.
        const color = isKey || isActive ? palette.gold : palette.softWhite;
        const scale = (0.86 + wordEnter * 0.14) * (isActive ? 1.05 : 1);

        return (
          <span
            key={`${word.text}-${i}`}
            style={{
              display: "inline-block",
              transform: `scale(${scale})`,
              fontFamily: poppins,
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: 0.5,
              color,
              textShadow: "0 6px 24px rgba(0,0,0,0.5)",
            }}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
};

export const CaptionStack: React.FC = () => {
  const frame = useCurrentFrame();
  const active = CAPTION_LINES.find((l) => frame >= l.start && frame < l.end);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "58%",
        display: "flex",
        justifyContent: "center",
        padding: "0 60px",
      }}
    >
      {active ? <CaptionPhrase key={active.start} line={active} /> : null}
    </div>
  );
};
