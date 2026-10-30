// Lesbarkeits- und Zeichenprüfung über die gerenderte Seite (Auftrag Abschnitt 7 „Schreibregeln“, Abschnitt 8 Alt-Texte).
// Aufruf:  node lesbarkeit.mjs --satz <name> (--hauptansichten | --seiten /a,/b | --alle) [--ziel DIR] [--probe]
//   --probe: lädt tests-logik/lesbarkeit-probe.html per setContent und verlangt genau die bekannten Befunde (Exit 0 nur dann).
//   Ausgabe: <ziel>/lesbarkeit.json (Werte und Fundstellen) und <ziel>/lesbarkeit.md (Tabelle je Seite).
//   Standard-Ziel: _werkstatt/belege/<satz>. Probe- und Rauchläufe nur mit --ziel "$SCRATCH/<Kennung>".
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import {
  BASE, ANSICHTEN, RELAUNCH, SCRATCH, WERKZEUGE, assertLocal, installSperre, setzeEinwilligung, bereit, ensureDir,
} from './lib.mjs';
import {
  saetze, woerter, fleschAusSaetzen, striche, bindestrichwoerter, floskeln, ausschnitt, escapeRe, rohOhneTrennhilfen,
} from './lesbarkeit-logik.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : d; };
const hat = (k) => process.argv.includes(`--${k}`);
const zeichen = (s) => [...String(s ?? '')].length;

const REGELN = path.join(RELAUNCH, 'regeln');
const floskelRegeln = JSON.parse(fs.readFileSync(path.join(REGELN, 'floskeln.json'), 'utf8'));
const erlaubt = JSON.parse(fs.readFileSync(path.join(REGELN, 'bindestrich-erlaubt.json'), 'utf8'));
const GLOSSAR = JSON.parse(fs.readFileSync(path.join(REGELN, 'glossar.json'), 'utf8')).eintraege;
const hauptansichten = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten;
const PROBE = path.join(WERKZEUGE, 'tests-logik', 'lesbarkeit-probe.html');

// Schwellen aus Auftrag Abschnitt 7 und 8.
const SCHWELLEN = {
  flesch: { erzaehl: 60, ort: 60, wissen: 50, arbeit: null },
  satzMittelMax: 14, satzMax: 25, absatzMax: 4, titelMax: 60, beschreibungMin: 120, beschreibungMax: 155, altMax: 125,
};
const BEZEICHNUNG = {
  flesch: 'Flesch', 'satz-mittel': 'Satzlänge Mittel', 'satz-lang': 'Satz über 25', 'absatz-lang': 'Absatz über 4',
  gedankenstrich: 'Gedankenstrich', bindestrich: 'Bindestrich', floskel: 'Floskel', 'glossar-offen': 'Glossar offen',
  titel: 'Titel', beschreibung: 'Beschreibung', alt: 'Alt-Text', 'fliesstext-fehlt': 'kein Fließtext', status: 'Status',
};

// Seitenart: HAUPTANSICHTEN zuerst, dann die Pfadregeln (Reihenfolge: Rechtstexte, Hauptansicht, Arbeit, Ort, Wissen, sonst erzählend).
const RECHTSTEXTE = ['/impressum', '/datenschutz', '/agb', '/widerruf', '/cookie-richtlinie', '/barrierefreiheit'];
const ARBEIT = ['/kontakt', '/termin', '/beratung', '/preise', '/downloads', '/login', '/bad/badanfrage', '/bad/badplaner', '/bad/projekt-check', '/fliesen/konfigurator', '/fliesen/festpreisangebot'];
const ORT = [/^\/standorte\/[^/]+$/, /^\/leistungen\/[^/]+\/[^/]+$/];
const WISSEN = [/^\/fliesen\//, /^\/untergrund-abdichtung/, /^\/naturstein/, /^\/treppen/, /^\/balkon-terrasse\//, /^\/blog\//, /^\/faq$/, /^\/foerderung$/];

export function seitenart(pfad) {
  const p = pfad.length > 1 ? pfad.replace(/\/$/, '') : pfad;
  if (RECHTSTEXTE.includes(p)) return 'ausgenommen';
  const haupt = hauptansichten.find((h) => h.pfad === p);
  if (haupt) return haupt.art;
  if (ARBEIT.includes(p)) return 'arbeit';
  if (ORT.some((r) => r.test(p))) return 'ort';
  if (WISSEN.some((r) => r.test(p))) return 'wissen';
  return 'erzaehl';
}

/** Liest die gerenderte Seite (sichtbarer Fließtext, Texte, Glossar-Auszeichnung). Keine Veränderung außer Lesen. */
async function extrahiere(page) {
  await page.addStyleTag({ content: '*, *::before, *::after { text-transform: none !important; } .spaet-zeichnen { content-visibility: visible !important; }' });
  return page.evaluate(() => {
    // Aufklappbares öffnen, damit Antworten im Text stehen (nur lesen).
    document.querySelectorAll('details').forEach((d) => d.setAttribute('open', ''));
    // header innerhalb von main ist Inhalt (Einstieg mit Vorspann), der Kopf der Website liegt außerhalb von main (E-032).
    const AUS = 'nav, footer, form, [data-zitat], blockquote, [aria-hidden="true"]';
    const sichtbar = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const main = document.querySelector('main');
    // Fließtext: sichtbare p und li in main ohne Ausnahmen; li, die ein p enthalten, zählen nicht (Text nur einmal).
    const fliess = main
      ? [...main.querySelectorAll('p, li, dd')].filter((el) => !el.closest(AUS) && !el.querySelector('p, li, dd') && sichtbar(el))
      : [];
    // Textknoten des Fließtexts mit Glossar-Auszeichnung (dfn[data-glossar]); Erklärungen gehören nicht zum Fließtext.
    const knoten = [];
    for (const el of fliess) {
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) {
        if (n.parentElement && n.parentElement.closest('[data-erklaert]')) continue;
        const dfn = n.parentElement ? n.parentElement.closest('dfn[data-glossar]') : null;
        knoten.push({ t: n.nodeValue, dfn: dfn ? dfn.getAttribute('data-glossar') : null });
      }
      knoten.push({ t: '\n', dfn: null });
    }
    // Sichtbarer Text der ganzen Seite ohne Zitate und Blockzitate (nur für die Messung, danach wieder hergestellt).
    const weg = [...document.querySelectorAll('[data-zitat], blockquote')];
    const alteStile = weg.map((e) => e.style.display);
    weg.forEach((e) => { e.style.display = 'none'; });
    const sichtbarText = document.body.innerText;
    weg.forEach((e, i) => { e.style.display = alteStile[i]; });
    const bilder = [...document.querySelectorAll('img')].filter((i) => !i.closest('[data-zitat], blockquote'));
    const alts = bilder.filter((i) => i.hasAttribute('alt')).map((i) => i.getAttribute('alt'));
    const norm = (t) => String(t ?? '').replace(/ /g, ' ').replace(/[ \t]+/g, ' ').trim();
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
      hatMain: !!main,
      fliess: fliess.map((el) => ({ tag: el.tagName.toLowerCase(), text: el.innerText })),
      knoten,
      sichtbar: sichtbarText,
      alts,
      ohneAlt: bilder.length - alts.length,
      arias: [...document.querySelectorAll('[aria-label]')].filter((e) => !e.closest('[data-zitat], blockquote')).map((e) => e.getAttribute('aria-label')),
      ueberschriften: [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].filter((h) => !h.closest('[data-zitat], blockquote')).map((h) => norm(h.textContent)),
      erklaerungen: [...document.querySelectorAll('[data-erklaert]')].map((e) => ({ id: e.getAttribute('data-erklaert'), text: norm(e.textContent) })),
    };
  });
}

/** Glossar: erstes Vorkommen jedes Begriffs im Fließtext; erfüllt nur mit dfn[data-glossar=id] und Erklärung ≤ 15 Wörter. */
export function glossarPruefen(knoten, eintraege, erklaerungen) {
  let text = '';
  const bereiche = [];
  for (const k of knoten) { bereiche.push({ start: text.length, ende: text.length + k.t.length, dfn: k.dfn }); text += k.t; }
  const gefunden = [];
  const erfuellt = [];
  const offen = [];
  for (const e of eintraege) {
    let erster = null;
    for (const b of e.begriffe) {
      // Wortgrenze; Flexionsendungen (Estriche, barrierefreies) zählen als dasselbe Wort.
      const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(b).replace(/ /g, '\\s+')}(?:e|en|er|em|es|n|s)?(?![\\p{L}\\p{N}])`, 'iu');
      const m = re.exec(text);
      if (m && (erster === null || m.index < erster.index)) erster = { index: m.index, begriff: m[0] };
    }
    if (!erster) continue;
    gefunden.push(e.id);
    const bereich = bereiche.find((b) => erster.index >= b.start && erster.index < b.ende);
    const erklaerung = erklaerungen.find((x) => x.id === e.id);
    const anzahl = erklaerung ? woerter(erklaerung.text).length : null;
    const dfnOk = bereich?.dfn === e.id;
    if (dfnOk && erklaerung && anzahl <= 15) { erfuellt.push(e.id); continue; }
    offen.push({
      id: e.id,
      begriff: erster.begriff,
      grund: !dfnOk ? 'nicht als dfn[data-glossar] ausgezeichnet' : !erklaerung ? 'keine Erklärung [data-erklaert]' : `Erklärung hat ${anzahl} Wörter (höchstens 15)`,
      ausschnitt: ausschnitt(text, erster.index, erster.begriff.length),
    });
  }
  return { gefunden: gefunden.length, erfuellt, offen };
}

/** Bewertet eine ausgelesene Seite nach den Regeln je Seitenart. */
export function bewerte(roh, art, { pfad = '', status = null } = {}) {
  if (art === 'ausgenommen') {
    return { pfad, art, status, ausgenommen: true, gruen: null, ergebnis: 'AUSGENOMMEN (Rechtstext)', befunde: [] };
  }
  // Weiche Trennzeichen aus mitFugen sind keine Wortgrenze; gezählt und gesucht wird der Text, wie man ihn liest.
  roh = rohOhneTrennhilfen(roh);
  const befunde = [];
  const befund = (regel, detail, extra = {}) => befunde.push({ regel, detail, ...extra });
  const teile = roh.fliess.map((el) => ({ tag: el.tag, saetze: saetze(el.text) }));
  const satzTexte = teile.flatMap((t) => t.saetze);
  const satzInfo = satzTexte.map((s) => ({ text: s, n: woerter(s).length })).filter((s) => s.n > 0);
  const flesch = fleschAusSaetzen(satzTexte);
  const satzMittel = satzInfo.length ? satzInfo.reduce((a, s) => a + s.n, 0) / satzInfo.length : null;
  const satzMax = satzInfo.length ? Math.max(...satzInfo.map((s) => s.n)) : null;
  const absaetzeMehr = teile.filter((t) => t.tag === 'p' && t.saetze.length > SCHWELLEN.absatzMax).length;

  if (!satzInfo.length) befund('fliesstext-fehlt', roh.hatMain ? 'main hat keinen sichtbaren Fließtext' : 'kein main-Element');
  const grenze = SCHWELLEN.flesch[art];
  if (grenze != null && flesch != null && flesch < grenze) befund('flesch', `${flesch} (mindestens ${grenze})`);
  if (grenze != null && satzMittel != null && satzMittel > SCHWELLEN.satzMittelMax) befund('satz-mittel', `${satzMittel.toFixed(1)} Wörter (höchstens 14)`);
  for (const s of satzInfo.filter((x) => x.n > SCHWELLEN.satzMax)) befund('satz-lang', `${s.n} Wörter (höchstens 25)`, { ausschnitt: s.text.slice(0, 120) });
  for (const t of teile.filter((x) => x.tag === 'p' && x.saetze.length > SCHWELLEN.absatzMax)) {
    befund('absatz-lang', `${t.saetze.length} Sätze (höchstens 4)`, { ausschnitt: t.saetze[0].slice(0, 120) });
  }

  // Zeichenregeln über alle sichtbaren und Metatexte; Alt-Texte getrennt für die Länge.
  const quellen = [
    { q: 'sichtbarer Text', t: roh.sichtbar },
    { q: 'Seitentitel', t: roh.title },
    { q: 'Beschreibung', t: roh.description ?? '' },
    ...roh.arias.map((t) => ({ q: 'aria-label', t: t ?? '' })),
  ];
  const alle = [...quellen, ...roh.alts.map((t) => ({ q: 'Alt-Text', t: t ?? '' }))];
  for (const { q, t } of alle) {
    for (const s of striche(t)) befund('gedankenstrich', `${s.zeichen} in ${q}`, { ausschnitt: s.ausschnitt });
    for (const b of bindestrichwoerter(t, erlaubt)) befund('bindestrich', `${b.wort} in ${q}`, { ausschnitt: b.ausschnitt });
  }
  for (const { q, t } of quellen) {
    for (const f of floskeln(t, floskelRegeln)) befund('floskel', `„${f.treffer}“ in ${q}`, { ausschnitt: f.ausschnitt });
  }
  for (const f of floskeln('', floskelRegeln, { ueberschriften: roh.ueberschriften })) {
    befund('floskel', `„${f.treffer}“ in Überschrift`, { ausschnitt: f.gefunden });
  }

  const titelLaenge = zeichen(roh.title);
  if (!roh.title) befund('titel', 'fehlt');
  else if (titelLaenge > SCHWELLEN.titelMax) befund('titel', `${titelLaenge} Zeichen (höchstens 60)`);
  const beschrLaenge = roh.description == null ? null : zeichen(roh.description);
  if (beschrLaenge == null) befund('beschreibung', 'fehlt');
  else if (beschrLaenge < SCHWELLEN.beschreibungMin || beschrLaenge > SCHWELLEN.beschreibungMax) befund('beschreibung', `${beschrLaenge} Zeichen (120 bis 155)`);
  for (const a of roh.alts) {
    if (a != null && zeichen(a) > SCHWELLEN.altMax) befund('alt', `${zeichen(a)} Zeichen (höchstens 125)`, { ausschnitt: a.slice(0, 80) });
  }
  if (status !== null && status !== 200) befund('status', `HTTP ${status}`);

  const gl = glossarPruefen(roh.knoten, GLOSSAR, roh.erklaerungen);
  for (const o of gl.offen) befund('glossar-offen', `${o.begriff}: ${o.grund}`, { ausschnitt: o.ausschnitt });

  const zaehlung = {};
  for (const b of befunde) zaehlung[b.regel] = (zaehlung[b.regel] ?? 0) + 1;
  const grund = Object.entries(zaehlung).map(([r, n]) => `${BEZEICHNUNG[r] ?? r} ${n}`).join(', ');
  return {
    pfad,
    art,
    status,
    ausgenommen: false,
    flesch,
    satzMittel: satzMittel == null ? null : Math.round(satzMittel * 10) / 10,
    satzMax,
    satzAnzahl: satzInfo.length,
    absaetze: teile.filter((t) => t.tag === 'p').length,
    absaetzeMehr,
    titel: { zeichen: titelLaenge },
    beschreibung: { zeichen: beschrLaenge },
    alt: { anzahl: roh.alts.length, ohneAlt: roh.ohneAlt, zuLang: roh.alts.filter((a) => a != null && zeichen(a) > SCHWELLEN.altMax).length },
    zaehlung,
    glossar: { gefunden: gl.gefunden, erfuellt: gl.erfuellt, offen: gl.offen },
    gruen: befunde.length === 0,
    ergebnis: befunde.length === 0 ? 'GRÜN' : `ROT: ${grund}`,
    befunde,
  };
}

function zeile(e) {
  if (e.ausgenommen) return `| ${e.pfad} | ausgenommen | – | – | – | – | – | – | – | – | – | – | – | ${e.ergebnis} |`;
  const z = e.zaehlung;
  const alt = e.alt.zuLang ? `ROT ${e.alt.zuLang} zu lang` : (e.alt.anzahl ? 'ok' : '–');
  const titel = e.titel.zeichen ? `${e.titel.zeichen}${e.titel.zeichen > SCHWELLEN.titelMax ? ' ROT' : ''}` : 'fehlt';
  const beschr = e.beschreibung.zeichen == null ? 'fehlt' : `${e.beschreibung.zeichen}${(e.beschreibung.zeichen < 120 || e.beschreibung.zeichen > 155) ? ' ROT' : ''}`;
  return `| ${e.pfad} | ${e.art} | ${e.flesch ?? '–'} | ${e.satzMittel ?? '–'} | ${e.satzMax ?? '–'} | ${e.absaetzeMehr} | ${z.gedankenstrich ?? 0} | ${z.bindestrich ?? 0} | ${z.floskel ?? 0} | ${e.glossar.offen.length} | ${titel} | ${beschr} | ${alt} | ${e.ergebnis} |`;
}

function markdown(satz, seiten, zeitpunkt) {
  const kopf = [
    `# Lesbarkeit · ${satz}`,
    '',
    `Stand ${zeitpunkt} · Basis ${BASE} · Regeln: floskeln.json, bindestrich-erlaubt.json, glossar.json (K-010, K-011)`,
    '',
    `Schwellen: Flesch erzählend und Ort mindestens 60, Wissen mindestens 50, Arbeit ohne Flesch; Satzlänge Mittel höchstens 14 (außer Arbeit); kein Satz über 25 Wörter; Absätze höchstens 4 Sätze; keine Gedankenstriche; keine nicht erlaubten Bindestrichwörter; keine Floskeln; kein Glossarbegriff ohne Erklärung; Titel höchstens 60 Zeichen; Beschreibung 120 bis 155; Alt-Texte höchstens 125 Zeichen.`,
    '',
    '| Seite | Art | Flesch | Satz Ø | Satz max | Absätze > 4 | Striche | Bindestrich | Floskeln | Glossar offen | Titel | Beschreibung | Alt | Ergebnis |',
    '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|',
  ];
  return [...kopf, ...seiten.map(zeile), ''].join('\n');
}

async function seiteLesen(browser, pfad) {
  const art = seitenart(pfad);
  const protokoll = [];
  const v = ANSICHTEN.d1440;
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: false, hasTouch: false, reducedMotion: 'reduce', locale: 'de-DE', timezoneId: 'Europe/Berlin' });
  try {
    await installSperre(context, { protokoll });
    await setzeEinwilligung(context, 'abgelehnt', BASE);
    const page = await context.newPage();
    const resp = await page.goto(BASE + pfad, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    const roh = await extrahiere(page);
    const e = bewerte(roh, art, { pfad, status: resp?.status() ?? null });
    e.gesperrt = protokoll.length;
    e.gesperrtArten = [...new Set(protokoll.map((p) => p.art))];
    return e;
  } finally {
    await context.close();
  }
}

async function probe() {
  const html = fs.readFileSync(PROBE, 'utf8');
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
  let roh;
  try {
    const context = await browser.newContext({ viewport: { width: ANSICHTEN.d1440.width, height: ANSICHTEN.d1440.height }, locale: 'de-DE', timezoneId: 'Europe/Berlin' });
    await installSperre(context);
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    roh = await extrahiere(page);
    await context.close();
  } finally {
    await browser.close();
  }
  const e = bewerte(roh, 'erzaehl', { pfad: 'probe' });
  // Erwartet: genau die bekannten Verstöße aus der Probe; das Zitat mit Gedankenstrich zählt nicht; der Glossarbegriff mit Erklärung ist erfüllt.
  // satz-lang 2: einer im Fließtext, einer im Vorspann innerhalb von <header> in main (E-032)
  const erwartet = { gedankenstrich: 2, bindestrich: 1, floskel: 1, 'satz-lang': 2, 'absatz-lang': 1, 'glossar-offen': 1 };
  const gezaehlt = e.zaehlung;
  const abweichungen = [...new Set([...Object.keys(erwartet), ...Object.keys(gezaehlt)])]
    .filter((k) => (gezaehlt[k] ?? 0) !== (erwartet[k] ?? 0))
    .map((k) => ({ regel: k, erwartet: erwartet[k] ?? 0, gefunden: gezaehlt[k] ?? 0 }));
  const erfuelltOk = e.glossar.erfuellt.length === 1 && e.glossar.erfuellt[0] === 'din-18534';
  if (!erfuelltOk) abweichungen.push({ regel: 'glossar-erfuellt', erwartet: ['din-18534'], gefunden: e.glossar.erfuellt });
  const ok = abweichungen.length === 0;
  const ziel = ensureDir(path.resolve(arg('ziel', path.join(SCRATCH, 'E0-PRUEF-02b', 'probe'))));
  const bericht = { modus: 'probe', erwartet, erfuellt_erwartet: ['din-18534'], ok, abweichungen, seite: e };
  fs.writeFileSync(path.join(ziel, 'lesbarkeit.json'), JSON.stringify(bericht, null, 1));
  fs.writeFileSync(path.join(ziel, 'lesbarkeit.md'), markdown('probe', [e], new Date().toISOString()));
  for (const b of e.befunde) console.log(`${b.regel}\t${b.detail}\t${b.ausschnitt ?? ''}`);
  console.log(`Flesch ${e.flesch} · Satz Ø ${e.satzMittel} · Glossar erfüllt ${e.glossar.erfuellt.join(',') || '-'}`);
  console.log(ok ? 'PROBE OK: genau die bekannten Befunde gemeldet' : `PROBE FEHLGESCHLAGEN: ${JSON.stringify(abweichungen)}`);
  console.log(`Ziel ${ziel}`);
  process.exitCode = ok ? 0 : 1;
}

async function main() {
  assertLocal(BASE);
  if (hat('probe')) return probe();
  const satz = arg('satz', null);
  if (!satz || !(hat('hauptansichten') || arg('seiten', null) || hat('alle'))) {
    console.error('Aufruf: node lesbarkeit.mjs --satz <name> (--hauptansichten | --seiten /a,/b | --alle) [--ziel DIR] [--probe]');
    process.exitCode = 2;
    return;
  }
  let seiten;
  if (hat('hauptansichten')) seiten = hauptansichten.map((h) => h.pfad);
  else if (arg('seiten', null)) seiten = arg('seiten').split(',').map((s) => s.trim()).filter(Boolean);
  else {
    const xml = await (await fetch(BASE + '/sitemap.xml')).text();
    seiten = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/(.)\/$/, '$1')))].sort();
  }
  const ziel = ensureDir(arg('ziel', null) ? path.resolve(arg('ziel')) : path.join(RELAUNCH, 'belege', satz));
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
  const seitenErgebnisse = [];
  try {
    for (const pfad of seiten) {
      seitenErgebnisse.push(await seiteLesen(browser, pfad));
      process.stdout.write('.');
    }
  } finally {
    await browser.close();
  }
  const zeitpunkt = new Date().toISOString();
  const zusammen = {};
  for (const e of seitenErgebnisse) for (const [r, n] of Object.entries(e.zaehlung ?? {})) zusammen[r] = (zusammen[r] ?? 0) + n;
  const bericht = {
    satz,
    base: BASE,
    erstellt: zeitpunkt,
    schwellen: SCHWELLEN,
    zusammenfassung: {
      seiten: seitenErgebnisse.length,
      gruen: seitenErgebnisse.filter((e) => e.gruen === true).length,
      rot: seitenErgebnisse.filter((e) => e.gruen === false).length,
      ausgenommen: seitenErgebnisse.filter((e) => e.ausgenommen).length,
      befunde: zusammen,
    },
    seiten: seitenErgebnisse,
  };
  fs.writeFileSync(path.join(ziel, 'lesbarkeit.json'), JSON.stringify(bericht, null, 1));
  fs.writeFileSync(path.join(ziel, 'lesbarkeit.md'), markdown(satz, seitenErgebnisse, zeitpunkt));
  console.log(`\nSeiten ${seitenErgebnisse.length} · GRÜN ${bericht.zusammenfassung.gruen} · ROT ${bericht.zusammenfassung.rot} · ausgenommen ${bericht.zusammenfassung.ausgenommen} · Ziel ${ziel}`);
}

// Nur ausführen, wenn direkt aufgerufen (die Logik-Funktionen bleiben importierbar).
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  main().catch((err) => { console.error(err.stack || err.message); process.exitCode = 1; });
}
