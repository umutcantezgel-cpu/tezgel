import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/shared/config/site';

export const dynamic = 'force-static';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${SITE_CONFIG.baseUrl}/</loc>
    <video:video>
      <video:thumbnail_loc>${SITE_CONFIG.baseUrl}/images/bad/walk-in-dusche.webp</video:thumbnail_loc>
      <video:title>Handwerkliche Präzision: Großformatfliesen &amp; Badsanierung Tezgel</video:title>
      <video:description>Exklusive Fliesenverlegung und barrierefreie Badsanierung von Fachbetrieb Fliesenverlegung Tezgel in Aßlar und Wetzlar.</video:description>
      <video:player_loc>${SITE_CONFIG.baseUrl}/videos/handwerk.mp4</video:player_loc>
      <video:duration>45</video:duration>
      <video:publication_date>2025-01-15T08:00:00+01:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${SITE_CONFIG.baseUrl}">${SITE_CONFIG.companyName}</video:uploader>
    </video:video>
  </url>
  <url>
    <loc>${SITE_CONFIG.baseUrl}/bad/barrierefreies-bad</loc>
    <video:video>
      <video:thumbnail_loc>${SITE_CONFIG.baseUrl}/images/bad/barrierefreies-bad-holz.webp</video:thumbnail_loc>
      <video:title>Barrierefreie Walk-In Dusche mit DIN 18534 Verbundabdichtung</video:title>
      <video:description>Schritt-für-Schritt Einbau einer bodengleichen Dusche mit normgerechter Verbundabdichtung nach DIN 18534 in Mittelhessen.</video:description>
      <video:player_loc>${SITE_CONFIG.baseUrl}/videos/din18534.mp4</video:player_loc>
      <video:duration>60</video:duration>
      <video:publication_date>2025-02-10T09:30:00+01:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${SITE_CONFIG.baseUrl}">${SITE_CONFIG.companyName}</video:uploader>
    </video:video>
  </url>
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
