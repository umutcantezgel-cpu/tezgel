// Karten der Seite `/standorte` (P4-08c, F-12): beide erst nach Marketing-Einwilligung, vorher keine Anfrage an Karten-Hosts.
// Server-Komponenten; die Einwilligung prüfen allein die Client-Inseln `KartenPlatzhalter` (P3-08, `useKartenEinwilligung`)
// bzw. `KarteImBlick` (P3-12, bindet denselben Platzhalter kurz vor dem Blick ein). Beide halten eine feste
// Seitenverhältnis-Box in jedem Zustand (vor dem Mount · Frage · Karte): kein Layoutsprung (CLS 0).
//
// Einsatzgebiet (Bestand `ServiceMapWrapper` → `InteractiveServiceMap`): Ladebox mit „Karte wird geladen...“ bis kurz vor dem
// Blick, danach der Platzhalter. Karte nach Einwilligung wie auf `/` (E-021): OpenStreetMap-Ansicht des Firmensitzes,
// `getOsmEmbedUrl(Aßlar, 11)`, Titel „OpenStreetMap Ansicht Aßlar“ – Ziel und Titel des Bestands-iframes (Radar → „Straßenkarte“).
// Firmensitz (Bestand `InteractiveMap height="400px"`): Platzhalter sofort (der Test sucht den Knopf ohne Bildlauf in der
// `section` mit „Unser Hauptstandort in Aßlar“), Karte nach Einwilligung das iframe des Bestands ohne API-Schlüssel:
// `getOsmEmbedUrl(TEZGEL_HQ_COORDS, 15)` (= `getMapEmbedUrl({ …, zoom: 15 })` ohne Schlüssel), Titel „Standort von {Firma}“.
// Den Schlüsselweg (Google-JS-Karte) baut der Kern nicht nach (E-021); so landet auch kein Server-Schlüssel im HTML.
import KartenPlatzhalter from '@/components/kern/einwilligung/KartenPlatzhalter';
import KarteImBlick from '@/components/kern/start/vertrauen/KarteImBlick';
import { COMPANY_DATA } from '@/config/company';
import { CITY_COORDINATES, CITY_HUB_DATA, TEZGEL_HQ_COORDS, getOsmEmbedUrl } from '@/lib/maps/getMapEmbedUrl';

/** Karte im Abschnitt „Unser 45-km-Einsatzgebiet in Mittelhessen“. */
export function EinsatzgebietKarte() {
  const { lat, lng } = CITY_COORDINATES.asslar;
  return (
    <KarteImBlick>
      <iframe
        title={`OpenStreetMap Ansicht ${CITY_HUB_DATA.asslar.name}`}
        src={getOsmEmbedUrl(lat, lng, 11)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block border-0"
      />
    </KarteImBlick>
  );
}

/** Karte im Abschnitt „Unser Hauptstandort in Aßlar“. */
export function StandortKarte() {
  return (
    <KartenPlatzhalter>
      <iframe
        title={`Standort von ${COMPANY_DATA.legalName}`}
        src={getOsmEmbedUrl(TEZGEL_HQ_COORDS.lat, TEZGEL_HQ_COORDS.lng, 15)}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="block border-0"
      />
    </KartenPlatzhalter>
  );
}
