import { bio, cases } from "./data.js";
import { initNav, initScrollNav } from "./nav.js";
import { initParallax } from "./parallax.js";

const app = document.getElementById("app");

/* ── helpers ─────────────────────────────────────────────────────────── */

function pill(label, href, size) {
  const el = href ? document.createElement("a") : document.createElement("span");
  if (href) el.href = href;
  el.className = `pill pill--${size}`;
  el.textContent = label;
  return el;
}

/* build one showcase image layer at design-pixel coordinates */
function buildLayer(layer) {
  const [x, y, w, h] = layer.box;
  const box = document.createElement("div");
  box.className = "layer";
  box.style.cssText =
    `left:${x}px; top:${y}px; width:${w}px; height:${h}px; border-radius:${layer.radius}px;`;
  box.dataset.depth = String(layer.depth ?? 0.5);

  const img = document.createElement("img");
  img.className = "layer__img";
  img.src = layer.src;
  img.alt = "";
  img.loading = "lazy";
  if (layer.crop) {
    const [l, t, cw, ch] = layer.crop; // percentages, pre-computed cover fit
    img.style.cssText = `left:${l}%; top:${t}%; width:${cw}%; height:${ch}%;`;
  } else {
    img.style.cssText = `left:0; top:0; width:100%; height:100%; object-fit:cover;`;
  }
  box.appendChild(img);
  return box;
}

/* ── slides ──────────────────────────────────────────────────────────── */

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
  b.tags.forEach((t) => tags.appendChild(pill(t.label, t.href, "sm")));
  return s;
}

function renderCase(c) {
  const s = document.createElement("section");
  s.className = "slide slide--case";
  s.innerHTML = `
    <div class="case">
      <div class="showcase-wrap" style="aspect-ratio:${c.dw}/${c.dh}">
        <div class="showcase" data-dw="${c.dw}" data-dh="${c.dh}"
             style="width:${c.dw}px; height:${c.dh}px; border-radius:${c.radius}px;${c.bg ? `background:${c.bg};` : ""}"></div>
      </div>
      <div class="panel">
        <div class="panel__tags"></div>
        <h2 class="panel__title">${c.title}</h2>
        <div class="panel__desc">${c.description.map((p) => `<p>${p}</p>`).join("")}</div>
        <a class="panel__btn" href="${c.link}" aria-label="Open ${c.title}"></a>
      </div>
    </div>`;
  const tagWrap = s.querySelector(".panel__tags");
  c.tags.forEach((t) => tagWrap.appendChild(pill(t, null, "lg")));
  const showcase = s.querySelector(".showcase");
  c.layers.forEach((l) => showcase.appendChild(buildLayer(l)));
  return s;
}

/* ── size + scale each showcase to fill its slide ───────────────────── */

const PANEL_MIN = 300; // px reserved for the text panel (desktop)

function sizeShowcases() {
  const isDesktop = window.matchMedia("(min-width: 901px)").matches;
  document.querySelectorAll(".showcase").forEach((sc) => {
    const wrap = sc.parentElement;
    const dw = parseFloat(sc.dataset.dw);
    const dh = parseFloat(sc.dataset.dh);
    const aspect = dw / dh;

    if (isDesktop) {
      const caseEl = wrap.closest(".case");
      const gap = parseFloat(getComputedStyle(caseEl).columnGap) || 40;
      const availH = window.innerHeight * 0.92;                 // near-full height
      const maxW = Math.max(260, caseEl.clientWidth - PANEL_MIN - gap);
      const w = Math.min(maxW, availH * aspect);                // fill height, cap by panel room
      wrap.style.width = `${w}px`;
      sc.style.transform = `scale(${w / dw})`;
    } else {
      wrap.style.width = ""; // full column; CSS controls
      sc.style.transform = `scale(${wrap.clientWidth / dw})`;
    }
  });
}

/* ── boot ────────────────────────────────────────────────────────────── */

app.innerHTML = "";
app.appendChild(renderBio(bio));
cases.forEach((c) => app.appendChild(renderCase(c)));

sizeShowcases();
window.addEventListener("resize", sizeShowcases);
window.addEventListener("load", sizeShowcases);

const slides = [...app.querySelectorAll(".slide")];
const labels = [bio.navLabel, ...cases.map((c) => c.navLabel)];
const parallax = initParallax(slides);
const desktop = window.matchMedia("(min-width: 901px)");

// Own the scroll position: no browser restoration, start at the top.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

if (desktop.matches) {
  // Controlled paging feeds the scroll position to the parallax every frame.
  initNav({ slides, labels, onScroll: (s) => parallax.update(s) });
} else {
  app.style.transform = "none"; // native scroll-snap drives paging
  initScrollNav({ slides, labels });
  const onScroll = () => parallax.updateMobile(window.scrollY);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Re-init cleanly when crossing the desktop/mobile breakpoint.
desktop.addEventListener("change", () => location.reload());

console.log("[portfolio] rendered", cases.length, "cases", desktop.matches ? "(desktop)" : "(mobile)");
