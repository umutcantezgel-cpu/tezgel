// Lesbarkeit, reine Logik (ohne Browser, exportiert). Genutzt von lesbarkeit.mjs und von tests-logik/lesbarkeit.test.mjs.
// Die Regeln (Floskeln, Bindestrichwörter, Glossar) liest der Aufrufer aus _werkstatt/regeln/*.json; diese Datei liest nichts.

const VOKAL = new Set([...'aeiouäöüy']);
// Zwei Vokale zählen als eine Silbe: ie, ei, ai, ey, au, eu, äu, aa, ee, oo und jeder Doppelvokal (aa, ee, oo ...).
const ZUSAMMEN = new Set(['ie', 'ei', 'ai', 'ey', 'au', 'eu', 'äu', 'aa', 'ee', 'oo']);

/** Deutsche Silbenzahl per Vokalgruppen; mindestens 1. Zeichen ohne Vokal trennen die Gruppen. */
export function silben(wort) {
  let gruppen = 0;
  let vorher = null;
  for (const z of [...String(wort ?? '').toLowerCase()]) {
    if (!VOKAL.has(z)) { vorher = null; continue; }
    const fortsetzung = vorher !== null && (vorher === z || ZUSAMMEN.has(vorher + z));
    if (!fortsetzung) gruppen += 1;
    vorher = z;
  }
  return Math.max(1, gruppen);
}

// Abkürzungen, nach denen nicht getrennt wird (Liste aus dem Auftrag). Ihre Punkte werden vor der Trennung maskiert.
const ABKUERZUNGEN = ['z. B.', 'u. a.', 'd. h.', 'ca.', 'bzw.', 'ggf.', 'inkl.', 'Nr.', 'Str.', 'Tel.', 'Dr.', 'St.', 'evtl.', 'usw.', 'zzgl.'];
const ABK_RE = new RegExp(`(?<!\\p{L})(?:${ABKUERZUNGEN.map((a) => escapeRe(a).replace(/ /g, '\\s?')).join('|')})`, 'giu');
const MASKE = '\u0001';
// Satzende: Punkt (nicht direkt nach einer Ziffer, also keine Ordinalzahl „23. Oktober“ und keine Zahl wie „1.200“),
// ! oder ?, optional schließende Anführungszeichen, dann Leerraum und Großbuchstabe oder Textende.
const SATZENDE_RE = /(?:(?<!\d)\.+|[!?]+)[”“"’')\]»]*(?=\s+[A-ZÄÖÜ]|\s*$)/gu;

/** Sätze eines Textes. Keine Trennung nach Abkürzungen und in Zahlen. */
export function saetze(text) {
  const t = String(text ?? '').replace(ABK_RE, (m) => m.replace(/\./g, MASKE));
  const grenzen = [...t.matchAll(SATZENDE_RE)].map((m) => m.index + m[0].length);
  const teile = [];
  let start = 0;
  for (const g of grenzen) { teile.push(t.slice(start, g)); start = g; }
  teile.push(t.slice(start));
  return teile
    .map((s) => s.split(MASKE).join('.').trim())
    .filter((s) => /[\p{L}\p{N}]/u.test(s));
}

// Unsichtbare Trennhilfen: weiches Trennzeichen U+00AD (mitFugen in src/components/kern/zusammen.tsx), Nullbreitenleerzeichen
// U+200B und Wortverbinder U+2060. Sie trennen kein Wort (Unicode UAX #29, Regel WB4) und werden vor jeder Zählung und Suche entfernt.
const TRENNHILFEN_RE = /[­​⁠]/g;

/** Text ohne unsichtbare Trennhilfen, so wie man ihn liest. */
export function ohneTrennhilfen(text) {
  return String(text ?? '').replace(TRENNHILFEN_RE, '');
}

/** Ausgelesene Seite (lesbarkeit.mjs) ohne unsichtbare Trennhilfen in allen Textfeldern. */
export function rohOhneTrennhilfen(roh) {
  const o = (t) => (t == null ? t : ohneTrennhilfen(t));
  return {
    ...roh,
    title: o(roh.title),
    description: o(roh.description),
    fliess: roh.fliess.map((el) => ({ ...el, text: o(el.text) })),
    knoten: roh.knoten.map((k) => ({ ...k, t: o(k.t) })),
    sichtbar: o(roh.sichtbar),
    alts: roh.alts.map(o),
    arias: roh.arias.map(o),
    ueberschriften: roh.ueberschriften.map(o),
    erklaerungen: roh.erklaerungen.map((e) => ({ ...e, text: o(e.text) })),
  };
}

// Wort: Zahl mit Trennzeichen (1.200, 7:30, 2,5) oder Buchstaben-/Ziffernfolge mit Bindestrichen (Vor-Ort-Aufmaß, 2026-10-23).
const WORT_RE = /\p{N}+(?:[.,:]\p{N}+)+|[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu;

/** Wörter eines Satzes ohne Satzzeichen; Zahlen zählen als Wort. */
export function woerter(satz) {
  return [...String(satz ?? '').matchAll(WORT_RE)].map((m) => m[0]);
}

/** Flesch nach Amstad aus einer Liste von Sätzen: 180 − mittlere Satzlänge − 58,5 × mittlere Silben je Wort, eine Stelle. */
export function fleschAusSaetzen(liste) {
  const listen = liste.map((s) => woerter(s)).filter((w) => w.length > 0);
  const alle = listen.flat();
  if (!alle.length) return null;
  const satzMittel = alle.length / listen.length;
  const silbenJeWort = alle.reduce((n, w) => n + silben(w), 0) / alle.length;
  return Math.round((180 - satzMittel - 58.5 * silbenJeWort) * 10) / 10;
}

/** Flesch nach Amstad für einen Text (Satztrennung wie saetze). */
export function flesch(text) {
  return fleschAusSaetzen(saetze(text));
}

/** Ausschnitt rund um eine Fundstelle (30 Zeichen links und rechts, Leerraum verdichtet). */
export function ausschnitt(t, index, laenge) {
  return String(t).slice(Math.max(0, index - 30), index + laenge + 30).replace(/\s+/g, ' ').trim();
}

/** Gedankenstriche: – und — überall, ' - ' (Leerzeichen davor und danach). Liefert Fundstellen mit Ausschnitt. */
export function striche(text) {
  const t = String(text ?? '');
  return [...t.matchAll(/[–—]|(?<=\s)-(?=\s)/g)].map((m) => ({
    zeichen: m[0],
    index: m.index,
    ausschnitt: ausschnitt(t, m.index, m[0].length),
  }));
}

// Ausgenommen von der Bindestrich-Prüfung: URLs, E-Mail-Adressen, Telefonnummern, Datumsangaben, Postleitzahlen.
const AUSNAHMEN = [
  /(?:https?:\/\/|www\.)\S*/gi,
  /[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+/gu,
  /[\p{L}\p{N}-]+\.(?:de|com|net|org|eu|info|shop)(?:\/\S*)?/giu,
  /(?<![\p{L}\p{N}])\/\S*/gu,
  /\b\d{1,4}-\d{1,2}-\d{1,4}\b/g,
  /\+?\d[\d\s()/-]{6,}\d/g,
  /\b\d{5}-\p{L}+/gu,
  /(?<![\p{L}\p{N}])\p{L}{1,2}-\d{4,5}\b/gu,
];

/** Erlaubtliste aus einem Array (Strings oder {wort}) oder aus dem JSON-Objekt der Regeldatei. */
function erlaubnisse(erlaubt) {
  if (Array.isArray(erlaubt)) {
    return { woerter: new Set(erlaubt.map((e) => String(typeof e === 'string' ? e : e.wort).toLowerCase())), praefixe: [] };
  }
  const woerterListe = (erlaubt?.woerter ?? []).map((e) => String(typeof e === 'string' ? e : e.wort).toLowerCase());
  const praefixe = (erlaubt?.praefixe_mit_bindestrich_erlaubt ?? []).map((p) => String(p).toLowerCase());
  return { woerter: new Set(woerterListe), praefixe };
}

/** Wörter mit Bindestrich zwischen Buchstaben oder Ziffern, die nicht erlaubt sind (Groß und klein egal, Präfixe zählen). */
export function bindestrichwoerter(text, erlaubt) {
  const t = String(text ?? '');
  const { woerter: erlaubteWoerter, praefixe } = erlaubnisse(erlaubt);
  let maskiert = t;
  for (const re of AUSNAHMEN) maskiert = maskiert.replace(re, (m) => ' '.repeat(m.length));
  const treffer = [];
  for (const m of maskiert.matchAll(/[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+/gu)) {
    const klein = m[0].toLowerCase();
    if (erlaubteWoerter.has(klein) || praefixe.some((p) => klein.startsWith(p))) continue;
    treffer.push({ wort: m[0], index: m.index, ausschnitt: ausschnitt(t, m.index, m[0].length) });
  }
  return treffer;
}

/** Regex-Escape ohne Bindestrich (im u-Modus ist \- außerhalb von Klassen ungültig). */
export function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

/**
 * Floskeln: Wörter als ganze Wörter (Wortgrenze, Groß und klein egal; „nahtloser“ trifft „nahtlos“ nicht).
 * Muster aus regeln.muster; Muster mit nur_ueberschriften nur auf optionen.ueberschriften.
 */
export function floskeln(text, regeln, optionen = {}) {
  const t = String(text ?? '');
  const treffer = [];
  for (const wort of regeln?.woerter ?? []) {
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(wort).replace(/ /g, '\\s+')}(?![\\p{L}\\p{N}])`, 'giu');
    for (const m of t.matchAll(re)) {
      treffer.push({ art: 'wort', treffer: wort, gefunden: m[0], index: m.index, ausschnitt: ausschnitt(t, m.index, m[0].length) });
    }
  }
  for (const muster of regeln?.muster ?? []) {
    // Muster mit Großbuchstaben-Klassen (Stakkato) sind absichtlich groß-/kleinschreibungsabhängig, alle anderen nicht.
    const flags = /\[A-ZÄÖÜ\]/.test(muster.regex) ? 'gu' : 'giu';
    const re = new RegExp(muster.regex, flags);
    const quellen = muster.nur_ueberschriften ? (optionen.ueberschriften ?? []) : [t];
    for (const q of quellen) {
      const s = String(q);
      for (const m of s.matchAll(re)) {
        treffer.push({ art: 'muster', treffer: muster.name, gefunden: m[0], index: m.index, ausschnitt: ausschnitt(s, m.index, m[0].length) });
      }
    }
  }
  return treffer;
}
