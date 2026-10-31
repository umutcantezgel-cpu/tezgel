import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { erzaehlFolge, wissenFolge, FORMEL_NUMMER } from '../src/components/vorlagen/folge.ts';

// Seitenformel und erlaubte Folgen (KERN K-009 in K-010 „Informationsarchitektur“, UM-E4-SICHT-FIX M-B7): Die Formel bleibt
// Standard; abweichen darf eine Seite nur per Schalter und nur, wenn sie hier und in K-009 mit Grund gelistet ist. ERLAUBT ist
// die Liste aus K-009; EIN nennt, was schon eingeschaltet ist (/balkon-terrasse momentZuerst seit der Nacharbeit SF-B mit der
// Erklärung in der Legende der Zeichnung; /bad schaltet Teil C mit M-C1 ein, zusammen mit der Erklärung der Fachwörter in der
// Szene, /ueber-uns nachLage M-C4 mit einer Textentscheidung zur Zeitleiste). Wer einschaltet, trägt die Seite in EIN nach.
const ERLAUBT = {
  belegVorn: ['/referenzen', '/balkon-terrasse'],
  wissenVorLage: ['/blog'],
  momentZuerst: ['/bad', '/bad/barrierefreies-bad', '/balkon-terrasse'],
  nachLage: ['/ueber-uns'],
};
const EIN = {
  belegVorn: ['/referenzen', '/balkon-terrasse'],
  wissenVorLage: ['/blog'],
  momentZuerst: ['/bad/barrierefreies-bad', '/balkon-terrasse'],
  nachLage: [],
};

const wurzel = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dateien = (ordner, muster) =>
  fs.readdirSync(path.join(wurzel, ordner), { recursive: true }).map(String).filter((d) => muster.test(d)).map((d) => path.join(ordner, d));
// Quelltext ohne Kommentare: Ein Schalter zählt nur, wo er gesetzt wird
const ohneKommentare = (text) => text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
const quelle = (datei) => ohneKommentare(fs.readFileSync(path.join(wurzel, datei), 'utf8'));
const pfadAus = (datei, text) => /pfad:\s*'([^']+)'/.exec(text)?.[1] ?? null;
const seiteAus = (datei) => '/' + datei.replace(/^src\/app\/\(bestand\)\/?/, '').replace(/\/?page\.(jsx|tsx)$/, '');

// Abschnitt der Seitenformel je Teil, der Einstieg (1) steht immer zuerst; Werkzeuge nach dem Schritt zählen nicht
const formel = (folge) => [1, ...folge.map((t) => FORMEL_NUMMER[t]).filter((n) => n !== null)];

function pruefeFormel(folge, name) {
  const f = formel(folge);
  for (const n of [1, 2, 3, 4, 5, 6]) assert.ok(f.includes(n), `${name}: Teil ${n} der Seitenformel fehlt`);
  assert.equal(f[0], 1, `${name}: Einstieg zuerst`);
  assert.equal(f.at(-1), 6, `${name}: nächster Schritt zuletzt`);
  assert.ok(folge.indexOf('werkzeug') === -1 || folge.indexOf('werkzeug') > folge.indexOf('schritt'), `${name}: Werkzeug ohne imSchritt nach dem Schritt`);
}

test('Folge 1: Standard ist die Seitenformel in fester Reihenfolge (Lage, Tun, Ablauf, Beleg, Schritt)', () => {
  for (const [name, folge] of [['Erzählseite', erzaehlFolge()], ['Wissensseite', wissenFolge()]]) {
    pruefeFormel(folge, name);
    const f = formel(folge);
    assert.deepEqual(f, [...f].sort((a, b) => a - b), `${name}: Standardfolge steigt`);
  }
});

test('Folge 2: Schalter ändern nur die erlaubte Stelle, alle sechs Teile bleiben, Einstieg zuerst, Schritt zuletzt', () => {
  const belegVorn = erzaehlFolge({ belegVorn: true });
  pruefeFormel(belegVorn, 'belegVorn');
  assert.deepEqual(belegVorn.slice(0, 4), ['lage', 'nachLage', 'beleg', 'nachBeleg'], 'belegVorn: Beleg direkt nach der Lage');
  assert.ok(belegVorn.indexOf('versprechen') > belegVorn.indexOf('ablauf'), 'belegVorn: Versprechen vor dem Schritt nach dem Ablauf');
  const wissen = wissenFolge({ wissenVorLage: true });
  pruefeFormel(wissen, 'wissenVorLage');
  assert.deepEqual(wissen.slice(0, 2), ['wissen', 'lage'], 'wissenVorLage: Wissensblöcke vor der Lage');
  // nachLage ist ein Slot direkt nach der Lage, in jeder Folge
  for (const folge of [erzaehlFolge(), belegVorn]) assert.equal(folge.indexOf('nachLage'), folge.indexOf('lage') + 1);
});

test('Folge 3: Schalter stehen nur in den Inhalten der gelisteten Seiten (und genau dort, wo sie eingeschaltet sind)', () => {
  const inhalte = dateien('src/inhalte', /\.ts$/);
  assert.ok(inhalte.length >= 10, 'Inhalte gefunden');
  const gefunden = { belegVorn: [], wissenVorLage: [], momentZuerst: [] };
  for (const datei of inhalte) {
    const text = quelle(datei);
    for (const schalter of Object.keys(gefunden)) {
      if (new RegExp(`\\b${schalter}\\s*:`).test(text)) gefunden[schalter].push(pfadAus(datei, text) ?? datei);
    }
  }
  for (const [schalter, seiten] of Object.entries(gefunden)) {
    for (const s of seiten) assert.ok(ERLAUBT[schalter].includes(s), `${schalter} auf ${s} steht nicht in K-009`);
    assert.deepEqual(seiten.sort(), [...EIN[schalter]].sort(), `${schalter}: eingeschaltet wie in EIN`);
  }
});

test('Folge 4: der Slot nachLage nur auf den gelisteten Seiten', () => {
  const seiten = dateien('src/app', /page\.(jsx|tsx)$/)
    .filter((d) => !d.includes('werkstatt-schaufenster'))
    .filter((d) => /\bnachLage\s*=/.test(quelle(d)))
    .map(seiteAus);
  for (const s of seiten) assert.ok(ERLAUBT.nachLage.includes(s), `nachLage auf ${s} steht nicht in K-009`);
  assert.deepEqual(seiten.sort(), [...EIN.nachLage].sort());
});

test('Folge 5: die eingeschalteten Seiten setzen ihren Schalter wirklich (Inhalt geladen)', async () => {
  const { REFERENZEN } = await import('../src/inhalte/referenzen.ts');
  const { BALKON_TERRASSE } = await import('../src/inhalte/balkon-terrasse.ts');
  const { BLOG } = await import('../src/inhalte/blog.ts');
  const { BARRIEREFREIES_BAD } = await import('../src/inhalte/barrierefreies-bad.ts');
  const { START } = await import('../src/inhalte/start.ts');
  assert.equal(REFERENZEN.belegVorn, true);
  assert.equal(BALKON_TERRASSE.belegVorn, true);
  assert.equal(BLOG.wissenVorLage, true);
  assert.equal(BARRIEREFREIES_BAD.tun.momentZuerst, true);
  assert.equal(BALKON_TERRASSE.tun.momentZuerst, true);
  // die Startseite (Referenzansicht) folgt der Formel ohne Schalter
  assert.equal(START.belegVorn, undefined);
  assert.equal(START.tun.momentZuerst, undefined);
  for (const inhalt of [REFERENZEN, BALKON_TERRASSE]) pruefeFormel(erzaehlFolge(inhalt), inhalt.pfad);
  pruefeFormel(wissenFolge(BLOG), BLOG.pfad);
});
