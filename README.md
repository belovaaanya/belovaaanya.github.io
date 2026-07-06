# Анна Белова — Portfolio

A dark, single-page portfolio. A bio header followed by design case studies.
The page is a **normal vertical scroll**: every block stays on the page, and
each one **fades in + slides up** (with a small stagger across its tags, title,
image and text) once, as it scrolls into view. No build step.

## Run

```bash
python3 serve.py 5555      # no-cache static server
# then open http://localhost:5555
```

Any static server works (`serve.py` just disables caching for development).
No install or build step.

## Edit the content

All copy, tags, links and images live in **`js/data.js`** — the only file you
need to touch to change content:

- `bio` — name, role, photo, `credentials` (plain-text pills), and bio text.
- `cases[]` — per case:
  - `tags` — array of short labels (`[]` to omit the row)
  - `title` — wrap the highlighted fragment in `**double asterisks**`
  - `accent` — color of that highlighted fragment (`null` for none)
  - `client` — small italic line under the title (`null` to omit)
  - `img` — the image box: `w`, `h`, `bg`, `radius`, and positioned `layers`
    (raw Figma design px; `crop` = inner `[left%,top%,width%,height%]` or `null`
    for `object-fit:cover`). The box is rendered at design size and scaled to
    fit its column.
  - `summary` — array of paragraph strings shown beside the image (one `<p>` each).

## Fonts

- Bio name / role: system stack — real **SF Pro** on Apple devices, graceful
  sans fallback elsewhere (all carry Cyrillic).
- Titles (500), tags/pills (400), client names (300 italic): **Rubik**
  (self-hosted, latin + cyrillic per weight).
- Bio paragraph + case summaries: **JetBrains Mono** (self-hosted, latin +
  cyrillic) — has full Cyrillic for the Russian body copy.

Honors `prefers-reduced-motion` (reveal animation disabled, content shown).

## Layout

```
index.html            markup + module include
css/styles.css        all styles + reveal animation + responsive + reduced-motion
js/data.js            content (edit here)
js/main.js            renders blocks, scales images, reveals on scroll (IntersectionObserver)
fonts/                Rubik + JetBrains Mono (self-hosted)
assets/               case images, by folder
docs/superpowers/     design spec, plan, asset manifest
```
