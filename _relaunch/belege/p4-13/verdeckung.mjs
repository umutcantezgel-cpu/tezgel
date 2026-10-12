// P4-13: Verdeckung von H1 und Einleitungsabsatz durch den Einwilligungsbanner (Erstbesuch) je Seite und Breite.
// Einleitungsabsatz = erster <p> in <main> nach der H1 mit mindestens 120 Zeichen. Gemessen werden die Zeilenkästen
// (Range.getClientRects) innerhalb des Bildschirms gegen das Rechteck des Banners; dazu Lage und Höhe des Banners.
// Ausgabe je Element: Zeilenstücke verdeckt/im Bild (* = Element reicht über den Bildschirm), Anteil der Textfläche unter
// dem Banner und Anteil, der im ersten Bildschirm lesbar ist (im Bild und nicht verdeckt).
// Nutzung: RELAUNCH_BASE=… node verdeckung.mjs <ausgabe.json> [--settings]
import fs from 'node:fs';
import { chromium } from '../../werkzeuge/node_modules/@playwright/test/index.mjs';
import { installSperre, BASE, assertLocal } from '../../werkzeuge/lib.mjs';
assertLocal();
const aus = process.argv[2] || 'verdeckung.json';
const einstellungen = process.argv.includes('--settings');
const seiten = ['/', '/bad', '/leistungen', '/standorte', '/blog', '/ueber-uns', '/kontakt'];
const breiten = [[1024, 768], [1280, 800], [1440, 900], [1920, 1080]];
const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
const erg = [];
for (const [w, h] of breiten) {
  for (const s of seiten) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce', locale: 'de-DE' });
    await installSperre(ctx);
    const page = await ctx.newPage();
    await page.goto(BASE + s, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const dlg = page.locator('[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]');
    await dlg.waitFor({ state: 'visible', timeout: 15000 });
    if (einstellungen) { await dlg.getByRole('button', { name: 'Einstellungen', exact: true }).click(); await page.waitForTimeout(200); }
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const d = document.querySelector('[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]').getBoundingClientRect();
      const vh = innerHeight;
      const h1 = document.querySelector('main h1');
      const p = [...document.querySelectorAll('main p')].find((x) => (h1.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING) && x.textContent.trim().length >= 120);
      const zeilen = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return [...rg.getClientRects()].filter((q) => q.width > 1 && q.height > 1); };
      const pruefe = (el) => {
        const b = el.getBoundingClientRect();
        let verdeckt = 0, imBild = 0, gesamt = 0, flaeche = 0, flaecheVerdeckt = 0;
        for (const q of zeilen(el)) {
          gesamt++;
          flaeche += q.width * q.height;
          const top = Math.max(q.top, 0), bottom = Math.min(q.bottom, vh);
          if (bottom - top <= 0) continue;
          imBild++;
          const ox = Math.min(q.right, d.right) - Math.max(q.left, d.left);
          const oy = Math.min(bottom, d.bottom) - Math.max(top, d.top);
          if (ox > 0 && oy > 0) { verdeckt++; flaecheVerdeckt += ox * oy; }
        }
        // Lesbar im ersten Bildschirm = Textfläche im Bild und nicht unter dem Banner, als Anteil der ganzen Textfläche.
        let lesbar = 0;
        for (const q of zeilen(el)) { const top = Math.max(q.top, 0), bottom = Math.min(q.bottom, vh); if (bottom > top) lesbar += q.width * (bottom - top); }
        lesbar -= flaecheVerdeckt;
        return { oben: Math.round(b.top), unten: Math.round(b.bottom), zeilen: gesamt, zeilen_im_bild: imBild, zeilen_verdeckt: verdeckt, ganz_im_bild: b.bottom <= vh,
          anteil_verdeckt: flaeche ? Math.round((flaecheVerdeckt / flaeche) * 100) : 0, anteil_lesbar: flaeche ? Math.round((lesbar / flaeche) * 100) : 0 };
      };
      const html = document.documentElement;
      return {
        banner: { oben: Math.round(d.top), unten: Math.round(d.bottom), links: Math.round(d.left), rechts: Math.round(d.right), hoehe: Math.round(d.height) },
        h1: pruefe(h1), einleitung: p ? { text: p.textContent.trim().slice(0, 50), ...pruefe(p) } : null,
        html_stil: html.getAttribute('style'), html_attr: html.getAttribute('data-k-banner'),
        scroll_pb: getComputedStyle(html).scrollPaddingBottom, pb: getComputedStyle(html).paddingBottom,
      };
    });
    erg.push({ seite: s, ansicht: `${w}x${h}`, ...r });
    const v = (x) => x ? `${x.zeilen_verdeckt}/${x.zeilen_im_bild}${x.ganz_im_bild ? '' : '*'} (${x.anteil_verdeckt} % verdeckt, ${x.anteil_lesbar} % lesbar)` : '–';
    console.log(`${w}x${h} ${s.padEnd(12)} banner ${r.banner.oben}–${r.banner.unten} (${r.banner.hoehe}) · H1 bis ${r.h1.unten} verdeckt ${v(r.h1)} · Einleitung bis ${r.einleitung?.unten} verdeckt ${v(r.einleitung)} · spb ${r.scroll_pb} pb ${r.pb}`);
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(aus, JSON.stringify({ base: BASE, einstellungen, erg }, null, 1));
