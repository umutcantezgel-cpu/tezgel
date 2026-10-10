import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden (404) | Fliesenverlegung Tezgel',
  description: 'Die angeforderte Seite konnte leider nicht gefunden werden. Nutzen Sie unsere Übersicht zu Fliesenverlegung & Badsanierung in Aßlar & Wetzlar.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-4 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="eyebrow eyebrow-orange">Fehler 404</span>
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Seite nicht gefunden
        </h1>
        <p className="text-base text-neutral-700 leading-relaxed">
          Die von Ihnen aufgerufene Seite existiert leider nicht oder wurde verschoben.
          Kehren Sie zur Startseite zurück oder informieren Sie sich über unsere Fachleistungen.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4 mr-2" />
            Zur Startseite
          </Link>
          <Link href="/leistungen" className="btn-ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zur Leistungsübersicht
          </Link>
        </div>
      </div>
    </div>
  );
}
