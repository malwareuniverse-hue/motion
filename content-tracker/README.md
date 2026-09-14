# Content Tracker

A single-file, offline personal tracker for content production across Maynard's
channels — **Pricing by Mira / Emile Sael**, **Mira Hospitality**, and
**Revenue Academy**.

It's a kanban board that follows the real 7-step editing pipeline plus a final
published state:

**Intake → Rough cut → Graphics → Second pass → Captions → Music → Export → Published**

## How to open

Just open `index.html` in any modern browser — double-click it, or drag it into
a browser tab. There is **no build step, no server, and no internet connection
required**. Everything (HTML, CSS, JavaScript) lives in that one file.

## What it does

- **Kanban board** with one column per stage. Drag cards between columns to move
  a piece through the pipeline.
- **Cards** show the title, a color-coded channel badge and format badge, the due
  date (with a subtle "soon"/"overdue" highlight), and the target platform(s).
- **Add / edit / delete** content via a modal form (title, channel, format, stage,
  platform, due date, notes). Channels can be picked from the list or typed in as
  a custom value.
- **Search & filter** by title/notes/platform text, channel, and format.
- **Stats bar** showing total items, how many are in progress, and how many are
  published.

## Where your data lives

Your data is stored **locally in the browser** you use (via `localStorage`). It
is not uploaded anywhere. That means:

- Data is **per-browser and per-machine** — opening the file in a different
  browser or on a different computer won't show the same items.
- Clearing your browser's site data will erase it.

## Backups & moving between machines

Use the toolbar buttons:

- **Export JSON** downloads a `.json` snapshot of everything. Do this regularly.
- **Import JSON** loads a snapshot back in (it replaces the current data, after a
  confirmation). Use this to move your board to another browser or machine.

## First run

On first open, the board is seeded with a few clearly-labeled `[EXAMPLE]` cards
so it's obvious how everything works. They're ordinary cards — just click and
delete them once you're ready to add your own.
