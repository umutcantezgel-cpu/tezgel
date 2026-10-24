'use client';

// Seitenwechsel B-01 „Wind“ (KERN K-007; E-042, Entscheidung des Auftraggebers; vorher „Verlegen“ mit ganz bedeckendem Boden):
// Ein Band aus Fliesen 2:1 quer im Drittelverband weht wie ein Windstoß von rechts nach links über die Seite. Vor dem Band
// steht noch die alte Seite, hinter ihm ist schon die neue zu sehen; der Bildschirm ist nie ganz bedeckt. Technik: eine View
// Transition (Typ „wind“). Die alte Seite steht als eingefrorenes Bild, die neue ist live und wird per Clip hinter der Naht
// aufgedeckt, die immer unter dem Band liegt; das Band ist eine eigene Gruppe darüber und flattert leicht (bewegung.css).
// Klicks fängt ein Lauscher in der Capture-Phase ab (next/link prüft danach e.defaultPrevented und navigiert nicht selbst),
// dann folgt router.push in startTransition, während das Bild steht. Zurück und Vor im Browser: gespiegelt (Typ
// „wind-zurueck“, 70 % der Dauer), das popstate-Ereignis wird angehalten und in der Aktualisierung neu abgeschickt.
// Reduzierte Bewegung: Überblendung 150 ms (Typ „wind-ruhig“). Ohne View Transitions im Browser: normaler Wechsel.
import { startTransition, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { pruefeKlick } from '@/lib/verlegen/linkfilter';
import { wechselDauer, type Richtung } from '@/lib/verlegen/raster';
import { WARTEN_HOECHSTENS, windBand, windWeg, type WindBand, type WindZustand } from '@/lib/verlegen/wind';

/** Zurück und Vor: Der Capture-Lauscher hält popstate an und schickt das Ereignis in der Aktualisierung der View Transition mit
 *  dem aktuellen history.state neu ab; die Scrollstellung merkt die Schicht selbst (E-020, E-042). */
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
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
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
  for (const name of ['--verlegen-gesamt', '--verlegen-gesamt-folge']) lies(name);
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

/** Dauer aus einer CSS-Variablen in ms (NaN, wenn sie fehlt); der Minifier schreibt 1200ms als 1.2s, deshalb zählt die Einheit. */
function ms(name: string): number {
  const roh = lies(name);
  const wert = Number.parseFloat(roh);
  return /\ds$/.test(roh) && !roh.endsWith('ms') ? wert * 1000 : wert;
}

/** Gesamtdauer dieses Wechsels aus den Tokens (K-005); NaN, wenn die Tokens fehlen. */
function gesamtdauer(richtung: Richtung): number {
  return wechselDauer(ms('--verlegen-gesamt'), ms('--verlegen-gesamt-folge'), schonGewechselt(), richtung);
}

function bewegungErlaubt(): boolean {
  const html = document.documentElement;
  return html.classList.contains('k-bewegung') && !html.classList.contains('k-notaus');
}

// Plan-Morph (K-007 seitenwechsel, zurück nach E-037): Links mit data-uebergang="plan-vor" und data-uebergang-plan="<id>"
// führen zu einer Seite, deren Plan (data-plan-uebergang="<id>") derselbe ist wie der im Feld der Übersicht. Ist der Morph
// möglich, startet B-01 statt des Winds eine View Transition (Typ „plan-vor“): Plan im alten Bild benennen,
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

/** Eine laufende View Transition sofort beenden (der Wechsel im DOM bleibt, nur die Animation entfällt). */
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
/** Wechsel ohne View Transition (Browser ohne Unterstützung): Fokus auf die H1 und bei Zurück und Vor die gemerkte
 *  Scrollstellung übernimmt der Pfad-Effekt, sobald die neue Seite steht */
let ohneWind: 'vor' | 'zurueck' | null = null;

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
 *  Scrollstellung, statt bei jeder Rückkehr nach dem Abziehen noch einmal 1,3 s zu wachsen (E2-SICHT-2 Befund 12,
 *  E3-START-04; bewegung.css html.k-verlauf). Ein Vorwärtswechsel nimmt die Klasse vor dem neuen Einstieg wieder weg. */
function verlauf(an: boolean): void {
  document.documentElement.classList.toggle('k-verlauf', an);
}

function fokussiereUeberschrift(): void {
  const h1 = document.querySelector<HTMLElement>('#main-content h1');
  if (!h1) return;
  if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
  h1.focus({ preventScroll: true });
}

/** Sichtbare H1 im Inhalt (Next 16 lässt besuchte Seiten verborgen stehen, ihre H1 hat dann keine Rechtecke). */
function sichtbareUeberschrift(): HTMLElement | null {
  return [...document.querySelectorAll<HTMLElement>('#main-content h1')].find((h) => h.getClientRects().length > 0) ?? null;
}

/** View Transitions mit Typen kann dieser Browser (sonst wechselt die Seite ohne Wind). */
function windMoeglich(): boolean {
  return (
    typeof (document as Document & { startViewTransition?: unknown }).startViewTransition === 'function' &&
    typeof CSS !== 'undefined' &&
    CSS.supports('selector(:active-view-transition-type(wind))')
  );
}

/** Werte des Winds als Variablen an html (bewegung.css liest sie in den Keyframes der Gruppen), oder entfernen. */
function setzeWindWerte(werte: Record<string, string> | null): void {
  const stil = document.documentElement.style;
  for (const name of ['--wind-dauer', '--wind-band-von', '--wind-band-bis', '--wind-naht-von', '--wind-naht-bis']) {
    if (werte?.[name] !== undefined) stil.setProperty(name, werte[name]);
    else stil.removeProperty(name);
  }
}

/** Baut die Fliesen des Bands (nur bei neuer Größe neu): Reihen mit je zwei Fliesen, versetzt im Drittelverband. */
function baueBand(element: HTMLElement, alt: (WindBand & { fuer: string }) | null): WindBand & { fuer: string } {
  const fuer = `${window.innerWidth}x${window.innerHeight}`;
  if (alt && alt.fuer === fuer) return alt;
  const band = windBand(window.innerWidth, window.innerHeight);
  const { mass } = band;
  element.style.width = `${band.breite}px`;
  element.style.height = `${band.hoehe}px`;
  const reihen = band.reihen.map((r) => {
    const reihe = document.createElement('div');
    reihe.className = 'verlegen-reihe';
    // Lage über left und top: translate gehört dem Flattern (bewegung.css wind-flattern)
    reihe.style.left = `${r.x}px`;
    reihe.style.top = `${r.y}px`;
    reihe.style.width = `${2 * mass.laenge}px`;
    reihe.style.height = `${mass.hoehe}px`;
    reihe.style.setProperty('--wind-auslenkung', `${r.auslenkung}px`);
    for (let k = 0; k < 2; k++) {
      const fliese = document.createElement('div');
      fliese.className = 'verlegen-fliese';
      fliese.style.width = `${mass.laenge}px`;
      fliese.style.height = `${mass.hoehe}px`;
      fliese.style.translate = `${k * mass.laenge}px 0`;
      fliese.style.setProperty('--fuge', `${mass.fuge / 2}px`);
      fliese.innerHTML =
        '<span class="verlegen-schatten-flug"></span><span class="verlegen-oberflaeche"><span class="verlegen-glanz"></span></span>';
      reihe.append(fliese);
    }
    return reihe;
  });
  element.replaceChildren(...reihen);
  return { ...band, fuer };
}

type Wind = { skipTransition: () => void; finished: Promise<unknown>; ready: Promise<unknown> };

export default function Verlegen() {
  const router = useRouter();
  const pfad = usePathname();
  const schichtRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const pfadRef = useRef(pfad);

  useEffect(() => {
    const schicht = schichtRef.current;
    const bandElement = bandRef.current;
    if (!schicht || !bandElement) return;

    let zustand: WindZustand = 'ruhe';
    let band: (WindBand & { fuer: string }) | null = null;
    let windLauf: Wind | null = null;

    const stelle = (z: WindZustand) => {
      zustand = z;
      schicht.dataset.zustand = z;
    };

    const zeigeBand = (an: boolean) => {
      if (an) {
        bandElement.dataset.sichtbar = '';
        bandElement.style.setProperty('view-transition-name', 'wind');
      } else {
        delete bandElement.dataset.sichtbar;
        delete bandElement.dataset.wehen;
        bandElement.style.removeProperty('view-transition-name');
      }
    };

    /**
     * Ein Wechsel mit Wind. `navigiere` löst den Wechsel aus (router.push oder das angehaltene popstate), `nachher` stellt die
     * Scrollstellung der neuen Seite ein, bevor ihr Bild entsteht. Während der Aktualisierung ruht das Rendern; gewartet wird
     * mit setTimeout, bis die neue Seite mit ihrer H1 steht (höchstens WARTEN_HOECHSTENS).
     */
    const wehe = (richtung: Richtung, navigiere: () => void, nachher: () => void) => {
      ohneStartbild();
      const dauer = gesamtdauer(richtung);
      merkeGewechselt();
      if (!windMoeglich()) {
        ohneWind = richtung;
        navigiere();
        return;
      }
      const ruhig = !bewegungErlaubt() || !Number.isFinite(dauer);
      if (!ruhig) {
        band = baueBand(bandElement, band);
        const weg = windWeg(band, window.innerWidth, richtung);
        setzeWindWerte({
          '--wind-dauer': `${Math.round(dauer)}ms`,
          '--wind-band-von': `${weg.band.von}px`,
          '--wind-band-bis': `${weg.band.bis}px`,
          '--wind-naht-von': `${weg.naht.von}px`,
          '--wind-naht-bis': `${weg.naht.bis}px`,
        });
      }
      const alteUeberschrift = sichtbareUeberschrift();
      stelle('warten');
      const d = document as Document & { startViewTransition: (o: { update: () => Promise<void>; types: string[] }) => Wind };
      let lauf: Wind;
      try {
        lauf = d.startViewTransition({
          types: ruhig ? ['wind-ruhig'] : richtung === 'vor' ? ['wind'] : ['wind', 'wind-zurueck'],
          update: () =>
            new Promise<void>((fertig) => {
              if (!ruhig) zeigeBand(true);
              navigiere();
              const bis = performance.now() + WARTEN_HOECHSTENS;
              const pruefe = () => {
                const neu = sichtbareUeberschrift();
                if ((neu && neu !== alteUeberschrift) || performance.now() > bis) {
                  nachher();
                  fertig();
                } else window.setTimeout(pruefe, 16);
              };
              pruefe();
            }),
        });
      } catch {
        // der Browser verweigert die View Transition (z. B. verborgenes Dokument): normaler Wechsel
        stelle('ruhe');
        setzeWindWerte(null);
        ohneWind = richtung;
        navigiere();
        return;
      }
      windLauf = lauf;
      void lauf.ready.then(
        () => {
          if (windLauf !== lauf) return;
          stelle('wehen');
          // das Flattern der Reihen beginnt mit dem Wind, nicht schon beim Erscheinen des Bands
          bandElement.dataset.wehen = '';
        },
        () => undefined,
      );
      void lauf.finished
        .catch(() => undefined)
        .finally(() => {
          if (windLauf !== lauf) return;
          windLauf = null;
          zeigeBand(false);
          setzeWindWerte(null);
          stelle('ruhe');
          fokussiereUeberschrift();
        });
    };

    /** Ein laufender Wind endet sofort (der Wechsel im DOM bleibt). */
    const beendeWind = () => {
      if (!windLauf) return;
      try {
        windLauf.skipTransition();
      } catch {
        // schon beendet
      }
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
        eigenerUebergang: a.closest('[data-uebergang]') !== null && zustand === 'ruhe' && !morphOffen && uebergangMoeglich(),
      });
      if (grund !== 'verlegen' && grund !== 'eigener-uebergang') return;
      e.preventDefault();
      // Während das Bild auf die neue Seite wartet (Wind oder Morph), ruht ein zweiter Klick wie ein Doppelklick; weht der Wind
      // schon, endet er sofort und der neue Wechsel beginnt
      if (zustand === 'warten' || morphOffen) return;
      if (zustand === 'wehen') beendeWind();
      merkeScroll(adresse());
      verlauf(false);
      if (grund === 'eigener-uebergang') {
        eigenerWechsel = true;
        morph(a);
        return;
      }
      const ziel = new URL(a.href);
      const href = ziel.pathname + ziel.search + ziel.hash;
      router.prefetch(ziel.pathname + ziel.search);
      pfadRef.current = location.pathname;
      wehe(
        'vor',
        () => startTransition(() => router.push(href)),
        () => {
          if (!ziel.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        },
      );
    };

    const neuAbschicken = () => {
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
        // Wartet ein Wind noch auf seine Seite, geht das Ereignis an Next (verwirft die offene Navigation); weht er schon, endet
        // er sofort, und Zurück weht neu
        if (zustand === 'warten') {
          beendeWind();
          return false;
        }
        if (zustand === 'wehen') beendeWind();
        merkeScroll(angezeigt);
        wehe('zurueck', neuAbschicken, () => window.scrollTo({ top: gemerkterScroll(), left: 0, behavior: 'instant' }));
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
      beendeWind();
      zeigeBand(false);
      setzeWindWerte(null);
      stelle('ruhe');
    };
  }, [router]);

  // Neue Seite ist da: Adresse merken, k-verlauf nur nach Zurück und Vor; nach dem Plan-Morph Fokus auf die H1 (nach dem Wind
  // übernimmt das der Wind selbst, sobald er fertig ist)
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
    if (ohneWind) {
      if (ohneWind === 'zurueck') window.scrollTo({ top: gemerkterScroll(), left: 0, behavior: 'instant' });
      ohneWind = null;
      fokussiereUeberschrift();
    }
  }, [pfad]);

  return (
    <div ref={schichtRef} className="verlegen" data-zustand="ruhe" aria-hidden="true">
      <div ref={bandRef} className="verlegen-band" />
    </div>
  );
}
