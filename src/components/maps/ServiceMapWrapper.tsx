"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import clsx from "clsx";
import { CITIES } from "@/config/cities";
import { COMPANY_DATA } from "@/config/company";
import Icon from "@/components/icons/Icon";
import MapConsentGate from "@/components/legal/MapConsentGate";
import Einzugsband from "@/components/kern/Einzugsband";
import { etikettKlassen, knopfKlassen } from "@/components/kern/stile";
import { CITY_HUB_DATA, getDirectionsUrl } from "@/lib/maps/getMapEmbedUrl";

/** Höhe der Kartenfläche. Einwilligungs-Tor und geladene Karte haben dieselbe Höhe (kein Sprung beim Laden). */
export const KARTE_HOEHE = "460px";

/** Stadtknopf: mindestens 44 px hoch, ohne vertikales Padding, damit die Leiste genau 44 px hoch bleibt. */
export const STADT_KLASSEN =
  "inline-flex min-h-11 items-center gap-2 rounded-none border border-strich bg-fliese px-4 py-2 font-text text-fs-2 text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk";

/** Stadtleiste (feste Höhe h-11, darunter mb-4). Die Auswahl hält das übergeordnete Element. */
export function ServiceStadtleiste({
  selectedSlug,
  onSelectCity,
}: {
  selectedSlug: string;
  onSelectCity: (slug: string) => void;
}) {
  return (
    <div className="mb-4 h-11 overflow-x-auto ohne-scrollleiste">
      <div className="flex h-full min-w-max items-center gap-2">
        {CITIES.map((city) => {
          const isSelected = selectedSlug === city.slug;
          return (
            <button
              key={city.slug}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectCity(city.slug)}
              className={STADT_KLASSEN}
            >
              <Icon name="ort" groesse={4} />
              <span>{city.name}</span>
              <Entfernung slug={city.slug} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Entfernung ab dem Firmensitz Aßlar aus `CITY_HUB_DATA` (wie die Kern-Startseite, P3-12b), nicht `CITIES.distanceKm`
 * (misst ab Wetzlar und zeigte Wetzlar als „HQ“). Der Sitz selbst heißt „Firmensitz“ (Bestandswortlaut); ohne Wert keine Angabe.
 */
function Entfernung({ slug }: { slug: string }) {
  const km = CITY_HUB_DATA[slug]?.distanceKm;
  if (km === undefined) return null;
  return <span className="font-mono text-fs-1">{km === 0 ? "Firmensitz" : `${km} km`}</span>;
}

/** Kurzprofil des gewählten Ortes. Es steht von Anfang an im Dokument, damit nichts unter der Karte nachwächst. */
export function ServiceKurzprofil({ selectedSlug }: { selectedSlug: string }) {
  const currentCity = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;
  const directionsUrl = getDirectionsUrl(
    selectedSlug === "asslar" ? COMPANY_DATA.headquarters.fullAddress : `${currentCity.name}, Hessen`
  );

  return (
    <div className="mt-4 border border-fuge bg-fliese p-6 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-mass flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className={etikettKlassen}>
              {currentCity.distanceKm === 0 ? "Firmensitz & Meister-Erfahrung" : `Einsatzgebiet ${currentCity.name}`}
            </span>
            <span className={etikettKlassen}>
              <Icon name="uhr" groesse={4} />
              <span>{currentCity.driveTimeText}</span>
            </span>
          </div>

          <h3 className="font-text text-fs-4 font-semibold text-tinte">
            Fliesenverlegung & Badsanierung in {currentCity.name}
          </h3>

          <p className="font-text text-fs-3 text-tinte-2">{currentCity.tagline}</p>

          <ul className="flex flex-wrap gap-2">
            {currentCity.services.map((service, idx) => (
              <li
                key={idx}
                className="inline-flex items-center gap-2 border border-fuge bg-kalk px-3 py-1 font-text text-fs-1 text-tinte"
              >
                <Icon name="haken" groesse={4} />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <a href="/kontakt#express-anfrage" className={knopfKlassen("haupt", "w-full sm:w-auto")} data-motion="druck">
            <span>Kostenloses Vor-Ort-Aufmaß</span>
            <Icon name="pfeil-rechts" groesse={4} />
          </a>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={knopfKlassen("neben", "w-full sm:w-auto")} data-motion="druck"
          >
            <Icon name="link-extern" groesse={4} />
            <span>Route in Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** Lade-Anzeige im Rahmen, solange die Karte noch nicht im Blick ist oder ihr Code lädt. */
function KartenPlatzhalter() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
      <span className="font-text text-fs-2 font-semibold text-tinte">Karte wird geladen...</span>
      <span className="block h-px w-16 bg-strich" aria-hidden="true" />
    </div>
  );
}

/** Die Karte (Google-Karte oder Radar) lädt erst nach Einwilligung und wenn sie im Blick ist. */
const ServiceKarteInhalt = dynamic(
  () => import("@/components/maps/InteractiveServiceMap").then((m) => m.ServiceKarteInhalt),
  {
    ssr: false,
    loading: () => <KartenPlatzhalter />,
  }
);

/** Beobachtet den Rahmen: die Karte lädt, sobald er nahe am Sichtfeld ist (200 px vorab), dann nicht mehr beobachten. */
function KarteBeimSehen({
  selectedSlug,
  onSelectCity,
}: {
  selectedSlug: string;
  onSelectCity: (slug: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isInView) return;

    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInView(true);
      return;
    }

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        if (eintraege.some((eintrag) => eintrag.isIntersecting)) {
          setIsInView(true);
          beobachter.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, [isInView]);

  return (
    <div ref={ref} className="h-full w-full">
      {isInView ? (
        <ServiceKarteInhalt selectedSlug={selectedSlug} onSelectCity={onSelectCity} />
      ) : (
        <KartenPlatzhalter />
      )}
    </div>
  );
}

/**
 * Höhe der Kartenfläche neben der Ortsliste im Abschnitt Servicegebiet der Startseite: 13 Orte in zwei Spalten
 * (7 Zeilen à 54 px) plus Maßzeile (61 px) ergeben 440 px. Mit 460 px (erlaubte Kartenhöhe, E-018) passt die
 * kompakte Einzugsband-Vorschau ganz in den Platzhalter (bei 440 px unten beschnitten, Rückgabe E3-NACH-05);
 * die Vorschau erscheint erst ab xl, weil die Spalte darunter zu schmal ist.
 */
const KARTE_HOEHE_NEBEN_LISTE = "460px";

/**
 * Nur die Kartenfläche (Einwilligungs-Tor, dann Karte, sobald sie im Blick ist) für den Abschnitt Servicegebiet der
 * Startseite. Ohne Stadtleiste und Kurzprofil, weil dort die Ortsliste steht und das Kurzprofil darunter folgt.
 * Der Default-Export bleibt unverändert; diese Komponente nimmt keine Props, damit sie aus Server-Komponenten
 * ohne Übergabe von Funktionen eingebunden werden kann.
 */
export function ServiceKartenflaeche() {
  const [selectedSlug, setSelectedSlug] = useState<string>("asslar");
  const currentCity = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;

  return (
    <MapConsentGate
      title={`Einsatzgebiet Fliesenverlegung Tezgel – ${currentCity.name}`}
      height={KARTE_HOEHE_NEBEN_LISTE}
      className="w-full"
      vorschau={<Einzugsband kompakt />}
      vorschauAb="xl"
    >
      <KarteBeimSehen selectedSlug={selectedSlug} onSelectCity={setSelectedSlug} />
    </MapConsentGate>
  );
}

export default function ServiceMapWrapper({ className = "" }: { className?: string }) {
  const [selectedSlug, setSelectedSlug] = useState<string>("asslar");
  const [, startTransition] = useTransition();

  const handleSelectCity = useCallback((slug: string) => {
    startTransition(() => {
      setSelectedSlug(slug);
    });
  }, []);

  const currentCity = CITY_HUB_DATA[selectedSlug] || CITY_HUB_DATA.asslar;

  return (
    <div className={clsx("w-full", className)}>
      <ServiceStadtleiste selectedSlug={selectedSlug} onSelectCity={handleSelectCity} />
      {/* Einwilligungs-Tor mit Texten und Knöpfen sofort im Dokument; nur die Karte darin lädt nach. */}
      <MapConsentGate
        title={`Einsatzgebiet Fliesenverlegung Tezgel – ${currentCity.name}`}
        height={KARTE_HOEHE}
        className="w-full"
      >
        <KarteBeimSehen selectedSlug={selectedSlug} onSelectCity={handleSelectCity} />
      </MapConsentGate>
      <ServiceKurzprofil selectedSlug={selectedSlug} />
    </div>
  );
}
