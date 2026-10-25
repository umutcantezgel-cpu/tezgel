'use client';

// Seitenwechsel B-01 „Verlegen“ (KERN K-007, Technik E-010, Ablauf E-043, Fassung v3 E-047): große Fliesen 2:1 quer im
// Drittelverband werden Fliese für Fliese von rechts nach links über die ganze Seite gelegt, jede setzt einzeln auf; liegt
// der Boden, klatscht mittig das Logo der Firma auf die Wand und steht nach einem Klick mindestens 450 ms; darunter wechselt
// die Seite, dann werden die Fliesen in derselben Richtung einzeln abgenommen und weichen in den Hintergrund zurück, das Logo
// geht mit den ersten. Eine feste Schicht (z-60) außerhalb von main, nur transform und opacity über WAAPI; Fliesen und
// Logo-Bild kommen erst beim ersten Wechsel in die Schicht (DOM, TBT und LCP der Erstansicht), das Bild wird vorher im
// Leerlauf geladen.
// Klicks fängt ein Lauscher in der Capture-Phase ab (next/link prüft danach e.defaultPrevented und navigiert nicht selbst),
// dann folgt router.push in startTransition. Zurück und Vor: gespiegelt mit 70 % der Dauer, Weg nach ZURUECK.
import { startTransition, useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { pruefeKlick } from '@/lib/verlegen/linkfilter';
import { LASER_NACH, RUHE, WARTEN_HOECHSTENS, schritt, type Aktion, type Ereignis, type Lage } from '@/lib/verlegen/automat';
import {
  AUFSETZEN_FLUG,
  AUFSETZEN_GROESSE,
  GROESSE_HINTERGRUND,
  deckung,
  LOGO_AUFKLATSCHEN,
  LOGO_GROESSE_START,
  LOGO_WEG,
  logoHalt,
  logoHaltVerlauf,
  logoMass,
  stueckplan,
  verlegeRaster,
  wechselDauer,
  type Fliese,
  type Mass,
  type Stuecktakt,
} from '@/lib/verlegen/raster';
import { INTRO_LOGO } from '@/lib/intro/ablauf';

/**
 * aufschub: Der Capture-Lauscher hält popstate an, verlegt gespiegelt und schickt das Ereignis mit dem aktuellen
 * history.state neu ab (Scroll merkt die Schicht selbst). sicher: Der Boden liegt sofort, das Ereignis läuft
 * unverzögert weiter, danach werden die Fliesen gespiegelt abgenommen. Entscheidung per Test in E2 (ENTSCHEIDUNGEN.md).
 */
const ZURUECK: 'aufschub' | 'sicher' = 'aufschub';
const SPEICHER_GEWECHSELT = 'tezgel-verlegt';
const SPEICHER_SCROLL = 'tezgel-verlegt-scroll';

interface Steuerung {
  /** true: Ereignis übernommen (anhalten), false: durchlassen */
  popstate: (e: PopStateEvent) => boolean;
}

let steuerung: Steuerung | null = null;
let eigenerPopstate = false;
/** Adresse der gerade angezeigten Seite; bei popstate zeigt location schon das Ziel. */
let angezeigt = '';
/** Der laufende Wechsel kommt aus dem Verlauf (Zurück, Vor). */
let ausVerlauf = false;
/** Pfad, zu dem dieses Zurück oder Vor führt: Hängt React vorher noch die Seite der überholten Klick-Navigation ein (Zurück kam
 *  zwischen ihrer Antwort und dem Einhängen), verbraucht dieses Einhängen weder ausVerlauf noch ein „bereit“ (Gegenprüfung
 *  E3-B01-FIX, Befund 6). */
let verlaufZiel: string | null = null;
/** Nummer der zuletzt abgeschickten Navigation (router.push, nachgereichtes oder durchgelassenes popstate): Ein „bereit“
 *  zählt nur, wenn die neue Seite nach genau dieser Navigation erschien; ältere (Plan-Morph, Abbruch) verfallen. */
let auftrag = 0;
/** Zurück oder Vor kam, während die Fliesen schon abgenommen wurden: das Ereignis lief ohne Boden an Next, Scroll und Fokus
 *  setzt der Pfad-Effekt. */
let verlaufOhneBoden = false;
/** Der Boden blendete nach 3 s aus (Abbruch), die Navigation lief weiter: Kommt die Seite doch noch, setzt der Pfad-Effekt den
 *  Fokus, bei Zurück und Vor auch die gemerkte Scrollstellung (Gegenprüfung E3-B01, Befund 3); null: kein Abbruch offen. */
let nachAbbruch: 'vor' | 'verlauf' | null = null;
/** Nummer der Navigation, deren Seite schon angezeigt wird (Pfad-Effekt, gleicher Pfad): Kam die Seite schon vor dem Abbruch,
 *  setzt blende-aus Fokus und Scroll selbst, denn ein weiterer Pfadwechsel kommt nicht (Gegenprüfung E3-B01-FIX). */
let seiteDa = 0;
/** Höhenänderung, ab der das Logo neu in die Mitte rückt (px): Die Adressleiste mobil fährt um weniger ein und aus; das Logo
 *  sprang sonst beim Aufklatschen um ihre halbe Höhe (Gegenprüfung E3-B01-FIX). Breite und Drehen versetzen es immer. */
const LOGO_RUHE_HOEHE = 120;

// Auf Modulebene, also vor dem popstate-Lauscher des App Routers (useEffect): sichert die Reihenfolge auch in
// Firefox vor 116, das Lauscher am Ziel nach Registrierung statt nach Phase ordnet (Gutachten E0-GUT-01, Frage 3).
if (typeof window !== 'undefined') {
  const w = window as Window & { __verlegenPopstate?: boolean };
  if (!w.__verlegenPopstate) {
    w.__verlegenPopstate = true;
    window.addEventListener(
      'popstate',
      (e) => {
        if (eigenerPopstate || !steuerung) return;
        if (steuerung.popstate(e)) e.stopImmediatePropagation();
      },
      true,
    );
    if (ZURUECK === 'aufschub' && 'scrollRestoration' in history) history.scrollRestoration = 'manual';
  }
}

// Tokens ändern sich zur Laufzeit nicht: einmal lesen und merken. Ein getComputedStyle nach dem Sperren (inert) und dem
// Entfernen von k-startbild erzwang im Klick die Stilberechnung des ganzen Dokuments (81 bis 112 ms bei 4-facher Drosselung,
// Reaktion 456 ms; E-031). Der Speicher leert sich, wenn sich der Bewegungswunsch des Systems ändert.
const tokens = new Map<string, string>();
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', () => tokens.clear());
}

function lies(name: string): string {
  let wert = tokens.get(name);
  if (wert === undefined) {
    wert = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (wert) tokens.set(name, wert);
  }
  return wert;
}

/** Alle Tokens des Wechsels auf einmal lesen (beim Einhängen im Leerlauf, nie zwischen zwei Schreibzugriffen). */
function liesVorab(): void {
  for (const name of ['--verlegen-gesamt', '--verlegen-gesamt-folge', '--verlegen-ruhig', '--ease-aufsetzen', '--ease-setzen', '--ease-laser', '--dauer-1', '--dauer-5']) lies(name);
}

/** Feine Körnung der Fliese (KERN B-01: SVG-Rauschen als Hintergrund der Fliese, ≤ 1 KB; zurück nach E-037). */
const KOERNUNG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cfilter id='k'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .04 0 0 0 0 .07 0 0 0 0 .16 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='96' height='96' filter='url(%23k)'/%3E%3C/svg%3E";

/** Rastert die Körnung einmal im Leerlauf zu einer Kachel (Blob, bis DPR 2) und setzt sie als --verlegen-koernung an die
 *  Schicht: Die Fliesen kacheln dann ein fertiges Bild statt feTurbulence je Fliese zu rechnen (E-036 maß rund 70 ms je
 *  Wechsel). Gelingt das nicht, bleibt das SVG selbst als Rückfall (gleiches Bild, teureres Rastern). */
function bereiteKoernung(schicht: HTMLElement): () => void {
  let aus = false;
  let url = '';
  const setze = (wert: string) => {
    if (!aus) schicht.style.setProperty('--verlegen-koernung', `url("${wert}")`);
  };
  const svg = new Image();
  svg.onload = () => {
    if (aus) return;
    try {
      const dpr = Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)));
      const leinwand = document.createElement('canvas');
      leinwand.width = leinwand.height = 96 * dpr;
      const g = leinwand.getContext('2d');
      if (!g) return setze(KOERNUNG);
      g.drawImage(svg, 0, 0, leinwand.width, leinwand.height);
      leinwand.toBlob((blob) => {
        if (aus) return;
        if (!blob) return setze(KOERNUNG);
        url = URL.createObjectURL(blob);
        const bild = new Image();
        bild.src = url;
        void bild
          .decode()
          .catch(() => undefined)
          .then(() => setze(url));
      }, 'image/png');
    } catch {
      setze(KOERNUNG);
    }
  };
  svg.src = KOERNUNG;
  return () => {
    aus = true;
    if (url) URL.revokeObjectURL(url);
  };
}

/** Logo auf der Wand (E-047): dieselbe Datei wie im Kopf (`/images/logo/tezgel-logo.webp`, UNANTASTBAR, G8), über den
 *  Bildoptimierer in der Dateibreite 640 px, genau die Adresse des Intros (beim ersten Besuch schon im Speicher). Das Bild
 *  entsteht im Leerlauf nach dem Einhängen außerhalb des Dokuments und wird dort geladen und dekodiert; in die Schicht kommt
 *  es erst beim ersten Wechsel, also nach der ersten Eingabe (kein LCP-Kandidat der Erstansicht). decoding sync: Beim
 *  Aufklatschen malt der Browser das fertige Bild im selben Bild, statt eine Lücke zu zeigen. */
function neuesLogoBild(): HTMLImageElement {
  const bild = new Image(640, 200);
  bild.alt = '';
  bild.decoding = 'sync';
  bild.draggable = false;
  bild.className = 'verlegen-logo-bild';
  bild.src = INTRO_LOGO;
  void bild.decode().catch(() => undefined);
  return bild;
}

/** Erst nach dem nächsten gemalten Bild ausführen: Das Bild nach dem Klick bleibt billig (Reaktion), die Arbeit folgt danach,
 *  mit Vorrang vor Hintergrundaufgaben wie dem Vorladen der Zielseite (scheduler.postTask, sonst setTimeout). */
function nachDemMalen(f: () => void): void {
  const planer = (globalThis as { scheduler?: { postTask?: (f: () => void, o: { priority: string }) => Promise<unknown> } }).scheduler;
  requestAnimationFrame(() => {
    if (planer?.postTask) void planer.postTask(f, { priority: 'user-blocking' });
    else window.setTimeout(f, 0);
  });
}

/** Dauer aus einer CSS-Variablen in ms (NaN, wenn sie fehlt); der Minifier schreibt 1200ms als 1.2s, deshalb zählt die Einheit. */
function ms(name: string): number {
  const roh = lies(name);
  const wert = Number.parseFloat(roh);
  return /\ds$/.test(roh) && !roh.endsWith('ms') ? wert * 1000 : wert;
}

/** Gesamtdauer dieses Wechsels aus den Tokens (K-005); NaN, wenn die Tokens fehlen. */
function gesamtdauer(richtung: 'vor' | 'zurueck'): number {
  return wechselDauer(ms('--verlegen-gesamt'), ms('--verlegen-gesamt-folge'), schonGewechselt(), richtung);
}

/** Reduzierte Bewegung: Überblendung `--verlegen-ruhig` (150 ms), je zur Hälfte hinein und hinaus. */
function halbeBlende(): number {
  return ms('--verlegen-ruhig') / 2;
}

function bewegungErlaubt(): boolean {
  const html = document.documentElement;
  return html.classList.contains('k-bewegung') && !html.classList.contains('k-notaus');
}

// Plan-Morph (K-007 seitenwechsel, zurück nach E-037): Links mit data-uebergang="plan-vor" und data-uebergang-plan="<id>"
// führen zu einer Seite, deren Plan (data-plan-uebergang="<id>") derselbe ist wie der im Feld der Übersicht. Ist der Morph
// möglich, startet B-01 statt der Fliesen selbst eine View Transition (Typ „plan-vor“): Plan im alten Bild benennen,
// navigieren, warten bis die neue Seite steht, Plan im neuen Bild benennen; der Browser lässt ihn gleiten. Über Reacts
// <ViewTransition> fand React das Paar nicht, weil Next 16 die alte Seite verborgen stehen lässt statt sie abzubauen (auch im
// Live-Stand glitt der Plan deshalb nicht). Beide Übergänge laufen nie gleichzeitig.
const UEBERGANG_TYP = 'plan-vor';
/** Obergrenze für das Warten auf die neue Seite im Morph (danach endet die View Transition ohne Gleiten) */
const MORPH_WARTEN = 2500;
type Uebergang = { skipTransition: () => void; finished: Promise<unknown> };
/** der laufende Plan-Morph dieser Schicht (Chromium 141 kennt document.activeViewTransition noch nicht) */
let morphLauf: Uebergang | null = null;
/** true, solange der Morph auf die neue Seite wartet (das Bild steht still): Klicks ruhen, Zurück geht an Next */
let morphOffen = false;

/** Morph nur ab lg, bei erlaubter Bewegung und wenn der Browser View Transitions mit Typen kann (sonst übernimmt B-01). */
function uebergangMoeglich(): boolean {
  return (
    bewegungErlaubt() &&
    window.matchMedia('(width >= 64rem)').matches &&
    typeof (document as Document & { startViewTransition?: unknown }).startViewTransition === 'function' &&
    typeof CSS !== 'undefined' &&
    CSS.supports(`selector(:active-view-transition-type(${UEBERGANG_TYP}))`)
  );
}

/** die laufende View Transition (Standard: document.activeViewTransition; sonst der eigene Morph oder die von React) */
function aktiverUebergang(): Uebergang | null {
  const d = document as Document & { activeViewTransition?: Uebergang | null; __reactViewTransition?: Uebergang | null };
  return d.activeViewTransition ?? morphLauf ?? d.__reactViewTransition ?? null;
}

/** Benennt ein Element für den Morph (Name je Plan, Klasse plan-morph für Dauer und Kurve) bzw. hebt den Namen wieder auf. */
function benenne(el: HTMLElement | null | undefined, plan: string | null): void {
  if (!el) return;
  el.style.setProperty('view-transition-name', plan ? `plan-${plan}` : '');
  el.style.setProperty('view-transition-class', plan ? 'plan-morph' : '');
}

/** Eine laufende View Transition sofort beenden (der Wechsel im DOM bleibt, nur die Animation entfällt): Sonst lägen
 *  benannte Gruppen (Plan, Kopf) über der Schicht von B-01. */
function beendeUebergang(): void {
  try {
    aktiverUebergang()?.skipTransition();
  } catch {
    // schon beendet
  }
  for (const a of document.documentElement.getAnimations({ subtree: true })) {
    const pseudo = (a.effect as KeyframeEffect | null)?.pseudoElement;
    if (pseudo?.startsWith('::view-transition')) a.finish();
  }
}

/** true, solange ein Klick mit eigenem Übergang navigiert (Fokus auf die H1 nach dem Morph, wie bei B-01) */
let eigenerWechsel = false;

function adresse(): string {
  return location.pathname + location.search;
}

function gleicherPfad(a: string, b: string): boolean {
  const ohne = (p: string) => p.replace(/\/+$/, '') || '/';
  return ohne(a) === ohne(b);
}

/** Meldet „bereit“ nach zwei Bildern (Layout und Malen der neuen Seite) und sobald der Hauptfaden frei ist, höchstens nach
 *  400 ms (E-036), aber nur, wenn seither keine neuere Navigation abgeschickt wurde (Prüfung E-043). Gibt den Abbruch zurück. */
function spaeterBereit(nummer: number, melden: () => void): () => void {
  let zweites = 0;
  let ruhe = 0;
  const pruefe = () => {
    if (nummer === auftrag) melden();
  };
  const erstes = requestAnimationFrame(() => {
    zweites = requestAnimationFrame(() => {
      ruhe = window.requestIdleCallback ? window.requestIdleCallback(pruefe, { timeout: 400 }) : window.setTimeout(pruefe, 0);
    });
  });
  return () => {
    cancelAnimationFrame(erstes);
    cancelAnimationFrame(zweites);
    if (window.cancelIdleCallback) window.cancelIdleCallback(ruhe);
    else window.clearTimeout(ruhe);
  };
}

/** Zustand des zuletzt gesehenen Verlaufseintrags von Next (__NA und Baum der angezeigten Seite). */
let nextZustand: { __NA?: boolean } | null = null;
function merkeNextZustand(): void {
  const z = history.state as { __NA?: boolean } | null;
  if (z?.__NA) nextZustand = z;
}

function merkeScroll(fuer: string): void {
  try {
    const alle = JSON.parse(sessionStorage.getItem(SPEICHER_SCROLL) ?? '{}') as Record<string, number>;
    alle[fuer] = window.scrollY;
    sessionStorage.setItem(SPEICHER_SCROLL, JSON.stringify(alle));
  } catch {
    /* ohne Speicher keine Wiederherstellung */
  }
}

function gemerkterScroll(): number {
  try {
    const alle = JSON.parse(sessionStorage.getItem(SPEICHER_SCROLL) ?? '{}') as Record<string, number>;
    return alle[adresse()] ?? 0;
  } catch {
    return 0;
  }
}

function schonGewechselt(): boolean {
  try {
    return sessionStorage.getItem(SPEICHER_GEWECHSELT) === '1';
  } catch {
    return false;
  }
}

function merkeGewechselt(): void {
  try {
    sessionStorage.setItem(SPEICHER_GEWECHSELT, '1');
  } catch {
    /* dann bleibt jeder Wechsel beim langen Takt */
  }
}

/** Der große Moment `startbild` gilt nur beim Laden der Seite, nicht nach einem Seitenwechsel (K-007); ebenso die
 *  Verzögerung der Kreuzlinie hinter dem Intro (k-intro-sig, Geometrie k-intro-start; E-037, E-044), sonst liefe SIG-1 bei jeder Rückkehr nach / und
 *  die Flucht des Plans auf anderen Seiten verspätet. Eine Änderung an html, während der Boden schließt. */
function ohneStartbild(): void {
  document.documentElement.classList.remove('k-startbild', 'k-intro-start', 'k-intro-sig');
}

/** Zurück und Vor (Verlauf): Die Bewegungen des Einstiegs (SIG-1, Flucht, Plan beim Laden) stehen im Endzustand, wie die
 *  Scrollstellung, statt bei jeder Rückkehr nach dem Abnehmen noch einmal 1,3 s zu wachsen (E2-SICHT-2 Befund 12,
 *  E3-START-04; bewegung.css html.k-verlauf). Ein Vorwärtswechsel nimmt die Klasse vor dem neuen Einstieg wieder weg. */
function verlauf(an: boolean): void {
  document.documentElement.classList.toggle('k-verlauf', an);
}

function sperre(an: boolean): void {
  const ziele = [document.querySelector('body header'), document.getElementById('main-content'), document.querySelector('body footer')];
  for (const el of ziele) if (el) (el as HTMLElement).inert = an;
}

/** Element zum Anker der Adresse (#id), falls es auf der Seite steht. */
function ankerziel(): HTMLElement | null {
  if (location.hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(location.hash.slice(1)));
  } catch {
    return null; // fehlerhaft kodierter Anker
  }
}

/** Fokus auf die neue Seite: auf das Ankerziel, wenn die Adresse eines nennt (die Ansicht steht dort, der erste Tab geht von
 *  dort weiter statt von der H1 ganz oben; Gegenprüfung E3-B01, Befund 7), sonst auf die H1. Ohne Scroll; nicht fokussierbare
 *  Ziele bekommen tabindex -1 (Links und Felder behalten ihren Platz in der Tab-Folge). */
function fokussiereUeberschrift(): void {
  const ziel = ankerziel() ?? document.querySelector<HTMLElement>('#main-content h1');
  if (!ziel) return;
  if (ziel.tabIndex < 0 && !ziel.hasAttribute('tabindex')) ziel.setAttribute('tabindex', '-1');
  ziel.focus({ preventScroll: true });
}

/** Fläche der festen Schicht in px: die Ansicht ohne Bildlaufleiste (innerWidth zählt eine sichtbare Leiste mit). */
interface Ansicht {
  breite: number;
  hoehe: number;
}

interface Belag extends Ansicht {
  mass: Mass;
  fliesen: Fliese[];
  elemente: HTMLElement[];
}

/** Baut den Belag für eine Ansicht (nur bei neuer Größe neu). */
function baueBelag(boden: HTMLElement, alt: Belag | null, { breite, hoehe }: Ansicht): Belag {
  if (alt && alt.breite === breite && alt.hoehe === hoehe) return alt;
  const { mass, fliesen } = verlegeRaster(breite, hoehe);
  const elemente = fliesen.map((f) => {
    const el = document.createElement('div');
    el.className = 'verlegen-fliese';
    el.style.width = `${mass.laenge}px`;
    el.style.height = `${mass.hoehe}px`;
    el.style.translate = `${f.x}px ${f.y}px`;
    el.style.setProperty('--fuge', `${mass.fuge / 2}px`);
    el.innerHTML =
      '<span class="verlegen-schatten-flug"></span><span class="verlegen-oberflaeche"><span class="verlegen-glanz"></span></span>';
    return el;
  });
  boden.replaceChildren(...elemente);
  return { breite, hoehe, mass, fliesen, elemente };
}

function warte(animationen: Animation[]): Promise<void> {
  return Promise.all(animationen.map((a) => a.finished.catch(() => undefined))).then(() => undefined);
}

function beende(animationen: Animation[]): void {
  for (const a of animationen) a.cancel();
  animationen.length = 0;
}

export default function Verlegen() {
  const router = useRouter();
  const pfad = usePathname();
  const schichtRef = useRef<HTMLDivElement>(null);
  const bodenRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const blendeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pfadRef = useRef(pfad);
  const senden = useRef<(e: Ereignis) => void>(() => undefined);

  useEffect(() => {
    const schicht = schichtRef.current;
    const boden = bodenRef.current;
    const laser = laserRef.current;
    const blende = blendeRef.current;
    const logo = logoRef.current;
    if (!schicht || !boden || !laser || !blende || !logo) return;

    let lage: Lage = RUHE;
    let ansicht: Ansicht = { breite: 0, hoehe: 0 };
    let belag: Belag | null = null;
    let takte: Stuecktakt[] = [];
    let ruhig = false;
    let gesamt = Number.NaN;
    let zurueckAusAufschub = false;
    const laufend: Animation[] = [];
    const uhren: number[] = [];
    let laserLauf: Animation | null = null;
    /** Logo-Bild (im Leerlauf vorgeladen), seine Animationen (Aufklatschen, Einblenden, Ausblenden) und die Nummer des Halts:
     *  Eine Uhr eines früheren Wechsels darf den Halt des laufenden nicht beenden. */
    let logoBild: HTMLImageElement | null = null;
    const logoLauf: Animation[] = [];
    let logoNummer = 0;
    let angefordert = false;
    /** Die Ansicht wuchs beim Legen über die Deckung hinaus: Neu verlegt wird erst, wenn die laufenden Fliesen liegen. */
    let nachLegenNeu = false;
    /** Link, den die Tastatur während des Abnehmens wählte: Der Wechsel dorthin beginnt, sobald die Schicht frei ist. */
    let vorgemerkt: URL | null = null;
    let sofortAus: () => void = () => undefined;
    /** Die Navigation führt auf den Pfad, der schon angezeigt wird (z. B. die Seite kam nach einem Abbruch doch noch, oder
     *  Zurück auf einen Eintrag desselben Pfads): Es gibt keinen Pfadwechsel und damit kein „bereit“ aus dem Pfad-Effekt;
     *  darum hier selbst melden (Prüfung E-043). */
    const bereitOhnePfadwechsel = () => {
      ausVerlauf = false;
      verlaufZiel = null;
      seiteDa = auftrag;
      sofortAus();
      sofortAus = spaeterBereit(auftrag, () => senden.current({ typ: 'bereit' }));
    };

    const stelle = (z: string) => {
      schicht.dataset.zustand = z;
    };
    const stoppeUhren = () => {
      for (const u of uhren) window.clearTimeout(u);
      uhren.length = 0;
    };
    // Fliesen und Logo richten sich nach der Fläche der Schicht, nicht nach innerWidth: Bei sichtbarer Bildlaufleiste stand
    // das Logo sonst um ihre halbe Breite rechts der Mitte (Gegenprüfung E3-B01, Befund 2). Gelesen zu Beginn des Wechsels,
    // vor dessen Schreibzugriffen (kein erzwungenes Layout), und bei jeder Größenänderung.
    const miss = (): Ansicht => {
      ansicht = { breite: schicht.clientWidth, hoehe: schicht.clientHeight };
      return ansicht;
    };

    // Logo auf der Wand: Bild bereitstellen (falls der Klick vor dem Leerlauf kam), mittig in ganzen Pixeln platzieren und in
    // die Schicht hängen (beim ersten Wechsel, die Fliesen brauchen danach noch die halbe Dauer, das Bild ist dann längst da).
    const bereiteLogo = (): HTMLImageElement => {
      logoBild ??= neuesLogoBild();
      return logoBild;
    };
    const platziereLogo = (): HTMLImageElement => {
      const bild = bereiteLogo();
      const m = logoMass(ansicht.breite, ansicht.hoehe);
      logo.style.left = `${m.x}px`;
      logo.style.top = `${m.y}px`;
      logo.style.width = `${m.breite}px`;
      logo.style.height = `${m.hoehe}px`;
      if (bild.parentNode !== logo) logo.replaceChildren(bild);
      return bild;
    };
    // Aufklatschen: etwas größer und durchsichtig, dann deckend in voller Größe, hart wie eine gesetzte Fliese (ease-aufsetzen,
    // ohne Nachfedern). Reduzierte Bewegung: Das Logo kam schon mit der Blende (lege), hier nichts. Ist das Bild noch nicht da
    // (sehr langsame Verbindung), klatscht es auf, sobald es geladen ist, solange der Boden noch liegt.
    const zeigeLogo = () => {
      if (ruhig) return;
      const bild = platziereLogo();
      const klatsche = () => {
        logoLauf.push(
          bild.animate(
            [
              { opacity: 0, transform: `scale(${LOGO_GROESSE_START})`, easing: lies('--ease-aufsetzen') || 'ease-in' },
              { opacity: 1, offset: 0.35 },
              { opacity: 1, transform: 'none' },
            ],
            { duration: LOGO_AUFKLATSCHEN, fill: 'forwards' },
          ),
        );
      };
      if (bild.complete && bild.naturalWidth > 0) return klatsche();
      const spaeter = () => {
        if ((lage.zustand === 'bedeckt' || lage.zustand === 'warten') && logoLauf.length === 0) klatsche();
      };
      bild.addEventListener('load', spaeter, { once: true });
    };
    // Halt, gezählt ab dem ersten Bild des Aufklatschens; dann meldet die Uhr „logo-gestanden“. Nach einem Klick die
    // Mindestzeit (Aufklatschen plus Stehen), aus dem Verlauf (Zurück und Vor, Ziel leer) nur das Aufklatschen: Es läuft zu
    // Ende, bevor abgenommen wird (Automat).
    const halteLogo = () => {
      const nummer = ++logoNummer;
      const frist = lage.ziel ? logoHalt(ruhig) : logoHaltVerlauf(ruhig);
      const start = logoLauf[logoLauf.length - 1]?.ready ?? Promise.resolve();
      void start
        .catch(() => undefined)
        .then(() => {
          if (nummer !== logoNummer) return;
          const gestanden = () => {
            if (nummer === logoNummer) senden.current({ typ: 'logo-gestanden' });
          };
          uhren.push(window.setTimeout(gestanden, frist));
        });
    };
    // Beim Abnehmen geht das Logo mit den ersten Fliesen (Deckkraft am Behälter, das Aufklatschen am Bild läuft ungestört
    // zu Ende); gleichmäßig, damit es sichtbar mit ihnen beginnt (ease-weg hielt es die ersten Bilder fast voll, Sichtprüfung
    // der Videos); reduziert mit der Blende.
    const nimmLogoAb = (): Animation =>
      logo.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: ruhig ? halbeBlende() : LOGO_WEG,
        easing: 'linear',
        fill: 'forwards',
      });

    // Alle Fliesen liegen deckend, ohne Flugschatten (Boden liegt sofort bzw. nach einer Größenänderung neu verlegt).
    const deckeAlle = () => {
      if (!belag) return;
      belag.elemente.forEach((el, i) => {
        el.style.zIndex = String(takte[i].ebene);
        el.style.opacity = '1';
        (el.children[0] as HTMLElement).style.opacity = '0';
      });
    };

    const lege = () => {
      miss();
      nachAbbruch = null;
      nachLegenNeu = false;
      beendeUebergang();
      gesamt = gesamtdauer(lage.richtung);
      ruhig = !bewegungErlaubt() || !Number.isFinite(gesamt);
      merkeGewechselt();
      ohneStartbild();
      sperre(true);
      if (ruhig) {
        // Reduzierte Bewegung: Überblendung über die Kalkfläche, das Logo blendet mit ihr ein (ohne Aufklatschen)
        laufend.push(blende.animate([{ opacity: 0 }, { opacity: 1 }], { duration: halbeBlende(), fill: 'forwards' }));
        logoLauf.push(platziereLogo().animate([{ opacity: 0 }, { opacity: 1 }], { duration: halbeBlende(), fill: 'forwards' }));
        void warte(laufend).then(() => senden.current({ typ: 'gelegt' }));
        return;
      }
      platziereLogo();
      belag = baueBelag(boden, belag, ansicht);
      takte = stueckplan(belag.fliesen, belag.mass, belag.breite, gesamt, lage.richtung);
      // Jede Fliese schwebt etwas größer über ihrem Platz, ein kurzes Stück zur Startkante hin, mit Flugschatten auf den
      // schon gelegten, und setzt dann hart auf (Kurve endet mit voller Geschwindigkeit, ohne Federn): tak.
      const flug = belag.mass.laenge * AUFSETZEN_FLUG * (lage.richtung === 'vor' ? 1 : -1);
      const kurve = lies('--ease-aufsetzen') || 'ease-in';
      belag.elemente.forEach((el, i) => {
        const t = takte[i];
        el.style.zIndex = String(t.ebene);
        const zeit = { delay: t.legenBeginn, duration: t.legenDauer, fill: 'both' as const };
        laufend.push(
          el.animate(
            [
              { opacity: 0, transform: `translateX(${flug}px) scale(${AUFSETZEN_GROESSE})`, easing: kurve },
              { opacity: 1, offset: 0.3 },
              { opacity: 1, transform: 'none' },
            ],
            zeit,
          ),
          (el.children[0] as HTMLElement).animate([{ opacity: 1, easing: kurve }, { opacity: 0 }], zeit),
        );
      });
      void warte(laufend).then(() => {
        // wuchs die Ansicht beim Legen über die Deckung hinaus, deckt der Boden jetzt ohne Bewegung ganz (wie in liege())
        if (nachLegenNeu && belag) {
          nachLegenNeu = false;
          belag = baueBelag(boden, belag, ansicht);
          takte = stueckplan(belag.fliesen, belag.mass, belag.breite, gesamt, lage.richtung);
          deckeAlle();
        }
        senden.current({ typ: 'gelegt' });
      });
    };

    const liege = () => {
      miss();
      nachAbbruch = null;
      beendeUebergang();
      gesamt = gesamtdauer(lage.richtung);
      ruhig = !bewegungErlaubt() || !Number.isFinite(gesamt);
      ohneStartbild();
      sperre(true);
      platziereLogo().style.opacity = '1';
      if (ruhig) {
        blende.style.opacity = '1';
        return;
      }
      belag = baueBelag(boden, belag, ansicht);
      takte = stueckplan(belag.fliesen, belag.mass, belag.breite, gesamt, lage.richtung);
      deckeAlle();
    };

    // Drehen oder Größenänderung, solange der Boden gelegt wird oder liegt (Gegenprüfung E3-B01, Befund 5; E3-B01-FIX): Neu
    // verlegt wird nur, wenn die Ansicht über die Fläche hinauswächst, die die Fliesen wirklich decken (die Reihen ragen im
    // Drittelverband über den Rand; die Adressleiste mobil bleibt darin). Beim Legen werden die laufenden Fliesen nie
    // abgebrochen, sonst läge der Rest in einem Bild: der Neubau folgt, sobald sie liegen. Liegt der Boden schon, deckt er sofort
    // ganz (wie in liege()). Das Logo rückt nur bei neuer Breite, beim Drehen oder großer Höhenänderung in die neue Mitte.
    const neuVermessen = () => {
      if (lage.zustand !== 'legen' && lage.zustand !== 'bedeckt' && lage.zustand !== 'warten') return;
      const alt = ansicht;
      const neu = miss();
      if (neu.breite === alt.breite && neu.hoehe === alt.hoehe) return;
      const gedeckt = belag ? deckung(belag.fliesen, belag.mass.fuge) : null;
      if (!ruhig && belag && gedeckt && (neu.breite > gedeckt.breite || neu.hoehe > gedeckt.hoehe)) {
        if (lage.zustand === 'legen') nachLegenNeu = true;
        else {
          belag = baueBelag(boden, belag, neu);
          takte = stueckplan(belag.fliesen, belag.mass, belag.breite, gesamt, lage.richtung);
          deckeAlle();
        }
      }
      const gedreht = neu.breite > neu.hoehe !== alt.breite > alt.hoehe;
      if (neu.breite !== alt.breite || gedreht || Math.abs(neu.hoehe - alt.hoehe) > LOGO_RUHE_HOEHE) platziereLogo();
    };

    const nimmAb = () => {
      stoppeUhren();
      // Neue Seite liegt darunter: Scroll an den Anfang (oder gemerkte Stelle bei Zurück), Fokus auf die H1 (oder das Ankerziel).
      if (zurueckAusAufschub) window.scrollTo({ top: gemerkterScroll(), left: 0, behavior: 'instant' });
      else if (!location.hash && lage.richtung === 'vor') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      zurueckAusAufschub = false;
      // inert fällt hier, weil der Fokus sonst nicht auf die H1 der neuen Seite kann; Zeiger fängt die Schicht weiter ab,
      // bis sie in Ruhe ist (data-zustand ≠ ruhe, Antwort auf E2-PRUEF-04 Frage 1).
      sperre(false);
      fokussiereUeberschrift();
      const fertig = () => senden.current({ typ: 'abgenommen' });
      if (ruhig || !belag) {
        verbergeLaser();
        const von = Number(getComputedStyle(blende).opacity) || 1;
        beende(laufend);
        laufend.push(blende.animate([{ opacity: von }, { opacity: 0 }], { duration: halbeBlende(), fill: 'forwards' }));
        logoLauf.push(nimmLogoAb());
        void warte(laufend).then(fertig);
        return;
      }
      // Fliese für Fliese in derselben Reihenfolge wie beim Legen: jede weicht in den Hintergrund zurück (wird kleiner und
      // blendet aus), die neue Seite erscheint von der Startkante her. Die erste Fliese beginnt sofort, damit der Boden nach
      // dem Legen nicht still liegt (Sichtabnahme E2, Befund 1; E-036).
      // sichtbar kleiner, solange sie noch deckt (ease-setzen: zügig zurück), danach blendet sie aus
      const kurve = lies('--ease-setzen') || 'ease-out';
      const weg = `scale(${GROESSE_HINTERGRUND})`;
      const neu: Animation[] = [];
      belag.elemente.forEach((el, i) => {
        const t = takte[i];
        neu.push(
          el.animate(
            [
              { opacity: 1, transform: 'none', easing: kurve },
              { opacity: 1, offset: 0.4 },
              { opacity: 0, transform: weg },
            ],
            { delay: t.abnehmenBeginn, duration: t.abnehmenDauer, fill: 'both' },
          ),
        );
      });
      // das Logo geht mit den ersten abgenommenen Fliesen (gleicher Start im selben Bild)
      logoLauf.push(nimmLogoAb());
      beende(laufend);
      laufend.push(...neu);
      // Wartelinie erst aus, wenn das Abnehmen wirklich läuft (Start nach dem Rastern der neuen Seite, E-036)
      void (neu[0]?.ready ?? Promise.resolve()).then(verbergeLaser, verbergeLaser);
      void warte(laufend).then(fertig);
    };

    const zeigeLaser = () => {
      // reduzierte Bewegung und Notaus: keine wandernde Linie, die Blende allein zeigt den Wechsel
      if (ruhig) return;
      laser.style.opacity = '1';
      laserLauf = laser.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${ansicht.hoehe}px)` }], {
        duration: ms('--dauer-5'),
        iterations: Infinity,
        direction: 'alternate',
        easing: lies('--ease-laser') || 'ease-in-out',
      });
    };
    // weich aus (Übergang in bewegung.css), die Wanderung endet erst danach, damit die Linie nicht springt
    const verbergeLaser = () => {
      laser.style.opacity = '0';
      const lauf = laserLauf;
      laserLauf = null;
      if (lauf) window.setTimeout(() => lauf.cancel(), ms('--dauer-1'));
    };

    // Wechsel nach einem Klick (oder einem vorgemerkten Link): Hier geschieht nur das Nötigste; Belag, Sperre und Animationen
    // entstehen nach dem nächsten Bild (E-031).
    const starteVor = (ziel: URL) => {
      angefordert = true;
      verlauf(false);
      router.prefetch(ziel.pathname + ziel.search);
      merkeScroll(adresse());
      pfadRef.current = location.pathname;
      nachDemMalen(() => {
        angefordert = false;
        senden.current({ typ: 'start', ziel: ziel.pathname + ziel.search + ziel.hash, richtung: 'vor' });
      });
    };

    const freigeben = () => {
      stoppeUhren();
      zurueckAusAufschub = false;
      sofortAus();
      sofortAus = () => undefined;
      beende(laufend);
      verbergeLaser();
      if (belag) for (const el of belag.elemente) el.style.opacity = '0';
      blende.style.opacity = '0';
      logoNummer++;
      beende(logoLauf);
      if (logoBild) logoBild.style.opacity = '';
      sperre(false);
      stelle('ruhe');
      // ein Link, den die Tastatur während des Abnehmens wählte: jetzt dorthin wechseln
      // (nicht, wenn er inzwischen auf die angezeigte Seite zeigt: nie Fliesen auf derselben Seite)
      const nachgeholt = vorgemerkt;
      vorgemerkt = null;
      if (nachgeholt && !angefordert && !gleicherPfad(nachgeholt.pathname, location.pathname)) starteVor(nachgeholt);
    };

    const navigiere = () => {
      const ziel = lage.ziel;
      if (!ziel) return;
      // ein neuer Klick überholt ein Zurück oder Vor, dessen Seite nie kam (Abbruch): sonst hielte verlaufZiel den Pfad-Effekt
      // für jede folgende Seite an, bis eine Navigation genau diesen Pfad trifft (Befund E3-B01-FIX-2, F2)
      ausVerlauf = false;
      verlaufZiel = null;
      auftrag++;
      startTransition(() => router.push(ziel));
      if (gleicherPfad(new URL(ziel, location.href).pathname, pfadRef.current)) bereitOhnePfadwechsel();
      // React startet eine View Transition auch bei B-01-Wechseln, die eine <ViewTransition> ein- oder aushängen (Plan-Morph
      // auf /leistungen): unter dem Boden sofort beenden, solange er liegt (höchstens bis zum Ende des Wartens)
      const bis = performance.now() + WARTEN_HOECHSTENS;
      const wache = () => {
        if (aktiverUebergang()) beendeUebergang();
        if (performance.now() < bis && (lage.zustand === 'legen' || lage.zustand === 'bedeckt' || lage.zustand === 'warten')) {
          requestAnimationFrame(wache);
        }
      };
      requestAnimationFrame(wache);
    };

    const starteWarten = () => {
      uhren.push(
        window.setTimeout(() => senden.current({ typ: 'zeit-laser' }), LASER_NACH),
        window.setTimeout(() => senden.current({ typ: 'zeit-ende' }), WARTEN_HOECHSTENS),
      );
    };

    const ausfuehren = (aktion: Aktion) => {
      switch (aktion) {
        case 'lege':
          return lege();
        case 'liege':
          liege();
          return starteWarten();
        case 'zeige-logo':
          return zeigeLogo();
        case 'halte-logo':
          return halteLogo();
        case 'navigiere':
          navigiere();
          return starteWarten();
        case 'reiche-nach':
          neuAbschicken();
          return starteWarten();
        case 'zeige-laser':
          return zeigeLaser();
        case 'verberge-laser':
          // beim Übergang zum Abnehmen übernimmt nimmAb() das Ausblenden, sobald die Fliesen sich bewegen
          if (lage.zustand === 'abnehmen') return;
          return verbergeLaser();
        case 'nimm-ab':
          return nimmAb();
        case 'blende-aus': {
          // Seite braucht länger als 3 s: Boden blendet weg, die Navigation läuft normal weiter. Die Fliesen bleiben liegen,
          // bis die Schicht unsichtbar ist (freigeben beendet sie), sonst verschwände der Boden in einem Bild. Fokus (und aus
          // dem Verlauf den Scroll) setzt der Pfad-Effekt, wenn die Seite doch noch kommt; steht sie schon da (kam kurz vor
          // Ablauf, „bereit“ wartete noch auf Ruhe), hier sofort (Gegenprüfung E3-B01-FIX).
          stoppeUhren();
          sperre(false);
          if (seiteDa === auftrag) {
            if (zurueckAusAufschub) window.scrollTo({ top: gemerkterScroll(), left: 0, behavior: 'instant' });
            zurueckAusAufschub = false;
            fokussiereUeberschrift();
          } else nachAbbruch = zurueckAusAufschub ? 'verlauf' : 'vor';
          const teile = [schicht.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms('--dauer-1'), fill: 'forwards' })];
          void warte(teile).then(() => {
            senden.current({ typ: 'ausgeblendet' });
            for (const a of teile) a.cancel();
          });
          return;
        }
        case 'freigeben':
          return freigeben();
      }
    };

    // data-zustand folgt bei jedem Schritt dem Automaten (auch bedeckt, warten, abbruch; Befund E2-PRUEF-04), vor den Aktionen.
    senden.current = (e) => {
      const { lage: neu, aktionen } = schritt(lage, e);
      lage = neu;
      if (schicht.dataset.zustand !== lage.zustand) stelle(lage.zustand);
      for (const a of aktionen) ausfuehren(a);
    };

    // Plan-Morph: Plan im alten Bild benennen, navigieren, warten bis die neue Seite mit ihrem Plan steht (während der
    // Aktualisierung ruht das Rendern, darum setTimeout statt requestAnimationFrame), Plan im neuen Bild benennen.
    const morph = (a: HTMLAnchorElement) => {
      nachAbbruch = null;
      ausVerlauf = false;
      verlaufZiel = null;
      const plan = a.dataset.uebergangPlan ?? '';
      const ziel = new URL(a.href);
      const zielPfad = ziel.pathname.replace(/\/+$/, '');
      const quelle = a.closest('[data-motion="sig-plan"]')?.querySelector<HTMLElement>(`[data-plan-uebergang="${plan}"]`);
      router.prefetch(ziel.pathname + ziel.search);
      pfadRef.current = location.pathname;
      let neu: HTMLElement | undefined;
      const d = document as Document & {
        startViewTransition: (o: { update: () => Promise<void>; types: string[] }) => Uebergang & { ready: Promise<unknown> };
      };
      benenne(quelle, plan);
      morphOffen = true;
      const lauf = d.startViewTransition({
        types: [UEBERGANG_TYP],
        update: () =>
          new Promise<void>((fertig) => {
            benenne(quelle, null);
            startTransition(() => router.push(ziel.pathname + ziel.search + ziel.hash));
            const bis = performance.now() + MORPH_WARTEN;
            const pruefe = () => {
              if (location.pathname.replace(/\/+$/, '') === zielPfad) {
                neu = [...document.querySelectorAll<HTMLElement>(`[data-plan-uebergang="${plan}"]`)].find(
                  (el) => el !== quelle && el.getClientRects().length > 0,
                );
              }
              if (neu || performance.now() > bis || !morphOffen) {
                if (morphOffen) benenne(neu, plan);
                morphOffen = false;
                fertig();
              } else window.setTimeout(pruefe, 16);
            };
            pruefe();
          }),
      });
      morphLauf = lauf;
      // ein übersprungener Morph (Zurück, B-01 legt) ist kein Fehler
      void lauf.ready.catch(() => undefined);
      void lauf.finished
        .catch(() => undefined)
        .finally(() => {
          if (morphLauf === lauf) morphLauf = null;
          morphOffen = false;
          benenne(neu, null);
          benenne(quelle, null);
        });
    };

    const klick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      // Zustand der angezeigten Seite merken, bevor ein Anker derselben Seite einen Eintrag ohne Zustand anlegt (stempeln)
      merkeNextZustand();
      const grund = pruefeKlick({
        taste: e.button,
        zusatztaste: e.metaKey || e.ctrlKey || e.shiftKey || e.altKey,
        bereitsVerhindert: e.defaultPrevented,
        ziel: a.href,
        hier: location.href,
        target: a.getAttribute('target'),
        download: a.hasAttribute('download'),
        keinVerlegen: a.closest('[data-kein-verlegen]') !== null,
        eigenerUebergang: a.closest('[data-uebergang]') !== null && lage.zustand === 'ruhe' && !angefordert && !morphOffen && uebergangMoeglich(),
      });
      // Der Morph wartet noch auf die neue Seite (das Bild steht still): ein zweiter interner Klick ruht, wie ein Doppelklick
      if (morphOffen && grund === 'verlegen') {
        e.preventDefault();
        return;
      }
      if (grund === 'eigener-uebergang') {
        e.preventDefault();
        merkeScroll(adresse());
        eigenerWechsel = true;
        verlauf(false);
        morph(a);
        return;
      }
      if (grund !== 'verlegen') return;
      e.preventDefault();
      // Tastatur während des Abnehmens (inert ist schon gefallen, Enter auf einem Link der neuen Seite; Zeiger treffen die
      // Schicht): nicht verschlucken, sondern vormerken, der Wechsel beginnt in freigeben (Gegenprüfung E3-B01, Befund 4)
      if (lage.zustand === 'abnehmen' && e.detail === 0) {
        vorgemerkt = new URL(a.href);
        return;
      }
      if (lage.zustand !== 'ruhe' || angefordert) return; // Doppelklick: kein zweiter Wechsel
      starteVor(new URL(a.href));
    };

    // Das angehaltene popstate geht mit dem aktuellen history.state an Next (der Browser steht schon auf dem Ziel). Die Nummer
    // zählt vorher hoch: React kann beim popstate synchron rendern, der Pfad-Effekt läuft dann noch im dispatchEvent.
    const neuAbschicken = () => {
      zurueckAusAufschub = true;
      auftrag++;
      const schonDa = gleicherPfad(location.pathname, pfadRef.current);
      eigenerPopstate = true;
      try {
        window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
      } finally {
        eigenerPopstate = false;
      }
      if (schonDa) bereitOhnePfadwechsel();
    };

    const ausDemVerlauf = () => {
      ausVerlauf = true;
      verlaufZiel = location.pathname;
    };

    steuerung = {
      popstate: (e) => {
        merkeNextZustand();
        // Jedes Zurück oder Vor ersetzt einen beim Abnehmen vorgemerkten Link und einen offenen Abbruch: sonst führte freigeben()
        // nach dem Zurück doch noch zum vorgemerkten Link, und der Pfad-Effekt scrollte einen späteren Wechsel auf eine
        // gemerkte Stelle (Gegenprüfung E3-B01-FIX)
        vorgemerkt = null;
        nachAbbruch = null;
        // Zurück, während der Morph noch auf die neue Seite wartet: Next soll es sehen (verwirft die offene Navigation),
        // der Morph endet ohne Gleiten; Scroll und Fokus der Seite aus dem Verlauf setzt der Pfad-Effekt
        if (morphOffen) {
          morphOffen = false;
          beendeUebergang();
          ausDemVerlauf();
          verlauf(true);
          if (!gleicherPfad(location.pathname, pfadRef.current)) verlaufOhneBoden = true;
          return false;
        }
        const state = e.state as { __NA?: boolean } | null;
        // Ohne Next-Zustand: nichts tun (Anker derselben Seite bekommen ihn beim hashchange, siehe stempeln).
        if (!state?.__NA) return false;
        const gleich = gleicherPfad(location.pathname, pfadRef.current);
        if (ZURUECK === 'sicher') {
          if (lage.zustand !== 'ruhe' || gleich) return false;
          ausDemVerlauf();
          verlauf(true);
          senden.current({ typ: 'start-liegend', richtung: 'zurueck' });
          return false;
        }
        // Boden wird noch gelegt, navigiert ist noch nicht: das Ereignis wartet und wird nachgereicht, sobald der Boden liegt
        // (aus einem Vorwärtswechsel wird ein Wechsel aus dem Verlauf, kein router.push mehr; Prüfung E-043)
        if (lage.zustand === 'legen') {
          ausDemVerlauf();
          verlauf(true);
          senden.current({ typ: 'umkehr' });
          return true;
        }
        // Boden liegt, die Navigation läuft schon: Next übernimmt das Ereignis (verwirft die offene Navigation), der Boden
        // wartet auf die Seite aus dem Verlauf und deckt sie mit ihrer gemerkten Scrollstellung auf
        if (lage.zustand === 'bedeckt' || lage.zustand === 'warten') {
          ausDemVerlauf();
          verlauf(true);
          auftrag++;
          zurueckAusAufschub = true;
          // Zurück und Vor ohne Mindestzeit des Logos; ein schon gemerktes „bereit“ gehörte zur alten Navigation
          senden.current({ typ: 'neuer-auftrag' });
          if (gleich) bereitOhnePfadwechsel();
          return false;
        }
        // gleicher Pfad in Ruhe, beim Abnehmen oder nach dem Abbruch: Next allein (Anker, dieselbe Seite)
        if (gleich) return false;
        ausDemVerlauf();
        verlauf(true);
        merkeScroll(angezeigt);
        // Fliesen werden schon abgenommen (oder blenden nach dem Abbruch aus): ohne Boden an Next, Scroll und Fokus danach
        if (lage.zustand !== 'ruhe') {
          verlaufOhneBoden = true;
          return false;
        }
        senden.current({ typ: 'start', ziel: '', richtung: 'zurueck' });
        return true;
      },
    };

    // Ein Anker derselben Seite (Hauptknopf #termin, Sprunglink, Sprungindex) legt einen Verlaufseintrag ohne Zustand an; Next
    // überginge ihn beim Zurück von einer anderen Seite (Adresse wechselt, Inhalt bleibt). Darum bekommt er den Zustand der
    // angezeigten Seite (dieselbe Seite, also derselbe Baum); mit __NA reicht Nexts replaceState ihn unverändert durch.
    const stempeln = () => {
      const z = history.state as { __NA?: boolean } | null;
      if (z?.__NA) {
        nextZustand = z;
        return;
      }
      if (nextZustand) history.replaceState({ ...nextZustand }, '', location.href);
    };

    angezeigt = adresse();
    merkeNextZustand();
    let koernungAus: () => void = () => undefined;
    const vorab = () => {
      liesVorab();
      koernungAus = bereiteKoernung(schicht);
      bereiteLogo();
    };
    const leerlauf = window.requestIdleCallback ? window.requestIdleCallback(vorab) : window.setTimeout(vorab, 1);
    const speichernVorVerlassen = () => merkeScroll(adresse());
    document.addEventListener('click', klick, true);
    window.addEventListener('pagehide', speichernVorVerlassen);
    window.addEventListener('hashchange', stempeln);
    window.addEventListener('resize', neuVermessen);
    return () => {
      document.removeEventListener('click', klick, true);
      window.removeEventListener('pagehide', speichernVorVerlassen);
      window.removeEventListener('hashchange', stempeln);
      window.removeEventListener('resize', neuVermessen);
      if (window.cancelIdleCallback) window.cancelIdleCallback(leerlauf);
      else window.clearTimeout(leerlauf);
      koernungAus();
      steuerung = null;
      vorgemerkt = null;
      freigeben();
    };
  }, [router]);

  // Neue Seite ist da: nach zwei Bildern (Layout und Malen der neuen Seite) und sobald der Hauptfaden frei ist, werden die
  // Fliesen abgenommen. Ohne die Ruhe startete das Abnehmen, während die neue Seite noch rechnete, und der Boden lag sichtbar still
  // (Sichtabnahme E2, Befund 1 und 2; E-036). Bis dahin zeigt die Wartelinie das Warten; spätestens nach 400 ms geht es los.
  // Gemeldet wird nur, wenn die Seite nach der zuletzt abgeschickten Navigation erschien (auftrag, spaeterBereit, E-043).
  // Layout-Effekt: Er läuft im selben Task wie das Einhängen der neuen Seite, kein popstate kommt dazwischen. Als passiver
  // Effekt konnte Zurück genau beim Eintreffen der Klick-Navigation den alten Pfad als „gleich“ sehen und ausVerlauf verbrauchen,
  // danach fehlte k-verlauf (Gegenprüfung E3-B01, Befund 6). React 19 warnt beim Rendern auf dem Server nicht mehr.
  useLayoutEffect(() => {
    if (pfad === pfadRef.current) return;
    pfadRef.current = pfad;
    angezeigt = adresse();
    // Seite der überholten Klick-Navigation, eingehängt nach einem Zurück, aber vor dessen Seite: nichts verbrauchen
    if (ausVerlauf && verlaufZiel !== null && !gleicherPfad(pfad, verlaufZiel)) return;
    verlaufZiel = null;
    seiteDa = auftrag;
    // ein Wechsel, der weder aus dem Verlauf noch über den Klick-Lauscher kam (z. B. router.push nach einem Formular), läuft
    // mit Bewegung; die Klasse fällt dann erst hier weg, die Bewegungen starten einen Takt später
    if (!ausVerlauf) verlauf(false);
    ausVerlauf = false;
    if (eigenerWechsel) {
      // nach dem Plan-Morph: Fokus auf die H1 wie nach jedem Wechsel (Scroll 0 setzt Next selbst)
      eigenerWechsel = false;
      void (aktiverUebergang()?.finished ?? Promise.resolve()).finally(fokussiereUeberschrift);
    }
    // Seite kam ohne Boden (Zurück während des Abnehmens) oder nach dem Abbruch: Scroll (aus dem Verlauf) und Fokus hier
    if (verlaufOhneBoden || nachAbbruch) {
      if (verlaufOhneBoden || nachAbbruch === 'verlauf') window.scrollTo({ top: gemerkterScroll(), left: 0, behavior: 'instant' });
      verlaufOhneBoden = false;
      nachAbbruch = null;
      fokussiereUeberschrift();
    }
    merkeNextZustand();
    return spaeterBereit(auftrag, () => senden.current({ typ: 'bereit' }));
  }, [pfad]);

  return (
    <div ref={schichtRef} className="verlegen" data-zustand="ruhe" aria-hidden="true">
      <div ref={bodenRef} className="verlegen-boden" />
      <div ref={laserRef} className="verlegen-laser" />
      <div ref={blendeRef} className="verlegen-blende" />
      <div ref={logoRef} className="verlegen-logo" />
    </div>
  );
}
