self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("todolist-cache").then((cache) =>
      cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/IndexedDB.js",
        "/script.js",
        "/manifest.json",
        "/favicon.ico",
        "/icon-96x96.png",
        "/icon-192x192.png",
      ])
    )
  );
});

self.addEventListener("activate", () => console.log("Service worker activated"));

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
