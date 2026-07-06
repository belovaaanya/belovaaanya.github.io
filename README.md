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

- `bio` — name, role, photo, contact tags (CV / TG links), bio text.
- `cases[]` — per case:
  - `tags` — array of short labels (`[]` to omit the row)
  - `title` — wrap the highlighted fragment in `**double asterisks**`
  - `accent` — color of that highlighted fragment (`null` for none)
  - `client` — small italic line under the title (`null` to omit)
  - `img` — the image box: `w`, `h`, `bg`, `radius`, and positioned `layers`
    (raw Figma design px; `crop` = inner `[left%,top%,width%,height%]` or `null`
    for `object-fit:cover`). The box is rendered at design size and scaled to
    fit its column.
  - `body` — array of blocks: `{ h, t }` = bold heading + muted paragraph,
    `{ t }` = muted paragraph only.

## Fonts

- Headings / titles / tags: system stack — real **SF Pro** on Apple devices,
  graceful sans fallback elsewhere (all carry Cyrillic).
- Client names: **Rubik** Light Italic (self-hosted, latin + cyrillic).
- Bio meta: **Intel One Mono** (self-hosted).

Honors `prefers-reduced-motion` (reveal animation disabled, content shown).

## Layout

```
index.html            markup + module include
css/styles.css        all styles + reveal animation + responsive + reduced-motion
js/data.js            content (edit here)
js/main.js            renders blocks, scales images, reveals on scroll (IntersectionObserver)
fonts/                Intel One Mono + Rubik (self-hosted)
assets/               case images, by folder
docs/superpowers/     design spec, plan, asset manifest
```
