'use client';

// Seitenwechsel B-01 „Verlegen“ (KERN K-007, Technik E-010, Ablauf E-043): Fliesen 2:1 quer im Drittelverband werden
// Fliese für Fliese von rechts nach links über die ganze Seite gelegt, jede setzt einzeln auf (tak, tak, tak); darunter
// wechselt die Seite, dann werden die Fliesen in derselben Richtung einzeln abgenommen und weichen in den Hintergrund
// zurück. Eine feste Schicht (z-60) außerhalb von main, nur transform und opacity über WAAPI; die Fliesen entstehen erst
// beim ersten Wechsel (DOM und TBT der Erstansicht).
// Klicks fängt ein Lauscher in der Capture-Phase ab (next/link prüft danach e.defaultPrevented und navigiert nicht selbst),
// dann folgt router.push in startTransition. Zurück und Vor: gespiegelt mit 70 % der Dauer, Weg nach ZURUECK.
import { startTransition, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { pruefeKlick } from '@/lib/verlegen/linkfilter';
import { LASER_NACH, RUHE, WARTEN_HOECHSTENS, schritt, type Aktion, type Ereignis, type Lage } from '@/lib/verlegen/automat';
import {
  AUFSETZEN_FLUG,
  AUFSETZEN_GROESSE,
  GROESSE_HINTERGRUND,
  stueckplan,
  verlegeRaster,
  wechselDauer,
  type Fliese,
  type Mass,
  type Stuecktakt,
} from '@/lib/verlegen/raster';

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
  for (const name of ['--verlegen-gesamt', '--verlegen-gesamt-folge', '--verlegen-ruhig', '--ease-aufsetzen', '--ease-weg', '--ease-laser', '--dauer-1', '--dauer-5']) lies(name);
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
 *  Verzögerung der Kreuzlinie hinter dem Intro (k-intro-start, E-037), sonst liefe SIG-1 bei jeder Rückkehr nach / und
 *  die Flucht des Plans auf anderen Seiten verspätet. Eine Änderung an html, während der Boden schließt. */
function ohneStartbild(): void {
  document.documentElement.classList.remove('k-startbild', 'k-intro-start');
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

function fokussiereUeberschrift(): void {
  const h1 = document.querySelector<HTMLElement>('#main-content h1');
  if (!h1) return;
  if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
  h1.focus({ preventScroll: true });
}

interface Belag {
  breite: number;
  hoehe: number;
  mass: Mass;
  fliesen: Fliese[];
  elemente: HTMLElement[];
}

/** Baut den Belag für die aktuelle Ansicht (nur bei neuer Größe neu). */
function baueBelag(boden: HTMLElement, alt: Belag | null): Belag {
  const breite = window.innerWidth;
  const hoehe = window.innerHeight;
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
  const pfadRef = useRef(pfad);
  const senden = useRef<(e: Ereignis) => void>(() => undefined);

  useEffect(() => {
    const schicht = schichtRef.current;
    const boden = bodenRef.current;
    const laser = laserRef.current;
    const blende = blendeRef.current;
    if (!schicht || !boden || !laser || !blende) return;

    let lage: Lage = RUHE;
    let belag: Belag | null = null;
    let takte: Stuecktakt[] = [];
    let ruhig = false;
    let gesamt = Number.NaN;
    let zurueckAusAufschub = false;
    const laufend: Animation[] = [];
    const uhren: number[] = [];
    let laserLauf: Animation | null = null;
    let angefordert = false;

    const stelle = (z: string) => {
      schicht.dataset.zustand = z;
    };
    const stoppeUhren = () => {
      for (const u of uhren) window.clearTimeout(u);
      uhren.length = 0;
    };

    const lege = () => {
      beendeUebergang();
      gesamt = gesamtdauer(lage.richtung);
      ruhig = !bewegungErlaubt() || !Number.isFinite(gesamt);
      merkeGewechselt();
      ohneStartbild();
      sperre(true);
      if (ruhig) {
        laufend.push(blende.animate([{ opacity: 0 }, { opacity: 1 }], { duration: halbeBlende(), fill: 'forwards' }));
        void warte(laufend).then(() => senden.current({ typ: 'gelegt' }));
        return;
      }
      belag = baueBelag(boden, belag);
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
      void warte(laufend).then(() => senden.current({ typ: 'gelegt' }));
    };

    const liege = () => {
      beendeUebergang();
      gesamt = gesamtdauer(lage.richtung);
      ruhig = !bewegungErlaubt() || !Number.isFinite(gesamt);
      ohneStartbild();
      sperre(true);
      if (ruhig) {
        blende.style.opacity = '1';
        return;
      }
      belag = baueBelag(boden, belag);
      takte = stueckplan(belag.fliesen, belag.mass, belag.breite, gesamt, lage.richtung);
      belag.elemente.forEach((el, i) => {
        el.style.zIndex = String(takte[i].ebene);
        el.style.opacity = '1';
        (el.children[0] as HTMLElement).style.opacity = '0';
      });
    };

    const nimmAb = () => {
      stoppeUhren();
      // Neue Seite liegt darunter: Scroll an den Anfang (oder gemerkte Stelle bei Zurück), Fokus auf die H1.
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
        void warte(laufend).then(fertig);
        return;
      }
      // Fliese für Fliese in derselben Reihenfolge wie beim Legen: jede weicht in den Hintergrund zurück (wird kleiner und
      // blendet aus), die neue Seite erscheint von der Startkante her. Die erste Fliese beginnt sofort, damit der Boden nach
      // dem Legen nicht still liegt (Sichtabnahme E2, Befund 1; E-036).
      const kurve = lies('--ease-weg') || 'ease-in';
      const weg = `scale(${GROESSE_HINTERGRUND})`;
      const neu: Animation[] = [];
      belag.elemente.forEach((el, i) => {
        const t = takte[i];
        neu.push(
          el.animate(
            [
              { opacity: 1, transform: 'none', easing: kurve },
              { opacity: 1, offset: 0.2 },
              { opacity: 0, transform: weg },
            ],
            { delay: t.abnehmenBeginn, duration: t.abnehmenDauer, fill: 'both' },
          ),
        );
      });
      beende(laufend);
      laufend.push(...neu);
      // Laserlinie erst aus, wenn das Abnehmen wirklich läuft (Start nach dem Rastern der neuen Seite, E-036)
      void (neu[0]?.ready ?? Promise.resolve()).then(verbergeLaser, verbergeLaser);
      void warte(laufend).then(fertig);
    };

    const zeigeLaser = () => {
      laser.style.opacity = '1';
      laserLauf = laser.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${window.innerHeight}px)` }], {
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

    const freigeben = () => {
      stoppeUhren();
      beende(laufend);
      verbergeLaser();
      if (belag) for (const el of belag.elemente) el.style.opacity = '0';
      blende.style.opacity = '0';
      sperre(false);
      stelle('ruhe');
    };

    const navigiere = () => {
      const ziel = lage.ziel;
      if (!ziel) return;
      startTransition(() => router.push(ziel));
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
        case 'navigiere':
          navigiere();
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
          // Seite braucht länger als 3 s: Boden weg, die Navigation läuft normal weiter.
          stoppeUhren();
          beende(laufend);
          sperre(false);
          const teile = [schicht.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms('--dauer-1'), fill: 'forwards' })];
          void warte(teile).then(() => {
            for (const a of teile) a.cancel();
            senden.current({ typ: 'ausgeblendet' });
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
      if (lage.zustand !== 'ruhe' || angefordert) return; // Doppelklick: kein zweiter Wechsel
      angefordert = true;
      verlauf(false);
      const ziel = new URL(a.href);
      router.prefetch(ziel.pathname + ziel.search);
      merkeScroll(adresse());
      pfadRef.current = location.pathname;
      // Der Klick selbst tut nur das Nötigste; Belag, Sperre und Animationen entstehen nach dem nächsten Bild (E-031).
      nachDemMalen(() => {
        angefordert = false;
        senden.current({ typ: 'start', ziel: ziel.pathname + ziel.search + ziel.hash, richtung: 'vor' });
      });
    };

    const neuAbschicken = () => {
      zurueckAusAufschub = true;
      eigenerPopstate = true;
      try {
        window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
      } finally {
        eigenerPopstate = false;
      }
    };

    steuerung = {
      popstate: (e) => {
        // Zurück, während der Morph noch auf die neue Seite wartet: Next soll es sehen (verwirft die offene Navigation),
        // der Morph endet ohne Gleiten
        if (morphOffen) {
          morphOffen = false;
          beendeUebergang();
          ausVerlauf = true;
          verlauf(true);
          return false;
        }
        const state = e.state as { __NA?: boolean } | null;
        // Ohne Next-Zustand (z. B. Sprunglink #main-content) oder bei gleichem Pfad: nichts tun.
        if (!state?.__NA || location.pathname === pfadRef.current) return false;
        ausVerlauf = true;
        verlauf(true);
        if (ZURUECK === 'sicher') {
          if (lage.zustand !== 'ruhe') return false;
          senden.current({ typ: 'start-liegend', richtung: 'zurueck' });
          return false;
        }
        if (lage.zustand === 'legen' || lage.zustand === 'bedeckt' || lage.zustand === 'warten') return true; // folgt beim Neuabschicken
        if (lage.zustand !== 'ruhe') return false;
        merkeScroll(angezeigt);
        senden.current({ typ: 'start', ziel: '', richtung: 'zurueck' });
        void warte(laufend).then(() => {
          if (lage.zustand === 'bedeckt') {
            neuAbschicken();
            starteWarten();
          }
        });
        return true;
      },
    };

    angezeigt = adresse();
    let koernungAus: () => void = () => undefined;
    const vorab = () => {
      liesVorab();
      koernungAus = bereiteKoernung(schicht);
    };
    const leerlauf = window.requestIdleCallback ? window.requestIdleCallback(vorab) : window.setTimeout(vorab, 1);
    const speichernVorVerlassen = () => merkeScroll(adresse());
    document.addEventListener('click', klick, true);
    window.addEventListener('pagehide', speichernVorVerlassen);
    return () => {
      document.removeEventListener('click', klick, true);
      window.removeEventListener('pagehide', speichernVorVerlassen);
      if (window.cancelIdleCallback) window.cancelIdleCallback(leerlauf);
      else window.clearTimeout(leerlauf);
      koernungAus();
      steuerung = null;
      freigeben();
    };
  }, [router]);

  // Neue Seite ist da: nach zwei Bildern (Layout und Malen der neuen Seite) und sobald der Hauptfaden frei ist, werden die
  // Fliesen abgenommen. Ohne die Ruhe startete das Abnehmen, während die neue Seite noch rechnete, und der Boden lag sichtbar still
  // (Sichtabnahme E2, Befund 1 und 2; E-036). Bis dahin zeigt die Laserlinie das Warten; spätestens nach 400 ms geht es los.
  useEffect(() => {
    if (pfad === pfadRef.current) return;
    pfadRef.current = pfad;
    angezeigt = adresse();
    // ein Wechsel, der weder aus dem Verlauf noch über den Klick-Lauscher kam (z. B. router.push nach einem Formular), läuft
    // mit Bewegung; die Klasse fällt dann erst hier weg, die Bewegungen starten einen Takt später
    if (!ausVerlauf) verlauf(false);
    ausVerlauf = false;
    if (eigenerWechsel) {
      // nach dem Plan-Morph: Fokus auf die H1 wie nach jedem Wechsel (Scroll 0 setzt Next selbst)
      eigenerWechsel = false;
      void (aktiverUebergang()?.finished ?? Promise.resolve()).finally(fokussiereUeberschrift);
    }
    let zweites = 0;
    let ruhe = 0;
    const melden = () => senden.current({ typ: 'bereit' });
    const erstes = requestAnimationFrame(() => {
      zweites = requestAnimationFrame(() => {
        ruhe = window.requestIdleCallback ? window.requestIdleCallback(melden, { timeout: 400 }) : window.setTimeout(melden, 0);
      });
    });
    return () => {
      cancelAnimationFrame(erstes);
      cancelAnimationFrame(zweites);
      if (window.cancelIdleCallback) window.cancelIdleCallback(ruhe);
      else window.clearTimeout(ruhe);
    };
  }, [pfad]);

  return (
    <div ref={schichtRef} className="verlegen" data-zustand="ruhe" aria-hidden="true">
      <div ref={bodenRef} className="verlegen-boden" />
      <div ref={laserRef} className="verlegen-laser" />
      <div ref={blendeRef} className="verlegen-blende" />
    </div>
  );
}
