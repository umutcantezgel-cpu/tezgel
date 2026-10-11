'use client';

// Fliesen-Konfigurator in vier Schritten (F-06, P4-05b, KERN v1.2): Raum & Einsatzbereich → Untergrund & Bestand →
// Format, Material & Menge (Richtwert m² + Verschnitt, Treppe) → Zusammenfassung & Kontakt (online oder per WhatsApp).
// Logik unverändert aus `useFliesenKonfigurator` (G9), dieselbe wie im Bestand `src/components/funnels/FliesenKonfigurator.jsx`;
// die Ansicht liegt in `formulare/d/`. Client-Insel für die Kern-Fliesenseiten. Vorgaben wie im Bestand (alle optional,
// serialisierbar von einer Server-Seite): area, substrate, format, material, floorHeating.
import { useFliesenKonfigurator, type FliesenVorgaben } from '@/lib/formulare/useFliesenKonfigurator';
import KonfiguratorAnsicht from '@/components/kern/formulare/d/KonfiguratorAnsicht';

export default function Konfigurator({ area, substrate, format, material, floorHeating }: FliesenVorgaben = {}) {
  const konfigurator = useFliesenKonfigurator({ area, substrate, format, material, floorHeating });
  return <KonfiguratorAnsicht konfigurator={konfigurator} />;
}
