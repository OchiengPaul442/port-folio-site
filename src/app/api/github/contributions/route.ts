import { NextResponse } from 'next/server';

interface UpstreamContribution {
  date: string;
  count: number;
  level?: number;
}

export const revalidate = 86400;

export async function GET(request: Request) {
  const yearValue = new URL(request.url).searchParams.get('year');
  const year = Number(yearValue);
  const currentYear = new Date().getUTCFullYear();

  if (!Number.isInteger(year) || year < 2012 || year > currentYear) {
    return NextResponse.json({ error: 'Invalid contribution year.' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/OchiengPaul442?y=${year}`,
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'GitHub contribution data is unavailable.' }, { status: 502 });
    }

    const payload = await response.json() as { total?: number | Record<string, number>; contributions?: UpstreamContribution[] };
    const total = typeof payload.total === 'number'
      ? payload.total
      : payload.total?.[String(year)] ?? 0;

    return NextResponse.json(
      {
        year,
        total,
        contributions: (payload.contributions ?? []).map((day) => ({
          date: day.date,
          count: Number(day.count) || 0,
          level: Math.max(0, Math.min(4, Number(day.level) || 0)),
        })),
      },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } }
    );
  } catch {
    return NextResponse.json({ error: 'GitHub contribution data is unavailable.' }, { status: 502 });
  }
}
