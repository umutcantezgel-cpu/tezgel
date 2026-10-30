"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/icons/Icon";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import { siteConfig } from "@/lib/config";
import { buildWhatsAppUrl, kontextNachricht, openWhatsApp } from "@/lib/whatsapp";
import { triggerHaptic } from "@/lib/haptics";
import { hauptziel, ohneLeiste } from "@/config/navigation";

// Untere Leiste (KERN v3 K-009, E-012): einzige feste Ebene neben dem Kopf, bis lg; drei Wege an der Fuge, die
// Hauptaktion „Termin vor Ort anfragen“ auf Tinte (sichtbar kurz „Termin“, Name für Screenreader vollständig), WhatsApp mit
// Markenzeichen. Anrufen und Termin tragen die Markierungen für „Erstes Bild“ (K-004). Das erste Feld
// ist der Platz des Widerruf-Schilds der Einwilligung (#leiste-schild): die
// Einwilligungs-Komponente hängt ihren Knopf dort ein, sobald sie geladen ist – so verdeckt kein schwebender Knopf Inhalt.
// Bis dahin (und solange der Banner offen ist) steht dort ein ruhender Platzhalter in derselben Gestalt (UM-E4-START).
// Fokus: der Umriss liegt innerhalb des Feldes (Versatz -4), damit ihn weder Nachbarfeld, Fuß der Seite noch Fensterrand
// verdecken; die Farbe je Fläche: Tinte auf den hellen Feldern, Kalk auf dem Termin-Feld (Prüfung UM-E3-ZUST).
// Gedrückt: Hintergrund-Token, ohne Platzwechsel.
const feld =
  "flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-2 font-text text-fs-1 font-semibold transition-colors dauer-1 ease-setzen focus-visible:outline-2 focus-visible:-outline-offset-4";

export default function MobileBottomBar() {
  const pathname = usePathname() || "";

  // Auf den Abläufen selbst ausgeblendet, damit die Leiste keine Schritte verdeckt
  if (ohneLeiste(pathname)) {
    return null;
  }

  return (
    <aside
      aria-label="Schnellkontakt"
      className="unten-sicher fixed inset-x-0 bottom-0 z-30 border-t border-fuge bg-fuge lg:hidden"
      data-feste-ebene
      data-leiste
    >
      <div className="flex gap-px">
        {/* Platz des Schilds mit ruhendem Platzhalter: dasselbe Schloss mit „Cookies“ ab dem ersten Bild, bis die Einwilligung
            ihren Knopf einhängt (dann tritt er zurück, globals.css); kein Ein- und Ausblenden beim Erstbesuch (UM-E4-START) */}
        <div id="leiste-schild" className="flex w-16 shrink-0 bg-kalk">
          <span aria-hidden="true" inert className="leiste-schild-platz flex size-full flex-col items-center justify-center gap-1 px-1 font-text text-fs-1 font-semibold text-tinte-2">
            <Icon name="schloss" groesse={5} />
            <span className="leiste-text">Cookies</span>
          </span>
        </div>
        <a
          href={siteConfig.contact.phone.link}
          onClick={() => triggerHaptic("medium")}
          className={`${feld} bg-kalk text-tinte hover:bg-fliese active:bg-fuge focus-visible:outline-tinte`}
          aria-label={`Fliesenverlegung Tezgel anrufen: ${siteConfig.contact.phone.formatted}`}
          data-erstes-bild="kontakt"
          data-motion="druck"
        >
          <Icon name="telefon" groesse={5} />
          <span className="leiste-text">Anrufen</span>
        </a>

        <a
          href={buildWhatsAppUrl(siteConfig.contact.whatsapp, kontextNachricht(pathname))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            triggerHaptic("light");
            // seitenbezogene Nachricht wie beim Desktop-Knopf (E-015)
            openWhatsApp({ phone: siteConfig.contact.whatsapp, text: kontextNachricht(pathname) });
          }}
          className={`${feld} bg-kalk text-tinte hover:bg-fliese active:bg-fuge focus-visible:outline-tinte`}
          aria-label="Nachricht per WhatsApp"
          data-motion="druck"
          data-leiste-feld="whatsapp"
        >
          <WhatsAppLogo className="size-5" />
          <span className="leiste-text">WhatsApp</span>
        </a>

        <Link
          href={hauptziel(pathname)}
          onClick={() => triggerHaptic("light")}
          className={`${feld} bg-tinte text-kalk hover:bg-tinte-2 active:bg-nacht-fuge focus-visible:outline-kalk`}
          aria-label="Termin vor Ort anfragen"
          data-hauptknopf=""
          data-erstes-bild="hauptknopf"
          data-motion="druck"
        >
          <Icon name="kalender" groesse={5} />
          <span className="leiste-text">Termin</span>
        </Link>
      </div>
    </aside>
  );
}
