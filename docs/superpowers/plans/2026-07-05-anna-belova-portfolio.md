# Anna Belova Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, monospace, single-page portfolio for Anna Belova with 8 full-screen "page-like" slides (bio + 7 cases) that change one-at-a-time on scroll with layered-depth parallax.

**Architecture:** Static site, no build step. Slides are rendered from a `data.js` array by a small template function in `main.js`. Desktop navigation is a controlled `currentIndex` that GSAP-tweens a slide wrapper (one wheel notch / arrow = one slide); mobile falls back to CSS scroll-snap. Layered parallax is a GSAP timeline per transition. GSAP + fonts are vendored/self-hosted.

**Tech Stack:** HTML, CSS, vanilla JS (ES modules), GSAP + ScrollTrigger (vendored), Intel One Mono (self-hosted woff2). Figma MCP tools used at build time to extract tokens/assets.

## Global Constraints

- No build step, no framework, no package manager required to run — open `index.html` via a static server.
- Typeface is **Intel One Mono** for ALL text (Medium + Regular), self-hosted.
- All user-facing copy and per-case config lives ONLY in `js/data.js` — no hardcoded copy in templates.
- GSAP and ScrollTrigger are vendored locally in `vendor/` — no CDN `<script src=...>` to external hosts.
- Figma asset URLs expire ~7 days, so all images must be downloaded into `assets/` at build time, never hotlinked.
- Respect `prefers-reduced-motion: reduce` — disable parallax/easing.
- Verification is browser-based via the live-preview tools (no unit-test runner).
- Figma source: file `Lpw0GfkLHeeRED9sUallH8`, frame `164:470`. Bio frame `164:756`. Case frames in order: `164:573`, `164:589`, `164:608`, `164:624`, `164:653`, `164:684`, `164:669`.

---

### Task 1: Project scaffold, self-hosted font, vendored GSAP

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/main.js`
- Create: `fonts/IntelOneMono-Medium.woff2`, `fonts/IntelOneMono-Regular.woff2`
- Create: `vendor/gsap.min.js`, `vendor/ScrollTrigger.min.js`
- Create: `.claude/launch.json` (static server for preview)

**Interfaces:**
- Produces: a served page at a known port; `document.getElementById("app")` container; `--bg`, `--fg`, `--muted` CSS vars; `.font-mono` applied to `body`.

- [ ] **Step 1: Download Intel One Mono woff2 (Medium + Regular)**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya"
mkdir -p fonts vendor css js assets
curl -sL -o fonts/IntelOneMono-Regular.woff2 \
  "https://raw.githubusercontent.com/intel/intel-one-mono/main/fonts/webfonts/IntelOneMono-Regular.woff2"
curl -sL -o fonts/IntelOneMono-Medium.woff2 \
  "https://raw.githubusercontent.com/intel/intel-one-mono/main/fonts/webfonts/IntelOneMono-Medium.woff2"
ls -la fonts/   # both files should be > 10KB
```
If the raw URLs 404, fall back to google-webfonts-helper (https://gwfh.mranftl.com/fonts/intel-one-mono) and download the Regular(400) + Medium(500) woff2 into `fonts/`.

- [ ] **Step 2: Vendor GSAP + ScrollTrigger**

```bash
cd "/Users/dmitrijmaksimov/Projects/CV Web Anya"
curl -sL -o vendor/gsap.min.js "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
curl -sL -o vendor/ScrollTrigger.min.js "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
ls -la vendor/   # both > 20KB
head -c 80 vendor/gsap.min.js   # should be JS, not an HTML error page
```

- [ ] **Step 3: Write `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Anna Belova — Product Designer</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <main id="app"></main>
  <nav id="dots" aria-label="Slide navigation"></nav>
  <div id="scroll-cue" aria-hidden="true">scroll</div>

  <script src="vendor/gsap.min.js"></script>
  <script src="vendor/ScrollTrigger.min.js"></script>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Write `css/styles.css` base (font-face, reset, tokens)**

```css
@font-face {
  font-family: "Intel One Mono";
  src: url("../fonts/IntelOneMono-Regular.woff2") format("woff2");
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Intel One Mono";
  src: url("../fonts/IntelOneMono-Medium.woff2") format("woff2");
  font-weight: 500; font-style: normal; font-display: swap;
}

:root {
  --bg: #0d0d0d;          /* refined in Task 2 */
  --fg: #ffffff;
  --muted: #7a7a7a;
  --tag-bg: rgba(255, 255, 255, 0.1);
  --radius: 8px;
}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; }
body {
  background: var(--bg);
  color: var(--fg);
  font-family: "Intel One Mono", ui-monospace, monospace;
  overflow: hidden;            /* desktop paging owns scroll; overridden on mobile in Task 8 */
}
img { display: block; max-width: 100%; }
a { color: inherit; }
```

- [ ] **Step 5: Write a placeholder `js/main.js`**

```js
const app = document.getElementById("app");
app.textContent = "scaffold ok";
console.log("[portfolio] scaffold loaded");
```

- [ ] **Step 6: Create `.claude/launch.json`**

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "portfolio", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "5555"], "port": 5555 }
  ]
}
```

- [ ] **Step 7: Verify in browser**

Start the `portfolio` server via the preview tool, load `/`. Expected: page shows "scaffold ok" in white monospace on a near-black background; console logs `[portfolio] scaffold loaded`; no 404s for fonts/vendor in the network panel.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: scaffold portfolio, self-host font, vendor GSAP"
```

---

### Task 2: Extract design tokens + download Figma assets

**Files:**
- Create: `assets/bio/photo.<ext>` and `assets/<case-id>/<layer>.<ext>` for all 7 cases
- Modify: `css/styles.css` (`--bg` exact value)
- Create: `docs/superpowers/asset-manifest.md` (records node→file→color mapping)

**Interfaces:**
- Produces: local asset file paths and exact per-case background colors + layer positions, consumed by Task 3's `data.js`.

- [ ] **Step 1: Pull exact page background + bio photo**

Call the Figma design-context tool on bio frame `164:756` (already retrieved once — re-run if needed) and the parent `164:470` to read the exact page background color. Update `--bg` in `css/styles.css` to the exact hex. Download the bio photo asset URL:

```bash
curl -sL -o assets/bio/photo.jpg "<bio image URL from get_design_context>"
```

- [ ] **Step 2: For each of the 7 case frames, get design context + download layer images**

For each case node (`164:573`, `164:589`, `164:608`, `164:624`, `164:653`, `164:684`, `164:669`), call the Figma design-context tool. From each response record: the showcase background color, and each image layer's asset URL + its x/y/width/height (from the metadata already captured in the spec/exploration). Download each layer:

```bash
mkdir -p assets/<case-id>
curl -sL -o assets/<case-id>/<layer-name>.png "<layer URL>"
```

- [ ] **Step 3: Record everything in `docs/superpowers/asset-manifest.md`**

A table per case: node id, showcase bg color, and for each layer: local file path + x,y,w,h (relative to the 832×~620 showcase box). This is the source of truth Task 3 copies into `data.js`.

- [ ] **Step 4: Verify assets**

```bash
find assets -type f -size +1k | sort   # every referenced image exists and is non-empty
```
Expected: bio photo + all case layer images present, none 0-byte (a 0-byte file means an expired/blocked URL — re-fetch).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "assets: download Figma showcase images, extract bg tokens"
```

---

### Task 3: Data model (`js/data.js`)

**Files:**
- Create: `js/data.js`

**Interfaces:**
- Produces: `export const bio` and `export const cases`, consumed by Task 4/5 templates and Task 6/7 navigation.
  - `bio: { name, role, photo, tags: [{label, href}], text }`
  - `cases: Array<{ id, title, description, tags: [string, string], bg, link, layers: Array<{ src, x, y, w, depth }> }>`
  - `x, y, w` are numbers in the showcase's own coordinate space (Figma px, showcase ~832 wide); `depth` is 0–1 parallax weight.

- [ ] **Step 1: Write `js/data.js` using values from the asset manifest**

```js
export const bio = {
  name: "Anna Belova",
  role: "Product Designer",
  photo: "assets/bio/photo.jpg",
  tags: [
    { label: "CV", href: "#" },
    { label: "TG", href: "#" },
  ],
  text:
    "Product Designer and UX Analyst with 5+ years of experience specializing in " +
    "B2B enterprise ecosystems, systemic design, and customer experience. Adept at " +
    "translating complex data and Voice of Customer (VoC) into intuitive interfaces " +
    "and strategic business solutions",
};

// Placeholder copy is intentional (see spec). Swap title/description/tags/link here.
// bg + layers[].{src,x,y,w} come from docs/superpowers/asset-manifest.md.
export const cases = [
  {
    id: "fast-checkout",
    title: "E-commerce Fast Checkout",
    description:
      "Designed key screens for a clothing app prioritizing fast search and purchase " +
      "flows. Implemented photo and barcode search features based on competitive " +
      "benchmarking (Zara, Farfetch). Created a highly scannable, user-centered " +
      "shopping experience with optimized product cards",
    tags: ["Mobile", "E-commerce"],
    bg: "#ffffff",
    link: "#",
    layers: [
      // { src, x, y, w, depth } — fill from manifest, one entry per image
    ],
  },
  // ...repeat for the other 6 cases (ids: health, dashboard, streaming, coffee, portraits, crypto — rename to match real projects)
];
```

- [ ] **Step 2: Verify data loads**

Temporarily import in `main.js`: `import { bio, cases } from "./data.js"; console.log(bio.name, cases.length, cases.every(c => c.layers.length));`. Load in browser. Expected console: `Anna Belova 7 true` and no module errors.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add portfolio content data model"
```

---

### Task 4: Bio slide render + styles

**Files:**
- Modify: `js/main.js`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `bio` from `data.js`.
- Produces: `renderBio(bio) -> HTMLElement` (a `<section class="slide slide--bio">`), and appends it as the first slide in `#app`.

- [ ] **Step 1: Write `renderBio` + a shared `pill` helper in `main.js`**

```js
import { bio, cases } from "./data.js";

function pill(label, href) {
  const el = href ? document.createElement("a") : document.createElement("span");
  if (href) el.href = href;
  el.className = "pill";
  el.textContent = label;
  return el;
}

function renderBio(b) {
  const s = document.createElement("section");
  s.className = "slide slide--bio";
  s.innerHTML = `
    <div class="bio">
      <div class="bio__headline">
        <span class="bio__name">${b.name}</span>
        <img class="bio__photo" src="${b.photo}" alt="${b.name}" />
        <span class="bio__role">${b.role}</span>
      </div>
      <div class="bio__meta">
        <div class="bio__tags"></div>
        <p class="bio__text">${b.text}</p>
      </div>
    </div>`;
  const tags = s.querySelector(".bio__tags");
  b.tags.forEach((t) => tags.appendChild(pill(t.label, t.href)));
  return s;
}

const app = document.getElementById("app");
app.innerHTML = "";
app.appendChild(renderBio(bio));
```

- [ ] **Step 2: Add bio + pill + slide CSS**

```css
.slide { width: 100vw; height: 100vh; display: grid; place-items: center; padding: 0 6vw; }
.pill {
  display: inline-flex; align-items: center; justify-content: center;
  height: 24px; padding: 4px 16px; border-radius: var(--radius);
  background: var(--tag-bg); color: var(--muted);
  font-weight: 500; font-size: 12px; text-decoration: none; white-space: nowrap;
}
.bio { width: 100%; max-width: 1350px; }
.bio__headline { display: flex; align-items: center; gap: 10px; }
.bio__name, .bio__role { font-weight: 500; font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.02em; }
.bio__photo { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; transform: rotate(-0.36deg); }
.bio__meta { margin-top: 16px; margin-left: auto; width: min(369px, 40%); display: flex; flex-direction: column; gap: 16px; }
.bio__tags { display: flex; gap: 4px; }
.bio__text { margin: 0; font-size: 10px; line-height: 1.4; }
```

- [ ] **Step 3: Verify in browser**

Load `/`. Expected: bio headline "Anna Belova [circular photo] Product Designer" centered; CV/TG pills; bio paragraph on the right. Matches Figma bio frame layout. Compare against a `get_screenshot` of node `164:756`.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: render bio slide"
```

---

### Task 5: Case slide render + styles

**Files:**
- Modify: `js/main.js`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: `cases` from `data.js`, `pill()` from Task 4.
- Produces: `renderCase(c, index) -> HTMLElement` (`<section class="slide slide--case">`), appended after the bio slide. Each layer image gets `class="showcase__layer"` and `data-depth="<depth>"` (consumed by Task 7).

- [ ] **Step 1: Write `renderCase` and append all cases in `main.js`**

```js
function renderCase(c) {
  const s = document.createElement("section");
  s.className = "slide slide--case";
  s.innerHTML = `
    <div class="case">
      <div class="showcase" style="--case-bg:${c.bg}"></div>
      <div class="panel">
        <div class="panel__tags"></div>
        <h2 class="panel__title">${c.title}</h2>
        <p class="panel__desc">${c.description}</p>
        <a class="panel__btn" href="${c.link}" aria-label="Open ${c.title}"></a>
      </div>
    </div>`;
  const tagWrap = s.querySelector(".panel__tags");
  c.tags.forEach((t) => tagWrap.appendChild(pill(t)));
  const showcase = s.querySelector(".showcase");
  c.layers.forEach((l) => {
    const img = document.createElement("img");
    img.className = "showcase__layer";
    img.src = l.src;
    img.alt = "";
    img.dataset.depth = String(l.depth ?? 0.5);
    // position within the showcase box, scaled by CSS var --sx (set in Task 8 for responsiveness)
    img.style.cssText = `left:${l.x}px; top:${l.y}px; width:${l.w}px;`;
    showcase.appendChild(img);
  });
  return s;
}

cases.forEach((c) => app.appendChild(renderCase(c)));
```

- [ ] **Step 2: Add case + showcase + panel CSS**

```css
.case { width: 100%; max-width: 1350px; display: grid; grid-template-columns: 62% 1fr; gap: 26px; align-items: center; }
.showcase { position: relative; aspect-ratio: 832 / 620; border-radius: 12px; background: var(--case-bg); overflow: hidden; }
.showcase__layer { position: absolute; will-change: transform; }
.panel { display: flex; flex-direction: column; gap: 16px; }
.panel__tags { display: flex; gap: 4px; }
.panel__title { margin: 0; font-weight: 500; font-size: clamp(24px, 2.6vw, 40px); line-height: 1.1; letter-spacing: -0.02em; }
.panel__desc { margin: 0; font-size: 10px; line-height: 1.5; color: var(--fg); max-width: 352px; }
.panel__btn { width: 53px; height: 56px; border-radius: var(--radius); background: var(--tag-bg); }
```

- [ ] **Step 3: Verify in browser**

Load `/`, scroll the raw page (paging not wired yet). Expected: 7 case sections after the bio; each shows its colored showcase with layered images positioned as in Figma, and a right panel with two pills, title, description, and a square button. Spot-check case 1 and case 6 (portraits) against `get_screenshot` of their nodes.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: render case slides"
```

---

### Task 6: Page-like navigation (controlled index, dots, keyboard/wheel, scroll cue)

**Files:**
- Create: `js/nav.js`
- Modify: `js/main.js`
- Modify: `css/styles.css`

**Interfaces:**
- Consumes: the rendered `.slide` sections in `#app`, `#dots`, `#scroll-cue`, global `gsap`.
- Produces: `initNav({ slides, onChange }) -> { goTo(i), current() }`. `onChange(fromIndex, toIndex, direction)` fires per transition (consumed by Task 7). Exposes `window.__nav` for debugging.

- [ ] **Step 1: Write `js/nav.js`**

```js
export function initNav({ slides, onChange = () => {} }) {
  const wrap = slides[0].parentElement;      // #app
  wrap.style.transition = "none";
  let index = 0;
  let animating = false;

  const dots = document.getElementById("dots");
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot"; b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => goTo(i));
    dots.appendChild(b);
  });
  const dotEls = [...dots.children];
  const setDots = () => dotEls.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i === index || animating) return;
    const from = index, dir = i > index ? 1 : -1;
    animating = true;
    index = i;
    setDots();
    document.body.dataset.cue = "off";
    onChange(from, i, dir);
    gsap.to(wrap, {
      y: -i * window.innerHeight, duration: 0.9, ease: "power3.inOut",
      onComplete: () => { animating = false; },
    });
  }

  // wheel: one notch = one slide
  let wheelLock = false;
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLock || animating) return;
    if (Math.abs(e.deltaY) < 8) return;
    wheelLock = true;
    goTo(index + (e.deltaY > 0 ? 1 : -1));
    setTimeout(() => (wheelLock = false), 900);
  }, { passive: false });

  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); goTo(index + 1); }
    else if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); goTo(index - 1); }
    else if (e.key === "Home") goTo(0);
    else if (e.key === "End") goTo(slides.length - 1);
  });

  window.addEventListener("resize", () => gsap.set(wrap, { y: -index * window.innerHeight }));
  setDots();
  const api = { goTo, current: () => index };
  window.__nav = api;
  return api;
}
```

- [ ] **Step 2: Wire it in `main.js` (after slides are appended)**

```js
import { initNav } from "./nav.js";
const slides = [...app.querySelectorAll(".slide")];
app.style.willChange = "transform";
const nav = initNav({ slides, onChange: () => {} }); // parallax hook added in Task 7
```

- [ ] **Step 3: Dots + scroll-cue CSS**

```css
#app { will-change: transform; }
#dots { position: fixed; right: 28px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 12px; z-index: 10; }
.dot { width: 9px; height: 9px; padding: 0; border: 0; border-radius: 50%; background: rgba(255,255,255,.25); cursor: pointer; transition: background .2s, transform .2s; }
.dot:hover { background: rgba(255,255,255,.5); }
.dot[aria-current="true"] { background: #fff; transform: scale(1.3); }
.dot:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
#scroll-cue { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); font-size: 10px; color: var(--muted); letter-spacing: .3em; text-transform: uppercase; opacity: .8; transition: opacity .4s; z-index: 10; }
body[data-cue="off"] #scroll-cue { opacity: 0; pointer-events: none; }
```

- [ ] **Step 4: Verify in browser**

Load `/`. Expected: exactly one slide fills the viewport; one wheel notch advances exactly one slide; ArrowUp/Down and PageUp/Down page; Home/End jump to ends; dots reflect position and jump on click; the "scroll" cue is visible on the bio slide and fades after the first navigation. Confirm no double-advance on a single trackpad flick.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: page-like slide navigation with dots, keyboard, wheel, scroll cue"
```

---

### Task 7: Layered-depth parallax

**Files:**
- Create: `js/parallax.js`
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `.slide` sections, their `.showcase`, `.showcase__layer[data-depth]`, `.panel`, `.showcase` background box, global `gsap`.
- Produces: `initParallax(slides) -> { play(fromIndex, toIndex, direction) }`. `play` is called from nav's `onChange`.

- [ ] **Step 1: Write `js/parallax.js`**

```js
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initParallax(slides) {
  // gather animatable parts per slide
  const parts = slides.map((s) => ({
    showcase: s.querySelector(".showcase"),
    layers: [...s.querySelectorAll(".showcase__layer")],
    panel: s.querySelector(".panel"),
    bio: s.querySelector(".bio"),
  }));

  function play(from, to, dir) {
    if (reduce) return;                    // respect reduced-motion
    const p = parts[to];
    if (!p) return;
    const enter = dir > 0 ? 60 : -60;      // px offset direction
    const tl = gsap.timeline();
    if (p.panel) {
      tl.fromTo(p.panel, { y: enter * 1.2, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.15);
    }
    if (p.showcase) {
      tl.fromTo(p.showcase, { y: enter * 0.5, scale: 0.98 }, { y: 0, scale: 1, duration: 0.9, ease: "power3.out" }, 0);
    }
    p.layers.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.5;
      tl.fromTo(el, { y: enter * (0.3 + depth) }, { y: 0, duration: 0.9, ease: "power3.out" }, 0.05);
    });
    if (p.bio) {
      tl.fromTo(p.bio, { y: enter * 0.4, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0);
    }
  }

  // optional low-amplitude pointer drift on the active showcase layers
  if (!reduce) {
    window.addEventListener("pointermove", (e) => {
      const idx = window.__nav ? window.__nav.current() : 0;
      const p = parts[idx];
      if (!p || !p.layers.length) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      p.layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth) || 0.5;
        gsap.to(el, { x: cx * depth * 10, duration: 0.6, overwrite: "auto" });
        void cy;
      });
    });
  }

  return { play };
}
```

- [ ] **Step 2: Connect parallax to nav in `main.js`**

```js
import { initParallax } from "./parallax.js";
const parallax = initParallax(slides);
const nav = initNav({ slides, onChange: (from, to, dir) => parallax.play(from, to, dir) });
```
(Replace the Task 6 `initNav` call.)

- [ ] **Step 3: Verify in browser**

Load `/`, page forward and back. Expected: on each transition the showcase background, its image layers, and the text panel visibly arrive at different rates (depth), not as one flat block; layers with higher `depth` move more. Toggle OS reduced-motion (or set the preview color-scheme/emulation): parallax is disabled, slides still change.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: layered-depth parallax on slide transitions"
```

---

### Task 8: Responsive / adaptive slides + reduced-motion

**Files:**
- Modify: `css/styles.css`
- Modify: `js/main.js`, `js/nav.js`

**Interfaces:**
- Consumes: a media query breakpoint at 900px; existing nav API.
- Produces: on mobile, JS paging disabled and CSS scroll-snap engaged; showcase layers scaled to fit the narrower showcase box.

- [ ] **Step 1: Add mobile CSS (stacked + scroll-snap)**

```css
@media (max-width: 900px) {
  body { overflow-y: auto; scroll-snap-type: y mandatory; -webkit-overflow-scrolling: touch; }
  #app { transform: none !important; }
  .slide { scroll-snap-align: start; height: 100dvh; padding: 0 6vw; }
  .case { grid-template-columns: 1fr; gap: 18px; }
  .showcase { width: 100%; }
  .bio__meta { margin-left: 0; width: 100%; }
  #dots { right: 14px; }
}
```

- [ ] **Step 2: Guard JS paging behind a desktop check in `main.js`**

```js
const isDesktop = () => window.matchMedia("(min-width: 901px)").matches;
if (isDesktop()) {
  const parallax = initParallax(slides);
  initNav({ slides, onChange: (f, t, d) => parallax.play(f, t, d) });
} else {
  app.style.transform = "none";   // let native scroll-snap drive
}
```
Reload-on-cross-breakpoint is acceptable (document it); do not attempt live mode-switching.

- [ ] **Step 3: Scale showcase layers to the box**

Wrap layer positioning so absolute px coords scale with the showcase width. In `renderCase`, set the showcase's intrinsic design width as a CSS var and scale layers:
```css
.showcase { container-type: inline-size; }
.showcase__layer { transform-origin: top left; }
```
```js
// in renderCase, after appending layers:
showcase.style.setProperty("--design-w", "832");
```
Add CSS to scale: `.showcase__layer { scale: calc(100cqw / 832); }` — verify layers stay aligned to the composition at any width.

- [ ] **Step 4: Verify in browser at multiple sizes**

Use the preview resize tool: desktop (1280×800) → paging + parallax work; mobile (375×812) → slides stack (showcase over text), scroll-snap advances one slide per swipe, dots still work, no horizontal scroll. Tablet (768×1024) → stacked. Confirm the showcase composition scales without layers drifting out of place.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: adaptive mobile layout with scroll-snap + reduced-motion"
```

---

### Task 9: Final fidelity + verification pass

**Files:**
- Modify: any of the above as needed for polish.

- [ ] **Step 1: Side-by-side compare each slide against Figma**

For each node (`164:756` then the 7 case nodes), `get_screenshot` and compare to the rendered slide in-browser. Fix spacing/color/position drift. Confirm `--bg`, tag colors, and type sizes match.

- [ ] **Step 2: Full behavior checklist (spec §10)**

Verify in the browser and record the result of each:
1. Wheel: one notch = one slide (no double-advance).
2. Keyboard: Arrows / PageUp-Down / Home / End all page correctly.
3. Dots reflect position and jump on click.
4. Parallax: layers/background/panel move at different rates on transition.
5. Scroll cue shows on bio, fades after first nav.
6. Mobile (375px): stacked, scroll-snap, no horizontal overflow.
7. `prefers-reduced-motion`: motion off, navigation still works.
8. No console errors; no failed network requests (fonts, vendor, assets all 200).

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "polish: figma fidelity pass + final verification"
```

## Self-Review

**Spec coverage:**
- §1 structure (bio + 7 cases) → Tasks 4, 5. ✓
- §2 goals (paging, parallax, dots, keyboard, scroll cue, adaptive, data file, real images) → Tasks 3, 6, 7, 8, 2. ✓
- §3 tech (vanilla + vendored GSAP + self-hosted font, controlled-index paging) → Task 1, 6. ✓
- §4 file structure → matches Tasks 1–7 file map. ✓
- §5 data model → Task 3 (matches shape: bio + cases with layers/depth). ✓
- §6 visual system/tokens → Tasks 1 (tokens), 4, 5 (type/pill/layout). ✓
- §7 navigation & parallax + a11y/reduced-motion → Tasks 6, 7, 8. ✓
- §8 responsive adaptive slides → Task 8. ✓
- §9 assets from Figma → Task 2. ✓
- §10 verification → Task 9 (+ per-task browser checks). ✓

**Placeholder scan:** Content copy is intentionally placeholder per the spec, isolated to `data.js`; task steps contain concrete code/commands. Task 2/3 depend on Figma-extracted values (bg colors, layer coords, asset URLs) that cannot be known until fetched — the plan gives exact steps to obtain them and a manifest to record them, which is the correct handling for expiring remote assets, not a placeholder gap.

**Type consistency:** `renderBio`/`renderCase`/`pill` (Task 4/5), `initNav({slides,onChange}) → {goTo,current}` and `window.__nav` (Task 6), `initParallax(slides) → {play(from,to,dir)}` called from nav's `onChange` (Task 7) are consistent across tasks. `data-depth` set in Task 5 is read in Task 7. `--case-bg`/`.showcase__layer` names match between render and CSS.
