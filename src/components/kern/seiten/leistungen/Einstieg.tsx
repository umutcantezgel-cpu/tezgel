// /leistungen · Einstieg (P4-08b, KERN v1.2 K-001, K-002, K-003, K-007, K-011 Erzählseite).
// Deckblatt der Planmappe: Kennzeile, H1 über die volle Breite, darunter eine Fluchtlinie, links Vorspann und Wege,
// rechts das Schriftfeld des Betriebs, Oberkante an der Fluchtlinie. Ab lg: Vorspann Sp. 1–8 (Fließtext k-3, der Absatz ist
// lang), Wege in einer Reihe über die volle Breite – so beginnt das erste Planblatt bei 1440 × 900 noch im ersten Bildschirm.
//
// Kein Rot im Einstieg (K-003 Nr. 2, Briefing P4-08b): Das Rot dieser Seite gehört den Verlegeplänen der Leistungen (SIG-3),
// deren erstes Blatt bei 1440 × 900 schon im ersten Bildschirm steht. Eine rote Waage oder ein rotes Lot im Einstieg stünde dort
// neben der Laserachse des Plans – zwei rote Blickfänge in einer Ansicht. Darum ist die Fluchtlinie eine 1-px-Linie in Strich
// mit dem Fugenkreuz in Tinte auf der Spaltengrenze 8 | 9 (Kreuzpunkt über dem Schriftfeld), mobil nur die Linie. Die Achse,
// an der die Seite fluchtet, ist die Laserachse der Pläne: Sie rückt bei Hover oder Fokus auf die Mitte (K-009 SIG-3).
//
// Wortlaut wörtlich aus `src/app/(bestand)/leistungen/page.jsx` (Hero Header), Lesefolge gleich: Eyebrows → H1 → Absatz → Wege.
// Eyebrows als Kennzeile (K-012 Klasse 3, Wortlaut gleich), je ein Element (Lehre 2). Knöpfe in Bestandsreihenfolge, Ziele gleich
// (`#express-anfrage`, WhatsApp, Telefon aus COMPANY_DATA). `data-hauptaktion`: Der WhatsApp-Kanal weicht dem Einstieg aus
// (Lehre 9); die drei Wege bilden im ersten Bildschirm einen vollständigen Anfrageweg (E-013 Nachtrag).
// Schriftfeld: `SchriftfeldBetrieb` (E-027) – Inhaber, Kammer und Bewertung innerhalb der ersten Bildschirmhöhe (K-002 Aufgabe 2).
// H1-Stufe nach dem längsten Wort (`stufeNachWort`, Ort `einstieg`): kein Wortbruch zwischen 320 und 1920 px.
// Server-Komponente, keine Bewegung (H1 und Absatz sind LCP-Kandidaten und stehen ab dem ersten Bild).
import { COMPANY_DATA } from '@/config/company';
import { Etikett, Fugenkreuz, verbinde } from '@/components/kern/basis';
import { Knopfreihe, SchriftfeldBetrieb, stufeNachWort, UMBRUCH } from '@/components/kern/vorlagen/teile';

const TITEL_ID = 'leistungen-titel';

export default function Einstieg() {
  const { authority, contact } = COMPANY_DATA;
  const stufe = stufeNachWort('Fliesenleger Leistungen & Fachgewerke Wetzlar', 'einstieg', 'text-k-7');
  return (
    <section aria-labelledby={TITEL_ID} data-hauptaktion="" className="pt-k-6 pb-k-7 lg:pb-k-8">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Zeile 1 · Kennzeile: die beiden Eyebrows des Bestands, Fuge darunter über die volle Breite */}
          <ul className="flex flex-wrap gap-x-k-5 gap-y-k-2 border-b border-k-fuge pb-k-3 lg:col-span-12">
            <Etikett als="li" kreuz ton="tinte">
              {authority.shortName} Fachbetrieb
            </Etikett>
            <Etikett als="li">Aßlar &middot; Wetzlar &middot; Mittelhessen</Etikett>
          </ul>

          {/* Zeile 2 · H1 über alle 12 Spalten: ab lg zwei Zeilen (wie im Bestand zweiteilig, ohne Verlaufsschrift) */}
          <h1 id={TITEL_ID} className={verbinde('mt-k-5 k-anzeige text-k-tinte lg:col-span-12 lg:mt-k-6', stufe, UMBRUCH)}>
            <span className="block">Fliesenleger Leistungen &amp;</span>{' '}
            <span className="block">Fachgewerke Wetzlar</span>
          </h1>

          {/* Zeile 3 · Fluchtlinie in Strich, Kreuzpunkt auf der Spaltengrenze 8 | 9 (dekorativ, kein Rot) */}
          <div aria-hidden="true" className="relative mt-k-5 h-px bg-k-strich lg:col-span-12 lg:mt-k-6">
            <span className="absolute top-1/2 left-2/3 hidden -translate-x-1/2 -translate-y-1/2 text-k-tinte lg:flex">
              <Fugenkreuz className="size-k-4" />
            </span>
          </div>

          {/* Zeile 4 links · Vorspann (Sp. 1–8) */}
          <p className="mt-k-5 max-w-(--k-mass) min-w-0 k-text text-k-3 text-k-tinte lg:col-span-8 lg:row-start-4 lg:mt-k-6 lg:pr-k-7">
            Als eingetragener Fliesenleger-Fachbetrieb für Wetzlar, Aßlar und Mittelhessen bieten wir hochwertige Handwerksleistungen:
            Unsere Fachgewerke umfassen fugenarme XXL-Großformate im Badezimmer, repräsentatives Feinsteinzeug im Neubau sowie
            witterungsbeständige Außenbeläge auf Stelzlagern – mit millimetergenauer Präzision, normgerechter Verbundabdichtung nach{' '}
            <span className="k-mono text-k-2 whitespace-nowrap">DIN 18534</span> und konsequentem Staubschutz.
          </p>

          {/* Zeile 5 · Wege über die volle Breite (eine Reihe ab lg), Hauptknopf zuerst */}
          <Knopfreihe
            className="mt-k-6 lg:col-span-12 lg:row-start-5"
            knoepfe={[
              { text: 'Vor-Ort-Aufmaß vereinbaren', href: '#express-anfrage', zeichen: 'pfeil' },
              { text: 'WhatsApp Schnellkontakt', href: contact.whatsappLink, zeichen: 'whatsapp', extern: true },
              { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
            ]}
          />

          {/* Zeile 4 rechts · Schriftfeld (Sp. 9–12), Oberkante an der Fluchtlinie; mobil nach den Wegen */}
          <div className="mt-k-7 min-w-0 lg:col-span-4 lg:col-start-9 lg:row-start-4 lg:mt-k-6 lg:self-start">
            <SchriftfeldBetrieb />
          </div>
        </div>
      </div>
    </section>
  );
}
