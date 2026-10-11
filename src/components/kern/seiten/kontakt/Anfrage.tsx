// Anfrage-Abschnitte auf `/kontakt` (P4-08f, KERN v1.2 K-011 Formulare, Lehre 7): Server-Komponenten mit den Formular-Inseln.
// Reihenfolge wie im Bestand: zuerst der Kalender `#termin-buchen` (F-07, `TerminKalender`, P4-05c/d), dann die Express-Anfrage
// `#express-anfrage` (F-03, `AnfrageFunnel`, P3-13b). IDs der Abschnitte und Überschriften wörtlich (Pflichtanker N-18, Tests).
// Eigene Struktur je Abschnitt (K-003 Nr. 5):
//   Termin  – Kopf oben im Maß, darunter der Kalender auf 8 von 12 Spalten (Bestand: zentriert, max-w-3xl)
//   Express – Kopf in der linken Spalte (Sp. 1–4), Schrittfeld rechts (Sp. 5–12), mobil untereinander; Fuge oben trennt ihn
//             vom Termin-Abschnitt auf demselben Grund
// Kopf je Abschnitt kurz (Etikett, h2, ein Satz), damit die Tab-Folge der Lesefolge folgt und kein langer Rücksprung entsteht.
// Keine Auftritte (Arbeitsseite). `formular` ersetzt die Insel (nur für eine Vorschau, die nie sendet); Standard ist die echte.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { Etikett, verbinde } from '@/components/kern/basis';
import TerminKalender from '@/components/kern/formulare/TerminKalender';
import AnfrageFunnel from '@/components/kern/formulare/AnfrageFunnel';
import { UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';

type AbschnittProps = { formular?: ReactNode };

const TERMIN_TITEL = 'Wunschtermin in 2 Schritten reservieren';
const EXPRESS_TITEL = 'Ihr Vor-Ort-Aufmaß anfordern';

/** „Wunschtermin in 2 Schritten reservieren“ (Bestand: BookingCalendar mit „… & Schadensanalyse“). */
export function Termin({ formular }: AbschnittProps) {
  return (
    <section id="termin-buchen" aria-labelledby="termin-buchen-heading" className="bg-k-kalk py-k-7 lg:py-k-8">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <header className="max-w-(--k-mass)">
          <Etikett kreuz>Verbindlicher Vor-Ort-Termin</Etikett>
          <h2 id="termin-buchen-heading" className={verbinde('mt-k-4 k-anzeige text-k-tinte', stufeNachWort(TERMIN_TITEL, 'abschnitt', 'text-k-6'), UMBRUCH)}>
            {TERMIN_TITEL}
          </h2>
          <p className="mt-k-4 k-text text-k-3 text-k-tinte-2">
            Wählen Sie direkt einen freien Tag und eine Uhrzeit für Ihr kostenfreies Aufmaß vor Ort.
          </p>
        </header>
        <div className="mt-k-6 grid grid-cols-1 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            {formular ?? <TerminKalender initialServiceType="Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse" />}
          </div>
        </div>
      </div>
    </section>
  );
}

/** „Ihr Vor-Ort-Aufmaß anfordern“ (Bestand: TezgelAnfrageFunnel). */
export function Express({ formular }: AbschnittProps) {
  const { owner } = COMPANY_DATA;
  return (
    <section id="express-anfrage" aria-labelledby="express-anfrage-heading" className="border-t border-k-fuge bg-k-kalk py-k-7 lg:py-k-8">
      <div className="mx-auto grid max-w-(--k-seite) grid-cols-1 gap-y-k-6 px-(--k-rand) lg:grid-cols-12">
        <header className="min-w-0 lg:col-span-4 lg:pr-k-7">
          <Etikett kreuz>Oder detailliert konfigurieren</Etikett>
          <h2 id="express-anfrage-heading" className={verbinde('mt-k-4 k-anzeige text-k-tinte', stufeNachWort(EXPRESS_TITEL, 'seitlich', 'text-k-6'), UMBRUCH)}>
            {EXPRESS_TITEL}
          </h2>
          <p className="mt-k-4 k-text text-k-3 text-k-tinte-2">
            Füllen Sie kurz die Projektdaten aus – Fachbetriebsleiter {owner.fullName} meldet sich persönlich bei Ihnen.
          </p>
        </header>
        <div className="min-w-0 lg:col-span-8">{formular ?? <AnfrageFunnel />}</div>
      </div>
    </section>
  );
}
