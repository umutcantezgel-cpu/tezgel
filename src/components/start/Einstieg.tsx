// Startseite · Einstieg „Planblatt“ (Fusion E-020): Komposition nach der Kern-Startseite der Relaunch-Sitzung
// (P3-09b/c, im Abschnittsgutachten vorn), im KERN v2 nachgebaut. Der erste Bildschirm ist ein Planblatt: oben die
// Kennzeile (Etikett links, Bewertung über der Zeichnung), links die H1, rechts der Verlegeplan Bad – an seiner Achse
// geschnitten. Die Schnittkante ist die rote Waage: Grundlinie der H1 und Oberkante des Formulars, das die Wände des
// Plans nach unten fortsetzt (wandEinzug). Das Lot steht im Plan auf der Mittelfuge.
// Raster ab lg: 12 Spalten ohne Zwischenraum, drei Zeilen (Kennzeile · H1 | Planhälfte · Text | Formular).
// Unter lg eine Spalte: Kennzeile, H1, Text, Knöpfe, Zusagen, Leitsatz, Plan vollständig (ohne Achse, Wand an der
// Textkante), Formular; die Achse steht als Lot im Seitenrand vor der Inhaltskante (ACHSE_LAGE), der Text an der Kante.
// SIG-1 über das Register `sig-kreuzlinie` und `sig-flucht` (E3-NACH-02): ab lg wachsen Waage und Plan-Lot aus dem
// Kreuzpunkt, am linken Ende knickt die Waage ins Lot zur Leitachse; unter lg wächst das Lot; die H1-Zeilen rücken
// 12 px in die Flucht. Absatz (LCP) steht ab dem ersten Bild. Wortlaut wie im Bestand („1. EINSTIEG“), Daten aus `@/config/company` und `@/config/reviews`.
import { useId, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import Knopf from '@/components/kern/Knopf';
import Verlegeplan, { wandEinzug } from '@/components/kern/Verlegeplan';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { ACHSE_LAGE } from '@/components/kern/Leitachse';
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
  const einzug = wandEinzug(PLAN);
  const wand = { '--wand': `${(einzug * 100).toFixed(3)}%` } as CSSProperties;
  // unter lg: Plan ohne Bemaßung (schmaler Rand), damit die Zeichnung beim Herausrücken nicht über den Bildschirm ragt
  const einzugMobil = wandEinzug(PLAN, false);
  const wandAussen = { '--wand-aussen': `${((einzugMobil / (1 - 2 * einzugMobil)) * 100).toFixed(3)}%` } as CSSProperties;

  return (
    <section aria-labelledby={titelId} className="relative border-b border-fuge pt-24 pb-16 lg:pb-24">
      <div className={clsx(seitenKlassen, 'relative')}>
        {/* Lot unter lg: im Seitenrand vor der Inhaltskante (ACHSE_LAGE wie die Leitachse darunter), volle Höhe */}
        {/* Unter lg: Grundschicht in Fuge über die ganze Höhe des Einstiegs, das rote Lot wächst nur über den ersten Bildschirm –
            sonst wäre der sichtbare Teil nach einem Viertel der Dauer fertig (Rückgabe E4-NACH-18, E3-SICHT-ERZ Befund 10) */}
        <div aria-hidden="true" data-motion="sig-kreuzlinie" className={clsx('pointer-events-none absolute inset-y-0 lg:hidden', ACHSE_LAGE)}>
          <span className="kreuzlinie-grund" />
          <span className="kreuzlinie-lot kreuzlinie-lot-bildschirm" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12">
          {/* Zeile 1 · Kennzeile des Blatts */}
          {/* unter sm darf die lange Kennzeile umbrechen: Marke an der ersten Zeile, Text bündig (E4-NACH-01) */}
          <p className={clsx(etikettForm, 'items-start text-tinte sm:items-center lg:col-span-6 lg:row-start-1 lg:border-b lg:border-fuge lg:pr-8 lg:pb-3')}>
            <Fugenkreuz className="mt-1 size-3 shrink-0 text-strich sm:mt-0" />
            <span>Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel</span>
          </p>
          <p className={clsx(etikettForm, 'mt-2 text-tinte lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0 lg:border-b lg:border-fuge lg:pb-3')}>
            <Icon name="stern" groesse={4} className="shrink-0" />
            <span>
              {google.displayRating} ({google.count} Bewertungen)
            </span>
          </p>

          {/* Zeile 2 links · H1 steht auf der Waage */}
          <h1 id={titelId} data-motion="sig-flucht" className="mt-8 text-fs-7 text-tinte lg:col-span-6 lg:row-start-2 lg:mt-6 lg:self-end lg:pr-8 lg:pb-4">
            {TITEL_ZEILEN.map((zeile, i) => (
              <span key={zeile} className="block">
                {zeile}
                {i < TITEL_ZEILEN.length - 1 && ' '}
              </span>
            ))}
            <span className="mt-3 block font-text text-fs-4 font-semibold text-tinte-2 lg:text-fs-5 xl:text-fs-4">
              Fliesenverlegung &amp; Badsanierung aus Aßlar
            </span>
          </h1>

          {/* Zeile 3 links · Absatz, Knöpfe, Zusagen, Leitsatz – ab lg klebend neben dem höheren Formular (E3-NACH-01),
              damit beim Scrollen keine leere Spalte neben dem Formular steht */}
          <div className="mt-8 lg:sticky lg:top-24 lg:col-span-6 lg:row-start-3 lg:mt-0 lg:self-start lg:pt-8 lg:pr-8">
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

            <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {ZUSAGEN.map((zusage) => (
                <li key={zusage} className="flex items-center gap-2 text-fs-2 font-semibold text-tinte">
                  <Icon name="haken" groesse={5} className="shrink-0" />
                  {zusage}
                </li>
              ))}
            </ul>

            <figure className="mt-8 max-w-mass border-l-2 border-tinte pl-6 lg:mt-12">
              <blockquote className="text-fs-3 text-tinte">&bdquo;{motto}&ldquo;</blockquote>
              <figcaption className="mt-2 font-mono text-fs-1 text-tinte-2">— {owner.fullName}, Inhaber</figcaption>
            </figure>
          </div>

          {/* Zeile 2 rechts · Verlegeplan: ab lg an der Achse geschnitten, darunter vollständig ohne Achse */}
          <div className="mt-12 md:w-3/4 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:mt-6 lg:w-auto lg:self-end">
            {/* unter lg auf Spaltenbreite, die Wand fluchtet mit der Textkante */}
            <div className="plan-buendig lg:hidden" style={wandAussen}>
              <Verlegeplan plan={PLAN} ohneAchse bemassung={false} />
            </div>
            {/* das Lot des Plans wächst mit der Waage aus dem Kreuzpunkt an der Schnittkante */}
            <div data-motion="sig-kreuzlinie" className="hidden lg:block">
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
          <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute -left-4 right-0 top-0 hidden lg:col-span-full lg:row-start-3 lg:block">
            <span className="kreuzlinie-waage kreuzlinie-aus-plan" />
          </div>
          {/* ab lg: Am linken Ende knickt die Waage ins Lot und läuft bis zum Fuß des Einstiegs – dort übernimmt die
              Leitachse der Seite (gleiche Lage, ACHSE_LAGE lg:left-8 = Inhaltskante − 16 px) */}
          <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute -bottom-24 -left-4 top-0 hidden lg:col-start-1 lg:row-start-3 lg:block">
            <span className="kreuzlinie-lot kreuzlinie-nach-waage" />
          </div>
        </div>
      </div>
    </section>
  );
}
