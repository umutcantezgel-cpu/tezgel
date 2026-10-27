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
  // B-01 eingefroren (E-078): die Überblendung bei reduzierter Bewegung bleibt bei 150 ms wie in E0, außerhalb der Stufen
  assert.equal(ms(token('verlegen-ruhig')), 150);
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

// Rückrechnung OKLCH → sRGB nach CSS Color 4 (Beispielcode conversions.js), wie der Browser sie ausführt
const mal = (M, v) => M.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
const LAB_LMS = [[1, 0.3963377773761749, 0.2158037573099136], [1, -0.1055613458156586, -0.0638541728258133], [1, -0.0894841775298119, -1.2914855480194092]];
const LMS_XYZ = [[1.2268798758459243, -0.5578149944602171, 0.2813910456659647], [-0.0405757452148008, 1.112286803280317, -0.0717110580655164], [-0.0763729366746601, -0.4214933324022432, 1.5869240198367816]];
const XYZ_RGB = [[12831 / 3959, -329 / 214, -1974 / 3959], [-851781 / 878810, 1648619 / 878810, 36519 / 878810], [705 / 12673, -2585 / 12673, 705 / 667]];
const gamma = (c) => (Math.abs(c) > 0.0031308 ? Math.sign(c) * (1.055 * Math.abs(c) ** (1 / 2.4) - 0.055) : 12.92 * c);
function oklchZuRgb(wert) {
  const [l, c, h] = wert.match(/^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)$/).slice(1).map(Number);
  const lab = [l / 100, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)];
  return mal(XYZ_RGB, mal(LMS_XYZ, mal(LAB_LMS, lab).map((v) => v ** 3))).map((v) => gamma(v) * 255);
}

test('Stufenname gleich gerundeter OKLCH-Helligkeit; die Stufen der v3-Farben rechnen auf deren sRGB-Wert zurück (Fehler unter 0,01 Stufen, E-075)', () => {
  for (const [, name, l] of theme.matchAll(/--color-((?:kalk|tinte|laser|abnahme)-(\d{2,3})):\s*oklch\(([\d.]+)%/g).map((m) => [m[0], m[1], m[3]])) {
    assert.equal(Math.round(Number(l)), Number(name.split('-').at(-1)), `${name}: Helligkeit ${l} %`);
  }
  const v3 = { 'kalk-100': '#FFFFFF', 'kalk-97': '#F4F4F5', 'kalk-90': '#DDDEE2', 'kalk-75': '#A9AEC0', 'tinte-62': '#818698', 'tinte-41': '#43485F', 'tinte-33': '#2B3352', 'tinte-19': '#0A1129', 'laser-57': '#D82020', 'laser-47': '#A8171C', 'abnahme-47': '#1D6B3F' };
  for (const [stufe, hex] of Object.entries(v3)) {
    const rgb = oklchZuRgb(token(`color-${stufe}`));
    rgb.forEach((v, i) => {
      const soll = Number.parseInt(hex.slice(1 + 2 * i, 3 + 2 * i), 16);
      assert.ok(Math.abs(v - soll) < 0.01, `${stufe} Kanal ${i}: ${v.toFixed(4)} statt ${soll} (${hex})`);
    });
  }
});

test('Schriftstufen höchstens 10, Radien höchstens 4, Schatten höchstens 4', () => {
  const zaehle = (re) => new Set([...theme.matchAll(re)].map((m) => m[1])).size;
  assert.ok(zaehle(/--text-(fs-\d+):/g) <= 10);
  assert.ok(zaehle(/--radius-([a-z0-9]+):/g) + 1 <= 4); // dazu rounded-none
  assert.ok(zaehle(/--shadow-([a-z]+):/g) <= 4);
});
