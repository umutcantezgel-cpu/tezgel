// Über uns (E3-BAU-08, Vorlage ErzaehlSeite, E-025, K-016 „Ruhe“, E-047): die Seite setzt Vorlage, Inhalt und Metadaten aus
// `src/inhalte/ueber-uns.ts`. Schlitz `momente.beleg`: die gezeichnete Einsatzkarte (großer Moment `karte`, E3-GRAF-09). Schlitz
// `nachTun` (UM-E4-SICHT-FIX M-B7, Nacharbeit SF-B): die Unternehmensgeschichte mit dem Fugenband (`CompanyHistory`, Bestand;
// eigene Überschrift, im Rahmen eines Werkzeug-Abschnitts für den Seitenrand) direkt nach „Was wir tun“ und vor den Werten. Vorher
// stand sie als Werkzeug hinter dem nächsten Schritt, und die Seite endete zweimal. Direkt nach der Lage (`nachLage`) stünde
// ihr Satz zu 2019 als erstes Vorkommen von „Abdichtung“ und „bodengleiche Duschen“ mit beiden Erklärungen bei 35 Wörtern
// (höchstens 25); das bleibt M-C4 mit einer Textentscheidung.
// Danach im selben Schlitz die Werte als Vertrauensliste (UM-E4-EP2, Inhalt `WERTE`); das Qualitätsversprechen kommt aus dem
// Inhalt.
// UM-E4-SICHT-FIX M-C4 (auf V-16 von SF-B; `nachLage` bleibt aus, die Zeitleiste zählt zu den Firmendaten, Textvorschlag T-B6
// offen): unter der Zeitleiste eine Fotoreihe der Arbeitsweise (drei vorhandene Fotos ohne Jahresbezug, Karussell wie die
// Fotoreihen der Vorlagen); das Motto steht nicht mehr als Kasten mitten auf der Seite, sondern als Leitsatz ohne Kasten direkt
// nach den Stimmen (Slot `nachBeleg`, auf der Fläche der Stimmen, deren untere Fuge er übernimmt), vor dem nächsten Schritt.
// Die Werte als Vertrauensliste, die Einsatzkarte mit Namen außerhalb der Ringe und der Ortsliste im Aufklapper (ab lg offen).
// Strukturierte Daten (JSON-LD) bleiben in `layout.tsx`.
import ErzaehlSeite from '@/components/vorlagen/ErzaehlSeite';
import { Werkzeug } from '@/components/vorlagen/ArbeitsSeite';
import Einsatzkarte from '@/components/momente/karte/Einsatzkarte';
import CompanyHistory, { Leitsatz } from '@/components/sections/CompanyHistory';
import Glasbild from '@/components/kern/Glasbild';
import Karussell from '@/components/kern/Karussell';
import { seitenKlassen } from '@/components/kern/stile';
import Werte from '@/components/ueber-uns/Werte';
import { createMetadata } from '@/lib/metadata';
import { ARBEITSWEISE, UEBER_UNS, WERTE } from '@/inhalte/ueber-uns';

// Fotos der Arbeitsweise unter der Zeitleiste: Reihe wie die Fotos im Beleg (Karussell, Glasfläche mit Namen, kein Link). Davor
// eine eigene Zeile (Mikrotext, Nacharbeit SF-C2): Ohne sie hing die Reihe direkt unter der Station „Heute“ und wirkte wie deren
// Bild. „Auf der Baustelle“ statt des Gruppennamens „So arbeiten wir“ der Galerie: Die Seite hat weiter unten „So arbeiten wir mit
// Ihnen.“ als H2, und alle drei Fotos zeigen Arbeit im Gang
const arbeitsweise = (
  <>
    <h3 className="mb-6 text-center font-text text-fs-4 font-semibold text-tinte">Auf der Baustelle</h3>
    <Karussell art="reihe" name="Fotos" karte="w-full md:w-1/2 lg:w-1/3">
      {ARBEITSWEISE.map((f) => (
        <div key={f.bild}>
          <Glasbild arbeit={f.bild} name={f.unterschrift} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
        </div>
      ))}
    </Karussell>
  </>
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
      nachTun={
        <>
          <Werkzeug werkzeug={{ id: 'company-history', titelId: 'company-history-heading', titel: '', inhalt: <CompanyHistory motto={false} unten={arbeitsweise} /> }} />
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
