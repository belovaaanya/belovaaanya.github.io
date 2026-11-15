// Helpers shared by the portfolio (main.js) and the CV page (cv.js).

// Bind short Russian prepositions/conjunctions to the next word with a non-breaking
// space so they never hang at the end of a line (борьба с висячими предлогами).
// Targets only genuine function words — a plain space elsewhere still wraps normally.
const SHORT_WORDS = new Set([
  "в", "во", "и", "а", "к", "ко", "с", "со", "о", "об", "у", "я", "на", "за", "из",
  "от", "до", "по", "но", "не", "для", "при", "над", "под", "без", "про", "что", "как", "или",
]);
export function nbsp(text) {
  // For each word + trailing whitespace: if the word (ignoring surrounding
  // punctuation / **accent** markers) is a short function word, glue it to the
  // next word with a non-breaking space. Token-based, so every gap is handled
  // exactly once — no boundary-consumption gaps, works next to punctuation.
  return text.replace(/(\S+)(\s+)/g, (m, word) => {
    const bare = word.replace(/^[^A-Za-zА-Яа-яЁё]+|[^A-Za-zА-Яа-яЁё]+$/g, "").toLowerCase();
    return SHORT_WORDS.has(bare) ? word + "\u00A0" : m;
  });
}

// Anchor from an action ({label, href}); opens real (non-"#") links in a new tab.
export function makeLink(a, className) {
  const el = document.createElement("a");
  el.href = a.href;
  el.className = className;
  el.textContent = a.label;
  if (/^https?:/i.test(a.href)) { el.target = "_blank"; el.rel = "noopener"; } // new tab for real links only
  // Feed the cursor position to the CSS hover glow (see .action::before in styles.css).
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
  return el;
}

// CV / TG as styled buttons (bio header).
export function buildActions(actions, contextClass) {
  const wrap = document.createElement("div");
  wrap.className = contextClass ? `actions ${contextClass}` : "actions";
  actions.forEach((a) => wrap.appendChild(makeLink(a, `action action--${a.variant}`)));
  return wrap;
}

/* ── theme toggle (light / dark) ─────────────────────────────────────── */
export function initTheme() {
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
    const en = root.lang === "en";
    btn.setAttribute("aria-label", t === "dark"
      ? (en ? "Switch to light theme" : "Включить светлую тему")
      : (en ? "Switch to dark theme" : "Включить тёмную тему"));
  };
  render();
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  btn.addEventListener("click", () => {
    const next = effective() === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      render();
      // the new icon spins in
      if (!calm.matches && btn.firstElementChild?.animate) btn.firstElementChild.animate(
        [{ transform: "rotate(-90deg) scale(0.6)", opacity: 0 }, { transform: "none", opacity: 1 }],
        { duration: 450, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" });
    };
    // Soft circular reveal from the button; instant when motion is reduced or unsupported.
    if (calm.matches || !document.startViewTransition) return apply();
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  });
  btn.addEventListener("langchange", render); // main.js fires it after RU/EN switch
  // follow the system while the user hasn't made an explicit choice
  systemDark.addEventListener("change", () => { if (!root.dataset.theme) render(); });
}

