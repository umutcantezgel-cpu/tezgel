'use client';

// Express-Anfrage in drei Schritten (F-03, P3-13b, KERN v1.2): Projekt → Fläche, Zeitraum & Ort → Kontakt und Absenden
// (online oder per WhatsApp). Logik unverändert aus `useAnfrageFunnel` (G9); die Ansicht liegt in `formulare/b/`.
// Client-Insel im Abschnitt `#express-anfrage` (`@/components/kern/start/Anfrage`).
import { useAnfrageFunnel } from '@/lib/formulare/useAnfrageFunnel';
import AnfrageFunnelAnsicht from '@/components/kern/formulare/b/AnfrageFunnelAnsicht';

export default function AnfrageFunnel() {
  const funnel = useAnfrageFunnel();
  return <AnfrageFunnelAnsicht funnel={funnel} />;
}
