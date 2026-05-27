/* eslint-disable */
// SDUS FC 93 — Service Worker
// Squelette fonctionnel : cache d'assets + notifications push.

const CACHE_NAME = 'sdus-fc-v1';
const STATIC_ASSETS = ['/', '/assets/logo.png'];

// --- Install : pré-cache des assets essentiels ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// --- Activate : nettoyage des anciens caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// --- Fetch : Cache First pour les assets, Network First pour les pages ---
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isStatic = url.pathname.startsWith('/assets/') || url.pathname.startsWith('/_next/static/');

  if (isStatic) {
    // Cache First
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
      )
    );
    return;
  }

  // Network First (pages) — repli sur le cache hors-ligne
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
  );
});

// --- Push : affiche une notification ---
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = {};
  }

  const title = payload.title || 'SDUS FC 93';
  const options = {
    body: payload.body || 'Nouvelle actualité du club !',
    icon: '/assets/logo.png',
    badge: '/assets/logo.png',
    data: { url: payload.url || '/' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// --- Clic sur une notification : ouvre l'app ---
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(self.clients.openWindow(target));
});
