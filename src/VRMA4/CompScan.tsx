import React from "react";
import { useCurrentFrame } from "remotion";
import { palette } from "./theme";
import { clampedInterp, easeInOutCubic, fadeRise, seeded } from "./utils";
import { COMP_SCAN, COMP_SCAN_DURATION, SAFE_X, WIDTH } from "./timeline";
import {
  DrawRule,
  LabelBar,
  Numeral,
  PhotoBlock,
  SceneShell,
  Surface,
} from "./primitives";

/**
 * 0:07-0:19  "this obsession with what are my comps charging"
 *
 * An operator's comparison surface: three competitor listings stacked, a rate
 * calendar strip beneath them, and a single gold selection frame moving from
 * one listing to the next. The idea in the frame is comparison - nothing else.
 */

const CARD_W = WIDTH - SAFE_X * 2;
const CARD_H = 268;
const CARD_GAP = 34;
const FIRST_CARD_Y = 520;
const cardY = (i: number) => FIRST_CARD_Y + i * (CARD_H + CARD_GAP);

const LISTINGS = [
  { rate: "412", nights: "28", titleW: 300, metaW: 176 },
  { rate: "398", nights: "22", titleW: 246, metaW: 202 },
  { rate: "455", nights: "31", titleW: 322, metaW: 158 },
];

const CALENDAR_RATES = ["388", "402", "412", "429", "455", "441", "398"];

const ListingRow: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const listing = LISTINGS[index];
  const rise = fadeRise(frame, COMP_SCAN.cardIn[index], 16, 12);

  return (
    <Surface
      style={{
        position: "absolute",
        left: SAFE_X,
        top: cardY(index),
        width: CARD_W,
        height: CARD_H,
        padding: 26,
        display: "flex",
        gap: 26,
        alignItems: "center",
        opacity: rise.opacity,
        transform: `translateY(${rise.translateY}px)`,
      }}
    >
      <PhotoBlock width={214} height={CARD_H - 52} seed={index} />
      <div
        style={{
          flex: 1,
          height: CARD_H - 52,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 6,
          paddingBottom: 6,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <LabelBar
            width={listing.titleW}
            height={10}
            color={palette.whiteFaint}
          />
          <LabelBar width={listing.metaW} height={7} />
          <LabelBar width={listing.metaW * 0.62} height={7} opacity={0.6} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
          <Numeral value={listing.rate} size={44} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              paddingBottom: 6,
            }}
          >
            <LabelBar width={54} height={6} opacity={0.5} />
            <Numeral
              value={listing.nights}
              size={17}
              color={palette.gray}
              weight={500}
            />
          </div>
        </div>
      </div>
    </Surface>
  );
};

/** One gold selection frame that rests, moves, rests - never more than one. */
const SelectionFrame: React.FC = () => {
  const frame = useCurrentFrame();
  const [h0, h1, h2] = COMP_SCAN.scanHold;
  const move = COMP_SCAN.scanMove;

  const position =
    frame < h1
      ? 0
      : frame < h2
        ? clampedInterp(frame, [h1, h1 + move], [0, 1], easeInOutCubic)
        : 1 + clampedInterp(frame, [h2, h2 + move], [0, 1], easeInOutCubic);

  const top = FIRST_CARD_Y + position * (CARD_H + CARD_GAP);
  const opacity = clampedInterp(frame, [h0 - 12, h0], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: SAFE_X - 10,
        top: top - 10,
        width: CARD_W + 20,
        height: CARD_H + 20,
        border: `1.5px solid ${palette.gold}`,
        borderRadius: 18,
        opacity: opacity * 0.85,
      }}
    />
  );
};

/** Compact seven-column rate strip - the calendar the comparison lives in. */
const RateStrip: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = fadeRise(frame, COMP_SCAN.calendarIn, 18, 12);
  const stripY = cardY(2) + CARD_H + 56;

  return (
    <Surface
      style={{
        position: "absolute",
        left: SAFE_X,
        top: stripY,
        width: CARD_W,
        padding: "26px 22px",
        display: "flex",
        justifyContent: "space-between",
        opacity: rise.opacity,
        transform: `translateY(${rise.translateY}px)`,
      }}
    >
      {CALENDAR_RATES.map((rate, i) => {
        const cellIn = clampedInterp(
          frame,
          [COMP_SCAN.calendarIn + 8 + i * 3, COMP_SCAN.calendarIn + 24 + i * 3],
          [0, 1],
        );
        return (
          <div
            key={rate}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              opacity: cellIn,
            }}
          >
            <LabelBar width={20} height={5} opacity={0.45} />
            <Numeral
              value={rate}
              size={22}
              weight={500}
              color={i === 4 ? palette.gold : palette.whiteSoft}
            />
            <div
              style={{
                width: 34,
                height: 3,
                borderRadius: 2,
                background: i === 4 ? palette.gold : palette.grayFaint,
                opacity: 0.5 + seeded(i) * 0.35,
              }}
            />
          </div>
        );
      })}
    </Surface>
  );
};

export const CompScan: React.FC = () => {
  const frame = useCurrentFrame();
  const header = fadeRise(frame, COMP_SCAN.surfaceIn, 18, 10);

  return (
    <SceneShell duration={COMP_SCAN_DURATION} outStart={COMP_SCAN.outStart}>
      {/* Window header: hairline chrome only, no readable copy. */}
      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: 350,
          width: WIDTH - SAFE_X * 2,
          opacity: header.opacity,
          transform: `translateY(${header.translateY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <LabelBar width={132} height={9} color={palette.whiteFaint} />
          <LabelBar width={68} height={7} opacity={0.5} />
        </div>
        <DrawRule
          start={COMP_SCAN.surfaceIn + 6}
          dur={24}
          width={WIDTH - SAFE_X * 2}
          height={1}
          color={palette.hairlineStrong}
        />
      </div>

      {LISTINGS.map((_, i) => (
        <ListingRow key={i} index={i} />
      ))}
      <SelectionFrame />
      <RateStrip />
    </SceneShell>
  );
};
