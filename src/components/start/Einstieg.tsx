// Startseite · Einstieg „Planblatt“ (Fusion E-020): Komposition nach der Kern-Startseite der Relaunch-Sitzung
// (P3-09b/c, im Abschnittsgutachten vorn), im KERN v2 nachgebaut. Der erste Bildschirm ist ein Planblatt: oben die
// Kennzeile (Etikett links, Bewertung über der Zeichnung), links die H1, rechts der Verlegeplan Bad – an seiner Achse
// geschnitten. Die Schnittkante ist die rote Waage: Grundlinie der H1 und Oberkante des Formulars, das die Wände des
// Plans nach unten fortsetzt (wandEinzug). Das Lot steht im Plan auf der Mittelfuge.
// Raster ab lg: 12 Spalten ohne Zwischenraum, drei Zeilen (Kennzeile · H1 | Planhälfte · Text | Formular).
// Unter lg eine Spalte: Kennzeile, H1, Text, Knöpfe, Zusagen, Leitsatz, Plan vollständig (ohne Achse), Formular; die
// Achse steht als Lot an der Inhaltskante, der Text ist 16 px eingerückt.
// SIG-1 über das Register `sig-kreuzlinie` (Waage bzw. Lot wachsen beim Laden); H1 und Absatz (LCP) stehen ab dem ersten
// Bild. Wortlaut wie im Bestand („1. EINSTIEG“), Daten aus `@/config/company` und `@/config/reviews`.
import { useId, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import Knopf from '@/components/kern/Knopf';
import Verlegeplan, { wandEinzug } from '@/components/kern/Verlegeplan';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { etikettForm, seitenKlassen } from '@/components/kern/stile';

const PLAN = 'bad';
const TITEL_ZEILEN = ['Perfektion', 'auf jedem', 'Quadratmeter.'];
const ZUSAGEN = ['Kostenloses Aufmaß vor Ort', 'Staubschutzgarantie', 'Verbindlicher Festpreis'];

export default function Einstieg({ formular }: { formular?: ReactNode }) {
  const { contact, motto, owner } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;
  const titelId = `einstieg-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const wand = { '--wand': `${(wandEinzug(PLAN) * 100).toFixed(3)}%` } as CSSProperties;

  return (
    <section aria-labelledby={titelId} className="relative border-b border-fuge pt-24 pb-16 lg:pb-24">
      <div className={clsx(seitenKlassen, 'relative')}>
        {/* Lot unter lg: an der Inhaltskante über die volle Höhe des Einstiegs */}
        <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute inset-y-0 left-4 md:left-8 lg:hidden">
          <span className="kreuzlinie-lot" />
        </div>

        <div className="relative grid grid-cols-1 pl-4 lg:grid-cols-12 lg:pl-0">
          {/* Zeile 1 · Kennzeile des Blatts */}
          <p className={clsx(etikettForm, 'text-tinte lg:col-span-6 lg:row-start-1 lg:border-b lg:border-fuge lg:pr-8 lg:pb-3')}>
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            <span>Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel</span>
          </p>
          <p className={clsx(etikettForm, 'mt-2 text-tinte lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0 lg:border-b lg:border-fuge lg:pb-3')}>
            <Icon name="stern" groesse={4} className="shrink-0" />
            <span>
              {google.displayRating} ({google.count} Bewertungen)
            </span>
          </p>

          {/* Zeile 2 links · H1 steht auf der Waage */}
          <h1 id={titelId} className="mt-8 text-fs-7 text-tinte lg:col-span-6 lg:row-start-2 lg:mt-6 lg:self-end lg:pr-8 lg:pb-4">
            {TITEL_ZEILEN.map((zeile, i) => (
              <span key={zeile} className="block">
                {zeile}
                {i < TITEL_ZEILEN.length - 1 && ' '}
              </span>
            ))}
            <span className="mt-3 block font-text text-fs-5 font-semibold text-tinte-2 xl:text-fs-4">
              Fliesenverlegung &amp; Badsanierung aus Aßlar
            </span>
          </h1>

          {/* Zeile 3 links · Absatz, Knöpfe, Zusagen, Leitsatz */}
          <div className="mt-8 lg:col-span-6 lg:row-start-3 lg:mt-0 lg:flex lg:flex-col lg:pt-8 lg:pr-8">
            <p className="max-w-mass text-fs-4 text-tinte">
              Fugenarme XXL-Großformatfliesen, barrierefreie Walk-in-Duschen, repräsentative Wohnbereiche und frostsichere
              Terrassen – millimetergenau verlegt, normgerecht abgedichtet nach{' '}
              <span className="whitespace-nowrap font-mono text-fs-3">DIN 18534</span> und mit Staubschutzgarantie im bewohnten
              Zuhause.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full sm:w-auto">
                Aufmaß vor Ort anfragen
              </Knopf>
              <Knopf href={contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />} className="grow sm:grow-0">
                Per WhatsApp schreiben
              </Knopf>
              <Knopf
                href={`tel:${contact.phoneLink}`}
                variante="neben"
                iconLinks="telefon"
                aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`}
                className="grow sm:grow-0"
              >
                <span className="font-mono font-normal">{contact.phone}</span>
              </Knopf>
            </div>

            <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 lg:mb-12">
              {ZUSAGEN.map((zusage) => (
                <li key={zusage} className="flex items-center gap-2 text-fs-2 font-semibold text-tinte">
                  <Icon name="haken" groesse={5} className="shrink-0" />
                  {zusage}
                </li>
              ))}
            </ul>

            {/* ab lg unten bündig mit dem Formular: der Leitsatz schließt die Textspalte, statt darunter Leere zu lassen */}
            <figure className="mt-8 max-w-mass border-l-2 border-tinte pl-6 lg:mt-auto">
              <blockquote className="text-fs-3 text-tinte">&bdquo;{motto}&ldquo;</blockquote>
              <figcaption className="mt-2 font-mono text-fs-1 text-tinte-2">— {owner.fullName}, Inhaber</figcaption>
            </figure>
          </div>

          {/* Zeile 2 rechts · Verlegeplan: ab lg an der Achse geschnitten, darunter vollständig ohne Achse */}
          <div className="mt-12 w-3/4 md:w-1/2 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:mt-6 lg:w-auto lg:self-end">
            <div className="lg:hidden">
              <Verlegeplan plan={PLAN} ohneAchse />
            </div>
            <div className="hidden lg:block">
              <Verlegeplan plan={PLAN} schnitt />
            </div>
          </div>

          {/* Zeile 3 rechts · Formular unter der Schnittkante, Wand bis Wand */}
          {formular ? (
            <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:mt-0" style={wand}>
              <div className="planblatt-wand">{formular}</div>
            </div>
          ) : null}

          {/* Waage ab lg: Schnittkante des Plans über die ganze Breite des Blatts, liegt über der Oberkante des Formulars */}
          <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute inset-x-0 top-0 hidden lg:col-span-full lg:row-start-3 lg:block">
            <span className="kreuzlinie-waage" />
          </div>
        </div>
      </div>
    </section>
  );
}
