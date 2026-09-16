'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMatches, filterMatchesByCategory } from '@/lib/matches';
import { currentSeason, isMatchesFeed, toMatchesFeed, type MatchesFeed } from '@/lib/matches-feed';
import type { MatchCategory } from '@/lib/types';

const CACHE_KEY = 'ufsd_matches_v2';

function readBackup(): MatchesFeed | null {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (!isMatchesFeed(data) || data.season !== currentSeason() || !data.fetchedAt) return null;
    // Reclassify dates on every read, even if the visitor returns days later.
    return { ...toMatchesFeed({ version: 1, season: data.season, fetchedAt: data.fetchedAt,
      teamCount: data.teamCount, matches: [...data.upcoming, ...data.results, ...data.pending] }), state: 'cached' };
  } catch { return null; }
}

export function useMatches(category: MatchCategory | 'Tous' = 'Tous') {
  const [feed, setFeed] = useState<MatchesFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(() => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    return fetchMatches(request.signal).then((data) => {
      if (request.signal.aborted) return;
      const cached = readBackup();
      const chosen = data.state === 'backup' && cached?.fetchedAt && data.fetchedAt
        && cached.fetchedAt > data.fetchedAt ? cached : data;
      setFeed(chosen);
      setError(null);
      try {
        localStorage.removeItem('sdus_matches_cache');
        localStorage.setItem(CACHE_KEY, JSON.stringify(chosen));
      } catch { /* Private browsing / quota: the server cache still works. */ }
    }).catch(() => {
      if (request.signal.aborted) return;
      const cached = readBackup();
      setFeed((previous) => cached ?? (previous ? { ...previous, state: 'cached' } : null));
      setError('La mise à jour est momentanément indisponible.');
    }).finally(() => {
      if (!request.signal.aborted) setLoading(false);
    });
  }, []);

  useEffect(() => {
    void load();
    const interval = setInterval(() => { if (!document.hidden) void load(); }, 5 * 60 * 1000);
    const onVisible = () => { if (!document.hidden) void load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      controller.current?.abort();
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);

  return {
    feed, loading, error, refetch: load,
    upcoming: filterMatchesByCategory(feed?.upcoming ?? [], category),
    results: filterMatchesByCategory(feed?.results ?? [], category),
    pending: filterMatchesByCategory(feed?.pending ?? [], category),
  };
}
