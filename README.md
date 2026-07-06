# Анна Белова — Portfolio

A single-page personal portfolio for **Анна Белова (Anna Belova), product designer** — a bio
header, **7 case studies**, and a contact footer. Vanilla HTML/CSS/JS (ES modules), **no build
step, no framework, no dependencies**.

- **Vertical scroll with reveal-on-enter:** every block stays on the page; each fades in + slides
  up once (small stagger across its tags, title, image and text) as it scrolls into view.
- **Light / dark theme** (dark by default), following the OS or an explicit toggle.
- Content is **Russian (Cyrillic)**; the whole page is rendered from data at load — there is no
  content HTML in `index.html`.

**Live:** https://belovaaanya.github.io/

## Run locally

```bash
python3 serve.py 5555      # no-cache static server
# then open http://localhost:5555
```

`serve.py` is a `SimpleHTTPRequestHandler` that sends `Cache-Control: no-store` so edits show up
on reload. It binds `0.0.0.0`, so `python3 serve.py 8000` is reachable from other devices on the
same network at `http://<machine-LAN-IP>:8000` (second arg overrides the host). Any static server
works — there's no build step.

## Deploy

Hosted on **GitHub Pages**, deployed by a **GitHub Actions workflow**
(`.github/workflows/deploy.yml`) on every push to `main` (~1 min). The workflow uploads the repo
root as a static artifact and deploys it, **retrying the deploy step up to 3× with backoff** —
Pages' deploy backend intermittently returns a transient "Deployment failed, try again later".
You can also re-run it manually from the **Actions** tab (`workflow_dispatch`).

## Edit the content

All copy, tags, links and images live in **`js/data.js`** — the only file to touch to change
content. `js/main.js` renders the bio, cases and footer from it.

- `bio`:
  - `name`, `role`, `photo`
  - `credentials` — plain-text pills (e.g. `"6 лет в UX"`)
  - `actions` — contact buttons `{ label, href, variant: "ghost" | "tg", inHeader? }`. All appear
    in the **footer** under `contactTitle`; those marked `inHeader: true` also appear as the
    **top-right header buttons**. `ghost` = translucent, `tg` = solid orange.
  - `contactTitle` — heading above the footer buttons (e.g. `"Свяжитесь со мной"`)
  - `text` — the bio paragraph
- `cases[]` — per case:
  - `tags` — array of short labels (`[]` to omit the row)
  - `title` — wrap the highlighted fragment in `**double asterisks**`
  - `accent` — color of that highlighted fragment (`null` for none)
  - `client` — small italic line under the title (`null` to omit)
  - `img` — the image box: `w`, `h`, `bg`, `radius`, and positioned `layers` (raw Figma design px;
    `crop` = inner `[left%,top%,width%,height%]` or `null` for `object-fit:cover`). Rendered at
    design size and scaled to fit its column.
  - `summary` — array of paragraph strings shown beside the image (one `<p>` each)

Images are stored as **WebP** in `assets/<case-id>/` (converted from Figma PNG exports for fast
loading; conversion preserves pixel dimensions, so `crop` geometry is unaffected).

## Fonts

- Bio name/role, case titles, CV/TG buttons (**500**), tags/pills (**400**), client names
  (**300 italic**): **Rubik** — self-hosted, split latin + cyrillic per weight. The system stack
  is only the fallback.
- Bio paragraph + case summaries: **JetBrains Mono** (self-hosted, latin + cyrillic) — it has full
  Cyrillic, which the Russian body copy needs.

## Theming & motion

- **Dark by default**; light kicks in from the OS (`prefers-color-scheme`) or the **toggle**
  (top-right, next to the CV/TG buttons). The choice is persisted in `localStorage`, and an inline
  script in `<head>` applies it before first paint (no flash).
- Colors are CSS custom properties on `:root`; light overrides live under
  `:root[data-theme="light"]` and the light media query. Per-case title accents are darkened on
  light backgrounds so light hues stay readable.
- `<meta name="darkreader-lock">` tells the Dark Reader extension to leave the site's colors alone.
- Respects `prefers-reduced-motion` — the reveal animation is disabled and everything shows.

## Layout

```
index.html          theme toggle + #app + inline pre-paint theme script; no content markup
css/styles.css      all styles: fonts, pills/buttons, showcase, reveal, theming, responsive
js/data.js          ALL content — edit here (bio + cases[])
js/main.js          renders bio/cases/footer from data.js, scales showcase images,
                    reveal-on-scroll (IntersectionObserver), theme toggle
fonts/              Rubik (400 / 500 / 300-italic) + JetBrains Mono — self-hosted (latin + cyrillic)
assets/<case-id>/   case images (WebP)
serve.py            no-cache static dev server
.github/workflows/  GitHub Pages deploy (Actions workflow; retries the deploy step)
.nojekyll           serve files raw (Jekyll off)
docs/superpowers/   design spec, plan, asset manifest
CLAUDE.md           guide for AI agents working in this repo
```
