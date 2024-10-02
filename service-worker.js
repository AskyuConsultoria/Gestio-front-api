const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/public/index.html',
    '/public/css/styles.css',
    '/app.js',
    '/manifest.json',
    '/assets/ficha.svg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
