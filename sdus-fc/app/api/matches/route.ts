import { getMatches } from '@/lib/matches-server';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET() {
  const feed = await getMatches();
  return Response.json(feed, {
    status: feed.state === 'unavailable' ? 503 : 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}
