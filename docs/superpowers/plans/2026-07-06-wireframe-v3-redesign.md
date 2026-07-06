# Wireframe v3 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to
> implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> This project has **no test framework** — each task's "verify" step uses the Claude Code
> preview tools against the running dev server (port 5556), not unit tests.

**Goal:** Update the portfolio to match the new Figma wireframe (`173:866`) — a content +
typography change: single-summary case bodies, new Russian bio, Rubik for titles/tags/client,
JetBrains Mono (Cyrillic-capable) for body text.

**Architecture:** Vanilla HTML/CSS/JS, no build. `js/main.js` renders the DOM from `js/data.js`.
Showcase images/geometry, `sizeShowcases()` scaling, reveal-on-scroll, and theming are
**unchanged**. Work touches fonts (`css/styles.css` + `fonts/`), the data model (`js/data.js`),
the two render functions (`js/main.js`), and docs.

**Tech Stack:** HTML5, CSS custom properties, ES modules. Self-hosted woff2 fonts. `serve.py`
static server (port 5556 in `.claude/launch.json`).

## Global Constraints

- No build step, no framework, no runtime dependencies. ES modules only.
- Fonts are **self-hosted** in `fonts/` — never hotlink.
- All content lives in `js/data.js`; `main.js` renders it. No content HTML in `index.html`.
- Light/dark theming via CSS custom properties must keep working; `prefers-reduced-motion`
  must keep disabling reveal.
- Russian (Cyrillic) copy must render in a Cyrillic-capable face — **never Intel One Mono**.
- Preview server already running on **port 5556** (serverId from `preview_list`).

## File Structure

- `fonts/` — **add** `Rubik-400-{latin,cyrillic}.woff2`, `Rubik-500-{latin,cyrillic}.woff2`,
  `JetBrainsMono-400-{latin,cyrillic}.woff2`; **delete** `IntelOneMono-Regular.woff2`,
  `IntelOneMono-Medium.woff2`. Keep `Rubik-300italic-{latin,cyrillic}.woff2`.
- `css/styles.css` — `@font-face` set, font tokens, pill unification, Rubik titles, JetBrains
  summary/bio typography, layout widths.
- `js/data.js` — bio (`text`, `credentials`, `links`), cases (`summary[]`), e-commerce accent.
- `js/main.js` — `renderBio`, `renderCase`.
- Docs — `CLAUDE.md`, `docs/superpowers/asset-manifest.md`, `README.md`.

---

### Task 1: Fonts — add JetBrains Mono + Rubik 400/500, drop Intel One Mono

**Files:**
- Create: `fonts/Rubik-400-latin.woff2`, `fonts/Rubik-400-cyrillic.woff2`,
  `fonts/Rubik-500-latin.woff2`, `fonts/Rubik-500-cyrillic.woff2`,
  `fonts/JetBrainsMono-400-latin.woff2`, `fonts/JetBrainsMono-400-cyrillic.woff2`
- Delete: `fonts/IntelOneMono-Regular.woff2`, `fonts/IntelOneMono-Medium.woff2`
- Modify: `css/styles.css:1-40` (`@font-face` block + `:root` font tokens)

**Interfaces:**
- Produces: CSS custom props `--font-mono` (JetBrains Mono), `--font-rubik` (Rubik). Removes
  `--font-serif`. Font families available: `"Rubik"` (300 italic existing, 400, 500 upright),
  `"JetBrains Mono"` (400).

- [ ] **Step 1: Download woff2 subsets from Google's font CDN**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya/fonts"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=Rubik:wght@400" -o /tmp/r400.css
curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=Rubik:wght@500" -o /tmp/r500.css
curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400" -o /tmp/jb.css

# Pull the woff2 URL from the @font-face block whose subset comment matches exactly.
extract() { awk -v s="/* $2 */" '$0==s{f=1;next} f&&/src:/{match($0,/https:[^)]+/);print substr($0,RSTART,RLENGTH);f=0}' "$1"; }

curl -s -o Rubik-400-latin.woff2    "$(extract /tmp/r400.css latin)"
curl -s -o Rubik-400-cyrillic.woff2 "$(extract /tmp/r400.css cyrillic)"
curl -s -o Rubik-500-latin.woff2    "$(extract /tmp/r500.css latin)"
curl -s -o Rubik-500-cyrillic.woff2 "$(extract /tmp/r500.css cyrillic)"
curl -s -o JetBrainsMono-400-latin.woff2    "$(extract /tmp/jb.css latin)"
curl -s -o JetBrainsMono-400-cyrillic.woff2 "$(extract /tmp/jb.css cyrillic)"
```

- [ ] **Step 2: Verify the files are real woff2**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya/fonts"
for f in Rubik-400-latin Rubik-400-cyrillic Rubik-500-latin Rubik-500-cyrillic JetBrainsMono-400-latin JetBrainsMono-400-cyrillic; do
  printf '%s: ' "$f.woff2"; head -c 4 "$f.woff2"; printf ' '; wc -c < "$f.woff2"; done
```
Expected: each line starts with `wOF2` and a byte count > 5000. If any is tiny/HTML, the URL
extraction failed — re-inspect the corresponding `/tmp/*.css`.

- [ ] **Step 3: Delete the now-unused Intel One Mono files**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya/fonts"
rm -f IntelOneMono-Regular.woff2 IntelOneMono-Medium.woff2
```

- [ ] **Step 4: Replace the `@font-face` block + font tokens in `css/styles.css`**

Replace lines 1–40 (the two Intel `@font-face` rules, the two Rubik 300-italic rules, and the
`:root` block down through `--gutter`) with — note the two Rubik **300 italic** rules are kept
verbatim, Intel is removed, and Rubik 400/500 + JetBrains 400 are added:

```css
/* ── fonts ───────────────────────────────────────────────────────────── */
/* Rubik — case titles (500), tags/pills (400), client names (300 italic).
   Each weight split latin + cyrillic with unicode-range. */
@font-face {
  font-family: "Rubik";
  src: url("../fonts/Rubik-400-latin.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Rubik";
  src: url("../fonts/Rubik-400-cyrillic.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
@font-face {
  font-family: "Rubik";
  src: url("../fonts/Rubik-500-latin.woff2") format("woff2");
  font-weight: 500; font-style: normal; font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "Rubik";
  src: url("../fonts/Rubik-500-cyrillic.woff2") format("woff2");
  font-weight: 500; font-style: normal; font-display: swap;
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* Rubik Light Italic — client names (latin + cyrillic) */
@font-face {
  font-family: "Rubik";
  src: url("../fonts/Rubik-300italic-cyrillic.woff2") format("woff2");
  font-weight: 300; font-style: italic; font-display: swap;
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
@font-face {
  font-family: "Rubik";
  src: url("../fonts/Rubik-300italic-latin.woff2") format("woff2");
  font-weight: 300; font-style: italic; font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
}
/* JetBrains Mono — bio meta + case summary (Russian body copy needs Cyrillic) */
@font-face {
  font-family: "JetBrains Mono";
  src: url("../fonts/JetBrainsMono-400-latin.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: "JetBrains Mono";
  src: url("../fonts/JetBrainsMono-400-cyrillic.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

:root {
  color-scheme: dark;
  --bg: #111111;
  --fg: #ffffff;
  --muted: #7a7a7a;
  --body: rgba(255, 255, 255, 0.7);
  --tag-bg: rgba(255, 255, 255, 0.04);
  --line: rgba(255, 255, 255, 0.14);
  --radius: 8px;
  /* SF Pro on Apple devices, graceful sans fallback (all have Cyrillic) elsewhere */
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;
  --font-rubik: "Rubik", var(--font-sans);
  --gutter: clamp(16px, 3.5vw, 48px);
}
```

- [ ] **Step 5: Verify in preview**

Reload and check no font 404s and console clean:
- `preview_eval` serverId → `window.location.reload()`
- `preview_network` filter `failed` → expect no failed `.woff2` requests
- `preview_console_logs` level `error` → expect none

- [ ] **Step 6: Commit**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya"
git add fonts css/styles.css
git commit -m "feat(fonts): add Rubik 400/500 + JetBrains Mono (Cyrillic), drop Intel One Mono"
```

---

### Task 2: Content model — data.js + main.js render

**Files:**
- Modify: `js/data.js` (doc-comment header, `bio`, every `cases[]` entry)
- Modify: `js/main.js:69-92` (`renderBio`), `js/main.js:94-145` (`renderCase`)

**Interfaces:**
- Consumes: `pill(label, href?)` helper (unchanged), `reveal(el, i)` (unchanged).
- Produces: `bio` shape `{name, role, photo, credentials:string[], links:[{label,href}], text}`.
  `cases[i]` shape `{id, tags, title, accent, client, img, summary:string[]}` (was `body`).
  DOM: `.bio__pills` (was `.bio__tags`), `.case__summary` (was `.case__body`).

- [ ] **Step 1: Rewrite `js/data.js`**

Replace the doc-comment header's `body` / `tags` lines and the whole `bio` + `cases` content.
Full file:

```js
// ─────────────────────────────────────────────────────────────────────────
//  Portfolio content — EDIT HERE to swap copy, tags, links, images.
//
//  title:       plain string; wrap the accent fragment in **double asterisks**.
//  accent:      color of that highlighted fragment (null = no accent).
//  client:      small italic line under the title (Rubik); null to omit.
//  tags:        array of short labels; [] to omit the tag row.
//  summary:     array of paragraph strings shown beside the image (one <p> each).
//
//  bio.credentials: plain-text pills (e.g. "6 лет в UX").
//  bio.links:       CV / TG action links rendered as pills.
//
//  img.layers use raw Figma design-pixel coordinates inside the img box
//  (img.w × img.h). Each layer:
//    box:    [left, top, width, height]  (design px, origin = box top-left)
//    radius: corner radius (design px)
//    crop:   inner <img> position [left%, top%, width%, height%], or
//            null => object-fit:cover filling the layer box.
// ─────────────────────────────────────────────────────────────────────────

export const bio = {
  name: "Анна Белова",
  role: "Продуктовый дизайнер",
  photo: "assets/bio/photo.png",
  credentials: ["6 лет в UX", "4 года в Enterprise Fintech"],
  links: [
    { label: "CV", href: "#" },
    { label: "TG", href: "#" },
  ],
  text:
    "Продуктовый дизайнер с 6-летним опытом в UX. Проектирую сложные B2B-продукты " +
    "на стыке дизайна, исследований и аналитики данных. Помогаю превращать " +
    "пользовательские инсайты в продуктовые решения",
};

export const cases = [
  {
    id: "alfa",
    tags: ["Enterprise B2B", "Data Visualization"],
    title: "Сократила путь от клиентской обратной связи до **продуктового решения**",
    accent: "#f1015a",
    client: "Альфа-Банк",
    img: {
      w: 970, h: 556, bg: "#050506", radius: 32,
      layers: [
        { src: "assets/alfa/dashboard.png", box: [38, 30, 894, 497], radius: 0, crop: null },
      ],
    },
    summary: [
      "Спроектировала VoC Dashboard для продуктовых команд и C-level, объединив клиентскую обратную связь, продуктовые и UX-метрики в единый инструмент для принятия решений",
    ],
  },
  {
    id: "iontrack",
    tags: ["Health-Tech", "0 to 1", "Design System"],
    title: "Превратила **медицинскую технологию** в цифровой продукт",
    accent: "#4963fa",
    client: "IonTrack",
    img: {
      w: 970, h: 539, bg: null, radius: 0,
      layers: [
        { src: "assets/iontrack/main.png", box: [0, -1, 691, 532], radius: 40, crop: [-0.3, -0.04, 150.09, 106.66] },
        { src: "assets/iontrack/main.png", box: [714, 7, 246, 524], radius: 34, crop: [-290.82, -5.53, 431.56, 110.93] },
        { src: "assets/iontrack/phone.png", box: [704, 0, 265.545, 540.862], radius: 0, crop: null },
      ],
    },
    summary: [
      "Спроектировала мобильное приложение, дизайн-систему и пользовательский опыт, помогая подготовить продукт к привлечению инвестиций и выходу на рынок",
    ],
  },
  {
    id: "corgi",
    tags: ["InsurTech", "B2B SaaS", "Redesign"],
    title: "Разделила сложные страховые процессы **по ролям**",
    accent: "#ff6b48",
    client: "Corgi Insurance Services",
    img: {
      w: 970, h: 539, bg: "#ff6b48", radius: 32,
      layers: [
        { src: "assets/corgi/main.png", box: [0, 8, 955, 523], radius: 0, crop: null },
      ],
    },
    summary: [
      "Перестроила информационную архитектуру платформы для брокеров и андеррайтеров, сделав сложные страховые сценарии понятнее для новых пользователей и быстрее для опытных специалистов",
    ],
  },
  {
    id: "drinkit",
    tags: ["FoodTech", "UX Research", "UI Concept"],
    title: "**Снизила барьер входа** без потери данных для персонализации",
    accent: "#3f5bff",
    client: "Drinkit",
    img: {
      w: 970, h: 539, bg: "#ff6b48", radius: 32,
      layers: [
        { src: "assets/drinkit/main.png", box: [0, 0, 970, 656], radius: 0, crop: [0, -4.14, 100, 109.2] },
      ],
    },
    summary: [
      "Исследовала пользовательские сценарии и спроектировала онбординг, который помогает быстрее выбрать первый напиток и одновременно собирает данные для персональных рекомендаций",
    ],
  },
  {
    id: "streaming",
    tags: ["UI Concept", "Entertainment"],
    title: "Сократила путь до просмотра",
    accent: null,
    client: null,
    img: {
      w: 970, h: 539, bg: null, radius: 32,
      layers: [
        { src: "assets/streaming/main.png", box: [-13, -3, 997, 546], radius: 0, crop: null },
      ],
    },
    summary: [
      "Исследовала лучшие практики стриминговых сервисов и спроектировала интерфейс, который помогает быстрее принять решение и начать просмотр",
    ],
  },
  {
    id: "ecommerce",
    tags: ["UI Concept", "Retail"],
    title: "Сократила путь от поиска до покупки",
    accent: null,
    client: null,
    img: {
      w: 970, h: 539, bg: "#171719", radius: 32,
      layers: [
        { src: "assets/ecommerce/main.png", box: [122, -2, 726, 541], radius: 32, crop: [-19.54, -0.04, 135.47, 100.08] },
      ],
    },
    summary: [
      "Исследовала сценарии визуального поиска и поиска по штрихкоду, спроектировав интерфейс, который ускоряет выбор товара и оформление заказа",
    ],
  },
  {
    id: "illustrations",
    tags: [],
    title: "Некоммерческие иллюстрации",
    accent: null,
    client: null,
    img: {
      w: 970, h: 657, bg: null, radius: 0,
      layers: [
        { src: "assets/illustrations/p259.png", box: [342.33, 0, 285.343, 329.826], radius: 32, crop: [-1.66, 0, 103.29, 118.77] },
        { src: "assets/illustrations/p254.png", box: [639.92, 0, 330.081, 330.081], radius: 32, crop: null },
        { src: "assets/illustrations/p255.png", box: [641, 342, 329, 307], radius: 32, crop: [0, 0, 100, 107.34] },
        { src: "assets/illustrations/p256.png", box: [343, 342, 286, 307], radius: 32, crop: [-5.43, -3.82, 115.99, 103.68] },
        { src: "assets/illustrations/p257.png", box: [0, 342, 331, 307], radius: 32, crop: [0, -2.15, 100.05, 107.87] },
        { src: "assets/illustrations/p258.png", box: [0, 0, 330.081, 330.081], radius: 32, crop: null },
      ],
    },
    summary: [
      "Помимо продуктового дизайна создаю иллюстрации и стикерпаки, в которых исследую атмосферу, композицию и визуальное повествование",
      "Мои работы выпускались совместно с No Kids Stickers (NKS) — брендом с аудиторией более 400 000 подписчиков",
    ],
  },
];
```

- [ ] **Step 2: Update `renderBio` in `js/main.js`**

Replace the current `renderBio` (lines ~69-92) with — renders credential pills, then CV/TG
link-pills, then the paragraph:

```js
function renderBio(b) {
  const s = document.createElement("section");
  s.className = "block bio";

  const headline = document.createElement("div");
  headline.className = "bio__headline";
  headline.innerHTML =
    `<span class="bio__name">${b.name}</span>` +
    `<img class="bio__photo" src="${b.photo}" alt="${b.name}" />` +
    `<span class="bio__role">${b.role}</span>`;

  const meta = document.createElement("div");
  meta.className = "bio__meta";

  const pills = document.createElement("div");
  pills.className = "bio__pills";
  b.credentials.forEach((c) => pills.appendChild(pill(c)));
  b.links.forEach((l) => {
    const el = pill(l.label, l.href);
    el.classList.add("pill--link");
    pills.appendChild(el);
  });

  const text = document.createElement("p");
  text.className = "bio__text";
  text.textContent = b.text;

  meta.append(pills, text);
  s.append(reveal(headline, 0), reveal(meta, 1));
  return s;
}
```

- [ ] **Step 3: Update `renderCase` body in `js/main.js`**

In `renderCase`, replace the `body`-building block (the `const body = … c.body.forEach(…)`
section, ~lines 127-140) with the single-summary version:

```js
  const body = document.createElement("div");
  body.className = "case__summary";
  c.summary.forEach((t) => {
    const p = document.createElement("p");
    p.textContent = t;
    body.appendChild(p);
  });
  reveal(body, i++);

  row.append(media, body);
```

(Leave everything else in `renderCase` — tags, title, client, media — unchanged.)

- [ ] **Step 4: Verify in preview**

- `preview_eval` → `window.location.reload()`
- `preview_console_logs` level `error` → expect none (a `c.body`/`bio.tags` leftover would throw).
- `preview_snapshot` → expect: bio shows 4 pills (`6 лет в UX`, `4 года в Enterprise Fintech`,
  `CV`, `TG`) + the new Russian paragraph; each case shows exactly one summary paragraph
  (illustrations shows two). Console still logs `rendered 7 cases`.

- [ ] **Step 5: Commit**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya"
git add js/data.js js/main.js
git commit -m "feat(content): single-summary case bodies, new bio (credentials + CV/TG), drop 3-block body"
```

---

### Task 3: Styles — Rubik titles, unified pills, JetBrains summary/bio typography

**Files:**
- Modify: `css/styles.css` — pills (~124-129, 146-166), bio (~131-148), case (~150-179),
  `.case__row`/`.case__summary`, mobile media query (~191-198). Remove `--font-serif` usages.

**Interfaces:**
- Consumes: `.bio__pills`, `.pill`, `.pill--link`, `.case__summary` from Task 2; `--font-rubik`,
  `--font-mono` from Task 1.

- [ ] **Step 1: Unify the pill styles**

Replace the `.pill` rule (currently just base) with base + shared sizing, and add `.pill--link`:

```css
/* ── shared pills ────────────────────────────────────────────────────── */
.pill {
  display: inline-flex; align-items: center; justify-content: center;
  height: 32px; padding: 4px 16px;
  background: var(--tag-bg); color: var(--muted); border-radius: var(--radius);
  font-family: var(--font-rubik); font-weight: 400; font-size: 14px; letter-spacing: 0.05em;
  white-space: nowrap; text-decoration: none;
}
.pill--link { transition: color 0.2s, background 0.2s; }
.pill--link:hover { color: var(--fg); background: color-mix(in srgb, var(--fg) 10%, transparent); }
.pill--link:focus-visible { outline: 2px solid var(--fg); outline-offset: 2px; }
```

- [ ] **Step 2: Update the bio block**

Replace `.bio__meta`, `.bio__tags`, `.bio__tags .pill`, `.bio__text` (and bump headline gap):

```css
/* ── bio ─────────────────────────────────────────────────────────────── */
.bio { width: 100%; max-width: 948px; display: flex; flex-direction: column; gap: 8px; }
.bio__headline { display: flex; align-items: center; gap: clamp(12px, 2vw, 24px); }
.bio__name, .bio__role {
  font-family: var(--font-sans); font-weight: 500;
  font-size: clamp(24px, 3.4vw, 32px); line-height: 1.1; letter-spacing: -0.01em;
}
.bio__photo {
  width: clamp(76px, 8vw, 110px); aspect-ratio: 1; border-radius: 50%;
  object-fit: cover; transform: rotate(-0.36deg); flex: none;
}
.bio__meta {
  margin-top: 12px; margin-left: auto; width: min(448px, 100%);
  display: flex; flex-direction: column; gap: 16px;
}
.bio__pills { display: flex; flex-wrap: wrap; gap: 4px; }
.bio__text {
  margin: 0; font-family: var(--font-mono); font-size: 14px; line-height: 1.5;
  letter-spacing: 0.14px; color: var(--fg);
}
```

- [ ] **Step 3: Update the case block (title → Rubik, client → Rubik, summary column)**

Replace `.case__tags .pill`, `.case__title`, `.case__client`, `.case__row`, `.case__media`,
`.case__body` (+ its `p`/`p.h` rules) with:

```css
/* ── case block ──────────────────────────────────────────────────────── */
.case { display: flex; flex-direction: column; gap: 20px; }
.case__tags { display: flex; flex-wrap: wrap; gap: 4px; }
.case__title {
  margin: 0; max-width: 970px;
  font-family: var(--font-rubik); font-weight: 500;
  font-size: clamp(24px, 3.4vw, 32px); line-height: 1.1; letter-spacing: -0.01em;
}
.case__title .accent { color: var(--accent-ink, var(--accent, var(--fg))); }
.case__client {
  margin: 0; font-family: var(--font-rubik); font-weight: 300; font-style: italic;
  font-size: clamp(16px, 2vw, 20px); line-height: 1.1; color: var(--fg);
}

.case__row { display: flex; align-items: center; gap: clamp(20px, 2vw, 28px); }
.case__media { flex: 1 1 0; min-width: 0; }
.case__summary {
  flex: 0 0 clamp(240px, 24%, 308px);
  display: flex; flex-direction: column;
  font-family: var(--font-mono); font-size: 14px; line-height: 1.5;
  letter-spacing: 0.14px; color: var(--fg);
}
.case__summary p { margin: 0; }
.case__summary p + p { margin-top: 1em; }
```

- [ ] **Step 4: Update the mobile media query**

In the `@media (max-width: 860px)` block, rename `.case__body` → `.case__summary`:

```css
@media (max-width: 860px) {
  .case__row { flex-direction: column; align-items: stretch; gap: 20px; }
  .case__media { width: 100%; }
  .case__summary { flex: none; width: 100%; max-width: 520px; }
  .bio { max-width: 100%; }
  .bio__headline { flex-wrap: wrap; }
  .bio__meta { margin-left: 0; width: 100%; }
}
```

- [ ] **Step 5: Verify in preview (desktop, computed styles)**

- `preview_eval` → `window.location.reload()`
- `preview_inspect` selector `.case__title` styles `["font-family","font-weight","font-size"]`
  → `font-family` includes `Rubik`, weight 500.
- `preview_inspect` selector `.case__summary p` styles `["font-family","color","line-height"]`
  → `font-family` includes `JetBrains Mono`, color white (`rgb(255, 255, 255)`).
- `preview_inspect` selector `.pill` styles `["height","font-family","font-size"]`
  → 32px, Rubik, 14px.
- `preview_screenshot` → bio + first case look right; e-commerce title all-white.

- [ ] **Step 6: Verify light/dark + mobile**

- `preview_resize` colorScheme `light` → `preview_screenshot`; accents readable, body dark.
- `preview_resize` colorScheme `dark` (reset).
- `preview_resize` preset `mobile` → `preview_screenshot`; row stacks, no horizontal scroll.
- `preview_resize` preset `desktop` (reset).

- [ ] **Step 7: Commit**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya"
git add css/styles.css
git commit -m "style: Rubik titles/pills, JetBrains Mono summary+bio, unify pill sizing"
```

---

### Task 4: Docs — CLAUDE.md, asset-manifest, README

**Files:**
- Modify: `CLAUDE.md` (Fonts section; "Editing content" section)
- Modify: `docs/superpowers/asset-manifest.md` (node ids, type/bio notes, content model)
- Modify: `README.md` (content-model mention, if present)

- [ ] **Step 1: Update `CLAUDE.md` "Editing content" section**

Change the description of per-case fields to reflect `summary[]` (was `body[]`) and the bio
`credentials`/`links` split. Replace the "Editing content" paragraph so it reads:

```markdown
## Editing content

**All copy, images, tags, links, and per-case config live in `js/data.js` — it's the only file
to touch to change content.** `main.js` renders everything from the `bio` object and `cases[]`
array. Per case: `tags[]`, `title` (wrap the highlighted fragment in `**double asterisks**`),
`accent` (color of that fragment, or `null`), `client` (italic line, or `null`), `img` (image
box), and `summary[]` (array of paragraph strings shown beside the image). The `bio` object has
`credentials[]` (plain-text pills) and `links[]` (CV/TG, rendered as link-pills).
```

- [ ] **Step 2: Update `CLAUDE.md` "Fonts" section**

Replace the Fonts bullets so they describe the new stack (Rubik for titles/tags/client,
JetBrains Mono for Russian body, Intel One Mono removed):

```markdown
## Fonts (and the Cyrillic rule)

- **Bio name / role:** system stack (`--font-sans`) — real SF Pro on Apple devices, sans
  fallback elsewhere.
- **`Rubik`** (self-hosted, split latin + cyrillic per weight with `unicode-range`): **500** for
  case titles, **400** for tags/pills, **300 italic** for client names. `--font-rubik`.
- **`JetBrains Mono`** (self-hosted, latin + cyrillic): the **bio paragraph** and **case
  summaries**. It has full Cyrillic, so it's safe for the Russian body copy — this replaced Intel
  One Mono, which has **no Cyrillic glyphs** and could not render the Russian text. `--font-mono`.
```

- [ ] **Step 3: Update `docs/superpowers/asset-manifest.md`**

Update the header line and bio note to the new design: reference frame `173:866` and the new
type system, and note the content model is one `summary[]` per case (showcase geometry
unchanged from the previous revision). Replace the top paragraph and the Bio line:

```markdown
# Asset Manifest

Source: Figma frame `173:866` ("Desktop: wireframe"), file `Lpw0GfkLHeeRED9sUallH8`.
Page background: `#111`. Titles: Rubik Medium 500. Tags/pills: Rubik Regular 400, 14px,
`#7a7a7a`. Client names: Rubik 300 italic. Body (bio paragraph + case summaries): JetBrains
Mono 400, 14px, white. Showcase image geometry is unchanged from the prior revision (see table).
```

And update the Bio line at the bottom:

```markdown
Bio (node 173:867): name "Анна Белова" (SF Pro Medium 32) + inline circular photo (110px,
rotate -0.36deg) + role "Продуктовый дизайнер"; credential pills "6 лет в UX",
"4 года в Enterprise Fintech" (Rubik 14, h32) + CV/TG link-pills; bio paragraph (JetBrains Mono
14, white). Photo: assets/bio/photo.png.
```

- [ ] **Step 4: Update `README.md` if it describes the content model**

Read `README.md`; if it mentions the `body` block model (`{h,t}` / `{t}`), update that sentence
to the `summary[]` model. If it does not mention it, no change.

- [ ] **Step 5: Commit**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya"
git add CLAUDE.md docs/superpowers/asset-manifest.md README.md
git commit -m "docs: update fonts + content model (summary[], Rubik/JetBrains) for v3 wireframe"
```

---

## Self-Review

**Spec coverage:**
- Fonts (Rubik 400/500, JetBrains Mono, drop Intel) → Task 1 ✓
- Bio content (text, credentials, links) → Task 2 ✓
- Case summaries (incl. illustrations 2-paragraph) → Task 2 ✓
- E-commerce accent dropped → Task 2 (accent `null`, title without `**`) ✓
- Render (renderBio pills+links, renderCase summary) → Task 2 ✓
- Pills unified, Rubik titles, JetBrains summary/bio, layout widths → Task 3 ✓
- Light/dark + mobile + reduced-motion preserved → Task 3 verify (no logic touched) ✓
- Docs (CLAUDE.md, asset-manifest, README) → Task 4 ✓

**Placeholder scan:** No TBD/TODO; all code + copy is literal. Font URLs are resolved at
runtime via the documented `extract` step (Task 1 Step 1–2) — deterministic, with a verify gate.

**Type consistency:** `bio.credentials`/`bio.links`/`bio.text` used identically in data.js and
renderBio. `cases[].summary` (array) produced in data.js, consumed via `.forEach` in renderCase.
Class names consistent: `.bio__pills`, `.pill`, `.pill--link`, `.case__summary` across Tasks 2–3.
`--font-rubik`/`--font-mono` defined in Task 1, used in Task 3. No dangling `--font-serif`,
`.bio__tags`, `.case__body`, `c.body` references remain after Tasks 2–3.
