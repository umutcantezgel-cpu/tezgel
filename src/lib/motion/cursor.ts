// Fugenkreuz-Cursor (KERN K-007 „Cursor-Charakter“, K-008 Regeln v4, E-067-1; UM-E3-CURSOR). Der Systemzeiger bleibt der
// Klickpunkt ohne Verzögerung. Daneben steht über Fotos mit Weg, Reglern und Plänen ein kleines Schild mit dem Fugenkreuz
// des Formsystems und einer Beschriftung; über einem Foto mit Glasfläche (Glasbild) nur das Kreuz, die Glasfläche sagt
// „Ansehen →“ schon selbst (data-cursor-text="", UM-E4-VORL). Es folgt ohne Feder und ohne Nachlauf, in beiden Fassungen
// der Bewegung: Die Lage kommt aus dem letzten Zeigerereignis und wird im nächsten Bild des gemeinsamen Takts gesetzt
// (translate). Pro Bild liest das Modul kein Layout; die Größe des Schilds meldet ein ResizeObserver, die Fenstergröße das
// resize-Ereignis. Layout liest es nur im Treffertest für gesperrte und ladende Knöpfe (getroffen, siehe dort).
// Die ruhige Fassung (reduziert, Bewegungsschalter „ruhig“) nimmt nur die Übergänge weg; die hängen in bewegung.css an
// html.k-bewegung. Die Beschriftung bleibt.
//
// Aufbau:
//   - CURSOR_REGISTER: die sechs Zustände mit Beschriftung, Form und Ort (Selektoren). Ein Element kann einen Zustand auch
//     selbst wählen: data-cursor="<zustand>" (oder "aus"), dazu wahlweise data-cursor-text.
//   - zielZustand: Zustand des Elements unter dem Zeiger. Es gilt das nächste passende Element von innen nach außen.
//     Textfelder bleiben nativ, ohne Schild. Ladend geht vor gesperrt, gesperrt vor eigener Wahl, eigene Wahl vor den Orten.
//   - getroffen: Treffertest für gesperrte und ladende Bedienelemente ohne Zeigerereignisse (pointer-events: none).
//   - weiter und anzeige: Zustandsmaschine ohne DOM (test/cursor.test.mjs).
//   - starteCursor: legt das Schild an und hört auf Zeiger, Tastatur, Fenster und erzwungene Farben. Alle Lauscher sind
//     passiv; es gibt keinen Scroll-Lauscher. Cursor.tsx lädt das Modul erst bei der ersten Mausbewegung nach der
//     Hydrierung und nur bei feinem Zeiger.
// Ausgeblendet wird das Schild bei Tastaturbedienung und nach einem Seitenwechsel (jeweils bis zur nächsten Bewegung), beim
// Verlassen des Fensters, bei Fenster ohne Fokus und verborgenem Tab, nach Finger oder Stift und in erzwungenen Farben.
// Mischmodi gibt es nicht.
// „lädt“ folgt der Ladeschwelle (K-010): Es erscheint erst nach 300 ms und bleibt mindestens 500 ms, solange der Zeiger auf
// dem ladenden Element bleibt. Über einem gesperrten oder ladenden Element gibt das Schild beim Drücken nicht nach (das Element
// selbst auch nicht).
import { erzeugeLadeschwelle, type Ladeschwelle } from '@/lib/ladeschwelle';
import { naechstesBild } from './takt';

/** Kennung im Bewegungsregister (data-motion am Schild) */
export const CURSOR_KENNUNG = 'cursor';

export const CURSOR_ZUSTAENDE = ['handlung', 'ansehen', 'ziehen', 'vergleichen', 'gesperrt', 'laedt'] as const;
export type CursorZustand = (typeof CURSOR_ZUSTAENDE)[number];

export interface CursorEintrag {
  /** Beschriftung (Mikrotext, K-011); leer: nur das Fugenkreuz */
  text: string;
  /** Form des Kreuzes (bewegung.css, data-cursor-zustand): steht, schräg (×) oder dreht sich langsam (nur mit Bewegung) */
  form: 'kreuz' | 'schraeg' | 'drehend';
  /** Wo der Zustand ohne eigenes Attribut gilt; data-cursor="<zustand>" gilt überall */
  wo: readonly string[];
  /** Zweck im Sinne des Registers (AUFTRAG Abschnitt 8): Das Schild sagt, was der Zeiger hier tun kann */
  zweck: 'Rückmeldung';
  /** Dauer- und Kurvenstufen (Tokens in globals.css, Regeln in bewegung.css) */
  stufe: string;
  /** Fassung bei reduzierter Bewegung und „ruhig“ (K-007, Spalte „Ruhig“) */
  ruhig: string;
}

/** Bedienelemente: nur an ihnen zählen aria-busy und aria-disabled (nicht an Abschnitten mit Text) */
export const STEUERUNG = [
  'button',
  'a[href]',
  'input',
  'select',
  'summary',
  '[role="button"]',
  '[role="link"]',
  '[role="slider"]',
  '[role="tab"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="option"]',
  '[role="menuitem"]',
].join(', ');

const OHNE_TEXTCURSOR = ['button', 'submit', 'reset', 'checkbox', 'radio', 'range', 'file', 'color', 'image', 'hidden'];
/** Felder mit Textcursor: Der Textcursor bleibt nativ, dort erscheint nie ein Schild (Regeln v4) */
export const TEXTFELD = [
  'textarea',
  '[contenteditable]:not([contenteditable="false"])',
  `input:not(${OHNE_TEXTCURSOR.map((t) => `[type="${t}"]`).join(', ')})`,
].join(', ');

const OHNE_UEBERGANG = 'Zustände wechseln sofort, ohne Nachlauf; die Beschriftung bleibt';
const EINBLENDEN = 'Einblenden und Druck dauer-1 · setzen, Ausblenden sofort';

/**
 * Register der Cursor-Zustände (K-007, Regeln v4: Handlung, Ansehen, Ziehen, Vergleichen, nicht verfügbar, lädt).
 * Orte nach K-007 „über Fotos, Reglern und Plänen“: Fotos mit Weg zur Leistung (Glasbild), Pläne, die beim Darüberfahren
 * in die Flucht rücken (sig-plan), der Formatregler und der Vorher-nachher-Regler. Das Glasbild wählt „ansehen“ selbst, mit
 * leerer Beschriftung (nur das Fugenkreuz; seine Glasfläche trägt das Wort, UM-E4-VORL). Gesperrt und ladend gelten an jedem
 * Bedienelement, weil der Systemzeiger dort nichts dazu sagt. Handlung hat keinen festen Ort: Ein Element wählt sie mit
 * data-cursor="handlung" und nennt die Handlung in data-cursor-text.
 */
export const CURSOR_REGISTER: Record<CursorZustand, CursorEintrag> = {
  handlung: { text: '', form: 'kreuz', wo: [], zweck: 'Rückmeldung', stufe: EINBLENDEN, ruhig: OHNE_UEBERGANG },
  ansehen: {
    text: 'Ansehen',
    form: 'kreuz',
    wo: ['a.glasbild[href]', '.verlegeplan[data-flucht="zeigen"]', '.sig-plan-ziel .verlegeplan'],
    zweck: 'Rückmeldung',
    stufe: EINBLENDEN,
    ruhig: OHNE_UEBERGANG,
  },
  ziehen: { text: 'Ziehen', form: 'kreuz', wo: ['.formatregler-bild'], zweck: 'Rückmeldung', stufe: EINBLENDEN, ruhig: OHNE_UEBERGANG },
  vergleichen: { text: 'Vergleichen', form: 'kreuz', wo: ['.vn-zone'], zweck: 'Rückmeldung', stufe: EINBLENDEN, ruhig: OHNE_UEBERGANG },
  gesperrt: {
    text: 'Nicht verfügbar',
    form: 'schraeg',
    wo: ['button:disabled', 'input:disabled', 'select:disabled', `:is(${STEUERUNG})[aria-disabled="true"]`],
    zweck: 'Rückmeldung',
    stufe: `${EINBLENDEN}; Kreuz dreht sich in dauer-1 · setzen auf 45°`,
    ruhig: OHNE_UEBERGANG,
  },
  laedt: {
    text: 'Lädt',
    form: 'drehend',
    wo: [`:is(${STEUERUNG})[aria-busy="true"]`],
    zweck: 'Rückmeldung',
    stufe: `${EINBLENDEN}; Kreuz dreht sich eine Vierteldrehung je dauer-5 · linear, solange es lädt (Ladeschwelle 300 ms, mindestens 500 ms)`,
    ruhig: 'Kreuz steht still; die Beschriftung bleibt',
  },
};

/** Reihenfolge der Prüfung an einem Element: ladend vor gesperrt (ein ladender Knopf ist auch gesperrt) */
const VORRANG: readonly CursorZustand[] = ['laedt', 'gesperrt'];
const ORTE: readonly CursorZustand[] = ['vergleichen', 'ziehen', 'ansehen', 'handlung'];

const selektor = (z: CursorZustand) => CURSOR_REGISTER[z].wo.join(', ');
/** Alles, was über den Zustand entscheiden kann; closest() findet damit das nächste solche Element */
export const CURSOR_KANDIDATEN = [TEXTFELD, '[data-cursor]', ...CURSOR_ZUSTAENDE.map(selektor).filter(Boolean)].join(', ');

/** Gesperrte und ladende Bedienelemente (Treffertest) */
export const CURSOR_SPERRE = [selektor('laedt'), selektor('gesperrt')].join(', ');

export function istZustand(wert: string | null): wert is CursorZustand {
  return wert !== null && (CURSOR_ZUSTAENDE as readonly string[]).includes(wert);
}

/** Teil eines DOM-Elements, den das Register braucht (im Test nachgebaut) */
export interface CursorElement {
  matches(selektoren: string): boolean;
  closest(selektoren: string): CursorElement | null;
  getAttribute(name: string): string | null;
  readonly parentElement: CursorElement | null;
}

export interface CursorZiel {
  zustand: CursorZustand;
  text: string;
  /** Element, das den Zustand bestimmt (für die Ladeschwelle) */
  quelle: CursorElement;
}

/** undefined: Das Element entscheidet nicht (unbekannte eigene Wahl), weiter außen suchen. null: kein Schild. */
function einordnen(el: CursorElement): CursorZiel | null | undefined {
  if (el.matches(TEXTFELD)) return null;
  for (const z of VORRANG) if (el.matches(selektor(z))) return { zustand: z, text: CURSOR_REGISTER[z].text, quelle: el };
  const eigen = el.getAttribute('data-cursor');
  if (eigen === 'aus') return null;
  if (istZustand(eigen)) return { zustand: eigen, text: el.getAttribute('data-cursor-text') ?? CURSOR_REGISTER[eigen].text, quelle: el };
  for (const z of ORTE) {
    const s = selektor(z);
    if (s && el.matches(s)) return { zustand: z, text: CURSOR_REGISTER[z].text, quelle: el };
  }
  return undefined;
}

function istElement(ziel: unknown): ziel is CursorElement {
  return typeof ziel === 'object' && ziel !== null && typeof (ziel as CursorElement).closest === 'function';
}

/** Zustand unter dem Zeiger: das nächste entscheidende Element von innen nach außen, sonst kein Schild. */
export function zielZustand(ziel: unknown): CursorZiel | null {
  if (!istElement(ziel)) return null;
  for (let el = ziel.closest(CURSOR_KANDIDATEN); el; el = el.parentElement?.closest(CURSOR_KANDIDATEN) ?? null) {
    const z = einordnen(el);
    if (z !== undefined) return z;
  }
  return null;
}

/** Rahmen eines Elements im Fenster (im Test nachgebaut) */
export interface TrefferElement {
  getBoundingClientRect(): { left: number; top: number; right: number; bottom: number };
}

/**
 * Treffertest (E-084, UM-E4-VORL). Gesperrte und ladende Knöpfe nehmen im Designsystem und in den Formularen keine
 * Zeigerereignisse an (pointer-events: none an disabled, aria-disabled und aria-busy, kern/stile.ts); der Zeiger trifft dann
 * ihren Behälter, und „Nicht verfügbar“ und „Lädt“ kämen nie. Darum prüft das Modul die gesperrten und ladenden Elemente im
 * getroffenen Behälter: Es gilt das erste, in dessen Rahmen die Zeigerlage liegt. Ein ausgeblendetes Element hat keinen
 * Rahmen und wird nie getroffen. Das ist die einzige Stelle, an der das Modul Layout liest: beim Zeigerereignis, nicht pro
 * Bild, und nur, wenn der Behälter solche Elemente enthält. Die Knöpfe selbst bleiben, wie sie sind.
 */
export function getroffen<T extends TrefferElement>(sperren: readonly T[], x: number, y: number): T | null {
  for (const el of sperren) {
    const r = el.getBoundingClientRect();
    if (x >= r.left && x < r.right && y >= r.top && y < r.bottom) return el;
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------------
// Zustandsmaschine
// ---------------------------------------------------------------------------------------------------------------------

export interface CursorStand {
  /** Zustand des Elements unter dem Zeiger (null: kein Schild) */
  zustand: CursorZustand | null;
  text: string;
  x: number;
  y: number;
  /** eine Zeigerlage ist bekannt */
  bekannt: boolean;
  /** letzte Eingabe mit Finger oder Stift: Dort genügt der Systemzeiger (K-007) */
  beruehrung: boolean;
  /** Tastatur bedient oder Seite gewechselt: aus bis zur nächsten Bewegung des Zeigers */
  wartet: boolean;
  /** Zeiger außerhalb des Fensters, Fenster ohne Fokus oder Tab verborgen */
  draussen: boolean;
  /** erzwungene Farben (forced-colors: active) */
  farben: boolean;
  gedrueckt: boolean;
  /** Ladeschwelle überschritten: „lädt“ steht (K-010) */
  ladeSichtbar: boolean;
}

export type CursorEreignis =
  | { art: 'zeiger'; x: number; y: number; typ: string }
  | { art: 'ziel'; zustand: CursorZustand | null; text: string }
  | { art: 'druck'; an: boolean }
  | { art: 'taste' }
  | { art: 'seite' }
  | { art: 'verlassen' }
  | { art: 'farben'; an: boolean }
  | { art: 'laden'; sichtbar: boolean };

export const START_STAND: CursorStand = {
  zustand: null,
  text: '',
  x: 0,
  y: 0,
  bekannt: false,
  beruehrung: false,
  wartet: false,
  draussen: false,
  farben: false,
  gedrueckt: false,
  ladeSichtbar: false,
};

/** Gibt denselben Stand zurück, wenn sich nichts ändert (dann plant das Modul kein Bild). */
function mit(stand: CursorStand, aenderung: Partial<CursorStand>): CursorStand {
  for (const [k, v] of Object.entries(aenderung)) {
    if (stand[k as keyof CursorStand] !== v) return { ...stand, ...aenderung };
  }
  return stand;
}

/** Ein Schritt der Zustandsmaschine. */
export function weiter(stand: CursorStand, e: CursorEreignis): CursorStand {
  switch (e.art) {
    case 'zeiger': {
      // Finger und Stift behalten das System (K-007); Maus zeigt das Schild wieder
      if (e.typ !== 'mouse') return mit(stand, { beruehrung: true, gedrueckt: false });
      const bewegt = !stand.bekannt || e.x !== stand.x || e.y !== stand.y;
      return mit(stand, { x: e.x, y: e.y, bekannt: true, beruehrung: false, draussen: false, wartet: stand.wartet && !bewegt });
    }
    case 'ziel':
      return mit(stand, { zustand: e.zustand, text: e.text });
    case 'druck':
      return mit(stand, { gedrueckt: e.an });
    case 'taste':
      return mit(stand, { wartet: true, gedrueckt: false });
    case 'seite':
      return mit(stand, { wartet: true, gedrueckt: false });
    case 'verlassen':
      return mit(stand, { draussen: true, gedrueckt: false });
    case 'farben':
      return mit(stand, { farben: e.an });
    case 'laden':
      return mit(stand, { ladeSichtbar: e.sichtbar });
  }
}

export interface CursorAnzeige {
  sichtbar: boolean;
  /** gezeigter Zustand (null, wenn nichts zu sehen ist) */
  zustand: CursorZustand | null;
  text: string;
  gedrueckt: boolean;
}

/** Was zu sehen ist. „lädt“ steht nur nach der Ladeschwelle; davor gibt es kein Schild. */
export function anzeige(stand: CursorStand): CursorAnzeige {
  const zustand = stand.ladeSichtbar ? 'laedt' : stand.zustand === 'laedt' ? null : stand.zustand;
  const sichtbar = zustand !== null && stand.bekannt && !stand.beruehrung && !stand.wartet && !stand.draussen && !stand.farben;
  if (!sichtbar) return { sichtbar: false, zustand: null, text: '', gedrueckt: false };
  return {
    sichtbar,
    zustand,
    text: stand.ladeSichtbar ? CURSOR_REGISTER.laedt.text : stand.text,
    // Ein gesperrtes oder ladendes Element gibt nicht nach (ohne Zeigerereignisse wird es nie :active), das Schild auch nicht
    gedrueckt: stand.gedrueckt && zustand !== 'gesperrt' && zustand !== 'laedt',
  };
}

/**
 * Seite des Schilds am Fensterrand: "x" links vom Zeiger statt rechts, "y" darüber statt darunter. Breite und Höhe der
 * Marke enthalten den Abstand zum Zeiger (Innenabstand rundum in bewegung.css); so bleibt derselbe Abstand auch zum Rand.
 * Den Seitenwechsel löst bewegung.css mit translate an der Marke, ohne Layout-Eigenschaft (keine Layout-Verschiebung).
 */
export function kante(x: number, y: number, breite: number, hoehe: number, fensterBreite: number, fensterHoehe: number): string {
  const seiten: string[] = [];
  if (x + breite > fensterBreite) seiten.push('x');
  if (y + hoehe > fensterHoehe) seiten.push('y');
  return seiten.join(' ');
}

// ---------------------------------------------------------------------------------------------------------------------
// Anbindung an den Browser
// ---------------------------------------------------------------------------------------------------------------------

export interface CursorSteuerung {
  /** Seitenwechsel: Schild aus bis zur nächsten Bewegung (die Lage unter dem Zeiger ist eine andere) */
  seite(): void;
  /** Lauscher, Beobachter und Schild entfernen */
  stopp(): void;
}

export interface CursorStart {
  x: number;
  y: number;
  ziel: EventTarget | null;
}

/** Tasten, die allein nichts bedienen (Strg-Klick, Umschalt-Klick): Sie blenden das Schild nicht aus. */
const NUR_ZUSATZ = new Set(['Shift', 'Control', 'Alt', 'AltGraph', 'Meta', 'CapsLock', 'Fn']);
const SPERR_ATTRIBUTE = ['aria-busy', 'disabled', 'aria-disabled'];
const BEOBACHTETE_ATTRIBUTE = [...SPERR_ATTRIBUTE, 'data-cursor', 'data-cursor-text'];
const MEDIUM_FARBEN = '(forced-colors: active)';

let laufend: CursorSteuerung | null = null;

/** Legt das Schild an und startet die Lauscher; ein zweiter Aufruf ersetzt den ersten. */
export function starteCursor(start?: CursorStart): CursorSteuerung {
  laufend?.stopp();
  const doc = document;
  const farbenAbfrage = typeof window.matchMedia === 'function' ? window.matchMedia(MEDIUM_FARBEN) : null;

  const schild = doc.createElement('div');
  schild.className = 'k-cursor';
  schild.setAttribute('aria-hidden', 'true');
  schild.setAttribute('data-motion', CURSOR_KENNUNG);
  schild.setAttribute('data-cursor-stand', 'aus');
  const marke = doc.createElement('span');
  marke.className = 'k-cursor-marke';
  const tafel = doc.createElement('span');
  tafel.className = 'k-cursor-schild';
  const kreuz = doc.createElement('span');
  kreuz.className = 'k-cursor-kreuz';
  const beschriftung = doc.createElement('span');
  beschriftung.className = 'k-cursor-text';
  tafel.append(kreuz, beschriftung);
  marke.append(tafel);
  schild.append(marke);
  doc.body.append(schild);

  let stand: CursorStand = { ...START_STAND, farben: farbenAbfrage?.matches ?? false };
  let ziel: EventTarget | null = null;
  let lade: { quelle: CursorElement; schwelle: Ladeschwelle } | null = null;
  let bild: (() => void) | null = null;
  let markeBreite = 0;
  let markeHoehe = 0;
  let fensterBreite = doc.documentElement.clientWidth;
  let fensterHoehe = doc.documentElement.clientHeight;
  // zuletzt Geschriebenes: nur Änderungen gehen ins DOM. Ausgeblendet bleibt das Schild, wie es war (kein Wechsel im Aus).
  const gezeigt = { stand: 'aus', zustand: '', text: '', gedrueckt: false, kante: '', lage: '' };

  const zeichne = () => {
    bild = null;
    const a = anzeige(stand);
    if (a.sichtbar) {
      const lage = `${stand.x}px ${stand.y}px`;
      if (lage !== gezeigt.lage) schild.style.translate = gezeigt.lage = lage;
      const k = kante(stand.x, stand.y, markeBreite, markeHoehe, fensterBreite, fensterHoehe);
      if (k !== gezeigt.kante) schild.setAttribute('data-cursor-kante', (gezeigt.kante = k));
      const zustand = a.zustand ?? '';
      if (zustand !== gezeigt.zustand) schild.setAttribute('data-cursor-zustand', (gezeigt.zustand = zustand));
      if (a.text !== gezeigt.text) beschriftung.textContent = gezeigt.text = a.text;
      if (a.gedrueckt !== gezeigt.gedrueckt) schild.toggleAttribute('data-cursor-gedrueckt', (gezeigt.gedrueckt = a.gedrueckt));
    }
    const sichtbar = a.sichtbar ? 'an' : 'aus';
    if (sichtbar !== gezeigt.stand) schild.setAttribute('data-cursor-stand', (gezeigt.stand = sichtbar));
  };

  // Ein Bild nur, wenn sich etwas Sichtbares ändern kann: Bewegt sich der Zeiger außerhalb der Orte, ruht der Takt
  const melde = (e: CursorEreignis) => {
    const neu = weiter(stand, e);
    if (neu === stand) return;
    const vorher = anzeige(stand).sichtbar;
    stand = neu;
    if (!bild && (vorher || anzeige(neu).sichtbar)) bild = naechstesBild(zeichne);
  };

  const ladeEnde = () => {
    lade?.schwelle.beende();
    lade = null;
    melde({ art: 'laden', sichtbar: false });
  };

  const pruefeZiel = () => {
    const z = zielZustand(ziel);
    if (z?.zustand === 'laedt') {
      if (lade?.quelle !== z.quelle) {
        ladeEnde();
        const schwelle: Ladeschwelle = erzeugeLadeschwelle((sichtbar) => {
          if (lade?.schwelle === schwelle) melde({ art: 'laden', sichtbar });
        });
        lade = { quelle: z.quelle, schwelle };
      }
      lade?.schwelle.setze(true);
    } else if (lade) {
      // Bleibt der Zeiger auf dem Element, das geladen hat, hält die Mindestdauer; sonst endet „lädt“ sofort
      if ((lade.quelle as unknown as Node).contains(ziel as Node | null)) lade.schwelle.setze(false);
      else ladeEnde();
    }
    melde({ art: 'ziel', zustand: z?.zustand ?? null, text: z?.text ?? '' });
  };

  const nimmZiel = (t: EventTarget | null) => {
    if (t === ziel) return;
    ziel = t;
    pruefeZiel();
  };

  // Treffertest (getroffen): der getroffene Behälter und seine gesperrten oder ladenden Elemente. Neu gesammelt, wenn der
  // Behälter wechselt oder sich in ihm etwas ändert; dafür beobachtet ein eigener Beobachter nur den Behälter.
  let behaelter: EventTarget | null = null;
  let sperren: Element[] = [];
  let sperrenAlt = false;
  const treffer = (x: number, y: number) => {
    if (sperrenAlt) {
      sperrenAlt = false;
      sperren = behaelter instanceof Element ? Array.from(behaelter.querySelectorAll(CURSOR_SPERRE)) : [];
    }
    nimmZiel((sperren.length ? getroffen(sperren, x, y) : null) ?? behaelter);
  };
  // Der Zeiger steht still, und unter ihm wird ein Knopf gesperrt, lädt oder wird frei: gleich neu zuordnen
  const inhalt = new MutationObserver(() => {
    sperrenAlt = true;
    if (stand.bekannt) treffer(stand.x, stand.y);
  });
  const nimmBehaelter = (t: EventTarget | null, x: number, y: number) => {
    if (t !== behaelter) {
      behaelter = t;
      sperrenAlt = true;
      inhalt.disconnect();
      if (t instanceof Element) inhalt.observe(t, { subtree: true, childList: true, attributes: true, attributeFilter: SPERR_ATTRIBUTE });
    }
    treffer(x, y);
  };

  const ueber = (e: PointerEvent) => nimmBehaelter(e.target, e.clientX, e.clientY);
  const bewegt = (e: PointerEvent) => {
    melde({ art: 'zeiger', x: e.clientX, y: e.clientY, typ: e.pointerType });
    nimmBehaelter(e.target, e.clientX, e.clientY);
  };
  const runter = (e: PointerEvent) => {
    melde({ art: 'zeiger', x: e.clientX, y: e.clientY, typ: e.pointerType });
    if (e.pointerType === 'mouse') melde({ art: 'druck', an: true });
  };
  const hoch = () => melde({ art: 'druck', an: false });
  const raus = (e: PointerEvent) => {
    if (e.relatedTarget === null) melde({ art: 'verlassen' });
  };
  const taste = (e: KeyboardEvent) => {
    if (!NUR_ZUSATZ.has(e.key)) melde({ art: 'taste' });
  };
  const weg = () => melde({ art: 'verlassen' });
  const sichtbarkeit = () => {
    if (doc.visibilityState === 'hidden') melde({ art: 'verlassen' });
  };
  const farben = () => melde({ art: 'farben', an: farbenAbfrage?.matches ?? false });
  const groesse = () => {
    fensterBreite = doc.documentElement.clientWidth;
    fensterHoehe = doc.documentElement.clientHeight;
    if (!bild) bild = naechstesBild(zeichne);
  };

  const passiv = { passive: true, capture: true } as const;
  // blur ohne capture: Mit capture käme am Fenster auch jeder blur eines Elements an (blur steigt nicht auf, läuft aber durch
  // die Capture-Phase), und jeder Fokuswechsel blendete das Schild aus. Gemeint ist nur das Fenster ohne Fokus.
  const nurFenster = { passive: true, capture: false } as const;
  doc.addEventListener('pointerover', ueber, passiv);
  doc.addEventListener('pointermove', bewegt, passiv);
  doc.addEventListener('pointerdown', runter, passiv);
  doc.addEventListener('pointerup', hoch, passiv);
  doc.addEventListener('pointercancel', hoch, passiv);
  doc.addEventListener('pointerout', raus, passiv);
  doc.addEventListener('visibilitychange', sichtbarkeit, passiv);
  window.addEventListener('keydown', taste, passiv);
  window.addEventListener('blur', weg, nurFenster);
  window.addEventListener('resize', groesse, passiv);
  farbenAbfrage?.addEventListener?.('change', farben);

  // Zustand ändert sich auch ohne Bewegung: Knopf lädt nach dem Klick, wird gesperrt oder wieder frei
  const attribute = new MutationObserver((liste) => {
    const z = ziel as Node | null;
    if (z && liste.some((m) => m.target === z || m.target.contains(z))) pruefeZiel();
  });
  attribute.observe(doc.body, { subtree: true, attributes: true, attributeFilter: BEOBACHTETE_ATTRIBUTE });
  const masse = new ResizeObserver((eintraege) => {
    for (const e of eintraege) {
      const box = e.borderBoxSize?.[0];
      markeBreite = box ? box.inlineSize : e.contentRect.width;
      markeHoehe = box ? box.blockSize : e.contentRect.height;
    }
    if (!bild) bild = naechstesBild(zeichne);
  });
  masse.observe(marke);

  if (start) {
    melde({ art: 'zeiger', x: start.x, y: start.y, typ: 'mouse' });
    nimmBehaelter(start.ziel, start.x, start.y);
  }

  const steuerung: CursorSteuerung = {
    seite: () => melde({ art: 'seite' }),
    stopp: () => {
      doc.removeEventListener('pointerover', ueber, passiv);
      doc.removeEventListener('pointermove', bewegt, passiv);
      doc.removeEventListener('pointerdown', runter, passiv);
      doc.removeEventListener('pointerup', hoch, passiv);
      doc.removeEventListener('pointercancel', hoch, passiv);
      doc.removeEventListener('pointerout', raus, passiv);
      doc.removeEventListener('visibilitychange', sichtbarkeit, passiv);
      window.removeEventListener('keydown', taste, passiv);
      window.removeEventListener('blur', weg, nurFenster);
      window.removeEventListener('resize', groesse, passiv);
      farbenAbfrage?.removeEventListener?.('change', farben);
      attribute.disconnect();
      inhalt.disconnect();
      masse.disconnect();
      lade?.schwelle.beende();
      lade = null;
      bild?.();
      bild = null;
      schild.remove();
      if (laufend === steuerung) laufend = null;
    },
  };
  laufend = steuerung;
  return steuerung;
}
