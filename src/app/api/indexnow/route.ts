import { NextRequest, NextResponse } from 'next/server';
import {
  submitToIndexNow,
  getAllSiteUrls,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
} from '@/lib/seo/indexnow';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let body: { urls?: string[]; secret?: string } = {};
    try {
      body = await req.json();
    } catch {
      // Body is optional
    }

    // Optional protection: if INDEXNOW_SECRET is configured, require it
    const requiredSecret = process.env.INDEXNOW_SECRET;
    if (requiredSecret && body.secret !== requiredSecret) {
      return NextResponse.json({ error: 'Unauthorized: Invalid secret' }, { status: 401 });
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
