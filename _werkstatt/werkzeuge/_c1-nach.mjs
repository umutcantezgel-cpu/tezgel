// Hilfsskript SF-C1 Nacharbeit (Kopie im Werkzeugordner, wird danach gelöscht): Messungen und Bilder vorher/nachher.
// node _c1-nach.mjs --base http://127.0.0.1:4460 --name nach --ziel <ordner> [--nur mess|bilder] [--seiten a,b]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ANSICHTEN, installSperre, setzeEinwilligung, durchscrollen, bereit, ensureDir, CHROME } from './lib.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const BASE = arg('base');
const NAME = arg('name');
const ZIEL = arg('ziel');
const NUR = arg('nur', 'alles');
const SEITEN = arg('seiten', '/standorte/wetzlar,/standorte/limburg,/standorte,/referenzen,/blog').split(',');
const browser = await chromium.launch({ executablePath: CHROME });
const log = [];
const p = (...a) => { const z = a.join(' '); log.push(z); console.log(z); };

async function neu(geraet, { ruhig = false, bewegt = false } = {}) {
  const v = ANSICHTEN[geraet];
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch, deviceScaleFactor: 1, reducedMotion: bewegt ? 'no-preference' : 'reduce' });
  await installSperre(ctx);
  await setzeEinwilligung(ctx, 'abgelehnt', BASE);
  if (ruhig) await ctx.addInitScript(() => { try { localStorage.setItem('tezgel-bewegung', 'ruhig'); } catch {} });
  const page = await ctx.newPage();
  return { ctx, page };
}

async function messen() {
  // Vorher-Nachher
  for (const g of ['m390', 'q844', 't768', 't1024', 'd1440']) {
    const { ctx, page } = await neu(g, { ruhig: true });
    await page.goto(BASE + '/referenzen', { waitUntil: 'load' }); await bereit(page);
    const b = page.locator('.vn-buehne');
    await b.scrollIntoViewIfNeeded();
    const r = await page.evaluate(() => {
      const st = document.querySelector('.vn-buehne').getBoundingClientRect();
      const cap = document.querySelector('#vorher-nachher figcaption');
      const c = cap.getBoundingClientRect();
      const lh = parseFloat(getComputedStyle(cap).lineHeight);
      return { buehne: `${Math.round(st.width)}x${Math.round(st.height)}`, anleitung: `${Math.round(c.width)}x${Math.round(c.height)} Zeilen ${Math.round(c.height / lh)}`, anleitungLinks: Math.round(c.left), buehneLinks: Math.round(st.left) };
    });
    const worte = [];
    for (const t of [50, 30, 22, 8, 70, 78, 94]) {
      await page.evaluate((t) => document.querySelector('.vn-buehne').style.setProperty('--teilung', String(t)), t);
      await page.waitForTimeout(120);
      const w = await page.evaluate((t) => {
        const st = document.querySelector('.vn-buehne');
        const s = st.getBoundingClientRect();
        const aus = (sel) => {
          const e = st.querySelector(sel); const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
          if (cs.display === 'none') return 'aus';
          const ab = r.left < s.left - 0.5 || r.right > s.right + 0.5;
          return `${Math.round(r.left - s.left)}..${Math.round(r.right - s.left)} op ${Number(cs.opacity).toFixed(2)}${ab && Number(cs.opacity) > 0 ? ' ANGESCHNITTEN' : ''}`;
        };
        return `${t}%: vor ${aus('.vn-wort-vor')} | nach ${aus('.vn-wort-nach')}`;
      }, t).catch(() => `${t}%: (keine Wörter am Griff)`);
      worte.push(w);
    }
    const zeile = await page.evaluate(() => { const z = document.querySelector('.vn-hoehe > p[aria-hidden]'); return z ? getComputedStyle(z).display : 'keine'; });
    p(`VN ${NAME} ${g}: Bühne ${r.buehne}, Anleitung ${r.anleitung} (x ${r.anleitungLinks}, Bühne x ${r.buehneLinks}), Zeile unter Bild ${zeile}`);
    for (const w of worte) p(`   ${w}`);
    await page.evaluate(() => document.querySelector('.vn-buehne').style.setProperty('--teilung', '50'));
    const sek = page.locator('#vorher-nachher');
    await sek.screenshot({ path: path.join(ensureDir(path.join(ZIEL, 'vn')), `${g}-vn.png`) }).catch(async () => {
      await page.screenshot({ path: path.join(ensureDir(path.join(ZIEL, 'vn')), `${g}-vn.png`) });
    });
    if (g === 'm390' || g === 'd1440') {
      for (const t of [8, 22, 78, 94]) {
        await page.evaluate((t) => document.querySelector('.vn-buehne').style.setProperty('--teilung', String(t)), t);
        await page.waitForTimeout(120);
        await b.screenshot({ path: path.join(ZIEL, 'vn', `${g}-vn-${String(t).padStart(2, '0')}.png`) });
      }
    }
    await ctx.close();
  }
  // Einzugsband auf allen Ortsseiten
  for (const g of ['m390', 'd1440']) {
    const { ctx, page } = await neu(g, { ruhig: true });
    for (const stadt of ['wetzlar', 'asslar', 'giessen', 'herborn', 'limburg', 'marburg', 'bad-nauheim']) {
      const res = await page.goto(`${BASE}/standorte/${stadt}`, { waitUntil: 'load' });
      if (res.status() !== 200) { p(`ORT ${stadt} ${res.status()}`); continue; }
      await page.locator('[data-motion="einzugsband"]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      const r = await page.evaluate(() => {
        const band = document.querySelector('[data-motion="einzugsband"]');
        const offen = [...band.querySelectorAll(':scope > ol > li')].map((li) => li.querySelector('p').textContent.trim());
        const zu = [...band.querySelectorAll('details li.einzugsband-zone')].map((li) => li.querySelector('p').textContent.trim());
        const sum = band.querySelector('details summary')?.textContent.trim() ?? '-';
        const ist = band.querySelector('a[aria-current="page"]');
        const ir = ist.getBoundingClientRect();
        const name = ist.querySelector('span > span').getBoundingClientRect();
        const km = ist.lastElementChild.getBoundingClientRect();
        const lh = parseFloat(getComputedStyle(ist).lineHeight);
        return { offen, zu, sum, istH: Math.round(ir.height), kmZeile: Math.abs(km.top - name.top) < lh ? 'erste' : `tiefer (${Math.round(km.top - name.top)} px)` };
      });
      p(`ORT ${NAME} ${g} ${stadt}: offen [${r.offen}] | Aufklapper [${r.zu}] „${r.sum}“ | eigene Zeile ${r.istH} px, Entfernung ${r.kmZeile}`);
      if (stadt === 'limburg' || stadt === 'wetzlar' || stadt === 'giessen') {
        const band = page.locator('[data-motion="einzugsband"]');
        await band.scrollIntoViewIfNeeded();
        await band.screenshot({ path: path.join(ensureDir(path.join(ZIEL, 'orte')), `${g}-${stadt}-band.png`) });
        // Einstieg (erster Bildschirm)
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: path.join(ZIEL, 'orte', `${g}-${stadt}-einstieg.png`) });
      }
    }
    await ctx.close();
  }
  // Blog
  for (const g of ['m390', 't768', 't1024', 'd1440']) {
    const { ctx, page } = await neu(g, { ruhig: true });
    await page.goto(BASE + '/blog', { waitUntil: 'load' }); await bereit(page);
    const r = await page.evaluate(() => {
      const h2 = [...document.querySelectorAll('h2')];
      const y = (t) => { const e = h2.find((h) => h.textContent.includes(t)); return e ? Math.round(e.getBoundingClientRect().top + scrollY) : null; };
      const zeilen = [...document.querySelectorAll('article[data-motion="zustand"]')].map((a) => Math.round(a.getBoundingClientRect().height));
      const knoepfe = [...document.querySelectorAll('[role="group"][aria-label="Kategorien"] button')].map((b) => Math.round(b.getBoundingClientRect().top));
      const reihen = [...new Set(knoepfe)].map((t) => knoepfe.filter((k) => k === t).length).join('/');
      return {
        h3: document.querySelectorAll('h3 a[href^="/blog/"]').length,
        h4: document.querySelectorAll('h4 a[href^="/blog/"]').length,
        koepfe: h2.filter((h) => /Artikel$/.test(h.nextElementSibling?.textContent ?? '')).map((h) => h.textContent).join(', '),
        alle: y('Alle Artikel'), vieles: y('Vieles rund'), seite: document.documentElement.scrollHeight,
        zeilen: zeilen.join(','), reihen,
      };
    });
    p(`BLOG ${NAME} ${g}: h3-Links ${r.h3}, h4-Links ${r.h4}; Köpfe H2: ${r.koepfe || '-'}; Abschnitt ${r.alle} → ${r.vieles} = ${r.vieles - r.alle} px; Seite ${r.seite}; Zeilen ${r.zeilen}; Knopfreihen ${r.reihen}`);
    await page.screenshot({ path: path.join(ensureDir(path.join(ZIEL, 'blog')), `${g}-blog-liste.png`), clip: { x: 0, y: Math.max(0, r.alle - 40), width: ANSICHTEN[g].width, height: Math.min(2400, r.vieles - r.alle) } , fullPage: true });
    await ctx.close();
  }
  // Galerie: Knopfreihen und Verlauf
  for (const g of ['m390', 't768']) {
    const { ctx, page } = await neu(g, { ruhig: true });
    await page.goto(BASE + '/referenzen', { waitUntil: 'load' }); await bereit(page);
    const r = await page.evaluate(() => {
      const k = [...document.querySelectorAll('[data-galerie-wahl]')].map((b) => Math.round(b.getBoundingClientRect().top));
      const reihen = [...new Set(k)].map((t) => k.filter((x) => x === t).length).join('/');
      const anteile = [...document.querySelectorAll('.galerie-liste > li:not([hidden])')].filter((li) => li.getClientRects().length).map((li) => {
        const t = li.querySelector('.glasbild-text').getBoundingClientRect(); const l = li.getBoundingClientRect();
        return Math.round((t.height / l.height) * 100);
      });
      return { reihen, anteile: anteile.join(','), max: Math.max(...anteile) };
    });
    p(`GALERIE ${NAME} ${g}: Knopfreihen ${r.reihen}; Verlauf in % der Kachel ${r.anteile} (größter ${r.max})`);
    const gruppe = page.locator('[data-galerie-wahl]').first();
    await gruppe.scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(ensureDir(path.join(ZIEL, 'galerie')), `${g}-galerie.png`) });
    await ctx.close();
  }
}

async function bilder() {
  for (const g of ['d1440', 'm390']) {
    for (const s of SEITEN) {
      const name = s === '/' ? 'start' : s.slice(1).replace(/\//g, '__');
      {
        const { ctx, page } = await neu(g, { ruhig: true, bewegt: true });
        await page.goto(BASE + s, { waitUntil: 'load' }); await bereit(page);
        await durchscrollen(page);
        await page.screenshot({ path: path.join(ensureDir(path.join(ZIEL, g, 'ruhig')), `${name}.png`), fullPage: true });
        p(`${g} ruhig ${s} ${await page.evaluate(() => document.documentElement.scrollHeight)}`);
        await ctx.close();
      }
      {
        const { ctx, page } = await neu(g, { bewegt: true });
        await page.goto(BASE + s, { waitUntil: 'load' }); await bereit(page);
        await durchscrollen(page, { pauseMs: 300 });
        const h = await page.evaluate(() => document.documentElement.scrollHeight);
        const vh = ANSICHTEN[g].height;
        const dir = ensureDir(path.join(ZIEL, g, 'bewegt', name));
        for (let k = 0, y = 0; y < h; k++, y += vh) {
          await page.evaluate((y) => window.scrollTo(0, y), y);
          await page.waitForTimeout(1600);
          await page.screenshot({ path: path.join(dir, `${String(k).padStart(2, '0')}.png`) });
        }
        p(`${g} bewegt ${s} ${h}`);
        await ctx.close();
      }
    }
  }
}

if (NUR !== 'bilder') await messen();
if (NUR !== 'mess') await bilder();
fs.writeFileSync(path.join(ensureDir(ZIEL), `${NUR}.log`), log.join('\n') + '\n');
await browser.close();
