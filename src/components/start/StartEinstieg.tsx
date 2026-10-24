// Startseite · 1 Worum es geht (KERN v3 K-006, K-009; Text _werkstatt/texte/REF-start.md; E-037): erster Bildschirm als
// Planblatt wie im alten Stand, mit den Texten des neuen. Links H1 (vier feste Zeilen, rücken in die Flucht: sig-flucht), Ort,
// Hauptknopf zum Formular #termin, Anruf, ab xl WhatsApp, Vorspann; rechts der Verlegeplan Bad, an seiner Achse geschnitten.
// Die Schnittkante ist die rote Waage über die ganze Breite; sie wächst mit dem Lot des Plans aus dem Kreuzpunkt und knickt
// links ins Lot zur Leitachse (sig-kreuzlinie, gesamt 1,52 s). Unter der Waage steht das Startfoto zwischen den Wänden des
// Plans (planblatt-wand), es legt sich frei, sobald es im Blick ist (großer Moment startbild). Mobil eine Spalte: Text, dann
// der ganze Plan (rückt beim Eintritt in die Flucht), dann das Foto; das Lot wächst im Seitenrand neben dem Text.
// Die fünf Pflichtelemente des ersten Bildschirms tragen data-erstes-bild (Logo im Kopf). Serverkomponente.
import type { CSSProperties } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Hauptknopf from '@/components/kern/Hauptknopf';
import Verlegeplan, { wandEinzug } from '@/components/kern/Verlegeplan';
import Rufnummer from '@/components/kern/Rufnummer';
import { zusammen } from '@/components/kern/zusammen';
import { knopfKlassen, seitenKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import { buildWhatsAppUrl, kontextNachricht } from '@/lib/whatsapp';
import Startbild from './Startbild';

/** `geteilt`: Ist die Zeile schmaler als 28rem, steht die Zahl der Bewertungen in einer eigenen Zeile ohne Mittelpunkt (oben
 *  rechts im Planblatt, E-037), statt dass der Mittelpunkt eine neue Zeile beginnt. */
export function Bewertungszeile({ stand = false, geteilt = false, className }: { stand?: boolean; geteilt?: boolean; className?: string }) {
  const g = RATING_SUMMARY.google;
  return (
    <p className={clsx(geteilt && '@container', className)}>
      <span className="inline-flex items-center gap-1 align-middle text-tinte" aria-hidden="true">
        {Array.from({ length: g.maxRating }, (_, i) => (
          <Icon key={i} name="stern-voll" groesse={4} />
        ))}
      </span>{' '}
      <span className="font-semibold text-tinte">{zusammen(`${g.displayRating} von ${g.maxRating} Sternen`)}</span>
      {/* der Mittelpunkt hängt per geschütztem Leerzeichen am Folgewort, nie allein am Zeilenende (Sichtabnahme E2, Befund 14) */}
      <span aria-hidden="true" className={clsx(geteilt && '@max-md:hidden')}> ·{'\u00a0'}</span>
      <span className="sr-only">, </span>
      {/* Zahl und Nomen bleiben beisammen (Runde 4) */}
      <span className={clsx(geteilt && '@max-md:block')}>{zusammen(`${g.count} Bewertungen bei Google`)}</span>
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

// Plan des Einstiegs (wie im alten Stand) und die H1 in festen Zeilen (Wortlaut REF-start, höchstens 15 Zeichen je Zeile,
// damit keine Zeile in fs-7 ab lg umbricht; die Zeilen sind Block-Kinder, sonst wirkt die Flucht nicht)
const PLAN = 'bad';
const TITEL_ZEILEN = ['Wir verlegen', 'Fliesen in Bad,', 'Küche, Flur und', 'auf dem Balkon.'];

export default function StartEinstieg() {
  const { contact } = COMPANY_DATA;
  // ab lg setzt das Foto die Wände des geschnittenen Plans nach unten fort; mobil steht der ganze Plan bündig mit der Textkante
  const wand = { '--wand': `${(wandEinzug(PLAN) * 100).toFixed(3)}%` } as CSSProperties;
  const rand = wandEinzug(PLAN, false);
  const wandAussen = { '--wand-aussen': `${((rand / (1 - 2 * rand)) * 100).toFixed(3)}%` } as CSSProperties;
  return (
    <section aria-labelledby="start-titel" data-formel="worum" className="relative">
      {/* oben Platz für den festen Kopf (64 px, wie der Baustein Einstieg). Ab lg zwei Zeilen ohne Abstand: oben H1 und Plan
          (Schnittkante auf der Waage), unten Text und Foto. Flaches Querformat (q844): weniger Luft oben, H1 eine Stufe kleiner,
          ohne Firmensitz-Zeile, damit Hauptknopf und Telefon im ersten Bildschirm stehen (Sichtabnahme E2, Befund 11) */}
      <div className={`${seitenKlassen} relative grid grid-cols-4 gap-y-12 pt-24 pb-16 flach:pt-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 lg:pt-32 lg:pb-24`}>
        {/* Textspalte: mobil ein Block (Abstände wie gesetzt, kein Rasterabstand zwischen H1 und Ort), ab lg zwei Rasterzellen */}
        <div className="relative col-span-4 md:col-span-8 lg:contents">
          {/* mobil: das rote Lot wächst im Seitenrand neben dem Text (Achse 8 bzw. 16 px vor der Textkante, ACHSE_LAGE) */}
          <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute inset-y-0 -left-2 md:-left-4 lg:hidden">
            <span className="kreuzlinie-lot" />
          </div>
          {/* Container: unter 20 rem Spaltenbreite (nur bei großer Systemschrift, P1 mit 200 %) entfällt die Firmensitz-Zeile, die
              H1 steht eine Stufe kleiner und fließt als ein Satz (fs-6 und fs-7 treffen dort beide ihr Minimum) */}
          <div className="@container relative lg:col-span-6 lg:row-start-1 lg:self-start lg:pb-4">
            {/* Fugenkreuz als Anschlag auf der Achse, mit dem Firmensitz in Mono (Oberkante der H1 = pt-32 + diese Zeile + mt-4:
                daran richtet das Intro seine Reihen aus, bewegung.css html.k-intro-start) */}
            <Fugenkreuz className="pointer-events-none absolute top-1 -left-2 size-3 -translate-x-1/2 text-tinte md:-left-4" />
            <p className="font-mono text-fs-1 text-tinte-2 flach:hidden @max-xs:hidden">Firmensitz Aßlar</p>
            <h1 id="start-titel" data-erstes-bild="ueberschrift" data-motion="sig-flucht" className="mt-4 text-fs-7 text-tinte flach:mt-0 flach:text-fs-6 @max-xs:mt-0 @max-xs:text-fs-5">
              {TITEL_ZEILEN.map((zeile, i) => (
                <span key={zeile} className="block flach:inline @max-xs:inline">
                  {zeile}
                  {i < TITEL_ZEILEN.length - 1 && ' '}
                </span>
              ))}
            </h1>
          </div>
          {/* ab lg klebt der Text unter der Waage, damit neben dem höheren Foto keine leere Spalte steht (wie im alten Stand) */}
          <div className="lg:sticky lg:top-24 lg:col-span-6 lg:row-start-2 lg:self-start lg:pt-8">
            {/* balance: keine Schusterzeile („Orte rundherum.“ allein, Sichtabnahme E2, Befund 14) */}
            <p data-erstes-bild="ort" className="mt-6 font-text text-fs-4 text-balance text-tinte flach:mt-4 lg:mt-0">
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
        </div>
        {/* Plan: ab lg rechts oben, an der Achse geschnitten, die Schnittkante liegt auf der Waage; das Lot des Plans wächst mit
            der Waage aus dem Kreuzpunkt, die Fugen rücken beim Laden in die Flucht. Mobil der ganze Plan ohne Achse, bündig
            mit der Textkante, er rückt beim Eintritt in die Flucht (sig-plan zeigen) */}
        <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end">
          <div className="plan-buendig lg:hidden" style={wandAussen}>
            <Verlegeplan plan={PLAN} ohneAchse bemassung={false} flucht="zeigen" />
          </div>
          <div data-motion="sig-kreuzlinie" className="hidden lg:block">
            <Verlegeplan plan={PLAN} schnitt flucht="laden" />
          </div>
        </div>
        {/* Foto unter der Waage, ab lg von Wand zu Wand des Plans; md rechtsbündig an der Textkante (Runde 3) */}
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-7 lg:row-start-2" style={wand}>
          <div className="planblatt-wand lg:pt-8">
            <Startbild sizes="(min-width: 1312px) 520px, (min-width: 1024px) 40vw, (min-width: 768px) 75vw, 100vw" />
          </div>
        </div>
        {/* Bewertungszeile: ab lg oben rechts über dem Plan, auf der Höhe des Firmensitzes, wie die Kennzeile des alten
            Planblatts (füllt die Fläche über dem Plan); mobil direkt unter dem Foto */}
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-start" style={wand}>
          <Bewertungszeile geteilt className="planblatt-wand font-text text-fs-2 text-tinte-2 hyphens-none max-lg:-mt-8" />
        </div>
        {/* ab lg: die Waage als Schnittkante über die ganze Breite (wächst aus dem Kreuzpunkt mit dem Lot des Plans) und das
            Lot nach dem Knick an der Achse bis zum Fuß des Einstiegs, wo die Leitachse übernimmt */}
        <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute top-0 right-0 -left-4 hidden lg:col-span-full lg:row-start-2 lg:block">
          <span className="kreuzlinie-waage kreuzlinie-aus-start" />
        </div>
        <div aria-hidden="true" data-motion="sig-kreuzlinie" className="pointer-events-none absolute top-0 -bottom-24 -left-4 hidden lg:col-start-1 lg:row-start-2 lg:block">
          <span className="kreuzlinie-lot kreuzlinie-nach-waage" />
        </div>
      </div>
    </section>
  );
}
