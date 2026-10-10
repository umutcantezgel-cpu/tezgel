import Einstieg from '@/components/kern/start/einstieg-a/Einstieg';
import { FlaechePlatzhalter, FormularPlatzhalter } from '@/components/kern/start/einstieg-a/Platzhalter';

// Vorschau P3-09a (wird nie freigeschaltet): Einstieg der Startseite, Variante A „Achse über der Seite“, mit markiertem
// Formularplatz (P3-13) und darunter einer markierten Fläche. Kein eigenes IconSprite – das Kern-Layout rendert es.
// SIG-1 läuft beim Laden nur mit html.k-bewegung (Kopfskript); reduzierte Bewegung zeigt den Endzustand sofort.
export default function VorschauEinstiegA() {
  return (
    <>
      <Einstieg formular={<FormularPlatzhalter />} />
      <FlaechePlatzhalter />
    </>
  );
}
