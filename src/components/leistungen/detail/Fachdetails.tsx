// /leistungen/[id] · Fachkompetenz & Ausführungsdetails (S-04, KERN v2 K-006 „Text an der Fuge“, K-009 Schriftfeld).
// Bestand „Detail Content & Sticky Sidebar“: links drei Glas-Karten (Fachdetails, weitere Gewerke, Städte), rechts eine
// klebende Kontakt-Karte mit Schatten. Jetzt auf dem 12er-Raster in zwei Zeilen:
// - Zeile 1 links (8 Spalten), zur Randspalte hin durch eine Fuge getrennt: H2 und Kurzbeschreibung als Vorspann · Vorteile
//   als Zeilen an der Fuge (Etikett links, Zeilen rechts, Blattkante in Tinte, wie die Garantien auf `/`) · Qualitätssatz
//   an einer 2-px-Linie in Tinte (wie der Leitsatz auf `/`).
// - Zeile 1 rechts (4 Spalten) `Seitenspalte`: Schriftfeld „Direktkontakt“ (ohne Kleben, Begründung dort). Von 1024 bis
//   1279 px stehen Text und Schriftfeld 7 : 5, ab xl 8 : 4 – bei 4/12 wäre das Feld unter 1280 px so schmal, dass die
//   Telefonnummer im Knopf umbräche.
// - Zeile 2 über die ganze Breite, unter einer Fuge: die Wege – „Weitere Gewerke“ als Index in der Optik des Sprungindex
//   von `/leistungen` (dieselben Mono-Nummern) und „{Leistung} in Ihrer Region“ als ruhige Ortsliste (Textlinks), je
//   6 Spalten. So steht das Schriftfeld neben dem Text, zu dem es gehört, statt neben einer leeren Spalte.
// DOM-Folge = Sichtfolge: Fachkompetenz · Direktkontakt · Weitere Gewerke · Region (Bestand: Direktkontakt zuletzt). Die
// Umstellung folgt der Komposition: Stünde das Schriftfeld im DOM hinter der Ortsliste, spränge der Tab-Fokus von „Aßlar“
// über eine Bildschirmhöhe zurück nach rechts oben (a11y-zusatz, Sprung rückwärts). Mobil steht es damit vor den Wegen.
// Fokus: Die Index-Zeile mit dem fokussierten Link liegt über ihren Nachbarn (`focus-within:z-10`, wie der Sprungindex nach
// S-01b), sonst verdecken die Nachbarfelder im Fugenraster einen Teil des 2-px-Fokusrings.
// Bewegung: nur `zustand` an Links (Farbwechsel), Knöpfe tragen `druck` selbst. Kein Rot. Server-Komponente.
// Wortlaut, Überschriften (alle H2 wie im Bestand) und `href` unverändert aus `src/app/(bestand)/leistungen/[id]/page.jsx`.
import Link from 'next/link';
import { SERVICES } from '@/config/services';
import { CITIES } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { seitenKlassen } from '@/components/kern/stile';
import { gewerkNummer } from '@/components/leistungen/Sprungindex';
import type { Leistung } from '@/components/leistungen/Gewerk';
import Seitenspalte from '@/components/leistungen/detail/Seitenspalte';

// Unterstrich am Namen: Linie in Strich, bei feinem Zeiger und beim Antippen in Tinte (Register `zustand` am Link)
const UNTERSTRICH =
  'underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte group-active:decoration-tinte';

export interface FachdetailsProps {
  leistung: Leistung;
  /** Satz unter „Warum Fachqualität von …?“ (Bestand `serviceQualityNotes`) */
  qualitaet: string;
  /** Text des Schriftfelds (Bestand `serviceSidebarIntros`) */
  randText: string;
}

export default function Fachdetails({ leistung, qualitaet, randText }: FachdetailsProps) {
  const { legalName, headquarters } = COMPANY_DATA;
  // Nummer aus der Reihenfolge in SERVICES: dieselbe wie im Sprungindex und im Feldkopf auf /leistungen
  const weitere = SERVICES.map((s, nr) => ({ s, nr })).filter(({ s }) => s.id !== leistung.id);

  return (
    <section id="fachdetails" aria-labelledby="fachdetails-titel" className="relative scroll-mt-24 py-16 lg:py-24">
      <div className={seitenKlassen}>
        <div className="grid grid-cols-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12">
          {/* Zeile 1 links: Text an der Fuge */}
          <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-7 lg:row-start-1 lg:border-r lg:border-fuge lg:pr-12 xl:col-span-8">
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

          {/* Zeile 1 rechts: Schriftfeld Direktkontakt */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:pl-12 xl:col-span-4 xl:col-start-9">
            <Seitenspalte leistung={leistung} text={randText} />
          </div>

          {/* Zeile 2: Wege zu den anderen Gewerken und in die Städte */}
          <div className="col-span-4 grid grid-cols-1 gap-y-16 border-t border-fuge pt-12 md:col-span-8 lg:col-span-12 lg:row-start-2 lg:grid-cols-12 lg:gap-x-12">
            {/* Weitere Gewerke: Index wie der Sprungindex auf /leistungen */}
            <div className="min-w-0 lg:col-span-6">
              <h2 className="text-fs-5 text-tinte">Weitere Gewerke von {legalName}:</h2>
              <ul className="mt-6 grid gap-px border border-fuge bg-fuge">
                {weitere.map(({ s, nr }) => (
                  <li key={s.id} className="relative bg-fliese focus-within:z-10">
                    <Link
                      href={`/leistungen/${s.id}`}
                      data-motion="zustand"
                      className="group flex min-h-12 items-center gap-4 px-4 py-3 text-tinte pointer-fine:hover:bg-kalk active:bg-kalk"
                    >
                      <span className="w-6 shrink-0 font-mono text-fs-1 text-tinte-2">{gewerkNummer(nr)}</span>
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className={`font-text text-fs-2 font-semibold ${UNTERSTRICH}`}>{s.name}</span>
                        <span className="font-text text-fs-2 text-tinte-2">Gewerk {s.name} ansehen</span>
                      </span>
                      <span aria-hidden="true" className="flex shrink-0 text-strich">
                        <Icon name="pfeil-rechts" groesse={5} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Leistung je Stadt: Orte als Textlinks in Spalten, Zeilen an der Fuge */}
            <div className="min-w-0 lg:col-span-6">
              <h2 className="text-fs-5 text-tinte">{leistung.name} in Ihrer Region</h2>
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
                      <span className={UNTERSTRICH}>{stadt.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
