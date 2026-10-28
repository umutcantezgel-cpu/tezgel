'use client';

// Sprungziel halten (R-01a): Ein Sprung zu einem Anker (#…) landet über scroll-padding-top bei 96 px unter dem
// Bildrand (globals.css). Danach kann Inhalt oberhalb des Ziels noch wachsen – Abschnitte mit content-visibility
// (`spaet-zeichnen`) zeichnen erst in Sichtnähe, Bausteine laden nach (Rechner, Kalender). Die Scroll-Verankerung des
// Browsers fängt das nicht, weil ihr Anker unter dem festen Kopf im vorigen Abschnitt liegt; das Ziel rutschte dann um
// bis zu 2 000 px weg. Dieser Baustein hält das Ziel nach einem Sprung (Laden mit Anker, Ankerwechsel, Klick auf einen
// Link mit Anker, auch über Seiten hinweg) bis zu 4 s an seinem Landeplatz – scroll-padding-top + scroll-margin-top wie
// beim Browser: Wächst die Seite, richtet er es wieder aus. Jede Eingabe (Rad, Berührung, Taste, Zeiger) beendet das
// sofort. Rendert nichts; ohne JavaScript bleibt es beim Sprung des Browsers.
import { useEffect } from 'react';
import { naechstesBild } from '@/lib/motion/takt';

const DAUER = 4000;
const SUCHE = 1500;
const EINGABEN = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;

function zielAus(hash: string): HTMLElement | null {
  if (hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

export default function SprungHalter() {
  useEffect(() => {
    let stopp: (() => void) | null = null;

    const halten = (ziel: HTMLElement, sofort: boolean) => {
      stopp?.();
      const html = document.documentElement;
      let ruhig = false;
      let hoehe = -1;
      let ruheUhr = 0;

      const richten = () => {
        if (!ruhig || !ziel.isConnected) return;
        const r = ziel.getBoundingClientRect();
        if (!r.width && !r.height) return;
        // Landeplatz wie beim Sprung des Browsers: scroll-padding-top der Seite + scroll-margin-top des Ziels
        const soll = (parseFloat(getComputedStyle(html).scrollPaddingTop) || 0) + (parseFloat(getComputedStyle(ziel).scrollMarginTop) || 0);
        const d = Math.round(r.top - soll);
        if (Math.abs(d) > 1) window.scrollBy({ top: d, behavior: 'instant' });
      };
      // Rollt der Browser noch (weicher Sprung), erst am Ende ausrichten
      const rollt = () => {
        ruhig = false;
        window.clearTimeout(ruheUhr);
        ruheUhr = window.setTimeout(beruhigt, 120);
      };
      const beruhigt = () => {
        window.clearTimeout(ruheUhr);
        ruhig = true;
        richten();
      };
      const groesse = new ResizeObserver(([eintrag]) => {
        const h = Math.round(eintrag.contentRect.height);
        if (h !== hoehe && hoehe >= 0) richten();
        hoehe = h;
      });
      const ende = () => {
        groesse.disconnect();
        window.clearTimeout(uhr);
        window.clearTimeout(ruheUhr);
        window.removeEventListener('scroll', rollt);
        window.removeEventListener('scrollend', beruhigt);
        for (const t of EINGABEN) window.removeEventListener(t, ende, true);
        if (stopp === ende) stopp = null;
      };
      const uhr = window.setTimeout(ende, DAUER);
      window.addEventListener('scroll', rollt, { passive: true });
      window.addEventListener('scrollend', beruhigt);
      for (const t of EINGABEN) window.addEventListener(t, ende, { capture: true, passive: true });
      groesse.observe(document.body);
      stopp = ende;
      // Gleich prüfen (Wachstum im ersten Bild nach dem Sprung bzw. vor der Hydrierung), sonst nur auf Wachstum achten
      if (sofort) rollt();
      else ruhig = true;
    };

    // 1. Laden mit Anker: Was vor der Hydrierung nachgewachsen ist, gleich ausrichten – nur bei einem frischen Aufruf
    //    (kein Neuladen, kein Zurück: dort stellt der Browser die alte Lage wieder her) und nur in den ersten Sekunden
    const erst = zielAus(window.location.hash);
    if (erst) {
      const art = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type;
      halten(erst, art === 'navigate' && performance.now() < DAUER);
    }

    // 2. Ankerwechsel über Adresse oder einfachen Link
    const beiHash = () => {
      const z = zielAus(window.location.hash);
      if (z) halten(z, true);
    };
    window.addEventListener('hashchange', beiHash);

    // 3. Klick auf einen Link mit Anker: Next.js wechselt per pushState (ohne hashchange), auch über Seiten hinweg –
    //    warten, bis Adresse und Ziel da sind
    const beiKlick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="#"]');
      if (!(a instanceof HTMLAnchorElement) || a.target === '_blank') return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash.length < 2) return;
      const t0 = performance.now();
      const warten = () => {
        if (window.location.pathname === url.pathname && window.location.hash === url.hash) {
          const z = zielAus(url.hash);
          if (z) return halten(z, true);
        }
        if (performance.now() - t0 < SUCHE) naechstesBild(warten);
      };
      naechstesBild(warten);
    };
    document.addEventListener('click', beiKlick);

    return () => {
      stopp?.();
      window.removeEventListener('hashchange', beiHash);
      document.removeEventListener('click', beiKlick);
    };
  }, []);

  return null;
}
