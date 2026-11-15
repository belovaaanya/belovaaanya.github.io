import { cv as CV } from "./data.js";
import { nbsp, makeLink, initTheme } from "./shared.js";

// Renders cv.html from the `cv` object in data.js. The same DOM is printed to
// assets/cv/*.pdf by tools/build-cv-pdf.mjs (print styles live in css/cv.css).

const root = document.getElementById("cv");

// Language: ?lang=en, else Russian. Each language has its own text and PDF.
const lang = new URLSearchParams(location.search).get("lang") === "en" ? "en" : "ru";
const cv = CV[lang];
const t = cv.ui;
document.documentElement.lang = lang;
document.title = `${cv.name} — CV`;

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = nbsp(text);
  return n;
}

function section(title, ...children) {
  const s = el("section", "cv-section");
  s.append(el("h2", "cv-section__title", title));
  const body = el("div", "cv-section__body");
  body.append(...children);
  s.append(body);
  return s;
}

/* toolbar (screen only): back to portfolio · download PDF · theme toggle */
const bar = el("nav", "cv-bar");
const back = makeLink({ label: t.back, href: "./" }, "action action--ghost");
const right = el("div", "actions");
const langs = el("div", "cv-lang");
langs.setAttribute("aria-label", "Language");
["ru", "en"].forEach((l) => {
  const a = document.createElement("a");
  a.href = l === "ru" ? "cv.html" : "cv.html?lang=en";
  a.textContent = l.toUpperCase();
  a.className = "cv-lang__opt";
  a.lang = l;
  if (l === lang) a.setAttribute("aria-current", "true");
  langs.append(a);
});
const dl = makeLink({ label: t.download, href: cv.pdf }, "action action--tg");
dl.setAttribute("download", cv.pdfName);
right.append(langs, dl);
const toggle = document.getElementById("theme-toggle");
if (toggle) right.append(toggle);
bar.append(back, right);

/* header */
const head = el("header", "cv-head");
head.append(el("h1", "cv-head__name", cv.name), el("p", "cv-head__role", cv.role));
const contacts = el("p", "cv-head__contacts");
cv.contacts.forEach((c) => contacts.append(makeLink(c, "cv-link")));
head.append(contacts, el("p", "cv-head__loc", cv.location));

/* summary */
const summary = el("div", "cv-summary");
cv.summary.forEach((t) => summary.append(el("p", null, t)));

/* experience */
const jobs = cv.experience.map((j) => {
  const a = el("article", "cv-job");
  const top = el("div", "cv-job__top");
  const name = el("h3", "cv-job__role");
  name.append(document.createTextNode(j.role + " · "), el("span", "cv-job__company", j.company));
  top.append(name, el("span", "cv-job__period", j.period));
  a.append(top);
  if (j.about) a.append(el("p", "cv-job__about", j.about));
  const ul = el("ul", "cv-job__points");
  j.points.forEach((p) => {
    const li = el("li");
    if (p.title) li.append(el("b", null, p.title + ". "));
    li.append(document.createTextNode(nbsp(p.text)));
    ul.append(li);
  });
  a.append(ul);
  return a;
});

/* artifacts */
const arts = el("ul", "cv-list");
cv.artifacts.forEach((x) => {
  const li = el("li");
  li.append(makeLink(x, "cv-link"), document.createTextNode(" — " + nbsp(x.text)));
  arts.append(li);
});

/* skills */
const skills = el("dl", "cv-skills");
cv.skills.forEach((s) => skills.append(el("dt", null, s.group), el("dd", null, s.items)));

/* education + courses + languages */
const edu = el("div", "cv-edu");
cv.education.forEach((e) => {
  const d = el("div", "cv-edu__item");
  const top = el("div", "cv-job__top");
  top.append(el("h3", "cv-job__role", e.title), el("span", "cv-job__period", e.period));
  d.append(top, el("p", "cv-job__about", e.text));
  edu.append(d);
});
const courses = el("ul", "cv-list");
cv.courses.forEach((c) => courses.append(el("li", null, c)));

root.append(
  bar,
  head,
  section(t.about, summary),
  section(t.experience, ...jobs),
  section(t.artifacts, arts),
  section(t.skills, skills),
  section(t.education, edu),
  section(t.courses, courses),
  section(t.languages, el("p", "cv-plain", cv.languages)),
);

initTheme();
