<?php
header('Content-Type: application/javascript');
include('config-app-version.php');
?>
const cacheName = "gas-calc-<?php echo $appVersion; ?>";
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Install the service worker and cache the files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fetch files from cache when offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
