// Städteregister der Seite `/standorte` (P4-08c, KERN v1.2 K-003 „Fuge statt Karte“, K-005, K-011): „Wählen Sie Ihre Stadt
// oder Gemeinde“. Statt des Kartenrasters mit 13 Glas-Kacheln (Bestand) ein Register: eine Zeile je Stadt zwischen 1-px-Fugen,
// Blattkante oben in Tinte. Je Zeile in Lesefolge des Bestands: Kopfzeile in Mono (Region und Entfernung, zwei Elemente in
// einer Zeile wie im Bestand), Stadtname, Beschreibung, Weg „Fliesenleger in …“ (genau ein Link je Stadt, Pfeillink 48 px).
// Ab md (8 Spalten): Name 1–3, Beschreibung 4–8, Weg darunter; ab lg (12): Name 1–4, Beschreibung 5–9, Weg 10–12 rechts bündig.
// Entfernungen wörtlich wie im Bestand (ab Wetzlar, `entfernung` in `daten.ts`). Server-Komponente, ohne Bewegung.
import { CITIES } from '@/config/cities';
import { Etikett, verbinde } from '@/components/kern/basis';
import { Pfeillink, UMBRUCH, kopfStufe, stufeFuerAlle } from '@/components/kern/vorlagen/teile';
import { entfernung } from './daten';

const TITEL = 'Wählen Sie Ihre Stadt oder Gemeinde';

export default function Register() {
  const namenStufe = stufeFuerAlle(CITIES.map((stadt) => stadt.name), 'zeile', 'text-k-5');
  return (
    <section aria-labelledby="staedte-titel" className="py-k-9 lg:py-k-10">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <header className="max-w-(--k-mass)">
          <Etikett kreuz>{CITIES.length} Städte &amp; Gemeinden</Etikett>
          <h2 id="staedte-titel" className={verbinde('mt-k-4 k-anzeige text-k-tinte', kopfStufe(TITEL), UMBRUCH)}>
            {TITEL}
          </h2>
          <p className="mt-k-5 k-text text-k-4 text-k-tinte-2">
            Klicken Sie auf Ihren Wohnort, um mehr über unsere Fliesen- und Badleistungen und den Ablauf vor Ort zu erfahren.
            Entfernungen sind ungefähre Angaben ab Wetzlar.
          </p>
        </header>

        <ul className="mt-k-8 border-t border-k-tinte">
          {CITIES.map((stadt) => (
            <li key={stadt.slug} className="grid grid-cols-1 gap-k-3 border-b border-k-fuge py-k-5 md:grid-cols-8 md:gap-y-k-4 lg:grid-cols-12 lg:gap-0 lg:py-k-6">
              <div className="flex min-w-0 flex-col gap-k-2 md:col-span-3 md:pr-k-5 lg:col-span-4 lg:pr-k-6">
                <div className="flex flex-wrap gap-x-k-4 gap-y-k-1 k-mono text-k-1">
                  <span className={verbinde('text-k-tinte', UMBRUCH)}>{stadt.region}</span>
                  <span className={verbinde('text-k-tinte-2', UMBRUCH)}>{entfernung(stadt)}</span>
                </div>
                <p className={verbinde('k-anzeige text-k-tinte', namenStufe, UMBRUCH)}>{stadt.name}</p>
              </div>
              <p className={verbinde('max-w-(--k-mass) k-text text-k-3 text-k-tinte-2 md:col-span-5 lg:pr-k-6', UMBRUCH)}>{stadt.description}</p>
              <div className="min-w-0 md:col-span-8 lg:col-span-3 lg:flex lg:items-start lg:justify-end">
                <Pfeillink href={`/standorte/${stadt.slug}`}>Fliesenleger in {stadt.name}</Pfeillink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
