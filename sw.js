const CACHE = "kama-pwa-v2";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./descriptions.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      await cache.addAll(FILES);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      // Met en cache les images au fur et à mesure
      if(e.request.url.includes("/images/")){
        caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
      }
      return resp;
    }))
  );
});
