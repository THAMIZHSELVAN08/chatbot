import { NextResponse } from 'next/server';
import { schemes } from '@/lib/schemes';

type LiveSchemesResponse = {
  source: 'live' | 'local';
  lastUpdated: string | null;
  records: unknown[];
};

// GET /api/live-schemes
// Fetches live welfare schemes from data.gov.in with daily caching.
// Falls back to the local schemes.json dataset if the live API is unavailable
// or not configured.
export async function GET() {
  const apiKey = process.env.DATA_GOV_IN_API_KEY;
  const resourceId = process.env.DATA_GOV_IN_RESOURCE_ID;

  // If not configured, serve the bundled local dataset.
  if (!apiKey || !resourceId) {
    return NextResponse.json<LiveSchemesResponse>({
      source: 'local',
      lastUpdated: null,
      records: schemes,
    });
  }

  const url = new URL(
    `https://api.data.gov.in/resource/${resourceId}`
  );
  url.searchParams.set('api-key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1000');

  try {
    const res = await fetch(url.toString(), {
      // Cache on the Next.js data cache for 24 hours
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      throw new Error(`data.gov.in error: ${res.status}`);
    }

    const data = await res.json();
    const records: unknown[] = data.records ?? data.result ?? [];
    const lastUpdated: string | null =
      (data.last_updated as string | undefined) ?? new Date().toISOString();

    return NextResponse.json<LiveSchemesResponse>({
      source: 'live',
      lastUpdated,
      records,
    });
  } catch (error) {
    console.error('Live schemes API error:', error);

    // Graceful fallback to local static JSON
    return NextResponse.json<LiveSchemesResponse>({
      source: 'local',
      lastUpdated: null,
      records: schemes,
    });
  }
}

