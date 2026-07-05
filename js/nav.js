// Page-like slide navigation: one gesture = one slide.
// Controlled index tweens the #app wrapper transform via GSAP.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const DURATION = reduce ? 0 : 0.9; // seconds; wheel lock matches this
const LOCK_MS = 900;

// Build the dot rail. Each dot carries a hover/focus hint = the slide title.
function buildDots(labels, onClick) {
  const dots = document.getElementById("dots");
  dots.innerHTML = "";
  labels.forEach((label, i) => {
    const b = document.createElement("button");
    b.className = "dot";
    b.type = "button";
    b.setAttribute("aria-label", `Go to ${label}`);
    const hint = document.createElement("span");
    hint.className = "dot__hint";
    hint.textContent = label;
    b.appendChild(hint);
    b.addEventListener("click", () => onClick(i));
    dots.appendChild(b);
  });
  return [...dots.children];
}

export function initNav({ slides, labels, onChange = () => {} }) {
  const wrap = slides[0].parentElement; // #app
  let index = 0;
  let animating = false;

  const dotEls = buildDots(labels, (i) => goTo(i));
  const setDots = () =>
    dotEls.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"));

  function goTo(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i === index || animating) return;
    const from = index;
    const dir = i > index ? 1 : -1;
    animating = true;
    index = i;
    setDots();
    document.body.dataset.cue = "off";
    onChange(from, i, dir);
    gsap.to(wrap, {
      y: -i * window.innerHeight,
      duration: DURATION,
      ease: "power3.inOut",
      onComplete: () => {
        animating = false;
      },
    });
  }

  // wheel — one notch advances one slide
  let wheelLock = false;
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (wheelLock || animating) return;
      if (Math.abs(e.deltaY) < 8) return;
      wheelLock = true;
      goTo(index + (e.deltaY > 0 ? 1 : -1));
      setTimeout(() => (wheelLock = false), LOCK_MS);
    },
    { passive: false }
  );

  // keyboard
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      goTo(index + 1);
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(slides.length - 1);
    }
  });

  // keep alignment on resize
  window.addEventListener("resize", () => gsap.set(wrap, { y: -index * window.innerHeight }));

  setDots();
  const api = { goTo, current: () => index };
  window.__nav = api;
  return api;
}

// Mobile / touch: native CSS scroll-snap drives paging. Dots jump via
// scrollIntoView; an IntersectionObserver keeps the active dot + cue in sync.
export function initScrollNav({ slides, labels }) {
  const dotEls = buildDots(labels, (i) =>
    slides[i].scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = slides.indexOf(e.target);
        dotEls.forEach((d, j) => d.setAttribute("aria-current", j === i ? "true" : "false"));
        if (i > 0) document.body.dataset.cue = "off";
      });
    },
    { threshold: 0.5 }
  );
  slides.forEach((s) => io.observe(s));
  window.__nav = { current: () => dotEls.findIndex((d) => d.getAttribute("aria-current") === "true") };
}
