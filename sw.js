const CACHE = "Kama-pwa-v1";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./descriptions.json",
  "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
