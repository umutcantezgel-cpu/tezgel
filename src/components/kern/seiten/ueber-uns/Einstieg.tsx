// Über uns · Einstieg (P4-08e, KERN v1.2 K-001, K-002, K-007, K-011 Erzählseite): Kopf des Blatts ohne Bild und ohne Knöpfe,
// wie im Bestand (Hero aus Eyebrow, H1 und Absatz). Die Seite erzählt den Betrieb; ihr Blatt hängt an einer einzigen roten Achse.
// Komposition (eigene, nicht die Fachseiten-Vorlage):
// - Kennzeile über die volle Breite mit Fuge darunter (Eyebrow des Bestands als Etikett, Wortlaut gleich, „·“ als Trenner).
// - H1 links bündig über Sp. 1–11 (ab 1024 px zwei Zeilen), Vorspann Sp. 1–7; neben dem Vorspann bleiben Sp. 9–12 frei – darunter hängt im nächsten Abschnitt das
//   Schriftfeld (Kennzahlen des Bestands) an der Achse.
// - Achse ab lg: Waage in Laser an der Unterkante des Einstiegs, Kreuzpunkt (Fugenkreuz) auf der Spaltengrenze 8 | 9 = obere linke
//   Ecke des Schriftfelds. Unter lg: Lot am linken Rand (`--k-rand` − 1 px) über die Höhe des Einstiegs, Text 16 px eingerückt.
// Ruhend: kein Signaturmoment auf /ueber-uns (K-009), kein `data-motion`. H1 und Vorspann stehen ab dem ersten Bild (LCP).
// K-002 (Vertrauen in zwei Bildschirmhöhen): mobil kompakt (Vorspann in Text-Stufe k-3, erst ab md Vorspann-Stufe k-4), damit
// Gründungsjahr, Kammer, Inhaber und Bewertung bei 375 × 812 innerhalb von 1624 px stehen (Rechnung in der Rückgabe).
// Wortlaut wörtlich aus `src/app/(bestand)/ueber-uns/page.jsx` (Hero), Daten aus `@/config/company`.
import { Etikett, Fugenkreuz, verbinde } from '@/components/kern/basis';
import { Trenner } from '@/components/kern/vorlagen/teile/Mass';
import { stufeNachWort } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';
import { COMPANY_DATA } from '@/config/company';

const TITEL_ID = 'ueber-uns-heading';

export default function Einstieg() {
  const { legalName, authority, headquarters, business } = COMPANY_DATA;
  const titel = `Über uns – Fliesenleger-Fachbetrieb Tezgel in ${headquarters.city}`;
  return (
    <section aria-labelledby={TITEL_ID} className="relative">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand) pt-k-6 pb-k-7 lg:pt-k-7 lg:pb-k-8">
        <div className="grid grid-cols-1 pl-k-4 lg:grid-cols-12 lg:pl-0">
          {/* Kennzeile (Etikett, K-012 Klasse 3: Wortlaut gleich, Form neu) */}
          <div className="min-w-0 lg:col-span-12 lg:border-b lg:border-k-fuge lg:pb-k-3">
            <Etikett als="p" kreuz ton="tinte">
              <span>Gegründet {business.establishmentYear}</span>
              <Trenner />
              <span>{authority.shortName}</span>
            </Etikett>
          </div>

          {/* H1: Stufe nach dem längsten Wort („Fliesenleger-“ bricht am Bindestrich), Verlaufsschrift des Bestands entfällt */}
          <h1
            id={TITEL_ID}
            className={verbinde('mt-k-5 k-anzeige text-k-tinte lg:col-span-11 lg:mt-k-7 lg:pr-k-6', stufeNachWort(titel, 'einstieg'), UMBRUCH)}
          >
            Über uns – Fliesenleger-Fachbetrieb Tezgel in {headquarters.city}
          </h1>

          <p className="mt-k-5 max-w-(--k-mass) min-w-0 k-text text-k-3 text-k-tinte md:text-k-4 lg:col-span-7 lg:mt-k-6 lg:pr-k-6">
            Über uns und {legalName}: Ihr eingetragener Fliesenleger-Fachbetrieb Tezgel in {headquarters.city} für {business.industryType} – mit bis zu 12 qualifizierten Fachkräften, Firmensitz in {headquarters.city} und im Einsatz in Wetzlar, Gießen und ganz Mittelhessen.
          </p>
        </div>
      </div>

      {/* Achse ab lg: Waage an der Unterkante, Kreuzpunkt auf der Grenze Sp. 8 | 9 (obere linke Ecke des Schriftfelds darunter) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="relative mx-auto max-w-(--k-seite) px-(--k-rand)">
          <div className="relative grid grid-cols-12">
            <span className="absolute inset-x-0 top-0 h-(--k-linie-2) -translate-y-1/2 bg-k-laser" />
            <span className="relative col-start-9 h-0">
              <span className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 text-k-laser">
                <Fugenkreuz className="size-k-4" />
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Lot unter lg: am linken Rand über die volle Höhe des Einstiegs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-full bg-k-laser lg:hidden" />
    </section>
  );
}
