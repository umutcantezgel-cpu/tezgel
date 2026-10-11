// Regionaler Ansprechpartner auf `/kontakt` (P4-08f, KERN v1.2 K-003, K-011): Kern-Fassung von
// `@/components/locations/LocationContact` mit `cityName="Aßlar, Wetzlar & Mittelhessen"`.
// Gestalt: Fliese mit Blattkante in Tinte, ein Feldraster mit drei Feldern nebeneinander (ab lg 5 | 4 | 3):
// Aussage (Etikett, h2, Satz) · Wege (Anruf als Hauptknopf mit Nummer in Mono, WhatsApp) · Zusagen in Mono mit Zeichen.
// Anders gebaut als der Standort-Abschnitt davor (Kopf über Register und Karte) und der Termin-Abschnitt danach.
// Wortlaut und Standardwert wie im Bestand; Öffnungszeit aus `COMPANY_DATA.hours.formattedWeekdays` (= Bestandswert aus
// `siteConfig.openingHours.store`). Der Widerspruch zu „Fr: 07:30 – 17:00 Uhr“ im Kontaktblatt bleibt stehen (gemeldet).
// Entfällt: HeartbeatCTA (Pulsieren ohne Registereintrag), Haptik, Verlauf und Punktmuster. Server-Komponente.
import { useId, type ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { siteConfig } from '@/lib/config';
import { Etikett, Feldraster, Knopf, Rasterfeld, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import type { IconName } from '@/components/kern/icons/geometrie';
import { UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';

function Zusage({ zeichen, children }: { zeichen: IconName; children: ReactNode }) {
  return (
    <li className="flex min-w-0 items-start gap-k-3 border-b border-k-fuge py-k-3 k-mono text-k-1 text-k-tinte first:border-t">
      <span aria-hidden="true" className="flex h-lh shrink-0 items-center text-k-tinte-2">
        <Icon name={zeichen} groesse={16} />
      </span>
      <span className={UMBRUCH}>{children}</span>
    </li>
  );
}

export default function Ansprechpartner({ ort = 'Aßlar & Wetzlar' }: { ort?: string }) {
  const titelId = `k-ansprechpartner${useId()}`;
  const titel = `Fliesenleger oder Badsanierung in ${ort} gesucht?`;
  const { contact, hours, owner } = COMPANY_DATA;
  return (
    <section aria-labelledby={titelId} className="border-t-2 border-k-tinte bg-k-fliese py-k-7 lg:py-k-8">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <Feldraster>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 5 }} className="flex flex-col">
            <Etikett rahmen kreuz ton="tinte">
              Ihr regionaler Ansprechpartner für {ort}
            </Etikett>
            <h2 id={titelId} className={verbinde('mt-k-5 k-anzeige text-k-tinte', stufeNachWort(titel, 'feld', 'text-k-5'), UMBRUCH)}>
              {titel}
            </h2>
            <p className="mt-k-4 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">
              Fachbetriebsleiter {owner.fullName} berät Sie in {ort} persönlich und unverbindlich. Vereinbaren Sie direkt Ihr kostenfreies Aufmaß vor Ort.
            </p>
          </Rasterfeld>

          <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 4 }} flaeche="kalk" className="flex flex-col justify-center gap-k-3">
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
          </Rasterfeld>

          <Rasterfeld breite={{ mobil: 4, tablett: 4, desktop: 3 }} className="flex flex-col justify-center">
            <ul>
              <Zusage zeichen="uhr">{hours.formattedWeekdays}</Zusage>
              <Zusage zeichen="aufmass">Vor-Ort-Aufmaß kostenfrei</Zusage>
              <Zusage zeichen="haken">Verbindlicher Festpreis</Zusage>
            </ul>
          </Rasterfeld>
        </Feldraster>
      </div>
    </section>
  );
}
