"use client";

// Anfahrt je Standort (E3-BAU-21, Muster LocationContact und DirectContactCard): Abschnitt im System, drei Schritte als
// Zeilen an der Fuge in einem Schriftfeld (Mono-Etikett über dem Wert, Icons der Familie), Hauptknopf zum Anruf.
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
      <div className="border border-fuge bg-fliese p-6 sm:p-8 lg:p-12">
        {/* Step 1: Start HQ */}
        <div className="flex items-start gap-4 border-b border-fuge py-4">
          <Icon name="ort" groesse={5} className="mt-1 text-tinte-2" />
          <div>
            <span className={etikett}>Startpunkt</span>
            <div className="mt-1 font-text text-fs-3 font-semibold text-tinte">Aßlar (Firmensitz)</div>
            <p className="mt-1 font-text text-fs-2 text-tinte-2">{siteConfig.company.street}</p>
          </div>
        </div>

        {/* Step 2: Route details */}
        <div className="flex items-start gap-4 border-b border-fuge py-4">
          <Icon name="uhr" groesse={5} className="mt-1 text-tinte-2" />
          <div>
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
        <div className="flex items-start gap-4 py-4">
          <span aria-hidden="true" className="size-5 shrink-0" />
          <div>
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
