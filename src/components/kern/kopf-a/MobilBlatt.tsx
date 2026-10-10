'use client';

// Mobilblatt unter lg (Variante A): Dialog „Hauptnavigation“ als `popover="auto"` über der ganzen Ansicht (Top-Layer).
// Ohne JavaScript bzw. vor der Hydrierung (V-06): Öffnen über den Schalter, Schließen über Escape, den Schließen-Knopf
// (`popovertargetaction="hide"`) oder einen Link (neue Seite); der Fokus springt beim Öffnen auf den Schließen-Knopf
// (`autofocus`) und kehrt beim Schließen zum Schalter zurück; die Hintergrund-Sperre steht in CSS (`:root:has(…)`).
// Mit JavaScript kommen hinzu: Link-Klick schließt (Client-Navigation), Seitenwechsel schließt, Tab bleibt im Blatt,
// der aktive Bereich ist beim Öffnen aufgeklappt, und ab lg schließt das Blatt (die Desktop-Navigation übernimmt).
import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { istOffen, verberge } from '@/components/kern/kopf-a/popover';
import { BLATT_ID, TEXTE } from '@/components/kern/kopf-a/texte';

const FOKUSSIERBAR = 'a[href], button:not([disabled]), summary, input, select, textarea, [tabindex]:not([tabindex="-1"])';

// checkVisibility fehlt in Safari < 17.4: dann zählt, ob das Element Boxen hat.
const sichtbar = (el: HTMLElement) =>
  typeof (el as Partial<Pick<HTMLElement, 'checkVisibility'>>).checkVisibility === 'function' ? el.checkVisibility() : el.getClientRects().length > 0;

export default function MobilBlatt({ children }: { children: ReactNode }) {
  const blatt = useRef<HTMLDivElement>(null);
  const pfad = usePathname();
  const letzterPfad = useRef(pfad);

  useEffect(() => {
    if (letzterPfad.current === pfad) return;
    letzterPfad.current = pfad;
    verberge(blatt.current);
  }, [pfad]);

  useEffect(() => {
    const el = blatt.current;
    if (!el) return;
    // Beim Öffnen: den Bereich der aktuellen Seite aufklappen, wenn noch keiner offen ist.
    const vorher = (e: Event) => {
      if ((e as ToggleEvent).newState !== 'open') return;
      if (el.querySelector('details[open]')) return;
      const aktiv = el.querySelector('[aria-current="page"]')?.closest('details');
      if (aktiv) aktiv.open = true;
    };
    // Ab lg gibt es kein Mobilblatt: offen gebliebenes Blatt schließen (Drehen, Fenster vergrößern).
    const breit = window.matchMedia('(min-width: 64rem)');
    const wechsel = () => {
      if (breit.matches) verberge(el);
    };
    el.addEventListener('beforetoggle', vorher);
    breit.addEventListener('change', wechsel);
    return () => {
      el.removeEventListener('beforetoggle', vorher);
      breit.removeEventListener('change', wechsel);
    };
  }, []);

  const klick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.closest('a[href]')) verberge(blatt.current);
  };

  // Tab bleibt im Blatt (der Browser macht Popovers nicht modal); erstes ↔ letztes sichtbares Ziel.
  const taste = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = blatt.current;
    if (e.key !== 'Tab' || !el || !istOffen(el)) return;
    const ziele = [...el.querySelectorAll<HTMLElement>(FOKUSSIERBAR)].filter(sichtbar);
    if (ziele.length === 0) return;
    const erstes = ziele[0];
    const letztes = ziele[ziele.length - 1];
    if (e.shiftKey && document.activeElement === erstes) {
      e.preventDefault();
      letztes.focus();
    } else if (!e.shiftKey && document.activeElement === letztes) {
      e.preventDefault();
      erstes.focus();
    }
  };

  return (
    <div
      ref={blatt}
      id={BLATT_ID}
      popover="auto"
      role="dialog"
      aria-modal="true"
      aria-label={TEXTE.dialog}
      onClick={klick}
      onKeyDown={taste}
      className="fixed inset-0 z-50 m-0 size-auto overflow-y-auto overscroll-contain border-0 bg-k-kalk p-0 text-k-tinte not-open:hidden lg:hidden max-lg:[:root:has(&:popover-open)]:overflow-hidden"
    >
      {children}
    </div>
  );
}
