import { chromium } from '@playwright/test';
import { ANSICHTEN, installSperre, setzeEinwilligung } from './lib.mjs';
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const out = {};
for (const base of ['http://127.0.0.1:4325', 'http://127.0.0.1:4560']) {
  for (const g of ['m360', 'm390', 't768', 't1024', 'd1440']) {
    const ctx = await b.newContext({ ...ANSICHTEN[g], viewport: { width: ANSICHTEN[g].width, height: ANSICHTEN[g].height }, reducedMotion: 'reduce' });
    await installSperre(ctx, {});
    await setzeEinwilligung(ctx, 'abgelehnt', base);
    const p = await ctx.newPage();
    for (const s of ['/fliesen', '/standorte/wetzlar']) {
      await p.goto(base + s, { waitUntil: 'networkidle' });
      const r = await p.evaluate(() => {
        const lis = [...document.querySelectorAll('#ihre-lage li')].slice(0, 6);
        return lis.map((li) => {
          const a = li.querySelector('a'); const f = a?.firstElementChild; const svg = f?.querySelector('svg');
          const t = a?.querySelector('span.min-w-0');
          return { feld: f ? Math.round(f.getBoundingClientRect().width) : null, text: t ? Math.round(t.getBoundingClientRect().width) : null, svgBg: svg ? getComputedStyle(svg).backgroundColor : null };
        });
      });
      out[`${base.slice(-4)} ${g} ${s}`] = r;
    }
    await ctx.close();
  }
}
console.log(JSON.stringify(out, null, 0).replace(/\],"/g, '],\n"'));
await b.close();
