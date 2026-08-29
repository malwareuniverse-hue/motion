import React from "react";
import { AbsoluteFill } from "remotion";
import { BokehBackground } from "./BokehBackground";
import { BrandBug } from "./BrandBug";
import { LowerThird } from "./LowerThird";
import { CaptionBar } from "./CaptionBar";
import { EndLockup } from "./EndLockup";
import { CAPTIONS } from "./timeline";

export const MiraIntroScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <BokehBackground />

      {/*
        Drop Emile's real talking-head clip in as the background layer once
        it's available, e.g.:
          <OffthreadVideo src={staticFile("emile-intro.mp4")} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        placed just above <BokehBackground /> (or replacing it). The caption /
        lower-third / brand system below is timed independently and will sit
        on top unchanged. Re-time the CAPTIONS array in timeline.ts to the
        real voiceover once you share the audio track.
      */}

      <BrandBug />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "68%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          {CAPTIONS.map((beat) => (
            <div key={beat.text} style={{ position: "absolute" }}>
              <CaptionBar beat={beat} />
            </div>
          ))}
        </div>
      </div>

      <LowerThird />

      <EndLockup />
    </AbsoluteFill>
  );
};
