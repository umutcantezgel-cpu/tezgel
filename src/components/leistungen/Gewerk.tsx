// /leistungen · Gewerk (F-01, Fusion E-039, KERN v2 K-003 „Fuge statt Karte“): ein Fachgewerk als Feld im Fugenraster der
// Übersicht. Grundgerüst A (Gutachten u1): Verlegeplan auf Kalk-Feld, Etikett, H2, Text, Unterleistungen mit Fugenkreuz,
// Merkmale im Aufklapper (natives <details>), zwei Wege. Das Feld ist ein Subgrid über sieben Zeilen des Feldrasters (Plan,
// Etikett, Titel, Text, Unterleistungen, Merkmale, Wege), damit Titel und Werte je Reihe auf einer Grundlinie stehen (E4-N2-05).
// Aus B: Nummer 01–04 im Mono-Etikett, `aria-labelledby` auf die H2 (`<id>-titel`), Wege-Rangfolge (Fachdetails als
// Pfeil-Textlink, „Aufmaß anfragen“ als Nebenknopf, mobil über die volle Breite) und der Bestandswortlaut des Aufklappers
// „Ausstattungsmerkmale & Vorteile:“. Wortlaut aus `SERVICES` (`@/config/services`).
// Sprungziel `#<id>` ohne eigenes scroll-margin: Es gilt nur `scroll-padding-top` (K-005), Oberkante 96 px.
// SIG-3 (E3-ORCH-02): Das Fugenbild rückt beim Zeigen auf das Feld bzw. beim Fokus auf einen seiner Links in die Flucht,
// mobil beim Eintritt (`sig-plan`). Der Weg zu den Fachdetails läuft über den Seitenwechsel B-01 wie jeder andere (der
// Plan-Morph entfiel, E2-ORCH-04b, E-010). Kein Hover-Heben; Links mit Farbwechsel (`zustand`), der Knopf trägt `druck`.
import Link from 'next/link';
import clsx from 'clsx';
import { SERVICES } from '@/config/services';
import Icon from '@/components/icons/Icon';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettForm } from '@/components/kern/stile';
import { PLAENE, type PlanName } from '@/lib/plaene/vorgaben';
import { gewerkNummer } from '@/components/leistungen/Sprungindex';

export type Leistung = (typeof SERVICES)[number];

const istPlan = (id: string): id is PlanName => id in PLAENE;

export default function Gewerk({ leistung, nr }: { leistung: Leistung; nr: number }) {
  const titelId = `${leistung.id}-titel`;
  return (
    <article
      id={leistung.id}
      aria-labelledby={titelId}
      className="sig-plan-ziel row-span-7 grid min-w-0 grid-rows-subgrid gap-0 bg-fliese p-6 lg:p-8"
      data-motion="sig-plan"
    >
      <div className="flex items-center border border-fuge bg-kalk p-6">
        {istPlan(leistung.id) ? <Verlegeplan plan={leistung.id} ohneAchse bemassung={false} /> : null}
      </div>

      {/* Etikett mit Nummer (wie der Abschnittskopf: Ziffer in Tinte, Trennpunkt, Etikett) */}
      <p className={clsx(etikettForm, 'mt-6 text-tinte-2')}>
        <span className="text-tinte">{gewerkNummer(nr)}</span>
        <span aria-hidden="true">·</span>
        <span>Geprüfte Fachkompetenz</span>
      </p>
      <h2 id={titelId} className="mt-3 text-fs-5 text-tinte">
        {leistung.name}
      </h2>
      <p className="mt-3 max-w-mass font-text text-fs-3 text-tinte-2">{leistung.detailText}</p>

      <ul className="mt-6 grid gap-2">
        {leistung.subcategories.map((unter) => (
          <li key={unter.id} className="flex items-center gap-3 font-text text-fs-2 text-tinte">
            <Fugenkreuz className="size-3 shrink-0 text-strich" />
            {unter.name}
          </li>
        ))}
      </ul>

      {/* Merkmale im Aufklapper (Muster Startseite, <details>), geschlossen in allen Breiten; Wortlaut des Bestands */}
      <details className="group mt-8 border-t border-fuge">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-text text-fs-2 font-semibold text-tinte [&::-webkit-details-marker]:hidden">
          <span className="min-w-0">Ausstattungsmerkmale &amp; Vorteile:</span>
          <span className="flex shrink-0 items-center text-tinte" aria-hidden="true">
            <span className="group-open:hidden">
              <Icon name="plus" groesse={6} />
            </span>
            <span className="hidden group-open:block">
              <Icon name="minus" groesse={6} />
            </span>
          </span>
        </summary>
        <ul className="hidden gap-3 pt-2 pb-4 group-open:grid">
          {leistung.features.map((merkmal) => (
            <li key={merkmal} className="flex gap-3 font-text text-fs-2 text-tinte">
              <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                <Fugenkreuz className="size-3" />
              </span>
              <span className="min-w-0">{merkmal}</span>
            </li>
          ))}
        </ul>
      </details>

      {/* Wege: Fachdetails (Pfeil-Textlink) und Aufmaß (Nebenknopf). Bis xl untereinander (mobil der
          Knopf über die volle Breite), ab xl in einer Zeile wie in B – der Link bricht um, der Knopf steht rechts. So bricht die
          Wege-Zeile in allen vier Feldern gleich, und der Knopf liegt nicht unter dem Einwilligungsbanner links unten. */}
      <div className="mt-6 flex flex-col items-start gap-2 border-t border-fuge pt-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
        <Link
          href={`/leistungen/${leistung.id}`}
          data-motion="zustand"
          className="group inline-flex min-h-12 min-w-0 items-center gap-2 font-text text-fs-2 font-semibold text-tinte"
        >
          <span className="min-w-0 underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte pointer-fine:group-hover:decoration-2 group-active:decoration-tinte group-active:decoration-2">
            Fachdetails &amp; Ratgeber: {leistung.name}
          </span>
          <span aria-hidden="true" className="flex shrink-0">
            <Icon name="pfeil-rechts" groesse={5} />
          </span>
        </Link>
        <Knopf href="#express-anfrage" variante="neben" className="w-full sm:w-auto xl:shrink-0">
          Aufmaß anfragen
        </Knopf>
      </div>
    </article>
  );
}
