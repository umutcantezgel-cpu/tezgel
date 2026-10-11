// Kopf der Seite `/kontakt` (P4-08f, KERN v1.2 K-011 Arbeitsseite, K-002 Aufgabe 3 „Aufmaß oder Anfrage stellen“).
// Ein Blatt im 12er-Raster: links Kennzeile, H1 (höchstens k-6, Stufe nach dem längsten Wort), Vorspann und die zwei Wege
// des Bestands (Express-Anfrage, Anruf); rechts das Kontaktblatt mit Telefon, WhatsApp und E-Mail als gleichwertige Zeilen.
// So stehen am Desktop (1440 × 900) alle Wege im ersten Bildschirm, mobil H1, Vorspann und beide Knöpfe, darunter das Blatt
// (dauerhaft dazu die untere Leiste). Keine Achse, kein Auftritt, kein Signaturmoment (Arbeitsseite).
// Wortlaut wörtlich aus `src/app/(bestand)/kontakt/page.jsx` (Hero) – die H1 ohne Verlaufsschrift, Wortlaut gleich.
// Der erste Knopf springt zum Abschnitt `#express-anfrage` (Pfeil nach unten, weil er auf der Seite bleibt).
// `data-hauptaktion`: der WhatsApp-Kanal weicht dem Kopf aus (Lehre 9). Server-Komponente.
import { useId, type ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { Etikett, Knopf, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';
import { UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';

const TITEL = 'Kontakt & Aufmaß Fliesenleger Tezgel';

export default function Kopf({ kontaktblatt }: { kontaktblatt: ReactNode }) {
  const titelId = `k-kontakt-titel${useId()}`;
  const { contact } = COMPANY_DATA;
  return (
    <section aria-labelledby={titelId} data-hauptaktion="" className="border-b border-k-fuge bg-k-kalk">
      <div className="mx-auto grid max-w-(--k-seite) grid-cols-1 gap-k-7 px-(--k-rand) pt-k-6 pb-k-7 lg:grid-cols-12 lg:gap-0 lg:pt-k-7 lg:pb-k-8">
        <div className="flex min-w-0 flex-col lg:col-span-7 lg:pr-k-7">
          <Etikett als="p" kreuz ton="tinte">
            Fachbetrieb Aßlar · Wetzlar · Hessen
          </Etikett>
          <h1 id={titelId} className={verbinde('mt-k-4 k-anzeige text-k-tinte', stufeNachWort(TITEL, 'einstieg', 'text-k-6'), UMBRUCH)}>
            {TITEL}
          </h1>
          <p className="mt-k-4 max-w-(--k-mass) k-text text-k-3 text-k-tinte">
            Ihr Fliesenleger für Aßlar, Wetzlar und ganz Hessen: Rufen Sie uns direkt an, schreiben Sie uns per WhatsApp oder
            sichern Sie sich über unsere Express-Anfrage Ihr kostenfreies Vor-Ort-Aufmaß mit verbindlichem Festpreisangebot.
          </p>
          <div className="mt-k-5 flex flex-wrap gap-k-3">
            <Knopf href="#express-anfrage" className="w-full sm:w-auto" hinten={<Icon name="pfeil" richtung="unten" groesse={20} />}>
              Zur Express-Anfrage
            </Knopf>
            <Knopf href={`tel:${contact.phoneLink}`} art="neben" className="w-full sm:w-auto" vorne={<Icon name="telefon" groesse={20} />}>
              <span className="k-mono font-normal">{contact.phone}</span>
            </Knopf>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-5 lg:self-start">{kontaktblatt}</div>
      </div>
    </section>
  );
}
