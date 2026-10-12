// Kanal-Probe (P4-Tor R2, texte2 „entfernt aria-label“): Der schwebende WhatsApp-Kanal der Kern-Seiten steht seit P4-13 nur noch
//   im Browser (wie im Bestand, ssr:false). Diese Probe belegt je Seite und Ansicht: Server-HTML ohne Kanal, nach der Hydrierung
//   mit Kanal und unverändertem Namen; dazu der WhatsApp-Weg im Kopf (Desktop) im Server-HTML.
// Nutzung: RELAUNCH_BASE=http://127.0.0.1:4321 node kanal-probe.mjs [--seiten /,/bad] [--aus <datei.json>]
import fs from 'node:fs';
import { chromium } from '@playwright/test';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, bereit } from './lib.mjs';
assertLocal();
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const seiten = arg('--seiten', '/,/bad,/leistungen,/standorte,/blog,/ueber-uns,/kontakt').split(',');
const aus = arg('--aus', null);
const NAME = 'WhatsApp-Nachricht an Fliesenverlegung Tezgel senden';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const ergebnis = { base: BASE, name_erwartet: NAME, seiten: {} };
for (const s of seiten) {
  const html = await (await fetch(BASE + s)).text();
  await new Promise((r) => setTimeout(r, 1000));
  const server = { kanal_im_html: html.includes('whatsapp-floating-btn') || html.includes(NAME), kopf_whatsapp_link: /<a[^>]*aria-label="WhatsApp-Chat starten"[^>]*href="https:\/\/api\.whatsapp\.com\/send\?phone=491726728504/.test(html) || /<a[^>]*href="https:\/\/api\.whatsapp\.com\/send\?phone=491726728504[^"]*"[^>]*aria-label="WhatsApp-Chat starten"/.test(html) };
  ergebnis.seiten[s] = { server };
  for (const a of ['m375', 'd1440']) {
    const context = await browser.newContext({ ...ANSICHTEN[a], locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'reduce' });
    await installSperre(context); await setzeEinwilligung(context, 'abgelehnt');
    const page = await context.newPage();
    await page.goto(BASE + s, { waitUntil: 'load' }); await bereit(page);
    await page.waitForTimeout(1500);
    const k = await page.evaluate(() => { const e = document.getElementById('whatsapp-floating-btn'); return e ? { da: true, name: e.getAttribute('aria-label') || e.textContent.trim() } : { da: false }; });
    const kopf = await page.locator('header a[aria-label="WhatsApp-Chat starten"]').count();
    ergebnis.seiten[s][a] = { kanal_nach_hydrierung: k, kopf_link_im_dom: kopf };
    await context.close();
  }
  console.log(s, JSON.stringify(ergebnis.seiten[s]));
}
await browser.close();
if (aus) fs.writeFileSync(aus, JSON.stringify(ergebnis, null, 1));
