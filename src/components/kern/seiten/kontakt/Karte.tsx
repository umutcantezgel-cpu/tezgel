// Karte im Abschnitt „Standort & Anfahrt“ auf `/kontakt` (P4-08f, F-12): erst nach Marketing-Einwilligung, vorher keine
// Anfrage an Karten-Hosts. Die Einwilligung prüft allein die Insel `KartenPlatzhalter` (P3-08, `useKartenEinwilligung`); sie
// hält in jedem Zustand (vor dem Mount · Frage · Karte) eine feste Seitenverhältnis-Box – kein Layoutsprung.
// Karte nach Einwilligung wie der Bestand ohne API-Schlüssel (`ContactPremiumMap`, Zweig ohne Schlüssel): OpenStreetMap-Ansicht
// des Firmensitzes Aßlar, `getMapEmbedUrl({ …, zoom: 14 })` = `getOsmEmbedUrl(Aßlar, 14)`, Titel „Kartenansicht Aßlar“, dazu der
// Link „In Google Maps öffnen“ (Routenziel des Bestands). Den Schlüsselweg (Google-JS-Karte) baut der Kern nicht nach (E-021).
// Server-Komponente; die Kinder rendert der Platzhalter erst nach Einwilligung.
import KartenPlatzhalter from '@/components/kern/einwilligung/KartenPlatzhalter';
import { siteConfig } from '@/lib/config';
import { CITY_COORDINATES, CITY_HUB_DATA, getDirectionsUrl, getOsmEmbedUrl } from '@/lib/maps/getMapEmbedUrl';
import { fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

const KARTENLINK = verbinde(
  'absolute top-k-3 right-k-3 inline-flex min-h-k-7 items-center gap-k-2 border border-k-strich bg-k-fliese px-k-4',
  'k-text text-k-2 font-semibold text-k-tinte',
  'pointer-fine:hover:border-k-tinte active:border-k-tinte',
  fokus('hell'),
);

export default function Karte() {
  const { lat, lng } = CITY_COORDINATES.asslar;
  return (
    <KartenPlatzhalter>
      <div className="relative">
        <iframe
          title={`Kartenansicht ${CITY_HUB_DATA.asslar.name}`}
          src={getOsmEmbedUrl(lat, lng, 14)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block size-full border-0"
        />
        <a href={getDirectionsUrl(siteConfig.company.fullAddress)} target="_blank" rel="noopener noreferrer" data-motion="zustand" className={KARTENLINK}>
          <span aria-hidden="true" className="flex shrink-0">
            <Icon name="ort" groesse={16} />
          </span>
          <span>In Google Maps öffnen</span>
          <span aria-hidden="true" className="flex shrink-0">
            <Icon name="extern" groesse={16} />
          </span>
        </a>
      </div>
    </KartenPlatzhalter>
  );
}
