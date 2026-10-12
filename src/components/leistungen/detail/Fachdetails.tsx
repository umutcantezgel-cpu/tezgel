// /leistungen/[id] · Fachkompetenz & Ausführungsdetails mit den Wegen „Weitere Gewerke“ und „Region“ (S-04, KERN v2 K-006
// „Text an der Fuge“, K-009 Schriftfeld; Fusion F-02 nach Gutachten u2, Grundgerüst Fassung B).
// Bestand „Detail Content & Sticky Sidebar“: links drei Glas-Karten (Fachdetails, weitere Gewerke, Städte), rechts eine
// klebende Kontakt-Karte mit Schatten. Jetzt auf dem 12er-Raster in zwei Zeilen:
// - Zeile 1 = `section#fachdetails`: links (8 Spalten), zur Randspalte hin durch eine Fuge getrennt: Mono-Etikett
//   „Fachkompetenz“ (aus A), H2 und Kurzbeschreibung als Vorspann · Vorteile als Zeilen an der Fuge (Etikett links, Zeilen
//   rechts, Blattkante in Tinte, wie die Garantien auf `/`) · Qualitätssatz an einer 2-px-Linie in Tinte (wie der Leitsatz
//   auf `/`). Rechts (4 Spalten) `Seitenspalte`: Schriftfeld „Direktkontakt“ als eigene benannte section (ohne Kleben).
//   Von 1024 bis 1279 px stehen Text und Schriftfeld 7 : 5, ab xl 8 : 4 – bei 4/12 wäre das Feld unter 1280 px so schmal,
//   dass die Telefonnummer im Knopf umbräche.
// - Zeile 2 über die ganze Breite, unter einer Fuge: die Wege als zwei eigene sections mit aria-labelledby und Mono-Etikett
//   (aus A: „Gewerke“, „Region“; IDs `weitere-heading`, `region-heading` wie in A), je 6 Spalten. „Weitere Gewerke“ als Index
//   in der Optik des Sprungindex von `/leistungen` (dieselben Mono-Nummern), je Zeile die Plan-Miniatur des Gewerks aus A;
//   die ganze Zeile ist der Link (B). „{Leistung} in Ihrer Region“ als ruhige Ortsliste, ganze Zeile Link mit Pfeil (A).
//   Die Wege stehen außerhalb von `section#fachdetails`, damit die Landmarke „Fachkompetenz“ nur ihren Inhalt umfasst.
// DOM-Folge = Sichtfolge: Fachkompetenz · Direktkontakt · Weitere Gewerke · Region (Bestand: Direktkontakt zuletzt). Die
// Umstellung folgt der Komposition: Stünde das Schriftfeld im DOM hinter der Ortsliste, spränge der Tab-Fokus von „Aßlar“
// über eine Bildschirmhöhe zurück nach rechts oben (a11y-zusatz, Sprung rückwärts). Mobil steht es damit vor den Wegen.
// Reflow (320 px, a11y-zusatz): Mit der Plan-Miniatur ist die Zeile breiter als im Index von B. Das Raster trägt darum
// `grid-cols-1` (Spur minmax(0, 1fr) statt min-content), der Name die weiche Trennung aus `fugen`, unter sm engere Abstände.
// Fokus: Die Index-Zeile mit dem fokussierten Link liegt über ihren Nachbarn (`focus-within:z-10`, wie der Sprungindex nach
// S-01b), sonst verdecken die Nachbarfelder im Fugenraster einen Teil des 2-px-Fokusrings. Der Ring umläuft jeweils die
// ganze Zeile (Link als Block), darum tragen die Ortszeilen den Pfeil (Gutachten u2, Region).
// Bewegung: nur `zustand` an Links (Farbwechsel), Knöpfe tragen `druck` selbst. Kein Rot. Server-Komponente.
// Wortlaut, Überschriften (alle H2 wie im Bestand, Gewerk-Namen als H3 wie in A) und `href` unverändert.
import Link from 'next/link';
import clsx from 'clsx';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, seitenKlassen } from '@/components/kern/stile';
import { gewerkNummer } from '@/components/leistungen/Sprungindex';
import type { Leistung } from '@/components/leistungen/Gewerk';
import type { PlanName } from '@/lib/plaene/vorgaben';
import Seitenspalte from '@/components/leistungen/detail/Seitenspalte';
import { fugen, UNTERSTRICH } from '@/components/leistungen/detail/satz';

export interface FachdetailsProps {
  leistung: Leistung;
  /** Satz unter „Warum Fachqualität von …?“ (Bestand `serviceQualityNotes`) */
  qualitaet: string;
  /** Text des Schriftfelds (Bestand `serviceSidebarIntros`) */
  randText: string;
}

/** Mono-Etikett über einer H2 (wie der Kopf von `Abschnitt`) */
function Etikett({ children }: { children: string }) {
  return (
    <p className={clsx(etikettKlassen, 'mb-4')}>
      <Fugenkreuz className="size-3 shrink-0 text-strich" />
      {children}
    </p>
  );
}

export default function Fachdetails({ leistung, qualitaet, randText }: FachdetailsProps) {
  const { legalName, headquarters } = COMPANY_DATA;
  // Nummer aus der Reihenfolge in SERVICES: dieselbe wie im Sprungindex und im Feldkopf auf /leistungen
  const weitere = SERVICES.map((s, nr) => ({ s, nr })).filter(({ s }) => s.id !== leistung.id);

  return (
    <>
      <section id="fachdetails" aria-labelledby="fachdetails-titel" className="relative scroll-mt-24 pt-16 pb-16 lg:pt-24">
        <div className={seitenKlassen}>
          <div className="grid grid-cols-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12">
            {/* links: Text an der Fuge */}
            <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-7 lg:border-r lg:border-fuge lg:pr-12 xl:col-span-8">
              <Etikett>Fachkompetenz</Etikett>
              <h2 id="fachdetails-titel" className="text-fs-6 text-tinte">
                Fachkompetenz &amp; Ausführungsdetails
              </h2>
              <p className="mt-6 max-w-mass text-fs-4 text-tinte">{leistung.shortDescription}</p>

              {/* Vorteile: Etikett links, Zeilen rechts an der Fuge; oben die Blattkante in Tinte */}
              <div className="mt-12 grid grid-cols-1 gap-y-4 border-t border-tinte pt-4 md:grid-cols-8 md:gap-x-8">
                <p className="flex items-center gap-2 self-start font-mono text-fs-1 text-tinte-2 md:col-span-3">
                  <Fugenkreuz className="size-3 shrink-0 text-strich" />
                  Ihre handwerklichen Vorteile:
                </p>
                <ul className="border-t border-fuge md:col-span-5 md:border-t-0">
                  {leistung.features.map((merkmal) => (
                    <li key={merkmal} className="flex items-start gap-3 border-b border-fuge py-3 font-text text-fs-3 text-tinte md:first:pt-0">
                      <Fugenkreuz className="mt-2 size-3 shrink-0 text-strich" />
                      <span className="min-w-0">{merkmal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualitätssatz an der Linie */}
              <div className="mt-12 max-w-mass border-l-2 border-tinte pl-6">
                <p className="font-anzeige text-fs-4 font-semibold text-tinte">Warum Fachqualität von {legalName}?</p>
                <p className="mt-3 text-fs-3 text-tinte-2">{qualitaet}</p>
              </div>
            </div>

            {/* rechts: Schriftfeld Direktkontakt */}
            <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pl-12 xl:col-span-4 xl:col-start-9">
              <Seitenspalte leistung={leistung} text={randText} />
            </div>
          </div>
        </div>
      </section>

      {/* Zeile 2: Wege zu den anderen Gewerken und in die Städte, je eine eigene section */}
      <div className="pb-16 lg:pb-24">
        <div className={seitenKlassen}>
          <div className="grid grid-cols-1 gap-y-16 border-t border-fuge pt-12 lg:grid-cols-12 lg:gap-x-12">
            {/* Weitere Gewerke: Index wie der Sprungindex auf /leistungen, je Zeile die Plan-Miniatur des Gewerks */}
            <section aria-labelledby="weitere-heading" className="min-w-0 lg:col-span-6">
              <Etikett>Gewerke</Etikett>
              <h2 id="weitere-heading" className="text-fs-5 text-tinte">
                Weitere Gewerke von {legalName}:
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-px border border-fuge bg-fuge">
                {weitere.map(({ s, nr }) => (
                  <li key={s.id} className="relative bg-fliese focus-within:z-10">
                    <Link
                      href={`/leistungen/${s.id}`}
                      data-motion="zustand"
                      className="group flex min-h-12 items-center gap-3 px-4 py-3 text-tinte pointer-fine:hover:bg-kalk active:bg-kalk sm:gap-4"
                    >
                      <span className="w-6 shrink-0 font-mono text-fs-1 text-tinte-2">{gewerkNummer(nr)}</span>
                      {/* Plan-Miniatur des Gewerks (aus A, ohne Achse: kein zweites Rot), dekorativ; unter sm kleiner, damit der Name Platz hat */}
                      <span className="w-12 shrink-0 text-tinte sm:w-16">
                        <Verlegeplan plan={s.id as PlanName} ohneAchse bemassung={false} />
                      </span>
                      {/* div statt span: die H3 (wie in A) braucht einen Flussinhalt-Behälter; Textschnitt am inneren span
                          (globals: `:is(h1…h6) .font-text` setzt die volle Breite) */}
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <h3 className="text-fs-2 text-tinte">
                          <span className={clsx('font-text font-semibold', UNTERSTRICH)}>{fugen(s.name)}</span>
                        </h3>
                        <span className="font-text text-fs-2 text-tinte-2">Gewerk {s.name} ansehen</span>
                      </div>
                      <span aria-hidden="true" className="flex shrink-0 text-strich">
                        <Icon name="pfeil-rechts" groesse={5} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Leistung je Stadt: Orte als Zeilen an der Fuge in Spalten, ganze Zeile Link, Pfeil am Ende */}
            <section aria-labelledby="region-heading" className="min-w-0 lg:col-span-6">
              <Etikett>Region</Etikett>
              <h2 id="region-heading" className="text-fs-5 text-tinte">
                {leistung.name} in Ihrer Region
              </h2>
              <p className="mt-3 max-w-mass text-fs-3 text-tinte-2">
                Vom Firmensitz in {headquarters.city} aus im Lahn-Dill-Kreis und in Mittelhessen im Einsatz.
              </p>
              <ul className="mt-6 gap-x-8 border-t border-fuge sm:columns-2">
                {CITIES.map((stadt) => (
                  <li key={stadt.slug} className="break-inside-avoid border-b border-fuge">
                    <Link
                      href={`/leistungen/${leistung.id}/${stadt.slug}`}
                      data-motion="zustand"
                      className="group flex min-h-11 items-center gap-3 py-2 font-text text-fs-2 text-tinte"
                    >
                      <span aria-hidden="true" className="flex shrink-0 text-strich">
                        <Icon name="ort" groesse={4} />
                      </span>
                      <span className={clsx('min-w-0 flex-1', UNTERSTRICH)}>{stadt.name}</span>
                      <span aria-hidden="true" className="flex shrink-0 text-strich">
                        <Icon name="pfeil-rechts" groesse={4} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
