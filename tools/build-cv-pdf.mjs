// Regenerate both downloadable CV PDFs (RU + EN) from cv.html (run after editing `cv` in js/data.js):
//   python3 serve.py 5555 &   then   node tools/build-cv-pdf.mjs [http://localhost:5555]
// Needs Playwright (`npm i -g playwright && npx playwright install chromium` if missing).
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// require() (unlike import) honors NODE_PATH, so a global install works:
//   NODE_PATH=$(npm root -g) node tools/build-cv-pdf.mjs
const { chromium } = createRequire(import.meta.url)("playwright");

const base = process.argv[2] || "http://localhost:5555";

const browser = await chromium.launch();
const page = await browser.newPage();
for (const lang of ["ru", "en"]) {
  const out = fileURLToPath(new URL(`../assets/cv/anna-belova-cv-${lang}.pdf`, import.meta.url));
  await page.goto(`${base}/cv.html?lang=${lang}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", out);
}
await browser.close();
