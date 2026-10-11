// Vorschau P4-08c (wird nie freigeschaltet und von keiner Seite eingebunden): die ganze Seite `/standorte` ohne Kartenaufruf,
// dazu die drei Zustände des Kartenplatzhalters (vor dem Mount · Frage · Karte). Statt der Karte steht ein beschrifteter
// Rahmen, damit kein Karten-Host angefragt wird. Einbinden: `src/app/(kern)/_entwurf/p4-08c/page.tsx` mit
// `export { default } from '@/components/kern/seiten/standorte/Vorschau';` (Schreibrecht des Orchestrators).
// Die Ladebox „Karte wird geladen...“ (vor dem Blick) zeigt die echte Seite `_entwurf/standorte` beim ersten Bild.
import { KartenPlatzhalterAnsicht } from '@/components/kern/einwilligung/KartenPlatzhalter';
import { AbschlussAnsicht } from '@/components/kern/start/Abschluss';
import { Feldraster, Rasterfeld } from '@/components/kern/basis';
import { VorschauPlatzhalter, VorschauTrenner } from '@/components/kern/vorlagen/teile/Vorschau';
import Kopfblatt from './Kopfblatt';
import Register from './Register';
import { Ansprechpartner, Hauptstandort, LeistungenVorOrt, WeitereOrte } from './Abschnitte';

function Rahmen({ name }: { name: string }) {
  return <VorschauPlatzhalter>{name}</VorschauPlatzhalter>;
}

function Platzhalter({ zustand }: { zustand: 'laedt' | 'frage' | 'karte' }) {
  return (
    <KartenPlatzhalterAnsicht zustand={zustand}>
      <Rahmen name="Karte (Vorschau, kein Kartenaufruf)" />
    </KartenPlatzhalterAnsicht>
  );
}

export default function VorschauP408c() {
  return (
    <>
      <VorschauTrenner hinweis="Kopfblatt: Einstieg und Einsatzgebiet, Karte im Zustand Frage (ohne Einwilligung)">/standorte · Kopfblatt</VorschauTrenner>
      <Kopfblatt karte={<Platzhalter zustand="frage" />} />

      <VorschauTrenner hinweis="KartenPlatzhalter (P3-08) in der Breite der Spalten: vor dem Mount · Frage · Karte">Zustände der Karte</VorschauTrenner>
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand) py-k-7">
        <Feldraster>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 4 }} innen="eng">
            <Platzhalter zustand="laedt" />
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 4 }} innen="eng">
            <Platzhalter zustand="frage" />
          </Rasterfeld>
          <Rasterfeld breite={{ mobil: 4, tablett: 8, desktop: 4 }} innen="eng">
            <Platzhalter zustand="karte" />
          </Rasterfeld>
        </Feldraster>
      </div>

      <VorschauTrenner>/standorte · Städte</VorschauTrenner>
      <Register />
      <LeistungenVorOrt />
      <WeitereOrte />
      <VorschauTrenner hinweis="Karte des Firmensitzes im Zustand Karte (Rahmen statt iframe)">/standorte · Hauptstandort</VorschauTrenner>
      <Hauptstandort karte={<Platzhalter zustand="karte" />} />
      <Ansprechpartner ort="Mittelhessen & Lahn-Dill-Kreis" />
      <VorschauTrenner hinweis="Standardwert des Bestands (cityName = Aßlar & Wetzlar), wie ihn die Standortseiten überschreiben">Ansprechpartner · Standard</VorschauTrenner>
      <Ansprechpartner />
      <AbschlussAnsicht
        headline="Planen Sie ein Fliesen- oder Badprojekt in Mittelhessen? Sprechen Sie direkt mit Fachbetriebsleiter Deniz Tezgel."
        subtitle="Kostenfreies Vor-Ort-Aufmaß • Feste Terminabsprachen • HWK-Fachbetrieb"
        buttonText="Jetzt Vor-Ort-Termin anfragen"
      />
    </>
  );
}
