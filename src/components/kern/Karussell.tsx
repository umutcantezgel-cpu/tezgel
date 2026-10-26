'use client';
// Karussell (KERN v3.6 K-016 „Ruhe“, E-047): langsam, gut strukturiert, läuft von rechts nach links. Zwei Arten:
// - band: ein endloses Laufband (Qualifikationen im Fuß). Der Inhalt steht zweimal hintereinander, die zweite Fassung ist
//   für Screenreader und Tastatur verborgen; das Band rückt per CSS um die halbe Länge (bewegung.css, Block karussell).
// - reihe: Karten nebeneinander mit Einrasten beim Wischen (Kundenstimmen, Fotos). Mit Selbstlauf rückt die Reihe alle
//   `takt` ms um eine Karte weiter und springt am Ende an den Anfang.
// Beide halten an, solange die Maus darüber steht oder der Fokus darin liegt, und haben einen Knopf zum Anhalten (WCAG 2.2.2:
// Bewegung über 5 s); nach einer Berührung bleibt der Selbstlauf aus. Ohne JavaScript, bei reduzierter Bewegung, bei
// erzwungenen Farben und im Notaus läuft nichts von selbst: das Band steht als umbrechende Liste (nichts abgeschnitten), die
// Reihe wird nur von Hand gewischt. Bewegt wird nur translate (Band) bzw. die Scrollposition (Reihe).
import { Children, useEffect, useRef, useState, useSyncExternalStore, type FocusEvent, type PointerEvent, type ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';

const ohneAbo = () => () => {};
function useImBrowser() {
  return useSyncExternalStore(ohneAbo, () => true, () => false);
}

// Ruhe gewünscht: reduzierte Bewegung, erzwungene Farben (dort steht das Band, bewegung.css), ohne Startklasse oder im Notaus
const RUHIG_MEDIEN = ['(prefers-reduced-motion: reduce)', '(forced-colors: active)'];
function useRuhigGewuenscht() {
  return useSyncExternalStore(
    (melden) => {
      const medien = RUHIG_MEDIEN.map((q) => window.matchMedia(q));
      medien.forEach((m) => m.addEventListener('change', melden));
      return () => medien.forEach((m) => m.removeEventListener('change', melden));
    },
    () => RUHIG_MEDIEN.some((q) => window.matchMedia(q).matches) || !document.documentElement.classList.contains('k-bewegung') || document.documentElement.classList.contains('k-notaus'),
    () => true,
  );
}

// Farben je Fläche vollständig getrennt: in einer gemeinsamen Grundklasse gewönne sonst die helle Farbe (gleiche Utility)
const knopfGrund =
  'inline-flex size-11 items-center justify-center border transition-colors dauer-1 ease-setzen focus-visible:outline-2 focus-visible:outline-offset-2';
const knopfHell = 'border-fuge bg-fliese text-tinte hover:border-tinte focus-visible:outline-tinte';
const knopfDunkel = 'border-nacht-fuge bg-tinte text-kalk hover:border-kalk focus-visible:outline-kalk';
const knopf = clsx(knopfGrund, knopfHell);

// Wechselnder Name statt aria-pressed (wie der Knopf zum Anhalten im APG-Karussell). Er liegt über der Spur: die verschobene
// Spur bildet eine eigene Ebene und läge sonst in der Malreihenfolge über ihm, abgeschnitten, aber für Prüfwerkzeuge verdeckend
// (Lighthouse target-size, E-061).
function PauseKnopf({ angehalten, umschalten, dunkel = false }: { angehalten: boolean; umschalten: () => void; dunkel?: boolean }) {
  return (
    <button type="button" onClick={umschalten} className={clsx(knopfGrund, 'relative z-10', dunkel ? knopfDunkel : knopfHell)}>
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
  // Reihe: passen alle Karten nebeneinander, gibt es nichts zu blättern (Knöpfe unsichtbar, kein Selbstlauf)
  const [ueberlauf, setUeberlauf] = useState(false);
  const spur = useRef<HTMLUListElement>(null);
  const teile = Children.toArray(children);

  useEffect(() => {
    const el = spur.current;
    if (art !== 'reihe' || !el) return;
    const messen = () => setUeberlauf(el.scrollWidth > el.clientWidth + 1);
    messen();
    const beobachter = new ResizeObserver(messen);
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [art]);

  // Reihe unter sm: Die Karten stehen oben (items-start), die Spur folgt der Höhe der sichtbaren Karte. Sonst bliebe unter
  // einer kurzen Karte die Höhe der längsten als Lücke vor den Pfeilen (bei großer Schrift über 200 px; Browserprüfung E4-W1,
  // Runde 2). Gemessen wird nach dem Wischen und wenn sich eine Karte in der Größe ändert; beobachtet werden nur die Karten,
  // nicht die Spur selbst (keine Rückkopplung). Ab sm stehen die Karten gestreckt nebeneinander, dort bleibt die Höhe frei.
  useEffect(() => {
    const el = spur.current;
    if (art !== 'reihe' || !el) return;
    const breit = window.matchMedia('(min-width: 40rem)');
    const anpassen = () => {
      const karten = Array.from(el.children) as HTMLElement[];
      if (breit.matches || karten.length < 2) {
        el.style.height = '';
        return;
      }
      const links = el.getBoundingClientRect().left;
      const abstand = (k: HTMLElement) => Math.abs(k.getBoundingClientRect().left - links);
      const aktiv = karten.reduce((a, k) => (abstand(k) < abstand(a) ? k : a));
      const stil = getComputedStyle(el);
      el.style.height = `${aktiv.offsetHeight + parseFloat(stil.paddingTop) + parseFloat(stil.paddingBottom)}px`;
    };
    anpassen();
    let zeit = 0;
    const nachRollen = () => {
      window.clearTimeout(zeit);
      zeit = window.setTimeout(anpassen, 120);
    };
    el.addEventListener('scroll', nachRollen, { passive: true });
    const beobachter = new ResizeObserver(nachRollen);
    Array.from(el.children).forEach((k) => beobachter.observe(k));
    breit.addEventListener('change', anpassen);
    return () => {
      window.clearTimeout(zeit);
      el.removeEventListener('scroll', nachRollen);
      beobachter.disconnect();
      breit.removeEventListener('change', anpassen);
      el.style.height = '';
    };
  }, [art]);

  // Reihe: Selbstlauf, solange nichts dagegen spricht (Maus, Fokus, Knopf, Berührung, verborgener Tab, reduzierte Bewegung).
  // Gerückt wird nur, wenn die Reihe zumindest zur Hälfte im Fenster steht und niedriger ist als das Fenster: ist sie höher
  // (große Schrift), liest man gerade Zeile für Zeile, und der Knopf zum Anhalten stünde außer Sicht.
  useEffect(() => {
    if (art !== 'reihe' || !selbstlauf || ruhig || angehalten || darueber || !ueberlauf) return;
    const id = window.setInterval(() => {
      const el = spur.current;
      if (!el || document.visibilityState !== 'visible') return;
      const lage = el.getBoundingClientRect();
      const sichtbar = Math.min(lage.bottom, window.innerHeight) - Math.max(lage.top, 0);
      if (lage.height > window.innerHeight || sichtbar < lage.height / 2) return;
      const schritt = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? el.clientWidth;
      const amEnde = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: amEnde ? 0 : el.scrollLeft + schritt, behavior: 'smooth' });
    }, takt);
    return () => window.clearInterval(id);
  }, [art, selbstlauf, ruhig, angehalten, darueber, ueberlauf, takt]);

  const rucken = (richtung: 1 | -1) => {
    const el = spur.current;
    if (!el) return;
    const schritt = (el.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? el.clientWidth;
    el.scrollBy({ left: richtung * schritt, behavior: ruhig ? 'auto' : 'smooth' });
  };

  // Berührung (Finger, Stift) auf Spur oder Pfeilen: ab dann bleibt der Selbstlauf aus; ohne Maus gibt es kein Verlassen,
  // das ihn wieder anstößt. Nicht am Knopf zum Anhalten, der schaltet selbst um.
  const beruehrt = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') setAngehalten(true);
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
        <div className="karussell-band min-w-0 flex-1" data-motion="karussell" data-angehalten={angehalten || undefined} onPointerDown={beruehrt} {...halten}>
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

  const bedienbar = imBrowser && ueberlauf;
  return (
    <section aria-roledescription="Karussell" aria-label={name} className={className} {...halten}>
      {/* Abstand innen statt gap: die Karten füllen die Breite genau, jede sichtbare Karte steht ganz im Bild (nie angeschnitten, E-047) */}
      {/* Gleich hohe Karten erst ab sm, wenn mehrere nebeneinanderstehen; einzeln (Handy, große Schrift) ist jede Karte so hoch
          wie ihr Inhalt, statt unter einer kurzen Stimme eine halbe Karte leer zu lassen (Browserprüfung E4-W0, E-065) */}
      {/* Die Spur ist selbst per Tastatur erreichbar (Pfeiltasten wischen), auch wenn die Karten keine Links haben; pt-1 hält
          den Fokusrahmen der Karten innerhalb der Clipkante. Die Folie ist ein inneres div, damit die Liste Liste bleibt. */}
      <ul
        ref={spur}
        tabIndex={0}
        onPointerDown={beruehrt}
        data-motion="karussell"
        className="karussell-reihe -mx-3 flex snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden pt-1 pb-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinte sm:items-stretch"
      >
        {teile.map((t, i) => (
          <li key={i} className={clsx('shrink-0 snap-start px-3', karte)}>
            <div role="group" aria-roledescription="Folie" aria-label={`${i + 1} von ${teile.length}`} className="h-full">
              {t}
            </div>
          </li>
        ))}
      </ul>
      {/* Platz der Knöpfe steht von Anfang an (auch ohne JavaScript), damit nichts springt, wenn sie erscheinen */}
      <div aria-hidden={bedienbar ? undefined : true} className={clsx('mt-6 flex items-center justify-center gap-3', !bedienbar && 'invisible')}>
        <button type="button" onClick={() => rucken(-1)} onPointerDown={beruehrt} className={knopf}>
          <Icon name="pfeil-links" groesse={4} />
          <span className="sr-only">Zurück</span>
        </button>
        {selbstlauf && !ruhig && <PauseKnopf angehalten={angehalten} umschalten={() => setAngehalten((a) => !a)} />}
        <button type="button" onClick={() => rucken(1)} onPointerDown={beruehrt} className={knopf}>
          <Icon name="pfeil-rechts" groesse={4} />
          <span className="sr-only">Weiter</span>
        </button>
      </div>
    </section>
  );
}
