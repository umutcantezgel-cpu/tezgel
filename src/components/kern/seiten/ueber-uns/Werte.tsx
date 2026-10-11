// Über uns · Werte (P4-08e, KERN v1.2 K-003 Nr. 5 „Fuge statt Karte“, K-011): „Unsere Werte im Handwerk“ und die drei Wege
// des Bestands darunter (Aufmaß, Telefon, Firmensitz).
// Struktur – bewusst anders als der Abschnitt davor (Text + Schriftfeld) und danach (Zeitachse): Fläche Fliese mit Fugen oben
// und unten, Kopf seitlich (ab lg Sp. 1–5), rechts die sechs Werte als Zeilen zwischen 1-px-Fugen, ab Behälterbreite 36rem in
// zwei Spalten (Halbverband der Zeilen: jede Spalte hat ihre eigenen Fugen). Fugenkreuz statt Icon-Kachel (S-04, S-11), kein
// Hover-Heben, keine Schatten. Titelstufe nach dem längsten Titel („Kundenbegeisterung“, Ort `feld`).
// Wege als Knopfreihe (Hauptknopf zuerst, Telefon in Mono, Firmensitz mit Ort-Zeichen, öffnet wie im Bestand in neuem Fenster).
// Auftritt: die Werteliste rückt beim Erreichen in die Flucht (Register `auftritt`; 2 von 6 Abschnitten, K-009).
// Wortlaut wörtlich: Kopf aus `src/app/(bestand)/ueber-uns/page.jsx`, Werte aus `values` (`@/config/company`, Single Source).
import { Fugenkreuz, verbinde } from '@/components/kern/basis';
import Abschnitt from '@/components/kern/vorlagen/teile/Abschnitt';
import Knopfreihe from '@/components/kern/vorlagen/teile/Knopfreihe';
import { stufeFuerAlle } from '@/components/kern/vorlagen/teile/satz';
import { UMBRUCH } from '@/components/kern/vorlagen/teile/typen';
import { COMPANY_DATA, values } from '@/config/company';

type Wert = { title: string; description: string };

export default function Werte() {
  const { contact, headquarters } = COMPANY_DATA;
  const werte: readonly Wert[] = values;
  const titelStufe = stufeFuerAlle(werte.map((w) => w.title), 'feld', 'text-k-4');
  return (
    <Abschnitt
      etikett="Wofür wir stehen"
      titel="Unsere Werte im Handwerk"
      kopfLage="seitlich"
      flaeche="fliese"
      dichte="weit"
      auftritt
    >
      <div className="@container">
        <ul className="grid grid-cols-1 gap-x-k-7 @xl:grid-cols-2">
          {werte.map((wert) => (
            <li key={wert.title} className="flex min-w-0 items-start gap-k-3 border-t border-k-fuge py-k-5 first:border-k-strich @xl:nth-2:border-k-strich">
              <span aria-hidden="true" className={verbinde('flex h-lh shrink-0 items-center text-k-strich', titelStufe)}>
                <Fugenkreuz className="size-k-3" />
              </span>
              <div className="min-w-0">
                <h3 className={verbinde('k-anzeige text-k-tinte', titelStufe, UMBRUCH)}>{wert.title}</h3>
                <p className={verbinde('mt-k-2 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2', UMBRUCH)}>{wert.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Knopfreihe
        className="mt-k-7 border-t border-k-strich pt-k-6"
        knoepfe={[
          { text: 'Vor-Ort-Aufmaß vereinbaren', href: '/kontakt', zeichen: 'pfeil' },
          { text: contact.phone, href: `tel:${contact.phoneLink}`, zeichen: 'telefon', mono: true },
          { text: `${headquarters.street}, ${headquarters.city}`, href: headquarters.mapsUrl, zeichen: 'ort', extern: true },
        ]}
      />
    </Abschnitt>
  );
}
