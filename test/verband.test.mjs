// Musterprobe „verband“ (E3-GRAF-06, KERN v3.4 K-007): Geometrie von Fischgrät und Reihenverbänden, Versatz und Regeln in bewegung.css.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { RAUM, PLATTE, REIHEN, fischRechtecke, fischPfad, inDominorahmen, reihenDaten, reihenPfad, stossfugen, waagrechteFugen } from '../src/components/momente/verband/geometrie.ts';

const CSS = fs.readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

test('Verband 1: Fischgrät deckt den Raum lückenlos und ohne Überlappung', () => {
  const platten = fischRechtecke();
  let fehler = 0;
  for (let x = 0.37; x < RAUM.b; x += 1.7) {
    for (let y = 0.53; y < RAUM.h; y += 1.9) {
      const [u, v] = inDominorahmen(x, y);
      const n = platten.filter((f) => u > f.x && u < f.x + f.b && v > f.y && v < f.y + f.h).length;
      if (n !== 1) fehler++;
    }
  }
  assert.equal(fehler, 0);
});

test('Verband 2: jede Fischgrät-Platte hat das Maß der Reihenplatten', () => {
  for (const f of fischRechtecke()) {
    const liegend = f.b === PLATTE.b && f.h === PLATTE.h;
    const stehend = f.b === PLATTE.h && f.h === PLATTE.b;
    assert.ok(liegend || stehend, JSON.stringify(f));
  }
});

test('Verband 3: Fischgrät-Pfad bleibt klein, je Platte ein geschlossenes Viereck', () => {
  const d = fischPfad();
  const n = fischRechtecke().length;
  assert.ok(n >= 30 && n <= 60, `Platten: ${n}`);
  assert.equal((d.match(/Z/g) || []).length, n);
  assert.ok(d.length <= 4000, `Zeichen: ${d.length}`);
});

test('Verband 4: Kreuzfuge legt die Raummitte auf eine Stoßfuge, die Stöße reichen über beide Ränder', () => {
  const xs = stossfugen();
  assert.ok(xs.includes(RAUM.b / 2));
  assert.ok(Math.min(...xs) <= -PLATTE.b, 'links eine Platte Vorrat für den Versatz');
  assert.ok(Math.max(...xs) >= RAUM.b);
  for (let i = 1; i < xs.length; i++) assert.equal(xs[i] - xs[i - 1], PLATTE.b);
  assert.ok(reihenPfad(0).startsWith(`M${xs[0]} 0V${PLATTE.h}`));
  assert.equal((waagrechteFugen().match(/M/g) || []).length, REIHEN - 1);
});

test('Verband 5: Reihenmerkmale folgen dem Reihenversatz', () => {
  assert.equal(REIHEN, 5);
  const z = Array.from({ length: REIHEN }, (_, r) => reihenDaten(r));
  assert.deepEqual(z.map((d) => d.halb), ['0', '1', '0', '1', '0']);
  assert.deepEqual(z.map((d) => d.drittel), ['0', '1', '2', '0', '1']);
});

test('Verband 6: Versatz in bewegung.css passt zur Platte (½, ⅓, ⅔)', () => {
  const regel = (sel) => {
    const i = CSS.indexOf(sel);
    assert.ok(i >= 0, `Regel fehlt: ${sel}`);
    return CSS.slice(i, CSS.indexOf('}', i));
  };
  assert.match(regel('.verband-reihe[data-halb="1"]'), new RegExp(`translate: ${PLATTE.b / 2}px 0`));
  assert.match(regel('.verband-reihe[data-drittel="1"]'), new RegExp(`translate: ${(PLATTE.b / 3).toFixed(3)}px 0`));
  assert.match(regel('.verband-reihe[data-drittel="2"]'), new RegExp(`translate: ${((2 * PLATTE.b) / 3).toFixed(3)}px 0`));
});

const MIT_PROBE = CSS.includes('.muster-fisch');
test('Verband 7: Fischgrät-Ebene und Beschreibungen in bewegung.css (Übergänge nur unter html.k-bewegung)', { skip: !MIT_PROBE && 'CSS der Musterprobe noch nicht in bewegung.css übernommen' }, () => {
  assert.ok(CSS.includes('.verband:has([data-verband-wahl="fisch"]:checked) .muster-fisch'));
  assert.ok(CSS.includes(`translate: -${PLATTE.b / 4}px 0`));
  assert.ok(CSS.includes('transition: opacity var(--dauer-3) var(--ease-setzen), translate var(--dauer-3) var(--ease-setzen)'));
  for (const [, sel, rumpf] of CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!sel.includes('muster-') || !rumpf.includes('transition') || rumpf.includes('none')) continue;
    assert.ok(sel.includes('html.k-bewegung'), `Übergang ohne Startklasse: ${sel.trim()}`);
  }
});
