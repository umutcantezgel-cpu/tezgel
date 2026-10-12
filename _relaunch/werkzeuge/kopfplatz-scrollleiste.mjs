// P4-GEG2 N-E: Platz im Kern-Kopf mit klassischer Scrollleiste (Playwright setzt sonst --hide-scrollbars).
//   Misst je Breite: Breite der Scrollleiste, verfügbare Breite, Bedarf der Felder, Überlauf, Umbruch in der Navigation,
//   Überlappung Logo/Navigation (Markenfeld schmaler als sein Inhalt). Nur lesen.
// Nutzung: RELAUNCH_BASE=http://127.0.0.1:4324 node kopfplatz-scrollleiste.mjs [--seiten /,/bad] [--breiten 1280,1290,1296,1300,1310] [--aus <json>]
import fs from 'node:fs';
import { chromium } from '@playwright/test';
import { installSperre, setzeEinwilligung, BASE, assertLocal } from './lib.mjs';
assertLocal();
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const seiten = arg('--seiten', '/').split(',');
const breiten = arg('--breiten', '1264,1280,1290,1296,1300,1310,1366').split(',').map(Number);
const aus = arg('--aus', null);
const browser = await chromium.launch({ ignoreDefaultArgs: ['--hide-scrollbars'], args: ['--font-render-hinting=none'] });
const ergebnis = { base: BASE, bedingungen: { scrollleiste: 'klassisch (ohne --hide-scrollbars)', einwilligung: 'abgelehnt', dpr: 1 }, messungen: [] };
for (const s of seiten) for (const w of breiten) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  await installSperre(ctx); await setzeEinwilligung(ctx, 'abgelehnt');
  const page = await ctx.newPage();
  await page.goto(BASE + s, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const kopf = document.querySelector('header[data-kopf="b"]') || document.querySelector('header');
    const innen = kopf.firstElementChild;
    const cs = getComputedStyle(innen);
    const verfuegbar = innen.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const kinder = [...innen.children].filter((c) => getComputedStyle(c).display !== 'none');
    const felder = kinder.map((c) => Math.round(c.getBoundingClientRect().width));
    const marke = innen.children[0];
    const markeInhalt = marke.firstElementChild ? Math.round(marke.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(marke).paddingRight)) : 0;
    const bedarf = markeInhalt + felder.slice(1).reduce((a, b) => a + b, 0);
    const markeBox = marke.getBoundingClientRect(); const logoBox = marke.firstElementChild?.getBoundingClientRect();
    const nav = [...kopf.querySelectorAll('nav li > a, nav li > button, nav li > span > a, nav li > div > a, nav li > div > button')].filter((e) => e.getClientRects().length);
    const navZeilen = nav.map((e) => { const rg = document.createRange(); rg.selectNodeContents(e); return new Set([...rg.getClientRects()].filter((q) => q.width > 1).map((q) => Math.round(q.top))).size; });
    const navErster = nav[0]?.getBoundingClientRect();
    return {
      scrollleiste_px: innerWidth - document.documentElement.clientWidth,
      xl_aktiv: matchMedia('(min-width: 80rem)').matches,
      verfuegbar: Math.round(verfuegbar), bedarf, reserve: Math.round(verfuegbar) - bedarf, felder,
      logo_ragt_ueber_markenfeld_px: logoBox ? Math.max(0, Math.round(logoBox.right - markeBox.right)) : null,
      logo_ueberlappt_nav: logoBox && navErster ? logoBox.right > navErster.left - 1 : null,
      ueberlauf_kopf: innen.scrollWidth > innen.clientWidth + 1,
      ueberlauf_seite: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      nav_eintraege: nav.length, nav_mehrzeilig: navZeilen.filter((z) => z > 1).length,
    };
  });
  ergebnis.messungen.push({ seite: s, breite: w, ...r });
  console.log(s, w, JSON.stringify(r));
  await ctx.close();
}
await browser.close();
if (aus) fs.writeFileSync(aus, JSON.stringify(ergebnis, null, 1));
