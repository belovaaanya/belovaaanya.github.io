// Layered-depth parallax played on each slide transition.
// NOTE: never animate `.showcase` transform — it holds the fit-scale.
// We move `.showcase-wrap` (scene) and each `.layer` (depth) instead.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IN = 190; // entrance offset (px) — larger = more pronounced parallax
const OUT = 120; // exit drift (px) for the leaving slide

export function initParallax(slides) {
  const parts = slides.map((s) => ({
    wrap: s.querySelector(".showcase-wrap"),
    layers: [...s.querySelectorAll(".layer")],
    panel: s.querySelector(".panel"),
    bio: s.querySelector(".bio"),
  }));

  // The leaving slide's elements drift further in the travel direction and fade,
  // so the whole scene comes apart with depth as it exits.
  function leave(p, s) {
    if (!p) return;
    const y = -s * OUT;
    if (p.wrap) gsap.to(p.wrap, { y: y * 0.5, opacity: 0.3, duration: 0.5, ease: "power2.in", overwrite: true });
    if (p.panel) gsap.to(p.panel, { y: y * 1.0, opacity: 0, duration: 0.45, ease: "power2.in", overwrite: true });
    if (p.bio) gsap.to(p.bio, { y: y * 0.6, opacity: 0.2, duration: 0.5, ease: "power2.in", overwrite: true });
    p.layers.forEach((el) => {
      const d = parseFloat(el.dataset.depth) || 0.5;
      gsap.to(el, { y: y * (0.5 + d), duration: 0.5, ease: "power2.in", overwrite: "auto" });
    });
  }

  // The entering slide assembles from an offset, each element at its own rate.
  function enter(p, s) {
    if (!p) return;
    const tl = gsap.timeline();
    if (p.wrap) {
      tl.fromTo(p.wrap, { y: s * IN * 0.35, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.95, ease: "power3.out" }, 0);
    }
    p.layers.forEach((el, i) => {
      const d = parseFloat(el.dataset.depth) || 0.5;
      tl.fromTo(el, { y: s * IN * (0.5 + d * 1.15) }, { y: 0, duration: 1.0, ease: "power3.out" }, 0.03 * i);
    });
    if (p.panel) {
      tl.fromTo(p.panel, { y: s * IN * 1.25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, 0.12);
    }
    if (p.bio) {
      tl.fromTo(p.bio, { y: s * IN * 0.55, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, 0);
    }
  }

  function play(from, to, dir) {
    if (reduce) return;
    const s = dir >= 0 ? 1 : -1;
    leave(parts[from], s);
    enter(parts[to], s);
  }

  // subtle pointer-driven drift on the active slide's layers (depth = amount)
  if (!reduce) {
    window.addEventListener("pointermove", (e) => {
      const idx = window.__nav ? window.__nav.current() : 0;
      const p = parts[idx];
      if (!p || !p.layers.length) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      p.layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth) || 0.5;
        gsap.to(el, { x: cx * depth * 12, duration: 0.7, ease: "power2.out", overwrite: "auto" });
      });
    });
  }

  return { play };
}
