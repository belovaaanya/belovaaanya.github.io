// Scroll-position-driven parallax.
// Every element's vertical offset is a continuous function of the current
// scroll position, so images and text slide at DIFFERENT speeds throughout the
// whole scroll / slide transition (not a canned animation that settles early).
//
// For a slide k, `off = k*vh - scrollY` is 0 when that slide is centered.
// An element with speed factor `f` is translated by `off * (f - 1)`, so its
// on-screen travel is `f×` the scroll:
//   f < 1  → moves slower than the page (background, lags behind)
//   f = 1  → moves with the page
//   f > 1  → moves faster than the page (foreground, e.g. the text panel)
//
// NOTE: never touch `.showcase` transform — it holds the fit-scale. We move
// `.showcase-wrap` (scene) and each `.layer` (depth) instead.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initParallax(slides) {
  const items = slides.map((s, k) => {
    const els = [];
    const wrap = s.querySelector(".showcase-wrap");
    if (wrap) els.push({ el: wrap, f: 0.86, fade: false, layer: false, d: 0.5 });
    s.querySelectorAll(".layer").forEach((el) => {
      const d = parseFloat(el.dataset.depth) || 0.5;
      els.push({ el, f: 0.7 + d * 0.7, fade: false, layer: true, d }); // 0.7‥1.4
    });
    const panel = s.querySelector(".panel");
    if (panel) els.push({ el: panel, f: 1.28, fade: true, layer: false, d: 0.5 });
    const bio = s.querySelector(".bio");
    if (bio) els.push({ el: bio, f: 1.14, fade: true, layer: false, d: 0.5 });
    return { slide: s, els };
  });

  // Desktop: full translate (+ gentle fade) parallax vs. scroll position.
  // `off` = slide's real layout top − scroll position (0 when centered).
  function update(scrollY) {
    if (reduce) return;
    for (const { slide, els } of items) {
      const off = slide.offsetTop - scrollY;
      const h = slide.offsetHeight || window.innerHeight;
      for (const it of els) {
        const y = off * (it.f - 1);
        if (it.fade) {
          const o = Math.max(0.12, 1 - Math.min(1, Math.abs(off) / h) * 0.9);
          gsap.set(it.el, { y, opacity: o });
        } else {
          gsap.set(it.el, { y });
        }
      }
    }
  }

  // Mobile: subtle layer-only drift, kept small so clipped layers never
  // reveal their edges, and text/layout is left untouched (no reflow).
  function updateMobile(scrollY) {
    if (reduce) return;
    for (const { slide, els } of items) {
      const h = slide.offsetHeight || window.innerHeight;
      const t = Math.max(-1, Math.min(1, (slide.offsetTop - scrollY) / h)); // -1‥1
      for (const it of els) {
        if (it.layer) gsap.set(it.el, { y: t * (8 + it.d * 26) });
      }
    }
  }

  return { update, updateMobile };
}
