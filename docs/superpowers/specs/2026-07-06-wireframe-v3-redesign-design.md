# Wireframe v3 redesign — design spec

**Date:** 2026-07-06
**Figma:** file `Lpw0GfkLHeeRED9sUallH8`, frame `173:866` ("Desktop: wireframe")
**Supersedes layout/content decisions in:** `2026-07-05-anna-belova-portfolio-design.md`

## Context

The portfolio (vanilla HTML/CSS/JS, data-driven render from `js/data.js`) gets a new
wireframe. Crucially, the **showcase images and their layer geometry are unchanged** — every
layer `box`/`radius`/`crop` in the new wireframe matches the current `js/data.js` exactly, and
the 7 cases keep their order (alfa, iontrack, corgi, drinkit, streaming, ecommerce,
illustrations). So this is a **content + typography** change only. The showcase render/scale
engine, reveal-on-scroll, and theming logic are untouched.

## Goals

- Match the new wireframe's content model and typography.
- Keep the site's non-goals intact: no build step, no framework, no dependencies; self-hosted
  fonts; data-driven render; light/dark theme; reveal-on-scroll; `prefers-reduced-motion`.

## Non-goals / out of scope

- No changes to showcase layer geometry, `sizeShowcases()` scaling, the IntersectionObserver
  reveal, or the theme toggle logic.
- No image re-download (assets are unchanged).

## Approved decisions (from brainstorming)

1. **Case body → single summary.** Replace the 3-block `Контекст / Что сделала / Результат`
   body with one short summary (per the wireframe copy). Detailed breakdown is retired.
2. **Keep CV / TG.** The wireframe replaces the bio's CV/TG links with two credential pills.
   We keep the credential pills **and** retain CV/TG as link-pills (placement below).
3. **Cyrillic-capable mono for body.** The wireframe sets body/bio text in Intel One Mono,
   which has no Cyrillic and the copy is Russian. Use **JetBrains Mono** (full Cyrillic) to keep
   the monospace aesthetic.
4. **Adopt Rubik.** Case titles → Rubik Medium; tags/pills → Rubik Regular; client names →
   Rubik italic (reuse existing 300-italic file). Requires added Rubik 400/500 with Cyrillic.

## Typography system (target)

| Role | Font | Size / style | Color |
|---|---|---|---|
| Bio name / role (headline) | SF Pro (system `--font-sans`) — **unchanged** | 500, clamp→32px, lh 1.1 | `--fg` |
| Case titles | **Rubik Medium 500** (`--font-rubik`) | clamp→32px, lh 1.1 | `--fg`, accent fragment `--accent-ink` |
| Tags + bio pills | **Rubik Regular 400** | 14px, tracking 0.05em (~0.7px), 32px pill height | `--muted` (`#7a7a7a`) |
| Client names | Rubik **300 italic** (existing file) — **unchanged** | clamp→20px italic | `--fg` |
| Bio paragraph + case summary | **JetBrains Mono 400** (`--font-mono`) | 14px, lh 1.5, tracking 0.14px | `--fg` (white/dark, not muted) |

**Font assets:**
- **Add** self-hosted woff2 into `fonts/`: `Rubik 400`, `Rubik 500` (latin+cyrillic),
  `JetBrains Mono 400` (latin+cyrillic), downloaded from Google's font CDN (no hotlinking,
  matching the repo's self-hosted convention). Follow the existing `@font-face` pattern.
- **Keep** `Rubik 300 italic` (latin+cyrillic split) for client names.
- **Remove** the two Intel One Mono `@font-face` rules and delete its woff2 files — it becomes
  unused (all its former text is now Russian, which it can't render). `--font-mono` repoints to
  JetBrains Mono.

## Content model changes (`js/data.js`)

### `bio`
- `text` → new Russian paragraph:
  > Продуктовый дизайнер с 6-летним опытом в UX. Проектирую сложные B2B-продукты на стыке
  > дизайна, исследований и аналитики данных. Помогаю превращать пользовательские инсайты в
  > продуктовые решения
- **Add** `credentials: ["6 лет в UX", "4 года в Enterprise Fintech"]` (plain-text pills).
- **Rename** `tags` → `links` (the CV/TG action links): `[{label:"CV",href:"#"}, {label:"TG",href:"#"}]`.

### `cases[]` — replace `body:[{h,t}…]` with `summary: string[]` (one `<p>` per element)

Titles / tags / client / img / accent stay as in current `data.js`, **except e-commerce** (see
Notes). Summaries (verbatim from wireframe):

- **alfa:** `["Спроектировала VoC Dashboard для продуктовых команд и C-level, объединив клиентскую обратную связь, продуктовые и UX-метрики в единый инструмент для принятия решений"]`
- **iontrack:** `["Спроектировала мобильное приложение, дизайн-систему и пользовательский опыт, помогая подготовить продукт к привлечению инвестиций и выходу на рынок"]`
- **corgi:** `["Перестроила информационную архитектуру платформы для брокеров и андеррайтеров, сделав сложные страховые сценарии понятнее для новых пользователей и быстрее для опытных специалистов"]`
- **drinkit:** `["Исследовала пользовательские сценарии и спроектировала онбординг, который помогает быстрее выбрать первый напиток и одновременно собирает данные для персональных рекомендаций"]`
- **streaming:** `["Исследовала лучшие практики стриминговых сервисов и спроектировала интерфейс, который помогает быстрее принять решение и начать просмотр"]`
- **ecommerce:** `["Исследовала сценарии визуального поиска и поиска по штрихкоду, спроектировав интерфейс, который ускоряет выбор товара и оформление заказа"]`
- **illustrations:** two paragraphs →
  `["Помимо продуктового дизайна создаю иллюстрации и стикерпаки, в которых исследую атмосферу, композицию и визуальное повествование", "Мои работы выпускались совместно с No Kids Stickers (NKS) — брендом с аудиторией более 400 000 подписчиков"]`

**Accent fragments (confirmed against wireframe):**
- alfa: `**продуктового решения**` `#f1015a` · iontrack: `**медицинскую технологию**` `#4963fa`
- corgi: `**по ролям**` `#ff6b48` · drinkit: `**Снизила барьер входа**` `#3f5bff`
- streaming: none · **ecommerce: none** (was `#80ff82`) · illustrations: none

Update the doc-comment header in `data.js` (`body` → `summary`, `tags`→`links` + `credentials`).

## Render changes (`js/main.js`)

- **`renderBio`:** pill row = `credentials` as plain `<span class="pill">` **+** `links`
  (CV/TG) as `<a class="pill pill--link">` appended after them; then the paragraph below.
  (CV/TG placement is our call — wireframe omits it. Chosen: link-pills at the end of the pill
  row. Trivially movable if the user prefers e.g. near the theme toggle.)
- **`renderCase`:** replace the body-blocks loop with `c.summary.map(t => <p>)` inside
  `.case__summary`. Delete the `.h`/heading logic.
- Everything else (`buildMedia`, `buildLayer`, `sizeShowcases`, reveal observer, theme
  toggle) — **unchanged.**

## Style changes (`css/styles.css`)

- Add `--font-rubik: "Rubik", var(--font-sans)`. Repoint `--font-mono` to JetBrains Mono.
- **Pills:** unify `.bio__tags .pill` and `.case__tags .pill` into one spec: 32px height,
  16px x-padding, radius 8, `--tag-bg`, Rubik 400 14px, tracking 0.05em, `--muted`.
  `.pill--link` adds hover/focus affordance (CV/TG are interactive) + `--fg`-ish on hover.
- **Titles:** `.case__title` → `font-family: var(--font-rubik); font-weight: 500;` (keep
  responsive clamp + accent handling + `--accent-ink` light-theme darkening).
- **Summary:** `.case__summary` → JetBrains Mono 14px, lh 1.5, tracking 0.14px, color `--fg`;
  column `flex: 0 0 clamp(240px, 24%, 308px)`, row gap ~24px, vertically centered vs image.
  Multiple `<p>` get paragraph spacing (`p + p { margin-top: 1em }`).
- **Bio text:** `.bio__text` → JetBrains Mono 14px, color `--fg` (up from 10px mono muted).
  `.bio__meta` width → `min(448px, 100%)`. Headline gap 10px → 24px.
- Remove `.case__body p.h` rules; rename `.case__body` → `.case__summary` (or keep class,
  adjust). Mobile/reduced-motion blocks stay.

## Docs to update

- `CLAUDE.md`: Fonts section (Intel One Mono removed → JetBrains Mono for Russian body; Rubik
  expanded to 400/500 for titles/tags); "Editing content" (`body[]` → `summary[]`,
  `tags`→`links`+`credentials`).
- `docs/superpowers/asset-manifest.md`: new node ids (`173:*`), bio/type notes, content model.
- `README.md`: content-model mention (`body` blocks → single summary) if present.

## Verification plan

Use the running preview (port 5556). After implementation:
1. Fonts load (no FOUT surprise); Cyrillic renders in Rubik (titles/tags) and JetBrains Mono
   (body/bio) — inspect `font-family` via `preview_inspect`.
2. Bio: credentials pills + CV/TG link-pills + new paragraph; screenshot.
3. A case: single summary right of image, Rubik title, e-commerce title all-white.
4. Toggle light/dark — accents readable, body/summary swap to dark ink.
5. Narrow viewport (`preview_resize` mobile) — row stacks, no overflow.
6. Console/network clean (`preview_console_logs`, `preview_network`).

## Notes / flagged inconsistencies (resolved, user may revisit)

- **Rubik on titles is inconsistent in the wireframe** — only the Alfa title carries Rubik
  Medium; the other titles are still SF Pro in the file. Per the approved Rubik direction we
  apply Rubik Medium to **all** case titles for consistency.
- **Bio name/role stay SF Pro** while case titles become Rubik — this matches the wireframe's
  bio headline, but means two heading fonts coexist. Kept as approved; easy to unify later.
- **E-commerce accent dropped** — the wireframe renders "покупки" plain white, so ecommerce
  `accent` → `null` and the title loses its `**`-wrapped fragment.
