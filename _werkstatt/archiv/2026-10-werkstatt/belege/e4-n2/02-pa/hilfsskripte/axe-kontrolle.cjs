// Kontrolle (Scratchpad): axe mit denselben Regelsätzen wie axe.mjs auf einer bekannt fehlerhaften Testseite (lokal, ohne Netz).
const { createRequire } = require('node:module');
const req = createRequire('/home/user/tezgel/_werkstatt/werkzeuge/package.json');
const { chromium } = req('@playwright/test');
const AxeBuilder = req('@axe-core/playwright').default;
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: "de-DE" }); const page = await context.newPage();
  await page.setContent('<html lang="de"><head><title>k</title></head><body><main><h1>Kontrolle</h1><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">' +
    '<p style="color:#ccc;background:#fff">Blasser Text auf Weiß</p><button style="width:10px;height:10px"></button></main></body></html>');
  const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  console.log(JSON.stringify(res.violations.map((v) => ({ id: v.id, impact: v.impact, knoten: v.nodes.length })), null, 1));
  console.log('bestanden (Regeln ohne Verstoß):', res.passes.length);
  await browser.close();
})().catch((e) => { console.error('FEHLER', e.message); process.exit(1); });
