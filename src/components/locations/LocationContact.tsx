"use client";

// Regionaler Kontakt (E2-ORCH-09-N3, Muster /kontakt): Schriftfeld an der Fuge – links Etikett, Frage und Zusage,
// rechts Rufnummer (Hauptknopf) und WhatsApp (Nebenknopf), darunter die drei Zusagen als Zeilen an der Fuge.
// Texte, Ziele und Haptik-Rückmeldung unverändert; Verlauf, Punktraster, Pill-Badge und Herzschlag entfallen.
import React, { useId } from "react";
import clsx from "clsx";
import Icon from "@/components/icons/Icon";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import { etikettKlassen, knopfKlassen, seitenKlassen } from "@/components/kern/stile";
import { COMPANY_DATA } from "@/config/company";
import { siteConfig } from "@/lib/config";
import { triggerHaptic } from "@/lib/haptics";

interface LocationContactProps {
  cityName?: string;
  className?: string;
  /** Standortseiten (E4-NACH-09, Tempo Z-08): Inhalt erst in Sichtnähe zeichnen; opt-in, damit andere Seiten unverändert bleiben */
  spaet?: boolean;
  /** in einem Abschnitt eingebettet: ohne eigenen Seitenrand und Abstand (sonst doppelter Einzug, Rückgabe E4-N2-07) */
  eingebettet?: boolean;
}

export default function LocationContact({
  cityName = "Aßlar & Wetzlar",
  className = "",
  spaet = false,
  eingebettet = false,
}: LocationContactProps) {
  const titelId = useId();
  return (
    <section aria-labelledby={titelId} className={clsx(!eingebettet && "py-12 lg:py-16", className)}>
      <div className={clsx(!eingebettet && seitenKlassen, spaet && "spaet-zeichnen")}>
        <div className="grid grid-cols-1 gap-8 border border-fuge bg-fliese p-6 sm:p-8 md:grid-cols-2 lg:gap-12 lg:p-12">
          <div>
            <span className={etikettKlassen}>
              <Icon name="ort" groesse={4} />
              <span>Ihr regionaler Ansprechpartner für {cityName}</span>
            </span>

            <h2 id={titelId} className="mt-4 text-fs-5 text-tinte">
              Fliesenleger oder Badsanierung in {cityName} gesucht?
            </h2>

            <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
              Fachbetriebsleiter Deniz Tezgel berät Sie in {cityName} persönlich und unverbindlich. Vereinbaren Sie
              direkt Ihr kostenfreies Aufmaß vor Ort.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
              <a
                href={siteConfig.contact.phone.link}
                onClick={() => triggerHaptic("medium")}
                className={knopfKlassen("haupt")}
                data-motion="druck"
              >
                <Icon name="telefon" groesse={5} />
                {/* Telefon in Mono (wie überall im Bestand, E3-SICHT-2-ERZ Befund 17): der Schriftschnitt steht am Text, nicht an der Klasse */}
                <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
              </a>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic("light")}
                className={knopfKlassen("neben")}
                data-motion="druck"
              >
                <WhatsAppLogo className="size-5" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            <ul className="border-t border-fuge font-text text-fs-2 text-tinte">
              <li className="flex items-center gap-3 border-b border-fuge py-3">
                <Icon name="uhr" groesse={4} className="text-tinte-2" />
                <span>{siteConfig.openingHours.store}</span>
              </li>
              <li className="flex items-center gap-3 border-b border-fuge py-3">
                <Icon name="aufmass" groesse={4} className="text-tinte-2" />
                <span>Vor-Ort-Aufmaß kostenfrei</span>
              </li>
              <li className="flex items-center gap-3 border-b border-fuge py-3">
                <Icon name="haken" groesse={4} className="text-abnahme" />
                <span>Verbindlicher Festpreis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
