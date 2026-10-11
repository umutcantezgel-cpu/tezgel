// Teilen (P4-02, KERN v1.2, F-16 „Teilen-Links“): Knopf „Teilen“ öffnet das Blatt „Artikel teilen“ mit den Zielen
// Facebook, Twitter/X, LinkedIn, WhatsApp, E-Mail und „Link kopieren“; „Schließen“ schließt es.
// Nur Darstellung. Öffnen und Schließen leistet der Browser über das native Popover (`popovertarget`, `popover="auto"`):
// Knopf, „Schließen“ (`popovertargetaction="hide"`), Escape und Tippen daneben – auch ohne JavaScript bzw. vor dem
// Hydrieren. aria-expanded ist im Bestand ein DOM-Attribut, das der Funktionstest liest; es kommt hier als Prop `offen`,
// das ein Hook aus dem toggle-Ereignis setzt. Ebenso Hook-Sache (Bestand `ShareButtons.jsx`, OFFENE FRAGE G9):
// die Ziel-Adressen (aus Artikel-Adresse, Titel, Beschreibung), der native Teilen-Dialog (`navigator.share`, mobil statt des
// Blatts), das Kopieren in die Zwischenablage mit Rückmeldung „Link kopiert!“ für 2 s.
// Blatt: mobil unten über der Leiste (volle Breite), ab lg in der Bildmitte (Vorgabe des Browsers), vier von zwölf Spalten breit
// (P4-10a: Kern-Raster statt einer Tailwind-Standardbreite); Blattkante Tinte,
// Ziele als Zeilen mit 48 px Trefferfläche, Marken-Zeichen nur WhatsApp (Markenlogo, unverändert) – die übrigen Ziele
// tragen den Namen ohne fremde Logos (K-010, eine Icon-Familie). Fokus 2 px Tinte; Rückmeldung „kopiert“ = Haken + Text.
import type { ReactNode } from 'react';
import { fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';

export type TeilenZiel = { name: string; href: string; extern?: boolean; zeichen?: IconName };

export type TeilenProps = {
  /** id des Blatts (eindeutig je Seite) */
  id: string;
  /** Beschriftung des Knopfs (Bestand: „Teilen“) */
  knopf: ReactNode;
  /** Kopf des Blatts (Bestand: „Artikel teilen“) */
  titel: ReactNode;
  ziele: TeilenZiel[];
  /** Knopf „Link kopieren“ (nur mit JavaScript sinnvoll; ohne Rückruf nicht anzeigen) */
  kopieren?: { label: ReactNode; kopiertLabel: ReactNode; kopiert?: boolean; onKopieren?: () => void };
  /** Beschriftung „Schließen“ */
  schliessen: ReactNode;
  /** aria-expanded des Knopfs, vom Hook aus dem toggle-Ereignis gesetzt. Ohne Hook weggelassen: Chromium meldet den
   *  Zustand eines popovertarget-Knopfs dann selbst; ein festes false wäre nach dem nativen Öffnen falsch. */
  offen?: boolean;
  className?: string;
};

const ZEILE = verbinde(
  'flex min-h-k-7 w-full items-center gap-k-3 px-k-4 py-k-2 k-text text-k-2 font-semibold text-k-tinte text-left',
  'pointer-fine:hover:bg-k-kalk active:bg-k-fuge',
  fokus(),
  'focus-visible:-outline-offset-2',
);

export default function Teilen({ id, knopf, titel, ziele, kopieren, schliessen, offen, className }: TeilenProps) {
  const titelId = `${id}-titel`;
  return (
    <div className={className}>
      <button
        type="button"
        popoverTarget={id}
        aria-expanded={offen}
        aria-controls={id}
        data-motion="druck"
        className={verbinde(
          'inline-flex min-h-k-7 cursor-pointer items-center gap-k-2 rounded-k-0 border border-k-strich px-k-5 py-k-2 k-text text-k-2 font-semibold text-k-tinte',
          'pointer-fine:hover:border-k-tinte pointer-fine:hover:bg-k-fliese active:bg-k-fuge',
          fokus(),
        )}
      >
        <Icon name="teilen" groesse={20} />
        <span>{knopf}</span>
      </button>
      <div
        id={id}
        popover="auto"
        role="dialog"
        aria-labelledby={titelId}
        className={verbinde(
          'm-0 inset-x-0 top-auto bottom-(--k-leiste-platz) w-full border-0 border-t-2 border-t-k-tinte bg-k-fliese p-0 text-k-tinte',
          'lg:inset-0 lg:m-auto lg:h-fit lg:w-4/12 lg:border lg:border-t-2 lg:border-k-fuge lg:border-t-k-tinte',
        )}
      >
        <p id={titelId} className="border-b border-k-fuge px-k-4 py-k-3 k-anzeige text-k-4 text-k-tinte">
          {titel}
        </p>
        <ul className="divide-y divide-k-fuge">
          {ziele.map((z) => (
            <li key={z.name}>
              <a href={z.href} target={z.extern ? '_blank' : undefined} rel={z.extern ? 'noopener noreferrer' : undefined} data-motion="zustand" className={ZEILE}>
                {z.zeichen ? (
                  <span aria-hidden="true" className="flex shrink-0">
                    <Icon name={z.zeichen} groesse={20} />
                  </span>
                ) : null}
                <span>{z.name}</span>
              </a>
            </li>
          ))}
          {kopieren?.onKopieren ? (
            <li>
              <button type="button" onClick={kopieren.onKopieren} data-motion="zustand" className={ZEILE}>
                {kopieren.kopiert ? (
                  <span aria-hidden="true" className="flex shrink-0 text-k-abnahme">
                    <Icon name="haken" groesse={20} />
                  </span>
                ) : null}
                <span className={kopieren.kopiert ? 'text-k-abnahme' : undefined}>{kopieren.kopiert ? kopieren.kopiertLabel : kopieren.label}</span>
              </button>
              {/* Ansage außerhalb des Knopfs (Kinder eines Knopfs sind für Screenreader reine Darstellung) */}
              <span role="status" className="sr-only">
                {kopieren.kopiert ? kopieren.kopiertLabel : null}
              </span>
            </li>
          ) : null}
        </ul>
        <button
          type="button"
          popoverTarget={id}
          popoverTargetAction="hide"
          data-motion="zustand"
          className={verbinde(ZEILE, 'justify-center border-t border-k-tinte')}
        >
          <Icon name="schliessen" groesse={20} />
          <span>{schliessen}</span>
        </button>
      </div>
    </div>
  );
}
