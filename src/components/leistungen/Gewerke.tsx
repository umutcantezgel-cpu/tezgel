// /leistungen · Fachgewerke (F-01, Fusion E-039, KERN v2): Abschnitt `#gewerke` (Sprungziel des Bestands) an der Leitachse,
// darin die vier Fachgewerke als 2×2-Feldraster (Grundgerüst A, Gutachten u1), mobil gestapelt. Keine eigene Überschrift
// (der Bestand hat keine): Der Bereich trägt den vorhandenen Wortlaut „Fachgewerke“ als Namen, die Felder je eine H2,
// der Sprungindex im Einstieg führt hierher.
// Sprungziele: Abschnitt und Felder landen nur über `scroll-padding-top` (K-005) bei 96 px – das scroll-margin des
// Abschnitt-Bausteins ist hier aufgehoben (eine Regel für alle Ziele der Seite, Gutachten u1 Rezept 4).
// Ohne content-visibility (`spaet`): Der Platzhalter verschob beim 200-%-Lauf die Seitenhöhe (Gutachten u1 Rezept 9).
import { SERVICES } from '@/config/services';
import Abschnitt from '@/components/kern/Abschnitt';
import { Feldraster } from '@/components/kern/Feldraster';
import Gewerk from '@/components/leistungen/Gewerk';

export default function Gewerke() {
  return (
    <Abschnitt id="gewerke" art="erzaehl" leitachse aria-label="Fachgewerke" className="scroll-mt-0!">
      <Feldraster spalten={2} als="div">
        {SERVICES.map((leistung, nr) => (
          <Gewerk key={leistung.id} leistung={leistung} nr={nr} />
        ))}
      </Feldraster>
    </Abschnitt>
  );
}
