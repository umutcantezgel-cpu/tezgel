import type { Metadata } from 'next';
import Einstieg from '@/components/kern/Einstieg';
import Knopf from '@/components/kern/Knopf';
import Verlegeplan from '@/components/kern/Verlegeplan';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden (404) | Fliesenverlegung Tezgel',
  description: 'Die angeforderte Seite konnte leider nicht gefunden werden. Nutzen Sie unsere Übersicht zu Fliesenverlegung & Badsanierung in Aßlar & Wetzlar.',
  robots: {
    index: false,
    follow: true,
  },
};

// 404 (KERN K-009): Arbeitsansicht mit dem Verlegeplan, in dem eine Fliese fehlt; Texte und Wege wie im Bestand.
export default function NotFound() {
  return (
    <Einstieg
      art="arbeit"
      etikett="Fehler 404"
      titel="Seite nicht gefunden"
      vorspann={
        <p>
          Die von Ihnen aufgerufene Seite existiert leider nicht oder wurde verschoben.
          Kehren Sie zur Startseite zurück oder informieren Sie sich über unsere Fachleistungen.
        </p>
      }
      aktionen={
        <>
          <Knopf href="/" iconLinks="haus">Zur Startseite</Knopf>
          <Knopf href="/leistungen" variante="neben" iconLinks="pfeil-links">Zur Leistungsübersicht</Knopf>
        </>
      }
      rand={
        <div className="border border-fuge bg-fliese p-6">
          <Verlegeplan plan="reparatur" beschriftet />
        </div>
      }
    />
  );
}
