// Bewegungsmodul (KERN K-007, E-005): löst Registereinträge per IntersectionObserver aus.
// Zustand je Element in data-motion-stand="an" (wird von React nicht verwaltet). Ohne html.k-bewegung
// (reduzierte Bewegung, Bewegungsschalter „ruhig“, kein JS, Druck) tut das Modul nichts – Startzustände gelten dann ohnehin
// nicht. Zeigerart und Schalter liest es über schalter.ts, Arbeit im nächsten Bild läuft über den gemeinsamen Takt.
import { beobachteteKennungen, ladeKennungen, schwelleFuer } from './register';
import { BEWEGUNG_ATTRIBUT, meldeWechsel, speichereWahl, systemRuhig, zeigerGrob, type Bewegungswahl } from './schalter';
import { naechstesBild } from './takt';

const beobachtet = new WeakSet<Element>();
const beobachter = new Map<number, IntersectionObserver>();

function aktiv(): boolean {
  const html = document.documentElement;
  return html.classList.contains('k-bewegung') && !html.classList.contains('k-notaus');
}

function setzeAn(el: Element) {
  el.setAttribute('data-motion-stand', 'an');
}

// Endzustand nur für Kennungen mit Startzustand (laden, sicht) – reine CSS-Kennungen (druck, zustand, aufklappen …)
// bleiben unberührt: ihre Elemente liegen oft in nachgeladenen Inseln, die noch hydrieren (Hydrierungswarnung
// „data-motion-stand“ am Knopf im Formular, Prüfstufe A E4-N2-01)
function alleAn(wurzel: ParentNode) {
  for (const kennung of [...ladeKennungen(), ...beobachteteKennungen(false), ...beobachteteKennungen(true)]) {
    wurzel.querySelectorAll(`[data-motion="${kennung}"]`).forEach(setzeAn);
  }
}

function beobachterFuer(schwelle: number): IntersectionObserver {
  const schluessel = Math.round(schwelle * 100);
  let io = beobachter.get(schluessel);
  if (!io) {
    io = new IntersectionObserver(
      (eintraege, selbst) => {
        for (const e of eintraege) {
          if (e.isIntersecting) {
            setzeAn(e.target);
            selbst.unobserve(e.target);
          }
        }
      },
      { threshold: schwelle },
    );
    beobachter.set(schluessel, io);
  }
  return io;
}

/** Sucht neue animierte Elemente und beobachtet sie. Mehrfach aufrufbar (nach jedem Seitenwechsel). */
export function beobachte(wurzel: ParentNode = document): void {
  if (typeof window === 'undefined') return;
  const html = document.documentElement;
  if (!html.classList.contains('k-bewegung')) return;
  html.classList.add('k-modul');
  if (!aktiv() || typeof IntersectionObserver === 'undefined') {
    alleAn(wurzel);
    return;
  }
  const grob = zeigerGrob();
  for (const kennung of ladeKennungen()) {
    wurzel.querySelectorAll(`[data-motion="${kennung}"]:not([data-motion-stand="an"])`).forEach((el) => {
      naechstesBild(() => setzeAn(el));
    });
  }
  for (const kennung of beobachteteKennungen(grob)) {
    const io = beobachterFuer(schwelleFuer(kennung));
    wurzel.querySelectorAll(`[data-motion="${kennung}"]`).forEach((el) => {
      if (beobachtet.has(el) || el.getAttribute('data-motion-stand') === 'an') return;
      beobachtet.add(el);
      io.observe(el);
    });
  }
}

/**
 * Bewegungsschalter (UM-E3-MOD, E-080): wendet die Wahl sofort an und merkt sie sich je Gerät. „ruhig“ nimmt die
 * Startklassen weg, alles steht im Endzustand, wie bei reduzierter Bewegung. „an“ setzt die Startklasse nur ohne Wunsch
 * nach reduzierter Bewegung. Was schon zu sehen war, bleibt im Endzustand; bewegt wird erst, was danach kommt.
 */
export function waehleBewegung(wahl: Bewegungswahl): void {
  const html = document.documentElement;
  speichereWahl(wahl);
  if (wahl === 'ruhig') {
    html.setAttribute(BEWEGUNG_ATTRIBUT, 'ruhig');
    html.classList.remove('k-bewegung', 'k-startbild', 'k-intro', 'k-intro-sig', 'k-intro-start');
  } else {
    html.removeAttribute(BEWEGUNG_ATTRIBUT);
    if (!systemRuhig()) {
      alleAn(document);
      html.classList.remove('k-notaus');
      html.classList.add('k-bewegung');
      beobachte();
    }
  }
  meldeWechsel();
}
