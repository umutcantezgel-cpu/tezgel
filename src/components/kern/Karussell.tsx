'use client';
// Karussell (KERN v3.6 K-016 „Ruhe“, E-047): langsam, gut strukturiert, läuft von rechts nach links. Zwei Arten:
// - band: ein endloses Laufband (Qualifikationen im Fuß). Der Inhalt steht zweimal hintereinander, die zweite Fassung ist
//   für Screenreader und Tastatur verborgen; das Band rückt per CSS um die halbe Länge (bewegung.css, Block karussell).
// - reihe: Karten nebeneinander mit Einrasten beim Wischen (Kundenstimmen, Fotos). Mit Selbstlauf rückt die Reihe alle
//   `takt` ms um eine Karte weiter und springt am Ende an den Anfang.
// Beide halten an, solange die Maus darüber steht oder der Fokus darin liegt, und haben einen Knopf zum Anhalten (WCAG 2.2.2:
// Bewegung über 5 s). Ohne JavaScript, bei reduzierter Bewegung und im Notaus läuft nichts von selbst: das Band steht als
// wischbare Reihe, die Reihe wird nur von Hand gewischt. Bewegt wird nur translate (Band) bzw. die Scrollposition (Reihe).
import { Children, useEffect, useRef, useState, useSyncExternalStore, type FocusEvent, type ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';

const ohneAbo = () => () => {};
function useImBrowser() {
  return useSyncExternalStore(ohneAbo, () => true, () => false);
}

function useRuhigGewuenscht() {
  return useSyncExternalStore(
    (melden) => {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      m.addEventListener('change', melden);
      return () => m.removeEventListener('change', melden);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || !document.documentElement.classList.contains('k-bewegung') || document.documentElement.classList.contains('k-notaus'),
    () => true,
  );
}

const knopf =
  'inline-flex size-11 items-center justify-center border border-fuge bg-fliese text-tinte transition-colors dauer-1 ease-setzen hover:border-tinte focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinte';

function PauseKnopf({ angehalten, umschalten, dunkel = false }: { angehalten: boolean; umschalten: () => void; dunkel?: boolean }) {
  return (
    <button
      type="button"
      onClick={umschalten}
      aria-pressed={angehalten}
      className={clsx(knopf, dunkel && 'border-nacht-fuge bg-tinte text-kalk hover:border-kalk focus-visible:outline-kalk')}
    >
      <Icon name={angehalten ? 'abspielen' : 'pause'} groesse={4} />
      <span className="sr-only">{angehalten ? 'Weiterlaufen lassen' : 'Anhalten'}</span>
    </button>
  );
}

export interface KarussellProps {
  art: 'band' | 'reihe';
  /** Name der Region für Screenreader */
  name: string;
  children: ReactNode;
  /** reihe: Breite je Karte (Klassen), z. B. „w-full md:w-1/2 lg:w-1/3“; Teiler der Breite, damit keine Karte angeschnitten ist */
  karte?: string;
  /** reihe: von selbst weiterrücken (nur mit erlaubter Bewegung) */
  selbstlauf?: boolean;
  /** reihe: Abstand zwischen zwei Schritten in ms (langsam, Standard 8 s) */
  takt?: number;
  /** band: auf dunkler Fläche (Fuß) */
  dunkel?: boolean;
  className?: string;
}

export default function Karussell({ art, name, children, karte = 'w-full md:w-1/2 lg:w-1/3', selbstlauf = false, takt = 8000, dunkel = false, className }: KarussellProps) {
  const imBrowser = useImBrowser();
  const ruhig = useRuhigGewuenscht();
  const [angehalten, setAngehalten] = useState(false);
  const [darueber, setDarueber] = useState(false);
  const spur = useRef<HTMLUListElement>(null);
  const teile = Children.toArray(children);

  // Reihe: Selbstlauf, solange nichts dagegen spricht (Maus, Fokus, Knopf, verborgener Tab, reduzierte Bewegung)
  useEffect(() => {
    if (art !== 'reihe' || !selbstlauf || ruhig || angehalten || darueber) return;
    const id = window.setInterval(() => {
      const el = spur.current;
      if (!el || document.visibilityState !== 'visible') return;
      const schritt = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? el.clientWidth;
      const amEnde = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: amEnde ? 0 : el.scrollLeft + schritt, behavior: 'smooth' });
    }, takt);
    return () => window.clearInterval(id);
  }, [art, selbstlauf, ruhig, angehalten, darueber, takt]);

  const rucken = (richtung: 1 | -1) => {
    const el = spur.current;
    if (!el) return;
    const schritt = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? el.clientWidth;
    el.scrollBy({ left: richtung * schritt, behavior: ruhig ? 'auto' : 'smooth' });
  };

  const halten = {
    onPointerEnter: () => setDarueber(true),
    onPointerLeave: () => setDarueber(false),
    onFocus: () => setDarueber(true),
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDarueber(false);
    },
  };

  if (art === 'band') {
    return (
      <section aria-roledescription="Karussell" aria-label={name} className={clsx('flex items-center gap-4', className)}>
        <div className="karussell-band min-w-0 flex-1" data-motion="karussell" data-angehalten={angehalten || undefined} {...halten}>
          <div className="karussell-band-spur">
            <ul className="karussell-band-teil">
              {teile.map((t, i) => (
                <li key={i} className="shrink-0">
                  {t}
                </li>
              ))}
            </ul>
            {/* zweite Fassung nur fürs Auge: lückenloses Weiterlaufen */}
            <ul className="karussell-band-teil karussell-band-kopie" aria-hidden="true" inert>
              {teile.map((t, i) => (
                <li key={i} className="shrink-0">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {imBrowser && !ruhig && <PauseKnopf angehalten={angehalten} umschalten={() => setAngehalten((a) => !a)} dunkel={dunkel} />}
      </section>
    );
  }

  return (
    <section aria-roledescription="Karussell" aria-label={name} className={className} {...halten}>
      {/* Abstand innen statt gap: die Karten füllen die Breite genau, jede sichtbare Karte steht ganz im Bild (nie angeschnitten, E-047) */}
      <ul ref={spur} data-motion="karussell" className="karussell-reihe -mx-3 flex snap-x snap-mandatory overflow-x-auto pb-4">
        {teile.map((t, i) => (
          <li key={i} role="group" aria-roledescription="Folie" aria-label={`${i + 1} von ${teile.length}`} className={clsx('shrink-0 snap-start px-3', karte)}>
            {t}
          </li>
        ))}
      </ul>
      {imBrowser && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button type="button" onClick={() => rucken(-1)} className={knopf}>
            <Icon name="pfeil-links" groesse={4} />
            <span className="sr-only">Zurück</span>
          </button>
          {selbstlauf && !ruhig && <PauseKnopf angehalten={angehalten} umschalten={() => setAngehalten((a) => !a)} />}
          <button type="button" onClick={() => rucken(1)} className={knopf}>
            <Icon name="pfeil-rechts" groesse={4} />
            <span className="sr-only">Weiter</span>
          </button>
        </div>
      )}
    </section>
  );
}
