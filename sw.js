const ChachName = 'cacheV1';
const cacheFiles = [

];
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(ChachName)
      .then((cache)=> {
        return cache.addAll(cacheFiles);
      })
    );
});
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
          .then( (cacheNames) => {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('review-') &&
                        cacheName != ChachName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
          })
    );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});