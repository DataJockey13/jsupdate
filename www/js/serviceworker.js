const routes = [
    "/pages/404.html",
    "/pages/index.html",
    "/pages/about.html",
    "/img/poc.jpg"
];

this.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open('resources')
            .then(cache => cache.addAll(routes))
    );
});

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
    );
});
