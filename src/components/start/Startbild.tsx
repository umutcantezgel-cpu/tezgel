// Startbild der Startseite (Bildplatz start-dusche): das echte Foto der Dusche ohne Stufe, im mittigen Einstieg das
// LCP-Element und darum mit hoher Ladepriorität (`lcp`, E-061). Seit dem Eingang ohne Vorhang (E-067-4, UM-E3-EIN) liegt kein
// Belag mehr darüber: Das Foto ist ab dem ersten Bild sichtbar, auch beim ersten Aufruf, nie verdeckt und nie mit Deckkraft 0.
// Begleitet wird es im Eingang nur vom Fugenriss an der Oberkante (Bildplatz in vorlagen/teile/EinstiegMitte.tsx,
// bewegung.css „eingang“). Die Kennung `startbild` bleibt als Alias von `eingang` im Register. Serverkomponente.
import Bildfeld from '@/components/kern/Bildfeld';

export default function Startbild({ sizes, lcp = false }: { sizes: string; lcp?: boolean }) {
  return <Bildfeld arbeit="start-dusche" lcp={lcp} sizes={sizes} />;
}
