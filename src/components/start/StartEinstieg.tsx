// Startseite · 1 Worum es geht (KERN v3 K-006, K-009; Text _werkstatt/texte/REF-start.md): erster Bildschirm.
// Links bündig an der Laserlinie (Leitachse der Seite): H1, Ort, Vorspann, Hauptknopf zum Formular #termin, Anruf und
// WhatsApp; rechts (ab lg) bzw. darunter das Startbild, eine echte Dusche ohne Stufe (Bildplatz start-dusche, einziges
// preload), das sich beim Laden freilegt (großer Moment `startbild`, Startbild.tsx). Darunter die Kennzeile der Bewertungen aus RATING_SUMMARY in zwei Elementen mit Trennzeichen im Text.
// Die fünf Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf). Serverkomponente.
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Rufnummer from '@/components/kern/Rufnummer';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';
import Startbild from './Startbild';

export function Bewertungszeile({ stand = false, className }: { stand?: boolean; className?: string }) {
  const g = RATING_SUMMARY.google;
  return (
    <p className={className}>
      <span className="inline-flex items-center gap-1 align-middle text-tinte" aria-hidden="true">
        {Array.from({ length: g.maxRating }, (_, i) => (
          <Icon key={i} name="stern-voll" groesse={4} />
        ))}
      </span>{' '}
      <span className="font-semibold text-tinte">
        {g.displayRating} von {g.maxRating} Sternen
      </span>
      <span aria-hidden="true"> · </span>
      <span className="sr-only">, </span>
      <span>{g.count} Bewertungen bei Google</span>
      {stand && (
        <>
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          <span>Stand {RATING_SUMMARY.asOf}</span>
        </>
      )}
    </p>
  );
}

export default function StartEinstieg() {
  const { contact } = COMPANY_DATA;
  return (
    <section aria-labelledby="start-titel" data-formel="worum" className="relative">
      {/* oben Platz für den festen Kopf (64 px, wie der Baustein Einstieg) */}
      <div className={`${seitenKlassen} grid grid-cols-4 gap-y-12 pt-24 pb-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12 lg:pt-32 lg:pb-24`}>
        <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:self-center">
          <h1 id="start-titel" data-erstes-bild="ueberschrift" className="text-fs-7 text-balance text-tinte">
            Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.
          </h1>
          <p data-erstes-bild="ort" className="mt-6 font-text text-fs-4 text-tinte">
            Fliesenleger Deniz Tezgel aus Aßlar, für Wetzlar und die Orte rundherum.
          </p>
          {/* mobil folgen Hauptknopf und Telefon direkt auf Überschrift und Ort, der Vorspann danach (K-006; bei großer
              Systemschrift stand der Knopf sonst erst nach fast zwei Bildschirmen) */}
          <div className="flex flex-col">
            <p className="mt-4 max-w-mass font-text text-fs-3 text-pretty text-tinte-2 max-sm:order-1 max-sm:mt-8">
              Deniz Tezgel kommt selbst zu Ihnen, schaut sich alles an und sagt Ihnen, was zu tun ist. Danach verlegt er mit
              seinem Team Fliese für Fliese.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Hauptknopf href="#termin" erstesBild breit />
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${contact.phoneLink}`}
                  data-erstes-bild="kontakt"
                  data-motion="druck"
                  className={knopfKlassen('neben', 'w-full px-4 sm:w-auto')}
                >
                  <Icon name="telefon" groesse={5} className="shrink-0" />
                  <span className="min-w-0">
                    Anrufen: <Rufnummer nummer={contact.phone} />
                  </span>
                </a>
                <a
                  href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht('/'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-motion="druck"
                  // unter lg trägt die untere Leiste WhatsApp (weniger doppelte Bedienflächen, Sichtprüfung E2)
                  className={knopfKlassen('neben', 'px-4 max-lg:hidden')}
                >
                  <WhatsAppLogo className="size-5 shrink-0" />
                  <span>Nachricht per WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
          <Startbild sizes="(min-width: 1024px) 40vw, (min-width: 768px) 75vw, 100vw" />
          <Bewertungszeile className="mt-4 font-text text-fs-2 text-tinte-2" />
        </div>
      </div>
    </section>
  );
}
