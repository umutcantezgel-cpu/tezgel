import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { GEFAELLE, LUFT, PFEILE, PFEIL_ABSTAND, PFEIL_BEGINN, RINNE, TROPFEN, VIEWBOX, WEG, oberkante, pfeilEntlang, tropfenPfad } from '../src/components/momente/gefaelle-dusche/geometrie.ts';

// Großer Moment `gefaelle-dusche` (E3-GRAF-03): Der Tropfen liegt auf dem Gefälle, sein Weg endet im Ablauf, die Pfeile liegen
// parallel zum Gefälle und erscheinen, wenn der Tropfen sie erreicht. Die Werte in bewegung.css müssen zur Geometrie passen.
const nah = (a, b, eps = 0.01) => Math.abs(a - b) <= eps;
const [, , vbB, vbH] = VIEWBOX.split(' ').map(Number);

test('Gefälle 1: der Tropfen liegt am Start auf der Fliese, oben im Gefälle', () => {
  assert.ok(TROPFEN.cx > GEFAELLE.x0 && TROPFEN.cx < GEFAELLE.x1, 'Start im Gefälle');
  assert.ok(nah(TROPFEN.cy + TROPFEN.r + LUFT, oberkante(TROPFEN.cx)), 'Unterkante des Tropfens eine halbe Einheit über der Fliese');
});

test('Gefälle 2: der Weg bergab endet an der Kante des Ablaufs, parallel zur Fliese', () => {
  const x = TROPFEN.cx + WEG.hang.x;
  const y = TROPFEN.cy + WEG.hang.y;
  assert.equal(x, GEFAELLE.x1);
  assert.ok(nah(y + TROPFEN.r + LUFT, oberkante(x)));
  assert.ok(WEG.anteilHang > 0.5 && WEG.anteilHang < 1);
});

test('Gefälle 3: am Ende liegt der Tropfen ganz im Ablauf, unter dem Rost', () => {
  const cx = TROPFEN.cx + WEG.ablauf.x;
  const cy = TROPFEN.cy + WEG.ablauf.y;
  assert.ok(cx - TROPFEN.r > RINNE.links && cx + TROPFEN.r < RINNE.rechts, 'waagrecht in der Rinne');
  assert.ok(cy - TROPFEN.r * Math.SQRT2 > RINNE.oben, 'Spitze unter dem Rost');
  assert.ok(cy + TROPFEN.r < RINNE.boden, 'über dem Boden der Rinne');
});

test('Gefälle 4: Pfeile parallel zum Gefälle, über dem Tropfen, in Reihenfolge, Beginn passt zum Tropfen', () => {
  const spitzeTropfen = TROPFEN.r * Math.SQRT2 + TROPFEN.r + LUFT; // Abstand Fliese bis Spitze des Tropfens
  let vorher = GEFAELLE.x0;
  PFEILE.forEach(([xa, xb], i) => {
    assert.ok(xa > vorher && xb > xa && xb <= GEFAELLE.x1, `Pfeil ${i + 1} im Gefälle, nach dem vorigen`);
    vorher = xb;
    assert.ok(PFEIL_ABSTAND - 5 > spitzeTropfen, 'Schenkel der Spitze bleiben über dem Tropfen');
    const t = ((xa - TROPFEN.cx) / WEG.hang.x) * WEG.anteilHang;
    assert.ok(nah(PFEIL_BEGINN[i], Math.round(t * 100) / 100), `Beginn Pfeil ${i + 1} = ${t.toFixed(3)}`);
    const zahlen = pfeilEntlang(xa, xb).match(/-?\d+(\.\d+)?/g).map(Number);
    for (let k = 0; k < zahlen.length; k += 2) assert.ok(zahlen[k] >= 0 && zahlen[k] <= vbB && zahlen[k + 1] >= 0 && zahlen[k + 1] <= vbH, 'in der viewBox');
  });
});

test('Gefälle 5: Tropfenpfad ist geschlossen und liegt in der viewBox', () => {
  const d = tropfenPfad();
  assert.match(d, /^M[\d. ]+L[\d. ]+A6 6 0 1 1 [\d. ]+Z$/);
});

const css = fs.readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
test('Gefälle 6: bewegung.css passt zur Geometrie (Weg, Anteil, Beginn der Pfeile)', { skip: !css.includes('@keyframes gefaelle-tropfen') && 'bewegung.css noch ohne Block gefaelle-dusche (E3-ORCH-02a)' }, () => {
  const block = css.slice(css.indexOf('@keyframes gefaelle-tropfen'));
  assert.ok(block.includes(`${Math.round(WEG.anteilHang * 100)}% { translate: ${WEG.hang.x}px ${WEG.hang.y}px; opacity: 1; }`));
  assert.ok(block.includes(`100% { translate: ${WEG.ablauf.x}px ${WEG.ablauf.y}px; opacity: 0; }`));
  PFEIL_BEGINN.forEach((a, i) => assert.ok(css.includes(`.gefaelle-pfeil:nth-child(${i + 1}) { animation-delay: calc(var(--dauer-5) * ${a}); }`), `Beginn Pfeil ${i + 1}`));
});
