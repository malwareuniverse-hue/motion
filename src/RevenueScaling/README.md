# RevenueScaling — VRMA Nashville, "Revenue at scale" (90s)

Four compositions, one component. The 16:9 and 9:16 cuts share every beat,
every timing and every component — only the layout differs, and all of that
lives in `layout.ts`.

| Composition | Size | What it renders |
| --- | --- | --- |
| `RevenueScaling` | 1920×1080 | The finished 16:9 piece — backdrop, B-roll, grain, graphics, brand system. |
| `RevenueScalingOverlays` | 1920×1080 | Graphics only over transparency, for compositing onto Emile's A-roll. |
| `RevenueScalingVertical` | 1080×1920 | The finished 9:16 piece. |
| `RevenueScalingVerticalOverlays` | 1080×1920 | 9:16 graphics only over transparency. |

Render the overlay cuts with `--codec=prores --prores-profile=4444`, or as a
PNG sequence — h.264 has no alpha channel.

## Beat map

All timings live in `timeline.ts` (30fps) and are shared by both formats.
Re-time there against the final audio; nothing else needs touching.

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

## How the two aspect ratios share one build

`layout.ts` resolves the safe margin, the type scale, and the two grids that
have to re-flow; components read those tokens through `useLayout()` and never
branch on raw pixel dimensions. What changes between formats:

- **The "more" stack** — three columns of two in 16:9, a single column of six
  in 9:16.
- **Work harder vs. build a process** — side by side in 16:9, stacked in 9:16.
- **The enterprise grid** — 4×3 in 16:9, 3×4 in 9:16. The scattered start
  positions are fractions of the frame, so they fill either one.
- **`MORE DOORS ≠ MORE PROFIT`** — one line set left in 16:9 (leaving the right
  third as open footage); three centred lines in 9:16, with the ≠ on its own.
- **B-roll placeholders** — the doors slot drops from seven doorways to four,
  and the portfolio plates scale up, so neither reads as thin bars in portrait.

To add a beat, put its timing in `timeline.ts` and its geometry in `layout.ts`
for both formats; that keeps the two cuts from drifting apart.

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

Source vertical clips for the 9:16 cut where you can — the layer uses
`objectFit: cover`, so a 16:9 clip is centre-cropped hard in portrait. Raise or
lower a slot's `scrim` (0–1) if a real clip needs more or less headroom under
the typography.

## Visual system

Palette is in `theme.ts` — near-black `#0B0C0E` and charcoal `#1B1D21` foundation,
soft white `#F3F1EC` statements, muted gray `#A7A7A5` secondary, deep navy `#172033`
as the only tonal lift, and warm gold `#C9A45C` reserved for emphasis: one or two
words per frame, the rules that draw on, and the event.
