// Standortseite · Anfahrt ab Aßlar (Q-04, KERN v2): „Schnell bei Ihnen in {Stadt}“ als gezeichneter Plan.
// Kopf über `Abschnitt` (Mono-Etikett mit Fugenkreuz, H2, Vorspann). Darunter das Planfeld: drei Felder an der Fuge –
// Startpunkt · Fahrtzeit & Strecke · Ihr Projekt –, jedes mit einem Planstreifen im feinen Fugenraster (24 px, je Feld
// neu angesetzt wie eine Fliese). Die Strecke ist das einzige rote Element (Laser, 2 px): Sie läuft vom Fugenkreuz am
// Firmensitz zum Fugenkreuz am Ziel, ab md als Waage im Streifen über den Feldern, mobil als Lot im Streifen links
// (K-003 Nr. 7). Beide Marken sitzen auf einem Rasterkreuz, die Angaben fluchten an ihnen. Beschriftungen als
// Mono-Etiketten, Fahrzeit und Entfernung in Mono; darunter die Anfrage als Hauptknopf (Telefon).
// Zeichnung dekorativ (aria-hidden), alle Angaben als echter Text in einer geordneten Liste (Start → Strecke → Ziel).
// Serverkomponente ohne Zustand und ohne Bewegung. Texte, Fahrzeit-Rechnung und Ziel des Links wie im Bestand;
// Entfernungen aus `@/config/cities` (gemessen ab Wetzlar, dargestellt ab Aßlar – I-16/WM-17, bewusst unverändert).
import { useId } from 'react';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen } from '@/components/kern/stile';
import { siteConfig } from '@/lib/config';
import type { CityData } from '@/config/cities';

interface RouteVisualizationProps {
  city: CityData;
  className?: string;
}

type Lage = 'start' | 'strecke' | 'ziel';

/**
 * Planstreifen eines Feldes mit feinem Fugenraster (24 px): mobil links (48 px breit), ab md oben (48 px hoch).
 * Nur der Streifen trägt das Raster, die Angaben stehen auf ruhigem Grund. Erzwungene Farben: Raster entfällt.
 */
function Raster() {
  const muster = `anfahrt-raster-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-y-0 left-0 h-full w-12 border-r border-fuge text-fuge forced-colors:hidden md:inset-x-0 md:top-0 md:bottom-auto md:h-12 md:w-full md:border-r-0 md:border-b"
    >
      <defs>
        <pattern id={muster} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 23.5H24M23.5 0V24" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${muster})`} />
    </svg>
  );
}

/**
 * Teilstück der Strecke in einem Feld, Mitte jeweils 24 px von der Feldkante (Rasterlinie):
 * mobil Lot von oben nach unten, ab md Waage von links nach rechts. Die Stücke der Folgefelder überdecken deren Fuge
 * (-top-px bzw. -left-px), damit die Linie ohne Lücke durchläuft; Start- und Zielstück enden am Fugenkreuz.
 */
function Streckenstueck({ lage }: { lage: Lage }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={clsx(
          'absolute left-6 -translate-x-1/2 border-l-2 border-laser md:hidden',
          lage === 'start' && 'top-6 bottom-0',
          lage === 'strecke' && '-top-px bottom-0',
          lage === 'ziel' && '-top-px h-6',
        )}
      />
      <span
        aria-hidden="true"
        className={clsx(
          'absolute top-6 hidden -translate-y-1/2 border-t-2 border-laser md:block',
          lage === 'start' && 'left-6 right-0',
          lage === 'strecke' && '-left-px right-0',
          lage === 'ziel' && '-left-px w-6',
        )}
      />
    </>
  );
}

/** Ein Feld des Plans: Raster, Streckenstück, Marke (nur Start und Ziel) und die Angaben an der Flucht der Marke. */
function Feld({ lage, etikett, wert, notiz, mono = false }: { lage: Lage; etikett: string; wert: string; notiz: string; mono?: boolean }) {
  return (
    <li className={clsx('relative min-w-0', lage !== 'start' && 'border-t border-fuge md:border-t-0 md:border-l')}>
      <Raster />
      <Streckenstueck lage={lage} />
      {lage !== 'strecke' && <Fugenkreuz className="absolute top-6 left-6 size-4 -translate-x-1/2 -translate-y-1/2 text-tinte" />}
      <div className="relative pt-4 pr-6 pb-8 pl-16 md:px-6 md:pt-16">
        <p className={etikettKlassen}>{etikett}</p>
        <p
          className={clsx(
            'mt-2 text-fs-5 text-tinte md:text-fs-4 lg:text-fs-5',
            mono ? 'font-mono' : 'font-anzeige font-extrabold',
          )}
        >
          {wert}
        </p>
        <p className={clsx('mt-2 text-fs-2 text-tinte-2', mono && 'font-mono')}>{notiz}</p>
      </div>
    </li>
  );
}

export default function RouteVisualization({ city, className = '' }: RouteVisualizationProps) {
  // Fahrzeit wie im Bestand: 1,3 min je km + 5 min, mindestens 8 min (alter Kommentar nannte 1,5 min je km)
  const drivingMinutes = Math.max(8, Math.round(city.distanceKm * 1.3 + 5));

  return (
    <Abschnitt
      id="anfahrt"
      flaeche="fliese"
      etikett="Kurze Anfahrtswege in Mittelhessen"
      titel={`Schnell bei Ihnen in ${city.name}`}
      einleitung={
        <p>
          {city.distanceKm === 0
            ? `Als direkte Nachbarstadt erreichen wir ${city.name} von unserem Betriebssitz in Aßlar in wenigen Fahrminuten für Ihr persönliches Vor-Ort-Aufmaß.`
            : `Von unserem Betriebssitz in Aßlar erreichen wir Ihre Baustelle in ${city.name} (ca. ${city.distanceKm} km) über die B49/A45 in rund ${drivingMinutes} Minuten.`}
        </p>
      }
      className={className || undefined}
    >
      {/* Planfeld: Start → Strecke → Ziel */}
      <ol className="grid grid-cols-1 border border-fuge bg-kalk md:grid-cols-3">
        <Feld lage="start" etikett="Startpunkt" wert="Aßlar (Firmensitz)" notiz={siteConfig.company.street} />
        <Feld
          lage="strecke"
          etikett="Fahrtzeit & Strecke"
          wert={`ca. ${drivingMinutes} Min.`}
          notiz={city.distanceKm === 0 ? 'Direkte Nachbarschaft' : `ca. ${city.distanceKm} km Entfernung`}
          mono
        />
        <Feld lage="ziel" etikett="Ihr Projekt" wert={city.name} notiz="Kostenfreies Vor-Ort-Aufmaß" />
      </ol>

      <div className="mt-8">
        <Knopf href={siteConfig.contact.phone.link} iconLinks="telefon" className="w-full sm:w-auto">
          Jetzt Vor-Ort-Termin für {city.name} anfragen
        </Knopf>
      </div>
    </Abschnitt>
  );
}
