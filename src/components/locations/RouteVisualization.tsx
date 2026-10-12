"use client";

// Anfahrt je Standort (E3-BAU-21, Muster LocationContact und DirectContactCard): Abschnitt im System, drei Schritte als
// Zeilen an der Fuge, Hauptknopf zum Anruf. E4-NACH-09 (Befund 30): die Schritte stehen dicht in einer Zeile (ab sm, mit
// Fugen statt gefüllter Felder); untereinander nur auf dem Telefon. Höhe folgt dem Inhalt.
// Texte, Ziele und die Fahrzeitformel unverändert; Verlauf, Schatten, Rundungen und Orange entfallen.
import React from "react";
import Icon from "@/components/icons/Icon";
import Abschnitt from "@/components/kern/Abschnitt";
import Knopf from "@/components/kern/Knopf";
import { siteConfig } from "@/lib/config";
import { CityData } from "@/config/cities";

interface RouteVisualizationProps {
  city: CityData;
  className?: string;
}

const etikett = "block font-mono text-fs-1 text-tinte-2";

export default function RouteVisualization({ city, className = "" }: RouteVisualizationProps) {
  // Approximate driving time calculation (1.5 min per km + 5 min base)
  const drivingMinutes = Math.max(8, Math.round(city.distanceKm * 1.3 + 5));

  return (
    <Abschnitt
      art="arbeit"
      spaet
      etikett={<>Kurze Anfahrtswege in Mittelhessen</>}
      titel={<>Schnell bei Ihnen in {city.name}</>}
      einleitung={
        <p>
          {city.distanceKm === 0
            ? `Als direkte Nachbarstadt erreichen wir ${city.name} von unserem Betriebssitz in Aßlar in wenigen Fahrminuten für Ihr persönliches Vor-Ort-Aufmaß.`
            : `Von unserem Betriebssitz in Aßlar erreichen wir Ihre Baustelle in ${city.name} (ca. ${city.distanceKm} km) über die B49/A45 in rund ${drivingMinutes} Minuten.`}
        </p>
      }
      className={className}
    >
      <div className="flex flex-col divide-y divide-fuge border-y border-fuge sm:flex-row sm:divide-x sm:divide-y-0">
        {/* Step 1: Start HQ */}
        <div className="flex flex-1 items-start gap-3 py-4 sm:px-6 sm:first:pl-0 sm:last:pr-0">
          <Icon name="ort" groesse={5} className="mt-1 shrink-0 text-tinte-2" />
          <div className="min-w-0">
            <span className={etikett}>Startpunkt</span>
            <div className="mt-1 font-text text-fs-3 font-semibold text-tinte">Aßlar (Firmensitz)</div>
            <p className="mt-1 font-text text-fs-2 text-tinte-2">{siteConfig.company.street}</p>
          </div>
        </div>

        {/* Step 2: Route details */}
        <div className="flex flex-1 items-start gap-3 py-4 sm:px-6 sm:first:pl-0 sm:last:pr-0">
          <Icon name="uhr" groesse={5} className="mt-1 shrink-0 text-tinte-2" />
          <div className="min-w-0">
            <span className={etikett}>Fahrtzeit & Strecke</span>
            <div className="mt-1 font-anzeige text-fs-5 font-semibold text-tinte">
              ca. {drivingMinutes} Min.
            </div>
            <p className="mt-1 font-text text-fs-2 text-tinte-2">
              {city.distanceKm === 0 ? "Direkte Nachbarschaft" : `ca. ${city.distanceKm} km Entfernung`}
            </p>
          </div>
        </div>

        {/* Step 3: Destination – ohne Icon (Zuordnung: ShieldCheck entfällt); die leere Icon-Spalte hält den Text bündig */}
        <div className="flex flex-1 items-start gap-3 py-4 sm:px-6 sm:first:pl-0 sm:last:pr-0">
          <span aria-hidden="true" className="mt-1 size-5 shrink-0" />
          <div className="min-w-0">
            <span className={etikett}>Ihr Projekt</span>
            <div className="mt-1 font-text text-fs-3 font-semibold text-tinte">{city.name}</div>
            <p className="mt-1 font-text text-fs-2 text-tinte-2">Kostenfreies Vor-Ort-Aufmaß</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Knopf href={siteConfig.contact.phone.link} icon="pfeil-rechts">
          Jetzt Vor-Ort-Termin für {city.name} anfragen
        </Knopf>
      </div>
    </Abschnitt>
  );
}
