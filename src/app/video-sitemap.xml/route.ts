import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Video-Sitemap ohne Einträge (UM-E4-VIDEO, G4).
//
// Entfernt sind beide Einträge, weil jeder auf eine Datei zeigte, die es nicht gibt:
//   - Startseite: player_loc /videos/handwerk.mp4
//   - /bad/barrierefreies-bad: player_loc /videos/din18534.mp4
// Der Ordner public/videos fehlt und steht in keinem Stand des Git-Verlaufs (Kundschafter E0-KUND-06, LAGEBILD). Die beiden
// Vorschaubilder gehörten zu den Generatorbildern aus public/images/bad/ (E-013). Ein Eintrag mit toter Videoadresse nützt keiner
// Suchmaschine und behauptet ein Video, das Besucher nicht sehen können.
//
// Ein gleichwertiger Ersatz besteht nicht: Die Seite zeigt kein Video. Die Adresse /video-sitemap.xml bleibt erreichbar (Status
// 200, wohlgeformtes, leeres `urlset`), damit keine Adresse verloren geht (G4). Streng nach dem Schema der Sitemaps verlangt ein
// `urlset` mindestens ein `url`; die Antwort ist deshalb wohlgeformt, aber kein Schema-gültiger Inhalt (Entscheidung des
// Orchestrators: Adresse behalten). Sie steht weder in robots.ts noch in sitemap.ts.
//
// Kommt ein echtes Video auf eine Seite, gehört sein Eintrag hierher, mit einer Adresse, die antwortet: `url` mit `loc` der
// Seite und `video:video` mit thumbnail_loc, title, description und content_loc oder player_loc, so wie die Seite es zeigt.
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`;

export async function GET() {
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
