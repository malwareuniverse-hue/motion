# VRMA Reel 4 — B-roll set

Vertical **1080×1920 @ 30fps**. Nine Remotion compositions, all prefixed `VRMA4-`
in the Remotion Studio sidebar.

These are **inserts, not the reel.** Emile's camera track is the spine. Everything
here cuts in underneath the sections listed below and gets trimmed to length in
Premiere. Durations are cut a little long on purpose so the editor has handles.

> **Deviation on record:** the PBM system specifies horizontal 16:9 / 3840×2160
> for full-screen graphics. This is a vertical reel, so the set is built 9:16.
> Everything else — palette, typography, motion, composition rules — is unchanged.

---

## Where Emile stays on camera

This is the answer to "where should I keep Emile." **Seven locked on-camera
sections**, matching the plan's quality-control list. Nothing in this folder
should ever cover his face, and no insert is built to run under these lines.

| Time | Line | Treatment |
|---|---|---|
| 0:00–0:07 | "Your competitors should not be deciding your revenue strategy." | **Emile, full.** Thesis and hook. Editorial punch-in landing on *revenue strategy*. Captions only — no graphic. |
| 0:19–0:24 | "Your competitors don't know your revenue target." | **Emile, full.** Slight crop-in at most. Let him land *your revenue target*. |
| 0:38–0:43 | "So why would you blindly follow them?" | **Emile, full.** B-roll stops completely. This is the pivot from problem to method. No visual metaphor. |
| 0:43 | "At Pricing by Mirror, we're looking at something much bigger." | **Start on Emile.** The montage begins on the *next* phrase, not this one. |
| 1:04–1:11 | "Because the best operators aren't constantly reacting to everybody else." | **Emile, full.** No stressed-operator or notification footage. |
| 1:11–1:17 | "They create the standard everyone else eventually reacts to." | **Emile through "They create the standard…"**, then cut to premium market/portfolio footage under "…everyone else eventually reacts to." |
| 1:22–end | "If you want your portfolio position to lead its market instead of just chasing it, come see me." | **Emile, and stay there.** Optional compact lower third only. Never a CTA panel. |

Rhythm: give Emile 2–4 uninterrupted seconds on each of these. The densest
B-roll block is **0:43–1:04** — before and after it, the cutting opens back up.

---

## Cut list

| Time | Script cue | Source |
|---|---|---|
| 0:00–0:07 | "…deciding your revenue strategy." | **Emile** |
| 0:07–0:19 | "…obsession with what are my comps charging." | `VRMA4-CompScan` (8s) |
| 0:19–0:24 | "…don't know your revenue target." | **Emile** |
| 0:24 | "…don't know your booking history." | `VRMA4-BookingHistory` (4s) |
| 0:24–0:32 | "They don't know your guest" | `VRMA4-GuestSignal` (4s) — or Option B guest-arrival stock, ~1.5s |
| 0:32–0:38 | "…no idea whether their strategy is actually working." | `VRMA4-SurfacePrice` (7s) |
| 0:38–0:43 | "So why would you blindly follow them?" | **Emile** |
| 0:43 | "…looking at something much bigger." | **Emile** |
| 0:43–0:49 | "Market pace," / "booking windows," | `VRMA4-MarketPace` (4s) + `VRMA4-BookingWindows` (4s) — or either one alone as a single 2–3s beat |
| 0:49–0:54 | "property positioning," / "historical behavior," | **Stock** — premium listing + operator reviewing it; then a performance-history shot |
| 0:54–0:58 | "supply, demand," | **Stock aerial** — deliberately off the screens. Nothing built here. |
| 0:58–1:04 | "revenue targets," | **Stock** — operator reviewing portfolio performance. No dollar signs. |
| 0:58–1:04 | "…where we believe the market is going next." | `VRMA4-ForwardView` (5s), then cut to a human decision-maker |
| 0:43–1:04 | (whole montage) | `VRMA4-DecisionSet` (21s) — optional framework overlay, see below |
| 1:04–1:17 | "…best operators…" / "…create the standard…" | **Emile**, then brief premium destination/portfolio stock |
| 1:17–1:22 | "…bringing to VRMA Nashville this year." | **Actual VRMA footage first**, then event/Nashville stock |
| 1:22–end | "…lead its market instead of just chasing it, come see me." | **Emile** + optional `VRMA4-VrmaLowerThird` (5s) |

### Still shot on stock, on purpose

Supply/demand aerials, property positioning, revenue-target review, the guest
arrival (Option B), premium portfolio imagery, and VRMA Nashville are **not**
built here. They need real footage — a rendered version would look synthetic
next to Emile. Search phrases for each are in the production plan. Actual VRMA
footage always beats generic conference stock.

---

## Compositions

| ID | Duration | Cuts under |
|---|---|---|
| `VRMA4-CompScan` | 8s | 0:07–0:19 — three competitor listings, one gold selection frame moving between them, rate strip below. 2–3 sub-shots live inside this clip; cut it into pieces of 1.5–2s. |
| `VRMA4-BookingHistory` | 4s | 0:24 — settled history, twelve completed periods, trailing average. Deliberately a different data structure than the comps shot. |
| `VRMA4-GuestSignal` | 4s | 0:24–0:32 — the operator's own guest-behaviour data: lead time, stay length, returning share. No faces. Cut to ~1.5s. |
| `VRMA4-SurfacePrice` | 7s | 0:32–0:38 — four public listings. The rate resolves; the performance rows underneath never do. No red X, no question mark, no "bad strategy". |
| `VRMA4-MarketPace` | 4s | 0:43–0:49 — cumulative pace against prior period. |
| `VRMA4-BookingWindows` | 4s | 0:43–0:49 — lead-time buckets over a forward calendar; bookings concentrate further out. |
| `VRMA4-ForwardView` | 5s | 0:58–1:04 — known curve, then a hairline projection with a widening confidence band. Predictive, not historical. **End the montage on the human shot after this, not on the software.** |
| `VRMA4-DecisionSet` | 21s | 0:43–1:04 — the optional framework. See below. |
| `VRMA4-VrmaLowerThird` | 5s | 1:22–end — compact event lower third, lower-left safe area. |

### `VRMA4-DecisionSet` — the optional framework

Only use it if the montage footage starts repeating. Seven terms, script
terminology verbatim, one revealing as Emile says it:

> Market pace · Booking windows · Property positioning · Historical behavior ·
> Supply · Demand · Revenue targets

"…where we believe the market is going next" is deliberately **not** an eighth
label — that line stays Emile's.

- `transparent: false` → full-frame charcoal beat.
- `transparent: true` → keys over Emile or the montage. Render with alpha:
  `npx remotion render VRMA4-DecisionSet out/decision-set.mov --codec=prores --prores-profile=4444 --props='{"transparent":true}'`
- Reveal timings are in `timeline.ts` → `DECISION_SET.itemIn`, as frame offsets
  from 0:43.0. **These are the only numbers in the folder that must sit on the
  word** — nudge them against the real VO once the camera track is down.

### `VRMA4-VrmaLowerThird`

⚠️ **Wording needs Maynard's confirmation.** Defaults are placeholders pulled
from Emile's own line — `label: "COME SEE ME AT"`, `headline: "VRMA Nashville"`.
Swap them for the approved VRMA template copy via `defaultProps` before render.
Renders with alpha the same way as above.

---

## Rules the set is built to

- **No headline typography inside the B-roll.** Every dashboard label is an
  abstract bar, not readable copy — captions and labels go on in Premiere. The
  framework graphic is the single deliberate exception, because the plan
  specifies its exact wording.
- **Locked palette only** (`theme.ts`): near-black `#0B0C0E`, charcoal `#1B1D21`,
  warm gold `#C9A45C`, soft white `#F3F1EC`, muted gray `#A7A7A5`. No teal, no
  rose, no green/red up-down signalling — this set is graded away from the
  earlier scenes in this repo on purpose.
- **No currency symbols.** Rates are numerals only.
- **One dominant idea per frame.** If a panel stopped clarifying the point, it
  was removed rather than decorated.
- **Motion:** soft fades, 8–12 frame rise, gold line draw-on, sequential reveals,
  a restrained 100%→98.5% push. No bounce, spin, glow, or whip.
- Content sits inside a 96px horizontal safe margin with the lower ~420px kept
  clear for burned-in captions.

## Rendering

```bash
npm run dev                                   # Remotion Studio
npx remotion render VRMA4-CompScan out/comp-scan.mp4
npx remotion still  VRMA4-DecisionSet out/frame.png --frame=480
```

Poppins is served from `public/fonts` via `src/fonts/poppins.ts` rather than
fetched from Google at render time, so renders work offline and in CI. Every
scene in the repo now shares that loader.

Alpha passes (framework overlay, lower third) need ProRes 4444 or WebM:

```bash
npx remotion render VRMA4-VrmaLowerThird out/lower-third.mov \
  --codec=prores --prores-profile=4444 --props='{"transparent":true}'
```

Nothing here is approved — it is a first pass for Maynard's review.
