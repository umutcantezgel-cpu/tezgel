'use client';

// Bewertungs-Karussell (F-19, P3-12): reine Darstellung, neu gebaut (keine Logik aus ReviewCarousel.tsx übernommen).
// - Ohne JavaScript: alle Stimmen als Liste in einer Scroll-Snap-Reihe; die Spur ist fokussierbar und scrollt mit den
//   Pfeiltasten (role="region", benannt über das Etikett).
// - Mit JavaScript kommen „Vorherige Rezensionen“/„Nächste Rezensionen“ (zugängliche Namen wie im Bestand) und die
//   Position „n von m“ in Mono hinzu. Die Position ist erst nach einer Bedienung eine Live-Region (aria-live="polite").
// - Pfeil links/rechts, Pos1 und Ende auf der Spur blättern karteweise. Kein Autoplay.
// - Gesperrt am Anfang bzw. Ende über `Knopf deaktiviert` (aria-disabled, bleibt fokussierbar: Der Fokus geht am Ende
//   nicht verloren). Bei reduzierter Bewegung springt die Spur ohne Gleiten.
// Aufbau für funktion-navigation.spec.mjs (F-19): Knopf → Knopfgruppe → Steuerzeile; die Spur ist das nächste <div>
// neben der Steuerzeile und trägt scrollLeft.
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react';
import { Knopf, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

type Stand = { zurueck: boolean; vor: boolean; erste: number };
type Richtung = 1 | -1 | 'anfang' | 'ende';

const STAND_ANFANG: Stand = { zurueck: false, vor: true, erste: 1 };
// Toleranz wie im Bestand (Snap kann wenige Pixel neben 0 bzw. dem Ende einrasten).
const TOLERANZ = 10;

const nichtsAbonnieren = () => () => {};
/** false beim Server-Rendern und bei der Hydrierung, danach true – die Knöpfe gibt es nur mit JavaScript. */
function useMitSkript(): boolean {
  return useSyncExternalStore(nichtsAbonnieren, () => true, () => false);
}

function kartenVon(spur: HTMLElement): HTMLElement[] {
  return Array.from(spur.querySelectorAll<HTMLElement>('[data-karte]'));
}

/** Index der Karte, deren linke Kante der Scrollposition am nächsten liegt. */
function naechsteKarte(spur: HTMLElement, karten: HTMLElement[]): number {
  const start = karten[0]?.offsetLeft ?? 0;
  let beste = 0;
  let abstand = Number.POSITIVE_INFINITY;
  karten.forEach((karte, i) => {
    const d = Math.abs(karte.offsetLeft - start - spur.scrollLeft);
    if (d < abstand) {
      abstand = d;
      beste = i;
    }
  });
  return beste;
}

function lesen(spur: HTMLElement): Stand {
  const ende = spur.scrollWidth - spur.clientWidth;
  return {
    zurueck: spur.scrollLeft > TOLERANZ,
    vor: spur.scrollLeft < ende - TOLERANZ,
    erste: naechsteKarte(spur, kartenVon(spur)) + 1,
  };
}

export type KarussellProps = {
  /** sichtbares Etikett der Reihe, zugleich Name der Spur */
  titel: string;
  anzahl: number;
  className?: string;
  /** die Liste der Karten; jede Karte trägt `data-karte` */
  children: ReactNode;
};

export default function Karussell({ titel, anzahl, className, children }: KarussellProps) {
  const titelId = `k-karussell${useId()}`;
  const spurRef = useRef<HTMLDivElement>(null);
  const mitSkript = useMitSkript();
  const [stand, setStand] = useState<Stand>(STAND_ANFANG);
  const [bedient, setBedient] = useState(false);

  useEffect(() => {
    const spur = spurRef.current;
    if (!spur) return;
    let rahmen = 0;
    const messen = () => {
      cancelAnimationFrame(rahmen);
      rahmen = requestAnimationFrame(() => setStand(lesen(spur)));
    };
    spur.addEventListener('scroll', messen, { passive: true });
    // Meldet sich beim Beobachten einmal sofort: misst den Anfangsstand, danach jede Größenänderung.
    const groesse = new ResizeObserver(messen);
    groesse.observe(spur);
    return () => {
      cancelAnimationFrame(rahmen);
      spur.removeEventListener('scroll', messen);
      groesse.disconnect();
    };
  }, []);

  const blaettern = useCallback((richtung: Richtung) => {
    const spur = spurRef.current;
    if (!spur) return;
    const karten = kartenVon(spur);
    if (karten.length === 0) return;
    setBedient(true);
    const jetzt = naechsteKarte(spur, karten);
    const ziel =
      richtung === 'anfang' ? 0 : richtung === 'ende' ? karten.length - 1 : Math.min(karten.length - 1, Math.max(0, jetzt + richtung));
    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    spur.scrollTo({ left: karten[ziel].offsetLeft - karten[0].offsetLeft, behavior: ruhig ? 'auto' : 'smooth' });
  }, []);

  const taste = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const richtung: Richtung | null =
      e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? 'anfang' : e.key === 'End' ? 'ende' : null;
    if (richtung === null) return;
    e.preventDefault();
    blaettern(richtung);
  };

  return (
    <div className={className}>
      <div className="flex min-h-k-7 flex-wrap items-center justify-between gap-k-3 pb-k-3">
        <p id={titelId} className="k-mono text-k-1 text-k-tinte-2">
          {titel}
        </p>
        <div className="flex items-center gap-k-2">
          {mitSkript ? (
            <>
              <Knopf art="neben" deaktiviert={!stand.zurueck} aria-label="Vorherige Rezensionen" onClick={() => blaettern(-1)}>
                <Icon name="winkel" richtung="links" groesse={20} />
              </Knopf>
              <p aria-live={bedient ? 'polite' : 'off'} aria-atomic="true" className="min-w-k-9 text-center k-mono text-k-1 text-k-tinte tabular-nums">
                {stand.erste} von {anzahl}
              </p>
              <Knopf art="neben" deaktiviert={!stand.vor} aria-label="Nächste Rezensionen" onClick={() => blaettern(1)}>
                <Icon name="winkel" richtung="rechts" groesse={20} />
              </Knopf>
            </>
          ) : null}
        </div>
      </div>
      <div
        ref={spurRef}
        role="region"
        aria-labelledby={titelId}
        tabIndex={0}
        onKeyDown={taste}
        className={verbinde('relative snap-x snap-mandatory overflow-x-auto overscroll-x-contain', fokus())}
      >
        {children}
      </div>
    </div>
  );
}
