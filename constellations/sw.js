const CACHE_NAME = 'constellations-pwa-v3'; // Увеличьте версию
const PRECACHE_URLS = [
  '/constellations/',
  '/constellations/index.html',
  '/constellations/orion.html',
  '/constellations/ursa-major.html',
  '/constellations/lyra.html',
  '/constellations/scorpius.html',
  '/constellations/cassiopeia.html',
  
  '/constellations/style.css',
  
  '/constellations/images/favicon.png',
  '/constellations/images/header-bg.jpg',
  '/constellations/images/constellations-map.jpg',
  '/constellations/images/orion.jpeg',
  '/constellations/images/ursa-major.jpeg',
  '/constellations/images/lyra.jpeg',
  '/constellations/images/scorpius.jpeg',
  '/constellations/images/cassiopeia.jpeg'
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
  // Пропускаем внешние запросы
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});