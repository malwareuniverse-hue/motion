# RevenueScaling — VRMA Nashville, "Revenue at scale" (90s)

Two compositions, one component:

| Composition | What it renders |
| --- | --- |
| `RevenueScaling` | The finished piece — backdrop, B-roll, grain, graphics, brand system. |
| `RevenueScalingOverlays` | Graphics only over transparency, for compositing onto Emile's A-roll. Render with `--codec=prores --prores-profile=4444`, or as a PNG sequence. |

## Beat map

All timings live in `timeline.ts` (30fps). Re-time there against the final audio;
nothing else needs touching.

| VO | Frames | Beat |
| --- | --- | --- |
| 0:01 | 14–354 | Hook — "adding 50 more properties… it multiplies the problem" |
| 0:12 | 372–622 | `MORE DOORS ≠ MORE PROFIT` over the doors B-roll |
| 0:20 | 606–778 | Key statement — "is your revenue operation actually ready?" |
| 0:26 | 782–960 | 30 → 100 properties counter |
| 0:32 | 962–1422 | The "more" stack → exponentially more decisions |
| 0:47 | 1420–1708 | Work harder (struck through) vs. build a revenue process |
| 0:57 | 1716–1826 | Emile alone + lower third — no full-screen graphic |
| 1:00 | 1800–1990 | VRMA · Nashville event card |
| 1:07 | 2028–2398 | Property by property → an enterprise-level revenue system |
| 1:20 | 2404–2700 | CTA lockup |

Only one graphic is on screen at a time, by design.

## Dropping in footage

**A-roll.** Put the clip in `public/` and add, in `index.tsx` directly above
`<BRollLayer />`:

```tsx
<OffthreadVideo
  src={staticFile("emile-vrma.mp4")}
  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
/>
```

**B-roll.** Each slot in the `BROLL` array in `timeline.ts` renders a procedural
placeholder until you name a real file on its `src` field — then the layer swaps
to `<OffthreadVideo>` automatically, keeping the same in/out timing and scrim.
Every slot carries its exact stock search phrases:

| Slot | Frames | Search phrases |
| --- | --- | --- |
| `hook-portfolio` | 0–356 | aerial drone vacation rental neighborhood dusk · modern short term rental exterior twilight warm windows · luxury property portfolio architecture slow pan |
| `doors-portfolio` | 344–652 | hotel corridor doors warm lighting slow dolly · vacation rental front door keyless entry close up · hand unlocking smart lock rental property |
| `nashville-skyline` | 1706–2016 | Nashville skyline blue hour aerial · Nashville downtown evening cinematic drone · hospitality conference expo hall professionals talking |
| `cta-portfolio` | 2384–2700 | business professionals meeting conference lobby warm light · handshake hospitality conference networking · Nashville skyline night slow aerial |

Raise or lower a slot's `scrim` (0–1) if a real clip needs more or less headroom
under the typography.

## Visual system

Palette is in `theme.ts` — near-black `#0B0C0E` and charcoal `#1B1D21` foundation,
soft white `#F3F1EC` statements, muted gray `#A7A7A5` secondary, deep navy `#172033`
as the only tonal lift, and warm gold `#C9A45C` reserved for emphasis: one or two
words per frame, the rules that draw on, and the event.
