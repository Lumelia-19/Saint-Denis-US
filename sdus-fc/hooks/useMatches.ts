'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMatches, filterMatchesByCategory } from '@/lib/matches';
import { Match, MatchCategory } from '@/lib/types';

const CACHE_KEY = 'sdus_matches_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const REFETCH_INTERVAL = 5 * 60 * 1000; // 5 minutes

interface RawData {
  upcoming: Match[];
  results: Match[];
}

interface CacheEntry {
  data: RawData;
  timestamp: number;
}

interface MatchesState {
  upcoming: Match[];
  results: Match[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (!parsed?.data || Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed;
  } catch {
    /* localStorage indisponible ou JSON corrompu — on ignore le cache */
    return null;
  }
}

function writeCache(data: RawData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() } satisfies CacheEntry));
  } catch {
    /* localStorage indisponible (mode privé, quota) — le cache est simplement ignoré */
  }
}

/** Renvoie les données depuis le cache (si valide) ou via fetchMatches(). */
async function getData(useCache: boolean): Promise<CacheEntry> {
  if (useCache) {
    const cached = readCache();
    if (cached) return cached;
  }
  const data = await fetchMatches();
  writeCache(data);
  return { data, timestamp: Date.now() };
}

/**
 * Récupère les matchs via lib/matches, avec cache localStorage (TTL 5 min)
 * et rafraîchissement automatique toutes les 5 minutes.
 * Le paramètre `category` filtre les résultats retournés.
 */
export function useMatches(category: MatchCategory | 'Tous' = 'Tous'): MatchesState {
  const [raw, setRaw] = useState<RawData>({ upcoming: [], results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const mounted = useRef(true);

  // Les mises à jour d'état passent toutes par des callbacks async (.then/.catch/.finally),
  // jamais de setState synchrone dans l'effet.
  const load = useCallback((useCache: boolean) => {
    getData(useCache)
      .then((entry) => {
        if (!mounted.current) return;
        setRaw(entry.data);
        setLastUpdated(new Date(entry.timestamp));
        setError(null);
      })
      .catch(() => {
        if (mounted.current) setError('Impossible de charger les matchs pour le moment.');
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });
  }, []);

  const refetch = useCallback(() => {
    setLoading(true);
    load(false);
  }, [load]);

  useEffect(() => {
    mounted.current = true;
    load(true);
    const id = setInterval(() => load(false), REFETCH_INTERVAL);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [load]);

  return {
    upcoming: filterMatchesByCategory(raw.upcoming, category),
    results: filterMatchesByCategory(raw.results, category),
    loading,
    error,
    lastUpdated,
    refetch,
  };
}
