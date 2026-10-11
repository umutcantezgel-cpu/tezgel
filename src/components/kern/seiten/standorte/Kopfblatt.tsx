// Kopfblatt der Seite `/standorte` (P4-08c, KERN v1.2 K-001, K-002, K-007, K-011): Einstieg und Einsatzgebiet als ein Blatt.
// Zwei Abschnitte des Bestands in Lesefolge – Hero („Standorte & Einsatzgebiete in Mittelhessen“) und Gebietskarte („Unser
// 45-km-Einsatzgebiet in Mittelhessen“) – stehen ab lg nebeneinander, getrennt von der Achse: ein Lot in Laser an der
// Spaltengrenze 7 | 8, das über die volle Höhe des Blatts läuft und keinen Text schneidet. Unter lg ist die Achse ein Lot am
// linken Rand, und beide Abschnitte stehen untereinander (eigenes Blatt, K-003 Nr. 7).
// Aufgabe 4 („Eigenen Ort prüfen“, Probelauf): Das Städteverzeichnis steht im Einsatzgebiet direkt unter dem Vorspann der
// Karte – am Desktop (1440 × 900) im ersten Bildschirm neben der H1, mobil (375 × 812) nach einem Bildlauf, jeweils zusammen
// mit der Überschrift „…Einsatzgebiet…“. Es ist die Kern-Form der Städte-Leiste des Bestands (`InteractiveServiceMap`, Knöpfe
// über der Karte): je Stadt ein Link auf `/standorte/<slug>` wie auf `/` (E-021). Entfernungen nennt erst das Register
// darunter, mit dem Bestandswortlaut „ca. … km ab Wetzlar“ (siehe `daten.ts`).
// Schriftfeld (K-008: auf Erzählseiten einmal; K-002: Vertrauen in zwei Bildschirmhöhen) unter den Knöpfen des Einstiegs.
// Server-Komponente; die Karte kommt als `karte` (Seite: `EinsatzgebietKarte`, Vorschau: Platzhalter-Ansicht ohne Kartenaufruf).
import type { ReactNode } from 'react';
import { CITIES } from '@/config/cities';
import { COMPANY_DATA } from '@/config/company';
import { Etikett, Textlink, verbinde } from '@/components/kern/basis';
import { Knopfreihe, Mass, SchriftfeldBetrieb, UMBRUCH, stufeNachWort } from '@/components/kern/vorlagen/teile';

const TITEL = 'Standorte & Einsatzgebiete in Mittelhessen';
const KARTE_TITEL = 'Unser 45-km-Einsatzgebiet in Mittelhessen';

/** Städteverzeichnis: je Stadt ein Link, Zellen mit Fugen, Spalten nach Platz (2 · ab 20rem 3 · ab 36rem 4). */
function Staedteverzeichnis({ className }: { className?: string }) {
  return (
    <div className={verbinde('@container', className)}>
      <ul className="grid grid-cols-2 border-t border-l border-k-fuge @xs:grid-cols-3 @xl:grid-cols-4">
        {CITIES.map((stadt) => (
          <li key={stadt.slug} className="flex min-w-0 border-r border-b border-k-fuge">
            <Textlink
              href={`/standorte/${stadt.slug}`}
              className={verbinde('flex min-h-k-7 min-w-0 flex-1 items-center px-k-2 py-k-1 k-mono text-k-1 focus-visible:relative focus-visible:z-10', UMBRUCH)}
            >
              {stadt.name}
            </Textlink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Kopfblatt({ karte }: { karte: ReactNode }) {
  const { headquarters, contact } = COMPANY_DATA;
  return (
    <div className="relative border-b border-k-fuge">
      {/* Lot unter lg am linken Rand (rechte Kante bei --k-rand), über die volle Höhe; dekorativ */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-full bg-k-laser lg:hidden" />
      <div className="mx-auto grid max-w-(--k-seite) grid-cols-1 px-(--k-rand) lg:grid-cols-12">
        {/* Einstieg (Bestand: Hero). Ab lg Sp. 1–7, rechte Kante = Achse */}
        <section
          aria-labelledby="standorte-titel"
          data-hauptaktion=""
          className="min-w-0 pt-k-8 pb-k-8 pl-k-4 lg:col-span-7 lg:border-r-2 lg:border-r-k-laser lg:pt-k-9 lg:pr-k-7 lg:pb-k-9 lg:pl-0"
        >
          <Etikett als="p" kreuz ton="tinte">
            Mittelhessen &amp; Lahn-Dill-Kreis
          </Etikett>
          <h1 id="standorte-titel" className={verbinde('mt-k-5 k-anzeige text-k-tinte', stufeNachWort(TITEL, 'einstieg'), UMBRUCH)}>
            {TITEL}
          </h1>
          <p className="mt-k-5 max-w-(--k-mass) k-text text-k-3 text-k-tinte md:text-k-4">
            Als Fachbetrieb mit Firmensitz in der {headquarters.street} in <Mass>{headquarters.postalCode}</Mass>{' '}
            {headquarters.city} betreuen wir Privatkunden, Architekten und Bauherren in Wetzlar, Gießen, Herborn und ganz
            Mittelhessen – mit persönlicher Beratung vor Ort und handwerklicher Präzision.
          </p>
          <Knopfreihe
            className="mt-k-6"
            knoepfe={[
              { text: 'Vor-Ort-Aufmaß anfragen', href: '/kontakt', zeichen: 'pfeil' },
              { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
            ]}
          />
          <SchriftfeldBetrieb className="mt-k-7 lg:mt-k-8" />
        </section>

        {/* Einsatzgebiet (Bestand: Interaktive Gebietskarte). Ab lg Sp. 8–12; Etikett fluchtet mit dem Etikett des Einstiegs */}
        <section
          aria-labelledby="karte-ueberschrift"
          className="min-w-0 border-t border-k-fuge pt-k-7 pb-k-8 pl-k-4 lg:col-span-5 lg:border-t-0 lg:pt-k-9 lg:pb-k-9 lg:pl-k-7"
        >
          <Etikett kreuz>Interaktive Gebietskarte</Etikett>
          <h2 id="karte-ueberschrift" className={verbinde('mt-k-4 k-anzeige text-k-tinte', stufeNachWort(KARTE_TITEL, 'rand', 'text-k-5'), UMBRUCH)}>
            {KARTE_TITEL}
          </h2>
          <p className="mt-k-4 max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">
            Klicken Sie auf eine Stadt für Details zu Entfernung, Anfahrt und schnellem Vor-Ort-Aufmaß.
          </p>
          <Staedteverzeichnis className="mt-k-6" />
          <div className="mt-k-6">{karte}</div>
        </section>
      </div>
    </div>
  );
}
