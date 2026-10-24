// Vorlage „Ortsseite“ (KERN v3 K-009 Seitenformel, E3-ORCH-01c, E-024, E-025): `/standorte/[stadt]` aus `ortsInhalt()`
// (`src/inhalte/orte.ts`). Gleiche Folge und Bausteine wie die Erzählseite. Im Einstieg steht rechts statt eines Fotos die
// gezeichnete Karte (Slot, Aßlar in der Mitte, der Ort markiert; ohne Karte bleibt die Spalte leer), denn Fotos aus dem Ort
// gibt es nicht (K-015). Der nächste Schritt trägt die vorhandene Schnellanfrage der Ortsseiten (F-09, Slot `formular`,
// Pflichtfelder und Zusage unverändert) unter der Kennung `anfrage`, links Satz, Rufnummer, WhatsApp und die
// Nachbarorte. Alle Hauptknöpfe der Seite führen zu `#anfrage` (K-004, `hauptziel` in navigation.js). Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Abschnitt from '@/components/kern/Abschnitt';
import Leitachse from '@/components/kern/Leitachse';
import Rufnummer from '@/components/kern/Rufnummer';
import Seitenformel from '@/components/kern/Seitenformel';
import Textmarken from '@/components/kern/Textmarken';
import { linkKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import type { Ortsinhalt } from '@/inhalte/orte';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';
import type { Verweis } from './inhalt';
import Einstieg from './teile/Einstieg';
import Lage from './teile/Lage';
import Tun from './teile/Tun';
import Ablauf from './teile/Ablauf';
import Beleg from './teile/Beleg';

export const ORT_ANKER = 'anfrage';

export interface OrtsSeiteProps {
  inhalt: Ortsinhalt;
  /** Schnellanfrage der Ortsseiten (LeadQuickForm, F-09) */
  formular: ReactNode;
  /** nächstgelegene Orte (vorhandene Logik der Ortsseite) */
  nachbarn: Verweis[];
  /** gezeichnete Karte im Einstieg (großer Moment `karte`) */
  karte?: ReactNode;
}

function OrtSchritt({ inhalt, formular, nachbarn }: Pick<OrtsSeiteProps, 'inhalt' | 'formular' | 'nachbarn'>) {
  const { contact } = COMPANY_DATA;
  return (
    <Abschnitt
      titelId={ORT_ANKER}
      formel="schritt"
      leitachse
      flaeche="fliese"
      kopf="seitlich"
      titel={inhalt.schritt.titel}
      einleitung={<p><Textmarken text={inhalt.schritt.satz} /></p>}
      unterKopf={
        <div className="grid gap-6 border-t border-fuge pt-6 md:grid-cols-2 lg:mt-4 lg:grid-cols-1">
          <div className="md:col-span-2 lg:col-span-1">
            <p className="font-text text-fs-3 text-tinte">Lieber anrufen?</p>
            <a
              href={`tel:${contact.phoneLink}`}
              data-motion="zustand"
              aria-label={`Anrufen: ${contact.phone}`}
              className={`${linkKlassen} mt-2 inline-flex min-h-11 items-center gap-3 text-fs-5 text-tinte lg:text-fs-4`}
            >
              <Icon name="telefon" groesse={6} className="shrink-0" />
              <Rufnummer nummer={contact.phone} />
            </a>
          </div>
          <div>
            <p className="font-text text-fs-3 text-tinte">Lieber schreiben?</p>
            <a
              href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht(inhalt.pfad))}
              target="_blank"
              rel="noopener noreferrer"
              data-motion="zustand"
              className={`${linkKlassen} mt-1 inline-flex min-h-11 items-center gap-2 font-text text-fs-3`}
            >
              <WhatsAppLogo className="size-5 shrink-0" />
              Nachricht per WhatsApp
            </a>
          </div>
          {nachbarn.length > 0 && (
            <div>
              <h3 className="font-text text-fs-3 font-semibold text-tinte">Wir arbeiten auch in:</h3>
              <ul className="mt-2 flex flex-wrap gap-x-4">
                {nachbarn.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} data-motion="zustand" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center font-text text-fs-3 hyphens-none')}>
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }
    >
      {formular}
    </Abschnitt>
  );
}

export default function OrtsSeite({ inhalt, formular, nachbarn, karte }: OrtsSeiteProps) {
  const { worum } = inhalt;
  return (
    <Seitenformel>
      <Leitachse>
        <Einstieg pfad={inhalt.pfad} brotkrumen={worum.brotkrumen} titel={worum.titel} ort={worum.ort} vorspann={worum.vorspann} bild={karte} hauptziel={`#${ORT_ANKER}`} />
        <Lage inhalt={inhalt.lage} />
        <Tun inhalt={inhalt.tun} />
        <Ablauf inhalt={inhalt.ablauf} />
        <Beleg inhalt={inhalt.beleg} />
        <OrtSchritt inhalt={inhalt} formular={formular} nachbarn={nachbarn} />
      </Leitachse>
    </Seitenformel>
  );
}
