'use client';

// Seitenwechsel B-01 „Verlegen“ (KERN K-007, Technik E-010): Fliesen 2:1 quer im Drittelverband legen sich von rechts
// über die Seite, darunter wechselt die Seite, dann zieht der Belag nach links ab. Eine feste Schicht (z-60) außerhalb von
// main, nur transform und opacity über WAAPI; die Fliesen entstehen erst beim ersten Wechsel (DOM und TBT der Erstansicht).
// Klicks fängt ein Lauscher in der Capture-Phase ab (next/link prüft danach e.defaultPrevented und navigiert nicht selbst),
// dann folgt router.push in startTransition. Zurück und Vor: gespiegelt mit 70 % der Dauer, Weg nach ZURUECK.
import { startTransition, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { pruefeKlick } from '@/lib/verlegen/linkfilter';
import { LASER_NACH, RUHE, WARTEN_HOECHSTENS, schritt, type Aktion, type Ereignis, type Lage } from '@/lib/verlegen/automat';
import {
  FLUG_ANTEIL,
  GROESSE_FLUG,
  verlegeRaster,
  wechselDauer,
  zeitplan,
  ziehStrecke,
  type Fliese,
  type Mass,
  type Takt,
} from '@/lib/verlegen/raster';

/**
 * aufschub: Der Capture-Lauscher hält popstate an, verlegt gespiegelt und schickt das Ereignis mit dem aktuellen
 * history.state neu ab (Scroll merkt die Schicht selbst). sicher: Der Boden liegt sofort, das Ereignis läuft
 * unverzögert weiter, danach zieht der Belag gespiegelt ab. Entscheidung per Test in E2 (ENTSCHEIDUNGEN.md).
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
  for (const name of ['--verlegen-gesamt', '--verlegen-gesamt-folge', '--verlegen-ruhig', '--ease-hammer', '--ease-weg', '--ease-laser', '--dauer-1', '--dauer-5']) lies(name);
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

/** Der große Moment `startbild` gilt nur beim Laden der Seite, nicht nach einem Seitenwechsel (K-007). */
function ohneStartbild(): void {
  document.documentElement.classList.remove('k-startbild');
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
      '<span class="verlegen-schatten-flug"></span><span class="verlegen-schatten-gesetzt"></span><span class="verlegen-oberflaeche"><span class="verlegen-glanz"></span></span>';
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
    let takte: Takt[] = [];
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
      takte = zeitplan(belag.fliesen, belag.mass, belag.breite, gesamt, lage.richtung);
      const flug = belag.mass.laenge * FLUG_ANTEIL * (lage.richtung === 'vor' ? 1 : -1);
      const kurve = lies('--ease-hammer') || 'ease-out';
      belag.elemente.forEach((el, i) => {
        const t = takte[i];
        el.style.zIndex = String(t.ebene);
        const zeit = { delay: t.legenBeginn, duration: t.legenDauer, easing: kurve, fill: 'both' as const };
        laufend.push(
          el.animate(
            [
              { opacity: 0, transform: `translateX(${flug}px) scale(${GROESSE_FLUG})` },
              { opacity: 1, offset: 0.3 },
              { opacity: 1, transform: 'none' },
            ],
            zeit,
          ),
          (el.children[0] as HTMLElement).animate([{ opacity: 1 }, { opacity: 0 }], zeit),
          (el.children[1] as HTMLElement).animate([{ opacity: 0 }, { opacity: 1 }], zeit),
        );
      });
      void warte(laufend).then(() => senden.current({ typ: 'gelegt' }));
    };

    const liege = () => {
      gesamt = gesamtdauer(lage.richtung);
      ruhig = !bewegungErlaubt() || !Number.isFinite(gesamt);
      ohneStartbild();
      sperre(true);
      if (ruhig) {
        blende.style.opacity = '1';
        return;
      }
      belag = baueBelag(boden, belag);
      takte = zeitplan(belag.fliesen, belag.mass, belag.breite, gesamt, lage.richtung);
      belag.elemente.forEach((el, i) => {
        el.style.zIndex = String(takte[i].ebene);
        el.style.opacity = '1';
        (el.children[0] as HTMLElement).style.opacity = '0';
        (el.children[1] as HTMLElement).style.opacity = '1';
      });
    };

    const ziehe = () => {
      stoppeUhren();
      // Neue Seite liegt darunter: Scroll an den Anfang (oder gemerkte Stelle bei Zurück), Fokus auf die H1.
      if (zurueckAusAufschub) window.scrollTo({ top: gemerkterScroll(), left: 0, behavior: 'instant' });
      else if (!location.hash && lage.richtung === 'vor') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      zurueckAusAufschub = false;
      // inert fällt hier, weil der Fokus sonst nicht auf die H1 der neuen Seite kann; Zeiger fängt die Schicht weiter ab,
      // bis sie in Ruhe ist (data-zustand ≠ ruhe, Antwort auf E2-PRUEF-04 Frage 1).
      sperre(false);
      fokussiereUeberschrift();
      const fertig = () => senden.current({ typ: 'gezogen' });
      if (ruhig || !belag) {
        const von = Number(getComputedStyle(blende).opacity) || 1;
        beende(laufend);
        laufend.push(blende.animate([{ opacity: von }, { opacity: 0 }], { duration: halbeBlende(), fill: 'forwards' }));
        void warte(laufend).then(fertig);
        return;
      }
      const strecke = ziehStrecke(belag.mass, belag.breite) * (lage.richtung === 'vor' ? -1 : 1);
      const kurve = lies('--ease-weg') || 'ease-in';
      const neu: Animation[] = [];
      belag.elemente.forEach((el, i) => {
        const t = takte[i];
        neu.push(
          el.animate([{ opacity: 1, transform: 'none' }, { opacity: 1, transform: `translateX(${strecke}px)` }], {
            delay: t.ziehenBeginn,
            duration: t.ziehenDauer,
            easing: kurve,
            fill: 'both',
          }),
        );
      });
      beende(laufend);
      laufend.push(...neu);
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
    const verbergeLaser = () => {
      laserLauf?.cancel();
      laserLauf = null;
      laser.style.opacity = '0';
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
          return verbergeLaser();
        case 'ziehe':
          return ziehe();
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
      });
      if (grund !== 'verlegen') return;
      e.preventDefault();
      if (lage.zustand !== 'ruhe' || angefordert) return; // Doppelklick: kein zweiter Wechsel
      angefordert = true;
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
        const state = e.state as { __NA?: boolean } | null;
        // Ohne Next-Zustand (z. B. Sprunglink #main-content) oder bei gleichem Pfad: nichts tun.
        if (!state?.__NA || location.pathname === pfadRef.current) return false;
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
    const leerlauf = window.requestIdleCallback ? window.requestIdleCallback(liesVorab) : window.setTimeout(liesVorab, 1);
    const speichernVorVerlassen = () => merkeScroll(adresse());
    document.addEventListener('click', klick, true);
    window.addEventListener('pagehide', speichernVorVerlassen);
    return () => {
      document.removeEventListener('click', klick, true);
      window.removeEventListener('pagehide', speichernVorVerlassen);
      if (window.cancelIdleCallback) window.cancelIdleCallback(leerlauf);
      else window.clearTimeout(leerlauf);
      steuerung = null;
      freigeben();
    };
  }, [router]);

  // Neue Seite ist da: nach zwei Bildern (Layout und Malen der neuen Seite) und sobald der Hauptfaden frei ist, zieht der
  // Belag ab. Ohne die Ruhe startete das Abziehen, während die neue Seite noch rechnete, und der Boden lag sichtbar still
  // (Sichtabnahme E2, Befund 1 und 2; E-036). Bis dahin zeigt die Laserlinie das Warten; spätestens nach 400 ms geht es los.
  useEffect(() => {
    if (pfad === pfadRef.current) return;
    pfadRef.current = pfad;
    angezeigt = adresse();
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
