// Abschnitte der Seite `/standorte` nach dem Register (P4-08c, KERN v1.2 K-003, K-011). Wortlaut wörtlich aus
// `src/app/(bestand)/standorte/page.tsx` und den dort gerenderten Bausteinen; Telefon, Adresse, Öffnungszeiten und Karten-Link
// aus COMPANY_DATA (K-004), WhatsApp-Ziel wie im Bestand aus siteConfig (wa.me). Server-Komponenten.
// Jeder Abschnitt ist anders gebaut als sein Vorgänger:
//   Leistungen vor Ort – Fliese, Kopf seitlich (Sp. 1–5), Punkte zweispaltig nach Platz, Auftritt
//   Weitere Orte       – Kalk, ein Handlungsfeld 8/4 (Aussage links, Wege rechts untereinander)
//   Hauptstandort      – Kalk, Kopf oben, darunter Planfläche (Karte, Sp. 1–8) und Anschriftfeld (Sp. 9–12)
//   Ansprechpartner    – Fliese mit Blattkante in Tinte, Überschrift Sp. 1–7, Wege Sp. 8–12, Zusagen als Mono-Leiste
import { useId, type ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { siteConfig } from '@/lib/config';
import { Etikett, Feldraster, Fugenkreuz, Knopf, Rasterfeld, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import { Abschnitt, Handlungsfeld, Pfeillink, Punkte, UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';
import { REGIONEN } from './daten';

/** „Unsere Leistungen vor Ort“ (Bestand: weißer Streifen mit Haken-Liste aus `business.primaryServices`). */
export function LeistungenVorOrt() {
  return (
    <Abschnitt
      etikett="In allen Einsatzgebieten"
      titel="Unsere Leistungen vor Ort"
      titelId="leistungen-ueberall"
      kopfLage="seitlich"
      flaeche="fliese"
      dichte="normal"
      auftritt
    >
      <Punkte punkte={COMPANY_DATA.business.primaryServices} zeichen="kreuz" spalten={2} />
      <Pfeillink href="/leistungen" className="mt-k-6">
        Alle Leistungen im Überblick
      </Pfeillink>
    </Abschnitt>
  );
}

/** „Ihre Stadt ist nicht aufgeführt?“ (Bestand: zentrierte CTA-Box mit Anruf und Beratung). */
export function WeitereOrte() {
  const { contact } = COMPANY_DATA;
  return (
    <Abschnitt titelId="weitere-orte-titel" dichte="normal">
      <Handlungsfeld
        etikett="Weitere Orte auf Anfrage"
        titel="Ihre Stadt ist nicht aufgeführt?"
        titelId="weitere-orte-titel"
        text={`Wir sind unter anderem im ${REGIONEN.join(', ')} unterwegs. Rufen Sie uns einfach an – wir klären gern, ob wir Ihr Projekt an Ihrem Wohnort übernehmen können.`}
        knoepfe={[
          { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
          { text: 'Kostenlose Beratung anfragen', href: '/kontakt' },
        ]}
        anteil="8/4"
      />
    </Abschnitt>
  );
}

/**
 * „Unser Hauptstandort in Aßlar“ (Bestand: `InteractiveMap` mit schwebendem Info-Kasten über der Karte). Der Kasten steht im
 * Kern neben der Karte (mobil darunter) und verdeckt den Platzhalter-Knopf nicht mehr (Ausgangsstand: F-12 mobil `fixme`).
 * Name der `section` wie im Bestand über `aria-label`; die Überschrift bleibt h2, der Firmenname h4 (Bestand).
 * `karte`: Seite `StandortKarte`, Vorschau Platzhalter-Ansicht ohne Kartenaufruf.
 */
export function Hauptstandort({ karte }: { karte: ReactNode }) {
  const { legalName, headquarters } = COMPANY_DATA;
  return (
    <section aria-label="Anfahrt und Hauptsitz" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <header className="max-w-(--k-mass)">
          <Etikett kreuz>Firmensitz &amp; Anfahrt</Etikett>
          <h2 className={verbinde('mt-k-4 k-anzeige text-k-tinte', stufeNachWort('Unser Hauptstandort in Aßlar', 'abschnitt', 'text-k-6'), UMBRUCH)}>
            Unser Hauptstandort in Aßlar
          </h2>
          <p className="mt-k-5 k-text text-k-3 text-k-tinte-2">
            Von der {headquarters.street} in {headquarters.city} starten wir täglich zu unseren Projekten in Wetzlar, Gießen und ganz Hessen.
          </p>
        </header>
        <Feldraster className="mt-k-7">
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 8 }} innen="eng">
            {karte}
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 4 }} flaeche="fliese" className="flex flex-col gap-k-4 lg:justify-end">
            <h4 className={verbinde('k-anzeige text-k-4 text-k-tinte', UMBRUCH)}>{legalName}</h4>
            <p className="k-text text-k-3 text-k-tinte-2">
              {headquarters.street}
              <br />
              <span className="k-mono">{headquarters.postalCode}</span> {headquarters.city}
            </p>
            <Knopf
              href={headquarters.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              art="neben"
              className="w-full sm:w-fit"
              vorne={<Icon name="ort" groesse={20} />}
              hinten={<Icon name="extern" groesse={20} />}
            >
              Route planen
            </Knopf>
          </Rasterfeld>
        </Feldraster>
      </div>
    </section>
  );
}

/** Zusage in der Mono-Leiste des Ansprechpartners (Bestand: drei Zeilen mit Uhr, Zollstock, Schild). */
function Zusage({ zeichen, children }: { zeichen?: IconName; children: ReactNode }) {
  return (
    <li className="flex min-w-0 items-start gap-k-2 border-r border-b border-k-fuge px-k-4 py-k-3 k-mono text-k-1 text-k-tinte">
      <span aria-hidden="true" className="flex h-lh shrink-0 items-center text-k-tinte-2">
        {zeichen ? <Icon name={zeichen} groesse={16} /> : <Fugenkreuz className="size-k-3" />}
      </span>
      <span className={UMBRUCH}>{children}</span>
    </li>
  );
}

/**
 * Regionaler Ansprechpartner (Bestand `@/components/locations/LocationContact`, auf `/standorte` mit
 * `cityName="Mittelhessen & Lahn-Dill-Kreis"`). Wortlaut und Standardwert wie im Bestand; die Standortseiten (`[stadt]`)
 * nutzen dieselbe Komponente mit ihrem Ortsnamen (Vorschlag: nach `vorlagen/` ziehen, wenn W3 sie einsetzt).
 * Entfällt: HeartbeatCTA (Pulsieren ohne Registereintrag), Haptik, Verlauf und Punktmuster.
 */
export function Ansprechpartner({ ort = 'Aßlar & Wetzlar' }: { ort?: string }) {
  const titelId = `k-ansprechpartner${useId()}`;
  const titel = `Fliesenleger oder Badsanierung in ${ort} gesucht?`;
  const { contact, hours } = COMPANY_DATA;
  return (
    <section aria-labelledby={titelId} className="border-t border-k-tinte bg-k-fliese py-k-8 lg:py-k-9">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="grid grid-cols-1 gap-k-6 lg:grid-cols-12 lg:gap-0">
          <div className="min-w-0 lg:col-span-7 lg:pr-k-7">
            <Etikett rahmen kreuz ton="tinte">
              Ihr regionaler Ansprechpartner für {ort}
            </Etikett>
            <h2 id={titelId} className={verbinde('mt-k-5 k-anzeige text-k-tinte', stufeNachWort(titel, 'handlung', 'text-k-6'), UMBRUCH)}>
              {titel}
            </h2>
            <p className="mt-k-5 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">
              Fachbetriebsleiter Deniz Tezgel berät Sie in {ort} persönlich und unverbindlich. Vereinbaren Sie direkt Ihr kostenfreies Aufmaß vor Ort.
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-k-3 lg:col-span-5 lg:justify-end">
            <Knopf href={`tel:${contact.phoneLink}`} groesse="gross" breit vorne={<Icon name="telefon" groesse={20} />}>
              <span className="k-mono font-normal">{contact.phone}</span>
            </Knopf>
            <Knopf
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              art="neben"
              groesse="gross"
              breit
              vorne={<Icon name="whatsapp" groesse={20} />}
            >
              WhatsApp Chat
            </Knopf>
          </div>
        </div>
        <ul className="mt-k-7 grid grid-cols-1 border-t border-l border-k-fuge sm:grid-cols-3">
          <Zusage zeichen="uhr">{hours.formattedWeekdays}</Zusage>
          <Zusage zeichen="aufmass">Vor-Ort-Aufmaß kostenfrei</Zusage>
          <Zusage>Verbindlicher Festpreis</Zusage>
        </ul>
      </div>
    </section>
  );
}
