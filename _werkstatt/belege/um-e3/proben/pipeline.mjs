// Probe: Rendert Chromium dieselbe Farbe als Hex und als OKLCH pixelgleich? Text (Kantenglättung), Fläche, Fläche mit Deckkraft, SVG-Strich.
import { chromium } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/@playwright/test/index.mjs';
import { PNG } from '/home/user/tezgel/_werkstatt/werkzeuge/node_modules/pngjs/lib/png.js';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const seite = (farbe, grund) => `<body style="margin:0;background:${grund}"><div style="font:600 17px Arial;color:${farbe};padding:8px">Fliesenverlegung Tezgel · Aßlar 0123</div>
<div style="width:200px;height:20px;background:${farbe}"></div><div style="width:200px;height:20px;background:color-mix(in oklab, ${farbe} 40%, transparent)"></div>
<div style="width:200px;height:20px;background:${farbe};opacity:.37"></div>
<svg width="200" height="60"><path d="M5 50 Q 60 -10 190 40" fill="none" stroke="${farbe}" stroke-width="1.5"/><circle cx="100" cy="30" r="12.3" fill="${farbe}"/></svg></body>`;
async function bild(html) { const p = await browser.newPage({ viewport: { width: 400, height: 200 }, deviceScaleFactor: 1 }); await p.setContent(html); const b = PNG.sync.read(await p.screenshot()); await p.close(); return b; }
const paare = [
  ['tinte', '#0A1129', 'oklch(18.6546% 0.049864 268.945)', '#F4F4F5', 'oklch(96.7434% 0.001326 286.375)'],
  ['strich', '#818698', 'oklch(62.2012% 0.027699 273.263)', '#FFFFFF', 'oklch(100% 0 0)'],
];
for (const [n, hex, ok, gHex, gOk] of paare) {
  for (const [art, a, b] of [['nur Vordergrund', seite(hex, gHex), seite(ok, gHex)], ['beide', seite(hex, gHex), seite(ok, gOk)], ['color(srgb)', seite(hex, gHex), seite(`color(srgb ${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).join(' ')})`, gHex)]]) {
    const x = await bild(a), y = await bild(b); let n1 = 0, max = 0;
    for (let i = 0; i < x.data.length; i += 4) { let d = 0; for (let c = 0; c < 3; c++) d = Math.max(d, Math.abs(x.data[i + c] - y.data[i + c])); if (d) { n1++; max = Math.max(max, d); } }
    console.log(n, art, 'abweichend', n1, 'max', max);
  }
}
await browser.close();
