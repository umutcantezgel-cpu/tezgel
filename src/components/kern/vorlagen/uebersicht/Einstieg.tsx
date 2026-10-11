// Übersicht · Einstieg (P4-02): Cluster-Hubs wie `/bad`, `/fliesen`, `/leistungen`, `/standorte` und die Hubs der Fachthemen.
// Seit P4-10a der gemeinsame `teile/Einstieg` in der Variante `achse="lot"` (H1 links bündig in Sp. 1–8, Achse als Lot an der
// Spaltengrenze, Randspalte Sp. 9–12 für Motiv oder Schriftfeld). Früher `text` → `vorspann`, `aktionen` → `knoepfe`,
// `rand` → `motiv`.
import Gemeinsam, { type EinstiegProps } from '@/components/kern/vorlagen/teile/Einstieg';

export type { EinstiegProps };

export default function Einstieg(props: EinstiegProps) {
  return <Gemeinsam achse="lot" {...props} />;
}
