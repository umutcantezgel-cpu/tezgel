// P4-13: Zustand am <html> – (1) Mutationen von <html> (Attribute, Klasse, style) vom ersten Skript bis 3 s nach dem Laden;
// (2) Platz/scroll-padding ≥ belegter Raum je Ansicht und Breite, erste Ansicht und Einstellungen; (3) Wechsel auf Klick.
import { chromium } from '../../werkzeuge/node_modules/@playwright/test/index.mjs';
import { installSperre, setzeEinwilligung, BASE, assertLocal } from '../../werkzeuge/lib.mjs';
assertLocal();
const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
const ansichten = [[320, 640], [360, 740], [375, 812], [430, 932], [768, 1024], [1000, 800], [1024, 768], [1100, 800], [1280, 800], [1440, 900], [1920, 1080]];
const zeile = [];
async function neu(w, h, zustand = 'erstbesuch', motion = 'reduce') {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 1024, hasTouch: w < 1024, reducedMotion: motion });
  await installSperre(ctx);
  await setzeEinwilligung(ctx, zustand);
  await ctx.addInitScript(() => {
    window.__htmlMut = [];
    // Beobachtet das Dokument (das <html>-Element gibt es zur Zeit des Init-Skripts noch nicht); nur Änderungen an <html>.
    new MutationObserver((ms) => { for (const m of ms) if (m.target === document.documentElement && m.type === 'attributes') window.__htmlMut.push({ t: Math.round(performance.now()), a: m.attributeName, v: m.target.getAttribute(m.attributeName), lesbar: document.readyState }); })
      .observe(document, { attributes: true, subtree: true, attributeFilter: ['class', 'style', 'data-k-banner'] });
    window.__startAttr = document.documentElement ? document.documentElement.getAttribute('data-k-banner') : 'noch kein html';
  });
  const page = await ctx.newPage();
  return { ctx, page };
}
const belegt = (page) => page.evaluate(() => {
  const d = document.querySelector('[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]');
  const cs = getComputedStyle(document.documentElement);
  return { attr: document.documentElement.getAttribute('data-k-banner'), belegt: d ? Math.ceil(innerHeight - d.getBoundingClientRect().top) : null, spb: parseFloat(cs.scrollPaddingBottom), pb: parseFloat(cs.paddingBottom) };
});
// (1) + (2)
for (const [w, h] of ansichten) {
  for (const motion of ['reduce', 'no-preference']) {
    const { ctx, page } = await neu(w, h, 'erstbesuch', motion);
    await page.goto(BASE + '/', { waitUntil: 'load' });
    const dlg = page.locator('[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]');
    await dlg.waitFor({ state: 'visible' });
    await page.waitForTimeout(3000);
    const muts = await page.evaluate(() => window.__htmlMut.filter((m) => m.a !== 'class' || true));
    const a = await belegt(page);
    let b = null;
    if (motion === 'reduce') {
      await dlg.getByRole('button', { name: 'Einstellungen', exact: true }).click();
      await page.waitForTimeout(150);
      b = await belegt(page);
    }
    zeile.push({ ansicht: `${w}x${h}`, motion, html_mutationen_beim_laden: muts, erste: a, erste_ok: a.spb >= a.belegt && a.pb >= a.belegt, einstellungen: b, einstellungen_ok: b ? b.spb >= b.belegt && b.pb >= b.belegt : null });
    console.log(`${w}x${h} ${motion.padEnd(13)} Laden: ${JSON.stringify(muts)} · erste ${a.attr} belegt ${a.belegt} spb ${a.spb} pb ${a.pb} ${a.spb >= a.belegt ? 'ok' : 'ZU KLEIN'}${b ? ` · einst ${b.attr} belegt ${b.belegt} spb ${b.spb} ${b.spb >= b.belegt ? 'ok' : 'ZU KLEIN'}` : ''}`);
    await ctx.close();
  }
}
// (3) Wechsel auf Klick
{
  const { ctx, page } = await neu(1440, 900);
  await page.goto(BASE + '/kontakt', { waitUntil: 'load' });
  const dlg = page.locator('[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]');
  await dlg.waitFor({ state: 'visible' });
  const schritte = [['Start', null]];
  const log = [];
  log.push(['start', await page.evaluate(() => [window.__startAttr, document.documentElement.getAttribute('data-k-banner')])]);
  await dlg.getByRole('button', { name: 'Einstellungen', exact: true }).click(); log.push(['Einstellungen', (await belegt(page)).attr]);
  await dlg.getByRole('button', { name: 'Zurück', exact: true }).click(); log.push(['Zurück', (await belegt(page)).attr]);
  await dlg.getByRole('button', { name: 'Alle ablehnen', exact: true }).click(); await page.waitForTimeout(100); log.push(['Alle ablehnen', (await belegt(page)).attr]);
  await page.locator('a[href="#cookie-settings"]').first().click(); await page.waitForTimeout(200); log.push(['Fußlink Cookie-Einstellungen', (await belegt(page)).attr]);
  await dlg.getByRole('button', { name: 'Auswahl speichern', exact: true }).click(); await page.waitForTimeout(100); log.push(['Auswahl speichern', (await belegt(page)).attr]);
  await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(1500);
  log.push(['Neu laden mit Entscheidung', await page.evaluate(() => [window.__startAttr, document.documentElement.getAttribute('data-k-banner'), !!document.querySelector('[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]'), window.__htmlMut])]);
  console.log('Klickfolge', JSON.stringify(log));
  zeile.push({ klickfolge: log });
  await ctx.close();
}
// (4) zurückkehrender Besuch: kein Attribut vor dem ersten Bild
{
  const { ctx, page } = await neu(1440, 900, 'abgelehnt');
  await page.goto(BASE + '/', { waitUntil: 'load' }); await page.waitForTimeout(1500);
  const r = await page.evaluate(() => [window.__startAttr, document.documentElement.getAttribute('data-k-banner'), window.__htmlMut, getComputedStyle(document.documentElement).paddingBottom]);
  console.log('abgelehnt', JSON.stringify(r)); zeile.push({ abgelehnt: r });
  await ctx.close();
}
await browser.close();
import fs from 'node:fs';
fs.writeFileSync(process.argv[2] || 'zustand.json', JSON.stringify(zeile, null, 1));
