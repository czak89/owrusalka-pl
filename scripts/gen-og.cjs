/* Social share image (Open Graph), 1200x630, built from brand assets:
     node scripts/gen-og.cjs
   Writes public/assets/og-rusalka.jpg. Re-run when the logo, the fonts or the
   tagline change. Needs Playwright (npx playwright install chromium). */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const b64 = (p) => fs.readFileSync(path.join(root, p)).toString('base64');
const tokens = fs.readFileSync(path.join(root, 'design-system/tokens.css'), 'utf8');

const html = `<!doctype html><html lang="pl" data-theme="light"><head><meta charset="utf-8"><style>
${tokens}
@font-face { font-family: "OG Newsreader"; src: url(data:font/ttf;base64,${b64('design-system/fonts/Newsreader-VariableFont_opsz_wght.ttf')}); font-weight: 200 800; }
@font-face { font-family: "OG Nunito"; src: url(data:font/ttf;base64,${b64('design-system/fonts/Nunito-VariableFont_wght.ttf')}); font-weight: 200 1000; }
@font-face { font-family: "OG Pacifico"; src: url(data:font/ttf;base64,${b64('design-system/fonts/Pacifico-Regular.ttf')}); }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; position: relative; overflow: hidden;
  background: url(data:image/jpeg;base64,${b64('public/assets/seaside-backdrop.jpg')}) center 60% / cover; }
.card { position: absolute; left: 70px; top: 70px; width: 1060px; height: 490px;
  background: var(--c-paper); border: 1px solid var(--c-paper-edge); border-radius: 28px;
  padding: 56px 64px; display: flex; flex-direction: column; justify-content: space-between; }
img { height: 150px; width: auto; align-self: flex-start; }
h1 { font: 500 64px/1.08 "OG Newsreader", serif; letter-spacing: -0.02em; color: var(--c-deep-sea); }
h1 em { font-style: normal; color: var(--c-baltic-dark, var(--c-deep-sea)); }
.row { display: flex; justify-content: space-between; align-items: baseline; }
.meta { font: 700 26px/1.2 "OG Nunito", sans-serif; color: var(--c-deep-sea); }
.script { font: 400 34px/1 "OG Pacifico", cursive; font-feature-settings: "ss01" 1; color: var(--c-coral); }
</style></head><body>
<div class="card">
  <img src="data:image/png;base64,${b64('public/assets/logo-rusalka-full.png')}" alt="">
  <h1>Rodzinne wakacje<br>nad Bałtykiem.</h1>
  <div class="row"><span class="meta">Łazy k. Mielna · 50 metrów od plaży</span><span class="script">witamy w Łazach</span></div>
</div></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(root, 'public/assets/og-rusalka.jpg');
  await page.screenshot({ path: out, type: 'jpeg', quality: 86 });
  await browser.close();
  console.log('wrote', out);
})();
