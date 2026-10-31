// Prüfer 1 (Leitplanken): Verhalten der Änderungen im Browser (nach, optional vor)
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import { ANSICHTEN, assertLocal, installSperre, setzeEinwilligung, bereit, durchscrollen, CHROME } from './lib.mjs';
const BASE = process.env.RELAUNCH_BASE;
assertLocal(BASE);
const OUT = process.env.PR_OUT;
const browser = await chromium.launch({ executablePath: CHROME || undefined });
const erg = {};
async function ctx(g, { reduced = 'no-preference', pct = 100 } = {}) {
  const a = ANSICHTEN[g];
  const context = await browser.newContext({ viewport: { width: a.width, height: a.height }, isMobile: a.isMobile, hasTouch: a.hasTouch, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: reduced });
  await installSperre(context);
  await setzeEinwilligung(context, 'abgelehnt', BASE);
  if (pct !== 100) await context.addInitScript((p) => { const add = () => { const st = document.createElement('style'); st.textContent = `html { font-size: ${p}% !important; }`; (document.head || document.documentElement).appendChild(st); }; if (document.documentElement) add(); else new MutationObserver((_, o) => { if (document.documentElement) { o.disconnect(); add(); } }).observe(document, { childList: true }); }, pct);
  return context;
}
// 1) /ueber-uns Ortsliste: d1440 sichtbar ohne Öffnen, per Tab erreichbar; m390 zu, nach Tippen offen
for (const g of ['d1440', 't1024', 'm390']) {
  const context = await ctx(g); const page = await context.newPage();
  await page.goto(BASE + '/ueber-uns', { waitUntil: 'load' }); await bereit(page);
  const r = await page.evaluate(() => {
    const d = document.querySelector('details.orte-zu');
    const s = d.querySelector('summary');
    const links = [...d.querySelectorAll('a[href^="/standorte/"]')];
    const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    return { open: d.open, summarySichtbar: vis(s), linkAnzahl: links.length, linksSichtbar: links.filter(vis).length, h: Math.round(d.getBoundingClientRect().height) };
  });
  const sichtbarVorKlick = r.linksSichtbar;
  let fokus = null;
  if (g !== 'm390') {
    const erstes = page.locator('details.orte-zu a[href^="/standorte/"]').first();
    await erstes.scrollIntoViewIfNeeded();
    await erstes.focus();
    fokus = await page.evaluate(() => { const a = document.activeElement; return { tag: a.tagName, href: a.getAttribute('href'), imOffen: !!a.closest('details.orte-zu'), sichtbar: a.getBoundingClientRect().width > 0 }; });
    // Tab-Taste erreicht die Links?
    await page.evaluate(() => document.activeElement.blur());
    await page.locator('details.orte-zu').evaluate((d) => { const prev = d.previousElementSibling; (prev || d.parentElement).setAttribute('tabindex', '-1'); (prev || d.parentElement).focus(); });
    let erreicht = false;
    for (let i = 0; i < 6 && !erreicht; i++) { await page.keyboard.press('Tab'); erreicht = await page.evaluate(() => !!document.activeElement.closest('details.orte-zu') && document.activeElement.tagName === 'A'); }
    fokus.tabErreicht = erreicht;
  } else {
    await page.locator('details.orte-zu > summary').click();
    const nachKlick = await page.evaluate(() => { const d = document.querySelector('details.orte-zu'); return { open: d.open, links: [...d.querySelectorAll('a')].filter((a) => a.getBoundingClientRect().height > 0).length }; });
    fokus = nachKlick;
  }
  erg[`ortsliste|${g}`] = { ...r, fokus };
  await context.close();
}
// 2) /kontakt: Hauptknopf springt zum Formular; Formular in Sicht
for (const g of ['d1440', 'm390', 'q844']) {
  const context = await ctx(g); const page = await context.newPage();
  await page.goto(BASE + '/kontakt', { waitUntil: 'load' }); await bereit(page);
  const vh = ANSICHTEN[g].height;
  const vor = await page.evaluate(() => { const b = [...document.querySelectorAll('main a[data-erstes-bild="hauptknopf"]')].find((x) => x.getBoundingClientRect().width > 0); const r = b?.getBoundingClientRect(); const k = document.querySelector('#express-anfrage button[aria-pressed]'); const kr = k?.getBoundingClientRect(); return { knopf: r && { top: Math.round(r.top), bottom: Math.round(r.bottom), href: b.getAttribute('href') }, ersteKachelTop: kr && Math.round(kr.top), sectionTop: Math.round(document.querySelector('#express-anfrage').getBoundingClientRect().top) }; });
  await page.locator('main a[data-erstes-bild="hauptknopf"]:visible').first().click({ timeout: 8000 });
  await page.waitForTimeout(900);
  const nach = await page.evaluate(() => { const k = document.querySelector('#express-anfrage button[aria-pressed]'); const kr = k?.getBoundingClientRect(); const kopf = document.querySelector('header')?.getBoundingClientRect(); return { hash: location.hash, scrollY: Math.round(scrollY), ersteKachelTop: kr && Math.round(kr.top), ersteKachelBottom: kr && Math.round(kr.bottom), kopfBottom: kopf && Math.round(kopf.bottom), sectionTop: Math.round(document.querySelector('#express-anfrage').getBoundingClientRect().top) }; });
  erg[`hauptknopf|${g}`] = { vh, vor, nach };
  await context.close();
}
// 3) /fliesen Verband: Zustände, Foto nie hochskaliert, Höhe des Felds
for (const g of ['d1440', 'm390']) {
  const context = await ctx(g); const page = await context.newPage();
  await page.goto(BASE + '/fliesen', { waitUntil: 'load' }); await bereit(page);
  const ergv = {};
  for (const m of ['halb', 'kreuz', 'drittel', 'fisch', 'halb']) {
    await page.locator(`input[data-verband-wahl="${m}"]`).evaluate((i) => i.scrollIntoView({ block: 'center' }));
    await page.locator(`input[data-verband-wahl="${m}"]`).check({ force: true });
    await page.waitForTimeout(1300);
    const s = await page.evaluate(() => {
      const fv = [...document.querySelectorAll('.verband-foto')].map((e) => ({ m: e.dataset.musterFoto, sichtbar: e.getBoundingClientRect().height > 0, w: Math.round(e.getBoundingClientRect().width) }));
      const imgs = [...document.querySelectorAll('.verband-foto img')].map((i) => ({ nat: i.naturalWidth, cw: Math.round(i.getBoundingClientRect().width), dpr: devicePixelRatio, geladen: i.complete && i.naturalWidth > 0, src: (i.currentSrc || '').slice(-60), alt: i.alt }));
      const feld = document.querySelectorAll('.verband .verband-bewegt')[1] || document.querySelector('.verband .verband-bewegt');
      const z = document.querySelector('.verband-zeichnung');
      return { fv, imgs, feldH: Math.round(feld.getBoundingClientRect().height), zeichnungX: Math.round(z.getBoundingClientRect().left), zeichnungW: Math.round(z.getBoundingClientRect().width), seitenH: document.documentElement.scrollHeight, texte: [...document.querySelectorAll('.muster-text')].filter((e) => getComputedStyle(e).visibility === 'visible').map((e) => e.dataset.muster) };
    });
    ergv[m + (Object.keys(ergv).includes(m) ? '-2' : '')] = s;
  }
  erg[`verband|${g}`] = ergv;
  await context.close();
}
// 4) Bewegungsschalter (ruhig) und reduzierte Bewegung: Endzustand der Karte und Sichtbarkeit der Führungslinien
for (const [g, reduced] of [['d1440', 'reduce'], ['m390', 'reduce'], ['d1440', 'no-preference']]) {
  for (const s of ['/kontakt', '/ueber-uns']) {
    const context = await ctx(g, { reduced }); const page = await context.newPage();
    await page.goto(BASE + s, { waitUntil: 'load' }); await bereit(page);
    await page.locator('[data-motion="karte"]').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
      const k = document.querySelector('[data-motion="karte"]');
      const op = (e) => Number(getComputedStyle(e).opacity);
      const orte = [...k.querySelectorAll('.karte-orte')].map((e) => ({ z: e.dataset.zone, op: op(e), n: e.children.length }));
      const ringe = [...k.querySelectorAll('.karte-ring')].map((e) => ({ op: op(e), tr: getComputedStyle(e).transform }));
      const marken = [...k.querySelectorAll('.karte-marke')].map((e) => ({ t: e.textContent.trim().slice(0, 20), op: op(e) }));
      return { orte, ringe: ringe.length, ringeOp: ringe.map((x) => x.op), marken, imgRoles: document.querySelectorAll('[role="img"][aria-label*="Karte"]').length, kb: document.documentElement.className };
    });
    erg[`karte|${g}|${reduced}|${s}`] = r;
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(erg, null, 1));
console.log('fertig', Object.keys(erg).length);
