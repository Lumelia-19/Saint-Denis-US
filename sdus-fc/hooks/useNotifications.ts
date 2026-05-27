'use client';
import { useCallback, useState } from 'react';
import { MatchCategory } from '@/lib/types';

const SUBSCRIPTIONS_KEY = 'sdus_notifications_subscriptions';

function isSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

function readSubscriptions(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SUBSCRIPTIONS_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    /* localStorage indisponible ou JSON corrompu */
    return [];
  }
}

function writeSubscriptions(list: string[]): void {
  try {
    localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(list));
  } catch {
    /* localStorage indisponible — les abonnements ne seront pas persistés */
  }
}

/**
 * Gère les notifications push : permission navigateur + abonnements
 * par catégorie (persistés en localStorage).
 */
export function useNotifications() {
  const supported = isSupported();

  const [permission, setPermission] = useState<NotificationPermission>(() =>
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [subscriptions, setSubscriptions] = useState<string[]>(() => readSubscriptions());

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const subscribe = useCallback((category: MatchCategory) => {
    setSubscriptions((prev) => {
      if (prev.includes(category)) return prev;
      const next = [...prev, category];
      writeSubscriptions(next);
      return next;
    });
  }, []);

  const unsubscribe = useCallback((category: MatchCategory) => {
    setSubscriptions((prev) => {
      const next = prev.filter((c) => c !== category);
      writeSubscriptions(next);
      return next;
    });
  }, []);

  const getSubscriptions = useCallback((): string[] => subscriptions, [subscriptions]);
  const isSubscribed = useCallback(
    (category: MatchCategory): boolean => subscriptions.includes(category),
    [subscriptions]
  );

  return {
    supported,
    permission,
    subscriptions,
    requestPermission,
    subscribe,
    unsubscribe,
    getSubscriptions,
    isSubscribed,
  };
}
