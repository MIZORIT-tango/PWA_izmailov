const CACHE_NAME = 'constellations-pwa-v3'; // Увеличьте версию
const PRECACHE_URLS = [
  '/PWA_izmailov/constellations/',
  '/PWA_izmailov/constellations/index.html',
  '/PWA_izmailov/constellations/orion.html',
  '/PWA_izmailov/constellations/ursa-major.html',
  '/PWA_izmailov/constellations/lyra.html',
  '/PWA_izmailov/constellations/scorpius.html',
  '/PWA_izmailov/constellations/cassiopeia.html',
  
  '/PWA_izmailov/constellations/style.css',
  
  '/PWA_izmailov/constellations/images/favicon.png',
  '/PWA_izmailov/constellations/images/header-bg.jpg',
  '/PWA_izmailov/constellations/images/constellations-map.jpg',
  '/PWA_izmailov/constellations/images/orion.jpeg',
  '/PWA_izmailov/constellations/images/ursa-major.jpeg',
  '/PWA_izmailov/constellations/images/lyra.jpeg',
  '/PWA_izmailov/constellations/images/scorpius.jpeg',
  '/PWA_izmailov/constellations/images/cassiopeia.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Кэширование ресурсов');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});