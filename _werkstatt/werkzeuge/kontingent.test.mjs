// kontingent.test.mjs · Prüfung des Kontingent-Werkzeugs (node --test, ohne Netz).
// Alle Protokolle und Kalibrierdateien stammen aus einem künstlichen Temp-Ordner;
// die echten Protokolle und die echte Kalibrierdatei werden nicht berührt.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as K from './kontingent.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPT = path.join(HIER, 'kontingent.mjs');
const BASIS =
  process.env.KONTINGENT_TESTBASIS ||
  '/tmp/claude-0/-home-user-tezgel/e3298496-69df-51ae-b9b5-0d101f8045d6/scratchpad/kontingent-test';
const PREISE = K.ladePreise(K.STANDARD_PREISE);
const M = 1_000_000;

let tmp;

before(() => {
  fs.mkdirSync(BASIS, { recursive: true });
  tmp = fs.mkdtempSync(path.join(BASIS, 'lauf-'));
});

after(() => {
  if (tmp) fs.rmSync(tmp, { recursive: true, force: true });
});

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);
const ms = (iso) => Date.parse(iso);

function schreibe(rel, zeilen) {
  const p = path.join(tmp, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, zeilen.join('\n') + '\n');
  return p;
}

// Eine Protokollzeile mit Antwort (message.id, Modell, Usage).
const antwort = (id, iso, modell, usage) =>
  JSON.stringify({ type: 'assistant', timestamp: iso, message: { id, model: modell, usage } });

function kalDatei(name, punkte) {
  const p = path.join(tmp, name);
  fs.writeFileSync(p, JSON.stringify(punkte, null, 2) + '\n');
  return p;
}

function kontingent(...args) {
  return execFileSync(process.execPath, [SKRIPT, ...args], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).replace(/\n$/, '');
}

// ---------------------------------------------------------------- Preisrechnung

test('Preisrechnung je Tokenart (Haiku, Listenpreis je Million Token)', () => {
  const kosten = (t) => K.kostenVonTokens({ input: 0, output: 0, cw5: 0, cw1: 0, cr: 0, ...t }, 'claude-haiku-5-5', PREISE);
  near(kosten({ input: M }).usd, 0.1);
  near(kosten({ output: M }).usd, 0.5);
  near(kosten({ cw5: M }).usd, 0.125);
  near(kosten({ cw1: M }).usd, 0.2);
  near(kosten({ cr: M }).usd, 0.01);
});

test('Cache-Schreiben: Aufteilung 5 min und 1 h; fehlende Aufteilung gilt als 5 min', () => {
  const mit = K.tokenAusUsage({
    cache_creation_input_tokens: M,
    cache_creation: { ephemeral_5m_input_tokens: 0.6 * M, ephemeral_1h_input_tokens: 0.4 * M },
  });
  assert.equal(mit.cw5, 0.6 * M);
  assert.equal(mit.cw1, 0.4 * M);
  near(K.kostenVonTokens(mit, 'claude-opus-5-5', PREISE).usd, 0.6 * 5 + 0.4 * 8); // 6,2 USD

  const ohne = K.tokenAusUsage({ cache_creation_input_tokens: M });
  assert.equal(ohne.cw5, M);
  assert.equal(ohne.cw1, 0);
  near(K.kostenVonTokens(ohne, 'claude-sonnet-5-5', PREISE).usd, 2.5);
});

test('Fable: alle Tokenarten zusammen', () => {
  const t = { input: 2 * M, output: M, cw5: 0, cw1: M, cr: 4 * M };
  // Fable: 2*10 + 1*50 + 1*20 + 4*0,25 = 20 + 50 + 20 + 1 = 91
  near(K.kostenVonTokens(t, 'claude-fable-5-1', PREISE).usd, 91);
});

test('Unbekanntes Modell rechnet mit dem Opus-Preis und wird gemeldet', () => {
  const r = K.kostenVonTokens({ input: M, output: 0, cw5: 0, cw1: 0, cr: 0 }, 'claude-unbekannt-9', PREISE);
  near(r.usd, 4);
  assert.equal(r.bekannt, false);
  const leer = K.kostenVonTokens({ input: 0, output: 0, cw5: 0, cw1: 0, cr: 0 }, '<synthetic>', PREISE);
  assert.equal(leer.bekannt, true);
  assert.equal(leer.usd, 0);
});

// ---------------------------------------------------------------- Protokolle und Entdopplung

test('Entdopplung nach message.id: der letzte Eintrag einer Antwort zählt einmal', async () => {
  const wurzel = path.join(tmp, 'entdopplung');
  schreibe('entdopplung/projekt/sitzung-a.jsonl', [
    JSON.stringify({ type: 'user', timestamp: '2026-10-26T13:31:00.000Z', message: { role: 'user', content: 'hallo' } }),
    JSON.stringify({ type: 'user', timestamp: '2026-10-26T13:31:01.000Z', toolUseResult: 'usage im Text' }),
    '{"usage": kaputt',
    // Dieselbe Antwort m1 zweimal: zuerst Teilstand, dann Endstand (Opus, 2 Mio. Ausgabe = 40 USD).
    antwort('m1', '2026-10-26T13:40:00.000Z', 'claude-opus-5-5', { input_tokens: 1, output_tokens: 100_000 }),
    antwort('m1', '2026-10-26T13:40:00.000Z', 'claude-opus-5-5', { input_tokens: 1, output_tokens: 2 * M }),
  ]);
  schreibe('entdopplung/projekt/subagents/workflows/wf-x/agent-1.jsonl', [
    antwort('m2', '2026-10-26T14:00:00.000Z', 'claude-sonnet-5-5', { input_tokens: M, output_tokens: 0 }),
  ]);
  const { eintraege, unbekannt, dateien } = await K.ladeProtokolle(wurzel, PREISE);
  assert.equal(dateien, 2);
  assert.equal(eintraege.length, 2, 'm1 darf nur einmal zählen');
  const m1 = eintraege.find((e) => e.ts === ms('2026-10-26T13:40:00.000Z') && e.modell === 'claude-opus-5-5');
  near(m1.usd, 40 + 4 / M); // 40 USD Ausgabe + 4 USD je Mio. Eingabe mal 1 Token
  const gesamt = eintraege.reduce((s, e) => s + e.usd, 0);
  near(gesamt, 40 + 4 / M + 2);
  assert.equal(unbekannt.size, 0);
});

// ---------------------------------------------------------------- Fensterkette

test('Fensterkette: jedes Fenster beginnt mit der ersten Anfrage nach dem Ende des vorigen', () => {
  const anker = ms('2026-10-26T18:30:00Z');
  const zeitpunkte = [
    '2026-10-26T18:10:00Z', // vor dem Anker, zählt nicht
    '2026-10-26T18:40:00Z', // Fenster 1 beginnt
    '2026-10-26T19:00:00Z',
    '2026-10-26T23:45:00Z', // Fenster 2 beginnt (nach 23:40)
    '2026-10-27T04:00:00Z',
    '2026-10-27T05:00:00Z', // Fenster 3 beginnt (nach 04:45)
  ].map(ms);
  const jetzt = ms('2026-10-27T06:00:00Z');
  const kette = K.fensterKette(anker, zeitpunkte, jetzt);
  assert.deepEqual(
    kette.map((f) => f.start),
    [ms('2026-10-26T18:40:00Z'), ms('2026-10-26T23:45:00Z'), ms('2026-10-27T05:00:00Z')],
  );
  assert.deepEqual(
    kette.map((f) => f.ende),
    [ms('2026-10-26T23:40:00Z'), ms('2026-10-27T04:45:00Z'), ms('2026-10-27T10:00:00Z')],
  );
  const aktuell = K.aktuellesFenster(kette, jetzt);
  assert.equal(aktuell.start, ms('2026-10-27T05:00:00Z'));
});

test('Fensterkette: nach einer Lücke über das Fensterende hinaus ist kein Fenster offen', () => {
  const anker = ms('2026-10-26T18:30:00Z');
  const zeitpunkte = ['2026-10-26T18:40:00Z', '2026-10-27T05:00:00Z'].map(ms);
  const jetzt = ms('2026-10-27T11:00:00Z');
  const kette = K.fensterKette(anker, zeitpunkte, jetzt);
  assert.equal(kette.length, 2);
  assert.equal(K.aktuellesFenster(kette, jetzt), null);
});

test('Fensterkette: liegt jetzt im Kalibrierfenster, ist dieses das aktuelle Fenster', () => {
  const anker = ms('2026-10-26T18:30:00Z');
  const jetzt = ms('2026-10-26T15:00:00Z');
  const kette = K.fensterKette(anker, [], jetzt);
  const aktuell = K.aktuellesFenster(kette, jetzt);
  assert.equal(aktuell.start, ms('2026-10-26T13:30:00Z'));
  assert.equal(aktuell.ende, anker);
});

// ---------------------------------------------------------------- Regel

test('Regel: Gas unter Soll minus 5, Bremse über Soll plus 5, sonst Halten', () => {
  assert.equal(K.regel(30, 40), 'Gas');
  assert.equal(K.regel(34.9, 40), 'Gas');
  assert.equal(K.regel(35, 40), 'Halten');
  assert.equal(K.regel(40, 40), 'Halten');
  assert.equal(K.regel(45, 40), 'Halten');
  assert.equal(K.regel(45.1, 40), 'Bremse');
});

test('Zustand: Verbrauch = Kosten im Fenster mal Faktor, Soll = Ziel mal vergangene Zeit / 5 h', () => {
  const anker = { ende: '2026-10-26T18:30:00.000Z', start: '2026-10-26T13:30:00.000Z', zeit: '2026-10-26T18:30:00.000Z', prozent: 100, kosten_usd: 50, faktor: 2, quelle: 'limit', erfasst: '2026-10-27T04:00:00.000Z' };
  const eintraege = [
    { ts: ms('2026-10-26T13:40:00Z'), usd: 50, modell: 'claude-opus-5-5', datei: 'x' }, // Kalibrierfenster
    { ts: ms('2026-10-26T18:40:00Z'), usd: 10, modell: 'claude-opus-5-5', datei: 'x' }, // Fenster 1
  ];
  const z = K.zustand({ eintraege, punkte: [anker], messwert: null, jetzt: ms('2026-10-26T20:40:00Z') });
  near(z.verbrauch, 20); // 10 USD * 2 %/USD
  near(z.soll, 38); // 95 * 2 h / 5 h
  assert.equal(z.regel, 'Gas');
  assert.equal(z.ziel, 95);
  assert.equal(K.zeile(z), 'Fenster 20.0 % (Soll 38.0 %, Ziel 95 %) 2026-10-26 18:40–2026-10-26 23:40 UTC · Woche ? % · Gas · Quelle Schätzung (Faktor 2, Stand 2026-10-26)');
});

// ---------------------------------------------------------------- Befehlszeile

test('Befehlszeile: Kalibrieren, Schätzung und Tage und Agenten über einen künstlichen Protokollordner', () => {
  const root = path.join(tmp, 'cli');
  schreibe('cli/projekt/sitzung.jsonl', [
    antwort('a1', '2026-10-26T13:40:00.000Z', 'claude-opus-5-5', { input_tokens: 0, output_tokens: 2.5 * M }), // 50 USD
    antwort('a2', '2026-10-26T18:40:00.000Z', 'claude-opus-5-5', { input_tokens: 0, output_tokens: 0.5 * M }), // 10 USD
  ]);
  schreibe('cli/projekt/subagents/workflows/wf-test/agent-1.jsonl', [
    antwort('s1', '2026-10-26T19:00:00.000Z', 'claude-sonnet-5-5', { input_tokens: M, output_tokens: 0 }), // 2 USD
  ]);
  const kal = kalDatei('cli-kal.json', [
    { ende: '2026-10-26T18:30:00.000Z', start: '2026-10-26T13:30:00.000Z', zeit: '2026-10-26T18:30:00.000Z', prozent: 100, kosten_usd: 50, faktor: 2, quelle: 'limit', erfasst: '2026-10-27T04:00:00.000Z' },
  ]);
  const messwert = path.join(tmp, 'kein-messwert.json');
  const gemeinsam = ['--protokolle', root, '--kalibrierdatei', kal, '--messwert', messwert];

  // Schätzung: 12 USD * 2 = 24 %, Soll 38 % um 20:40 UTC, also Gas.
  const zeile = kontingent(...gemeinsam, '--jetzt', '2026-10-26T20:40:00Z');
  assert.equal(zeile.split('\n').length, 1, 'genau eine Zeile');
  assert.equal(zeile, 'Fenster 24.0 % (Soll 38.0 %, Ziel 95 %) 2026-10-26 18:40–2026-10-26 23:40 UTC · Woche ? % · Gas · Quelle Schätzung (Faktor 2, Stand 2026-10-26)');

  // Tage: Kosten je Modell am 26.10.
  const tage = kontingent(...gemeinsam, '--tage', '--jetzt', '2026-10-26T20:40:00Z');
  assert.match(tage, /2026-10-26 {2}claude-opus-5-5 +\$60\.00 {2}2 Antworten/);
  assert.match(tage, /2026-10-26 {2}claude-sonnet-5-5 +\$2\.00 {2}1 Antworten/);

  // Agenten: das Unterprotokoll mit Kosten 2 USD und Prozent 4 (Faktor 2).
  const agenten = kontingent(...gemeinsam, '--agenten', 'workflows/wf-test', '--jetzt', '2026-10-26T20:40:00Z');
  assert.match(agenten, /agent-1\.jsonl · Modell claude-sonnet-5-5 · 1 Antworten · Kosten \$2\.000 · 4\.0 %/);

  // Kalibrieren: Meldung 50 % für das Fenster 18:40 bis 23:40 (Kosten 12 USD), Faktor 50 / 12.
  const neu = path.join(tmp, 'neu-kal.json');
  const ausgabe = kontingent(
    '--protokolle', root, '--kalibrierdatei', neu, '--messwert', messwert,
    '--kalibrieren', '--ende', '2026-10-26T23:40:00Z', '--prozent', '50', '--quelle', 'meldung',
    '--zeit', '2026-10-26T23:40:00Z', '--jetzt', '2026-10-26T23:41:00Z',
  );
  assert.match(ausgabe, /Kosten \$12\.00 · 50 % · Faktor 4\.167 · Quelle meldung · Stand 2026-10-26/);
  const punkte = JSON.parse(fs.readFileSync(neu, 'utf8'));
  assert.equal(punkte.length, 1);
  near(punkte[0].faktor, 50 / 12);

  // Der jüngste Faktor gilt: 12 USD * 4,167 = 50 % gegen Soll 38 %, also Bremse.
  const nachKal = kontingent('--protokolle', root, '--kalibrierdatei', neu, '--messwert', messwert, '--jetzt', '2026-10-26T20:40:00Z');
  assert.match(nachKal, /^Fenster 50\.0 % \(Soll 38\.0 %, Ziel 95 %\) .* · Bremse · Quelle Schätzung \(Faktor 4\.167, Stand 2026-10-26\)$/);
});
