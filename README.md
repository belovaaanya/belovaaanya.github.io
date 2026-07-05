# Anna Belova — Portfolio

A dark, monospace, single-page portfolio. Eight full-screen "page-like" slides
(bio + 7 design cases) that change one at a time on scroll, with layered-depth
parallax between them. Built with vanilla HTML/CSS/JS + GSAP (no build step).

## Run

```bash
python3 serve.py 5555      # no-cache static server
# then open http://localhost:5555
```

Any static server works (the included `serve.py` just disables caching for
development). No install or build step.

## Navigate

- **Wheel / trackpad** — one notch = one slide
- **Keyboard** — ↑/↓, PageUp/PageDown, Home/End
- **Dots** (right edge) — click to jump to a slide
- **Mobile** — slides stack and use native scroll-snap

Honors `prefers-reduced-motion` (disables parallax and eased transitions).

## Edit the content

All copy, tags, links, and images live in **`js/data.js`** — the only file you
need to touch to swap content:

- `bio` — name, role, photo, contact tags (CV / TG links), and bio text.
- `cases[]` — per case: `title`, `description` (array of paragraphs), `tags`
  (two), `link`, background `bg`, and the showcase image `layers`.

Each showcase layer uses raw Figma design-pixel coordinates (`box`, `radius`,
`crop`, `depth`); the showcase is rendered at its `dw × dh` design size and
scaled to fit its column. See `docs/superpowers/asset-manifest.md` for the
source mapping.

## Layout

```
index.html            markup + script/style includes
css/styles.css        all styles + responsive + reduced-motion
js/data.js            content (edit here)
js/main.js            renders slides from data, scales showcases, boots nav
js/nav.js             desktop paging + mobile scroll-snap nav + dots
js/parallax.js        layered-depth parallax on transitions
vendor/               GSAP + ScrollTrigger (vendored)
fonts/                Intel One Mono (self-hosted)
assets/               showcase images
docs/superpowers/     design spec, implementation plan, asset manifest
```
