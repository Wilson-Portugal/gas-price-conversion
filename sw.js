const cacheName = "gas-calc-v1.3.1";
const assets = ['./', './index.html', './manifest.json', './logo.svg'];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(
        keys.map(k => k !== cacheName ? caches.delete(k) : null)
    )));
});