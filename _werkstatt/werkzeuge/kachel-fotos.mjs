// Einheitliche Bildschirmhöhen-Ausschnitte der Stilkacheln (file://, kein Netz) für die Jury.
// Nutzung: node kachel-fotos.mjs <Buchstabe…>  → richtungen/<X>/jury/<ansicht>/NN.jpg
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { RELAUNCH, ANSICHTEN, ensureDir } from './lib.mjs';
const kacheln = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
for (const k of kacheln) {
  for (const [a, v] of Object.entries(ANSICHTEN)) {
    const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch, locale: 'de-DE' });
    await context.route('**/*', (r) => (r.request().url().startsWith('file:') || r.request().url().startsWith('data:') ? r.continue() : r.abort()));
    const page = await context.newPage();
    const fehler = [];
    page.on('pageerror', (e) => fehler.push(e.message));
    await page.goto('file://' + path.join(RELAUNCH, 'richtungen', k, 'index.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1800); // Einstieg ausklingen lassen (Signatur ≤ 1600 ms)
    const vh = v.height, gesamt = await page.evaluate(() => document.documentElement.scrollHeight);
    const n = Math.min(14, Math.ceil(gesamt / vh));
    const dir = ensureDir(path.join(RELAUNCH, 'richtungen', k, 'jury', a));
    for (let i = 0; i < n; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * vh);
      await page.waitForTimeout(1700); // Auftritte per IntersectionObserver ausklingen lassen
      await page.screenshot({ path: path.join(dir, `${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 72 });
    }
    const ueber = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(k, a, 'Höhen', n, 'Überlauf', ueber, 'Fehler', fehler.length);
    await context.close();
  }
}
await browser.close();
