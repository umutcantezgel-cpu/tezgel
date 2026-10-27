// Designsystem v4 (KERN K-005, E-067-5, UM-E3-DS): Skalen in den Grenzen aus Abschnitt 7, Ablauflängen als Vielfache der
// Dauerstufen, Farben in OKLCH mit Rollen nur als Verweis auf Stufen.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const theme = css.slice(css.indexOf('@theme static {'), css.indexOf('\n}', css.indexOf('@theme static {')));
const token = (name) => {
  const m = new RegExp(`--${name}:\\s*([^;]+);`).exec(theme);
  assert.ok(m, `Token --${name} fehlt`);
  return m[1].trim();
};
const ms = (wert) => (wert.endsWith('ms') ? Number.parseFloat(wert) : Number.parseFloat(wert) * 1000);

test('sechs Dauerstufen dauer-0 bis dauer-5, aufsteigend', () => {
  const stufen = [...theme.matchAll(/--dauer-(\d+):\s*([^;]+);/g)].map((m) => [Number(m[1]), ms(m[2].trim())]);
  assert.deepEqual(stufen.map((s) => s[0]), [0, 1, 2, 3, 4, 5]);
  for (let i = 1; i < stufen.length; i++) assert.ok(stufen[i][1] > stufen[i - 1][1]);
});

test('Ablauflängen sind Vielfache oder Summen der Dauerstufen', () => {
  const d = (n) => ms(token(`dauer-${n}`));
  assert.equal(ms(token('verlegen-gesamt')), 2 * d(5));
  assert.equal(ms(token('verlegen-gesamt-folge')), d(5) + d(3));
  assert.equal(ms(token('verlegen-ruhig')), d(1));
  assert.equal(ms(token('intro-gesamt')), 2 * d(4));
  assert.equal(ms(token('band-durchlauf')), 50 * d(5));
});

test('vier Kurven, hammer ist Alias von setzen', () => {
  const kurven = [...theme.matchAll(/--ease-([a-z]+):\s*cubic-bezier/g)].map((m) => m[1]);
  assert.deepEqual(kurven.sort(), ['aufsetzen', 'laser', 'setzen', 'weg']);
  assert.equal(token('ease-hammer'), 'var(--ease-setzen)');
});

test('Farbstufen in OKLCH, Rollen und Bedeutungen nur als Verweis auf eine Stufe', () => {
  const farben = [...theme.matchAll(/--color-([a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]);
  // Stufen tragen die Helligkeit in Prozent (zwei- oder dreistellig); tinte-2 ist ein v2-Rollenname, keine Stufe
  const stufe = /^(kalk|tinte|laser|abnahme)-\d{2,3}$/;
  for (const [name, wert] of farben) {
    if (name === '*' || name === 'fliese-glanz') continue;
    if (stufe.test(name)) assert.match(wert, /^oklch\(/, `${name} ist keine OKLCH-Stufe`);
    else assert.match(wert, /^var\(--color-(kalk|tinte|laser|abnahme)-\d{2,3}\)$/, `${name} verweist nicht auf eine Stufe`);
  }
  for (const rolle of ['fehler', 'erfolg', 'rand', 'fokus']) assert.ok(farben.some(([n]) => n === rolle), `Bedeutung ${rolle} fehlt`);
});

test('Schriftstufen höchstens 10, Radien höchstens 4, Schatten höchstens 4', () => {
  const zaehle = (re) => new Set([...theme.matchAll(re)].map((m) => m[1])).size;
  assert.ok(zaehle(/--text-(fs-\d+):/g) <= 10);
  assert.ok(zaehle(/--radius-([a-z0-9]+):/g) + 1 <= 4); // dazu rounded-none
  assert.ok(zaehle(/--shadow-([a-z]+):/g) <= 4);
});
