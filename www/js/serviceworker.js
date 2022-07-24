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
    console.log("serviceworker: all cached");
});

this.addEventListener('fetch', event => {
    const match = caches.match(event.request);
    if (match)
    {
        console.log("serviceworker: cached response for " + event.request);
        event.respondWith(match);    
    }
    else
    {
        console.log("serviceworker: no match for " + event.request);
    }
});
