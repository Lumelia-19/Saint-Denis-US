/**
 * Enregistre le Service Worker (`public/sw.js`).
 * N'opère qu'en production et côté navigateur ; ne lève jamais d'erreur.
 */
export async function registerServiceWorker(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;
  if (process.env.NODE_ENV !== 'production') return;

  try {
    await navigator.serviceWorker.register('/sw.js');
  } catch (error) {
    console.warn('[SDUS] Échec de l’enregistrement du Service Worker :', error);
  }
}
