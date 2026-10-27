// Probe: Verläufe mit Hex- gegen OKLCH-Stopps (Interpolation sRGB gegen Oklab nach CSS Color 4)
import { chromium } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/@playwright/test/index.mjs';
import { PNG } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/pngjs/lib/png.js';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const STRICH = ['#818698', 'oklch(62.2012% 0.027699 273.263)'], FUGE = ['#DDDEE2', 'oklch(90.0981% 0.00553 274.959)'];
const seite = (s, f, raum = '') => `<body style="margin:0;background:#F4F4F5">
<div style="width:300px;height:120px;background-image:repeating-linear-gradient(${raum}135deg, ${s} 0 1px, transparent 1px 12px)"></div>
<div style="width:300px;height:120px;background-image:linear-gradient(${raum}to right, ${f} 1px, transparent 1px),linear-gradient(${raum ? raum.trim() + ', ' : ''}${f} 1px, transparent 1px);background-size:24px 24px"></div></body>`;
async function bild(html) { const p = await browser.newPage({ viewport: { width: 300, height: 240 }, deviceScaleFactor: 1 }); await p.setContent(html); const b = PNG.sync.read(await p.screenshot()); await p.close(); return b; }
const vergleich = (x, y) => { let n = 0, max = 0; for (let i = 0; i < x.data.length; i += 4) { let d = 0; for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(x.data[i + c] - y.data[i + c])); if (d) { n++; max = Math.max(max, d); } } return `${n} Pixel, höchstens ${max}`; };
const hex = await bild(seite(STRICH[0], FUGE[0]));
console.log('Hex gegen OKLCH:', vergleich(hex, await bild(seite(STRICH[1], FUGE[1]))));
console.log('Hex gegen OKLCH mit „in srgb“:', vergleich(hex, await bild(seite(STRICH[1], FUGE[1], 'in srgb '))));
console.log('Hex gegen Hex mit „in oklab“:', vergleich(hex, await bild(seite(STRICH[0], FUGE[0], 'in oklab '))));
console.log('OKLCH gegen Hex mit „in oklab“:', vergleich(await bild(seite(STRICH[1], FUGE[1])), await bild(seite(STRICH[0], FUGE[0], 'in oklab '))));
await browser.close();
