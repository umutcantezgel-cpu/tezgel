import { NextResponse, type NextRequest } from 'next/server';
import { istEntfernt, SEITE_ENTFERNT } from '@/lib/wege';

// 410 für Adressen der Vorgängerfirma (P4-07, V-04). Der `matcher` ist eng: Nur diese Adressen laufen überhaupt durch
// den Proxy; alle Seiten von Tezgel, `_next`, Bilder und `/api` nie (Test: `_relaunch/werkzeuge/wege.mjs`).
// Die Funktion prüft zusätzlich exakt (`istEntfernt`), weil `matcher`-Muster auch längere Pfade treffen können.
// Liste wie `ENTFERNTE_BEREICHE` und `ENTFERNTE_SEITEN` in `src/lib/wege.ts` – hier als Literale (statische Analyse).
export function proxy(request: NextRequest) {
  if (!istEntfernt(request.nextUrl.pathname)) return NextResponse.next();
  return new NextResponse(request.method === 'HEAD' ? null : SEITE_ENTFERNT, {
    status: 410,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
      'cache-control': 'public, max-age=3600',
    },
  });
}

export const config = {
  matcher: [
    '/energie/:pfad*',
    '/energieberatung/:pfad*',
    '/gewerbe/:pfad*',
    '/haustechnik/:pfad*',
    '/heizung/:pfad*',
    '/lueftung/:pfad*',
    '/notdienst/:pfad*',
    '/blog/waermepumpen-foerderung-2024',
    '/blog/wasserschaden-vermeiden-tipps',
    '/blog/solarthermie-vs-photovoltaik-vergleich',
    '/blog/heizungswartung-pflicht-oder-kuer',
    '/blog/smart-home-heizungssteuerung-nachruesten',
    '/blog/heizkoerper-richtig-entlueften',
    '/blog/legionellen-trinkwasser-vermeiden',
    '/blog/klimaanlage-reinigen-allergiker',
    '/blog/solarpflicht-deutschland-hausbesitzer',
    '/blog/waermepumpen-mythen-faktencheck',
    '/blog/smart-bad-wellness-hightech',
    '/blog/team-verstaerkung-gesucht-jobs',
    '/referenzen/project-001',
    '/referenzen/project-002',
    '/referenzen/project-003',
    '/referenzen/project-004',
    '/referenzen/project-005',
    '/referenzen/project-006',
  ],
};
