// Station 1 des Ablaufs auf /bad (P4-08a, KERN v1.2 K-003, K-009 SIG-2): „Unsere Qualitäts-Kategorien im Überblick“ –
// das Konzept wählen. Fliese mit Fugen, Kopf seitlich (ab lg Sp. 1–5), rechts die drei Kategorien als Verzeichnis zwischen
// Fugen, Blattkante in Tinte (Sp. 6–12): je Kategorie eine Zeile mit Stufenname als gerahmtem Etikett (Bestand: Badge,
// Klasse 3, Wortlaut gleich), Überschrift h3, Beschreibung und Weg „Musterbäder ansehen“. Anders gebaut als das
// Leistungsverzeichnis im Einstieg (Zeilen-Links) und als die Formular-Stationen danach: Hier ist der Inhalt Text, die
// Wege sind Pfeillinks. Spalten nach dem Platz des Behälters (ab 36 rem Etikett links, Text rechts).
// Danach der Satz mit der Telefonnummer (Mono, Textlink). Wortlaut aus `src/app/(bestand)/bad/page.jsx` („Quality Tiers“),
// Stufen aus `QUALITY_TIERS`, Name und Nummer aus COMPANY_DATA.
import { COMPANY_DATA } from '@/config/company';
import { QUALITY_TIERS } from '@/config/musterbaeder';
import { Etikett, Textlink, verbinde } from '@/components/kern/basis';
import { Abschnittskopf, Pfeillink, UMBRUCH, stufeFuerAlle } from '@/components/kern/vorlagen/teile';
import Station from '@/components/kern/seiten/bad/Station';

export default function Kategorien() {
  const { owner, contact } = COMPANY_DATA;
  const stufe = stufeFuerAlle(QUALITY_TIERS.map((t) => t.subtitle), 'zeile', 'text-k-5');

  return (
    <Station titelId="bad-tiers-heading" flaeche="fliese">
      <div className="grid grid-cols-1 gap-k-7 lg:grid-cols-12 lg:gap-0">
        <header className="min-w-0 lg:col-span-5 lg:pr-k-7">
          <Abschnittskopf
            etikett="Transparente Standards"
            titel="Unsere Qualitäts-Kategorien im Überblick"
            titelId="bad-tiers-heading"
            einleitung="Wählen Sie das passende Konzept für Ihre Ansprüche – den verbindlichen Festpreis erhalten Sie nach dem kostenfreien Vor-Ort-Aufmaß."
            kopfLage="seitlich"
          />
        </header>

        <div className="min-w-0 lg:col-span-7">
          <div className="@container">
            <ul className="border-t border-k-tinte">
              {QUALITY_TIERS.map((tier) => (
                <li key={tier.name} className="grid grid-cols-1 gap-k-3 border-b border-k-fuge py-k-5 @xl:grid-cols-4 @xl:gap-k-5 @xl:py-k-6">
                  <div className="min-w-0">
                    <Etikett rahmen ton="tinte">
                      {tier.name}
                    </Etikett>
                  </div>
                  <div className="flex min-w-0 flex-col gap-k-3 @xl:col-span-3">
                    <h3 className={verbinde('k-anzeige text-k-tinte', stufe, UMBRUCH)}>{tier.subtitle}</h3>
                    <p className={verbinde('max-w-(--k-mass) k-text text-k-3 text-k-tinte-2', UMBRUCH)}>{tier.description}</p>
                    <Pfeillink href="/bad/musterbaeder" className="w-fit">
                      Musterbäder ansehen
                    </Pfeillink>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-k-6 max-w-(--k-mass) k-text text-k-3 text-k-tinte">
            Fragen zu Ihrem Bad? Rufen Sie {owner.fullName} direkt an:{' '}
            <Textlink href={`tel:${contact.phoneLink}`} className="k-mono whitespace-nowrap">
              {contact.phone}
            </Textlink>
          </p>
        </div>
      </div>
    </Station>
  );
}
