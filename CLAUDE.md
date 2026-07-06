# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio for **Анна Белова (Anna Belova), product designer** — a
bio header followed by 7 case studies. Built from a Figma design as **vanilla HTML/CSS/JS
(ES modules), no build step, no framework, no dependencies**. ~600 LOC total.

The design lives in Figma (see `docs/superpowers/asset-manifest.md` for file key + node ids);
Figma is the source of truth for layout, colors, and copy.

## Commands

There is no build, lint, or test step — it's static files served as-is.

- **Run locally:** `python3 serve.py 5555`, then open `http://localhost:5555`.
  `serve.py` is a `SimpleHTTPRequestHandler` that adds `Cache-Control: no-store` so edits
  show up on reload without cache-busting.
- **Share on LAN/Wi-Fi:** `serve.py` binds `0.0.0.0` by default, so `python3 serve.py 8000`
  is reachable at `http://<machine-LAN-IP>:8000` from other devices on the same network
  (subject to the OS firewall / VPN / AP-isolation). Second arg overrides host:
  `python3 serve.py 8000 127.0.0.1`.
- **Preview in Claude Code:** the `portfolio` config in `.claude/launch.json` runs `serve.py`
  on 5555 — use `preview_start`/`preview_*` tools, not raw Bash, to run and verify.

## Editing content

**All copy, images, tags, links, and per-case config live in `js/data.js` — it's the only file
to touch to change content.** `main.js` renders everything from the `bio` object and `cases[]`
array. Per case: `tags[]`, `title` (wrap the highlighted fragment in `**double asterisks**`),
`accent` (color of that fragment, or `null`), `client` (italic line, or `null`), `img` (image
box), and `summary[]` (array of paragraph strings shown beside the image — one `<p>` each). The
`bio` object has `credentials[]` (plain-text pills, e.g. "6 лет в UX") and `actions[]` (the
CV / TG buttons: `{ label, href, variant: "ghost" | "tg" }`) — rendered both top-right in the
header and in the footer.

## Architecture (the parts that span multiple files)

**Data-driven render.** `js/main.js` builds the whole DOM from `js/data.js` at load: `renderBio`,
`renderCase`, and `renderFooter` create `<section/footer class="block …">` nodes and append them
to `#app`. The CV/TG buttons come from `bio.actions` via the shared `buildActions()` helper — the
same data drives both the bio header (`.bio__actions`) and the footer (`.footer__actions`). There
is no templating engine and no HTML for content in `index.html` (just `#app` + the theme toggle).

**Showcase image system (non-obvious).** Each case image is a composition of layers positioned in
**raw Figma design pixels**. `data.js` stores `img.w/h` (the design box size) and `layers[]` with
`box:[x,y,w,h]`, `radius`, and `crop:[l,t,w,h]%` (inner-image position; `null` = `object-fit:cover`).
`buildMedia`/`buildLayer` render the box at literal design px, and `sizeShowcases()` sets
`transform: scale(columnWidth / designWidth)` on `.showcase` to fit its column while preserving
exact positioning. `sizeShowcases()` runs on load + resize and **owns the `.showcase` transform** —
don't set that transform elsewhere. Spans `data.js` (model) → `main.js` (build + scale) →
`styles.css` (`.showcase`/`.layer`).

**Reveal-on-scroll (this is the scroll model — not a carousel).** The page is a normal vertical
scroll; every block stays visible. Animatable elements get `class="reveal"` + `style="--i:<n>"`
(stagger index). `html.js .reveal` hides them (opacity 0 + translateY); an `IntersectionObserver`
in `main.js` adds `.is-in` to each `.block` once as it enters the viewport, and CSS transitions
them in with a per-element delay from `--i`. `document.documentElement.classList.add("js")` gates
the hiding so content is visible if JS fails. On load the page force-scrolls to top so blocks
reveal in sequence. Respects `prefers-reduced-motion` (reveal disabled).

**Theming (light/dark).** CSS custom properties on `:root` (dark is the default); light overrides
live under `:root[data-theme="light"]` and `@media (prefers-color-scheme: light)`. So the site
follows the OS by default, and the toggle button (`#theme-toggle`, wired in `main.js`) sets an
explicit `data-theme` persisted in `localStorage`. An **inline script in `index.html <head>`**
applies the saved theme before first paint (avoids a flash) — keep it there. `index.html` also
declares `<meta name="color-scheme">` and `<meta name="darkreader-lock">` so the Dark Reader
extension leaves the site's own colors alone. Per-case title accents are darkened on light
backgrounds via `--accent-ink` (`color-mix`) so light hues (e.g. the green) stay readable; brand
accents are used as-is on dark.

## Fonts (and the Cyrillic rule)

- **`Rubik`** (`--font-rubik`, self-hosted, split latin + cyrillic per weight with
  `unicode-range`): **500** for the bio name/role, case titles, and the CV/TG action buttons;
  **400** for tags/pills; **300 italic** for client names. The system stack (`--font-sans`) is
  now only the fallback inside `--font-rubik` (SF Pro is no longer used directly).
- **`JetBrains Mono`** (`--font-mono`, self-hosted, latin + cyrillic): the **bio paragraph** and
  **case summaries**. It has full Cyrillic, so it's safe for the Russian body copy — this replaced
  **Intel One Mono**, which has **no Cyrillic glyphs** and could not render the Russian text. The
  Cyrillic rule still stands: never put Russian copy in a font that lacks Cyrillic glyphs.

## Assets

Case images are downloaded from Figma into `assets/<case-id>/`. **Figma asset URLs expire ~7 days**,
so images are always pulled into the repo, never hotlinked. When refreshing from a new Figma
revision: re-fetch each node's `get_design_context`, download the new URLs, and update
`js/data.js` + `docs/superpowers/asset-manifest.md` (the node→file→coordinates mapping).

## Where the design intent is recorded

`docs/superpowers/` holds the original spec (`specs/`), the implementation plan (`plans/`), and
`asset-manifest.md` (Figma node ids, per-case background colors, and layer coordinates). Consult
the manifest before touching showcase layer geometry.
