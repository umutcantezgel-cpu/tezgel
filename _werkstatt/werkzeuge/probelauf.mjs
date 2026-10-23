// probelauf.mjs · Fernsteuerung für den Probeläufer (Kriterium Z-04 „Besucheraufgaben“) · P3-00g
//
// Zweck: Ein Probeläufer-Agent löst die fünf Besucheraufgaben (KERN K-002, Protokoll _relaunch/PROBELAUF.md)
//   wie ein Besucher Schritt für Schritt – mobil mit Touch, am Desktop mit Maus oder Tastatur. Das Werkzeug
//   führt eine Schrittfolge aus einer JSON-Datei aus, zählt die Besucherhandlungen nach den Zählregeln,
//   prüft den objektiven Zielzustand der Aufgabe und legt je Schritt Bildschirmfoto, Aria-Auszug, URL und
//   Fokus ab. Es misst nur – es ändert nie das Produkt (kein Sonderweg im Produkt, G7).
//
// Nutzung:
//   node probelauf.mjs <lauf.json> [--satz <name>] [--lauf <name>] [--ansicht m375|d1440] [--eingabe touch|maus|tastatur]
//                      [--still] [--stoer-css "<css>"] [--echte-zeit]
//   node probelauf.mjs --aufgaben                 # die fünf Besucher-Aufträge (ohne Zielzustände)
//   node probelauf.mjs --matrix --satz <name> [--beleg]   # Übersicht aller Läufe eines Satzes (Aufgabe × Modus);
//                                                 # --beleg schreibt sie zusätzlich nach belege/<satz>/probelauf.json
//   Lauf-Datei: { "aufgabe": 4, "start": "/", "ansicht": "m375", "eingabe": "touch", "antwort": "…",
//                 "befunde": [{"schwere": "mittel", "schritt": 3, "text": "…"}], "gegenprobe": false,
//                 "schritte": [ {"tippe": "Standorte"}, {"taste": "Tab", "bis": "Butzbach"}, … ] }
//   Schrittarten: tippe (Name/Text; optional nr, in) · taste (optional mal, bis, max) · fuelle {feld?, text} ·
//                 waehle {feld?, option} · scrolle "unten"|"oben"|"ende"|"anfang"|<px> · wische "links"|"rechts" + an "<Text>"
//                 (waagerechte Leiste) · warte_auf "<Text>" · zurueck
//   Tastatur-Modus: tippe, scrolle und wische sind verboten; fuelle/waehle wirken nur auf das fokussierte Feld.
//
// Messbedingungen (stehen in jeder lauf.json unter „bedingungen“): Chromium (Playwright 1.56.1), Ansicht aus
//   lib.mjs ANSICHTEN (DPR 1), Einwilligung „erstbesuch“ (Banner gehört zur Wirklichkeit des Besuchers),
//   installSperre (Formulare gehen nur an die Attrappe, Fremd-Hosts 204), reducedMotion „no-preference“,
//   locale de-DE, Zeitzone Europe/Berlin, feste Uhrzeit FESTE_ZEIT (abschaltbar mit --echte-zeit).
//   Jeder Lauf beginnt in einem frischen Browser-Kontext am Startpfad (zustandslos, reproduzierbar).
//   Warten ausschließlich über Zustandsabfragen mit Obergrenze (Netz ruhig 400 ms, DOM ruhig 250 ms,
//   endliche Animationen fertig, Schriften geladen; Abfragen per Zeitgeber, weil Bildwechsel unter Last stocken);
//   Einwilligungsbanner: Warten auf Erscheinen, Obergrenze 8 s; Bedienbarkeitsprüfung je Handlung bis 30 s.
//
// Ausgabe: _werkstatt/cache/probelauf/<satz>/<lauf>/ oder --ziel <ordner>/<satz>/<lauf>/ (NN-<art>.jpg, NN-aria.txt, NN-sichtbar.txt, lauf.json,
//   eingabe.json); Kopf von lauf.json: { satz, base, bedingungen, erstellt }. Konsole: kompakte Schrittliste,
//   Zielprüfung, Bedienelemente im letzten Bild.
//   Exit-Code 0 = alle Schritte ausgeführt, 2 = Abbruch an einem Schritt (Grund + Kandidatenliste), 1 = Bedienfehler.
//
// Bezug: Z-04 (ABNAHME.md) – alle 5 Aufgaben lösbar, Schrittzahl ≤ Ausgangsstand, 0 Befunde „hoch“.
//
// E0-PRUEF-02d (Kopie der Vorlage mit Anpassungen, Stand 23.10.2026):
//   · Aufgaben A1–A6 nach AUFTRAG §6, Personen P1–P5 über "person" in der Lauf-Datei (Ort, Standardgerät, Systemschrift).
//   · Lauf-Datei-Zusatz: "person": "P1", "antwort": "…" (Antwort wird mit dem letzten Schritt abgegeben).
//   · Option --schrift 200: Systemschrift als Näherung über html font-size (Init-Skript, jede Navigation).
//   · Option --ziel <ordner>: Ausgabewurzel (Standard _werkstatt/cache/probelauf), z. B. $SCRATCH/<Kennung>.
//   · Telefon/WhatsApp: Init-Skript fängt Klicks auf tel:, whatsapp:, wa.me, api.whatsapp.com ab (preventDefault),
//     protokolliert als kontakt_angetippt (Attrappe), ruft nichts auf (G5).
//   · tippe {"nr": n} tippt Element Nr. n der nummerierten Bedienliste im Bild (vor diesem Schritt).
//   · Absendeknopf: tippe auf submit-Knopf wird verweigert (Schritt zählt nicht, Abbruch).
//   · Zielprüfung A3 „formular“: Pflichtfelder checkValidity() gültig, Absendeknopf im Ausschnitt.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, FESTE_ZEIT, installSperre, setzeEinwilligung, bereit, ensureDir, RELAUNCH } from './lib.mjs';

const WERKZEUG_VERSION = '1.1-E0-PRUEF-02d';
const AKTION_TIMEOUT = 30000; // Bedienbarkeitsprüfung je Handlung (Playwright: sichtbar, stabil, frei, aktiv)
const WARTE_TIMEOUT = 10000;
const MAX_BIS = 250;
const BANNER_TIMEOUT = 8000;

// ---------------------------------------------------------------------------------------------------------
// Die fünf Besucheraufgaben (wortgleich mit PROBELAUF.md) und ihre objektiven Zielzustände.
// Bedingungsarten: seite (Pfad/H1 der aktuellen Seite) · gesehen (Text im sichtbaren Ausschnitt, nicht verdeckt)
//   · anfrage (POST /api/anfrage von der Attrappe angenommen) · eines (mindestens eine der Unterbedingungen).
// ---------------------------------------------------------------------------------------------------------
// E0-PRUEF-02d: A1–A6 nach AUFTRAG §6 (Wortlaut des Auftrags als Kurzform) und den Zielzuständen des Briefings.
//   Bedingungsarten zusätzlich: kontakt (Kontaktlink angetippt, Attrappe) · formular (A3) · fotos (min. Anzahl
//   Fotos in main, natürliche Breite ≥ 300 px, im Bild gesehen) · antwort (Regex auf "antwort"; wird erst mit dem
//   letzten Schritt geprüft, weil die Antwort am Ende steht; min_zeichen).
export const AUFGABEN = {
  1: {
    titel: 'Sagen, was der Betrieb macht und wo',
    auftrag: 'Sagen Sie in einem Satz, was dieser Betrieb macht und wo er arbeitet.',
    ziel: [{ name: 'Antwort nennt eine Leistung und einen Ort', art: 'antwort', text: /fliese|bad|boden|balkon|terrasse|dusche/i, und: /aßlar|wetzlar|mittelhessen|lahn-dill|hessen/i }],
  },
  2: {
    titel: 'Telefon oder WhatsApp finden',
    auftrag: 'Finden Sie heraus, wie Sie den Betrieb anrufen oder ihm per WhatsApp schreiben können.',
    ziel: [{
      name: 'Telefon- oder WhatsApp-Link angetippt (Attrappe) oder Nummer im Bild gesehen', art: 'eines', von: [
        { name: 'Kontaktlink angetippt (Attrappe)', art: 'kontakt' },
        { name: 'Telefonnummer im Bild', art: 'gesehen', text: /(\+49[\s()\d\/-]{6,}|\b0\d{2,5}[\s\/-]{0,4}\d{2,}(?:[\s\/-]{0,4}\d{2,})*)/ }, // „06441 / 44 83 567“, nicht „01.10.2026“
      ],
    }],
  },
  3: {
    titel: 'Termin vor Ort anfragen, bis vor den Absendeknopf',
    auftrag: 'Fordern Sie einen Termin vor Ort an. Füllen Sie das Formular bis vor den Absendeknopf aus.',
    ziel: [{ name: 'Formular: Pflichtfelder gültig, Absendeknopf im Bild', art: 'formular' }],
  },
  4: {
    titel: 'Bilder fertiger Arbeiten zur eigenen Lage finden',
    auftrag: 'Finden Sie Bilder fertiger Arbeiten, die zu Ihrer eigenen Lage passen. Beschreiben Sie, was darauf zu sehen ist.',
    ziel: [
      { name: 'Mindestens zwei Fotos fertiger Arbeiten im Bild gesehen', art: 'fotos', min: 2 },
      { name: 'Antwort beschreibt, was auf den Fotos zu sehen ist', art: 'antwort', min_zeichen: 15 },
    ],
  },
  5: {
    titel: 'Ablauf und Kosten des Termins verstehen',
    auftrag: 'Finden Sie heraus, wie der Ablauf aussieht und ob der Termin vor Ort etwas kostet.',
    ziel: [
      { name: 'Text zu den Kosten des Termins im Bild gesehen', art: 'gesehen', text: /kosten(los|frei)|0 ?€|unverbindlich/i },
      { name: 'Antwort nennt den Ablauf', art: 'antwort', text: /ablauf|schritt|zuerst|danach|anschließend|dann/i },
    ],
  },
  6: {
    titel: 'Ob der Betrieb im eigenen Ort arbeitet',
    auftrag: 'Finden Sie heraus, ob der Betrieb auch in Ihrem Ort arbeitet.',
    ziel: [], // Ortsname kommt aus der Person (zielFuer)
  },
};

// E0-PRUEF-02d: die sechs Personen aus AUFTRAG §6. "geraet" = Standardgerät, "schrift" = Systemschrift in Prozent.
export const PERSONEN = {
  P1: { titel: 'Rentnerin, 72, will die Wanne gegen eine bodengleiche Dusche tauschen, Handy mit großer Systemschrift', ort: 'Solms', geraet: 'm390', schrift: 200 },
  P2: { titel: 'Junge Familie im Neubau, ganzes Haus fliesen, Tablet', ort: 'Gießen', geraet: 't768' },
  P3: { titel: 'Vermieter, einzelne gesprungene Fliese und alte Fugen im Flur, Handy', ort: 'Herborn', geraet: 'm360' },
  P4: { titel: 'Hausbesitzer, auf dessen Balkon Wasser steht, Laptop', ort: 'Braunfels', geraet: 'd1280' },
  P5: { titel: 'Kunde, Deutsch ist Zweitsprache, will einfach einen Termin, Handy', ort: 'Limburg', geraet: 'm390' },
};

// Aufgabe mit den Zielen der Person (A6 braucht den Ort). Gibt null bei unbekannter Aufgabe zurück.
function zielFuer(n, person) {
  const a = AUFGABEN[n];
  if (!a) return null;
  if (n !== 6) return a;
  const ort = person.ort.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return { ...a, ziel: [
    { name: `Ortsname der Person (${person.ort}) im Bild gesehen`, art: 'gesehen', text: new RegExp(ort, 'i') },
    { name: 'Antwort sagt ja oder nein', art: 'antwort', text: /\b(ja|nein)\b/i },
  ] };
}

// Init-Skript (Seitenkontext, eigenständig): Klicks auf Telefon- und WhatsApp-Links abfangen (Attrappe, G5).
const KONTAKT_RE = /^(tel|whatsapp):|^https?:\/\/(www\.)?(wa\.me|api\.whatsapp\.com)/i;
const KONTAKT_INIT = () => {
  window.__relaunchKontakt = window.__relaunchKontakt || [];
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    const ziel = a.href || '';
    if (/^(tel|whatsapp):/i.test(ziel) || /^https?:\/\/(www\.)?(wa\.me|api\.whatsapp\.com)\b/i.test(ziel)) {
      e.preventDefault();
      window.__relaunchKontakt.push(ziel);
    }
  }, true);
};

// Init-Skript (Seitenkontext, eigenständig): Systemschrift als Näherung über die Wurzelschriftgröße.
const SCHRIFT_INIT = (pct) => {
  const add = () => { const s = document.createElement('style'); s.setAttribute('data-probelauf-schrift', ''); s.textContent = `html { font-size: ${pct}% !important; }`; (document.head || document.documentElement).appendChild(s); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
};

// Seitenkontext (eigenständig): Anfrageformular mit gültigen Pflichtfeldern und sichtbarem Absendeknopf im Bild (A3).
const FORMULAR = () => {
  const vw = innerWidth, vh = innerHeight;
  const imBildFrei = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) return false;
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    if (!(r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw)) return false;
    const cx = Math.min(Math.max(r.left + r.width / 2, 1), vw - 1), cy = Math.min(Math.max(r.top + r.height / 2, 1), vh - 1);
    const hit = document.elementFromPoint(cx, cy);
    return !!hit && (el === hit || el.contains(hit) || (hit.contains(el) && hit !== document.body && hit !== document.documentElement));
  };
  const istAbsende = (el) => {
    if (el.tagName === 'INPUT') return el.type === 'submit';
    if (el.tagName === 'BUTTON') return (el.getAttribute('type') || 'submit').toLowerCase() === 'submit' && (el.hasAttribute('type') || !!el.form);
    return false;
  };
  const befunde = [];
  // Behälter: die form-Elemente; ohne solche (mehrstufige Anfragen) die Hauptfläche
  const behaelter = document.querySelectorAll('form').length ? [...document.querySelectorAll('form')] : [document.querySelector('main') || document.body];
  for (const f of behaelter) {
    const pflicht = [...f.querySelectorAll('[required]')];
    if (!pflicht.length) continue;
    const ungueltig = pflicht.filter((el) => !el.checkValidity());
    const knopf = [...f.querySelectorAll('button, input[type=submit]')].filter((el) => (istAbsende(el) || /^\s*(absenden|abschicken|jetzt senden|anfrage (senden|absenden)|senden)\b/i.test(el.tagName === 'INPUT' ? el.value || '' : el.innerText || '')) && imBildFrei(el));
    const ok = ungueltig.length === 0 && knopf.length > 0;
    const knopfName = knopf[0] ? ((knopf[0].innerText || knopf[0].value || '').replace(/\s+/g, ' ').trim().slice(0, 40)) : '';
    befunde.push({ pflicht: pflicht.length, ungueltig: ungueltig.length, knopf: knopf.length, ok, detail: `${pflicht.length} Pflichtfelder gültig, Absendeknopf „${knopfName}“ im Bild` });
  }
  return befunde;
};

// Absendeknopf (Knopf vom Typ submit, bzw. ohne Typ innerhalb eines Formulars). Eigenständig (Seitenkontext).
const IST_ABSENDEKNOPF = (el) => {
  const text = (el.tagName === 'INPUT' ? el.value : el.innerText) || '';
  if (/^\s*(absenden|abschicken|jetzt senden|anfrage (senden|absenden)|senden)\b/i.test(text)) return true; // Absende-Beschriftung, auch ohne form-Element (Funnel)
  if (el.tagName === 'INPUT') return el.type === 'submit';
  if (el.tagName === 'BUTTON') return (el.getAttribute('type') || 'submit').toLowerCase() === 'submit' && (el.hasAttribute('type') || !!el.form);
  return false;
};

// ---------------------------------------------------------------------------------------------------------
// Argumente
// ---------------------------------------------------------------------------------------------------------
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(`--${k}`); return i > -1 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const flag = (k) => argv.includes(`--${k}`);
const MIT_WERT = new Set(['satz', 'lauf', 'ansicht', 'eingabe', 'stoer-css', 'schrift', 'ziel']);
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--') && MIT_WERT.has(argv[i - 1].slice(2))));
const satz = arg('satz', 'adhoc');
// --ziel <ordner>: Ausgabewurzel (z. B. $SCRATCH/<Kennung>); Standard _werkstatt/cache/probelauf.
const AUSGABE_WURZEL = arg('ziel', null) ? path.resolve(arg('ziel', null)) : path.join(RELAUNCH, 'cache', 'probelauf');

if (flag('hilfe') || flag('help')) {
  console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').filter((l) => l.startsWith('//')).map((l) => l.slice(3)).join('\n'));
  process.exit(0);
}
if (flag('aufgaben')) {
  for (const [n, a] of Object.entries(AUFGABEN)) console.log(`Aufgabe ${n} · ${a.titel}\n  Start: /\n  Auftrag: „${a.auftrag}“\n`);
  process.exit(0);
}
if (flag('matrix')) { matrix(); process.exit(0); }

// ---------------------------------------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------------------------------------
const normal = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const kurz = (s, n = 90) => { const t = normal(s); return t.length > n ? t.slice(0, n - 1) + '…' : t; };
const zwei = (n) => String(n).padStart(2, '0');
const falte = (s) => normal(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
function aehnlich(a, b) { // Dice-Koeffizient über Bigramme
  const bi = (s) => { const t = falte(s); const m = new Map(); for (let i = 0; i < t.length - 1; i++) { const g = t.slice(i, i + 2); m.set(g, (m.get(g) || 0) + 1); } return m; };
  const A = bi(a), B = bi(b); let schnitt = 0, na = 0, nb = 0;
  for (const v of A.values()) na += v; for (const v of B.values()) nb += v;
  for (const [g, v] of A) schnitt += Math.min(v, B.get(g) || 0);
  return na + nb ? (2 * schnitt) / (na + nb) : 0;
}
class SchrittFehler extends Error { constructor(grund, extra = {}) { super(grund); this.grund = grund; Object.assign(this, extra); } }
// Playwright-Fehler → Besuchergrund: erste Zeile plus der aussagekräftigste Eintrag des Aufruf-Protokolls
// (verdeckt, nicht stabil, nicht sichtbar, deaktiviert, außerhalb des Bildes).
function pwGrund(e) {
  const zeilen = ohneAnsi(e && e.message || e).split('\n').map((z) => z.trim()).filter(Boolean);
  const erste = zeilen[0] || '';
  const log = zeilen.filter((z) => /^-\s/.test(z)).map((z) => z.replace(/^-\s+/, ''));
  const wichtig = [...log].reverse().find((z) => /intercepts pointer events|not stable|not visible|not enabled|disabled|outside of the viewport|detached|not attached|readonly|not an <input>/i.test(z));
  return kurz(wichtig ? `${erste} – ${wichtig}` : erste, 220);
}
const ohneAnsi = (t) => String(t).replace(/\x1B\[[0-9;]*m/g, '');
const pwLog = (e) => ohneAnsi(e && e.message || e).split('\n').map((z) => z.trim()).filter(Boolean).slice(1).slice(-10);

// Antippen (Touch) oder Klicken (Maus) mit Playwrights Bedienbarkeitsprüfung (sichtbar, aktiv, stabil, nicht verdeckt).
// Läuft die Obergrenze erst ab, NACHDEM Playwright die Handlung schon abgesetzt hat („performing … action“ als letzter
// Protokolleintrag: der Browser quittiert das Eingabeereignis unter Last nicht rechtzeitig), gilt die Handlung als
// ausgeführt – der Folgezustand wird wie immer über die Zustandsabfragen festgestellt und im Schritt vermerkt.
async function bediene(loc, wie = eingabe) {
  try {
    if (wie === 'touch') await loc.tap({ timeout: AKTION_TIMEOUT }); else await loc.click({ timeout: AKTION_TIMEOUT });
    return { unbestaetigt: false };
  } catch (e) {
    const log = pwLog(e);
    if (/Timeout/i.test(e.message) && /performing (click|tap) action/.test(log[log.length - 1] || '')) return { unbestaetigt: true };
    throw e;
  }
}
const UNBESTAETIGT = 'Handlung abgesetzt, Quittung des Browsers blieb bis zur Obergrenze aus (Last) – Folgezustand per Zustandsabfrage geprüft';

// Erste Zeile eines ariaSnapshot → „rolle "Name"“
function ersteZeile(snap) {
  const z = String(snap || '').split('\n').find((l) => l.trim()) || '';
  let t = z.trim().replace(/^- /, '');
  if (t.startsWith("'") && t.endsWith("':")) t = t.slice(1, -2); else if (t.startsWith("'") && t.endsWith("'")) t = t.slice(1, -1);
  t = t.replace(/:$/, '').replace(/''/g, "'");
  return t;
}
function teileRolleName(beschr) {
  const m = /^([a-z]+)(?: "((?:[^"\\]|\\.)*)")?/.exec(beschr || '');
  return m ? { rolle: m[1], name: (m[2] || '').replace(/\\"/g, '"').replace(/\\\\/g, '\\') } : { rolle: '', name: beschr || '' };
}
// Rolle und Name eines Elements aus seinem ariaSnapshot (genau wie getByRole sie sieht). Höchstens 4 Abfragen
// gleichzeitig: mehr staut sich unter Last im Renderer und läuft in die Obergrenze.
let laufend = 0; const warteschlange = [];
async function begrenzt(fn) {
  if (laufend >= 4) await new Promise((r) => warteschlange.push(r));
  laufend++;
  try { return await fn(); } finally { laufend--; const n = warteschlange.shift(); if (n) n(); }
}
async function beschreibe(loc) {
  return begrenzt(async () => {
    try { return kurz(ersteZeile(await loc.ariaSnapshot({ timeout: 10000 })), 110); } catch {}
    try { const n = await loc.evaluateAll(BEDIEN_LISTE, false); if (n[0] && n[0].name) return `${kurz(n[0].beschreibung, 106)} (≈)`; } catch {} // Näherung, falls der Aria-Baum unter Last ausbleibt
    return '(ohne Namen)';
  });
}

// Im Seitenkontext: Lage und Sichtbarkeit eines Elements (für Besucher sichtbar = nicht display/visibility/opacity 0,
// größer als 1 px, innerhalb der Dokumentfläche; im Bild = schneidet den Ausschnitt; frei = Mittelpunkt nicht verdeckt).
// Trifft die Punktprobe einen Vorfahren, zählt das als frei (Inhalt mit pointer-events:none), außer der Vorfahr ist
// body/html – dann liegt dort eine Ebene ohne eigenes Element (z. B. ::after-Überlagerung) über dem Ziel.
const LAGE = (el) => {
  const vw = innerWidth, vh = innerHeight;
  const r = el.getBoundingClientRect();
  const doc = document.documentElement;
  const beschreibeEl = (e) => {
    if (!e) return null;
    const lab = e.getAttribute && (e.getAttribute('aria-label') || e.getAttribute('role') || '');
    const cls = typeof e.className === 'string' ? e.className.split(/\s+/).filter(Boolean).slice(0, 3).join('.') : '';
    const dlg = e.closest && e.closest('[role=dialog],[role=alertdialog],dialog,[aria-modal=true]');
    const dlgName = dlg ? (dlg.getAttribute('aria-label') || '') : '';
    return `${e.tagName.toLowerCase()}${cls ? '.' + cls : ''}${lab ? ` [${lab.slice(0, 50)}]` : ''}${dlgName ? ` in Ebene „${dlgName.slice(0, 50)}“` : ''}`;
  };
  let sichtbar = r.width > 1 && r.height > 1 && !el.closest('[inert]');
  if (sichtbar && el.checkVisibility) sichtbar = el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  if (sichtbar && (r.bottom + scrollY <= 0 || r.right + scrollX <= 0 || r.left + scrollX >= doc.scrollWidth)) sichtbar = false;
  const imBild = sichtbar && r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw;
  let frei = false, verdeckt = null;
  if (imBild) {
    const cx = Math.min(Math.max(r.left + r.width / 2, 1), vw - 1), cy = Math.min(Math.max(r.top + r.height / 2, 1), vh - 1);
    const hit = document.elementFromPoint(cx, cy);
    frei = !!hit && (el === hit || el.contains(hit) || (hit.contains(el) && hit !== document.body && hit !== document.documentElement));
    if (!frei) verdeckt = beschreibeEl(hit);
  }
  const lm = el.closest('nav,[role=navigation],header,[role=banner],footer,[role=contentinfo],[role=dialog],dialog,aside,[role=complementary],[role=region],section[aria-label],section[aria-labelledby],main,form');
  let bereich = null;
  if (lm) {
    const lbId = lm.getAttribute('aria-labelledby');
    const lbl = lm.getAttribute('aria-label') || (lbId ? (document.getElementById(lbId.split(' ')[0])?.textContent || '') : '');
    bereich = `${lm.getAttribute('role') || lm.tagName.toLowerCase()}${lbl ? ` „${lbl.trim().replace(/\s+/g, ' ').slice(0, 50)}“` : ''}`;
  }
  const a = el.closest('a[href]');
  return {
    sichtbar, imBild, frei, verdeckt, bereich,
    oben: Math.round(r.top), unten: Math.round(r.bottom), links: Math.round(r.left), hoehe: Math.round(r.height), vh, absOben: Math.round(r.top + scrollY),
    href: a ? a.getAttribute('href') : null,
    tag: el.tagName.toLowerCase(),
    editierbar: el.matches('input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=hidden]), textarea, [contenteditable=""], [contenteditable=true]'),
    istSelect: el.tagName === 'SELECT',
    fokussiert: el === document.activeElement,
  };
};

// Im Seitenkontext: was der Besucher gerade sieht (für die Zielprüfung).
const AUSSCHNITT = () => {
  const vw = innerWidth, vh = innerHeight;
  const sicht = (el) => { const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) return false; return el.checkVisibility ? el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : true; };
  const imBild = (r) => r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw;
  const frei = (el, r) => {
    const cx = Math.min(Math.max(r.left + Math.min(r.width, 40) / 2, 1), vw - 1), cy = Math.min(Math.max(r.top + r.height / 2, 1), vh - 1);
    const hit = document.elementFromPoint(cx, cy);
    return !hit || el === hit || el.contains(hit) || (hit.contains(el) && hit !== document.body && hit !== document.documentElement);
  };
  const h1el = [...document.querySelectorAll('h1')].find(sicht);
  const ueberschriften = [];
  for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role=heading]')) {
    if (!sicht(h)) continue; const r = h.getBoundingClientRect(); if (!imBild(r) || !frei(h, r)) continue;
    const t = h.innerText.replace(/\s+/g, ' ').trim(); if (t) ueberschriften.push(t);
  }
  const teile = [], kurztexte = new Set();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; const geprueft = new Map();
  while ((n = tw.nextNode())) {
    const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue;
    const el = n.parentElement; if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName)) continue;
    let ok = geprueft.get(el); if (ok === undefined) { ok = sicht(el); geprueft.set(el, ok); } if (!ok) continue;
    const range = document.createRange(); range.selectNodeContents(n);
    const r = [...range.getClientRects()].find(imBild); if (!r) continue;
    if (!frei(el, r)) continue;
    teile.push(t);
    if (!el.closest('a,button,[role=button],[role=link]')) { const eigen = el.innerText ? el.innerText.replace(/\s+/g, ' ').trim() : ''; if (eigen && eigen.length <= 80) kurztexte.add(eigen); }
  }
  const fotos = []; // Fotos in main, natürliche Breite ≥ 300 px, im Bild und unverdeckt (A4)
  for (const img of document.querySelectorAll('main img')) {
    if (!img.complete || !(img.naturalWidth >= 300) || !sicht(img)) continue;
    const r = img.getBoundingClientRect(); if (!imBild(r) || !frei(img, r)) continue;
    fotos.push(img.currentSrc || img.src);
  }
  const opened = (window.__relaunchOpened || []).slice();
  return { h1: h1el ? h1el.innerText.replace(/\s+/g, ' ').trim() : null, ueberschriften, text: teile.join(' ').slice(0, 40000), kurztexte: [...kurztexte], scrollY: Math.round(scrollY), seitenhoehe: document.documentElement.scrollHeight, vh, opened, fotos };
};

// Bedienelemente (Kandidaten für Antippen/Fokus) – Auswahl für die Liste „im Bild“.
const BEDIEN_SEL = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=checkbox], [role=radio], [role=switch], [role=option], [role=combobox], [contenteditable=""], [contenteditable=true], [tabindex]:not([tabindex="-1"])';
const ROLLEN_TIPPE = ['link', 'button', 'tab', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'checkbox', 'radio', 'switch', 'option', 'combobox', 'treeitem', 'textbox', 'searchbox', 'spinbutton', 'slider'];
const ROLLEN_FELD = ['textbox', 'searchbox', 'combobox', 'spinbutton', 'listbox', 'radiogroup', 'group'];
const ROLLEN_BEREICH = ['navigation', 'dialog', 'alertdialog', 'region', 'banner', 'contentinfo', 'main', 'complementary', 'form', 'list', 'group', 'article', 'listbox', 'menu', 'tablist'];

// Je Rolle ein eigener Locator (statt einer .or()-Vereinigung): jede spätere Auflösung (Lage, Name, Klick mit
// Bedienbarkeitsprüfung) fragt dann nur eine Rolle ab – unter Last um ein Vielfaches schneller.
function rollenListe(scope, rollen, name, exact) {
  return rollen.map((r) => scope.getByRole(r, { name, exact }));
}

async function sammle(locs, stufe, grenze = 40) {
  const liste = Array.isArray(locs) ? locs : [locs];
  // Unter starker Last können einzelne Abfragen in die Obergrenze laufen. Eine fehlgeschlagene Abfrage heißt nicht
  // „unsichtbar“: sie wird einmal einzeln wiederholt; scheitert sie erneut, bricht der Schritt als Werkzeugfehler ab,
  // statt still auf eine ungenauere Stufe auszuweichen.
  const zaehle = (l) => l.count().catch(() => l.count().catch(() => { throw new SchrittFehler(`Werkzeug: Abfrage „${stufe}“ nicht lesbar (Browser unter Last) – Lauf wiederholen`); }));
  const zahlen = await Promise.all(liste.map(zaehle));
  const gesamt = zahlen.reduce((a, b) => a + b, 0);
  const einzel = [];
  liste.forEach((l, j) => { for (let i = 0; i < zahlen[j] && einzel.length < grenze; i++) einzel.push(l.nth(i)); });
  const FEHLT = Symbol('fehlt');
  const lagen = await Promise.all(einzel.map((l) => l.evaluate(LAGE).catch((e) => (/not attached|detached|Element is not|resolved to 0|strict mode/i.test(String(e.message)) ? null : FEHLT))));
  for (let i = 0; i < lagen.length; i++) {
    if (lagen[i] !== FEHLT) continue;
    lagen[i] = await einzel[i].evaluate(LAGE, null, { timeout: 60000 }).catch(() => FEHLT);
    if (lagen[i] === FEHLT) throw new SchrittFehler(`Werkzeug: Lage eines Kandidaten (Stufe ${stufe}) nicht lesbar (Browser unter Last) – Lauf wiederholen`);
  }
  const idx = lagen.map((lage, i) => (lage && lage.sichtbar ? i : -1)).filter((i) => i >= 0);
  const namen = await Promise.all(idx.map((i) => beschreibe(einzel[i])));
  const sichtbar = idx.map((i, k) => ({ loc: einzel[i], stufe, lage: lagen[i], beschreibung: namen[k] }))
    .sort((a, b) => (a.lage.absOben - b.lage.absOben) || (a.lage.links - b.lage.links)); // Dokumentlage (oben → unten)
  return { gesamt, sichtbar, gekappt: gesamt > grenze };
}

const kandidatText = (k, i) => `${i + 1}) ${k.beschreibung}${k.lage.bereich ? ` · ${k.lage.bereich}` : ''} · ${k.lage.imBild ? (k.lage.frei ? 'im Bild' : `im Bild, verdeckt durch ${k.lage.verdeckt}`) : `außerhalb des Bildes (y=${k.lage.oben})`}`;

async function bereichScope(page, name) {
  for (const exact of [true, false]) {
    const { sichtbar } = await sammle(rollenListe(page, ROLLEN_BEREICH, name, exact), 'bereich', 20);
    if (sichtbar.length) return sichtbar[0].loc;
  }
  throw new SchrittFehler(`Bereich „${name}“ nicht gefunden (Name einer Navigation, eines Dialogs oder Abschnitts)`);
}

// Ähnliche Bedienelemente (für „nicht gefunden“): aus dem Aria-Baum der ganzen Seite.
async function aehnliche(page, name) {
  const namen = new Map();
  let snap = '';
  try { snap = await page.locator('body').ariaSnapshot({ timeout: 20000 }); } catch {}
  for (const z of snap.split('\n')) {
    const m = /^\s*- '?(link|button|tab|menuitem|checkbox|radio|switch|option|combobox|textbox|searchbox|spinbutton) "((?:[^"\\]|\\.)*)"/.exec(z);
    if (m) { const k = `${m[1]} "${m[2]}"`; if (!namen.has(k)) namen.set(k, m[2]); }
  }
  if (!namen.size) { // Rückfall: Näherung im Seitenkontext (z. B. wenn der Aria-Baum unter Last nicht rechtzeitig kam)
    const l = await page.locator(BEDIEN_SEL).evaluateAll(BEDIEN_LISTE, false).catch(() => []);
    for (const x of l) if (x.name && !/^(generic|none|presentation)$/.test(x.rolle)) { const k = `${x.rolle} "${kurz(x.name, 100)}"`; if (!namen.has(k)) namen.set(k, x.name); }
  }
  return [...namen.entries()].map(([k, n]) => ({ k, s: Math.max(aehnlich(n, name), falte(n).includes(falte(name).split(' ')[0] || '§') ? 0.35 : 0) }))
    .sort((a, b) => b.s - a.s).slice(0, 8).map((x) => `${x.k} (Ähnlichkeit ${x.s.toFixed(2)})`);
}

// Auflösung eines Ziels: getByRole(name) → getByText → getByLabel; je Stufe erst genau, dann enthaltend.
// Es zählen nur für Besucher sichtbare Elemente. Mehrere Treffer: eindeutig, wenn genau einer im Bild und frei ist;
// sonst Fehler mit Kandidatenliste (Auswahl mit "nr").
async function loese(page, name, { nr, inBereich, rollen = ROLLEN_TIPPE, feld = false } = {}) {
  const scope = inBereich ? await bereichScope(page, inBereich) : page;
  const stufen = feld
    ? [
      ['label-genau', () => scope.getByLabel(name, { exact: true })],
      ['label', () => scope.getByLabel(name)],
      ['rolle-genau', () => rollenListe(scope, rollen, name, true)],
      ['rolle', () => rollenListe(scope, rollen, name, false)],
      ['platzhalter', () => scope.getByPlaceholder(name)],
    ]
    : [
      ['rolle-genau', () => rollenListe(scope, rollen, name, true)],
      ['rolle', () => rollenListe(scope, rollen, name, false)],
      ['text-genau', () => scope.getByText(name, { exact: true })],
      ['text', () => scope.getByText(name)],
      ['label-genau', () => scope.getByLabel(name, { exact: true })],
      ['label', () => scope.getByLabel(name)],
    ];
  for (const [stufe, mk] of stufen) {
    const { sichtbar, gesamt, gekappt } = await sammle(mk(), stufe);
    if (!sichtbar.length) continue;
    const liste = sichtbar.map(kandidatText);
    if (nr !== undefined) {
      const k = sichtbar[nr - 1];
      if (!k) throw new SchrittFehler(`„${name}“: nr ${nr} gibt es nicht (${sichtbar.length} sichtbare Kandidaten)`, { kandidaten: liste });
      return { ...k, auswahl: `nr ${nr} von ${sichtbar.length}` };
    }
    if (sichtbar.length === 1) return { ...sichtbar[0], auswahl: 'eindeutig' };
    const frei = sichtbar.filter((k) => k.lage.imBild && k.lage.frei);
    if (frei.length === 1) return { ...frei[0], auswahl: `einziger freier Treffer im Bild (von ${sichtbar.length})` };
    const imBild = sichtbar.filter((k) => k.lage.imBild);
    if (!frei.length && imBild.length === 1) return { ...imBild[0], auswahl: `einziger Treffer im Bild (von ${sichtbar.length}), verdeckt`, liste }; // der Besucher sieht nur diesen
    throw new SchrittFehler(`mehrdeutig: „${name}“ trifft ${sichtbar.length} sichtbare Elemente (Stufe ${stufe}${gekappt ? `, von ${gesamt} nur die ersten 40 geprüft` : ''}) – mit "nr" (1…${sichtbar.length}) oder "in" (Bereichsname) wählen`, { kandidaten: liste });
  }
  const aeh = await aehnliche(page, name);
  throw new SchrittFehler(`nicht gefunden: kein sichtbares Element „${name}“${inBereich ? ` im Bereich „${inBereich}“` : ''}`, { kandidaten: aeh.length ? aeh : ['(keine ähnlichen Bedienelemente auf der Seite)'] });
}

// Netz-Ruhe über einen Anfragezähler (gilt auch für Client-Navigation ohne neues Dokument).
function netzZaehler(context) {
  let offen = 0, letzte = Date.now();
  const an = () => { offen++; letzte = Date.now(); };
  const ab = () => { offen = Math.max(0, offen - 1); letzte = Date.now(); };
  context.on('request', an); context.on('requestfinished', ab); context.on('requestfailed', ab);
  return {
    async ruhe(page, ruheMs = 400, maxMs = 5000) {
      const t0 = Date.now();
      while (Date.now() - t0 < maxMs) { // Abfrage alle 50 ms (Zustandsabfrage mit Obergrenze, keine feste Wartezeit)
        if (offen === 0 && Date.now() - letzte >= ruheMs) return 'ruhig';
        await page.waitForTimeout(50);
      }
      return 'obergrenze';
    },
  };
}

async function beruhige(page, netz) {
  const zustand = {};
  for (let runde = 0; runde < 3; runde++) {
    try {
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
      zustand.netz = await netz.ruhe(page);
      zustand.dom = await page.evaluate(({ ruheMs, maxMs }) => new Promise((res) => {
        let last = performance.now(); const start = last;
        const mo = new MutationObserver(() => { last = performance.now(); });
        mo.observe(document, { subtree: true, childList: true, attributes: true, characterData: true });
        const tick = () => { const now = performance.now(); if (now - last >= ruheMs) { mo.disconnect(); res('ruhig'); } else if (now - start >= maxMs) { mo.disconnect(); res('obergrenze'); } else setTimeout(tick, 50); };
        setTimeout(tick, 50); // Abfrage per Zeitgeber, nicht per Bild: unter Last stocken Bildwechsel
      }), { ruheMs: 250, maxMs: 3000 });
      zustand.animation = await page.evaluate((maxMs) => {
        const endliche = document.getAnimations().filter((a) => { try { const t = a.effect && a.effect.getComputedTiming(); return a.playState === 'running' && t && Number.isFinite(t.endTime); } catch { return false; } });
        if (!endliche.length) return Promise.resolve('keine');
        return Promise.race([Promise.all(endliche.map((a) => a.finished.catch(() => {}))).then(() => 'fertig'), new Promise((r) => setTimeout(() => r('obergrenze'), maxMs))]);
      }, 2000);
      await page.evaluate(() => document.fonts && document.fonts.ready.then(() => true));
      return zustand;
    } catch (e) {
      if (!/context was destroyed|navigat|Target closed/i.test(String(e.message))) throw e;
    }
  }
  return { ...zustand, hinweis: 'Seite wechselte während der Beruhigung mehrfach' };
}

async function fokusInfo(page) {
  const f = page.locator('*:focus');
  if (!(await f.count())) return { beschreibung: '(kein Element – Fokus auf der Seite)', imBild: false };
  const beschreibung = await beschreibe(f.first());
  const lage = await f.first().evaluate((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0)
      || cs.boxShadow.split(/,(?![^(]*\))/).some((s) => !/rgba\([^)]*,\s*0\)/.test(s) && /\d+px/.test(s) && !/^\s*(none|rgba\(0, 0, 0, 0\) 0px 0px 0px 0px)\s*$/.test(s) && /[1-9]\d*(\.\d+)?px/.test(s));
    return { imBild: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth, focusVisible: el.matches(':focus-visible'), ringHinweis: ring, oben: Math.round(r.top), href: el.closest('a[href]') ? el.closest('a[href]').getAttribute('href') : null, editierbar: el.matches('input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]), textarea, select, [contenteditable=""], [contenteditable=true]'), istSelect: el.tagName === 'SELECT' };
  }).catch(() => ({}));
  return { beschreibung, ...lage };
}

// Im Seitenkontext, ein Durchgang für alle Bedienelemente: Lage, Verdeckung und eine Näherung von Rolle und
// zugänglichem Namen (aria-labelledby → aria-label → Beschriftung/Platzhalter → Textinhalt ohne aria-hidden, alt,
// title). Ersetzt bis zu 70 einzelne ariaSnapshot-Abfragen (unter Last je Schritt 20 s und mehr). Die Liste dient
// nur der Orientierung; aufgelöst wird beim Antippen immer über Playwright (getByRole/getByText/getByLabel).
const BEDIEN_LISTE = (els, nurImBild) => {
  const vw = innerWidth, vh = innerHeight;
  const sauber = (t) => String(t || '').replace(/\s+/g, ' ').trim();
  const textVon = (n) => {
    if (n.nodeType === 3) return n.textContent;
    if (n.nodeType !== 1) return '';
    const e = n;
    if (e.getAttribute('aria-hidden') === 'true' || e.hidden || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(e.tagName)) return '';
    const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return '';
    if (e.getAttribute('aria-label')) return ' ' + e.getAttribute('aria-label') + ' ';
    if (e.tagName === 'IMG') return ' ' + (e.getAttribute('alt') || '') + ' ';
    if (e.tagName.toLowerCase() === 'svg') { const t = e.querySelector('title'); return t ? ' ' + t.textContent + ' ' : ''; }
    const block = /^(block|flex|grid|list-item|table)/.test(cs.display) ? ' ' : '';
    let t = ''; for (const c of e.childNodes) t += textVon(c); return block + t + block;
  };
  const rolle = (e) => {
    const r = e.getAttribute('role'); if (r) return r.split(' ')[0];
    const tag = e.tagName.toLowerCase(); const typ = (e.getAttribute('type') || 'text').toLowerCase();
    if (tag === 'a') return 'link'; if (tag === 'button' || tag === 'summary') return 'button';
    if (tag === 'select') return e.multiple || e.size > 1 ? 'listbox' : 'combobox'; if (tag === 'textarea') return 'textbox';
    if (tag === 'input') return ({ checkbox: 'checkbox', radio: 'radio', button: 'button', submit: 'button', reset: 'button', image: 'button', range: 'slider', number: 'spinbutton', search: 'searchbox' })[typ] || 'textbox';
    return e.isContentEditable ? 'textbox' : 'generic';
  };
  const name = (e) => {
    const lb = e.getAttribute('aria-labelledby');
    if (lb) { const t = sauber(lb.split(/\s+/).map((id) => { const x = document.getElementById(id); return x ? textVon(x) : ''; }).join(' ')); if (t) return t; }
    if (e.getAttribute('aria-label')) return sauber(e.getAttribute('aria-label'));
    if (e.labels && e.labels.length) { const t = sauber([...e.labels].map(textVon).join(' ')); if (t) return t; }
    if (['INPUT', 'TEXTAREA'].includes(e.tagName)) { if (['submit', 'button', 'reset'].includes(e.type) && e.value) return sauber(e.value); if (e.getAttribute('placeholder')) return sauber(e.getAttribute('placeholder')); }
    if (e.tagName === 'SELECT') return sauber(e.getAttribute('title') || '');
    const t = sauber(textVon(e)); if (t) return t;
    return sauber(e.getAttribute('title') || '');
  };
  return els.map((el, i) => {
    const r = el.getBoundingClientRect();
    const roh = nurImBild === 'roh';
    if (!roh && (r.width <= 1 || r.height <= 1 || el.closest('[inert],[aria-hidden="true"]'))) return null;
    const imBild = r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw;
    if (nurImBild === true && !imBild) return null;
    if (!roh && el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return null;
    let frei = false, verdeckt = null;
    if (imBild) {
      const cx = Math.min(Math.max(r.left + r.width / 2, 1), vw - 1), cy = Math.min(Math.max(r.top + r.height / 2, 1), vh - 1);
      const hit = document.elementFromPoint(cx, cy);
      frei = !!hit && (el === hit || el.contains(hit) || (hit.contains(el) && hit !== document.body && hit !== document.documentElement));
      if (!frei && hit) { const d = hit.closest('[role=dialog],[role=alertdialog],dialog,[aria-label]'); verdeckt = d ? `${d.getAttribute('role') || d.tagName.toLowerCase()} „${(d.getAttribute('aria-label') || '').slice(0, 50)}“` : hit.tagName.toLowerCase(); }
    }
    const ro = rolle(el); const n = name(el);
    const zust = [el.getAttribute('aria-expanded') === 'true' ? '[expanded]' : '', el.getAttribute('aria-pressed') === 'true' || el.checked ? '[checked]' : '', el.disabled || el.getAttribute('aria-disabled') === 'true' ? '[disabled]' : ''].filter(Boolean).join(' ');
    const kurzN = n.length > 100 ? n.slice(0, 99) + '…' : n;
    return { i, y: Math.round(r.top), x: Math.round(r.left), imBild, frei, verdeckt, rolle: ro, name: n, beschreibung: `${ro}${n ? ` "${kurzN}"` : ''}${zust ? ' ' + zust : ''}` };
  }).filter(Boolean);
};

// Seitenausdruck: fokussiertes Element nach einem Tastendruck (für „taste … bis“).
const FOKUS_JETZT = `(async () => {
  await new Promise((r) => setTimeout(() => setTimeout(r, 0), 0));
  const L = ${BEDIEN_LISTE.toString()};
  let el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return { beschreibung: '(kein Fokus)', name: '', text: '', istErste: false };
  const d = L([el], 'roh')[0] || { beschreibung: el.tagName.toLowerCase(), name: '' };
  const w = window.__probelaufErster; let istErste = false;
  if (!w) window.__probelaufErster = new WeakRef(el); else istErste = w.deref() === el;
  return { beschreibung: d.beschreibung, name: d.name || '', text: (el.innerText || el.value || '').replace(/\\s+/g, ' ').trim().slice(0, 200), istErste };
})()`;

async function bedienImBild(page) {
  const lagen = await page.locator(BEDIEN_SEL).evaluateAll(BEDIEN_LISTE, true).catch(() => []);
  const liste = lagen.filter((l) => l.name && !/^(generic|none|presentation)$/.test(l.rolle));
  liste.sort((a, b) => a.y - b.y || a.x - b.x);
  return liste.slice(0, 120);
}

async function ariaAuszug(page) {
  const ohneUrl = (s) => s.split('\n').filter((l) => !/^\s*- \/url:/.test(l)).join('\n');
  const kuerze = (s, max) => { const z = s.split('\n'); return z.length > max ? z.slice(0, max).join('\n') + `\n… (gekürzt, ${z.length - max} weitere Zeilen)` : s; };
  const teile = [];
  const ebenen = page.getByRole('dialog').or(page.getByRole('alertdialog'));
  const n = await ebenen.count().catch(() => 0);
  for (let i = 0; i < n; i++) {
    const e = ebenen.nth(i);
    const lage = await e.evaluate(LAGE).catch(() => null);
    if (!lage || !lage.sichtbar) continue;
    try { teile.push(`## Offene Ebene\n${kuerze(ohneUrl(await e.ariaSnapshot({ timeout: 10000 })), 120)}`); } catch {}
  }
  try { const kopf = page.getByRole('banner').first(); if (await kopf.count()) teile.push(`## Kopf\n${kuerze(ohneUrl(await kopf.ariaSnapshot({ timeout: 10000 })), 40)}`); } catch {}
  try {
    const main = page.locator('main').first();
    const ziel = (await main.count()) ? main : page.locator('body');
    teile.push(`## Hauptbereich\n${kuerze(ohneUrl(await ziel.ariaSnapshot({ timeout: 20000 })), 300)}`);
  } catch (e) { teile.push(`## Hauptbereich\n(nicht lesbar: ${kurz(e.message, 80)})`); }
  return { text: teile.join('\n\n'), ebenen: teile.filter((t) => t.startsWith('## Offene Ebene')).map((t) => kurz(ersteZeile(t.split('\n').slice(1).join('\n')), 90)) };
}

// ---------------------------------------------------------------------------------------------------------
// Zielprüfung
// ---------------------------------------------------------------------------------------------------------
function pruefeBedingung(b, z) { // z = { pfad, aus (AUSSCHNITT), anfragen, kontakte, fotos (Anzahl), formular, antwort }
  if (b.art === 'eines') {
    for (const u of b.von) { const t = pruefeBedingung(u, z); if (t) return `${u.name}: ${t}`; }
    return null;
  }
  if (b.art === 'seite') {
    if (b.pfad && !b.pfad.test(z.pfad)) return null;
    if (b.h1 && !(z.aus.h1 && b.h1.test(z.aus.h1))) return null;
    return `${z.pfad} · H1 „${kurz(z.aus.h1, 70)}“`;
  }
  if (b.art === 'anfrage') return z.anfragen > 0 ? `${z.anfragen} Anfrage(n) an die Attrappe` : null;
  if (b.art === 'kontakt') return z.kontakte > 0 ? `${z.kontakte} Kontaktlink(s) angetippt (Attrappe)` : null;
  if (b.art === 'formular') return z.formular ? z.formular.detail : null;
  if (b.art === 'fotos') return z.fotos >= (b.min || 1) ? `${z.fotos} Fotos im Bild gesehen` : null;
  if (b.art === 'antwort') { // Antwort des Besuchers (Text aus der Lauf-Datei); nur am Laufende geprüft
    if (z.antwort === null || z.antwort === undefined) return null;
    const t = normal(z.antwort);
    if (t.length < (b.min_zeichen || 1)) return null;
    if (b.text && !b.text.test(t)) return null;
    if (b.und && !b.und.test(t)) return null;
    return `Antwort „${kurz(t, 60)}“`;
  }
  if (b.art === 'gesehen') {
    if (b.nachAnfrage && !(z.anfragen > 0)) return null;
    if (b.ueberschrift) { const h = z.aus.ueberschriften.find((x) => b.ueberschrift.test(x)); if (h) return `Überschrift „${kurz(h, 70)}“`; }
    if (b.kurztext) { const k = z.aus.kurztexte.find((x) => b.kurztext.test(x)); if (k) return `Text „${kurz(k, 70)}“`; }
    if (b.text) {
      const m = b.text.exec(z.aus.text);
      if (m && (!b.und || b.und.test(z.aus.text))) { const i = Math.max(0, m.index - 30); return `„…${kurz(z.aus.text.slice(i, m.index + m[0].length + 40), 100)}…“`; }
    }
    return null;
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------
// Lauf
// ---------------------------------------------------------------------------------------------------------
if (!positional[0]) { console.error('Aufruf: node probelauf.mjs <lauf.json> [--satz <name>] [--lauf <name>] · --aufgaben · --matrix --satz <name> · --hilfe'); process.exit(1); }
assertLocal();
const eingabeDatei = path.resolve(positional[0]);
let def;
try { def = JSON.parse(fs.readFileSync(eingabeDatei, 'utf8')); } catch (e) { console.error(`Lauf-Datei nicht lesbar: ${e.message}`); process.exit(1); }
const person = def.person ? PERSONEN[def.person] : null;
if (def.person && !person) { console.error(`Unbekannte Person ${def.person} (P1–P5)`); process.exit(1); }
if (Number(def.aufgabe) === 6 && !person) { console.error('Aufgabe 6 braucht "person" (P1–P5), damit der Ort feststeht'); process.exit(1); }
const ansicht = arg('ansicht', def.ansicht || person?.geraet || 'm375');
const eingabe = arg('eingabe', def.eingabe || (ANSICHTEN[ansicht]?.hasTouch ? 'touch' : 'maus'));
const schrift = arg('schrift', person?.schrift ? String(person.schrift) : null); // Systemschrift in Prozent (Näherung)
const start = def.start || '/';
const lauf = arg('lauf', def.lauf || path.basename(eingabeDatei).replace(/\.json$/i, ''));
const aufgabe = def.aufgabe ? zielFuer(Number(def.aufgabe), person) : null;
const schritte = Array.isArray(def.schritte) ? def.schritte : [];
const stoerCss = arg('stoer-css', def.stoer_css || null);
const echteZeit = flag('echte-zeit');
// P4-GEG2 N-B: Diagnose ohne Banner (Einwilligung „abgelehnt“). Zählt nie für Z-04, nur zum Erklären einer Abweichung;
//   steht in bedingungen.einwilligung.
const ohneBanner = flag('diagnose-ohne-banner');
const still = flag('still');
const V = ANSICHTEN[ansicht];
if (!V) { console.error(`Unbekannte Ansicht ${ansicht} (${Object.keys(ANSICHTEN).join(', ')})`); process.exit(1); }
if (!['touch', 'maus', 'tastatur'].includes(eingabe)) { console.error(`Unbekannte Eingabe ${eingabe} (touch|maus|tastatur)`); process.exit(1); }
if (eingabe === 'touch' && !V.hasTouch) { console.error(`Touch braucht eine Touch-Ansicht (m375, t768) – ${ansicht} hat kein Touch.`); process.exit(1); }
if (Array.isArray(def.befunde) && def.befunde.some((b) => !['hoch', 'mittel', 'gering'].includes(b && b.schwere))) { console.error('befunde: jede Angabe braucht schwere hoch|mittel|gering'); process.exit(1); }
if (def.aufgabe && !aufgabe) { console.error(`Unbekannte Aufgabe ${def.aufgabe} (1–6)`); process.exit(1); }
if (!/^\/[^/]/.test(start) && start !== '/') { console.error(`Start muss ein Pfad sein (z. B. "/"), nicht ${start}`); process.exit(1); }

const ausDir = path.join(AUSGABE_WURZEL, satz, lauf);
if (!ausDir.startsWith(AUSGABE_WURZEL + path.sep)) { console.error('Ungültiger Laufname'); process.exit(1); }
fs.rmSync(ausDir, { recursive: true, force: true });
ensureDir(ausDir);
fs.writeFileSync(path.join(ausDir, 'eingabe.json'), JSON.stringify(def, null, 1));

const protokoll = [];
const konsolenfehler = [];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined }); // Host: CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome
const context = await browser.newContext({
  viewport: { width: V.width, height: V.height }, isMobile: V.isMobile, hasTouch: V.hasTouch, deviceScaleFactor: 1,
  locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'no-preference',
});
await installSperre(context, { protokoll });
await setzeEinwilligung(context, ohneBanner ? 'abgelehnt' : 'erstbesuch');
await context.addInitScript(KONTAKT_INIT); // Telefon/WhatsApp: Attrappe (G5), ruft nichts auf
if (schrift) await context.addInitScript(SCHRIFT_INIT, Number(schrift)); // Systemschrift, jede Navigation
if (stoerCss) {
  await context.addInitScript((css) => {
    const add = () => { const s = document.createElement('style'); s.setAttribute('data-probelauf-stoerung', ''); s.textContent = css; (document.head || document.documentElement).appendChild(s); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
  }, stoerCss);
}
const netz = netzZaehler(context);
const neueSeiten = [];
context.on('page', (p) => neueSeiten.push(p));
let page = await context.newPage();
const beobachte = (p) => {
  p.on('console', (m) => { if (m.type() === 'error') konsolenfehler.push(kurz(m.text(), 200)); });
  p.on('pageerror', (e) => konsolenfehler.push(`pageerror: ${kurz(e.message, 200)}`));
};
beobachte(page);
if (!echteZeit) await page.clock.setFixedTime(FESTE_ZEIT);
neueSeiten.length = 0;

const bedingungen = {
  ansicht, viewport: { width: V.width, height: V.height }, isMobile: V.isMobile, hasTouch: V.hasTouch, dpr: 1, eingabe,
  person: def.person ? { kennung: def.person, ort: person.ort, titel: person.titel, standardgeraet: person.geraet } : null,
  schrift: schrift ? { prozent: Number(schrift), art: 'Näherung über Wurzelschriftgröße (html font-size, je Navigation per Init-Skript)' } : null,
  browser: `chromium ${browser.version()}`, playwright: '1.56.1', reducedMotion: 'no-preference', locale: 'de-DE', zeitzone: 'Europe/Berlin',
  feste_zeit: echteZeit ? null : FESTE_ZEIT.toISOString(), einwilligung: ohneBanner ? 'abgelehnt (Diagnose ohne Banner, zählt nicht für Z-04)' : 'erstbesuch', sperre: 'installSperre (POST /api/anfrage → Attrappe, Fremd-Hosts 204, andere schreibende abgebrochen)',
  warten: 'Zustandsabfragen mit Obergrenze: Netz ruhig 400 ms (max 5 s), DOM ruhig 250 ms (max 3 s), endliche Animationen (max 2 s), Schriften; Banner-Erscheinen max 8 s',
  aktion_timeout_ms: AKTION_TIMEOUT, stoerung: stoerCss ? { css: stoerCss, hinweis: 'GEGENPROBE – kein gültiges Ergebnis' } : null,
  werkzeug: `probelauf.mjs ${WERKZEUG_VERSION}`,
};

const ergebnis = {
  satz, base: BASE, bedingungen, erstellt: new Date().toISOString(),
  lauf, aufgabe: def.aufgabe || null, titel: aufgabe ? aufgabe.titel : null, auftrag: aufgabe ? aufgabe.auftrag : null,
  start, eingabe_datei: path.relative(RELAUNCH, eingabeDatei), antwort: def.antwort || null, gegenprobe: !!def.gegenprobe,
  befunde: Array.isArray(def.befunde) ? def.befunde : [], // vom Probeläufer eingetragen: {schwere: hoch|mittel|gering, schritt, text}
  schritte: [], handlungen_gesamt: 0, ziel: null, abbruch: null, anfragen: protokoll, verlassen: [], konsolenfehler,
};
const zielStand = aufgabe ? aufgabe.ziel.map((b) => ({ name: b.name, erfuellt: false, bei_schritt: null, treffer: null })) : [];
let zielErreichtBei = null, handlungenBisZiel = null;
let summe = 0;
const fotoSet = new Set(); // A4: Fotos, die bisher im Bild waren (über alle Schritte vereinigt)

async function festhalten(nr, art, extra = {}) {
  const basis = `${zwei(nr)}-${art}`;
  const bild = `${basis}.jpg`;
  const zeiten = {}; let tz = Date.now();
  const takt = (k) => { const t = Date.now(); zeiten[k] = t - tz; tz = t; };
  await page.screenshot({ path: path.join(ausDir, bild), type: 'jpeg', quality: 72, timeout: 20000 }).catch(() => {}); takt('bild');
  const aria = await ariaAuszug(page); takt('aria');
  fs.writeFileSync(path.join(ausDir, `${zwei(nr)}-aria.txt`), aria.text);
  const aus = await page.evaluate(AUSSCHNITT).catch(() => ({ h1: null, ueberschriften: [], text: '', kurztexte: [], scrollY: 0, seitenhoehe: 0, opened: [] })); takt('ausschnitt');
  const bed = await bedienImBild(page); takt('bedien');
  fs.writeFileSync(path.join(ausDir, `${zwei(nr)}-sichtbar.txt`), bed.map((b) => `${b.beschreibung}${b.frei ? '' : ` (verdeckt durch ${b.verdeckt})`} · y=${b.y}`).join('\n') + '\n');
  const fokus = eingabe === 'tastatur' || extra.fokusImmer ? await fokusInfo(page) : null;
  const u = new URL(page.url());
  const lokal = ['127.0.0.1', 'localhost'].includes(u.hostname);
  // Zielprüfung – nur nach vollständig ausgeführten Schritten (nicht am Fehlerbild eines abgebrochenen Schritts)
  if (aufgabe && extra.ziel !== false) {
    (aus.fotos || []).forEach((f) => fotoSet.add(f));
    const formular = aufgabe.ziel.some((b) => b.art === 'formular') ? await page.evaluate(FORMULAR).catch(() => []) : [];
    const z = {
      pfad: u.pathname, aus, anfragen: protokoll.filter((p) => p.art === 'anfrage').length,
      kontakte: protokoll.filter((p) => p.art === 'kontakt_angetippt').length, fotos: fotoSet.size,
      formular: formular.find((f) => f.ok) || null, antwort: null, // Antwort erst am Laufende (endePruefung)
    };
    aufgabe.ziel.forEach((b, i) => { if (!zielStand[i].erfuellt && lokal && b.art !== 'antwort') { const t = pruefeBedingung(b, z); if (t) Object.assign(zielStand[i], { erfuellt: true, bei_schritt: nr, treffer: t }); } });
    if (zielErreichtBei === null && zielStand.every((s) => s.erfuellt)) { zielErreichtBei = nr; handlungenBisZiel = summe; }
  }
  return { url: lokal ? u.pathname + u.search + u.hash : page.url(), h1: aus.h1, scrollY: aus.scrollY, seitenhoehe: aus.seitenhoehe, fokus, ebenen: aria.ebenen, bed, zeiten, dateien: { bild, aria: `${zwei(nr)}-aria.txt`, sichtbar: `${zwei(nr)}-sichtbar.txt` }, opened: aus.opened };
}

function schrittArt(s) {
  for (const k of ['tippe', 'taste', 'fuelle', 'waehle', 'scrolle', 'wische', 'warte_auf', 'zurueck']) if (k in s) return k;
  return null;
}
function schrittText(s) {
  const a = schrittArt(s);
  if (a === 'tippe' && typeof s.tippe === 'object') return `tippe Nr ${s.tippe.nr} der Bedienliste`;
  if (a === 'tippe') return `tippe „${s.tippe}“${s.nr ? ` nr ${s.nr}` : ''}${s.in ? ` in „${s.in}“` : ''}`;
  if (a === 'taste') return `taste ${s.taste}${s.mal ? ` ×${s.mal}` : ''}${s.bis ? ` bis „${s.bis}“` : ''}`;
  if (a === 'fuelle') return `fuelle ${s.fuelle.feld ? `„${s.fuelle.feld}“` : '(Fokusfeld)'} = „${kurz(s.fuelle.text, 30)}“`;
  if (a === 'waehle') return `waehle ${s.waehle.feld ? `„${s.waehle.feld}“` : '(Fokusfeld)'} → „${s.waehle.option}“`;
  if (a === 'scrolle') return `scrolle ${s.scrolle}`;
  if (a === 'warte_auf') return `warte_auf „${s.warte_auf}“`;
  if (a === 'wische') return `wische ${s.wische} an „${s.an}“`;
  if (a === 'zurueck') return 'zurueck';
  return JSON.stringify(s);
}

async function scrolleUm(dy) {
  const vor = await page.evaluate(() => scrollY);
  if (eingabe === 'tastatur') throw new SchrittFehler('scrollen ist im Tastatur-Modus nicht erlaubt – PageDown/Space mit "taste" nutzen');
  const box = V; await page.mouse.move(Math.round(box.width / 2), Math.round(box.height / 2));
  await page.mouse.wheel(0, dy);
  // Zustandsabfrage: Bildlauf steht still (3 Abfragen in Folge gleich, max 2 s)
  let gleich = 0, letzt = null; const t0 = Date.now();
  while (gleich < 3 && Date.now() - t0 < 2000) { const y = await page.evaluate(() => new Promise((r) => setTimeout(() => r(scrollY), 50))); gleich = y === letzt ? gleich + 1 : 0; letzt = y; }
  const nach = await page.evaluate(() => scrollY);
  return nach - vor;
}

async function nachAktion() {
  const z = await beruhige(page, netz);
  if (neueSeiten.length) { // neues Fenster/Tab: der Besucher landet dort
    const neu = neueSeiten.splice(0).pop();
    page = neu; beobachte(page);
    await beruhige(page, netz);
    return { ...z, neuesFenster: true };
  }
  return z;
}

async function fuehreAus(s, nr) {
  const art = schrittArt(s);
  const info = { handlungen: 0, bildlauf_implizit: 0, hinweise: [] };
  if (!art) throw new SchrittFehler(`unbekannte Schrittart ${JSON.stringify(s)} (tippe, taste, fuelle, waehle, scrolle, wische, warte_auf, zurueck)`);
  if (art === 'tippe') {
    if (eingabe === 'tastatur') throw new SchrittFehler('„tippe“ ist im Tastatur-Modus verboten – Fokus mit "taste" (Tab) bewegen und mit Enter/Space auslösen');
    let k;
    if (s.tippe && typeof s.tippe === 'object') { // {"tippe": {"nr": n}}: Element Nr. n der nummerierten Bedienliste im Bild
      const liste = await bedienImBild(page);
      const e = liste[Number(s.tippe.nr) - 1];
      if (!e) throw new SchrittFehler(`tippe: Nr ${s.tippe.nr} gibt es nicht (${liste.length} Bedienelemente im Bild)`, { kandidaten: liste.slice(0, 40).map((b, j) => `${j + 1}) ${b.beschreibung}`) });
      const loc = page.locator(BEDIEN_SEL).nth(e.i);
      const lage = await loc.evaluate(LAGE).catch(() => null);
      if (!lage) throw new SchrittFehler(`tippe: Nr ${s.tippe.nr} nicht lesbar (Browser unter Last) – Lauf wiederholen`);
      k = { loc, lage, beschreibung: e.beschreibung, auswahl: `Nr ${s.tippe.nr} der Bedienliste`, stufe: null };
    } else {
      k = await loese(page, String(s.tippe), { nr: s.nr, inBereich: s.in });
    }
    if (await k.loc.evaluate(IST_ABSENDEKNOPF).catch(() => false)) throw new SchrittFehler('Absenden ist im Probelauf nicht erlaubt (A3 endet vor dem Absendeknopf)');
    info.ziel_element = `${k.beschreibung}${k.lage.bereich ? ` · ${k.lage.bereich}` : ''}`; info.auswahl = `${k.auswahl}${k.stufe ? `, Stufe ${k.stufe}` : ''}`;
    if (!k.lage.imBild || k.lage.oben < 0 || k.lage.unten > k.lage.vh) {
      const dist = k.lage.unten > k.lage.vh ? k.lage.unten - k.lage.vh : Math.max(0, -k.lage.oben);
      info.bildlauf_implizit = Math.max(1, Math.ceil(dist / k.lage.vh));
      info.hinweise.push(`Ziel lag außerhalb des Bildes – ${info.bildlauf_implizit} Bildlauf-Handlung(en) gezählt`);
    }
    if (k.lage.href && /^(mailto|sms):/i.test(k.lage.href)) { // E-Mail/SMS: nicht ausgelöst (Telefon und WhatsApp siehe unten)
      info.handlungen = 1 + info.bildlauf_implizit;
      info.verlassen = k.lage.href.split(':')[0];
      info.hinweise.push(`${k.lage.href.split(':')[0]}-Verweis angetippt (${k.lage.href}) – nicht ausgelöst, die Seite bleibt`);
      return info;
    }
    try {
      // Liegt das Ziel im Bild, aber sein Mittelpunkt unter einer anderen Ebene (z. B. Banner), bekommt Playwright
      // nur eine kurze Frist: wird es nicht frei, ist es für den Besucher verdeckt.
      if (k.lage.imBild && !k.lage.frei) {
        try { await (eingabe === 'touch' ? k.loc.tap({ timeout: 4000 }) : k.loc.click({ timeout: 4000 })); }
        catch (e) { throw new SchrittFehler(`nicht bedienbar: „${s.tippe}“ ist verdeckt durch ${k.lage.verdeckt}`, { kandidaten: k.liste || [kandidatText(k, 0)], pw_log: pwLog(e) }); }
      } else if ((await bediene(k.loc)).unbestaetigt) info.hinweise.push(UNBESTAETIGT);
    } catch (e) {
      if (e instanceof SchrittFehler) throw e;
      const m = /<[^>]+> (?:from <[^>]+> subtree )?intercepts pointer events/.exec(e.message);
      throw new SchrittFehler(m ? `nicht bedienbar: „${s.tippe}“ ist verdeckt – ${kurz(m[0], 160)}` : `Antippen fehlgeschlagen: ${pwGrund(e)}`, { pw_log: pwLog(e) });
    }
    if (k.lage.href && KONTAKT_RE.test(k.lage.href)) info.hinweise.push(`Kontaktlink angetippt (${kurz(k.lage.href, 60)}) – Attrappe: nichts wird gewählt oder gesendet`);
    info.handlungen = 1 + info.bildlauf_implizit;
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  if (art === 'taste') {
    const taste = { Space: ' ', Leertaste: ' ', Leer: ' ' }[s.taste] || s.taste;
    if (s.bis !== undefined) {
      const maxN = Math.min(s.max || MAX_BIS, MAX_BIS);
      const ziel = falte(s.bis);
      const spur = [];
      let erste = null;
      for (let i = 1; i <= maxN; i++) {
        await page.keyboard.press(taste);
        // Eine Abfrage je Tastendruck (unter Last sonst 5 Runden): Aufgaben-Warteschlange leeren (Fokus-Handler),
        // dann Rolle/Name des fokussierten Elements (Näherung wie in der Bedienliste) und Rundlauf-Erkennung.
        const f = await page.evaluate(FOKUS_JETZT).catch(() => ({ beschreibung: '(Fokus nicht lesbar)', name: '', text: '', istErste: false }));
        const b = f.beschreibung;
        spur.push(b);
        const istErste = f.istErste;
        if (falte(f.name).includes(ziel) || falte(f.text).includes(ziel) || falte(b).includes(ziel)) {
          const genau = await page.locator('*:focus').first().count() ? await beschreibe(page.locator('*:focus').first()) : b; spur[spur.length - 1] = genau;
          info.handlungen = i; info.spur = spur.slice(-12); info.hinweise.push(`${i}× ${s.taste} bis „${s.bis}“`);
          await page.evaluate(() => { delete window.__probelaufErster; });
          Object.assign(info, { ruhe: await nachAktion() });
          return info;
        }
        if (istErste && i > 1) { erste = i; break; }
      }
      await page.evaluate(() => { delete window.__probelaufErster; }).catch(() => {});
      throw new SchrittFehler(erste ? `nicht erreichbar: „${s.bis}“ – der Fokus kehrte nach ${erste - 1}× ${s.taste} zum Anfang zurück, ohne es zu erreichen` : `nicht erreicht: „${s.bis}“ nach ${maxN}× ${s.taste}`, { kandidaten: spur.slice(-15).map((x, i) => `Fokus ${spur.length - Math.min(15, spur.length) + i + 1}: ${x}`) });
    }
    const mal = Math.max(1, Math.min(s.mal || 1, MAX_BIS));
    const spur = [];
    for (let i = 0; i < mal; i++) {
      if ((taste === 'Enter' || taste === ' ') && eingabe === 'tastatur') {
        const f = await fokusInfo(page);
        if (f.href && /^(tel|mailto|sms):/i.test(f.href)) { info.verlassen = f.href.split(':')[0]; info.hinweise.push(`${f.href.split(':')[0]}-Verweis ausgelöst (${f.href}) – außerhalb der Website, nicht ausgeführt`); continue; }
      }
      await page.keyboard.press(taste);
      if (mal > 1) { await page.evaluate(() => new Promise((r) => setTimeout(() => setTimeout(r, 0), 0))).catch(() => {}); const f = page.locator('*:focus'); spur.push((await f.count()) ? await beschreibe(f.first()) : '(kein Fokus)'); }
    }
    info.handlungen = mal; if (spur.length) info.spur = spur.slice(-12);
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  if (art === 'fuelle') {
    const { feld, text } = s.fuelle || {};
    if (text === undefined) throw new SchrittFehler('fuelle braucht {feld?, text}');
    if (eingabe === 'tastatur' || !feld) {
      const f = await fokusInfo(page);
      if (!f.editierbar || f.istSelect) throw new SchrittFehler(`fuelle: der Fokus steht nicht auf einem Eingabefeld (Fokus: ${f.beschreibung})${eingabe === 'tastatur' ? ' – erst per Tab dorthin' : ''}`);
      if (feld) {
        const k = await loese(page, String(feld), { rollen: ROLLEN_FELD, feld: true, nr: s.nr }).catch(() => null);
        const istEs = k ? await k.loc.evaluate((el) => el === document.activeElement || el.contains(document.activeElement)) : false;
        if (!istEs) throw new SchrittFehler(`fuelle: Fokus steht nicht auf Feld „${feld}“ (Fokus: ${f.beschreibung}) – erst per Tab dorthin`);
      }
      await page.locator('*:focus').first().fill(String(text), { timeout: AKTION_TIMEOUT });
      info.ziel_element = f.beschreibung;
    } else {
      const k = await loese(page, String(feld), { rollen: ROLLEN_FELD, feld: true, nr: s.nr, inBereich: s.in });
      info.ziel_element = `${k.beschreibung}${k.lage.bereich ? ` · ${k.lage.bereich}` : ''}`;
      if (!k.lage.editierbar) throw new SchrittFehler(`fuelle: „${feld}“ ist kein Eingabefeld (${k.beschreibung})`);
      if (!k.lage.imBild || k.lage.oben < 0 || k.lage.unten > k.lage.vh) {
        const dist = k.lage.unten > k.lage.vh ? k.lage.unten - k.lage.vh : Math.max(0, -k.lage.oben);
        info.bildlauf_implizit = Math.max(1, Math.ceil(dist / k.lage.vh));
        info.hinweise.push(`Feld lag außerhalb des Bildes – ${info.bildlauf_implizit} Bildlauf-Handlung(en) gezählt`);
      }
      try {
        if ((await bediene(k.loc)).unbestaetigt) info.hinweise.push(UNBESTAETIGT);
        await k.loc.fill(String(text), { timeout: AKTION_TIMEOUT });
      } catch (e) { throw new SchrittFehler(`Feld „${feld}“ nicht bedienbar: ${pwGrund(e)}`); }
    }
    info.handlungen = 1 + info.bildlauf_implizit;
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  if (art === 'waehle') {
    const { feld, option } = s.waehle || {};
    if (option === undefined) throw new SchrittFehler('waehle braucht {feld?, option}');
    let ziel;
    if (eingabe === 'tastatur' || !feld) {
      const f = await fokusInfo(page);
      if (!f.istSelect) throw new SchrittFehler(`waehle: der Fokus steht nicht auf einer Auswahlliste (Fokus: ${f.beschreibung})${eingabe === 'tastatur' ? ' – im Tastatur-Modus nur auf die fokussierte Auswahlliste; Optionsknöpfe mit Tab/Pfeiltasten/Space' : ''}`);
      ziel = page.locator('*:focus').first(); info.ziel_element = f.beschreibung;
    } else {
      const k = await loese(page, String(feld), { rollen: ROLLEN_FELD, feld: true, nr: s.nr, inBereich: s.in });
      info.ziel_element = `${k.beschreibung}${k.lage.bereich ? ` · ${k.lage.bereich}` : ''}`;
      if (!k.lage.imBild || k.lage.oben < 0 || k.lage.unten > k.lage.vh) {
        const dist = k.lage.unten > k.lage.vh ? k.lage.unten - k.lage.vh : Math.max(0, -k.lage.oben);
        info.bildlauf_implizit = Math.max(1, Math.ceil(dist / k.lage.vh));
      }
      if (!k.lage.istSelect) { // Optionsgruppe: Option darin antippen
        const opt = await loese(page, String(option), { rollen: ['radio', 'button', 'option', 'checkbox', 'switch', 'tab'] , inBereich: undefined }).catch(() => null);
        if (!opt) throw new SchrittFehler(`waehle: Option „${option}“ in „${feld}“ nicht gefunden`);
        try { if ((await bediene(opt.loc)).unbestaetigt) info.hinweise.push(UNBESTAETIGT); } catch (e) { throw new SchrittFehler(`Option „${option}“ nicht bedienbar: ${pwGrund(e)}`); }
        info.handlungen = 1 + info.bildlauf_implizit;
        Object.assign(info, { ruhe: await nachAktion() });
        return info;
      }
      ziel = k.loc;
      try { if (eingabe === 'touch') await k.loc.tap({ trial: true, timeout: AKTION_TIMEOUT }); else await k.loc.click({ trial: true, timeout: AKTION_TIMEOUT }); } catch (e) { throw new SchrittFehler(`Auswahlliste „${feld}“ nicht bedienbar: ${pwGrund(e)}`); }
    }
    try { await ziel.selectOption({ label: String(option) }, { timeout: AKTION_TIMEOUT }); } catch {
      try { await ziel.selectOption(String(option), { timeout: AKTION_TIMEOUT }); } catch (e) {
        const opts = await ziel.evaluate((el) => [...el.options].map((o) => o.label)).catch(() => []);
        throw new SchrittFehler(`waehle: Option „${option}“ gibt es nicht`, { kandidaten: opts.map((o, i) => `${i + 1}) ${o}`) });
      }
    }
    info.handlungen = 1 + info.bildlauf_implizit;
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  if (art === 'scrolle') {
    const vh = V.height; const w = s.scrolle;
    let dy;
    if (w === 'unten') dy = Math.round(vh * 0.85);
    else if (w === 'oben') dy = -Math.round(vh * 0.85);
    else if (w === 'ende') dy = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY);
    else if (w === 'anfang') dy = -(await page.evaluate(() => scrollY));
    else if (typeof w === 'number' || /^-?\d+$/.test(String(w))) dy = Number(w);
    else throw new SchrittFehler(`scrolle: „${w}“ unbekannt ("unten", "oben", "ende", "anfang" oder Pixel)`);
    const bewegt = await scrolleUm(dy);
    info.handlungen = Math.max(1, Math.ceil(Math.abs(bewegt) / vh - 0.001));
    info.hinweise.push(`Bildlauf ${bewegt} px${bewegt === 0 ? ' (Seite bewegte sich nicht – Anfang/Ende erreicht)' : ''}`);
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  if (art === 'wische') {
    // Waagerechte Leiste (Karussell, Chips) mit dem Finger/Mausrad seitlich bewegen. "links" = Finger nach links,
    // zeigt, was rechts liegt; "rechts" = zurück. "an": sichtbarer Text eines Elements in der Leiste.
    if (eingabe === 'tastatur') throw new SchrittFehler('wischen ist im Tastatur-Modus nicht erlaubt – Tab/Pfeiltasten mit "taste" nutzen');
    if (!['links', 'rechts'].includes(s.wische) || !s.an) throw new SchrittFehler('wische braucht "links"|"rechts" und "an": "<sichtbarer Text in der Leiste>"');
    const k = await loese(page, String(s.an), { nr: s.nr, inBereich: s.in });
    if (!k.lage.imBild) throw new SchrittFehler(`wische: „${s.an}“ liegt nicht im Bild – erst dorthin scrollen`);
    const leiste = await k.loc.evaluate((el) => {
      for (let p = el; p && p !== document.body; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (['auto', 'scroll'].includes(cs.overflowX) && p.scrollWidth > p.clientWidth + 2) { const r = p.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), breite: p.clientWidth, links: p.scrollLeft, max: p.scrollWidth - p.clientWidth }; }
      }
      return null;
    });
    if (!leiste) throw new SchrittFehler(`wische: an „${s.an}“ gibt es keine waagerecht verschiebbare Leiste`);
    const dx = (s.wische === 'links' ? 1 : -1) * Math.round(leiste.breite * 0.85);
    await page.mouse.move(Math.min(Math.max(leiste.x, 1), V.width - 1), Math.min(Math.max(leiste.y, 1), V.height - 1));
    await page.mouse.wheel(dx, 0);
    // Zustandsabfrage: Leiste steht still (3 Abfragen in Folge gleich, max 2 s)
    let gleich = 0, letzt = null, jetzt = leiste.links; const t0 = Date.now();
    while (gleich < 3 && Date.now() - t0 < 2000) { jetzt = await k.loc.evaluate((el, x0) => new Promise((r) => setTimeout(() => { for (let p = el; p && p !== document.body; p = p.parentElement) { const cs = getComputedStyle(p); if (['auto', 'scroll'].includes(cs.overflowX) && p.scrollWidth > p.clientWidth + 2) return r(p.scrollLeft); } r(x0); }, 50)), leiste.links).catch(() => letzt); gleich = jetzt === letzt ? gleich + 1 : 0; letzt = jetzt; }
    const bewegt = (jetzt ?? leiste.links) - leiste.links;
    info.handlungen = Math.max(1, Math.ceil(Math.abs(bewegt) / leiste.breite - 0.001));
    info.ziel_element = `Leiste an ${k.beschreibung}`;
    info.hinweise.push(`Leiste ${bewegt} px seitlich${bewegt === 0 ? ' (bewegte sich nicht – Ende erreicht)' : ''}`);
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  if (art === 'warte_auf') {
    const t = String(s.warte_auf);
    try { await page.getByText(t).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: WARTE_TIMEOUT }); }
    catch { throw new SchrittFehler(`„${t}“ erschien nicht innerhalb von ${WARTE_TIMEOUT / 1000} s`, { kandidaten: await aehnliche(page, t) }); }
    info.handlungen = 0;
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  if (art === 'zurueck') {
    const r = await page.goBack({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => null);
    if (r === null && page.url() === 'about:blank') throw new SchrittFehler('zurück nicht möglich');
    info.handlungen = 1;
    Object.assign(info, { ruhe: await nachAktion() });
    return info;
  }
  return info;
}

// ---- Start
let exitCode = 0;
const zeilen = [];
const druck = (z) => { zeilen.push(z); console.log(z); };
druck(`probelauf ${lauf} · Satz ${satz} · ${ansicht} · ${eingabe} · Start ${start}${aufgabe ? ` · Aufgabe ${def.aufgabe} „${aufgabe.titel}“` : ''}${stoerCss ? ' · GEGENPROBE (Störung)' : ''}`);
let letzte = null;
try {
  const t0 = Date.now();
  await page.goto(BASE + start, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await bereit(page);
  // Einwilligungsbanner (Erstbesuch) erscheint verzögert – auf Erscheinen warten (Abfrage alle 100 ms, Obergrenze BANNER_TIMEOUT).
  bedingungen.banner_erschienen = await page.waitForFunction(() => [...document.querySelectorAll('[role=dialog],[role=alertdialog],dialog[open]')].some((d) => {
    const r = d.getBoundingClientRect(); return r.width > 1 && r.height > 1 && /cookie|einwillig|datenschutz|privatsph/i.test((d.getAttribute('aria-label') || '') + ' ' + d.textContent.slice(0, 400));
  }), null, { timeout: BANNER_TIMEOUT, polling: 100 }).then(() => true).catch(() => false);
  const ruhe0 = await beruhige(page, netz);
  letzte = await festhalten(0, 'start');
  ergebnis.schritte.push({ nr: 0, art: 'start', eingabe: { start }, ergebnis: 'ok', handlungen: 0, summe: 0, url: letzte.url, h1: letzte.h1, ebenen: letzte.ebenen, fokus: letzte.fokus, dateien: letzte.dateien, ruhe: ruhe0, festhalten_ms: letzte.zeiten, dauer_ms: Date.now() - t0 });
  druck(` 00 start${' '.repeat(36)}→ ${letzte.url} · H1 „${kurz(letzte.h1, 60)}“${letzte.ebenen.length ? ` · Ebenen: ${letzte.ebenen.join(' | ')}` : ''}`);

  for (let i = 0; i < schritte.length; i++) {
    const s = schritte[i]; const nr = i + 1; const t1 = Date.now();
    let info;
    try { info = await fuehreAus(s, nr); } catch (e) {
      const grund = e instanceof SchrittFehler ? e.grund : `Werkzeugfehler: ${kurz(e.message, 200)}`;
      const shot = await festhalten(nr, 'fehler', { ziel: false }).catch(() => null);
      ergebnis.abbruch = { schritt: nr, eingabe: s, grund, kandidaten: e.kandidaten || [], pw_log: e.pw_log || null, url: shot ? shot.url : page.url(), dateien: shot ? shot.dateien : null };
      ergebnis.schritte.push({ nr, art: schrittArt(s), eingabe: s, ergebnis: 'fehler', grund, handlungen: 0, summe, url: shot?.url, dateien: shot?.dateien, dauer_ms: Date.now() - t1 });
      druck(` ${zwei(nr)} ${schrittText(s).padEnd(40)} ✗ ABBRUCH: ${grund}`);
      for (const k of e.kandidaten || []) druck(`      · ${k}`);
      letzte = shot; exitCode = 2;
      break;
    }
    summe += info.handlungen;
    // Telefon/WhatsApp-Klicks, die das Init-Skript abgefangen hat (Attrappe, nichts wurde ausgelöst)
    for (const ziel of await page.evaluate(() => (window.__relaunchKontakt || []).splice(0)).catch(() => [])) protokoll.push({ art: 'kontakt_angetippt', ziel: kurz(ziel, 120), schritt: nr, attrappe: true });
    const stand = await festhalten(nr, schrittArt(s));
    letzte = stand;
    const opened = stand.opened.length ? stand.opened : [];
    const host = (() => { try { const u = new URL(page.url()); return ['127.0.0.1', 'localhost'].includes(u.hostname) ? null : u.hostname; } catch { return null; } })();
    if (host) { info.hinweise.push(`Website verlassen: ${host} (Sperre liefert leere Seite)`); ergebnis.verlassen.push({ schritt: nr, ziel: host }); }
    if (info.verlassen) ergebnis.verlassen.push({ schritt: nr, ziel: info.verlassen });
    if (opened.length) { info.hinweise.push(`window.open abgefangen: ${opened.map((x) => kurz(x, 60)).join(', ')}`); ergebnis.verlassen.push({ schritt: nr, ziel: 'window.open', urls: opened }); await page.evaluate(() => { window.__relaunchOpened = []; }).catch(() => {}); }
    if (info.ruhe?.neuesFenster) info.hinweise.push('neues Fenster/Tab geöffnet – der Lauf geht dort weiter');
    if (eingabe === 'tastatur' && stand.fokus && stand.fokus.beschreibung && !stand.fokus.beschreibung.startsWith('(kein') && !stand.fokus.imBild) info.hinweise.push('Fokus liegt außerhalb des sichtbaren Ausschnitts');
    ergebnis.schritte.push({ nr, art: schrittArt(s), eingabe: s, ergebnis: 'ok', ziel_element: info.ziel_element || null, auswahl: info.auswahl || null, handlungen: info.handlungen, bildlauf_implizit: info.bildlauf_implizit || 0, summe, url: stand.url, h1: stand.h1, scrollY: stand.scrollY, ebenen: stand.ebenen, fokus: stand.fokus, spur: info.spur || null, hinweise: info.hinweise, ruhe: info.ruhe, dateien: stand.dateien, festhalten_ms: stand.zeiten, dauer_ms: Date.now() - t1 });
    const fokusTxt = stand.fokus ? ` · Fokus: ${kurz(stand.fokus.beschreibung, 50)}${stand.fokus.imBild === false ? ' (außer Bild)' : ''}` : '';
    druck(` ${zwei(nr)} ${schrittText(s).padEnd(40)} ✓ ${info.ziel_element ? `${kurz(info.ziel_element, 60)} · ` : ''}+${info.handlungen} = ${summe} · ${stand.url}${fokusTxt}${info.hinweise.length ? ` · ${info.hinweise.join(' · ')}` : ''}`);
  }
} catch (e) {
  ergebnis.abbruch = { schritt: null, grund: `Werkzeugfehler beim Start: ${kurz(e.message, 300)}` };
  druck(` ✗ Werkzeugfehler beim Start: ${kurz(e.message, 300)}`);
  exitCode = 2;
}
ergebnis.handlungen_gesamt = summe;
// Antwort des Besuchers: am Laufende abgegeben (nur bei lauffähigem Lauf ohne Abbruch)
if (aufgabe && !ergebnis.abbruch) {
  aufgabe.ziel.forEach((b, i) => {
    if (zielStand[i].erfuellt || b.art !== 'antwort') return;
    const t = pruefeBedingung(b, { antwort: def.antwort ?? null });
    if (t) Object.assign(zielStand[i], { erfuellt: true, bei_schritt: schritte.length, treffer: t });
  });
  if (zielErreichtBei === null && zielStand.every((s) => s.erfuellt)) { zielErreichtBei = schritte.length; handlungenBisZiel = summe; }
}
if (aufgabe) {
  ergebnis.ziel = { geprueft: true, erreicht: zielErreichtBei !== null, bei_schritt: zielErreichtBei, handlungen_bis_ziel: handlungenBisZiel, bedingungen: zielStand };
}
fs.writeFileSync(path.join(ausDir, 'lauf.json'), JSON.stringify(ergebnis, null, 1));
await browser.close();

if (aufgabe) {
  druck(`Ziel: ${zielErreichtBei !== null ? `ERREICHT bei Schritt ${zwei(zielErreichtBei)} · Handlungen bis Ziel ${handlungenBisZiel}` : 'nicht erreicht'} · Handlungen gesamt ${summe}`);
  for (const z of zielStand) druck(`   ${z.erfuellt ? '✓' : '·'} ${z.name}${z.erfuellt ? ` (Schritt ${zwei(z.bei_schritt)})` : ''}`);
} else druck(`Handlungen gesamt ${summe} (keine Aufgabe angegeben – keine Zielprüfung)`);
if (ergebnis.verlassen.length) druck(`Website verlassen/extern: ${ergebnis.verlassen.map((v) => `Schritt ${zwei(v.schritt)} ${v.ziel}`).join(', ')}`);
if (letzte && letzte.dateien) druck(`Letztes Bild: ${path.join(ausDir, letzte.dateien.bild)}`);
if (!still && letzte && letzte.bed) { // nummerierte Bedienliste des letzten Bildes: {"tippe": {"nr": n}} tippt Nr. n
  druck(`Im letzten Bild (${letzte.url}, scrollY ${letzte.scrollY ?? '?'} von ${letzte.seitenhoehe ?? '?'}) antippbar/fokussierbar, Nr. = {"tippe": {"nr": n}}:`);
  letzte.bed.forEach((b, j) => druck(`   ${j + 1}) ${b.beschreibung}${b.frei ? '' : ` (verdeckt durch ${b.verdeckt})`}`));
  if (letzte.ebenen?.length) druck(`Offene Ebenen: ${letzte.ebenen.join(' | ')}`);
}
druck(`Dateien: ${ausDir}/`);
process.exit(exitCode);

// ---------------------------------------------------------------------------------------------------------
// Matrix: Übersicht aller Läufe eines Satzes
// ---------------------------------------------------------------------------------------------------------
function matrix() {
  const dir = path.join(AUSGABE_WURZEL, satz);
  if (!fs.existsSync(dir)) { console.error(`Kein Satz ${satz} unter ${dir}`); process.exit(1); }
  const laeufe = [];
  for (const d of fs.readdirSync(dir)) {
    const f = path.join(dir, d, 'lauf.json'); if (!fs.existsSync(f)) continue;
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    laeufe.push({ lauf: j.lauf, aufgabe: j.aufgabe, person: j.bedingungen.person?.kennung || null, modus: `${j.bedingungen.ansicht} ${j.bedingungen.eingabe}`, geloest: j.ziel ? j.ziel.erreicht : null, handlungen_bis_ziel: j.ziel ? j.ziel.handlungen_bis_ziel : null, handlungen_gesamt: j.handlungen_gesamt, abbruch: j.abbruch ? j.abbruch.grund : null, gegenprobe: !!j.bedingungen.stoerung || !!j.gegenprobe, befunde: Array.isArray(j.befunde) ? j.befunde : [], erstellt: j.erstellt });
  }
  laeufe.sort((a, b) => (a.aufgabe || 9) - (b.aufgabe || 9) || a.modus.localeCompare(b.modus));
  // Spalten: Modi (Ansicht Eingabe) aus den Läufen; Zeilen: Aufgabe und Person. Je Zelle zählt der letzte Lauf.
  const modi = [...new Set(laeufe.map((x) => x.modus))].sort();
  const zeilen = [...new Set(laeufe.map((x) => `${x.aufgabe || '-'}|${x.person || '-'}`))].sort();
  console.log(`Satz ${satz} · ${laeufe.length} Läufe\nAufgabe · Person | ${modi.join(' | ')}`);
  for (const z of zeilen) {
    const [n, p] = z.split('|');
    const zellen = modi.map((m) => { const l = laeufe.filter((x) => String(x.aufgabe || '-') === n && (x.person || '-') === p && x.modus === m && !x.gegenprobe).sort((a, b) => String(a.erstellt).localeCompare(String(b.erstellt))); if (!l.length) return '–'; const x = l[l.length - 1]; const hoch = x.befunde.filter((b) => b.schwere === 'hoch').length; return (x.geloest ? `gelöst ${x.handlungen_bis_ziel}` : `offen${x.abbruch ? ' (Abbruch)' : ''}`) + (x.befunde.length ? ` · ${x.befunde.length} Befund(e)${hoch ? `, ${hoch} hoch` : ''}` : ''); });
    console.log(`A${n} ${p} | ${zellen.join(' | ')}`);
  }
  const zusammen = { satz, base: BASE, bedingungen: { quelle: 'lauf.json je Lauf (Messbedingungen dort)', modi, protokoll: '_werkstatt/werkzeuge/PROBELAUF.md' }, erstellt: new Date().toISOString(), laeufe };
  fs.writeFileSync(path.join(dir, 'matrix.json'), JSON.stringify(zusammen, null, 1));
  console.log(`→ ${path.relative(path.resolve(RELAUNCH, '..'), path.join(dir, 'matrix.json'))}`);
  if (flag('beleg')) { // Zusammenfassung als Beleg (nur wenn das Paket Schreibrechte unter belege/ gibt)
    const ziel = path.join(RELAUNCH, 'belege', satz, 'probelauf.json'); ensureDir(path.dirname(ziel));
    fs.writeFileSync(ziel, JSON.stringify(zusammen, null, 1)); console.log(`→ ${path.relative(path.resolve(RELAUNCH, '..'), ziel)}`);
  }
}
