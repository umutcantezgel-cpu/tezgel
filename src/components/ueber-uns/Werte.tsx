// Über uns · Werte (KERN K-003 „Fuge statt Karte“, K-009 Feldraster): „Unsere Werte im Handwerk“ auf der Fläche Fliese,
// die sechs Werte als Feldraster mit 1-px-Fugen – drei Spalten ab lg, zwei auf dem Tablett, eine mobil. Je Feld ein
// Zeichen aus der eigenen Icon-Familie (statt des lucide-Icons aus `values`), Titel als H3, Beschreibung.
// Bewusst anders gebaut als das Qualitätsversprechen darunter (nummerierte Merkliste in vier Spalten): Zeichen statt
// Nummer, drei Spalten, Fliese statt Kalk. Kein Hover-Heben, kein Auftritt (die Geschichte danach trägt ihn).
// Wortlaut aus `values` (`@/config/company`, Single Source); `value.icon` wird nicht gerendert.
import { values } from '@/config/company';
import Abschnitt from '@/components/kern/Abschnitt';
import { Feldraster, Feld } from '@/components/kern/Feldraster';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Icon, { type IconName } from '@/components/icons/Icon';

// Zuordnung nach Titel (Auftrag S-02): Stichwort im Titel → Zeichen der Familie
const ZEICHEN: ReadonlyArray<[string, IconName]> = [
  ['HWK', 'haken'],
  ['DIN 18534', 'abdichtung'],
  ['Staubschutz', 'haus'],
  ['Termintreue', 'uhr'],
  ['Großformat', 'grossformat'],
  ['Kundenbegeisterung', 'stern'],
];

const zeichenFuer = (titel: string) => ZEICHEN.find(([stichwort]) => titel.includes(stichwort))?.[1];

export default function Werte() {
  return (
    <Abschnitt id="werte" titelId="werte-heading" flaeche="fliese" etikett="Wofür wir stehen" titel="Unsere Werte im Handwerk">
      <Feldraster spalten={3}>
        {values.map((wert) => {
          const zeichen = zeichenFuer(wert.title);
          return (
            <Feld key={wert.title}>
              <span aria-hidden="true" className="flex size-6 items-center justify-center text-tinte">
                {zeichen ? <Icon name={zeichen} groesse={6} /> : <Fugenkreuz className="size-3 text-strich" />}
              </span>
              <h3 className="mt-6 text-fs-4 text-tinte">{wert.title}</h3>
              <p className="mt-2 max-w-mass text-fs-2 text-tinte-2">{wert.description}</p>
            </Feld>
          );
        })}
      </Feldraster>
    </Abschnitt>
  );
}
