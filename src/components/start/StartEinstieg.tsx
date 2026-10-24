// Startseite · 1 Worum es geht (KERN v3 K-006, K-009; Text _werkstatt/texte/REF-start.md): erster Bildschirm.
// Links bündig an der Laserlinie (Leitachse der Seite): H1, Ort, Vorspann, Hauptknopf zum Formular #termin, Anruf und
// WhatsApp; rechts (ab lg) bzw. darunter das Startbild, eine echte Dusche ohne Stufe (Bildplatz start-dusche, einziges
// preload), das sich beim Laden freilegt (großer Moment `startbild`, Startbild.tsx). Darunter die Kennzeile der Bewertungen aus RATING_SUMMARY in zwei Elementen mit Trennzeichen im Text.
// Die fünf Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf). Serverkomponente.
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Rufnummer from '@/components/kern/Rufnummer';
import { zusammen } from '@/components/kern/zusammen';
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
      <span className="font-semibold text-tinte">{zusammen(`${g.displayRating} von ${g.maxRating} Sternen`)}</span>
      {/* der Mittelpunkt hängt per geschütztem Leerzeichen am Folgewort, nie allein am Zeilenende (Sichtabnahme E2, Befund 14) */}
      <span aria-hidden="true"> ·{'\u00a0'}</span>
      <span className="sr-only">, </span>
      {/* Zahl und Nomen bleiben beisammen (Runde 4) */}
      {zusammen(`${g.count} Bewertungen bei Google`)}
      {stand && (
        <>
          <span aria-hidden="true"> ·{'\u00a0'}</span>
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
      {/* flaches Querformat (q844): weniger Luft oben, H1 eine Stufe kleiner, ohne Firmensitz-Zeile, damit Hauptknopf und Telefon
          im ersten Bildschirm stehen (Sichtabnahme E2, Befund 11) */}
      <div className={`${seitenKlassen} grid grid-cols-4 gap-y-12 pt-24 pb-16 flach:pt-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12 lg:pt-32 lg:pb-24`}>
        {/* Container: unter 20 rem Spaltenbreite (nur bei großer Systemschrift, P1 mit 200 %) entfällt die Firmensitz-Zeile und
            die H1 steht eine Stufe kleiner (fs-6 und fs-7 treffen dort beide ihr Minimum), damit mehr vom Einstieg im Bild ist */}
        <div className="@container relative col-span-4 md:col-span-8 lg:col-span-7 lg:self-center">
          {/* Laserlinie im ersten Bildschirm (Sichtabnahme E2, Befund 5; E-036): rotes Stück der Leitachse neben der ganzen
              Textspalte, oben ein Fugenkreuz als Anschlag mit dem Firmensitz in Mono (Achse: Seitenrand 16/32/48 px, Lot bei
              8/16/32 px, also 8 bzw. 16 px vor der Textkante) */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-2 -translate-x-1/4 border-l-2 border-laser md:-left-4" />
          <Fugenkreuz className="pointer-events-none absolute top-1 -left-2 size-3 -translate-x-1/2 text-tinte md:-left-4" />
          <p className="font-mono text-fs-1 text-tinte-2 flach:hidden @max-xs:hidden">Firmensitz Aßlar</p>
          <h1 id="start-titel" data-erstes-bild="ueberschrift" className="mt-4 text-fs-7 text-balance text-tinte flach:mt-0 flach:text-fs-6 @max-xs:mt-0 @max-xs:text-fs-5">
            Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.
          </h1>
          {/* balance: keine Schusterzeile („Orte rundherum.“ allein, Sichtabnahme E2, Befund 14) */}
          <p data-erstes-bild="ort" className="mt-6 font-text text-fs-4 text-balance text-tinte flach:mt-4">
            Fliesenleger Deniz Tezgel aus Aßlar, für Wetzlar und die Orte rundherum.
          </p>
          {/* unter xl folgen Hauptknopf und Telefon direkt auf Überschrift und Ort, der Vorspann danach (K-006; bei großer
              Systemschrift stand der Knopf sonst erst nach fast zwei Bildschirmen; auf t1024 lagen die Knöpfe an der Falz,
              Sichtabnahme E2, Befund 10) */}
          <div className="flex flex-col">
            <p className="mt-4 max-w-mass font-text text-fs-3 text-pretty text-tinte-2 max-xl:order-1 max-xl:mt-8">
              Deniz Tezgel kommt selbst zu Ihnen, schaut sich alles an und sagt Ihnen, was zu tun ist. Danach verlegt er mit
              seinem Team Fliese für Fliese.
            </p>
            <div className="mt-8 flex flex-col gap-3 flach:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
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
                    {/* inline-block: reicht der Platz nicht, rückt die ganze Nummer unter „Anrufen:“, statt nach „06441 /“ zu
                        brechen (Sichtabnahme E2, Befund 9) */}
                    Anrufen: <Rufnummer nummer={contact.phone} className="inline-block" />
                  </span>
                </a>
                <a
                  href={buildWhatsAppUrl(contact.whatsappNumber, kontextNachricht('/'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-motion="druck"
                  // unter lg trägt die untere Leiste WhatsApp, unter xl der Kopf (weniger doppelte Bedienflächen, Sichtprüfung E2;
                  // auf t1024 brach der Knopf um, Sichtabnahme E2, Befund 10)
                  className={knopfKlassen('neben', 'px-4 max-xl:hidden')}
                >
                  <WhatsAppLogo className="size-5 shrink-0" />
                  <span>Nachricht per WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* md: rechtsbündig an der Textkante, um zwei von acht Spalten eingerückt (kein Rest rechts, Runde 3); ab lg wie die
            Textspalte mittig, damit unter dem Foto kein Loch bleibt (Sichtabnahme E2, Befund 6) */}
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:self-center">
          <Startbild sizes="(min-width: 1024px) 40vw, (min-width: 768px) 75vw, 100vw" />
          <Bewertungszeile className="mt-4 font-text text-fs-2 text-tinte-2 hyphens-none" />
        </div>
      </div>
    </section>
  );
}
