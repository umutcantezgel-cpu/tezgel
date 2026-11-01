import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  submitToIndexNow,
  getAllSiteUrls,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
} from '@/lib/seo/indexnow';

export const dynamic = 'force-dynamic';

/** Vergleich in konstanter Zeit (gleich lange Puffer), damit die Antwortzeit nichts über das Secret verrät */
function gleich(angabe: unknown, secret: string): boolean {
  if (typeof angabe !== 'string') return false;
  const a = Buffer.from(angabe);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  try {
    let body: { urls?: string[]; secret?: string } = {};
    try {
      const gelesen = await req.json();
      if (gelesen && typeof gelesen === 'object' && !Array.isArray(gelesen)) body = gelesen;
    } catch {
      // Body is optional
    }

    // SEO-Runde T12 (docs/seo/KONTEXT.md, Abschnitt 5): Ohne gesetztes INDEXNOW_SECRET ist die Meldung gesperrt (403).
    // Vorher war die Route dann für jeden offen und meldete auf Zuruf alle Adressen an IndexNow.
    const requiredSecret = process.env.INDEXNOW_SECRET;
    if (!requiredSecret) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: INDEXNOW_SECRET is not configured' },
        { status: 403 }
      );
    }
    if (!gleich(body.secret, requiredSecret)) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid secret' }, { status: 401 });
    }

    const result = await submitToIndexNow(body.urls);
    return NextResponse.json(result, { status: result.success ? 200 : result.status || 500 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit URLs to IndexNow',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const allUrls = getAllSiteUrls();
  return NextResponse.json({
    status: 'IndexNow integration active',
    host: INDEXNOW_HOST,
    keyConfigured: Boolean(INDEXNOW_KEY),
    keyLocation: INDEXNOW_KEY_LOCATION,
    totalUrls: allUrls.length,
    sampleUrls: allUrls.slice(0, 5),
  });
}
