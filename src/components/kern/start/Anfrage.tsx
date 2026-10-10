// Startseite · Anfrage-Abschnitte (P3-13b, KERN v1.2) – Server-Komponenten mit den Formular-Inseln darin.
// Staffelung der Anfrage-Einstiege auf / (K-011): Hero-Formular kurz im Einstieg (P3-13a) · hier der Preisrechner
// ausführlich als eigener Abschnitt und die Express-Anfrage in drei Schritten · Abschluss ohne Formular (P3-13a).
// Eigene Struktur je Abschnitt (K-003 Prinzip 5): Projektanfrage = Kopf über breitem Feldraster (zwei Felder);
// Express-Anfrage = Kopf in der linken Spalte, Schrittfeld rechts daneben (Desktop), mobil untereinander.
// Keine Auftritte (K-011 Formulare: nur aufklappen, druck, zustand, laden, notiert). Wortlaut wörtlich aus
// `src/app/(bestand)/page.tsx` (Abschnitte #kosten-rechner und #express-anfrage), Inhaber aus `@/config/company`.
// `formular` ersetzt die Insel (nur für die Vorschau, die nie sendet); Standard ist das echte Formular.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import Etikett from '@/components/kern/basis/Etikett';
import Preisrechner from '@/components/kern/formulare/Preisrechner';
import AnfrageFunnel from '@/components/kern/formulare/AnfrageFunnel';

type AbschnittProps = { formular?: ReactNode };

/** „Projekt anfragen & Situation schildern“, Anker #kosten-rechner (Bestand: PricingCalculator). */
export function Projektanfrage({ formular }: AbschnittProps) {
  return (
    <section id="kosten-rechner" aria-labelledby="rechner-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="max-w-(--k-mass)">
          <Etikett kreuz>Umfassende Projektanfrage</Etikett>
          <h2 id="rechner-heading" className="mt-k-4 k-anzeige text-k-6 text-k-tinte">
            Projekt anfragen &amp; Situation schildern
          </h2>
          <p className="mt-k-5 k-text text-k-4 text-k-tinte-2">
            Wählen Sie Ihr geplantes Vorhaben und beschreiben Sie kurz Ihre Ausgangslage vor Ort.
            Fachbetriebsleiter Deniz Tezgel prüft Ihre Angaben und meldet sich zeitnah für eine persönliche Abstimmung und das kostenfreie Vor-Ort-Aufmaß.
          </p>
        </div>
        <div className="mt-k-8">{formular ?? <Preisrechner />}</div>
      </div>
    </section>
  );
}

/** „Ihre Express-Anfrage in 3 Klicks“, Anker #express-anfrage (Bestand: TezgelAnfrageFunnel). */
export function ExpressAnfrage({ formular }: AbschnittProps) {
  const { owner } = COMPANY_DATA;
  return (
    <section id="express-anfrage" aria-labelledby="anfrage-heading" className="py-k-9 lg:py-k-10">
      <div className="mx-auto grid max-w-(--k-seite) grid-cols-1 gap-y-k-7 px-(--k-rand) lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pr-k-7">
          <Etikett kreuz>Kostenfrei &amp; unverbindlich</Etikett>
          <h2 id="anfrage-heading" className="mt-k-4 k-anzeige text-k-6 text-k-tinte">
            Ihre Express-Anfrage in 3 Klicks
          </h2>
          <p className="mt-k-5 k-text text-k-4 text-k-tinte-2">
            Vorhaben wählen, Eckdaten eintragen und die Anfrage direkt per WhatsApp an {owner.fullName} oder per
            E-Mail senden.
          </p>
        </div>
        <div className="min-w-0 lg:col-span-8">{formular ?? <AnfrageFunnel />}</div>
      </div>
    </section>
  );
}

/** Beide Abschnitte über eine Kennung (für Seiten, die sie getrennt platzieren, die benannten Exporte nutzen). */
export default function Anfrage({ abschnitt, formular }: AbschnittProps & { abschnitt: 'projektanfrage' | 'express' }) {
  return abschnitt === 'projektanfrage' ? <Projektanfrage formular={formular} /> : <ExpressAnfrage formular={formular} />;
}
