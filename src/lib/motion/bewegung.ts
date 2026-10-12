// Bewegungsmodul (KERN K-007, E-005): löst Registereinträge per IntersectionObserver aus.
// Zustand je Element in data-motion-stand="an" (wird von React nicht verwaltet). Ohne html.k-bewegung
// (reduzierte Bewegung, kein JS, Druck) tut das Modul nichts – Startzustände gelten dann ohnehin nicht.
import { beobachteteKennungen, ladeKennungen, schwelleFuer } from './register';

const beobachtet = new WeakSet<Element>();
const beobachter = new Map<number, IntersectionObserver>();

function aktiv(): boolean {
  const html = document.documentElement;
  return html.classList.contains('k-bewegung') && !html.classList.contains('k-notaus');
}

function setzeAn(el: Element) {
  el.setAttribute('data-motion-stand', 'an');
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
    // Endzustand nur für Kennungen mit Startzustand (laden, sicht) – reine CSS-Kennungen (druck, zustand, aufklappen …)
    // bleiben unberührt: ihre Elemente liegen oft in nachgeladenen Inseln, die noch hydrieren (Hydrierungswarnung
    // „data-motion-stand“ am Knopf im Formular, Prüfstufe A E4-N2-01)
    for (const kennung of [...ladeKennungen(), ...beobachteteKennungen(false), ...beobachteteKennungen(true)]) {
      wurzel.querySelectorAll(`[data-motion="${kennung}"]`).forEach(setzeAn);
    }
    return;
  }
  const grob = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  for (const kennung of ladeKennungen()) {
    wurzel.querySelectorAll(`[data-motion="${kennung}"]:not([data-motion-stand="an"])`).forEach((el) => {
      requestAnimationFrame(() => setzeAn(el));
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
