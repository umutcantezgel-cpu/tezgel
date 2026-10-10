// Startseite · Einstieg Variante B „Planblatt“ (P3-09b/P3-09c, KERN v1.2, K-001, K-007, K-009 SIG-1, K-011 Erzählseite).
// Der erste Bildschirm ist ein Planblatt: oben die Kennzeile des Blatts (Etikett links, Bewertung über der Zeichnung),
// links die H1, rechts der Verlegeplan Bad – an seiner Achse geschnitten (obere Hälfte mit Bemaßung, Passstücken,
// Rinne). Unter der Schnittkante steht das Hero-Formular als eigenes Feld; es setzt die Wände des Plans nach unten fort
// und überdeckt keine Zeichnung (P3-09c, Auflage 1).
// Die rote Achse kommt aus dem Plan: Kreuzpunkt = Mitte der Zeichnung = Mitte der Schnittkante; die Waage läuft von dort
// nach links in die Textspalte und ist die Grundlinie, auf der die H1 steht; das Lot steht auf der Mittelfuge des Plans.
//
// Raster ab lg (12 Spalten ohne Zwischenraum, K-007), drei Zeilen:
//   1  Kennzeile: Etikett (Sp. 1–6) | Bewertung (Sp. 7–12), gemeinsame 1-px-Fuge unten
//   2  H1 (Sp. 1–6, unten bündig)       | obere Planhälfte (Sp. 7–12, unten bündig)  → Unterkante = Kreuzpunkt = Waage
//   3  Absatz, Knöpfe, Zusagen, Motto   | Formularfeld, Oberkante auf der Waage (Schnittkante des Plans)
// Die Waage liegt als Bahn am Anfang von Zeile 3 über alle 12 Spalten – die H1 steht auf ihr, kein Text wird geschnitten –
// und ist bei 75 % der Breite (Mitte der Spalten 7–12 = Mitte des Plans) zentriert; die Bahn kappt sie links an der
// Textkante und rechts am Rand der Planspalte. Sie liegt im DOM nach dem Formularfeld und damit über dessen Oberkante.
// Formularfeld in der 24er-Teilung des Plans (480 / 24 = 20 Einheiten): von Wand (x = 20, Spalte 2) bis Wand (x = 460,
// Ende Spalte 23). Bei 1440 × 900 beginnt es im ersten Bildschirm (Waage ≈ 545 px samt 64-px-Kopf).
// Unter lg (eigenes Blatt, K-003 Nr. 7, P3-09c Auflage 2): eine Spalte – Kennzeile, H1 mit Unterzeile, Absatz, Knöpfe
// (Hauptknopf zuerst), Zusagen, Motto, Plan vollständig und verkleinert, Formular. Achse nur als Lot am linken Rand
// (`--k-rand` − 1 px) über die volle Höhe des Einstiegs; Text 16 px eingerückt.
// SIG-1 nur über CSS (`kern.css`: html.k-bewegung, k-waage/k-lot, dauer-5 · kurve-laser, Lot eine Staffel später).
// H1 und Absatz (LCP) stehen ab dem ersten Bild: keine Deckkraft 0, kein Versatz – bewegt werden nur die SVG-Linien.
// Kopf (sticky, im Fluss, `--k-kopf-hoehe`) verdeckt nichts: Der Einstieg beginnt unter ihm, kein Ausgleich nötig.
// `data-hauptaktion` am Abschnitt: Der WhatsApp-Kanal des Layouts weicht dem Einstieg aus (P3-07, FREIHALTEN).
// Wortlaut wörtlich aus `src/app/(bestand)/page.tsx` („1. HERO“), Daten aus `@/config/company` und `@/config/reviews`.
import { useId, type ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import Etikett from '@/components/kern/basis/Etikett';
import Knopf from '@/components/kern/basis/Knopf';
import Icon from '@/components/kern/icons/Icon';
import Plan from '@/components/kern/start/einstieg-b/Plan';
import { LaserLot, LaserWaage } from '@/components/kern/start/einstieg-b/Laser';

const ZUSAGEN = ['Kostenloses Aufmaß vor Ort', 'Staubschutzgarantie', 'Verbindlicher Festpreis'];

export type EinstiegProps = {
  /** Platz für das Hero-Formular (P3-13). Ohne Formular bleibt der Platz leer und der Plan liegt frei. */
  formular?: ReactNode;
};

export default function Einstieg({ formular }: EinstiegProps) {
  const { contact, motto, owner } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;
  const titelId = `k-einstieg-b${useId()}`;

  return (
    <section aria-labelledby={titelId} data-hauptaktion="" className="relative pt-k-6 pb-k-9 lg:pt-k-5">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="relative grid grid-cols-1 pl-k-4 lg:grid-cols-12 lg:pl-0">
          {/* Zeile 1 · Kennzeile des Blatts (Etiketten, Klasse 3, Wortlaut wie im Bestand) */}
          <Etikett als="p" kreuz ton="tinte" className="lg:col-span-6 lg:row-start-1 lg:w-auto lg:border-b lg:border-k-fuge lg:pr-k-6 lg:pb-k-3">
            Handwerkskammer-eingetragener Fachbetrieb Deniz Tezgel
          </Etikett>
          <p className="mt-k-2 flex items-start gap-k-2 k-mono text-k-1 text-k-tinte lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0 lg:border-b lg:border-k-fuge lg:pb-k-3">
            <span className="flex h-lh shrink-0 items-center">
              <Icon name="stern-voll" groesse={16} />
            </span>
            <span>
              {google.displayRating} ({google.count} Bewertungen)
            </span>
          </p>

          {/* Zeile 2 links · H1, steht auf der Waage (Abstand unten über die Unterlängen hinweg) */}
          <h1
            id={titelId}
            className="mt-k-5 k-anzeige text-k-7 text-k-tinte lg:col-span-6 lg:row-start-2 lg:mt-k-4 lg:self-end lg:pr-k-6 lg:pb-k-3"
          >
            <span className="block">Perfektion auf jedem Quadrat&shy;meter.</span>
            {/* Unterzeile ungestaucht: Textbreite 100 %, Laufweite normal (P3-09c, Auflage 3) */}
            <span className="mt-k-2 block k-text text-k-5 font-semibold tracking-normal text-k-tinte-2">
              Fliesenverlegung &amp; Badsanierung aus Aßlar
            </span>
          </h1>

          {/* Zeile 3 links · Absatz, Knöpfe, Zusagen, Motto */}
          <div className="mt-k-5 lg:col-span-6 lg:row-start-3 lg:pr-k-6">
            <p className="max-w-(--k-mass) k-text text-k-4 text-k-tinte">
              Fugenarme XXL-Großformatfliesen, barrierefreie Walk-in-Duschen, repräsentative Wohnbereiche und frostsichere
              Terrassen – millimetergenau verlegt, normgerecht abgedichtet nach{' '}
              {/* Mono eine Stufe kleiner (Wortlücke schmaler), ohne Umbruch, ohne Laufweite (P3-09c, Auflage 4) */}
              <span className="k-mono text-k-3 whitespace-nowrap">DIN 18534</span> und mit Staubschutzgarantie im bewohnten Zuhause.
            </p>

            <div className="mt-k-6 flex flex-wrap gap-k-3">
              <Knopf href="/kontakt" className="w-full sm:w-auto" hinten={<Icon name="pfeil" groesse={20} />}>
                Aufmaß vor Ort anfragen
              </Knopf>
              <Knopf
                art="neben"
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="grow sm:grow-0"
                vorne={<Icon name="whatsapp" groesse={20} />}
              >
                WhatsApp
              </Knopf>
              <Knopf
                art="neben"
                href={`tel:${contact.phoneLink}`}
                aria-label={`Fliesenverlegung Tezgel telefonisch anrufen: ${contact.phone}`}
                className="grow sm:grow-0"
                vorne={<Icon name="telefon" groesse={20} />}
              >
                <span className="k-mono font-normal">{contact.phone}</span>
              </Knopf>
            </div>

            <ul className="mt-k-5 flex flex-col gap-k-2 sm:flex-row sm:flex-wrap sm:gap-x-k-5">
              {ZUSAGEN.map((zusage) => (
                <li key={zusage} className="flex items-start gap-k-2 k-text text-k-2 font-semibold text-k-tinte">
                  <span className="flex h-lh shrink-0 items-center">
                    <Icon name="haken" groesse={20} />
                  </span>
                  {zusage}
                </li>
              ))}
            </ul>

            <figure className="mt-k-6 max-w-(--k-mass) border-t border-k-fuge pt-k-4">
              <blockquote className="k-text text-k-3 text-k-tinte">&bdquo;{motto}&ldquo;</blockquote>
              <figcaption className="mt-k-1 k-mono text-k-1 text-k-tinte-2">— {owner.fullName}, Inhaber</figcaption>
            </figure>
          </div>

          {/* Zeile 2 rechts · Verlegeplan, an der Achse geschnitten (mobil: vollständig, verkleinert, nach dem Text) */}
          <Plan className="mt-k-7 w-3/4 md:w-1/2 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:mt-k-5 lg:w-auto lg:self-end" />

          {/* Zeile 3 rechts · Formularfeld unter der Schnittkante, Wand bis Wand (24er-Teilung des Plans) */}
          {formular ? (
            <div className="relative mt-k-5 lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:mt-0 lg:grid lg:grid-cols-24 lg:content-start">
              <div className="min-w-0 lg:col-start-2 lg:col-end-24">{formular}</div>
            </div>
          ) : null}

          {/* Waage (ab lg): Bahn am Anfang von Zeile 3, Linie 150 % breit ab links = Mitte bei 75 % (Kreuzpunkt) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-(--k-linie-2) -translate-y-1/2 overflow-hidden lg:col-span-full lg:row-start-3 lg:block">
            <LaserWaage className="absolute top-0 left-0 h-full w-3/2" />
          </div>
        </div>
      </div>

      {/* Lot unter lg: am linken Rand (rechte Kante bei --k-rand), über die volle Höhe des Einstiegs */}
      <div className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-full lg:hidden">
        <LaserLot className="h-full w-full" />
      </div>
    </section>
  );
}
