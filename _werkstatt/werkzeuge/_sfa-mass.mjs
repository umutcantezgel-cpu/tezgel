// temporär (SF-A): misst die em-Breite jeder H1-Zeile im Schnitt der H1 (nowrap) und das längste Wort
import { chromium } from '@playwright/test';
import { installSperre } from './lib.mjs';
const base = process.argv[2] || 'http://127.0.0.1:4324';
const seiten = (process.argv[3] || '/,/bad,/bad/badsanierung,/bad/barrierefreies-bad,/leistungen,/balkon-terrasse,/referenzen,/ueber-uns').split(',');
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await installSperre(context);
const page = await context.newPage();
for (const s of seiten) {
  await page.goto(base + s, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const cs = getComputedStyle(h1.firstElementChild || h1);
    const zeilen = h1.children.length ? [...h1.children].map((c) => c.textContent.trim()) : [h1.textContent.trim()];
    const probe = document.createElement('span');
    Object.assign(probe.style, { position: 'absolute', whiteSpace: 'nowrap', visibility: 'hidden', fontFamily: cs.fontFamily, fontWeight: cs.fontWeight, fontStretch: cs.fontStretch, letterSpacing: cs.letterSpacing, wordSpacing: cs.wordSpacing, fontSize: '100px', fontVariationSettings: cs.fontVariationSettings, fontFeatureSettings: cs.fontFeatureSettings });
    document.body.appendChild(probe);
    const ls = parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize);
    probe.style.letterSpacing = `${ls}em`;
    const ws = cs.wordSpacing === 'normal' ? 'normal' : `${parseFloat(cs.wordSpacing) / parseFloat(cs.fontSize)}em`;
    probe.style.wordSpacing = ws;
    const mess = (t) => { probe.textContent = t; return +(probe.getBoundingClientRect().width / 100).toFixed(3); };
    const out = zeilen.map((z) => ({ z, em: mess(z) }));
    const woerter = zeilen.join(' ').split(/\s+/).map((w) => ({ w, em: mess(w) })).sort((a, b) => b.em - a.em).slice(0, 2);
    return { font: [cs.fontFamily.split(',')[0], cs.fontWeight, cs.fontStretch, cs.letterSpacing, ws].join(' | '), h1px: parseFloat(getComputedStyle(h1).fontSize), out, woerter };
  });
  console.log(s, JSON.stringify(r));
}
await browser.close();
