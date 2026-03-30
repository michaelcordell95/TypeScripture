// TypeScripture Service Worker
// Caches key files for offline use

const CACHE_NAME = 'typescripture-v6';

const PRECACHE_FILES = [
  '/',
  '/index.html',
  '/bible.js',
  '/leaderboard.html',
  '/bookmarks.html',
  '/search.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-192-maskable.png',
  '/icon-512-maskable.png',
];

// Install: pre-cache all key files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_FILES);
    })
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: network first for HTML, cache first for static assets
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip Supabase API calls — always need live network
  if (event.request.url.includes('supabase.co')) return;

  const isHTML = event.request.headers.get('accept')?.includes('text/html');

  event.respondWith(
    isHTML
      // Network first for HTML — always get the latest version
      ? fetch(event.request)
          .then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return response;
          })
          .catch(() => caches.match(event.request))
      // Cache first for static assets — fast load, fall back to network
      : caches.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (!response || response.status !== 200) return response;
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return response;
          }).catch(() => {
            return new Response('Offline — content not available', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        })
  );
});
