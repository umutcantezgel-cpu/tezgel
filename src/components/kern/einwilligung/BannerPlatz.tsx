'use client';

// Fokus nie unter dem Einwilligungsbanner (R-01a, KERN K-009, WCAG 2.4.11): Solange der Banner offen ist, rollt ein per
// Tastatur fokussiertes Element, das waagerecht unter dem Banner liegt (mobil jedes, am Desktop – Banner links unten,
// ≤ 28rem – nur die linke Spalte) und unten in ihn hineinragt oder darunter liegt, bis 16 px über seine Oberkante. Das
// geschieht beim Fokuswechsel (focusin), also vor dem Rollen des Browsers; der sieht das Element dann frei und rollt nicht
// mehr. Ausgenommen: Elemente in klebenden Spalten (Rollen bewegt sie nicht, die Seite liefe nur vergeblich weiter) und
// Fokus per Maus oder Berührung (das Element ist sichtbar angetippt, nichts soll springen).
// Damit auch die letzten Elemente der Seite (Rechtszeile im Fuß) über den Banner rollen können, bekommt der Fuß unten so
// viel Platz, wie der Banner belegt (--banner-platz am <footer>, globals.css `fuss-bannerplatz`).
// Der Banner selbst (CookieConsent, Logik in useEinwilligungsBanner) bleibt unberührt; gefunden wird er über seine Rolle
// und seinen getesteten Namen. Ohne JavaScript gibt es keinen Banner und nichts zu tun. Die Variable ist registriert und
// nicht vererbt (globals.css): Setzen und Entfernen rechnet nur den Fuß neu.
import { useEffect } from 'react';

const BANNER = '[role="dialog"][aria-label^="Cookie-Einwilligungsbanner"]';
const ABSTAND = 16;

function klebt(el: Element): boolean {
  for (let x: Element | null = el; x && x !== document.body; x = x.parentElement) {
    if (getComputedStyle(x).position === 'sticky') return true;
  }
  return false;
}

export default function BannerPlatz() {
  useEffect(() => {
    let banner: Element | null = null;
    let wert = '';

    // Platz am Seitenende: belegter Raum des Banners (Oberkante bis unterer Bildrand, mobil samt Leiste)
    const platz = () => {
      const fuss = document.querySelector('body > footer');
      const b = banner?.getBoundingClientRect();
      const neu = b && b.height > 0 ? `${Math.ceil(window.innerHeight - b.top)}px` : '';
      if (!fuss || neu === wert) return;
      wert = neu;
      if (neu) (fuss as HTMLElement).style.setProperty('--banner-platz', neu);
      else (fuss as HTMLElement).style.removeProperty('--banner-platz');
    };

    const groesse = new ResizeObserver(platz);
    const suchen = () => {
      const b = document.querySelector(BANNER);
      if (b !== banner) {
        if (banner) groesse.unobserve(banner);
        banner = b;
        if (banner) groesse.observe(banner);
      }
      platz();
    };
    // Der Banner hängt direkt an <body> (ClientWidgets) und erscheint bzw. verschwindet dort
    const kinder = new MutationObserver(suchen);
    kinder.observe(document.body, { childList: true });

    const beiFokus = (e: FocusEvent) => {
      const el = e.target;
      if (!banner || !(el instanceof Element) || banner.contains(el) || !el.matches(':focus-visible')) return;
      const b = banner.getBoundingClientRect();
      if (!b.height) return;
      const r = el.getBoundingClientRect();
      if (!r.height || r.right <= b.left || r.left >= b.right) return;
      const grenze = b.top - ABSTAND;
      if (r.bottom <= grenze || klebt(el)) return;
      // oben bleibt der Platz des Kopfs frei (scroll-padding-top); zu hohe Elemente stehen dort bündig
      const oben = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      window.scrollBy({ top: Math.min(r.bottom - grenze, r.top - oben), behavior: 'instant' });
    };
    document.addEventListener('focusin', beiFokus, true);
    window.addEventListener('resize', platz);
    suchen();

    return () => {
      kinder.disconnect();
      groesse.disconnect();
      document.removeEventListener('focusin', beiFokus, true);
      window.removeEventListener('resize', platz);
      (document.querySelector('body > footer') as HTMLElement | null)?.style.removeProperty('--banner-platz');
    };
  }, []);

  return null;
}
