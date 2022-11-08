var dataCacheName = 'attendance-app-cache-data';
var cacheName = 'attendance-app-cache';
var filesToCache = [
    '/favicon.ico',
    '/manifest.json',
    '/_offline',
    '/logo.png'
];

self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // console.log('Inside the fetch handler:', event);
    // console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                // console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            // console.log('Network request for ', event.request.url);
            return fetch(event.request)

        }).catch(function (error) {

            return caches.match('/_offline');

        })
    );
});