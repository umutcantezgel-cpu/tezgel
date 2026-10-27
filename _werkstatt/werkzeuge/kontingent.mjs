#!/usr/bin/env node
// kontingent.mjs · Kontingent-Tempomat nach AUFTRAG Abschnitt 12 (Schätzung aus den Sitzungsprotokollen).
//
// Aufrufe:
//   node kontingent.mjs                          eine Tempomat-Zeile (Fenster, Soll, Ziel, Regel, Quelle)
//   node kontingent.mjs --json                   alle Werte als JSON
//   node kontingent.mjs --tage                   Kosten je UTC-Tag und Modell, letzte 7 Tage
//   node kontingent.mjs --agenten <Ordner>       je Unteragenten-Protokoll Modell, Kosten, Prozent, Spanne, Median
//   node kontingent.mjs --kalibrieren --ende <ISO> --prozent <n> [--quelle meldung|limit] [--zeit <ISO>]
//
// Weitere Schalter: --protokolle <Ordner>, --kalibrierdatei <Datei>, --messwert <Datei>,
//                   --preise <Datei>, --jetzt <ISO> (Prüfzeitpunkt, für Tests).
//
// Liest die Protokolle nur (*.jsonl, zeilenweise). Geschrieben wird ausschließlich die
// Kalibrierdatei, und zwar nur mit --kalibrieren. Nur Node-Bordmittel.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));

export const FENSTER_MS = 5 * 3600 * 1000;
export const MESSWERT_MAX_ALTER_MS = 15 * 60 * 1000;
export const ZIEL_KALIBRIERT = 95;
export const ZIEL_MESSWERT = 99;
export const TOLERANZ = 5;
export const OPUS = 'claude-opus-5-5';
export const STANDARD_PREISE = path.join(HIER, 'kontingent-preise.json');
export const STANDARD_KALIBRIERUNG = path.join(HIER, 'kontingent-kalibrierung.json');
export const STANDARD_PROTOKOLLE = path.join(os.homedir(), '.claude', 'projects', '-home-user-tezgel');
export const STANDARD_MESSWERT = path.join(os.homedir(), '.claude', 'kontingent.json');

const HILFE = `Aufruf: node kontingent.mjs [--json | --tage | --agenten <Ordner> | --kalibrieren --ende <ISO> --prozent <n> [--quelle meldung|limit] [--zeit <ISO>]]
Schalter zusätzlich: --protokolle <Ordner> --kalibrierdatei <Datei> --messwert <Datei> --preise <Datei> --jetzt <ISO>`;

const num = (x) => (Number.isFinite(x) ? x : 0);

// ---------------------------------------------------------------- Preise und Tokens

export function ladePreise(datei) {
  const d = JSON.parse(fs.readFileSync(datei, 'utf8'));
  for (const [modell, p] of Object.entries(d)) {
    if (modell.startsWith('_')) continue;
    for (const feld of ['input', 'output', 'cache_write_5m', 'cache_write_1h', 'cache_read']) {
      if (!Number.isFinite(p[feld])) throw new Error(`Preis fehlt: ${modell}.${feld} in ${datei}`);
    }
  }
  if (!d[OPUS]) throw new Error(`Preistabelle ohne ${OPUS} (Rückfallpreis) in ${datei}`);
  return d;
}

function istPreis(p) {
  return p !== null && typeof p === 'object' && !Array.isArray(p) && Number.isFinite(p.input);
}

// Tokenarten aus message.usage. Fehlt die Aufteilung des Cache-Schreibens, gilt 5 min.
export function tokenAusUsage(u) {
  const gesamt = num(u.cache_creation_input_tokens);
  let cw5;
  let cw1;
  if (u.cache_creation && typeof u.cache_creation === 'object') {
    cw5 = num(u.cache_creation.ephemeral_5m_input_tokens);
    cw1 = num(u.cache_creation.ephemeral_1h_input_tokens);
    cw5 += Math.max(0, gesamt - cw5 - cw1);
  } else {
    cw5 = gesamt;
    cw1 = 0;
  }
  return {
    input: num(u.input_tokens),
    output: num(u.output_tokens),
    cw5,
    cw1,
    cr: num(u.cache_read_input_tokens),
  };
}

// Kosten in US-Dollar. Unbekanntes Modell: Opus-Preis, bekannt = false.
export function kostenVonTokens(t, modell, preise) {
  const kennt = istPreis(preise[modell]);
  const s = kennt ? preise[modell] : preise[OPUS];
  const leer = t.input + t.output + t.cw5 + t.cw1 + t.cr === 0;
  const usd =
    (t.input * s.input +
      t.output * s.output +
      t.cw5 * s.cache_write_5m +
      t.cw1 * s.cache_write_1h +
      t.cr * s.cache_read) /
    1e6;
  return { usd, bekannt: kennt || leer };
}

// ---------------------------------------------------------------- Protokolle lesen

export function findeJsonl(wurzel) {
  const ergebnis = [];
  const stapel = [wurzel];
  while (stapel.length) {
    const dir = stapel.pop();
    let eintraege;
    try {
      eintraege = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of eintraege) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) stapel.push(p);
      else if (e.isFile() && e.name.endsWith('.jsonl')) ergebnis.push(p);
    }
  }
  return ergebnis.sort();
}

function leseZeilen(datei, je) {
  return new Promise((resolve, reject) => {
    const strom = fs.createReadStream(datei, { encoding: 'utf8' });
    const rl = readline.createInterface({ input: strom, crlfDelay: Infinity });
    let nr = 0;
    strom.on('error', reject);
    rl.on('line', (zeile) => {
      nr += 1;
      je(zeile, nr);
    });
    rl.on('close', resolve);
  });
}

// Liest alle Protokolle. Gleiche message.id zählt einmal; der letzte Eintrag gewinnt.
export async function ladeProtokolle(wurzel, preise) {
  const dateien = findeJsonl(wurzel);
  const karte = new Map();
  const unbekannt = new Set();
  for (const datei of dateien) {
    await leseZeilen(datei, (zeile, nr) => {
      if (!zeile.includes('"usage"')) return;
      let d;
      try {
        d = JSON.parse(zeile);
      } catch {
        return;
      }
      const m = d && d.message;
      if (!m || typeof m !== 'object' || !m.usage || typeof m.usage !== 'object') return;
      const ts = Date.parse(d.timestamp);
      if (!Number.isFinite(ts)) return;
      const modell = typeof m.model === 'string' ? m.model : '<unbekannt>';
      const t = tokenAusUsage(m.usage);
      const { usd, bekannt } = kostenVonTokens(t, modell, preise);
      if (!bekannt) unbekannt.add(modell);
      const schluessel = typeof m.id === 'string' ? m.id : `${datei}:${nr}`;
      karte.set(schluessel, { modell, ts, datei, usd, t });
    });
  }
  return { eintraege: [...karte.values()], unbekannt, dateien: dateien.length };
}

// ---------------------------------------------------------------- Fenster

function untereGrenze(sortiert, x) {
  let lo = 0;
  let hi = sortiert.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sortiert[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// Kette ab dem Anker. Ein Fenster beginnt mit der ersten Anfrage nach dem Ende des vorigen.
// Liefert die Fenster bis einschließlich des Fensters, das jetzt enthält oder als letztes begann.
export function fensterKette(ankerEndeMs, zeitpunkte, jetzt) {
  if (ankerEndeMs > jetzt) return [{ start: ankerEndeMs - FENSTER_MS, ende: ankerEndeMs }];
  const sortiert = [...zeitpunkte].sort((a, b) => a - b);
  const kette = [];
  let ende = ankerEndeMs;
  for (;;) {
    const i = untereGrenze(sortiert, ende);
    if (i >= sortiert.length) break;
    const f = { start: sortiert[i], ende: sortiert[i] + FENSTER_MS };
    kette.push(f);
    if (f.ende > jetzt) break;
    ende = f.ende;
  }
  return kette;
}

export function aktuellesFenster(kette, jetzt) {
  const letzt = kette[kette.length - 1];
  return letzt && letzt.start <= jetzt && jetzt < letzt.ende ? letzt : null;
}

export function kostenZwischen(eintraege, von, bis) {
  let summe = 0;
  for (const e of eintraege) if (e.ts >= von && e.ts < bis) summe += e.usd;
  return summe;
}

// ---------------------------------------------------------------- Regel und Zustand

export function regel(verbrauch, soll) {
  if (verbrauch < soll - TOLERANZ) return 'Gas';
  if (verbrauch > soll + TOLERANZ) return 'Bremse';
  return 'Halten';
}

function zeitWert(x) {
  if (typeof x === 'number') return x < 1e11 ? x * 1000 : x;
  if (typeof x === 'string') return Date.parse(x);
  return NaN;
}

export function leseMesswert(datei, jetzt) {
  let text;
  let st;
  try {
    text = fs.readFileSync(datei, 'utf8');
    st = fs.statSync(datei);
  } catch {
    return null;
  }
  let d;
  try {
    d = JSON.parse(text);
  } catch {
    return null;
  }
  const pct = d.used_percentage;
  const resets = zeitWert(d.resets_at);
  if (!Number.isFinite(pct) || !Number.isFinite(resets)) return null;
  const stempel = zeitWert(d.timestamp ?? d.zeitpunkt);
  const stand = Number.isFinite(stempel) ? stempel : st.mtimeMs;
  const alter = jetzt - stand;
  if (alter < -60_000 || alter >= MESSWERT_MAX_ALTER_MS) return null;
  const wochenObj = d.week ?? d.woche ?? d.weekly;
  const woche = wochenObj && Number.isFinite(wochenObj.used_percentage) ? wochenObj.used_percentage : null;
  return { used_percentage: pct, resets_at: resets, stand, woche };
}

export function ladeKalibrierung(datei) {
  if (!fs.existsSync(datei)) return [];
  const d = JSON.parse(fs.readFileSync(datei, 'utf8'));
  if (!Array.isArray(d)) throw new Error(`${datei} ist keine Liste von Kalibrierpunkten`);
  return d;
}

// Verbrauch ist in Prozent. Anker = erster Punkt, aktiver Faktor = letzter Punkt.
export function zustand({ eintraege, punkte, messwert = null, jetzt }) {
  const sichtbar = eintraege.filter((e) => e.ts <= jetzt);
  const zeitpunkte = sichtbar.map((e) => e.ts).sort((a, b) => a - b);
  const aktiv = punkte.length ? punkte[punkte.length - 1] : null;
  const faktor = aktiv ? aktiv.faktor : null;
  const stand = aktiv ? aktiv.zeit.slice(0, 10) : null;
  let fenster = null;
  let ziel;
  let quelle;
  let verbrauch = null;
  let woche = null;
  let kostenFenster = null;
  let messwertStand = null;
  if (messwert) {
    fenster = { start: messwert.resets_at - FENSTER_MS, ende: messwert.resets_at };
    ziel = ZIEL_MESSWERT;
    quelle = 'Messwert';
    verbrauch = messwert.used_percentage;
    woche = messwert.woche;
    messwertStand = messwert.stand;
  } else {
    ziel = ZIEL_KALIBRIERT;
    quelle = 'Schätzung';
    if (punkte.length) {
      const anker = Date.parse(punkte[0].ende);
      fenster = aktuellesFenster(fensterKette(anker, zeitpunkte, jetzt), jetzt);
      if (!fenster) {
        verbrauch = 0;
        kostenFenster = 0;
      } else {
        kostenFenster = kostenZwischen(sichtbar, fenster.start, Math.min(fenster.ende, jetzt + 1));
        if (faktor !== null) verbrauch = kostenFenster * faktor;
      }
    }
  }
  const vergangenMs = fenster ? Math.min(FENSTER_MS, Math.max(0, jetzt - fenster.start)) : 0;
  const soll = (ziel * vergangenMs) / FENSTER_MS;
  return {
    jetzt,
    fenster,
    vergangen_ms: vergangenMs,
    ziel,
    soll,
    verbrauch,
    woche,
    regel: verbrauch === null ? 'unkalibriert' : regel(verbrauch, soll),
    quelle,
    faktor,
    stand,
    messwert_stand: messwertStand,
    kosten_fenster_usd: kostenFenster,
    eintraege: sichtbar.length,
  };
}

function fmtUtc(ms) {
  return new Date(ms).toISOString().slice(0, 16).replace('T', ' ');
}

export function zeile(z) {
  const v = z.verbrauch === null ? '?' : z.verbrauch.toFixed(1);
  const s = z.soll.toFixed(1);
  const zeit = z.fenster
    ? `${fmtUtc(z.fenster.start)}–${fmtUtc(z.fenster.ende)} UTC`
    : 'noch kein Fenster offen (beginnt mit der nächsten Anfrage)';
  const woche = z.woche === null ? '?' : z.woche.toFixed(1);
  let quelle;
  if (z.quelle === 'Messwert') {
    quelle = `Quelle Messwert (Stand ${new Date(z.messwert_stand).toISOString().slice(0, 16)} UTC)`;
  } else if (z.faktor !== null) {
    quelle = `Quelle Schätzung (Faktor ${Number(z.faktor.toPrecision(4))}, Stand ${z.stand})`;
  } else {
    quelle = 'Quelle Schätzung (ohne Kalibrierung)';
  }
  return `Fenster ${v} % (Soll ${s} %, Ziel ${z.ziel} %) ${zeit} · Woche ${woche} % · ${z.regel} · ${quelle}`;
}

// ---------------------------------------------------------------- Tage, Agenten, Kalibrierung

export function tageModell(eintraege, jetzt) {
  const heute = Date.parse(new Date(jetzt).toISOString().slice(0, 10) + 'T00:00:00Z');
  const von = heute - 6 * 86400000;
  const karte = new Map();
  for (const e of eintraege) {
    if (e.ts < von || e.ts > jetzt) continue;
    const datum = new Date(e.ts).toISOString().slice(0, 10);
    const schl = `${datum}|${e.modell}`;
    const z = karte.get(schl) ?? { datum, modell: e.modell, usd: 0, n: 0 };
    z.usd += e.usd;
    z.n += 1;
    karte.set(schl, z);
  }
  return [...karte.values()].sort((a, b) => (a.datum + a.modell < b.datum + b.modell ? -1 : 1));
}

export function median(werte) {
  if (!werte.length) return null;
  const s = [...werte].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function findeVerzeichnisse(wurzel) {
  const ergebnis = [];
  const stapel = [wurzel];
  while (stapel.length) {
    const dir = stapel.pop();
    ergebnis.push(dir);
    let eintraege;
    try {
      eintraege = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of eintraege) if (e.isDirectory()) stapel.push(path.join(dir, e.name));
  }
  return ergebnis;
}

export function findeUnterordner(wurzel, arg) {
  if (path.isAbsolute(arg)) return fs.existsSync(arg) ? [arg] : [];
  const ende = path.sep + path.normalize(arg).replace(/^[\\/]+|[\\/]+$/g, '');
  return findeVerzeichnisse(wurzel).filter((d) => d.endsWith(ende));
}

function agentenAusgabe(wurzel, arg, eintraege, faktor) {
  const ordner = findeUnterordner(wurzel, arg);
  if (!ordner.length) throw new Error(`kein Protokollordner „${arg}“ unter ${wurzel}`);
  const je = new Map();
  for (const e of eintraege) {
    if (!ordner.some((o) => e.datei.startsWith(o + path.sep))) continue;
    const z = je.get(e.datei) ?? { datei: e.datei, modelle: new Set(), n: 0, usd: 0 };
    z.modelle.add(e.modell);
    z.n += 1;
    z.usd += e.usd;
    je.set(e.datei, z);
  }
  const zeilen = [...je.values()].sort((a, b) => (a.datei < b.datei ? -1 : 1));
  const out = [];
  for (const z of zeilen) {
    const pct = faktor === null ? '?' : (z.usd * faktor).toFixed(1);
    out.push(
      `${path.relative(wurzel, z.datei)} · Modell ${[...z.modelle].join(',')} · ${z.n} Antworten · Kosten $${z.usd.toFixed(3)} · ${pct} %`,
    );
  }
  const usd = zeilen.map((z) => z.usd);
  const pcts = zeilen.map((z) => (faktor === null ? null : z.usd * faktor));
  const spanne = (w) => (w.length ? `${Math.min(...w).toFixed(3)}–${Math.max(...w).toFixed(3)}` : '–');
  out.push(`Protokolle ${zeilen.length} · Kosten Spanne $${spanne(usd)} · Median $${median(usd)?.toFixed(3) ?? '–'}`);
  if (faktor !== null) {
    out.push(
      `Prozent Spanne ${spanne(pcts)} · Median ${median(pcts)?.toFixed(1) ?? '–'} % (Faktor ${Number(faktor.toPrecision(4))})`,
    );
  }
  const nachModell = new Map();
  for (const z of zeilen) {
    const k = [...z.modelle].sort().join(',');
    nachModell.set(k, [...(nachModell.get(k) ?? []), z.usd]);
  }
  for (const [k, werte] of nachModell) {
    out.push(`Modell ${k}: ${werte.length} Protokolle · Median Kosten $${median(werte).toFixed(3)}`);
  }
  return out.join('\n');
}

export function punktAus({ ende, zeit, prozent, kosten, quelle, erfasst }) {
  const start = new Date(ende - FENSTER_MS).toISOString();
  return {
    ende: new Date(ende).toISOString(),
    start,
    zeit: new Date(zeit).toISOString(),
    prozent,
    kosten_usd: kosten,
    faktor: prozent / kosten,
    quelle,
    erfasst: new Date(erfasst).toISOString(),
  };
}

// ---------------------------------------------------------------- CLI

function parseArgs(argv) {
  const o = { json: false, tage: false, kalibrieren: false, hilfe: false };
  const mitWert = new Set([
    '--protokolle',
    '--kalibrierdatei',
    '--messwert',
    '--preise',
    '--jetzt',
    '--ende',
    '--prozent',
    '--quelle',
    '--zeit',
    '--agenten',
  ]);
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--json') o.json = true;
    else if (a === '--tage') o.tage = true;
    else if (a === '--kalibrieren') o.kalibrieren = true;
    else if (a === '-h' || a === '--hilfe') o.hilfe = true;
    else if (mitWert.has(a)) {
      const v = argv[i + 1];
      if (v === undefined || v.startsWith('--')) throw new Error(`${a} braucht einen Wert`);
      o[a.slice(2)] = v;
      i += 1;
    } else throw new Error(`Unbekannter Schalter: ${a}`);
  }
  return o;
}

async function kalibrieren(o, preise, root, kalDatei, jetzt) {
  if (!o.ende || o.prozent === undefined) throw new Error('--kalibrieren braucht --ende <ISO> und --prozent <n>');
  const ende = Date.parse(o.ende);
  const prozent = Number(o.prozent);
  if (!Number.isFinite(ende) || !Number.isFinite(prozent) || prozent <= 0) {
    throw new Error('--ende und --prozent müssen gültig sein (--prozent > 0)');
  }
  const quelle = o.quelle ?? 'meldung';
  if (!['meldung', 'limit'].includes(quelle)) throw new Error('--quelle ist meldung oder limit');
  let zeit;
  if (o.zeit) zeit = Date.parse(o.zeit);
  else zeit = quelle === 'limit' ? ende : jetzt;
  if (!Number.isFinite(zeit)) throw new Error('--zeit ist kein gültiges Datum');
  const { eintraege, unbekannt } = await ladeProtokolle(root, preise);
  const bis = Math.min(ende, zeit);
  const kosten = kostenZwischen(eintraege, ende - FENSTER_MS, bis);
  if (!(kosten > 0)) throw new Error('Kosten im Kalibrierfenster sind 0; nichts zu kalibrieren');
  const punkt = punktAus({ ende, zeit, prozent, kosten, quelle, erfasst: jetzt });
  const liste = ladeKalibrierung(kalDatei);
  liste.push(punkt);
  fs.writeFileSync(kalDatei, JSON.stringify(liste, null, 2) + '\n');
  if (unbekannt.size) process.stderr.write(`Hinweis: unbekannte Modelle (Opus-Preis): ${[...unbekannt].join(', ')}\n`);
  return (
    `Kalibrierpunkt gespeichert: Fenster ${fmtUtc(ende - FENSTER_MS)}–${fmtUtc(ende)} UTC · ` +
    `Kosten $${kosten.toFixed(2)} · ${prozent} % · Faktor ${Number(punkt.faktor.toPrecision(4))} · ` +
    `Quelle ${quelle} · Stand ${punkt.zeit.slice(0, 10)}`
  );
}

async function main(argv) {
  const o = parseArgs(argv);
  if (o.hilfe) return HILFE;
  const preise = ladePreise(o.preise ?? STANDARD_PREISE);
  const root = o.protokolle ?? STANDARD_PROTOKOLLE;
  const kalDatei = o.kalibrierdatei ?? STANDARD_KALIBRIERUNG;
  const jetzt = o.jetzt !== undefined ? Date.parse(o.jetzt) : Date.now();
  if (!Number.isFinite(jetzt)) throw new Error('--jetzt ist kein gültiges Datum');
  if (!fs.existsSync(root)) throw new Error(`Protokollordner fehlt: ${root}`);
  if (o.kalibrieren) return kalibrieren(o, preise, root, kalDatei, jetzt);

  const punkte = ladeKalibrierung(kalDatei);
  const { eintraege, unbekannt, dateien } = await ladeProtokolle(root, preise);
  const faktor = punkte.length ? punkte[punkte.length - 1].faktor : null;
  let ausgabe;
  if (o.tage) {
    const tage = tageModell(eintraege, jetzt);
    const zeilen = tage.map((t) => `${t.datum}  ${t.modell.padEnd(20)}  $${t.usd.toFixed(2)}  ${t.n} Antworten`);
    const summe = tage.reduce((s, t) => s + t.usd, 0);
    zeilen.push(`Summe 7 Tage $${summe.toFixed(2)} · Protokolldateien ${dateien} · Antworten ${eintraege.length}`);
    ausgabe = zeilen.join('\n');
  } else if (o.agenten !== undefined) {
    ausgabe = agentenAusgabe(root, o.agenten, eintraege, faktor);
  } else {
    const messwertDatei = o.messwert ?? STANDARD_MESSWERT;
    const messwert = leseMesswert(messwertDatei, jetzt);
    const z = zustand({ eintraege, punkte, messwert, jetzt });
    if (o.json) {
      ausgabe = JSON.stringify(
        {
          jetzt: new Date(jetzt).toISOString(),
          fenster: z.fenster
            ? { start: new Date(z.fenster.start).toISOString(), ende: new Date(z.fenster.ende).toISOString() }
            : null,
          vergangen_h: Number((z.vergangen_ms / 3600000).toFixed(3)),
          verbrauch_prozent: z.verbrauch,
          soll_prozent: Number(z.soll.toFixed(3)),
          ziel_prozent: z.ziel,
          woche_prozent: z.woche,
          regel: z.regel,
          quelle: z.quelle,
          faktor: z.faktor,
          stand: z.stand,
          kosten_fenster_usd: z.kosten_fenster_usd,
          antworten: z.eintraege,
          protokolldateien: dateien,
          unbekannte_modelle: [...unbekannt],
          zeile: zeile(z),
        },
        null,
        2,
      );
    } else {
      ausgabe = zeile(z);
    }
  }
  if (unbekannt.size) process.stderr.write(`Hinweis: unbekannte Modelle (Opus-Preis): ${[...unbekannt].join(', ')}\n`);
  return ausgabe;
}

const istHauptdatei = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (istHauptdatei) {
  main(process.argv.slice(2))
    .then((out) => console.log(out))
    .catch((err) => {
      process.stderr.write(`Fehler: ${err.message}\n`);
      process.exitCode = 1;
    });
}
