// Stationen 2 und 3 des Ablaufs auf /bad (P4-08a, KERN v1.2 K-009 SIG-2, K-011): das Projekt beschreiben und anfragen.
// Die Kern-Inseln tragen F-05 (`ProjektCheck`, Abschnitt `#projekt-check`) und F-04 (`Badanfrage`, Abschnitt `#anfrage`)
// unverändert; Anker und Namen der Abschnitte wie im Bestand (`aria-label` „Bad-Projektcheck“ bzw. „Badanfrage“), ihre
// Überschriften stehen in den Inseln. Die Schrittfuge der Station setzt Fugenkreuz und Prüfhaken direkt über deren Kopf.
// Unterschied der beiden Stationen: Der Projektcheck nimmt die volle Breite (ab 64 rem Behälter stehen Zusammenfassung und
// Anfrage nebeneinander), die Badanfrage ist ein Schritt-Formular mit einer Frage je Schritt und steht ab lg in zwei
// Dritteln der Breite an der Flucht links – kurze Zeilen, ein Formular je Bildschirm (K-011).
// Server-Komponenten; die Inseln sind Client-Komponenten.
import ProjektCheck from '@/components/kern/formulare/ProjektCheck';
import Badanfrage from '@/components/kern/formulare/Badanfrage';
import Station from '@/components/kern/seiten/bad/Station';

export function ProjektCheckStation() {
  return (
    <Station id="projekt-check" ariaLabel="Bad-Projektcheck">
      <ProjektCheck />
    </Station>
  );
}

export function AnfrageStation() {
  return (
    <Station id="anfrage" ariaLabel="Badanfrage">
      <div className="min-w-0 lg:w-2/3">
        <Badanfrage />
      </div>
    </Station>
  );
}
