// Layered-depth parallax played on each slide transition.
// NOTE: never animate `.showcase` transform — it holds the fit-scale.
// We move `.showcase-wrap` (scene) and each `.layer` (depth) instead.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initParallax(slides) {
  const parts = slides.map((s) => ({
    wrap: s.querySelector(".showcase-wrap"),
    layers: [...s.querySelectorAll(".layer")],
    panel: s.querySelector(".panel"),
    bio: s.querySelector(".bio"),
  }));

  function play(_from, to, dir) {
    if (reduce) return;
    const p = parts[to];
    if (!p) return;
    const enter = (dir >= 0 ? 1 : -1) * 70; // px, entrance direction

    const tl = gsap.timeline();

    if (p.wrap) {
      tl.fromTo(
        p.wrap,
        { y: enter * 0.45, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
        0
      );
    }
    p.layers.forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.5;
      tl.fromTo(
        el,
        { y: enter * (0.4 + depth * 0.9) },
        { y: 0, duration: 0.9, ease: "power3.out" },
        0.04
      );
    });
    if (p.panel) {
      tl.fromTo(
        p.panel,
        { y: enter * 1.1, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        0.12
      );
    }
    if (p.bio) {
      tl.fromTo(
        p.bio,
        { y: enter * 0.4, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        0
      );
    }
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
