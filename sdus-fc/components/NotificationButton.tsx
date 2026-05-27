'use client';
import { useNotifications } from '@/hooks/useNotifications';
import { MatchCategory } from '@/lib/types';

function Bell({ filled }: { filled: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8.5a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5Z" />
      <path d="M13.7 19.5a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

/**
 * Bouton d'abonnement aux notifications de matchs d'une catégorie.
 * S'appuie uniquement sur les classes du design system (btn-primary / btn-outline).
 */
export default function NotificationButton({ category }: { category: MatchCategory }) {
  const { supported, permission, isSubscribed, requestPermission, subscribe, unsubscribe } = useNotifications();

  if (!supported) return null;

  const subscribed = isSubscribed(category);
  const denied = permission === 'denied';

  const handleClick = async () => {
    if (subscribed) {
      unsubscribe(category);
      return;
    }
    let perm: NotificationPermission = permission;
    if (perm === 'default') perm = await requestPermission();
    if (perm === 'granted') subscribe(category);
  };

  if (denied) {
    return (
      <button
        type="button"
        disabled
        title="Les notifications sont bloquées dans les réglages de votre navigateur."
        className="btn-outline opacity-50 cursor-not-allowed"
      >
        <Bell filled={false} />
        Notifications bloquées
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={subscribed ? 'btn-outline' : 'btn-primary'}>
      <Bell filled={subscribed} />
      {subscribed ? `Abonné · ${category}` : "M'abonner aux matchs"}
    </button>
  );
}
