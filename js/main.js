import { bio, cases, en as EN } from "./data.js";
import { nbsp, buildActions, initTheme } from "./shared.js";

document.documentElement.classList.add("js"); // enables reveal hiding only when JS runs
// Always start at the top so blocks reveal in sequence (no mid-page restore
// leaving upper blocks hidden).
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
const app = document.getElementById("app");

/* ── language (RU / EN) ──────────────────────────────────────────────── */
// The page is written in Russian; `en` in data.js maps each Russian string to its
// English version. The choice is saved in localStorage ("lang") and shared with cv.html.
const TITLES = { ru: "Анна Белова — Продуктовый дизайнер", en: "Anna Belova — Product Designer" };
let LANG = "ru";
try { if (localStorage.getItem("lang") === "en") LANG = "en"; } catch (e) {}

// Deep-copy content, swapping every Russian string that has an English version.
function tr(v) {
  if (typeof v === "string") return LANG === "en" && EN[v] ? EN[v] : v;
  if (Array.isArray(v)) return v.map(tr);
  if (v && typeof v === "object") { const o = {}; for (const k in v) o[k] = tr(v[k]); return o; }
  return v;
}

const langBtn = document.createElement("button");
langBtn.id = "lang-toggle";
langBtn.type = "button";
function renderLangBtn() {
  langBtn.textContent = LANG === "ru" ? "EN" : "RU"; // label = language you switch to
  langBtn.setAttribute("aria-label", LANG === "ru" ? "Switch to English" : "Переключить на русский");
  document.documentElement.lang = LANG;
  document.title = TITLES[LANG];
}

/* ── helpers ─────────────────────────────────────────────────────────── */

function pill(label, href) {
  const el = href ? document.createElement("a") : document.createElement("span");
  if (href) el.href = href;
  el.className = "pill";
  el.textContent = label;
  return el;
}

// Wrap **fragment** of the title in an accent span (after binding hanging prepositions).
function titleHTML(title) {
  return nbsp(title).replace(/\*\*(.+?)\*\*/g, '<span class="accent">$1</span>');
}

// Mark an element as reveal-on-scroll with its stagger index.
function reveal(el, i) {
  el.classList.add("reveal");
  el.style.setProperty("--i", i);
  return el;
}

function buildLayer(layer) {
  const [x, y, w, h] = layer.box;
  const box = document.createElement("div");
  box.className = "layer";
  box.style.cssText = `left:${x}px; top:${y}px; width:${w}px; height:${h}px; border-radius:${layer.radius}px;`;
  const img = document.createElement("img");
  img.className = "layer__img";
  img.src = layer.src;
  img.alt = "";
  img.loading = "lazy";
  if (layer.crop) {
    const [l, t, cw, ch] = layer.crop; // pre-computed cover fit, in %
    img.style.cssText = `left:${l}%; top:${t}%; width:${cw}%; height:${ch}%;`;
  } else {
    img.style.cssText = `left:0; top:0; width:100%; height:100%; object-fit:cover;`;
  }
  box.appendChild(img);
  return box;
}

function buildMedia(img) {
  const wrap = document.createElement("div");
  wrap.className = "showcase-wrap";
  wrap.style.aspectRatio = `${img.w} / ${img.h}`;
  const sc = document.createElement("div");
  sc.className = "showcase";
  sc.dataset.dw = img.w;
  sc.style.cssText =
    `width:${img.w}px; height:${img.h}px; border-radius:${img.radius}px;` +
    (img.bg ? `background:${img.bg};` : "");
  img.layers.forEach((l) => sc.appendChild(buildLayer(l)));
  wrap.appendChild(sc);
  return wrap;
}

/* ── blocks ──────────────────────────────────────────────────────────── */

function renderBio(b) {
  const s = document.createElement("section");
  s.className = "block bio";

  // top-right action bar: header buttons (CV / TG) + the theme toggle to their right
  const actions = buildActions(b.actions.filter((a) => a.inHeader), "bio__actions");
  const toggle = document.getElementById("theme-toggle");
  actions.appendChild(langBtn);
  if (toggle) actions.appendChild(toggle);

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

  const text = document.createElement("p");
  text.className = "bio__text";
  text.textContent = nbsp(b.text);

  meta.append(pills, text);

  // headline + meta share a narrower column; the action bar spans full width
  const inner = document.createElement("div");
  inner.className = "bio__inner";
  inner.append(reveal(headline, 1), reveal(meta, 2));

  s.append(reveal(actions, 0), inner);
  return s;
}

function renderCase(c) {
  const s = document.createElement("section");
  s.className = "block case";
  let i = 0;

  if (c.tags && c.tags.length) {
    const tags = document.createElement("div");
    tags.className = "case__tags";
    c.tags.forEach((t) => tags.appendChild(pill(t)));
    s.appendChild(reveal(tags, i++));
  }

  const title = document.createElement("h2");
  title.className = "case__title";
  if (c.accent) title.style.setProperty("--accent", c.accent);
  title.innerHTML = titleHTML(c.title);
  s.appendChild(reveal(title, i++));

  if (c.client) {
    const client = document.createElement("p");
    client.className = "case__client";
    client.textContent = c.client;
    s.appendChild(reveal(client, i++));
  }

  const row = document.createElement("div");
  row.className = "case__row";

  const media = document.createElement("div");
  media.className = "case__media";
  media.appendChild(buildMedia(c.img));
  reveal(media, i++);

  const body = document.createElement("div");
  body.className = "case__summary";
  c.summary.forEach((t) => {
    const p = document.createElement("p");
    p.textContent = nbsp(t);
    body.appendChild(p);
  });
  reveal(body, i++);

  row.append(media, body);
  s.appendChild(row);
  return s;
}

function renderFooter(b) {
  const f = document.createElement("footer");
  f.className = "block footer";
  const title = document.createElement("h2");
  title.className = "footer__title";
  title.textContent = nbsp(b.contactTitle);
  f.append(reveal(title, 0), reveal(buildActions(b.actions, "footer__actions"), 1));
  return f;
}

/* ── scale each showcase from design px to its rendered width ─────────── */

function sizeShowcases() {
  document.querySelectorAll(".showcase").forEach((sc) => {
    const dw = parseFloat(sc.dataset.dw);
    sc.style.transform = `scale(${sc.parentElement.clientWidth / dw})`;
  });
}

/* ── boot ────────────────────────────────────────────────────────────── */

function renderAll() {
  const b = tr(bio), cs = tr(cases);
  // the CV opens in the same language as the page
  if (LANG === "en") b.actions.forEach((a) => { if (a.href === "cv.html") a.href = "cv.html?lang=en"; });
  app.appendChild(renderBio(b));
  cs.forEach((c) => app.appendChild(renderCase(c)));
  app.appendChild(renderFooter(b));
}
renderLangBtn();
renderAll();

sizeShowcases();
window.addEventListener("resize", sizeShowcases);
window.addEventListener("load", sizeShowcases);

// Reveal each block once, as it scrolls into view. Previous blocks stay put.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce) {
  document.querySelectorAll(".block").forEach((b) => b.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        obs.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );
  document.querySelectorAll(".block").forEach((b) => io.observe(b));
}

initTheme();

langBtn.addEventListener("click", () => {
  LANG = LANG === "ru" ? "en" : "ru";
  try { localStorage.setItem("lang", LANG); } catch (e) {}
  const theme = document.getElementById("theme-toggle");
  document.body.insertBefore(theme, app); // rescue the toggles before clearing #app
  app.innerHTML = "";
  renderLangBtn();
  renderAll();
  document.querySelectorAll(".block").forEach((b) => b.classList.add("is-in")); // no re-reveal on switch
  sizeShowcases();
  theme.dispatchEvent(new Event("langchange")); // theme toggle re-labels itself
  langBtn.focus();
});

console.log("[portfolio] rendered", cases.length, "cases (vertical scroll)");
