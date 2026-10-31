// Prüfer 1 (Leitplanken): Überlauf/Abschneiden und Klappverhalten, vor gegen nach
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import { ANSICHTEN, assertLocal, installSperre, setzeEinwilligung, bereit, durchscrollen, ueberlauf, CHROME } from './lib.mjs';
const OUT = process.env.PR_OUT;
const SEITEN = ['/leistungen', '/kontakt', '/ueber-uns', '/fliesen'];
const GERAETE = (process.env.PR_GERAETE || 'm360,m390,t768,t1024,d1440').split(',');
const SCHRIFTEN = (process.env.PR_SCHRIFT || '100,200').split(',').map(Number);
const BASEN = { vor: 'http://127.0.0.1:4325', nach: 'http://127.0.0.1:4473' };
const browser = await chromium.launch({ executablePath: CHROME || undefined });
const erg = {};
for (const [name, base] of Object.entries(BASEN)) {
  assertLocal(base);
  for (const g of GERAETE) for (const pct of SCHRIFTEN) for (const s of SEITEN) {
    const a = ANSICHTEN[g];
    const context = await browser.newContext({ viewport: { width: a.width, height: a.height }, isMobile: a.isMobile, hasTouch: a.hasTouch, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'no-preference' });
    await installSperre(context);
    await setzeEinwilligung(context, 'abgelehnt', base);
    if (pct !== 100) await context.addInitScript((p) => { const add = () => { const st = document.createElement('style'); st.textContent = `html { font-size: ${p}% !important; }`; (document.head || document.documentElement).appendChild(st); }; if (document.documentElement) add(); else new MutationObserver((_, o) => { if (document.documentElement) { o.disconnect(); add(); } }).observe(document, { childList: true }); }, pct);
    const page = await context.newPage();
    await page.goto(base + s, { waitUntil: 'load' });
    await bereit(page);
    await durchscrollen(page, { pauseMs: 80 });
    // alle details öffnen: Überlauf auch im geöffneten Zustand
    const zu = await ueberlauf(page);
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
    await page.waitForTimeout(150);
    const offen = await ueberlauf(page);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    erg[`${name}|${g}|${pct}|${s}`] = { zu, offen, h };
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(erg, null, 1));
// Vergleich: neue Befunde in nach
const key = (b) => `${b.art}:${b.tag || ''}:${(b.cls || b.text || '').slice(0, 50)}`;
let neu = 0;
for (const k of Object.keys(erg).filter((k) => k.startsWith('nach|'))) {
  const v = erg[k.replace('nach|', 'vor|')];
  for (const z of ['zu', 'offen']) {
    const vk = new Set(v[z].map(key));
    const n = erg[k][z].filter((b) => !vk.has(key(b)));
    if (n.length) { neu += n.length; console.log('NEU', k, z, JSON.stringify(n.slice(0, 4))); }
  }
}
console.log('fertig, neue Befunde:', neu);
