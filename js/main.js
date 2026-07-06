import { bio, cases } from "./data.js";

document.documentElement.classList.add("js"); // enables reveal hiding only when JS runs
// Always start at the top so blocks reveal in sequence (no mid-page restore
// leaving upper blocks hidden).
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
const app = document.getElementById("app");

/* ── helpers ─────────────────────────────────────────────────────────── */

function pill(label, href) {
  const el = href ? document.createElement("a") : document.createElement("span");
  if (href) el.href = href;
  el.className = "pill";
  el.textContent = label;
  return el;
}

// Wrap **fragment** of the title in an accent span.
function titleHTML(title) {
  return title.replace(/\*\*(.+?)\*\*/g, '<span class="accent">$1</span>');
}

// Mark an element as reveal-on-scroll with its stagger index.
function reveal(el, i) {
  el.classList.add("reveal");
  el.style.setProperty("--i", i);
  return el;
}

// CV / TG action buttons — shared by the bio header and the footer.
function buildActions(actions, contextClass) {
  const wrap = document.createElement("div");
  wrap.className = contextClass ? `actions ${contextClass}` : "actions";
  actions.forEach((a) => {
    const el = document.createElement("a");
    el.href = a.href;
    el.className = `action action--${a.variant}`;
    el.textContent = a.label;
    if (a.href && a.href !== "#") { el.target = "_blank"; el.rel = "noopener"; }
    wrap.appendChild(el);
  });
  return wrap;
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

  // top-right action bar: CV / TG buttons
  const actions = buildActions(b.actions, "bio__actions");

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
  text.textContent = b.text;

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
    p.textContent = t;
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
  f.appendChild(reveal(buildActions(b.actions, "footer__actions"), 0));
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

app.appendChild(renderBio(bio));
cases.forEach((c) => app.appendChild(renderCase(c)));
app.appendChild(renderFooter(bio));

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

/* ── theme toggle (light / dark) ─────────────────────────────────────── */
(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const effective = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");
  const render = () => {
    const t = effective();
    btn.innerHTML = t === "dark" ? SUN : MOON; // icon = theme you switch to
    btn.setAttribute("aria-label", t === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
  };
  render();
  btn.addEventListener("click", () => {
    const next = effective() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    render();
  });
  // follow the system while the user hasn't made an explicit choice
  systemDark.addEventListener("change", () => { if (!root.dataset.theme) render(); });
})();

console.log("[portfolio] rendered", cases.length, "cases (vertical scroll)");
