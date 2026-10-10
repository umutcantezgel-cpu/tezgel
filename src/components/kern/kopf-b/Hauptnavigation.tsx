'use client';

// Hauptnavigation ab lg (Variante B „Achse“, F-13). Hauptpunkte sind echte Links; daneben je ein Schalter mit
// aria-expanded/aria-controls, der sein Blatt als natives Popover (`popover="auto"` + `popovertarget`) öffnet:
// Öffnen, Escape und Light-Dismiss gehören dem Browser und wirken schon vor der Hydrierung; „nur ein Panel offen“
// leistet die auto-Gruppe selbst. Dieses Skript ergänzt nur: Hover-Absicht (sofort auf, verzögert zu), Fokus zurück
// zum Schalter bei Escape, Schließen beim Folgen eines Links und beim Pfadwechsel, aria-expanded aus dem toggle-Ereignis,
// Aufklappen über das Register (`aufklappen`, dauer-2 · setzen; reduziert sofort).
// Markierung: 2-px-Laserlinie an der Unterkante des Punkts für aktiven Bereich, Hover-Ziel und offenes Blatt – je Punkt
// eine eigene Linie, die schaltet (kein Gleiten, kein Nachlauf). Aktiv zusätzlich Text in Laser tief + aria-current.
// Schalterbreite: ab xl 48 px (Touch-Ziel ≥ 44 px); zwischen lg und xl 32 × 64 px, weil fünf Einträge, Telefon und
// Hauptknopf sonst nicht in eine Zeile passen (Abweichung, Rückgabe P3-06b).
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import { fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import MegaBlatt from '@/components/kern/kopf-b/MegaBlatt';
import {
  AB_LG,
  TEXT,
  aktiverBereich,
  aufklappenAb,
  aufklappenAuf,
  istOffen,
  untermenueName,
  type Eintrag,
} from '@/components/kern/kopf-b/modell';

/** Zeit, die der Zeiger hat, um vom Punkt ins Blatt zu wandern (Hover-Absicht). Verhalten, keine Bewegungsdauer. */
const SCHLIESS_VERZUG_MS = 200;

type Quelle = 'zeiger' | 'tastatur';

function schliesseAlle(blaetter: Array<HTMLElement | null>) {
  blaetter.forEach((b) => {
    if (istOffen(b)) b?.hidePopover();
  });
}

export type HauptnavigationProps = {
  eintraege: Eintrag[];
  /** Nur für die Vorschau-Tafel: Pfad vorgeben statt `usePathname`. */
  pfad?: string;
  /** Nur für die Vorschau-Tafel: ohne Blätter und ohne Verhalten (Ruhe- und Aktivzustand als Bild). */
  statisch?: boolean;
};

export default function Hauptnavigation({ eintraege, pfad: pfadVorgabe, statisch = false }: HauptnavigationProps) {
  const aktuell = usePathname() || '/';
  const pfad = pfadVorgabe ?? aktuell;
  const basisId = useId();
  const [offen, setOffen] = useState<number | null>(null);
  const blaetter = useRef<Array<HTMLDivElement | null>>([]);
  const schalter = useRef<Array<HTMLButtonElement | null>>([]);
  const quelle = useRef<Quelle | null>(null);
  const perHover = useRef<number | null>(null);
  const zeitgeber = useRef<number | undefined>(undefined);
  const letzterPfad = useRef(aktuell);
  const aktiv = aktiverBereich(pfad, eintraege);

  const zeigen = (i: number, q: Quelle) => {
    const blatt = blaetter.current[i];
    window.clearTimeout(zeitgeber.current);
    if (!blatt || typeof blatt.showPopover !== 'function') return;
    quelle.current = q;
    if (!istOffen(blatt)) {
      blatt.showPopover();
      if (q === 'zeiger') perHover.current = i;
    }
  };

  const schliessen = (i: number) => {
    const blatt = blaetter.current[i];
    if (istOffen(blatt)) blatt?.hidePopover();
  };

  const alleSchliessen = () => {
    window.clearTimeout(zeitgeber.current);
    schliesseAlle(blaetter.current);
  };

  const spaeterSchliessen = (i: number) => {
    window.clearTimeout(zeitgeber.current);
    zeitgeber.current = window.setTimeout(() => schliessen(i), SCHLIESS_VERZUG_MS);
  };

  // toggle-Ereignisse der Blätter → Zustand (aria-expanded, Linie, Winkel) und Aufklappen über das Register.
  useEffect(() => {
    if (statisch) return undefined;
    const abmelden: Array<() => void> = [];
    blaetter.current.forEach((blatt, i) => {
      if (!blatt) return;
      const innen = () => blatt.querySelector('[data-motion="aufklappen"]');
      const vorher = (e: Event) => {
        if ((e as ToggleEvent).newState === 'open') aufklappenAb(innen());
      };
      const nachher = (e: Event) => {
        if ((e as ToggleEvent).newState === 'open') {
          aufklappenAuf(innen());
          setOffen(i);
        } else {
          aufklappenAuf(innen());
          if (perHover.current === i) perHover.current = null;
          setOffen((o) => (o === i ? null : o));
        }
      };
      blatt.addEventListener('beforetoggle', vorher);
      blatt.addEventListener('toggle', nachher);
      abmelden.push(() => {
        blatt.removeEventListener('beforetoggle', vorher);
        blatt.removeEventListener('toggle', nachher);
      });
    });
    // Vor der Hydrierung geöffnet? Zustand nachziehen (asynchron, das Blatt bleibt offen).
    const sync = window.requestAnimationFrame(() => {
      const i = blaetter.current.findIndex((b) => istOffen(b));
      if (i >= 0) setOffen(i);
    });
    // Unter lg ist die Navigation ausgeblendet: offene Blätter schließen.
    const mq = window.matchMedia(AB_LG);
    const breite = () => {
      if (!mq.matches) schliesseAlle(blaetter.current);
    };
    mq.addEventListener('change', breite);
    const uhr = zeitgeber;
    return () => {
      window.cancelAnimationFrame(sync);
      mq.removeEventListener('change', breite);
      abmelden.forEach((f) => f());
      window.clearTimeout(uhr.current);
    };
  }, [statisch, eintraege]);

  // Pfadwechsel (clientseitige Navigation) schließt das Blatt – nicht beim ersten Lauf, sonst ginge ein vor der
  // Hydrierung geöffnetes Blatt verloren.
  useEffect(() => {
    if (letzterPfad.current === aktuell) return;
    letzterPfad.current = aktuell;
    window.clearTimeout(zeitgeber.current);
    schliesseAlle(blaetter.current);
  }, [aktuell]);

  return (
    <nav aria-label={TEXT.nav} className="hidden h-full lg:flex">
      <ul className="flex h-full">
        {eintraege.map((eintrag, i) => {
          const hatBlatt = !statisch && eintrag.kategorien.length > 0;
          const hatSchalter = eintrag.kategorien.length > 0;
          const blattId = `k-kopf-b-blatt-${i}${basisId}`;
          const istAuf = offen === i;
          const istAktiv = aktiv === i;

          const punktHandler = hatBlatt
            ? {
                onPointerEnter: (e: PointerEvent<HTMLLIElement>) => {
                  if (e.pointerType === 'mouse') zeigen(i, 'zeiger');
                },
                onPointerLeave: (e: PointerEvent<HTMLLIElement>) => {
                  if (e.pointerType === 'mouse' && quelle.current === 'zeiger') spaeterSchliessen(i);
                },
                onKeyDown: (e: KeyboardEvent<HTMLLIElement>) => {
                  if (e.key !== 'Escape' || !istOffen(blaetter.current[i])) return;
                  e.preventDefault();
                  schliessen(i);
                  schalter.current[i]?.focus();
                },
                onBlur: (e: FocusEvent<HTMLLIElement>) => {
                  // Fokus verlässt Punkt und Blatt per Tastatur → zu. (Zeiger-Klicks außerhalb erledigt der Light-Dismiss.)
                  const naechstes = e.relatedTarget as Node | null;
                  if (naechstes && !e.currentTarget.contains(naechstes) && quelle.current === 'tastatur') schliessen(i);
                },
              }
            : {};

          const schalterKlick = (e: MouseEvent<HTMLButtonElement>) => {
            const blatt = blaetter.current[i];
            // Der Zeiger hat das Blatt beim Überfahren schon geöffnet: Der Klick hält es offen, statt es wieder zu schließen.
            if (e.detail > 0 && perHover.current === i && istOffen(blatt)) {
              e.preventDefault();
              perHover.current = null;
              return;
            }
            // Sonst schaltet das native popovertarget; hier nur die Quelle merken (Tastatur: detail 0).
            quelle.current = e.detail === 0 ? 'tastatur' : 'zeiger';
          };

          return (
            <li
              key={eintrag.pfad}
              data-aktiv={istAktiv ? '' : undefined}
              data-offen={istAuf ? '' : undefined}
              className="group relative flex h-full"
              {...punktHandler}
            >
              <Link
                href={eintrag.pfad}
                onClick={hatBlatt ? alleSchliessen : undefined}
                aria-current={pfad === eintrag.pfad ? 'page' : undefined}
                data-motion="zustand"
                className={verbinde(
                  'flex h-full items-center whitespace-nowrap pl-k-1 k-text text-k-1 font-semibold xl:pl-k-2',
                  hatSchalter ? 'pr-0' : 'pr-k-3',
                  istAktiv ? 'text-k-laser-tief' : 'text-k-tinte',
                  fokus('hell'),
                )}
              >
                {eintrag.name}
              </Link>
              {hatSchalter ? (
                <button
                  ref={(el) => {
                    schalter.current[i] = el;
                  }}
                  type="button"
                  popoverTarget={hatBlatt ? blattId : undefined}
                  aria-expanded={istAuf}
                  aria-controls={hatBlatt ? blattId : undefined}
                  aria-label={untermenueName(eintrag.name, istAuf)}
                  onClick={hatBlatt ? schalterKlick : undefined}
                  data-motion="zustand"
                  className={verbinde(
                    'flex h-full w-k-6 cursor-pointer xl:w-k-7 items-center justify-center text-k-tinte-2 pointer-fine:hover:text-k-tinte',
                    fokus('hell'),
                  )}
                >
                  <Icon name="winkel" richtung={istAuf ? 'oben' : 'unten'} groesse={16} />
                </button>
              ) : null}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-k-1 right-k-1 border-t-2 border-k-laser opacity-0 group-data-aktiv:opacity-100 group-data-offen:opacity-100 pointer-fine:group-hover:opacity-100 xl:left-k-2"
              />
              {hatBlatt ? (
                <div
                  ref={(el) => {
                    blaetter.current[i] = el;
                  }}
                  id={blattId}
                  popover="auto"
                  className="inset-x-0 top-(--k-kopf-hoehe) bottom-auto h-auto max-h-[calc(100dvh-var(--k-kopf-hoehe))] w-full overflow-y-auto overscroll-contain border-t-2 border-b border-t-k-laser border-b-k-strich bg-k-fliese text-k-tinte"
                >
                  <div data-motion="aufklappen" data-offen="">
                    <div>
                      <MegaBlatt eintrag={eintrag} pfad={pfad} beimFolgen={alleSchliessen} />
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
