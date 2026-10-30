// Probe UM-E4-WERTE: 200 % Schrift (CDP Page.setFontSizes), m360 und m390. Je Seite: berechnetes hyphenate-limit-chars aller
// Elemente mit Wert ungleich der Seitenregel und ganzseitiges Bildschirmfoto, vorher (4325) gegen nachher (4324).
import { chromium } from 'playwright';
import fs from 'node:fs';
const [ziel] = process.argv.slice(2);
const SEITEN = ['/preise', '/fliesen/kueche', '/fliesen/flur-diele'];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const erg = [];
for (const breite of [360, 390]) for (const seite of SEITEN) {
  const je = {};
  for (const [name, port] of [['vorher', 4325], ['nachher', 4324]]) {
    const ctx = await browser.newContext({ viewport: { width: breite, height: 800 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await ctx.addInitScript(() => { try { localStorage.setItem('tezgel-intro-gesehen', '1'); } catch {} });
    await ctx.route(/google-analytics|googletagmanager|doubleclick/, (r) => r.abort());
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Page.enable');
    await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32, fixed: 26 } });
    await page.goto(`http://127.0.0.1:${port}${seite}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.waitForTimeout(800);
    const werte = await page.evaluate(() => [...document.querySelectorAll('body *')].map((el, i) => [i, getComputedStyle(el).hyphenateLimitChars]).filter(([, v]) => v && v !== '12 5 5' && v !== 'auto'));
    const bild = await page.screenshot({ fullPage: true, animations: 'disabled' });
    fs.writeFileSync(`${ziel}/${name}-${breite}${seite.replace(/\//g, '_')}.png`, bild);
    je[name] = { werte, bild };
    await ctx.close();
  }
  const gleichWerte = JSON.stringify(je.vorher.werte) === JSON.stringify(je.nachher.werte);
  const gleichBild = je.vorher.bild.equals(je.nachher.bild);
  erg.push({ seite, breite, elemente_mit_eigenem_wert: je.nachher.werte.length, werte_gleich: gleichWerte, bild_bytegleich: gleichBild });
  console.log(seite, breite, 'eigene Werte', je.vorher.werte.length, '→', je.nachher.werte.length, 'gleich', gleichWerte, '· Bild bytegleich', gleichBild);
}
fs.writeFileSync(`${ziel}/gross.json`, JSON.stringify(erg, null, 1));
await browser.close();
