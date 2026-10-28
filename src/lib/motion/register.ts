// Bewegungsregister (KERN K-008, Register v4 nach AUFTRAG Abschnitt 8; UM-E3-REG) – Maschinenfassung.
// Jedes animierte Element trägt data-motion="<Kennung>"; Startzustände hängen nur an html.k-bewegung.
// Zwei Teile:
//   - REGISTER: was das Bewegungsmodul zur Laufzeit braucht (Auslöser, Schwellen, Aliase). Klein, weil es im ersten Laden
//     steht (bewegung.ts).
//   - REGISTER_V4: Zweck, Stufen (Dauer, Kurve, Staffel), ruhige Fassung, Notaus und die Cursor-Zustände je Kennung. Kein
//     Laufzeitcode liest es, darum lässt der Bau es weg (Bewegung 10 hält fest, dass außer dieser Datei kein Quelltext unter
//     src die v4-Werte nennt). Es ist die Quelle für _werkstatt/register.json, für die Prüfwerkzeuge und für
//     test/bewegung.test.mjs, der es gegen bewegung.css, globals.css und den Cursor prüft.
// Die SVG-Bewegungen aus v2 (Kreuzlinie, Flucht, Plan, Einzugsband, Szene Ablauf, Fugenband) sind seit E-037 fester Teil des
// Systems (Entscheidung des Auftraggebers; vorher als entfallend markiert, E-009). `entfaellt` bleibt als Feld für künftige
// Abbauten. B-01 „verlegen“ (seit E-043 Fliese für Fliese) steuert seine Schicht selbst (WAAPI).
// Eingang ohne Vorhang (E-067-4, UM-E3-EIN): `eingang` (Behälter im Kopf und im Einstieg) und `zeilenmaske` (Zeilen der H1)
// laufen als CSS ab dem ersten Bild, gesteuert über Klassen aus dem Kopfskript; das Modul fasst sie nicht an. Die v3-Namen
// `intro` (B-02, Kalkblatt) und `startbild` (Belag über dem Foto) sind darin aufgegangen und bleiben als Alias registriert:
// ohne eigene Bewegung, ohne Beobachter und ohne Ladezustand, damit Belege, Werkzeuge und ältere Verweise weiter auflösen.
// Cursor (E-067-1, UM-E3-CURSOR): `cursor` am Schild neben dem Systemzeiger; src/lib/motion/cursor.ts steuert es selbst.

export type Ausloeser = 'laden' | 'sicht' | 'scroll' | 'interaktion';

export interface Registereintrag {
  ausloeser: Ausloeser;
  /** Sichtbarkeitsschwelle (0–1) für Auslöser „sicht“ */
  schwelle?: number;
  /** nur auf groben Zeigegeräten über Sichtbarkeit auslösen (sonst Hover/Fokus) */
  nurGrob?: boolean;
  /** v2-Eintrag, der in KERN v3 entfällt; bleibt registriert, bis keine Seite ihn mehr nutzt */
  entfaellt?: boolean;
  /** alter Name einer Kennung, die in der genannten aufgegangen ist (E-067-4): keine eigene Bewegung */
  alias?: string;
}

export const REGISTER: Record<string, Registereintrag> = {
  // v3 (K-007): Seitenwechsel; Plan-Morph zurück nach E-037 (View Transition beim Klick, Typ plan-vor)
  verlegen: { ausloeser: 'interaktion' },
  seitenwechsel: { ausloeser: 'interaktion' },
  // v4 (E-067-4): Eingang ohne Vorhang und Zeilenmasken der H1 („An der Schnur“, E-067-1)
  eingang: { ausloeser: 'laden' },
  zeilenmaske: { ausloeser: 'laden' },
  // v3-Namen, im Eingang aufgegangen (E-067-4): Intro B-02 und Belag des Startbilds
  intro: { ausloeser: 'laden', alias: 'eingang' },
  startbild: { ausloeser: 'laden', alias: 'eingang' },
  // aus v2, bleiben
  verband: { ausloeser: 'interaktion' },
  leitachse: { ausloeser: 'scroll' },
  anriss: { ausloeser: 'sicht', schwelle: 0.5 },
  auftritt: { ausloeser: 'sicht', schwelle: 0.2 },
  aufklappen: { ausloeser: 'interaktion' },
  druck: { ausloeser: 'interaktion' },
  zustand: { ausloeser: 'interaktion' },
  notiert: { ausloeser: 'interaktion' },
  laden: { ausloeser: 'interaktion' },
  // aus v2, fester Teil des Systems seit E-037 (vorher E-009 entfallend)
  'sig-kreuzlinie': { ausloeser: 'laden' },
  'sig-flucht': { ausloeser: 'laden' },
  'szene-ablauf': { ausloeser: 'scroll' },
  'sig-plan': { ausloeser: 'sicht', schwelle: 0.4, nurGrob: true },
  // E4-NACH-02: legt sich beim Laden per CSS frei (Planblatt des Einstiegs), kein Beobachter
  einzugsband: { ausloeser: 'laden' },
  // UM-E3-REG: registriert und als CSS gebaut, zurzeit ohne Ort (REGISTER_V4.fugenband.ohneOrt)
  fugenband: { ausloeser: 'scroll' },
  // große Momente (KERN v3.4 K-007, E3-ORCH-02a; E3-GRAF-01 bis 09): Szenen scroll-gebunden per CSS, Sicht 0,4 über das
  // Modul (data-motion-stand), Regler und Auswahl ohne Beobachter; verband steht oben
  schichten: { ausloeser: 'scroll' },
  weg: { ausloeser: 'scroll' },
  'gefaelle-dusche': { ausloeser: 'sicht', schwelle: 0.4 },
  'gefaelle-balkon': { ausloeser: 'sicht', schwelle: 0.4 },
  formatregler: { ausloeser: 'interaktion' },
  'vorher-nachher': { ausloeser: 'interaktion' },
  karte: { ausloeser: 'sicht', schwelle: 0.4 },
  'galerie-filter': { ausloeser: 'interaktion' },
  // Ruhe (KERN v3.6 K-016, E-047): Laufband und Reihen steuert der Baustein selbst (Selbstlauf, Anhalten), kein Beobachter
  karussell: { ausloeser: 'interaktion' },
  // v4 (E-067-1, UM-E3-CURSOR): Fugenkreuz am Systemzeiger, nur feiner Zeiger; Zustände in REGISTER_V4.cursor.zustaende
  cursor: { ausloeser: 'interaktion' },
};

export const KENNUNGEN = Object.keys(REGISTER);

/** Kennungen, die das Modul per IntersectionObserver auslöst (abhängig vom Zeigegerät). */
export function beobachteteKennungen(grobesZeigegeraet: boolean): string[] {
  return KENNUNGEN.filter((k) => {
    const e = REGISTER[k];
    if (e.ausloeser !== 'sicht' || e.alias) return false;
    return e.nurGrob ? grobesZeigegeraet : true;
  });
}

/** Kennungen, die beim Laden sofort in den Endzustand wechseln (data-motion im Inhalt; SELBST und Aliase ausgenommen). */
export function ladeKennungen(): string[] {
  return KENNUNGEN.filter((k) => REGISTER[k].ausloeser === 'laden' && !SELBST.includes(k) && !REGISTER[k].alias);
}

/** Kennungen mit eigener Steuerung (Komponente mit WAAPI bzw. CSS ab dem ersten Bild, Cursor-Modul), nicht über
 *  data-motion und Beobachter. */
export const SELBST = ['verlegen', 'seitenwechsel', 'eingang', 'zeilenmaske', 'cursor'];

/** Aliase (E-067-4): alte Namen, die in einer anderen Kennung aufgegangen sind. */
export function aliasKennungen(): string[] {
  return KENNUNGEN.filter((k) => REGISTER[k].alias !== undefined);
}

/** Löst einen Alias auf (sonst die Kennung selbst). */
export function aufgeloest(kennung: string): string {
  return REGISTER[kennung]?.alias ?? kennung;
}

/** v2-Einträge, die in KERN v3 entfallen (E-009). */
export function entfallendeKennungen(): string[] {
  return KENNUNGEN.filter((k) => REGISTER[k].entfaellt === true);
}

export function schwelleFuer(kennung: string): number {
  return REGISTER[kennung]?.schwelle ?? 0.2;
}

export function istRegistriert(kennung: string): boolean {
  return Object.prototype.hasOwnProperty.call(REGISTER, kennung);
}

// ---------------------------------------------------------------------------------------------------------------------
// Register v4 (AUFTRAG Abschnitt 8: Kennung, Zweck, Auslöser, Stufen, Verhalten bei reduzierter Bewegung; K-008 Regeln v4)

/** Zweck einer Bewegung (AUFTRAG Abschnitt 8). Was keinen Zweck hat, entfällt. */
export const ZWECKE = ['orientierung', 'rueckmeldung', 'zusammenhang', 'hierarchie', 'charakter'] as const;
export type Zweck = (typeof ZWECKE)[number];

/** Dauer-Tokens aus globals.css: sechs Stufen und die Ablauflängen (K-005), als Name der CSS-Variable. So erzeugt Tailwind
 *  aus diesen Zeichenketten keine Hilfsklassen, die keine Seite braucht (Tailwind liest auch diese Datei). */
export const DAUER_TOKENS = [
  '--dauer-0',
  '--dauer-1',
  '--dauer-2',
  '--dauer-3',
  '--dauer-4',
  '--dauer-5',
  '--verlegen-gesamt',
  '--verlegen-gesamt-folge',
  '--verlegen-ruhig',
  '--band-durchlauf',
] as const;
/** Dazu zwei Bindungen ohne Zeit: `scroll` (am Scrollweg, linear) und `eingabe` (folgt dem Regler direkt). */
export type Dauer = (typeof DAUER_TOKENS)[number] | 'scroll' | 'eingabe';

/** Vier Kurven aus globals.css (Name der CSS-Variable) und die Plattformkurve linear (K-005). */
export const KURVEN = ['--ease-setzen', '--ease-laser', '--ease-weg', '--ease-aufsetzen', 'linear'] as const;
export type Kurve = (typeof KURVEN)[number];

/** Staffel (K-005, K-008 Regeln v4): höchstens acht Takte, also Stufen 0 bis 7 in Vielfachen von --staffel (60 ms),
 *  wie STAFFEL_MAX der Galerie. Eine Stufe ist ein Zähler, keine Dauer. */
export const LETZTE_STUFE_HOECHSTENS = 7;

/** Ruhige Fassung (reduzierte Bewegung und Bewegungsschalter „ruhig“, E-080):
 *  sofort = Sofortzustand (Endzustand ohne Bewegung) · ueberblendung = kurze Überblendung statt Bewegung ·
 *  gleich = folgt der Eingabe direkt, in beiden Fassungen gleich · grundform = eigene ruhige Form ohne Bewegung. */
export const REDUZIERT_ARTEN = ['sofort', 'ueberblendung', 'gleich', 'grundform'] as const;
export type ReduziertArt = (typeof REDUZIERT_ARTEN)[number];

/** Notaus (html.k-notaus, 2 s ohne Meldung des Moduls): endzustand = Startzustände fallen weg, alles steht fertig ·
 *  laeuft = kein Startzustand, verbirgt nichts, läuft weiter · ruhig = wie die ruhige Fassung. */
export const NOTAUS_ARTEN = ['endzustand', 'laeuft', 'ruhig'] as const;
export type NotausArt = (typeof NOTAUS_ARTEN)[number];

export interface Stufen {
  /** alle Dauer-Tokens, die die Kennung liest (auch die der kurzen Fassungen) */
  dauer: readonly Dauer[];
  /** alle Kurven; leer, wenn nichts in der Zeit läuft (Regler) */
  kurve: readonly Kurve[];
  /** letzte Staffelstufe in bewegung.css (Vielfaches von --staffel, ein Zähler); fehlt ohne Staffel */
  letzteStufe?: number;
}

/** Ein Cursor-Zustand (K-008 Regeln v4; Mikrotext und Orte in src/lib/motion/cursor.ts, CURSOR_REGISTER). */
export interface CursorZustandV4 {
  /** Beschriftung am Schild (Mikrotext, K-011); leer: nur das Fugenkreuz */
  beschriftung: string;
  wo: string;
  zweck: Zweck;
  stufen: Stufen;
  ruhig: string;
}

export interface V4Eintrag {
  zweck: Zweck;
  /** was die Bewegung zeigt */
  was: string;
  stufen: Stufen;
  reduziert: { art: ReduziertArt; text: string };
  notaus: NotausArt;
  /** gebaut, aber zurzeit auf keiner Seite: der Grund */
  ohneOrt?: string;
  hinweis?: string;
  /** nur cursor: die Zustände in der Reihenfolge von CURSOR_ZUSTAENDE */
  zustaende?: Readonly<Record<string, CursorZustandV4>>;
}

const CURSOR_STUFEN: Stufen = { dauer: ['--dauer-1'], kurve: ['--ease-setzen'] };
const CURSOR_RUHIG = 'ohne Übergang an derselben Stelle, die Beschriftung bleibt';

/** Register v4 je Kennung; Aliase (intro, startbild) lösen über `aufgeloest` auf ihren Eintrag auf. */
export const REGISTER_V4: Record<string, V4Eintrag> = {
  verlegen: {
    zweck: 'zusammenhang',
    was: 'Seitenwechsel Fliese für Fliese mit dem Logo auf der Wand (B-01, eingefroren E-078)',
    stufen: {
      dauer: ['--verlegen-gesamt', '--verlegen-gesamt-folge', '--verlegen-ruhig', '--dauer-1', '--dauer-5'],
      kurve: ['--ease-aufsetzen', '--ease-setzen', '--ease-laser'],
    },
    reduziert: { art: 'ueberblendung', text: 'Überblendung über eine Kalkfläche in --verlegen-ruhig, Logo nur eingeblendet' },
    notaus: 'ruhig',
  },
  seitenwechsel: {
    zweck: 'zusammenhang',
    was: 'Plan-Morph: derselbe Verlegeplan gleitet von /leistungen in den Einstieg der Leistungsseite',
    stufen: { dauer: ['--dauer-2', '--dauer-4'], kurve: ['--ease-setzen'] },
    reduziert: { art: 'ueberblendung', text: 'kein Morph; B-01 übernimmt den Link mit seiner Überblendung' },
    notaus: 'ruhig',
  },
  eingang: {
    zweck: 'charakter',
    was: 'Eingang ohne Vorhang: Logo baut sich im Kopf auf, die Schnur unter der H1 zieht, Ort und Knopfzeile (mittig mit allem darunter) setzen sich, Fugenriss am Foto (E-067-4, UM-E3-FIX)',
    stufen: { dauer: ['--dauer-2', '--dauer-3', '--dauer-4'], kurve: ['--ease-setzen', '--ease-laser', 'linear'], letzteStufe: 8 },
    reduziert: { art: 'sofort', text: 'kein Eingang: alles steht ab dem ersten Bild, das Foto ist nie verdeckt' },
    notaus: 'endzustand',
  },
  zeilenmaske: {
    zweck: 'hierarchie',
    was: 'Die Zeilen der H1 steigen hinter Zeilenmasken auf, eine nach der anderen, auf die Schnur („An der Schnur“)',
    stufen: { dauer: ['--dauer-0', '--dauer-2', '--dauer-3'], kurve: ['--ease-setzen'], letzteStufe: 6 },
    reduziert: { art: 'sofort', text: 'die Zeilen stehen sofort' },
    notaus: 'endzustand',
  },
  verband: {
    zweck: 'rueckmeldung',
    was: 'Das Verlegemuster wechselt mit der Auswahl; nie zwei Raster zugleich',
    stufen: { dauer: ['--dauer-1', '--dauer-3'], kurve: ['--ease-weg', '--ease-setzen'] },
    reduziert: { art: 'sofort', text: 'das Muster wechselt sofort' },
    notaus: 'laeuft',
  },
  leitachse: {
    zweck: 'orientierung',
    was: 'Leitfaden: das rote Lot wächst mit dem Lesen; auf den Erzählseiten der Vorlage steht die Spitze bei 40 % mit der Abschnittsmarke (UM-E3-LEIT); dazu der Lesefortschritt der Ratgeber',
    stufen: { dauer: ['scroll'], kurve: ['linear'] },
    reduziert: { art: 'grundform', text: 'Grundschicht: das graue Lot steht vollständig, kein Rot gezogen, keine Marke; der Lesefortschritt ist ausgeblendet' },
    notaus: 'laeuft',
    hinweis: 'Im Notaus läuft das Lot mit der Marke weiter: kein Startzustand, es verbirgt nichts und braucht kein Skript (UM-E3-LEIT, Entscheidung 5). Nur der Lesefortschritt steht im Notaus bei 0.',
  },
  anriss: {
    zweck: 'hierarchie',
    was: 'Das Schlüsselwort einer Stimme wird von Hand unterstrichen',
    stufen: { dauer: ['--dauer-4'], kurve: ['--ease-setzen'] },
    reduziert: { art: 'sofort', text: 'der Strich steht sofort' },
    notaus: 'endzustand',
  },
  auftritt: {
    zweck: 'hierarchie',
    was: 'Setzen: ein Abschnitt kommt 8 px eingerückt an seinen Platz',
    stufen: { dauer: ['--dauer-3'], kurve: ['--ease-setzen'] },
    reduziert: { art: 'sofort', text: 'der Abschnitt steht sofort an seinem Platz' },
    notaus: 'endzustand',
  },
  aufklappen: {
    zweck: 'rueckmeldung',
    was: 'Menü, Mega-Menü und Akkordeon öffnen und schließen; die Höhe über Rasterzeilen',
    stufen: { dauer: ['--dauer-1', '--dauer-2'], kurve: ['--ease-setzen', '--ease-weg'] },
    reduziert: { art: 'sofort', text: 'öffnet und schließt sofort' },
    notaus: 'laeuft',
  },
  druck: {
    zweck: 'rueckmeldung',
    was: 'Ein Knopf gibt beim Drücken 1 px nach',
    stufen: { dauer: ['--dauer-1'], kurve: ['--ease-setzen'] },
    reduziert: { art: 'sofort', text: 'kein Nachgeben, Farben wechseln sofort' },
    notaus: 'laeuft',
  },
  zustand: {
    zweck: 'rueckmeldung',
    was: 'Farbwechsel bei Hover und Fokus; auf Fotos mit Weg die Glasfläche mit Name und Weg (glasbild)',
    stufen: { dauer: ['--dauer-1', '--dauer-2'], kurve: ['--ease-setzen'] },
    reduziert: { art: 'sofort', text: 'Farben und Glasfläche wechseln sofort' },
    notaus: 'laeuft',
  },
  notiert: {
    zweck: 'rueckmeldung',
    was: 'Der Erfolgshaken zeichnet sich',
    stufen: { dauer: ['--dauer-3'], kurve: ['--ease-setzen'] },
    reduziert: { art: 'sofort', text: 'der Haken steht' },
    notaus: 'laeuft',
  },
  laden: {
    zweck: 'rueckmeldung',
    was: 'Ladeanzeige: eine Fuge läuft, ab 300 ms und mindestens 500 ms (K-010)',
    stufen: { dauer: ['--dauer-5'], kurve: ['linear'] },
    reduziert: { art: 'grundform', text: 'die Fuge steht, die Anzeige und ihr Text bleiben' },
    notaus: 'laeuft',
  },
  'sig-kreuzlinie': {
    zweck: 'charakter',
    was: 'Rote Waage und Lot wachsen aus dem Kreuzpunkt am Lot des Plans (Planblatt-Einstieg)',
    stufen: { dauer: ['--dauer-2', '--dauer-5'], kurve: ['linear'] },
    reduziert: { art: 'sofort', text: 'beide Linien voll' },
    notaus: 'laeuft',
  },
  'sig-flucht': {
    zweck: 'hierarchie',
    was: 'Die Zeilen der H1 rücken 12 px in die Flucht',
    stufen: { dauer: ['--dauer-4'], kurve: ['--ease-setzen'], letzteStufe: 6 },
    reduziert: { art: 'sofort', text: 'die Zeilen stehen in der Flucht' },
    notaus: 'laeuft',
  },
  'szene-ablauf': {
    zweck: 'zusammenhang',
    was: 'So läuft es ab: Raster, Belag, Prüfmarken und Abnahme setzen sich am Scrollweg',
    stufen: { dauer: ['scroll'], kurve: ['linear'] },
    reduziert: { art: 'sofort', text: 'alle drei Zustände fertig' },
    notaus: 'endzustand',
  },
  'sig-plan': {
    zweck: 'orientierung',
    was: 'Das Fugenbild des Verlegeplans rückt in die Flucht',
    stufen: { dauer: ['--dauer-2', '--dauer-3', '--dauer-4'], kurve: ['--ease-setzen', '--ease-laser'] },
    reduziert: { art: 'sofort', text: 'das Raster steht in der Flucht' },
    notaus: 'endzustand',
  },
  einzugsband: {
    zweck: 'orientierung',
    was: 'Die Kante jeder Einsatzzone zieht sich von links auf',
    stufen: { dauer: ['--dauer-3'], kurve: ['--ease-setzen'], letzteStufe: 10 },
    reduziert: { art: 'sofort', text: 'die Kanten stehen voll' },
    notaus: 'endzustand',
  },
  fugenband: {
    zweck: 'orientierung',
    was: 'Rotes Lot an den Jahren der Firmengeschichte, wächst am Scrollweg',
    stufen: { dauer: ['scroll'], kurve: ['linear'] },
    reduziert: { art: 'sofort', text: 'das Lot steht fertig gezogen' },
    notaus: 'laeuft',
    ohneOrt:
      'Entscheidung UM-E3-REG: nicht eingesetzt. Auf /ueber-uns läuft der Leitfaden mit Abschnittsmarke schon neben der Firmengeschichte; ein zweites rotes Lot im selben Bildschirm bräche „Eine Linie führt“ (K-003 Nr. 5). Die Zeitleiste bleibt eine ruhige Fuge in Strich. Das CSS bleibt bereit; entfernt wird es nur nach Rückfrage (E-037).',
  },
  schichten: {
    zweck: 'zusammenhang',
    was: 'Was unter der Fliese steckt: je Satz setzt sich eine Schicht, die Zeichnung klebt',
    stufen: { dauer: ['scroll'], kurve: ['linear'] },
    reduziert: { art: 'sofort', text: 'alle Schichten sichtbar, nichts klebt' },
    notaus: 'endzustand',
  },
  weg: {
    zweck: 'orientierung',
    was: 'Vom Anruf bis zur letzten Fuge: die Laserlinie zieht von Station zu Station',
    stufen: { dauer: ['scroll'], kurve: ['linear'] },
    reduziert: { art: 'sofort', text: 'Linie voll, alle Stationen gesetzt' },
    notaus: 'endzustand',
    ohneOrt: 'E-048: für die Ruhe-Regeln zu unruhig; gebaut, nur im Schaufenster',
  },
  'gefaelle-dusche': {
    zweck: 'zusammenhang',
    was: 'Wasser läuft über das Gefälle zum Ablauf',
    stufen: { dauer: ['--dauer-2', '--dauer-5'], kurve: ['linear', '--ease-setzen'] },
    reduziert: { art: 'sofort', text: 'die Pfeile stehen, kein Tropfen läuft' },
    notaus: 'endzustand',
  },
  'gefaelle-balkon': {
    zweck: 'zusammenhang',
    was: 'Regen läuft vom Balkon ab',
    stufen: { dauer: ['--dauer-2', '--dauer-5'], kurve: ['linear'] },
    reduziert: { art: 'sofort', text: 'der Tropfen liegt in der Rinne, die Pfeile stehen' },
    notaus: 'endzustand',
  },
  formatregler: {
    zweck: 'rueckmeldung',
    was: 'Kleine gegen große Fliese auf derselben Wand; die Teilung folgt dem Regler',
    stufen: { dauer: ['eingabe'], kurve: [] },
    reduziert: { art: 'gleich', text: 'folgt dem Regler direkt' },
    notaus: 'laeuft',
  },
  'vorher-nachher': {
    zweck: 'rueckmeldung',
    was: 'Vorher gegen Nachher; das Lot folgt dem Regler',
    stufen: { dauer: ['eingabe'], kurve: [] },
    reduziert: { art: 'gleich', text: 'folgt dem Regler direkt' },
    notaus: 'laeuft',
  },
  karte: {
    zweck: 'orientierung',
    was: 'Einsatzgebiet ab Aßlar: die Ringe legen sich von innen nach außen, die Punkte jeder Zone mit ihrem Ring',
    stufen: { dauer: ['--dauer-2', '--dauer-3'], kurve: ['--ease-setzen'], letzteStufe: 7 },
    reduziert: { art: 'sofort', text: 'die Karte steht fertig' },
    notaus: 'endzustand',
    hinweis: 'UM-E3-REG: Staffel von Stufe 13 auf 7 (Ring 25 km bei 3, Punkte nah 2, mittel 5, weit 7); gesamt 0,78 s statt 1,1 s.',
  },
  'galerie-filter': {
    zweck: 'rueckmeldung',
    was: 'Nach der Auswahl blenden die Fotos in Lesefolge ein',
    stufen: { dauer: ['--dauer-2'], kurve: ['--ease-setzen'], letzteStufe: 7 },
    reduziert: { art: 'sofort', text: 'die Fotos wechseln sofort' },
    notaus: 'endzustand',
  },
  karussell: {
    zweck: 'orientierung',
    was: 'Laufband und Reihe zeigen langsam, dass mehr folgt (Ruhe, K-016); die Reihe rückt alle 8 s eine Karte weiter',
    stufen: { dauer: ['--band-durchlauf'], kurve: ['linear'] },
    reduziert: { art: 'grundform', text: 'das Band steht als umbrechende Liste, die Reihe bewegt sich nur von Hand' },
    notaus: 'endzustand',
  },
  cursor: {
    zweck: 'rueckmeldung',
    was: 'Fugenkreuz mit Beschriftung neben dem Systemzeiger, nur bei feinem Zeiger; folgt ohne Feder und ohne Nachlauf',
    stufen: { dauer: ['--dauer-1', '--dauer-5'], kurve: ['--ease-setzen', 'linear'] },
    reduziert: { art: 'sofort', text: 'Schild ohne Übergänge an derselben Stelle (Nachlauf gibt es in keiner Fassung), die Beschriftung bleibt' },
    notaus: 'ruhig',
    hinweis: 'Ausgeblendet bei Tastatur, beim Verlassen des Fensters und in erzwungenen Farben; der Textcursor bleibt nativ; keine Mischmodi.',
    zustaende: {
      handlung: { beschriftung: '', wo: 'nur mit data-cursor="handlung", Text aus data-cursor-text', zweck: 'rueckmeldung', stufen: CURSOR_STUFEN, ruhig: CURSOR_RUHIG },
      ansehen: { beschriftung: 'Ansehen', wo: 'Fotos mit Weg (Glasbild) und Pläne, die in die Flucht rücken', zweck: 'rueckmeldung', stufen: CURSOR_STUFEN, ruhig: CURSOR_RUHIG },
      ziehen: { beschriftung: 'Ziehen', wo: 'Formatregler', zweck: 'rueckmeldung', stufen: CURSOR_STUFEN, ruhig: CURSOR_RUHIG },
      vergleichen: { beschriftung: 'Vergleichen', wo: 'Vorher-nachher-Regler', zweck: 'rueckmeldung', stufen: CURSOR_STUFEN, ruhig: CURSOR_RUHIG },
      gesperrt: { beschriftung: 'Nicht verfügbar', wo: 'gesperrte Bedienelemente; das Kreuz steht schräg', zweck: 'rueckmeldung', stufen: CURSOR_STUFEN, ruhig: CURSOR_RUHIG },
      laedt: {
        beschriftung: 'Lädt',
        wo: 'Bedienelemente mit aria-busy, nach 300 ms und mindestens 500 ms; das Kreuz dreht sich langsam',
        zweck: 'rueckmeldung',
        stufen: { dauer: ['--dauer-1', '--dauer-5'], kurve: ['--ease-setzen', 'linear'] },
        ruhig: 'das Kreuz steht still, die Beschriftung bleibt',
      },
    },
  },
};
