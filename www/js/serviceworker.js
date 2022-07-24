const routes = [
    "/pages/404.html",
    "/pages/index.html",
    "/pages/about.html",
    "/img/poc.jpg"
];

const log = (msg) => {
    self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
    }).then((clients) => {
        clients.forEach(client => {
            client.postMessage(msg);
        });
    })
}

this.addEventListener('message', (event) => {
    log("message received");
});

this.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open('resources')
            .then(cache => cache.addAll(routes))
    );
    log("all cached");
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

this.addEventListener('fetch', event => {
    const match = caches.match(event.request);
    if (match)
    {
        log("cached response for " + event.request);
        event.respondWith(match);    
    }
    else
    {
        log("no match for " + event.request);
    }
});
