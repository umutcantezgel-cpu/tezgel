// Großer Moment „weg“ (E3-GRAF-02, KERN v3.3 K-007): Registerdatei, Baustein und – sobald der Orchestrator sie übernommen
// hat – die Regeln in bewegung.css und der Eintrag in register.ts. Liest nur Dateien, rendert nichts.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { REGISTER, beobachteteKennungen, ladeKennungen } from '../src/lib/motion/register.ts';

const lies = (pfad) => readFileSync(new URL(`../${pfad}`, import.meta.url), 'utf8');

test('Weg 1: Registereintrag als Datei', () => {
  const e = JSON.parse(lies('_werkstatt/register/weg.json'));
  assert.equal(e.kennung, 'weg');
  assert.equal(e.ausloeser, 'scroll');
  assert.deepEqual(e.register_ts, { ausloeser: 'scroll' });
  assert.deepEqual(e.wo, ['/bad/badsanierung']);
  assert.equal(e.schlitz, 'momente.ablauf');
  assert.deepEqual([...e.keyframes].sort(), ['leitachse-ziehen', 'szene-setzen']);
  assert.deepEqual([...e.eigenschaften].sort(), ['opacity', 'scale']);
  assert.match(e.reduziert, /Linie voll/);
});

test('Weg 2: Baustein ohne Client, ohne feste Werte, data-motion nur an der Wurzel', () => {
  const q = lies('src/components/momente/weg/Weg.tsx');
  assert.equal(q.match(/data-motion="weg"/g)?.length, 1);
  assert.ok(!/['"]use client['"]/.test(q), 'Serverkomponente');
  assert.ok(!/#[0-9a-fA-F]{3,8}\b/.test(q), 'keine Hex-Werte');
  assert.ok(!/-\[[^\]]+\]/.test(q) && !/\[&/.test(q), 'keine Beliebigwerte in Klassen');
  assert.ok(!/style=\{/.test(q), 'kein Inline-Stil');
  for (const k of ['weg-strecke', 'weg-rot', 'weg-marke-an', 'border-laser', 'origin-top', 'aria-hidden="true"']) assert.ok(q.includes(k), k);
});

test('Weg 3: Regeln in bewegung.css', (t) => {
  const css = lies('src/app/bewegung.css');
  if (!css.includes('[data-motion="weg"]')) { t.skip('bewegung.css trägt weg noch nicht (Orchestrator)'); return; }
  assert.ok(css.includes('@supports (animation-timeline: view()) and (animation-range-end: cover calc(100% - 60vh))'));
  const regeln = [...css.matchAll(/([^{}]*\[data-motion="weg"\][^{}]*)\{([^{}]*)\}/g)];
  assert.equal(regeln.length, 4);
  for (const [, sel, rumpf] of regeln) {
    const eigen = rumpf.split(';').map((d) => d.split(':')[0].trim()).filter(Boolean);
    for (const p of eigen) assert.ok(['animation', 'animation-timeline', 'animation-range', 'view-timeline'].includes(p), `${sel.trim()}: ${p}`);
    if (/animation:\s*(leitachse-ziehen|szene-setzen)/.test(rumpf)) assert.match(sel.trim(), /^html\.k-bewegung:not\(\.k-notaus\) \[data-motion="weg"\] \.weg-(rot|marke-an)$/);
  }
  assert.match(css, /\[data-motion="weg"\] \.weg-rot,\s*\[data-motion="weg"\] \.weg-marke-an\s*\{\s*animation: none !important;\s*\}/);
  for (const name of ['leitachse-ziehen', 'szene-setzen']) {
    const kf = css.match(new RegExp(`@keyframes ${name}\\s*\\{((?:[^{}]*\\{[^{}]*\\})+)\\s*\\}`));
    assert.ok(kf, `@keyframes ${name}`);
    const eigen = [...kf[1].matchAll(/\{([^{}]*)\}/g)].flatMap((m) => m[1].split(';').map((d) => d.split(':')[0].trim()).filter(Boolean));
    for (const p of eigen) assert.ok(['scale', 'opacity'].includes(p), `${name}: ${p}`);
  }
});

test('Weg 4: Registereintrag in register.ts und register.json', (t) => {
  if (!REGISTER.weg) { t.skip('register.ts trägt weg noch nicht (Orchestrator)'); return; }
  assert.deepEqual(REGISTER.weg, { ausloeser: 'scroll' });
  assert.ok(!ladeKennungen().includes('weg'));
  assert.ok(!beobachteteKennungen(true).includes('weg') && !beobachteteKennungen(false).includes('weg'));
  assert.ok(JSON.parse(lies('_werkstatt/register.json')).kennungen.includes('weg'));
});
