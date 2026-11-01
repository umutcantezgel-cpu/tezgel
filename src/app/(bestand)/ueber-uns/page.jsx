// Über uns (E3-BAU-08, Vorlage ErzaehlSeite, E-025, K-016 „Ruhe“, E-047): die Seite setzt Vorlage, Inhalt und Metadaten aus
// `src/inhalte/ueber-uns.ts`. Schlitz `momente.beleg`: die gezeichnete Einsatzkarte (großer Moment `karte`, E3-GRAF-09). Schlitz
// `nachTun` (UM-E4-SICHT-FIX M-B7, Nacharbeit SF-B): die Unternehmensgeschichte mit dem Fugenband (`CompanyHistory`, Bestand;
// eigene Überschrift, im Rahmen eines Werkzeug-Abschnitts für den Seitenrand) direkt nach „Was wir tun“ und vor den Werten. Vorher
// stand sie als Werkzeug hinter dem nächsten Schritt, und die Seite endete zweimal. Direkt nach der Lage stünde ihr Satz zu
// 2019 als erstes Vorkommen von „Abdichtung“ und „bodengleiche Duschen“ mit beiden Erklärungen bei 35 Wörtern (höchstens 25);
// das bleibt eine Textentscheidung. Den Slot `nachLage` trägt seit M2-C3 die Fotoreihe der Arbeitsweise (unten).
// Danach im selben Schlitz die Werte als Vertrauensliste (UM-E4-EP2, Inhalt `WERTE`); das Qualitätsversprechen kommt aus dem
// Inhalt.
// UM-E4-SICHT-FIX M-C4 (auf V-16 von SF-B; die Zeitleiste bleibt im Slot nach „Was wir tun“, sie zählt zu den Firmendaten,
// Textvorschlag T-B6 offen): das Motto steht nicht mehr als Kasten mitten auf der Seite, sondern als Leitsatz ohne Kasten direkt
// nach den Stimmen (Slot `nachBeleg`, auf der Fläche der Stimmen, deren untere Fuge er übernimmt), vor dem nächsten Schritt.
// UM-E4-SICHT-FIX-2 M2-C3 Nr. 4 (Sicht E4 Anlauf 2: Person nicht sichtbar, Fotostreifen nur mit kleiner Zwischenzeile unter der
// Zeitleiste): Die Fotoreihe der Arbeitsweise (drei vorhandene Fotos ohne Jahresbezug, Karussell wie die Fotoreihen der Vorlagen)
// steht als eigener Abschnitt direkt nach „Wer kommt in Ihr Haus?“ (Slot `nachLage`, K-009/K-010), Kopf als H2 im Wortlaut der
// bisherigen Zwischenzeile. Fläche Fliese wie die Lage davor (eine Fuge, -mt-px): Auf Kalk stünden Fotos, „Was wir tun“ und die
// Zeitleiste als drei Kalkabschnitte in Folge. Die Zeitleiste steht danach allein. Kein Glossarwort in den Namen der Fotos, die
// Folge der Erklärungen bleibt. Das Motto bleibt viermal (E-113 Nr. 5, Stufe „bestand“).
// Die Werte als Vertrauensliste, die Einsatzkarte mit Namen außerhalb der Ringe und der Ortsliste im Aufklapper (ab lg offen).
// Strukturierte Daten (JSON-LD) bleiben in `layout.tsx`.
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { Werkzeug } from '@/components/vorlagen/ArbeitsSeite';
import Einsatzkarte from '@/components/momente/karte/Einsatzkarte';
import CompanyHistory, { Leitsatz } from '@/components/sections/CompanyHistory';
import Abschnitt from '@/components/kern/Abschnitt';
import Glasbild from '@/components/kern/Glasbild';
import Karussell from '@/components/kern/Karussell';
import { seitenKlassen } from '@/components/kern/stile';
import Werte from '@/components/ueber-uns/Werte';
import { createMetadata } from '@/lib/metadata';
import { ARBEITSWEISE, UEBER_UNS, WERTE } from '@/inhalte/ueber-uns';

// Fotos der Arbeitsweise direkt nach der Lage (M2-C3 Nr. 4): Reihe wie die Fotos im Beleg (Karussell, Glasfläche mit Namen, kein
// Link) als eigener Abschnitt. Kopf „Auf der Baustelle“ (vorher die Zwischenzeile über der Reihe, Mikrotext aus der Nacharbeit
// SF-C2) statt des Gruppennamens „So arbeiten wir“ der Galerie: Die Seite hat weiter unten „So arbeiten wir mit Ihnen.“ als H2,
// und alle drei Fotos zeigen Arbeit im Gang. Kennung `auf-der-baustelle`
const arbeitsweise = (
  <Abschnitt id="auf-der-baustelle" leitachse spaet mitte flaeche="fliese" className="-mt-px" titel="Auf der Baustelle">
    <Karussell art="reihe" name="Fotos" karte="w-full md:w-1/2 lg:w-1/3">
      {ARBEITSWEISE.map((f) => (
        <div key={f.bild}>
          <Glasbild arbeit={f.bild} name={f.unterschrift} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
        </div>
      ))}
    </Karussell>
  </Abschnitt>
);

export const metadata = createMetadata({
  title: UEBER_UNS.meta.titel,
  description: UEBER_UNS.meta.beschreibung,
  path: '/ueber-uns',
});

export default function AboutPage() {
  return (
    <ErzaehlSeite
      inhalt={UEBER_UNS}
      nachLage={arbeitsweise}
      nachTun={
        <>
          <Werkzeug werkzeug={{ id: 'company-history', titelId: 'company-history-heading', titel: '', inhalt: <CompanyHistory motto={false} /> }} />
          <Werte inhalt={WERTE} />
        </>
      }
      // Leitsatz auf der Fläche der Stimmen (Fliese): -mt-px legt ihn über deren untere Fuge, er trägt sie selbst weiter
      nachBeleg={
        <div className="relative -mt-px border-b border-fuge bg-fliese">
          <div className={`${seitenKlassen} pb-16 lg:pb-24`}>
            <Leitsatz />
          </div>
        </div>
      }
      momente={{
        beleg: <Einsatzkarte unterschrift="Von Aßlar aus arbeiten wir in Wetzlar, Gießen und Herborn." verweis={{ name: 'Alle Orte ansehen', href: '/standorte' }} />,
      }}
    />
  );
}
