# Anna Belova Portfolio — Full-Screen Parallax Slides

**Date:** 2026-07-05
**Status:** Approved design, ready for implementation plan
**Figma:** https://www.figma.com/design/Lpw0GfkLHeeRED9sUallH8/?node-id=164-470 (frame `164:470`, "Desktop: wireframe")

## 1. Overview

A single-page, dark, monospace personal portfolio for **Anna Belova, Product Designer**. The page presents as **8 full-screen "page-like" slides** navigated by scroll:

- **Slide 1 — Bio:** name, inline circular photo, role, contact pill tags, and bio paragraph.
- **Slides 2–8 — Cases:** 7 design case studies, each a large visual showcase plus a text panel.

Slides change one at a time on scroll (discrete paging), with a **layered-depth parallax** as each slide assembles. The layout is adaptive: side-by-side on desktop, stacked full-screen slides on mobile.

The Figma source is a **wireframe** — all 7 cases currently share the same placeholder title ("E-commerce Fast Checkout") and description. The distinctive, real content is the per-case showcase imagery.

## 2. Goals & Non-Goals

### Goals
- Faithfully reproduce the Figma visual system (dark theme, Intel One Mono, bio + 7 cases).
- Page-like navigation: one wheel notch / arrow key = exactly one slide.
- Layered-depth parallax during slide transitions.
- Dot pagination (click to jump), keyboard/wheel nav, and a scroll cue on the bio slide.
- Adaptive/responsive: works on desktop and mobile.
- All text copy lives in one structured data file so it can be swapped with a single edit.
- Real showcase images downloaded from Figma and stored locally.

### Non-Goals
- No CMS, backend, or build tooling.
- No final marketing copy — placeholder text is intentional and easy to replace.
- No per-case detail/subpages (the square button is a placeholder link for now).
- No analytics, forms, or third-party embeds.

## 3. Tech Stack & Approach

- **Vanilla HTML / CSS / JS**, no build step.
- **GSAP + ScrollTrigger**, vendored locally in `vendor/` (no CDN dependency, avoids CSP/offline issues).
- **Intel One Mono** self-hosted as `.woff2` in `fonts/` (the design's only typeface; Medium + Regular weights).
- Slides are **rendered from a data array** by a small JS template function, keeping the 7 cases DRY and copy-swapping trivial.

### Chosen paging approach (and the alternative considered)
- **Chosen (desktop):** a controlled `currentIndex` state animates a slide wrapper's transform via GSAP. Wheel/keyboard events are debounced so one gesture advances exactly one slide. This makes "one gesture = one page" reliable and gives precise control over the parallax timeline per transition.
- **Alternative considered:** native CSS `scroll-snap` + ScrollTrigger scrub for parallax. Rejected for *desktop* because free-scroll snapping makes "one notch = one slide" inconsistent. **However, this alternative IS used on mobile** (see §7), where hijacking touch scrolling is a poor experience.

## 4. File Structure

```
index.html
css/
  styles.css
js/
  data.js      # bio + cases content/config — the "one edit to swap" file
  main.js      # renders slides from data, wires GSAP + navigation
vendor/
  gsap.min.js
  ScrollTrigger.min.js
fonts/
  IntelOneMono-Medium.woff2
  IntelOneMono-Regular.woff2
assets/
  <case>/...   # showcase images pulled from Figma
docs/superpowers/specs/
  2026-07-05-anna-belova-portfolio-design.md
```

## 5. Data Model (`js/data.js`)

```js
export const bio = {
  name: "Anna Belova",
  role: "Product Designer",
  photo: "assets/bio/photo.jpg",
  tags: [
    { label: "CV", href: "#" },
    { label: "TG", href: "#" },
  ],
  text: "Product Designer and UX Analyst with 5+ years ...",
};

export const cases = [
  {
    id: "fast-checkout",
    title: "E-commerce Fast Checkout",     // placeholder, per-case
    description: "Designed key screens ...", // placeholder
    tags: ["Category", "Role"],             // two pills
    bg: "#ffffff",                          // showcase background color
    link: "#",                              // square-button link (placeholder)
    // showcase is a set of positioned image layers, so the composition
    // and per-layer parallax can be reproduced:
    layers: [
      { src: "assets/fast-checkout/mock-1.png", x: 0,   y: 0,  w: 260, depth: 0.4 },
      { src: "assets/fast-checkout/mock-2.png", x: 300, y: 20, w: 260, depth: 0.7 },
    ],
  },
  // ... 6 more cases
];
```

- `depth` (0–1) controls how much each layer moves during the parallax transition (higher = moves more/appears closer).
- Coordinates are expressed relative to the showcase box and scaled to the container; exact values are extracted from Figma per case during implementation.

## 6. Layout & Visual System

Reference frame is 1350px wide; the site is fluid with a max-width container and scales down responsively.

### Bio slide
- Row: `Anna Belova` (40px, Intel One Mono Medium, white, tracking ≈ -0.8px) · **circular photo** (~110px, slight rotation as in Figma) · `Product Designer` (40px).
- Below: two pill tags (CV, TG), then the bio paragraph (small mono).
- Vertically centered in the viewport.

### Case slide
- **Desktop grid:** left showcase ≈ 62% (Figma 832/1350), right text panel ≈ 36% (Figma 492/1350).
- **Showcase:** a colored background box (`bg`) containing the positioned image `layers`.
- **Text panel:** two pill tags → two-line title (large) → description (small mono) → a small square button (~53×56, rounded) as a placeholder link.

### Tokens (extract exact values from Figma during build)
- Background: near-black (approx `#0d0d0d`–`#111`; confirm exact).
- Type: **Intel One Mono** everywhere. Name/title 40px; tags 12px `#7a7a7a`; caption/description ~10px.
- Pill tag: `background: rgba(255,255,255,.1)`, `border-radius: 8px`, `color: #7a7a7a`.

## 7. Navigation & Parallax

### Paging (desktop)
- `currentIndex` (0 = bio) drives a GSAP tween of the slide-wrapper transform.
- **Wheel** and **keyboard** (ArrowUp/Down, PageUp/Down, Home/End) advance one slide; input is debounced/locked during a transition so a single gesture moves exactly one slide.
- **Dot pagination:** fixed vertical dots (one per slide), active dot highlighted; clicking a dot animates to that slide.
- **Scroll cue:** a subtle hint on the bio slide that fades out after the first navigation.

### Layered-depth parallax
- Each transition runs a GSAP timeline. Within the entering/leaving slide, the showcase **background**, the **image layers** (by `depth`), and the **text panel** translate at different rates so the scene assembles with depth rather than moving as one flat unit.
- Optional subtle pointer-driven drift on the settled showcase layers (low amplitude).

### Accessibility & fallbacks
- **`prefers-reduced-motion: reduce`:** disable parallax and easing; snap instantly between slides.
- Dots and links are keyboard-focusable with visible focus states; images have `alt` text.

## 8. Responsive (Adaptive Slides)

- **Desktop (> ~900px):** side-by-side layout + controlled paging (§7).
- **Mobile/narrow (≤ ~900px):** each slide still fills the viewport, but content **stacks** (showcase on top, text below). Navigation switches to **CSS `scroll-snap-type: y mandatory`** (touch-native, no wheel hijacking), and parallax is softened (ScrollTrigger scrub with reduced amplitude, or off).
- Breakpoint value confirmed during implementation against the layout.

## 9. Assets

- For each case, call the Figma design-context tool to obtain the showcase image asset URLs, then download them into `assets/<case>/` (Figma asset URLs expire ~7 days, so they must be pulled during the build, not linked).
- Bio photo downloaded similarly into `assets/bio/`.

## 10. Verification

Serve locally and verify in a browser:
1. Slides page one-at-a-time on wheel and on arrow/PageUp-Down keys; input locks during transitions.
2. Dot pagination reflects position and jumps to the clicked slide.
3. Layered parallax visibly moves showcase background, image layers, and text panel at different rates during transitions.
4. Scroll cue appears on the bio slide and fades after first navigation.
5. At mobile widths the layout stacks and scroll-snapping works via touch.
6. With `prefers-reduced-motion` enabled, motion is disabled and slides still navigate.
7. Intel One Mono renders (self-hosted), and all 8 slides match the Figma composition.
