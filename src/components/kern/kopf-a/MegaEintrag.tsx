'use client';

// Ein Feld der Hauptnavigation (ab lg) mit Planblatt (Mega-Menü) als Popover – Variante A „Schriftfeld“.
// Ohne JavaScript bzw. vor der Hydrierung: der Hauptpunkt ist ein echter Link; der Schalter daneben öffnet das Planblatt
// über `popovertarget` (Enter/Leertaste/Klick), Escape und Klick daneben schließen, der Fokus kehrt zum Schalter zurück,
// und weil alle Planblätter `popover="auto"` sind, ist immer nur eines offen – alles vom Browser.
// Mit JavaScript kommen hinzu: Hover-Absicht (Maus: sofort öffnen, verzögert schließen), Klick auf einen Link schließt,
// Seitenwechsel schließt, `aria-expanded`/Name des Schalters folgen dem Zustand, `aufklappen` beim ersten Öffnen.
import { useEffect, useRef, type MouseEvent, type PointerEvent, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@/components/kern/icons/Icon';
import { fokus } from '@/components/kern/basis/klassen';
import NavLink from '@/components/kern/kopf-a/NavLink';
import { ersatzUmschalten, istOffen, usePopoverOffen, verberge, zeige } from '@/components/kern/kopf-a/popover';
import { SCHLIESS_VERZUG_MS, TEXTE } from '@/components/kern/kopf-a/texte';

export type MegaEintragProps = {
  id: string;
  name: string;
  href: string;
  pfade: readonly string[];
  /** Planblatt (Server-Komponente) */
  children: ReactNode;
};

export default function MegaEintrag({ id, name, href, pfade, children }: MegaEintragProps) {
  const blatt = useRef<HTMLDivElement>(null);
  const inhalt = useRef<HTMLDivElement>(null);
  const zeitgeber = useRef<number | undefined>(undefined);
  const offen = usePopoverOffen(id);
  const pfad = usePathname();
  const letzterPfad = useRef(pfad);

  // Seitenwechsel schließt (nicht beim Hydrieren: ein vorher geöffnetes Blatt bleibt offen).
  useEffect(() => {
    if (letzterPfad.current === pfad) return;
    letzterPfad.current = pfad;
    verberge(blatt.current);
  }, [pfad]);

  // Register `aufklappen`: beim Öffnen von 0fr auf 1fr (reduziert sofort). Wechsel zwischen zwei Blättern ohne Aufklappen.
  useEffect(() => {
    const el = blatt.current;
    const w = inhalt.current;
    if (!el || !w) return;
    const vorher = (e: Event) => {
      if ((e as ToggleEvent).newState !== 'open') return;
      const anderes = document.querySelector('[data-k-planblatt]:popover-open');
      if (anderes && anderes !== el) return;
      w.removeAttribute('data-offen');
      requestAnimationFrame(() => {
        void getComputedStyle(w).gridTemplateRows;
        w.setAttribute('data-offen', '');
      });
    };
    el.addEventListener('beforetoggle', vorher);
    return () => el.removeEventListener('beforetoggle', vorher);
  }, []);

  useEffect(() => () => window.clearTimeout(zeitgeber.current), []);

  // Hover-Absicht nur für die Maus; Touch und Stift tippen den Link bzw. den Schalter.
  const betreten = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(zeitgeber.current);
    zeige(blatt.current);
  };
  const verlassen = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(zeitgeber.current);
    zeitgeber.current = window.setTimeout(() => verberge(blatt.current), SCHLIESS_VERZUG_MS);
  };
  // Klick auf einen Link (Hauptpunkt oder Planblatt) führt zum Ziel und schließt das Blatt.
  const klick = (e: MouseEvent<HTMLLIElement>) => {
    if (!(e.target instanceof Element) || !e.target.closest('a[href]')) return;
    window.clearTimeout(zeitgeber.current);
    if (blatt.current && istOffen(blatt.current)) verberge(blatt.current);
  };

  return (
    <li
      onPointerEnter={betreten}
      onPointerLeave={verlassen}
      onClick={klick}
      className="group/feld relative flex h-full border-r border-k-fuge has-open:bg-k-kalk"
    >
      <NavLink
        href={href}
        pfade={pfade}
        marke="balken"
        className={`flex h-full items-center pl-k-3 k-text text-k-1 font-semibold xl:pl-k-4 xl:text-k-2 whitespace-nowrap text-k-tinte decoration-k-strich decoration-1 underline-offset-4 pointer-fine:hover:underline data-aktiv:decoration-k-tinte ${fokus('hell')}`}
      >
        {name}
      </NavLink>
      {/* Schalter: 32 px breit bis xl (Platz), Trefferfläche über ::before bis in den Innenabstand des Nachbarfelds = 44 px */}
      <button
        type="button"
        popoverTarget={id}
        aria-controls={id}
        aria-expanded={offen ?? undefined}
        aria-label={TEXTE.untermenue(name, offen === true)}
        onClick={() => ersatzUmschalten(id)}
        data-motion="zustand"
        className={`relative z-10 flex h-full w-k-6 cursor-pointer before:absolute before:inset-y-0 before:left-0 before:-right-k-3 xl:w-k-7 xl:before:right-0 items-center justify-center text-k-tinte-2 pointer-fine:hover:text-k-tinte active:text-k-tinte group-has-open/feld:text-k-tinte ${fokus('hell')}`}
      >
        <span className="flex group-has-open/feld:rotate-180">
          <Icon name="winkel" richtung="unten" groesse={16} />
        </span>
      </button>
      <div
        ref={blatt}
        id={id}
        popover="auto"
        data-k-planblatt=""
        className="fixed inset-x-0 top-(--k-kopf-hoehe) bottom-auto z-50 m-0 h-auto max-h-(--k-kopf-rest) w-full overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-k-tinte not-open:hidden"
      >
        <div ref={inhalt} data-motion="aufklappen" data-offen="">
          <div>{children}</div>
        </div>
      </div>
    </li>
  );
}
